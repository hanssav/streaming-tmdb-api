import { Star, Film, Shield, LucideIcon } from 'lucide-react';

export interface MovieMetaItem {
  icon: LucideIcon;
  label: string;
  value?: string;
  className?: string;
}

export const movieMeta: MovieMetaItem[] = [
  {
    icon: Star,
    label: 'Rating',
    value: '6.2/10',
    className: 'fill-[#E4A802] stroke-[#E4A802]',
  },
  {
    icon: Film,
    label: 'Genre',
    value: 'Action',
  },
  {
    icon: Shield,
    label: 'Age Limit',
    value: '13+',
  },
];
