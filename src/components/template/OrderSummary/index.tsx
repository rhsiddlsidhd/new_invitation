import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";

interface OrderSummaryProps {
  order: {
    templateId: number;
    templateName: string;
    templateImage: string;
    price: number;
  };
}

export function OrderSummary({ order }: OrderSummaryProps) {
  const deliveryFee = 0;
  const total = order.price + deliveryFee;

  return (
    <div className="lg:sticky lg:top-24">
      <Card className="border-border">
        <CardHeader>
          <CardTitle>주문 내역</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Product */}
          <div className="flex gap-4">
            <div className="bg-muted relative h-24 w-20 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={order.templateImage || "/placeholder.svg"}
                alt={order.templateName}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-foreground mb-1 truncate font-medium">
                {order.templateName}
              </h3>
              <p className="text-muted-foreground text-sm">청첩장 템플릿</p>
              <p className="text-foreground mt-2 text-sm font-semibold">
                {order.price.toLocaleString()}원
              </p>
            </div>
          </div>

          {/* <Separator /> */}

          {/* Price Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">상품 금액</span>
              <span className="text-foreground">
                {order.price.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">배송비</span>
              <span className="text-foreground">
                {deliveryFee === 0 ? "무료" : `${deliveryFee}원`}
              </span>
            </div>
          </div>

          {/* <Separator /> */}

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-foreground text-lg font-semibold">
              총 결제금액
            </span>
            <span className="text-primary text-2xl font-bold">
              {total.toLocaleString()}원
            </span>
          </div>
        </CardContent>

        <CardFooter className="bg-muted/50 flex-col items-start gap-3">
          <div className="flex items-start gap-2">
            <div className="bg-muted-foreground mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
            <p className="text-muted-foreground text-xs leading-relaxed">
              구매 후 즉시 다운로드 링크가 이메일로 발송됩니다.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="bg-muted-foreground mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
            <p className="text-muted-foreground text-xs leading-relaxed">
              디지털 상품 특성상 구매 후 환불이 불가합니다.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="bg-muted-foreground mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
            <p className="text-muted-foreground text-xs leading-relaxed">
              평생 무료 호스팅이 제공됩니다.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
