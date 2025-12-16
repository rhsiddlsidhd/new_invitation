import { CheckoutForm } from "@/components/template/CheckoutForm";
import { OrderSummary } from "@/components/template/OrderSummary";

export default function CheckoutPage() {
  // In a real app, this would come from URL params or cart state
  const orderData = {
    templateId: 1,
    templateName: "로즈 가든",
    templateImage: "/elegant-wedding-invitation-with-roses.jpg",
    price: 29000,
  };

  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-foreground mb-2 text-3xl font-bold md:text-4xl">
              결제하기
            </h1>
            <p className="text-muted-foreground">
              안전하고 빠른 결제를 진행해주세요
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left side - Checkout Form */}
            <div className="lg:col-span-2">
              <CheckoutForm />
            </div>

            {/* Right side - Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary order={orderData} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
