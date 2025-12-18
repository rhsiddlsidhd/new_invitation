import { cn } from "@/shared/lib/utils";
import React from "react";

const Grid = ({
  className,
  slot = "",
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <section
      data-slot={`${slot}-grid`}
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
      {...props}
    />
  );
};

export default Grid;
