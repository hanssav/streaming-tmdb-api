import React from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

export type FlexibleImageProps = Omit<ImageProps, 'fill'> & {
  className?: string;
  children?: React.ReactNode;
  fit?: 'contain' | 'cover' | 'fill';
  size?: string;
};

const FlexibleImage: React.FC<FlexibleImageProps> = ({
  src,
  alt,
  className,
  sizes,
  fit = 'contain',
  children,
  ...rest
}) => {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? '100%'}
        style={{ objectFit: fit }}
        priority
        {...rest}
      />
      {children}
    </div>
  );
};

export default FlexibleImage;
