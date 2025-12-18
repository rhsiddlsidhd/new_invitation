import useKakaoLoader from "@/shared/lib/kakao/useKakaoLoader";
import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = ({ address }: { address: string }) => {
  useKakaoLoader();

  const [geoState, setGeoState] = useState<{
    lng: number | null;
    lat: number | null;
  }>({ lng: null, lat: null });

  useEffect(() => {
    const getCoordinates = async (address: string) => {
      try {
        const res = await fetch(`/api/kakaomap?address=${address}`);
        const data = await res.json();
        if (!res.ok || data.errorType) {
          throw new Error(data.message);
        }

        const { x, y } = data.documents[0];
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
    <div className="flex justify-center">
      {geoState.lat !== null && geoState.lng !== null && (
        <Map
          id="map"
          center={{
            lat: geoState.lat,
            lng: geoState.lng,
          }}
          className="aspect-[10/16] w-full"
          level={3}
        >
          <MapMarker position={{ lat: geoState.lat, lng: geoState.lng }} />
        </Map>
      )}
    </div>
  );
};

export default KakaoMap;
