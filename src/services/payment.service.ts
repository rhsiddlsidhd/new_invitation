import { PaymentModel, PayStatus } from "@/models/payment";
import { dbConnect } from "@/shared/utils/mongodb";
import { HTTPError } from "@/api/type";

const PORTONE_API_SECRET = process.env.POST_ONE_API_KEY;
const PORTONE_STORE_ID = process.env.NEXT_PUBLIC_POST_ONE_STORE_ID;

interface PortOnePaymentResponse {
  id: string; // paymentId
  transactionId?: string; // 실제 거래 ID
  storeId: string;
  method?: {
    type: string;
    card?: {
      name?: string;
      number?: string;
      installment?: {
        month?: number;
      };
    };
  };
  orderName: string;
  amount: {
    total: number;
    paid: number;
  };
  status: "READY" | "PAID" | "FAILED" | "CANCELLED" | "PARTIAL_CANCELLED";
  requestedAt: string;
  paidAt?: string;
  failedAt?: string;
  failReason?: string;
  cancelledAt?: string;
  receiptUrl?: string;
  pgProvider?: string;
  pgTxId?: string;
}

/**
 * PortOne API를 통해 결제 정보를 조회하고 데이터베이스와 동기화합니다.
 * @param paymentId - PortOne 결제 ID
 * @returns 업데이트된 결제 정보
 */
export const syncPayment = async (paymentId: string) => {
  console.log("[syncPayment] API_SECRET exists:", !!PORTONE_API_SECRET);
  console.log("[syncPayment] API_SECRET length:", PORTONE_API_SECRET?.length);

  if (!PORTONE_API_SECRET || !PORTONE_STORE_ID) {
    throw new HTTPError("결제 서비스 구성에 문제가 있습니다.", 500);
  }

  try {
    const authHeader = `PortOne ${PORTONE_API_SECRET}`;
    console.log("[syncPayment] Auth header:", authHeader.substring(0, 20) + "...");

    // PortOne API 호출하여 결제 정보 조회
    const response = await fetch(
      `https://api.portone.io/v2/payments/${paymentId}`,
      {
        method: "GET",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("PortOne API Error:", errorData);
      throw new HTTPError(
        "결제 정보를 가져오는데 실패했습니다.",
        response.status,
      );
    }

    const portOnePayment: PortOnePaymentResponse = await response.json();

    // PortOne 상태를 내부 상태로 매핑
    const statusMap: Record<string, PayStatus> = {
      READY: "PENDING",
      PAID: "PAID",
      FAILED: "FAILED",
      CANCELLED: "CANCELLED",
      PARTIAL_CANCELLED: "PARTIAL_CANCELLED",
    };

    const internalStatus = statusMap[portOnePayment.status] || "PENDING";

    // 데이터베이스 연결 및 업데이트
    await dbConnect();

    const updateData: Partial<{
      impUid: string;
      paidAmount: number;
      status: PayStatus;
      payMethod: string;
      pgProvider: string;
      pgTid: string;
      cardName: string;
      cardNumber: string;
      cardQuote: number;
      paidAt: Date;
      failedAt: Date;
      failReason: string;
      cancelledAt: Date;
      receiptUrl: string;
    }> = {
      impUid: portOnePayment.transactionId,
      paidAmount: portOnePayment.amount.paid,
      status: internalStatus,
    };

    // 결제 수단 정보
    if (portOnePayment.method?.type) {
      updateData.payMethod = portOnePayment.method.type;
    }

    // PG 정보
    if (portOnePayment.pgProvider) {
      updateData.pgProvider = portOnePayment.pgProvider;
    }
    if (portOnePayment.pgTxId) {
      updateData.pgTid = portOnePayment.pgTxId;
    }

    // 카드 정보
    if (portOnePayment.method?.card) {
      if (portOnePayment.method.card.name) {
        updateData.cardName = portOnePayment.method.card.name;
      }
      if (portOnePayment.method.card.number) {
        updateData.cardNumber = portOnePayment.method.card.number;
      }
      if (portOnePayment.method.card.installment?.month) {
        updateData.cardQuote = portOnePayment.method.card.installment.month;
      }
    }

    // 결제 완료 시점
    if (portOnePayment.paidAt) {
      updateData.paidAt = new Date(portOnePayment.paidAt);
    }

    // 실패 정보
    if (portOnePayment.failedAt) {
      updateData.failedAt = new Date(portOnePayment.failedAt);
    }
    if (portOnePayment.failReason) {
      updateData.failReason = portOnePayment.failReason;
    }

    // 취소 정보
    if (portOnePayment.cancelledAt) {
      updateData.cancelledAt = new Date(portOnePayment.cancelledAt);
    }

    // 영수증 URL
    if (portOnePayment.receiptUrl) {
      updateData.receiptUrl = portOnePayment.receiptUrl;
    }

    // paymentId로 결제 정보 찾아서 업데이트
    // PortOne의 paymentId는 우리의 merchantUid와 같음
    const updatedPayment = await PaymentModel.findOneAndUpdate(
      { merchantUid: paymentId },
      { $set: updateData },
      { new: true },
    );

    if (!updatedPayment) {
      throw new HTTPError("결제 정보를 찾을 수 없습니다.", 404);
    }

    return updatedPayment;
  } catch (error) {
    if (error instanceof HTTPError) {
      throw error;
    }
    console.error("syncPayment error:", error);
    throw new HTTPError("결제 동기화 중 오류가 발생했습니다.", 500);
  }
};
