import { usePathname, useRouter } from "next/navigation";
import nProgress, { done } from "nprogress";
import React from "react";

export const useRoutingWithNProgress = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    nProgress.done();
  }, [pathname]);

  const push = React.useCallback(
    (path: string, onSamePath?: () => void) => {
      nProgress.start();
      if (pathname === path) {
        onSamePath?.();
        done();
        return;
      }

      startTransition(() => {
        router.push(path);
      });
    },
    [pathname, router],
  );

  return { push, isPending };
};
