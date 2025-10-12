import React from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface FlexibleImageProps extends Omit<ImageProps, 'fill'> {
  className?: string;
  fit?: 'contain' | 'cover' | 'fill';
}

const FlexibleImage: React.FC<FlexibleImageProps> = ({
  src,
  alt,
  className,
  fit = 'contain',
  ...rest
}) => {
  return (
    <div className={cn('relative', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes='100vw'
        style={{ objectFit: fit }}
        priority
        {...rest}
      />
    </div>
  );
};

export default FlexibleImage;
