import { createLineColorMap, createSelecedSubwayMap } from "@/utils/subway";
import { useEffect, useState } from "react";

export interface SubwayInfo {
  FR_CODE: string;
  LINE_NUM: string;
  STATION_CD: string;
  STATION_NM: string;
}

export interface SubwayApiResponse {
  SearchInfoBySubwayNameService: {
    RESULT: {
      CODE: string;
      MESSAGE: string;
    };
    list_total_count: number;
    row: SubwayInfo[];
  };
}

const Subway = () => {
  // 현재 지하철역 데이터가 없음
  const [lineColorMap, setLineColorMap] = useState<Map<string, string>>(
    new Map(),
  );
  const [selectedSubway, setSelectedSubway] = useState<Map<string, string[]>>(
    new Map(),
  );

  const getAllSubway = async (): Promise<SubwayInfo[]> => {
    const res = await fetch(
      `http://openAPI.seoul.go.kr:8088/${process.env.NEXT_PUBLIC_SEOUL_PUBLIC_API_KEY}/json/SearchInfoBySubwayNameService/1/1000`,
    );

    // const text = await res.text();

    try {
      // const { SearchInfoBySubwayNameService } = JSON.parse(
      //   text,
      // ) as SubwayApiResponse;
      const { SearchInfoBySubwayNameService } =
        (await res.json()) as SubwayApiResponse;

      switch (SearchInfoBySubwayNameService.RESULT.CODE) {
        case "INFO-200":
        case "INFO-000":
          return SearchInfoBySubwayNameService.row;

        case "INFO-100":
          console.error(
            "인증키 오류",
            SearchInfoBySubwayNameService.RESULT.MESSAGE,
          );
          throw new Error(
            "서비스 이용에 문제가 발생했습니다. 관리자에게 문의하세요.",
          );
        default:
          console.error(
            "Subway API 오류",
            SearchInfoBySubwayNameService.RESULT.MESSAGE,
          );
          throw new Error(
            "일시 적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
          );
      }
    } catch (e) {
      const message =
        e instanceof Error
          ? e.message
          : "일시 적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      console.error("Error fetching subway data", message);
      return [];
    }
  };

  const getSelectedSubway = async (): Promise<SubwayInfo[]> => {
    const selected = "진접";
    const res = await fetch(
      `http://openAPI.seoul.go.kr:8088/${process.env.NEXT_PUBLIC_SEOUL_PUBLIC_API_KEY}/json/SearchInfoBySubwayNameService/1/1000/${selected}`,
    );

    const subwayData = await res.json();
    return subwayData.SearchInfoBySubwayNameService.row;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allSubwayData, selectedSubwayData] = await Promise.all([
          getAllSubway(),
          getSelectedSubway(),
        ]);

        const lineData = createLineColorMap(allSubwayData);
        const stationData = createSelecedSubwayMap(selectedSubwayData);

        setLineColorMap(lineData);
        setSelectedSubway(stationData);
      } catch (e) {
        console.error("Error fetching subway data", e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-2">
      <p className="text-sm font-bold">지하철</p>
      <div className="text-xs text-gray-400">
        {[...selectedSubway].map(([key, value], i) => {
          return (
            <div key={i} className="flex flex-col">
              {value.map((line) => {
                return (
                  <p className="flex items-center gap-1" key={line}>
                    <span
                      style={{
                        backgroundColor:
                          lineColorMap.get(line) || "transparent",
                      }}
                      className={`inline-block aspect-square w-3 rounded-full`}
                    />
                    {line}
                  </p>
                );
              })}
              {key}역 하차
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Subway;
