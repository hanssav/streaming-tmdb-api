import { cn } from '@/lib/utils';
import { ElementType } from 'react';
import {
  TypographySize,
  typographyStyles,
  TypographySubProps,
  TypographyTitleProps,
} from './types';

const getResponsiveClasses = (
  size: TypographySize,
  breakpoint: 'sm' | 'lg'
) => {
  const baseClasses = typographyStyles[size].split(' ');
  return baseClasses.map((cls) => `${breakpoint}:${cls}`).join(' ');
};

export function TypographyTitle<T extends ElementType = 'p'>({
  as,
  className,
  label,
  size = 'display-xs',
  smSize,
  lgSize = 'display-lg',
  ...rest
}: TypographyTitleProps<T>) {
  const Component = as ?? 'p';

  return (
    <Component
      className={cn(
        'text-neutral-25 font-bold',
        typographyStyles[size],
        smSize && getResponsiveClasses(smSize, 'sm'),
        lgSize && getResponsiveClasses(lgSize, 'lg'),
        className
      )}
      {...rest}
    >
      {label}
    </Component>
  );
}

export function TypographySub({
  className,
  label,
  size = 'sm',
  smSize,
  lgSize = 'md',
  ...rest
}: TypographySubProps) {
  return (
    <p
      className={cn(
        'text-neutral-400',
        typographyStyles[size],
        smSize && getResponsiveClasses(smSize, 'sm'),
        lgSize && getResponsiveClasses(lgSize, 'lg'),
        className
      )}
      {...rest}
    >
      {label}
    </p>
  );
}
