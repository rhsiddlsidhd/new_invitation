"use client";

import { Btn } from "@/components/atoms/Btn/Btn";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import { Label } from "@/components/atoms/Label/Label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/Popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/atoms/Calendar";

import { useState } from "react";
import { ko } from "date-fns/locale";

import LabeledInput from "@/components/molecules/(input-group)/LabeledInput";
import AddressSearchInput from "@/components/molecules/(input-group)/AddressSearchInput";
import LabeledSwitch from "@/components/molecules/(input-group)/LabeledSwitch";
import LabeledSelect from "@/components/molecules/(input-group)/LabeledSelect";
import { Input } from "@/components/atoms/Input/Input";

interface WeddingScheduel {
  date: Date | undefined;
  time: string;
  venueName: string;
  address: string;
  addressDetail: string;
  guestbookEnabled: boolean;
  subwayStation?: string;
}

// 현재 지하철역 가져오기 API ERROR-331 에러 발생 원인 알 수 없음
const MOCSUBWAYSTATIONS = [
  "강남역",
  "홍대입구역",
  "잠실역",
  "명동역",
  "서울역",
  "종각역",
  "고속터미널역",
];

export function BasicInfoSection() {
  const [weddingDate, setWeddingDate] = useState<Date | undefined>(undefined);

  return (
    <Card>
      <CardHeader>
        <CardTitle>기본 정보</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Date Picker */}
          <div className="space-y-2">
            <Label>결혼식 날짜 *</Label>
            {weddingDate && (
              <Input
                hidden
                value={format(weddingDate, "yyyy-MM-dd")}
                name={"wedding-date"}
                readOnly
              />
            )}
            <Popover>
              <PopoverTrigger asChild>
                <Btn
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${!weddingDate && "text-muted-foreground"}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {weddingDate
                    ? format(weddingDate, "PPP", { locale: ko })
                    : "날짜를 선택하세요"}
                </Btn>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={weddingDate}
                  onSelect={(date) => {
                    if (!date) return;
                    setWeddingDate(date);
                  }}
                  autoFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <LabeledInput
            id="weddingTime"
            name="weddingTime"
            type="time"
            placeholder="결혼식 시간"
          >
            결혼식 시간 *
          </LabeledInput>
        </div>

        {/* Venue Name */}
        <div className="space-y-2"></div>
        <LabeledInput
          id="venueName"
          name="venueName"
          type="text"
          placeholder="예: 더 컨벤션 웨딩홀"
        >
          예식장명 *
        </LabeledInput>

        {/* Address */}
        <AddressSearchInput />

        {/* Address Detail */}
        <LabeledInput
          id="addressDetail"
          name="addressDetail"
          type="text"
          placeholder="예: 3층 그랜드볼룸"
        >
          상세 주소
        </LabeledInput>

        {/* NEW SUBWAY STATION DROPDOWN */}
        <LabeledSelect
          id="subwayStation"
          name="subwayStation"
          placeholder="지하철역 선택"
          data={MOCSUBWAYSTATIONS}
        >
          인근 지하철 역{" "}
        </LabeledSelect>

        {/* Guestbook Toggle */}
        <LabeledSwitch
          id={"guestbookEnabled"}
          name={"guestbookEnabled"}
          message={"하객들이 축하 메시지를 남길 수 있습니다."}
        >
          방명록 사용
        </LabeledSwitch>
      </CardContent>
    </Card>
  );
}
