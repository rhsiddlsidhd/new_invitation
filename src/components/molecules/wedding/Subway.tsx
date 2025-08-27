import { createLineColorMap, createSelecedSubwayMap } from "@/utils/subway";
import { useEffect, useState } from "react";

export interface SubwayInfo {
  FR_CODE: string;
  LINE_NUM: string;
  STATION_CD: string;
  STATION_NM: string;
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

    const subwayData = await res.json();
    return subwayData.SearchInfoBySubwayNameService.row;
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
      const [allSubwayData, selectedSubwayData] = await Promise.all([
        getAllSubway(),
        getSelectedSubway(),
      ]);

      const lineData = createLineColorMap(allSubwayData);
      const stationData = createSelecedSubwayMap(selectedSubwayData);

      setLineColorMap(lineData);
      setSelectedSubway(stationData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("selectedSubway", selectedSubway);
  }, [selectedSubway]);

  return (
    <div className="space-y-2">
      <p className="text-sm font-bold">지하철</p>
      <div className="text-sm text-gray-500">
        {[...selectedSubway].map(([key, value], i) => {
          return (
            <div key={i} className="flex items-center gap-2">
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
              {key}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Subway;
