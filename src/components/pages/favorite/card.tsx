import FlexibleImage, {
  FlexibleImageProps,
} from '@/components/container/image-wrapper';
import { TypographySub } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { Heart, Star } from 'lucide-react';
import { ComponentPropsWithoutRef } from 'react';

const CardMovie: React.FC<
  {
    children: React.ReactNode;
    className?: string;
  } & ComponentPropsWithoutRef<'div'>
> = ({ children, className, ...props }) => {
  return (
    <div className={cn('flex flex-col gap-6 lg:gap-8', className)} {...props}>
      {children}
    </div>
  );
};

const Image: React.FC<FlexibleImageProps> = ({ src, alt, className }) => {
  return (
    <FlexibleImage
      src={src}
      alt={alt}
      className={cn(
        'rounded-md lg:rounded-xl min-w-[104px] lg:min-w-[182px] min-h-[156px] lg:min-h-[270px]',
        className
      )}
    />
  );
};

const Content: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('flex-col gap-2 lg-gap-6', className)}>{children}</div>
  );
};

const RatingWithValue: React.FC<{ value?: number; className?: string }> = ({
  value,
  className,
}) => (
  <div className={cn('flex gap-2 items-center', className)}>
    <span className='relative w-5 h-5'>
      <Star className='absolute w-5 h-5 stroke-gray-300' />
      <Star className='absolute w-5 h-5 stroke-yellow-400 fill-yellow-400' />
    </span>
    <TypographySub
      lgSize='lg'
      size='md'
      className='text-white'
      label={`${value?.toFixed(1)}/10`}
    />
  </div>
);

const Actions: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => {
  return <div className={cn('flex gap-4', className)}>{children}</div>;
};

const HeartButton: React.FC<{
  className?: string;
  isFavorited?: number | boolean;
  onChange?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ className, isFavorited, onChange }) => {
  return (
    <button
      type='button'
      onClick={onChange}
      className={cn(
        'bg-neutral-900 transition-all duration-300 hover:scale-105 cursor-pointer',
        'rounded-full flex items-center justify-center relative size-11',
        className
      )}
    >
      <Heart
        className={cn(
          'absolute size-6 transition-all duration-300',
          isFavorited
            ? 'stroke-primary-300 fill-primary-300'
            : 'stroke-gray-300'
        )}
      />
    </button>
  );
};

export const Card = {
  CardMovie,
  Image,
  Content,
  RatingWithValue,
  Actions,
  HeartButton,
};
