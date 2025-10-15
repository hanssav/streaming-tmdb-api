import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const FavoriteCardSkeleton = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div className={'flex gap-3 lg:gap-10'}>
        <Skeleton className='rounded-md lg:rounded-xl w-full max-w-[104px] lg:min-w-[182px] min-h-[156px] lg:min-h-[270px]' />

        <div className='space-y-4 flex-1 lg:space-y-6'>
          <Skeleton className='h-5 w-3/4 lg:w-1/4 rounded-md' />

          <div className='flex gap-4 items-center'>
            <Skeleton className='w-5 h-5 rounded-full' />
            <Skeleton className='h-4 w-12 rounded-md' />
          </div>
          <Skeleton className='h-3 w-full lg:w-9/10 rounded-md' />
          <Skeleton className='h-3 w-2/3 rounded-md' />

          <Skeleton className='h-8 w-1/4 rounded-xl hidden lg:flex' />
        </div>
        <Skeleton className='size-10 rounded-full hidden lg:block self-center' />
      </div>

      <div className='flex gap-4 lg:hidden'>
        <Skeleton className='h-8 w-full flex-1 rounded-xl' />
        <Skeleton className='size-8 rounded-full' />
      </div>
    </div>
  );
};

export default FavoriteCardSkeleton;
