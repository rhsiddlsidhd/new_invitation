"use client";
import { fetcher } from "@/api/fetcher";
import { Banks } from "@/app/api/banks/route";
import { Input } from "@/components/atoms/Input/Input";
import { Label } from "@/components/atoms/Label/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/Select";
import React, { useState } from "react";
import useSWR from "swr";

interface BankAccountInfo {
  bankName: string;
  accountNumber: string;
}

const BankAccount = ({ id }: { id: string }) => {
  const [info, setInfo] = useState<BankAccountInfo>({
    bankName: "",
    accountNumber: "",
  });

  const { data } = useSWR<{ items: Banks }>("/api/banks", fetcher);

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
            {data &&
              data.items.map((bank) => (
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
