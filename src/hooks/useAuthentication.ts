import useAuthStore from "@/store/authStore";
import { useEffect, useState } from "react";

const useAuthentication = () => {
  const [id, setId] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(true);
  const { setIsAuthenticated, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const fetchAuthenticate = async () => {
      try {
        const res = await fetch("/api/auth", { cache: "no-store" });
        if (!res.ok) throw new Error("Auth fetch failed");
        const data = await res.json();
        setIsAuthenticated(data.success);
        setId(data.data.userId);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setPending(false);
      }
    };
    setPending(true);
    fetchAuthenticate();
  }, [setIsAuthenticated]);

  return { pending, id, isAuthenticated };
};

export default useAuthentication;
