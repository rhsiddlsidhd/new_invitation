import Btn from "@/components/atoms/Btn";
import Img from "@/components/atoms/Img";
import { getNavigationBtn } from "@/utils/map";
import { GeoState } from "@/utils/map/openApp";
import React, { useEffect, useMemo, useState } from "react";

export interface NavigationButton {
  name: string;
  path: string;
  onClick: (props: {
    current?: GeoState;
    target?: GeoState;
    address?: string;
  }) => void;
}

const Navigation = ({ address }: { address: string }) => {
  const navigationBtn = useMemo(() => getNavigationBtn(), []);
  const [geoState, setGeoState] = useState<{
    current: { lng: number | null; lat: number | null };
    target: {
      lng: number | null;
      lat: number | null;
    };
  }>({ current: { lng: null, lat: null }, target: { lng: null, lat: null } });

  const getCurrentCoordinates = (): Promise<GeoState | null> => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          });
        },
        (err) => {
          // handleGeolocationPositionError(err);
          console.error(err);
          resolve(null);
        },
      );
    });
  };

  useEffect(() => {
    const fetchCurrentCoordinates = async () => {
      const coordinate = await getCurrentCoordinates();
      if (coordinate) {
        setGeoState((prev) => ({
          ...prev,
          current: { lng: coordinate.lng, lat: coordinate.lat },
        }));
      }
    };

    fetchCurrentCoordinates();
  }, []);

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

        setGeoState((prev) => ({
          ...prev,
          target: { lat: Number(y), lng: Number(x) },
        }));
      } catch (e) {
        const message =
          e instanceof Error ? e.message : "서버 오류가 발생하였습니다.";
        console.error(message);
      }
    };

    getCoordinates(address);
  }, [address]);

  return (
    <div className="h-screen space-y-2">
      <p className="text-sm font-bold">네비게이션</p>
      <p className="text-xs text-gray-400">
        원하시는 앱을 선택하시면 길안내가 시작됩니다.
      </p>
      <div className="flex gap-2">
        {navigationBtn.map((btn, i) => {
          return (
            <Btn
              bgColor="bg-[#f0f0f0]"
              textColor="text-gray-400"
              className="flex flex-1 flex-nowrap justify-center gap-1 text-xs"
              key={i}
              onClick={() => {
                btn.onClick({
                  address: address,
                  current: geoState.current,
                  target: geoState.target,
                });
              }}
            >
              <span className="relative inline-block w-4 shrink-0">
                <Img src={`/assets/${btn.path}`} />
              </span>
              <span className="shrink-0 grow-0">{btn.name}</span>
            </Btn>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
