import { SectionWrapper } from '@/components/container';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const OverviewDetailSkeleton = () => {
  return (
    <SectionWrapper>
      <Skeleton className='h-7 w-32 lg:h-10 lg:w-64 rounded-md mb-4' />
      <div className='space-y-3'>
        {[...Array(4)].map((_, i) => (
          <Skeleton
            key={i}
            className={`h-4 rounded-md ${i === 3 ? 'w-2/3' : 'w-full'}`}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default OverviewDetailSkeleton;
