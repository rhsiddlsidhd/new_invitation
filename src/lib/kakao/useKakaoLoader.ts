import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";

const useKakaoLoader = () => {
  const apikey = process.env.KAKAO_MAP_API_KEY;

  if (!apikey) {
    throw new Error("카카오맵 API 키가 없습니다.");
  }

  useKakaoLoaderOrigin({
    appkey: apikey,
  });
};

export default useKakaoLoader;
