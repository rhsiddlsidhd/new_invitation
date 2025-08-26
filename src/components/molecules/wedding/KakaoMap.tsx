import useKakaoLoader from "@/lib/kakao/useKakaoLoader";
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
