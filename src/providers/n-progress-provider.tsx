"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

declare global {
  interface Window {
    NProgress: typeof NProgress;
  }
}

NProgress.configure({
  showSpinner: false,
  speed: 200,
  minimum: 0.1,
  trickleSpeed: 200,
});

export function NProgressProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.NProgress = NProgress;
    }
  }, []);

  return null;
}
