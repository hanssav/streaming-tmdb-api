import { SectionWrapper } from '@/components/container';
import React from 'react';

export const Loading = () => {
  return (
    <SectionWrapper className='py-6 pt-0 min-h-[calc(100vh-8rem-5rem)]'>
      <div className='flex flex-col lg:flex-row gap-8'>
        <div className='flex-1 lg:flex-[0_0_68%]'>
          <div className='w-full aspect-video bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse rounded-2xl' />
          <div className='mt-6 space-y-3'>
            <div className='h-8 bg-gray-800 animate-pulse rounded-lg w-3/4' />
            <div className='h-6 bg-gray-800 animate-pulse rounded-lg w-1/2' />
          </div>
        </div>
        <div className='lg:flex-[0_0_32%] space-y-4'>
          <div className='h-6 bg-gray-800 animate-pulse rounded-lg w-32' />
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className='h-28 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse rounded-xl'
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
