import { useOrderStore } from "@/store/order.store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useCheckoutData() {
  const router = useRouter();
  const order = useOrderStore((state) => state.order);

  // Zustand의 persist 미들웨어는 비동기적으로 sessionStorage에서 데이터를 가져옵니다(rehydration).
  // 따라서, 첫 렌더링 시에는 order가 null일 수 있습니다.
  // 클라이언트에서 마운트되었는지 확인하여, rehydration이 완료될 시간을 확보합니다.
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // 클라이언트에서 마운트되었고, rehydration 이후에도 order가 없는 경우
    if (isMounted && !order) {
      const errorMessage = "주문 정보가 없습니다. 상품 페이지로 이동합니다.";
      setError(errorMessage);
      toast.error(errorMessage);
      router.replace("/products");
    }
  }, [isMounted, order, router]);

  return {
    data: order,
    loading: !isMounted, // isMounted가 false이면 아직 로딩 중
    error,
  };
}
