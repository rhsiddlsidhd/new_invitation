import useKakaoLoader from "@/lib/kakao/useKakaoLoader";
import React, { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";

const KakaoMap = ({ address }: { address: string }) => {
  useKakaoLoader();

  const [geoState, setGeoState] = useState<{
    lng: number | null;
    lat: number | null;
  }>({ lng: null, lat: null });

  useEffect(() => {
    const getCoordinates = async (address: string) => {
      try {
        //
        const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
        if (!REST_API_KEY) throw new Error("REST API KEY가 없습니다.");
        const query = address;
        const res = await fetch(
          `https://dapi.kakao.com/v2/local/search/address?query=${query}`,
          {
            method: "GET",
            headers: { Authorization: `KakaoAK ${REST_API_KEY}` },
          },
        );

        const data = await res.json();

        if (!res.ok || data.errorType) {
          throw new Error(data.message);
        }
        const { x, y } = data.documents[0];
        console.log(x, y);
        setGeoState({ lat: y, lng: x });
      } catch (e) {
        const message =
          e instanceof Error ? e.message : "서버 오류가 발생하였습니다.";
        console.error(message);
      }
    };

    getCoordinates(address);
  }, [address]);

  return (
    <div>
      {geoState.lat !== null && geoState.lng !== null && (
        <Map // 지도를 표시할 Container
          id="map"
          center={{
            // 지도의 중심좌표
            lat: geoState.lat,
            lng: geoState.lng,
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "350px",
          }}
          level={3} // 지도의 확대 레벨
        />
      )}
    </div>
  );
};

export default KakaoMap;
