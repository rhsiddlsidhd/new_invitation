"use client";
import React, { useEffect, useRef, useState } from "react";
import Img from "../atoms/Img";
import { CloseIcon, DocArrowUpIcon } from "../atoms/Icon";
import Label from "../atoms/Label";
import OverlayCloseBtn from "./OverlayCloseBtn";
import { Field } from "./WeddingPartyInfo";
import Input from "../atoms/Input";

// const WeddingThumnailEdit = () => {
//   const inputRefs = useRef<Array<HTMLInputElement | null>>([null, null]);
//   const [thumbnailPreviews, setThumbnailPreviews] = useState<(string | null)[]>(
//     [null, null],
//   );

//   const handleUploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;

//     console.log("files", files);
//     const id = e.target.id;

//     const idx = Number(id.split("-")[1]);

//     const url = URL.createObjectURL(files[0]);
//     setThumbnailPreviews((prev) => {
//       const next = [...prev];
//       console.log(idx);
//       next[idx] = url;
//       return next;
//     });
//   };

//   useEffect(() => {
//     console.log(thumbnailPreviews);
//   }, [thumbnailPreviews]);

//   return (
//     <div>
//       <div className="flex justify-center gap-4 p-4">
//         {Array.from({ length: 2 }, (_, i) => {
//           return (
//             <Label
//               key={i}
//               htmlFor={`thumbnail-${i}`}
//               className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
//             >
//               {thumbnailPreviews[i] ? (
//                 <div>
//                   <Img src={thumbnailPreviews[i]} />
//                   <OverlayCloseBtn
//                     size="md"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       setThumbnailPreviews((prev) => {
//                         const next = [...prev];
//                         next[i] = null;
//                         return next;
//                       });
//                       if (inputRefs.current[i]) inputRefs.current[i].value = "";
//                     }}
//                   />
//                 </div>
//               ) : (
//                 <DocArrowUpIcon />
//               )}

//               <input
//                 type="file"
//                 id={`thumbnail-${i}`}
//                 name={`thumbnail`}
//                 className="absolute h-full w-full cursor-pointer opacity-0"
//                 onChange={handleUploadFiles}
//                 accept="image/*"
//                 ref={(el) => {
//                   inputRefs.current[i] = el;
//                 }}
//               />
//             </Label>
//           );
//         })}
//       </div>
//       <span className="flex justify-center text-xs break-keep text-gray-500">
//         현재 등록된 썸네일
//       </span>
//     </div>
//   );
// };

// const WeddingThunbnailReadOnly = () => {
//   const data = ["/marriage.jpg", null];
//   return (
//     <div>
//       <div className="flex justify-center gap-4 p-4">
//         {data.map((s, i) => (
//           <Label
//             key={i}
//             htmlFor={`thumbnail-${i}`}
//             className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
//           >
//             {s ? <Img src={s} /> : <span>썸네일이 없습니다.</span>}
//           </Label>
//         ))}
//       </div>
//       <span className="flex justify-center text-xs break-keep text-gray-500">
//         현재 등록된 썸네일
//       </span>
//     </div>
//   );
// };

const WeddingThumbnail = ({ readOnly }: { readOnly?: boolean }) => {
  const handleUploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    console.log("files", files);
    const id = e.target.id;

    const idx = Number(id.split("-")[1]);

    const url = URL.createObjectURL(files[0]);
    setThumbnailPreviews((prev) => {
      const next = [...prev];
      console.log(idx);
      next[idx] = url;
      return next;
    });
  };
  const [thumbnailPreviews, setThumbnailPreviews] = useState<(string | null)[]>(
    [null, null],
  );
  const inputRefs = useRef<Array<HTMLInputElement | null>>([null, null]);
  return (
    <div>
      <div className="flex justify-center gap-4 p-4">
        {Array.from({ length: 2 }, (_, i) => {
          // 유저 데이터가 있을떄는
          // const url = readOnly ? userData[i]: thumbnailPreviews[i]
          return (
            <Label
              className={`relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50`}
              key={i}
            >
              {thumbnailPreviews[i] ? (
                <div>
                  <Img src={thumbnailPreviews[i]} />
                  {!readOnly && (
                    <OverlayCloseBtn
                      size="md"
                      onClick={(e) => {
                        e.preventDefault();
                        setThumbnailPreviews((prev) => {
                          const next = [...prev];
                          next[i] = null;
                          return next;
                        });
                        if (inputRefs.current[i])
                          inputRefs.current[i].value = "";
                      }}
                    />
                  )}
                </div>
              ) : (
                <DocArrowUpIcon />
              )}
              {!readOnly && (
                <input
                  type="file"
                  id={`thumbnail-${i}`}
                  name={`thumbnail`}
                  onChange={handleUploadFiles}
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  className="absolute h-full w-full cursor-pointer opacity-0"
                />
              )}
            </Label>
          );
        })}
      </div>
      <span className="flex justify-center text-xs break-keep text-gray-500">
        현재 등록된 썸네일
      </span>
    </div>
  );
};

export default WeddingThumbnail;

/**
 *  <input
                type="file"
                id={`thumbnail-${i}`}
                name={`thumbnail`}
                className="absolute h-full w-full cursor-pointer opacity-0"
                onChange={handleUploadFiles}
                accept="image/*"
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
              />
 */
