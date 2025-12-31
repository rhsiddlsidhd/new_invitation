import { CheckoutProductData } from "@/types/checkout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useCheckoutData() {
  const router = useRouter();
  const [data, setData] = useState<CheckoutProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = sessionStorage.getItem("checkoutItems");
      if (!stored) throw new Error("주문 정보가 없습니다.");

      const items: CheckoutProductData[] = JSON.parse(stored);
      if (items.length === 0) throw new Error("주문 항목이 비어있습니다.");

      setData(items[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류");
      toast.error("주문 정보를 불러올 수 없습니다.");
      router.replace("/products");
    } finally {
      setLoading(false);
    }
  }, [router]);

  return { data, loading, error };
}
