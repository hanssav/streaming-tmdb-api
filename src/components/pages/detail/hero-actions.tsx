import { Hero, ShowOrSkeleton } from '@/components/container';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Heart, LucidePlayCircle } from 'lucide-react';
import { Spin } from '../skeleton';

const HeroAction: React.FC<{
  isFavorited: boolean;
  onChange: () => void;
  className?: string;
  isLoading: boolean;
  onWatchTrailer: () => void;
}> = ({
  isFavorited = false,
  onChange,
  className = 'lg:hidden',
  isLoading,
  onWatchTrailer,
}) => {
  return (
    <Hero.Actions className={cn('flex flex-row gap-4 items-center', className)}>
      <Button className='flex-1' size='lg' onClick={onWatchTrailer}>
        Watch Trailer
        <LucidePlayCircle />
      </Button>
      <button
        type='button'
        onClick={onChange}
        className={cn(
          'bg-neutral-900 transition-all duration-300 hover:scale-105',
          'rounded-full flex items-center justify-center relative size-11'
        )}
      >
        <ShowOrSkeleton isLoading={isLoading} skeleton={<Spin />}>
          <Heart
            className={cn(
              'absolute size-6 transition-all duration-300',
              isFavorited
                ? 'stroke-primary-300 fill-primary-300'
                : 'stroke-gray-300'
            )}
          />
        </ShowOrSkeleton>
      </button>
    </Hero.Actions>
  );
};

export default HeroAction;
