"use client";

import { handleClientError } from "@/api/error";
import { fetcher } from "@/api/fetcher";

import { PremiumFeature } from "@/services/premiumFeature.service";
import { useEffect, useState } from "react";

const usePremiumFeature = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [premiumFeatures, setPremiumFeatures] = useState<PremiumFeature[]>([]);

  const getPremiumFeatures = async () => {
    setLoading(true);
    try {
      // API 응답 구조: { data: PremiumFeature[] }
      const response = await fetcher<{ data: PremiumFeature[] }>(
        "/api/product/premium-feature",
      );

      setPremiumFeatures(response.data ?? []);
    } catch (error) {
      handleClientError(error);
      setPremiumFeatures([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPremiumFeatures();
  }, []);

  return { premiumFeatures, loading };
};

export default usePremiumFeature;
