"use client";
import { Input } from "@/components/atoms/Input/Input";
import { Label } from "@/components/atoms/Label/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/Select";
import { useBanks } from "@/hooks/useBanks";
import React, { useState, useEffect } from "react";

interface BankAccountInfo {
  bankName: string;
  accountNumber: string;
}

interface BankAccountProps {
  id: string;
  defaultBankName?: string;
  defaultAccountNumber?: string;
}

const BankAccount = ({
  id,
  defaultBankName = "",
  defaultAccountNumber = "",
}: BankAccountProps) => {
  const [info, setInfo] = useState<BankAccountInfo>({
    bankName: defaultBankName,
    accountNumber: defaultAccountNumber,
  });

  const { banks } = useBanks(); // useSWR -> useBanks 훅으로 교체

  // defaultValue 변경 시 state 업데이트
  useEffect(() => {
    if (defaultBankName || defaultAccountNumber) {
      setInfo({
        bankName: defaultBankName,
        accountNumber: defaultAccountNumber,
      });
    }
  }, [defaultBankName, defaultAccountNumber]);

  return (
    <div>
      <Label>계좌번호</Label>
      <div className="grid grid-cols-[120px_1fr] gap-2 max-sm:grid-cols-1">
        <Select
          name={`${id}_bank_name`}
          value={info.bankName}
          onValueChange={(value) =>
            setInfo((prev) => ({
              ...prev,
              bankName: value,
            }))
          }
        >
          <SelectTrigger className="w-30">
            <SelectValue placeholder="은행 선택" />
          </SelectTrigger>
          <SelectContent className="max-h-60!" position="popper" align="start">
            {/* data.items -> banks 로 변경 */}
            {banks &&
              banks.map((bank) => (
                <SelectItem key={bank.bank} value={bank.bank}>
                  {bank.name.ko}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="계좌번호"
          name={`${id}_account_number`}
          onChange={(e) =>
            setInfo((prev) => ({
              ...prev,
              accountNumber: e.target.value,
            }))
          }
          value={info.accountNumber}
        />
      </div>
    </div>
  );
};

export default BankAccount;
