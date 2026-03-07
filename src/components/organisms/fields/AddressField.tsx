"use client";

import { Input } from "@/components/atoms/input";
import FormControl from "@/components/molecules/FormControl";
import useDaumPopup from "@/hooks/useDaumPopup";
import React, { useEffect, useState } from "react";

interface AddressFieldProps {
  name: string;
  label?: string;
  error?: string;
  required?: boolean;
  defaultValue?: string;
}

/**
 * 도메인 특화 로직(Daum API)이 결합된 주소 입력 필드 (Organism)
 */
const AddressField = ({
  name,
  label = "주소",
  error,
  required = false,
  defaultValue = "",
}: AddressFieldProps) => {
  const { handleDaumAddressPopup, address } = useDaumPopup();
  const [weddingAddress, setWeddingAddress] = useState(defaultValue);

  // 주소 검색 결과 반영
  useEffect(() => {
    if (address) {
      setWeddingAddress(address);
    }
  }, [address]);

  // 외부(defaultValue) 데이터 로딩 시 초기화
  useEffect(() => {
    if (defaultValue) {
      setWeddingAddress(defaultValue);
    }
  }, [defaultValue]);

  const fieldId = `${name}_address`;

  return (
    <FormControl id={fieldId} label={label} error={error} required={required}>
      <Input
        id={fieldId}
        name={fieldId}
        placeholder={`${label}를 검색하세요`}
        onClick={handleDaumAddressPopup}
        value={weddingAddress}
        className={error ? "border-destructive flex-1" : "flex-1"}
        required={required}
        readOnly
      />
    </FormControl>
  );
};

export default AddressField;
