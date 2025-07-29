"use client"; // Error boundaries must be Client Components

import { redirect } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!hasRedirected.current) {
      alert(error.message);
      hasRedirected.current = true;
      setTimeout(() => redirect("/"), 1500);
    }
  }, [error]);

  return null;
}
