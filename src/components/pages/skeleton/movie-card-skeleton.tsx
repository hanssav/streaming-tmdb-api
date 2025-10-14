import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const MovieCardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'flex flex-col rounded-xl overflow-hidden gap-3 lg:gap-5',
        className
      )}
    >
      <Skeleton className='w-full h-[266px] lg:h-[321px] rounded-xl' />

      <div className='space-y-2'>
        <Skeleton className='h-5 w-3/4 rounded-md' />

        <div className='flex gap-2 items-center'>
          <Skeleton className='w-5 h-5 rounded-full' />
          <Skeleton className='h-4 w-12 rounded-md' />
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
