import FlexibleImage, {
  FlexibleImageProps,
} from '@/components/container/image-wrapper';
import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef } from 'react';

const CastCrewCard: React.FC<
  {
    children: React.ReactNode;
    className?: string;
  } & ComponentPropsWithoutRef<'div'>
> = ({ children, className, ...props }) => {
  return (
    <div className={cn('flex gap-3 lg:gap-4 rounded-md', className)} {...props}>
      {children}
    </div>
  );
};

const Image: React.FC<FlexibleImageProps> = ({
  src,
  alt,
  className,
  ...props
}) => {
  return (
    <FlexibleImage
      alt={alt}
      src={src}
      className={cn(
        'w-full h-full min-h-[84px] max-w-[55px] lg:min-h-[104px] lg:max-w-[69px] rounded-md',
        className
      )}
      fit='cover'
      {...props}
    />
  );
};

const Info: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('flex flex-col justify-center', className)}>
      {children}
    </div>
  );
};

export const CreditsCard = Object.assign(CastCrewCard, { Image, Info });

export default CreditsCard;
