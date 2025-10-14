import { cn } from '@/lib/utils';
import React from 'react';

type SectionWrapperProps = {
  className?: string;
  id?: string;
  children: React.ReactNode;
};

type OverlayProps = {
  className?: string;
};

const SectionWrapper: React.FC<SectionWrapperProps> & {
  Overlay: React.FC<OverlayProps>;
} = ({ className, id, children }) => {
  return (
    <section
      id={id}
      className={cn(
        'flex flex-col gap-6 lg:gap-10 px-4 lg:px-[140px] py-10 lg:pt-0 lg:pb-20 relative',
        className
      )}
    >
      {children}
    </section>
  );
};

SectionWrapper.displayName = 'SectionWrapper';

SectionWrapper.Overlay = ({ className }) => (
  <div
    className={cn(
      'absolute bottom-0 left-0 w-full min-h-[500px] z-10 pointer-events-none bg-gradient-to-t from-black via-black/80 to-black/10',
      className
    )}
  />
);
SectionWrapper.Overlay.displayName = 'SectionWrapper.Overlay';

export default SectionWrapper;
