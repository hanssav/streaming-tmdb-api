type TypographySize =
  | 'display-3xl'
  | 'display-2xl'
  | 'display-xl'
  | 'display-lg'
  | 'display-md'
  | 'display-sm'
  | 'display-xs'
  | 'xl'
  | 'lg'
  | 'md'
  | 'sm'
  | 'xs';

const typographyStyles: Record<TypographySize, string> = {
  'display-3xl': 'text-display-3xl leading-display-3xl',
  'display-2xl': 'text-display-2xl leading-display-2xl tracking-display-2xl',
  'display-xl': 'text-display-xl leading-display-xl tracking-display-xl',
  'display-lg': 'text-display-lg leading-display-lg tracking-display-lg',
  'display-md': 'text-display-md leading-display-md',
  'display-sm': 'text-display-sm leading-display-sm',
  'display-xs': 'text-display-xs leading-display-xs',
  xl: 'text-xl leading-xl',
  lg: 'text-lg leading-lg',
  md: 'text-md leading-md',
  sm: 'text-sm leading-sm',
  xs: 'text-xs leading-xs',
};

type TypographyTitleProps<T extends React.ElementType = 'p'> = {
  as?: T;
  className?: string;
  label?: string;
  size?: TypographySize;
  smSize?: TypographySize;
  lgSize?: TypographySize;
} & Omit<React.ComponentPropsWithoutRef<T>, 'size'>;

type TypographySubProps = {
  className?: string;
  label?: string;
  size?: TypographySize;
  smSize?: TypographySize;
  lgSize?: TypographySize;
} & React.ComponentPropsWithoutRef<'p'>;

export { typographyStyles };
export type { TypographySize, TypographyTitleProps, TypographySubProps };
