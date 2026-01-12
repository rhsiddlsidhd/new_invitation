import { IGuestbook } from "@/models/guestbook.model";
import { motion } from "framer-motion";

import React, { useEffect, useMemo, useState } from "react";
import ActionConfirmationDialog from "./ActionConfirmationDialog";

const isPayloadValidation = (payload: unknown): payload is IGuestbook[] => {
  if (!Array.isArray(payload)) return false;
  return payload.every(
    (item) =>
      typeof item === "object" &&
      "_id" in item &&
      "coupleInfoId" in item &&
      "author" in item &&
      "message" in item &&
      "isPrivate" in item &&
      "createdAt" in item &&
      typeof item._id === "string" &&
      typeof item.author === "string" &&
      typeof item.message === "string" &&
      typeof item.isPrivate === "boolean" &&
      typeof item.coupleInfoId === "string" &&
      item.createdAt instanceof Date,
  );
};

const GuestbookView = ({ payload }: { payload: unknown }) => {
  console.log(payload);
  /**
   * GUESTBOOK ID
   */
  const [isDelete, setIsDelete] = useState<Record<string, boolean>>({});

  // const data = isPayloadValidation(payload) ? payload : [];
  const data = useMemo(() => {
    return isPayloadValidation(payload) ? payload : [];
  }, [payload]);

  console.log({ data });

  useEffect(() => {
    if (data) {
      data.forEach((item) => {
        setIsDelete((prev) => ({ ...prev, [item._id as string]: false }));
      });
    }
  }, [data, payload]);

  return (
    <div className="h-full text-gray-300">
      <p className="border-b-2 border-dotted border-gray-400 p-2 font-medium">
        방명록(축하글) 전체보기
      </p>

      <ul className="space-y-3 py-2">
        {data && data.length === 0 && (
          <li className="py-6 text-center text-gray-400">
            등록된 방명록이 없습니다.
          </li>
        )}

        {data &&
          data.map((item) => (
            <li
              className="relative flex items-start gap-3 rounded-md bg-gray-800/40 p-3 shadow-sm"
              key={item._id as string}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: !isDelete[item._id as string] ? 1 : 0,
                  y: !isDelete[item._id as string] ? 0 : -10,
                }}
                className="min-w-0 flex-1"
              >
                <p className="truncate text-sm font-medium text-white">
                  {item.author}
                </p>
                <p className="overflow-scroll-hidden wrap-break-words mt-1 line-clamp-3 overflow-hidden text-sm text-gray-200">
                  {item.message}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: !isDelete[item._id as string] ? 1 : 0,
                  y: !isDelete[item._id as string] ? 0 : -10,
                }}
                className="absolute top-2 right-2"
              >
                <ActionConfirmationDialog id={item._id as string} />
              </motion.div>

              {/* <GuestBookDeleteForm
                isDelete={isDelete}
                id={item._id}
                onCancel={() =>
                  setIsDelete((prev) => ({
                    ...prev,
                    [item._id]: false,
                  }))
                }
              /> */}
            </li>
          ))}

        {!data && (
          <li className="py-6 text-center text-gray-400">
            방명록을 불러오는 중입니다.
          </li>
        )}
      </ul>
    </div>
  );
};

export default GuestbookView;
//
