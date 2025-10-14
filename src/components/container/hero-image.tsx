import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import FlexibleImage from './image-wrapper';
import { TypographySub, TypographyTitle } from '../ui/typography';

type HeroProps = {
  children: ReactNode;
  className?: string;
};

type HeroComponent = React.FC<HeroProps> & {
  Image: React.FC<HeroImageProps>;
  Overlay: React.FC<HeroOverlayProps>;
  Content: React.FC<HeroContentProps>;
  Title: React.FC<HeroTitleProps>;
  Subtitle: React.FC<HeroSubtitleProps>;
  Actions: React.FC<HeroActionsProps>;
};

const Hero: HeroComponent = ({ children, className }) => (
  <div className={cn('relative w-full', className)}>{children}</div>
);
Hero.displayName = 'Hero';

type HeroImageProps = {
  src: string;
  alt: string;
  fit?: 'cover' | 'contain';
  className?: string;
};

Hero.Image = ({ src, alt, fit = 'cover', className }: HeroImageProps) => (
  <FlexibleImage
    src={src}
    alt={alt}
    fit={fit}
    className={cn(
      'w-full h-full min-h-[345px] lg:h-[810px] object-[center_80%]',
      className
    )}
  />
);
Hero.Image.displayName = 'Hero.Image';

type HeroOverlayProps = {
  className?: string;
};

Hero.Overlay = ({ className }: HeroOverlayProps) => (
  <div
    className={cn(
      'absolute inset-0 z-10 w-full h-full min-h-[345px] lg:h-[810px] ob',
      className
    )}
  >
    <div className='absolute inset-0 bg-black/40' />
    <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.9)_80%)] lg:bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.9)_100%)]' />
  </div>
);
Hero.Overlay.displayName = 'Hero.Overlay';

type HeroContentProps = {
  children: ReactNode;
  className?: string;
};

Hero.Content = ({ children, className }: HeroContentProps) => (
  <div className={cn('px-4 lg:px-[140px]', className)}>
    <div
      className={cn(
        'relative z-10 mt-[-200px] lg:mt-[-500px]',
        'w-full max-w-[361px] lg:max-w-[635px]',
        'flex flex-col gap-6 lg:gap-12'
      )}
    >
      {children}
    </div>
  </div>
);
Hero.Content.displayName = 'Hero.Content';

type HeroTitleProps = {
  label: string;
  className?: string;
};

Hero.Title = ({ label, className }: HeroTitleProps) => (
  <TypographyTitle
    as='h1'
    label={label}
    lgSize='display-2xl'
    className={className}
  />
);
Hero.Title.displayName = 'Hero.Title';

type HeroSubtitleProps = {
  label: string;
  className?: string;
};

Hero.Subtitle = ({ label, className }: HeroSubtitleProps) => (
  <TypographySub label={label} className={className} />
);
Hero.Subtitle.displayName = 'Hero.Subtitle';

type HeroActionsProps = {
  children: ReactNode;
  className?: string;
};

Hero.Actions = ({ children, className }: HeroActionsProps) => (
  <div className={cn('flex flex-col lg:flex-row gap-4', className)}>
    {children}
  </div>
);
Hero.Actions.displayName = 'Hero.Actions';

export default Hero;
