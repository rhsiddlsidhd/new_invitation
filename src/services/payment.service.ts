import { dbConnect } from "@/shared/utils/mongodb";
import { HTTPError } from "@/api/type";
import * as PortOne from "@portone/server-sdk";
import { getProductService } from "./product.service";
import { getOrderSeviceByMerchantUid } from "./order.service";

type GetPaymentResult = Awaited<ReturnType<typeof portone.payment.getPayment>>;

const PORTONE_API_SECRET = process.env.POST_ONE_API_KEY;
const PORTONE_STORE_ID = process.env.NEXT_PUBLIC_POST_ONE_STORE_ID;

if (!PORTONE_API_SECRET || !PORTONE_STORE_ID) {
  throw new Error("PortOne environment variables are not defined");
}

const portone = PortOne.PortOneClient({ secret: PORTONE_API_SECRET });

const paymentStore = new Map();
export const syncPayment = async (paymentId: string) => {
  await dbConnect();

  if (!paymentStore.has(paymentId)) {
    paymentStore.set(paymentId, { status: "PENDING" });
  }

  // 1. PortOne API로 결제 정보 조회
  const payment = paymentStore.get(paymentId);
  let actualPayment;
  try {
    actualPayment = await portone.payment.getPayment({ paymentId });
  } catch (e) {
    if (e instanceof PortOne.PortOneError) {
      console.error("[syncPayment] PortOne API error:", e.message);
      throw new HTTPError("결제 정보를 조회할 수 없습니다.", 400);
    }
    throw e;
  }

  //  결제 금액 검증 (PAID 상태일 때만)
  if (actualPayment.status === "PAID") {
    if (!verifyPayment(actualPayment)) return false;
    if (payment.status === "PAID") return payment;
    payment.status = "PAID";
    console.info("결제 성공", actualPayment);
  } else {
    return false;
  }
  return payment;
};

const verifyPayment = async (payment: GetPaymentResult) => {
  if (payment.status !== "PAID") return false;
  if (payment.channel.type !== "TEST") return false;
  if (payment.customData !== null) return false;
  const parsed = JSON.parse(payment.customData);
  const product = await getProductService(parsed.productId);
  const order = await getOrderSeviceByMerchantUid(payment.id);

  if (!product || !order) return false;

  return (
    payment.orderName === product.title &&
    payment.amount.paid === order.finalPrice
  );
};
