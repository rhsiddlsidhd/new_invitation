import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Label from "../atoms/Label";
import Input from "../atoms/Input";

type ParentRoleId =
  | "groom-father"
  | "groom-mother"
  | "bride-father"
  | "bride-mother";

type ParentRoleName = "신랑측 부" | "신랑측 모" | "신부측 부" | "신부측 모";

const WeddingParentInfo = ({ readOnly }: { readOnly?: boolean }) => {
  const [showParentFields, setShowParentFields] =
    useState<ParentRoleId>("groom-father");
  const fieldRef = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState<number>(0);
  const btnNames: { id: ParentRoleId; name: ParentRoleName }[] = [
    { id: "groom-father", name: "신랑측 부" },
    { id: "groom-mother", name: "신랑측 모" },
    { id: "bride-father", name: "신부측 부" },
    { id: "bride-mother", name: "신부측 모" },
  ];

  useEffect(() => {
    if (!fieldRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!fieldRef.current) return;
      const newHeight = fieldRef.current.offsetHeight;
      setMinHeight((prevHeight) => Math.max(prevHeight, newHeight));
    });

    resizeObserver.observe(fieldRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div>
      <div className="flex gap-1 space-y-4">
        {btnNames.map((n) => {
          return (
            <motion.button
              className="h-fit rounded-xl border-2 px-1 py-2 text-xs"
              key={n.id}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                setShowParentFields(n.id);
              }}
            >
              {n.name}
            </motion.button>
          );
        })}
      </div>

      <div style={{ minHeight }} className="relative">
        {/* Optional Parent Info */}
        {btnNames.map((n) => {
          const selected = n.id === showParentFields;
          return (
            <AnimatePresence key={n.id}>
              <motion.div
                initial={{ opacity: 0, y: "50%", pointerEvents: "none" }}
                animate={{
                  opacity: selected ? 1 : 0,
                  y: selected ? 0 : "50%",
                  pointerEvents: selected ? "auto" : "none",
                }}
                transition={{
                  ease: "linear",
                }}
                className="absolute w-full"
                ref={(el) => {
                  fieldRef.current = el;
                }}
              >
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <div className="flex-1">
                    <Label htmlFor={`${n.id}-name`}>성함</Label>
                    <Input
                      id={`${n.id}-name`}
                      name={`${n.id}-name`}
                      type="text"
                      readOnly={readOnly}
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`${n.id}-phone`}>전화번호</Label>
                    <Input
                      id={`${n.id}-phone`}
                      name={`${n.id}-phone`}
                      type="tel"
                      readOnly={readOnly}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <Label htmlFor={`${n.id}-account`}>계좌번호</Label>
                  <Input
                    id={`${n.id}-account`}
                    name={`${n.id}-account`}
                    type="text"
                    readOnly={readOnly}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          );
        })}
      </div>
    </div>
  );
};

export default WeddingParentInfo;
