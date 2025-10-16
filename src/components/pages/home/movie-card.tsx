import { Star } from 'lucide-react';
import { cn, getSafeImage } from '@/lib/utils';
import FlexibleImage from '../../container/image-wrapper';
import { TypographyTitle, TypographySub } from '../../ui/typography';
import { IMAGES, PATH } from '@/lib/constants';
import { ComponentPropsWithRef } from 'react';

type MovieCardProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentPropsWithRef<'div'>;

type MovieCardImageProps = {
  src: string | null;
  alt: string;
  className?: string;
};

type MovieCardContentProps = {
  children: React.ReactNode;
  className?: string;
};

type MovieCardTitleProps = {
  children: React.ReactNode;
  className?: string;
};

type MovieCardRatingProps = {
  value: number;
  className?: string;
};

type MovieCardComponent = React.FC<MovieCardProps> & {
  Image: React.FC<MovieCardImageProps>;
  Content: React.FC<MovieCardContentProps>;
  Title: React.FC<MovieCardTitleProps>;
  Rating: React.FC<MovieCardRatingProps>;
};

const MovieCard: MovieCardComponent = ({ children, className, ...props }) => (
  <div
    className={cn(
      'flex flex-col rounded-xl overflow-hidden gap-3 lg:gap-5 cursor-pointer',
      className
    )}
    {...props}
  >
    {children}
  </div>
);
MovieCard.displayName = 'MovieCard';

MovieCard.Image = ({ src, alt, className }) => (
  <FlexibleImage
    alt={alt}
    src={getSafeImage(src, IMAGES.DEFAULT_IMAGE)}
    className={cn('w-full h-auto min-h-[266px] lg:min-h-[321px]', className)}
    fit='cover'
  />
);
MovieCard.Image.displayName = 'MovieCard.Image';

MovieCard.Content = ({ children, className }) => (
  <div className={cn('space-y-0.5', className)}>{children}</div>
);
MovieCard.Content.displayName = 'MovieCard.Content';

MovieCard.Title = ({ children, className }) => (
  <TypographyTitle
    label={children as string}
    size='md'
    lgSize='lg'
    className={cn('font-semibold', className)}
  />
);
MovieCard.Title.displayName = 'MovieCard.Title';

MovieCard.Rating = ({ value, className }) => (
  <div className={cn('flex gap-0.5 items-center', className)}>
    <span className='relative w-5 h-5'>
      <Star className='absolute w-5 h-5 stroke-gray-300' />
      <Star className='absolute w-5 h-5 stroke-yellow-400 fill-yellow-400' />
    </span>
    <TypographySub label={`${value.toFixed(1)}/10`} />
  </div>
);
MovieCard.Rating.displayName = 'MovieCard.Rating';

export default MovieCard;
