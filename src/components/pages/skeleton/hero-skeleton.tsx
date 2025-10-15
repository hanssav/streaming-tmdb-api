import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const HeroImageSkeleton = () => (
  <div className='relative w-full min-h-[345px] lg:h-[810px] overflow-hidden'>
    <Skeleton className='w-full h-full min-h-[345px] lg:h-[810px] rounded-none' />

    <div className='absolute inset-0 flex flex-col justify-end px-4 lg:px-[140px] pb-12'>
      <div className='space-y-4 max-w-[361px] lg:max-w-[635px]'>
        <Skeleton className='h-12 lg:h-20 w-3/4 rounded-md' />
        <Skeleton className='h-6 w-1/2 rounded-md' />
        <div className='flex gap-4 mt-4'>
          <Skeleton className='h-10 w-32 rounded-md' />
          <Skeleton className='h-10 w-32 rounded-md' />
        </div>
      </div>
    </div>
  </div>
);

export default HeroImageSkeleton;
