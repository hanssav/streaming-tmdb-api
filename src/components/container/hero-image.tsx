import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import FlexibleImage, { FlexibleImageProps } from './image-wrapper';
import { TypographySub, TypographyTitle } from '../ui/typography';
import { TypographySubProps, TypographyTitleProps } from '../ui/types';

type HeroProps = {
  children: ReactNode;
  className?: string;
};

type HeroComponent = React.FC<HeroProps> & {
  Image: React.FC<HeroImageProps>;
  Overlay: React.FC<HeroOverlayProps>;
  Content: React.FC<HeroContentProps>;
  Title: React.FC<TypographyTitleProps>;
  Subtitle: React.FC<TypographySubProps>;
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
} & FlexibleImageProps;

Hero.Image = ({
  src,
  alt,
  fit = 'cover',
  className,
  ...props
}: HeroImageProps) => (
  <FlexibleImage
    src={src}
    alt={alt}
    fit={fit}
    className={cn(
      'w-full h-full min-h-[392px] lg:h-[810px] object-[center_80%]',
      className
    )}
    {...props}
  />
);
Hero.Image.displayName = 'Hero.Image';

type HeroOverlayProps = {
  className?: string;
};

Hero.Overlay = ({ className }: HeroOverlayProps) => (
  <div
    className={cn(
      'absolute inset-0 z-10 w-full h-full min-h-[345px] lg:h-[810px]',
      className
    )}
  >
    <div
      className={cn(
        'absolute bottom-0 left-0 w-full min-h-full z-30 pointer-events-none bg-gradient-to-t from-black via-black/90 lg:via-black/50 to-black/0'
      )}
    />
  </div>
);
Hero.Overlay.displayName = 'Hero.Overlay';

type HeroContentProps = {
  children: ReactNode;
  className?: string;
};

Hero.Content = ({ children, className }: HeroContentProps) => (
  <div
    className={cn(
      'mx-4 lg:mx-[140px] relative z-10 mt-[-200px] lg:mt-[-500px]',
      'flex flex-col gap-6 lg:gap-12',
      className
    )}
  >
    {children}
  </div>
);
Hero.Content.displayName = 'Hero.Content';

Hero.Title = ({ label, className, ...props }: TypographyTitleProps) => (
  <TypographyTitle
    as='h1'
    label={label}
    lgSize='display-2xl'
    className={className}
    {...props}
  />
);
Hero.Title.displayName = 'Hero.Title';

Hero.Subtitle = ({ label, className, ...props }: TypographySubProps) => (
  <TypographySub label={label} className={className} {...props} />
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
