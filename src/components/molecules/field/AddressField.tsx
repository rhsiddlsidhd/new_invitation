import { Input } from "@/components/atoms/Input/Input";
import { Label } from "@/components/atoms/Label/Label";
import useDaumPopup from "@/hooks/useDaumPopup";
import React, { useEffect, useState } from "react";

const AddressField = ({
  error,
  required = false,
  name,
  defaultValue,
}: {
  name: string;
  error?: string;
  required?: boolean;
  defaultValue?: string;
}) => {
  const { handleDaumAddressPopup, address } = useDaumPopup();
  const [weddingAddress, setWeddingAddress] = useState(defaultValue ?? "");
  useEffect(() => {
    if (address) {
      setWeddingAddress(address);
    }
  }, [address]);

  return (
    <div className="space-y-2">
      <Label htmlFor="address">주소 *</Label>
      <div className="flex gap-2">
        <Input
          id="address"
          name={`${name}_address`}
          placeholder="주소를 검색하세요"
          onClick={handleDaumAddressPopup}
          value={weddingAddress}
          className={error ? "border-destructive flex-1" : "flex-1"}
          required={required}
          readOnly
        />
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
};

export default AddressField;
