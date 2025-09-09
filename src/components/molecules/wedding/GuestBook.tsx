import { GuestBookView } from "@/components/template/invitation/InvitationContainer";
import { useModalStore } from "@/store/modalStore";
import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import GuestBookDeleteForm from "@/components/organisms/forms/GuestBookDeleteForm";
import OverlayCloseBtn from "../btns/OverlayCloseBtn";

const isPayloadValidation = (payload: unknown): payload is GuestBookView[] => {
  if (!Array.isArray(payload)) return false;
  return payload.every(
    (item) =>
      typeof item === "object" &&
      "_id" in item &&
      "name" in item &&
      "message" in item &&
      typeof item._id === "string" &&
      typeof item.name === "string" &&
      typeof item.message === "string",
  );
};

const GuestBook = () => {
  const { payload } = useModalStore();
  const [isDelete, setIsDelete] = useState<Record<string, boolean>>({});

  const valid = isPayloadValidation(payload);

  useEffect(() => {
    if (valid) {
      payload.forEach((item) => {
        setIsDelete((prev) => ({ ...prev, [item._id]: false }));
      });
    }
  }, [valid, payload]);

  return (
    <div className="h-full text-gray-300">
      <p className="border-b-2 border-dotted border-gray-400 p-2 font-medium">
        방명록(축하글) 전체보기
      </p>

      <ul className="space-y-3 py-2">
        {valid && payload.length === 0 && (
          <li className="py-6 text-center text-gray-400">
            등록된 방명록이 없습니다.
          </li>
        )}

        {valid &&
          [...payload].reverse().map((item) => (
            <li
              className="relative flex items-start gap-3 rounded-md bg-gray-800/40 p-3 shadow-sm"
              key={item._id}
              id={item._id}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: !isDelete[item._id] ? 1 : 0,
                  y: !isDelete[item._id] ? 0 : -10,
                }}
                className="min-w-0 flex-1"
              >
                <p className="truncate text-sm font-medium text-white">
                  {item.name}
                </p>
                <p className="overflow-scroll-hidden mt-1 line-clamp-3 overflow-hidden text-sm break-words text-gray-200">
                  {item.message}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: !isDelete[item._id] ? 1 : 0,
                  y: !isDelete[item._id] ? 0 : -10,
                }}
                className="absolute top-2 right-2 w-full"
              >
                <OverlayCloseBtn
                  size="sm"
                  onClick={() => {
                    setIsDelete((prev) => {
                      const newState: Record<string, boolean> = {};
                      Object.keys(prev).forEach((key) => {
                        newState[key] = key === item._id ? !prev[key] : false;
                      });
                      return newState;
                    });
                  }}
                />
              </motion.div>
              {/* <motion.div
                initial={{ opacity: 0, y: -10, pointerEvents: "none" }}
                animate={{
                  opacity: !isDelete[item._id] ? 0 : 1,
                  y: !isDelete[item._id] ? -10 : 0,
                  pointerEvents: !isDelete[item._id] ? "none" : "auto",
                }}
                className="absolute inset-0 flex h-full items-center justify-between gap-1 rounded-md p-2 text-xs"
              >
                <Input type="password" />
                <div className="flex gap-2">
                  <Btn onClick={() => handleRemove(item._id)} className="h-fit">
                    확인
                  </Btn>
                  <Btn
                    className="h-fit"
                    onClick={() =>
                      setIsDelete((prev) => ({
                        ...prev,
                        [item._id]: false,
                      }))
                    }
                  >
                    취소
                  </Btn>
                </div>
              </motion.div> */}
              <GuestBookDeleteForm
                isDelete={isDelete}
                id={item._id}
                onCancel={() =>
                  setIsDelete((prev) => ({
                    ...prev,
                    [item._id]: false,
                  }))
                }
              />
            </li>
          ))}

        {!valid && (
          <li className="py-6 text-center text-gray-400">
            방명록을 불러오는 중입니다.
          </li>
        )}
      </ul>
    </div>
  );
};

export default GuestBook;
//
