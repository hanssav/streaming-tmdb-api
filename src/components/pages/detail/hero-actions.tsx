import { Hero } from '@/components/container';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Heart, LucidePlayCircle } from 'lucide-react';

const HeroAction: React.FC<{
  isFavorited: boolean;
  onChange: () => void;
  className?: string;
  onWatchTrailer: () => void;
}> = ({
  isFavorited = false,
  onChange,
  className = 'lg:hidden',
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
          'bg-neutral-900 transition-all duration-300 hover:scale-105 cursor-pointer',
          'rounded-full flex items-center justify-center relative size-11'
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
    </Hero.Actions>
  );
};

export default HeroAction;
