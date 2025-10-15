'use client';

import React from 'react';
import { SectionWrapper } from '@/components/container';
import { Skeleton } from '@/components/ui/skeleton';

const CreditSkeleton: React.FC = () => {
  return (
    <SectionWrapper>
      <Skeleton className='h-7 w-24 lg:h-10 lg:w-44 rounded-md mb-6' />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-10'>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className='flex items-center gap-4 bg-transparent rounded-xl'
          >
            <Skeleton className='w-[80px] h-[100px] lg:w-[120px] lg:h-[150px] rounded-xl' />

            <div className='flex flex-col justify-center space-y-2 flex-1'>
              <Skeleton className='h-4 w-3/4 rounded-md' />
              <Skeleton className='h-4 w-1/2 rounded-md' />
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default CreditSkeleton;
