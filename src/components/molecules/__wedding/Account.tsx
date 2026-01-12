// import Btn from "@/components/atoms/Btn";
// import { AccountPayload } from "@/components/template/__InvitationContainer";
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const Account = ({ data }: { data: AccountPayload[] }) => {
//   const [openGroom, setOpenGroom] = useState(false);
//   const [openBride, setOpenBride] = useState(false);

//   const groomData = data.filter((item) => item.id.includes("groom"));
//   const brideData = data.filter((item) => item.id.includes("bride"));

//   const variants = {
//     hidden: { height: 0, opacity: 0 },
//     visible: { height: "auto", opacity: 1 },
//   };

//   return (
//     <div className="m-auto mb-[6rem] flex w-3/4 flex-col gap-2 text-xs">
//       {/* Groom Section */}
//       <Btn
//         textColor="black"
//         bgColor="bg-gray-200"
//         onClick={() => setOpenGroom((prev) => !prev)}
//         className="text-sm font-bold"
//       >
//         신랑측
//       </Btn>
//       <AnimatePresence initial={false}>
//         {openGroom && (
//           <motion.ul
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             variants={variants}
//             transition={{ duration: 0.3 }}
//             className="overflow-hidden"
//           >
//             {groomData.map((item) => (
//               <li
//                 key={item.id}
//                 className="grid grid-cols-2 truncate rounded-sm p-2"
//               >
//                 <span>{item.name}</span>
//                 <span>{item.account}</span>
//               </li>
//             ))}
//           </motion.ul>
//         )}
//       </AnimatePresence>

//       {/* Bride Section */}
//       <Btn
//         textColor="black"
//         bgColor="bg-gray-200"
//         onClick={() => setOpenBride((prev) => !prev)}
//         className="text-sm font-bold"
//       >
//         신부측
//       </Btn>
//       <AnimatePresence initial={false}>
//         {openBride && (
//           <motion.ul
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             variants={variants}
//             transition={{ duration: 0.3 }}
//             className="overflow-hidden"
//           >
//             {brideData.map((item) => (
//               <li key={item.id} className="grid grid-cols-2 truncate px-2 py-1">
//                 <span>{item.name}</span>
//                 <span>{item.account}</span>
//               </li>
//             ))}
//           </motion.ul>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Account;
