"use client";

import { Btn } from "@/components/atoms/Btn/Btn";
import SectionBody from "@/components/molecules/(preview)/SectionBody";
import KakaoMap from "@/components/molecules/KakaoMap";
import Navigation from "@/components/organisms/(preview)/Navigation";
import { Copy, CheckCircle } from "lucide-react";
import { useState } from "react";

interface LocationSectionProps {
  venueName: string;
  address: string;
  addressDetail?: string;
}

export function LocationSection({
  venueName,
  address,
  addressDetail,
}: LocationSectionProps) {
  const [copied, setCopied] = useState(false);

  const fullAddress = addressDetail ? `${address} ${addressDetail}` : address;

  const copyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    alert("주소가 복사되었습니다.");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SectionBody title="LOCATION" subTitle="오시는 길">
      <div>
        <p className="text-foreground text-md font-semibold">{venueName}</p>
        <div className="flex items-center justify-center gap-2">
          <p className="text-muted-foreground text-sm">{fullAddress}</p>
          <Btn
            variant="ghost"
            size="sm"
            onClick={copyAddress}
            className="cursor-pointer"
          >
            {copied ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Btn>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="bg-muted relative mb-6 aspect-video overflow-hidden rounded-xl">
        <KakaoMap address={address} />
      </div>

      {/* Navigation Buttons */}

      <Navigation address={fullAddress} />

      {/* Transportation Info */}
    </SectionBody>
  );
}
