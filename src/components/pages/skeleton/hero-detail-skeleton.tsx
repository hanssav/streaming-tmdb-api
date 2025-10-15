'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const HeroDetailSkeleton: React.FC = () => {
  return (
    <div className='w-full min-h-[345px] lg:h-[810px] relative overflow-hidden'>
      <Skeleton className='w-full h-full min-h-[345px] lg:h-[810px] rounded-none' />
      <div className='absolute inset-0 bg-black/50' />
      <div className='absolute inset-0 z-30 flex flex-col px-4 lg:px-[140px]'>
        <div className='mt-[160px] lg:mt-auto'>
          <div className='flex flex-row gap-4 lg:gap-6'>
            <Skeleton className='min-w-[116px] min-h-[171px] rounded-xl lg:min-w-[260px] lg:min-h-[384px]' />
            <div className='flex-1 flex flex-col gap-5 lg:gap-6'>
              <Skeleton className='h-6 w-2/3 lg:h-10 lg:w-1/2 rounded-md' />
              <div className='flex gap-1 items-center'>
                <Skeleton className='h-4 w-4 rounded-md' />
                <Skeleton className='h-4 w-24 rounded-md' />
              </div>
              <div className='hidden lg:flex gap-4'>
                <Skeleton className='h-10 w-full rounded-md' />
                <Skeleton className='h-10 w-10 rounded-full' />
              </div>
              <div className='hidden lg:flex gap-3'>
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className='flex-1 flex flex-col items-center gap-2 p-3 rounded-md bg-neutral-800/40'
                  >
                    <Skeleton className='w-8 h-8 rounded-md' />
                    <Skeleton className='w-12 h-3 rounded-md' />
                    <Skeleton className='w-16 h-4 rounded-md' />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='flex gap-4 mt-6 lg:hidden'>
            <Skeleton className='h-10 w-full rounded-md flex-1' />
            <Skeleton className='h-10 w-10 rounded-full' />
          </div>
          <div className='flex gap-3 mt-4 lg:hidden'>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className='flex-1 flex flex-col items-center gap-2 p-3 rounded-md bg-neutral-800/40'
              >
                <Skeleton className='w-8 h-8 rounded-md' />
                <Skeleton className='w-12 h-3 rounded-md' />
                <Skeleton className='w-16 h-4 rounded-md' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDetailSkeleton;
