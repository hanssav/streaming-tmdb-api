"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { TypographySub, TypographyTitle } from "../ui/typography";
import { useRoutingWithNProgress } from "@/hooks/useRoutingWithNProgress";

export type NotificationProps = {
  src: string;
  title: string;
  subtitle: string;
  btnLabel?: string;
  btnActionSrc?: string;
  className?: string;
};

const EmptyData: React.FC<NotificationProps> = ({
  src,
  title,
  subtitle,
  btnLabel,
  btnActionSrc,
  className,
}) => {
  const { push } = useRoutingWithNProgress();
  return (
    <div className={cn("flex h-86 items-center w-full", className)}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
        <div className="relative overflow-hidden w-40 aspect-square">
          <Image src={src} alt={title} fill priority sizes="160px" />
        </div>
        <div className="flex flex-col gap-1 justify-center items-center">
          <TypographyTitle className="font-bold" label={title} lgSize="lg" size="md" />
          <TypographySub size="md" lgSize="md" className=" text-center" label={subtitle} />
        </div>
        {btnActionSrc && (
          <Button onClick={() => push(btnActionSrc)} className="rounded-xl w-80">
            {btnLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyData;
