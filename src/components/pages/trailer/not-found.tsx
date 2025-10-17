import { SectionWrapper } from '@/components/container';
import { Youtube } from 'lucide-react';
import React from 'react';

export const NotFound = () => {
  return (
    <SectionWrapper>
      <div className='flex flex-col items-center justify-center py-20 text-center'>
        <div className='w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center mb-6'>
          <Youtube className='w-10 h-10 text-gray-400' />
        </div>
        <p className='text-2xl font-bold text-white mb-2'>
          No videos available
        </p>
        <p className='text-gray-400'>Check back later for trailers and clips</p>
      </div>
    </SectionWrapper>
  );
};
