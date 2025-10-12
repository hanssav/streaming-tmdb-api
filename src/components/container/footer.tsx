import React from 'react';
import FlexibleImage from './wrapper-image';
import { IMAGES } from '@/constants';
import { cn } from '@/lib/utils';

const Footer = () => {
  return (
    <footer
      className={cn(
        'flex flex-col lg:flex-row lg:justify-between lg:items-center',
        'p-4 gap-2 lg:py-2 lg:h-[120px] lg:px-[140px]',
        ' border-t border-white/20'
      )}
    >
      <FlexibleImage
        src={IMAGES.LOGO}
        alt='logo'
        className='h-[28px] w-[92px] lg:w-[130px] lg:h-10'
      />

      <p className='text-xs lg:text-md text-neutral-600'>
        Copyright ©2025 Movie Explorer
      </p>
    </footer>
  );
};

export default Footer;
