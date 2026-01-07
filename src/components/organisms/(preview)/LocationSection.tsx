"use client";

import { Btn } from "@/components/atoms/Btn/Btn";
import { Card, CardContent } from "@/components/atoms/Card/Card";
import { MapPin, Navigation, Copy, CheckCircle } from "lucide-react";
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
    setTimeout(() => setCopied(false), 2000);
  };

  const openKakaoMap = () => {
    window.open(
      `https://map.kakao.com/link/search/${encodeURIComponent(fullAddress)}`,
      "_blank",
    );
  };

  const openNaverMap = () => {
    window.open(
      `https://map.naver.com/v5/search/${encodeURIComponent(fullAddress)}`,
      "_blank",
    );
  };

  const openKakaoNavi = () => {
    window.open(
      `https://map.kakao.com/link/to/${encodeURIComponent(venueName)},${encodeURIComponent(fullAddress)}`,
      "_blank",
    );
  };

  const openTmap = () => {
    window.open(
      `https://tmap.life/s/${encodeURIComponent(venueName)}`,
      "_blank",
    );
  };

  return (
    <section className="bg-muted/30 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-foreground mb-12 text-center font-serif text-3xl">
          오시는 길
        </h2>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <MapPin className="text-primary mt-1 h-6 w-6 shrink-0" />
              <div className="flex-1">
                <h3 className="text-foreground mb-2 text-xl font-semibold">
                  {venueName}
                </h3>
                <p className="text-muted-foreground mb-4">{fullAddress}</p>
                <Btn
                  variant="outline"
                  size="sm"
                  onClick={copyAddress}
                  className="gap-2 bg-transparent"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? "복사됨" : "주소 복사"}
                </Btn>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map placeholder */}
        <div className="bg-muted relative mb-6 aspect-video overflow-hidden rounded-xl">
          <div className="text-muted-foreground absolute inset-0 flex items-center justify-center">
            <MapPin className="h-12 w-12" />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mb-8 grid grid-cols-2 gap-3">
          <Btn
            variant="outline"
            onClick={openKakaoMap}
            className="gap-2 bg-transparent"
          >
            <MapPin className="h-4 w-4" />
            카카오맵
          </Btn>
          <Btn
            variant="outline"
            onClick={openNaverMap}
            className="gap-2 bg-transparent"
          >
            <MapPin className="h-4 w-4" />
            네이버지도
          </Btn>
          <Btn
            variant="outline"
            onClick={openKakaoNavi}
            className="gap-2 bg-transparent"
          >
            <Navigation className="h-4 w-4" />
            카카오내비
          </Btn>
          <Btn
            variant="outline"
            onClick={openTmap}
            className="gap-2 bg-transparent"
          >
            <Navigation className="h-4 w-4" />
            티맵
          </Btn>
        </div>

        {/* Transportation Info */}
        <Card>
          <CardContent className="space-y-6 p-6">
            <div>
              <h4 className="text-foreground mb-3 flex items-center gap-2 font-semibold">
                <div className="bg-primary h-2 w-2 rounded-full" />
                지하철
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                2호선 강남역 3번 출구에서 도보 5분
                <br />
                신분당선 강남역 10번 출구에서 도보 3분
              </p>
            </div>
            <div>
              <h4 className="text-foreground mb-3 flex items-center gap-2 font-semibold">
                <div className="bg-primary h-2 w-2 rounded-full" />
                버스
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                간선버스: 146, 540, 4318
                <br />
                지선버스: 3414, 3422, 4419
              </p>
            </div>
            <div>
              <h4 className="text-foreground mb-3 flex items-center gap-2 font-semibold">
                <div className="bg-primary h-2 w-2 rounded-full" />
                주차 안내
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                건물 내 주차장 이용 가능 (3시간 무료)
                <br />
                주차 공간이 협소하오니 대중교통을 이용해 주시면 감사하겠습니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
