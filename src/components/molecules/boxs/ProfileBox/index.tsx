"use client";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import Box from "@/components/layout/Box";
import React, { useEffect } from "react";

const ProfileBox = ({ userId, email }: { userId: string; email: string }) => {
  useEffect(() => {
    const deleteCookie = async () => {
      await fetch("/api/pwd-verified", {
        method: "DELETE",
      });
    };
    deleteCookie();
  }, []);

  return (
    <Box className="shadow-2xl">
      <div className="flex items-center gap-4 border-b-1 border-[#e9ecef] pb-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#007cba]">
          <span className="text-3xl font-bold text-white">
            {userId.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#333]">{userId}</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <div className="my-2">
          <Label className="font-bold text-[#555]">사용자 ID</Label>
          <Input readOnly value={userId} className="bg-[#f8f9fa] py-4" />
        </div>

        <div className="my-2">
          <Label className="font-bold text-[#555]">이메일 주소</Label>
          <Input readOnly value={email} className="bg-[#f8f9fa] py-4" />
        </div>
      </div>
    </Box>
  );
};

export default ProfileBox;
