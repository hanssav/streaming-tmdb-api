import { usePathname, useRouter } from "next/navigation";
import nProgress from "nprogress";
import React from "react";

export const useRoutingWithNProgress = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    nProgress.done();
  }, [pathname]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const done = React.useCallback(() => nProgress.done(), [pathname]);

  const push = React.useCallback(
    (path: string) => {
      nProgress.start();
      startTransition(() => {
        router.push(path);
      });
      if (pathname === path) return done();
    },
    [pathname, done, router],
  );

  return {
    push,
    done,
    isPending,
  };
};
