import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { IMAGES, PATH } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// HOC example
export const handleImageError =
  (fallback: string) => (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (target.src !== fallback) {
      target.src = fallback;
    }
  };

export const getSafeImage = (
  path?: string | null,
  fallback: string = IMAGES.DEFAULT_IMAGE,
  baseUrl: string = PATH.TMDB_IMAGES_URL
): string => {
  if (!path) return fallback;
  return baseUrl ? `${baseUrl}${path}` : path;
};

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
