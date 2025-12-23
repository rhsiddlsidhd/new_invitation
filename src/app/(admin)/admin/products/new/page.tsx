import { ProductRegistrationForm } from "@/components/organisms/(forms)/ProductRegistrationForm";

export default function NewProductPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-foreground mb-2 text-3xl font-bold">상품 등록</h1>
        <p className="text-muted-foreground">
          새로운 템플릿 상품을 등록합니다.
        </p>
      </div>

      <ProductRegistrationForm />
    </div>
  );
}
