import React, { ComponentPropsWithoutRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import FlexibleImage, {
  FlexibleImageProps,
} from '@/components/container/image-wrapper';

export type Video = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
};

type VideoCardContextValue = {
  isSelected: boolean;
  onClick: () => void;
  index: number;
  video: Video;
};

const VideoCardContext = React.createContext<VideoCardContextValue | undefined>(
  undefined
);

const useVideoCardContext = () => {
  const ctx = React.useContext(VideoCardContext);
  if (!ctx) {
    throw new Error('VideoCard components must be used within VideoCard.Root');
  }
  return ctx;
};

type RootProps = {
  children: React.ReactNode;
  video: Video;
  isSelected: boolean;
  onClick: () => void;
  index: number;
};

const Root: React.FC<RootProps> = ({
  children,
  video,
  isSelected,
  onClick,
  index,
}) => {
  return (
    <VideoCardContext.Provider value={{ index, isSelected, onClick, video }}>
      {children}
    </VideoCardContext.Provider>
  );
};

type MotionProps = {
  children: React.ReactNode;
  className?: string;
};

const Motion: React.FC<MotionProps> = ({ className, children }) => {
  const { isSelected, index, onClick } = useVideoCardContext();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group cursor-pointer rounded-xl overflow-hidden transition-all duration-300',
        isSelected
          ? 'bg-gradient-to-br from-[#961200]/20 to-[#c41800]/10 ring-2 ring-[#961200] shadow-lg shadow-[#961200]/20'
          : 'bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20',
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const Layout: React.FC<LayoutProps> = ({ className, children }) => {
  return <div className={cn('flex gap-3 p-3', className)}>{children}</div>;
};

type ImageProps = {
  className?: string;
  children?: React.ReactNode;
} & Omit<FlexibleImageProps, 'src' | 'alt'>;

const Image: React.FC<ImageProps> = ({ className, children, ...props }) => {
  const { video } = useVideoCardContext();
  const thumbnailUrl = `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`;

  return (
    <FlexibleImage
      src={thumbnailUrl}
      alt={video.name}
      className={cn(
        'relative w-40 flex-shrink-0 aspect-video rounded-lg overflow-hidden bg-gray-800',
        className
      )}
      {...props}
    >
      {children}
    </FlexibleImage>
  );
};

type OverlayLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const OverlayLayout: React.FC<OverlayLayoutProps> = ({
  className,
  children,
}) => (
  <div
    className={cn(
      'absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center',
      className
    )}
  >
    {children}
  </div>
);

const OverlayPlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <motion.div
    initial={{ scale: 0 }}
    whileHover={{ scale: 1 }}
    className={cn(
      'w-12 h-12 bg-gradient-to-br from-[#961200] to-[#c41800] rounded-full flex items-center justify-center shadow-lg',
      className
    )}
  >
    <Play className='w-6 h-6 text-white fill-white ml-0.5' />
  </motion.div>
);

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

const Badge: React.FC<BadgeProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold rounded',
        className
      )}
    >
      {children}
    </div>
  );
};

type IndicatorProps = {
  className?: string;
} & ComponentPropsWithoutRef<typeof motion.div>;

const Indicator: React.FC<IndicatorProps> = ({ className, ...props }) => {
  const { isSelected } = useVideoCardContext();

  if (!isSelected) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={cn(
        'absolute top-2 left-2 w-3 h-3 bg-[#961200] rounded-full shadow-lg',
        className
      )}
      {...props}
    >
      <span className='absolute inset-0 bg-[#961200] rounded-full animate-ping' />
    </motion.div>
  );
};

type InfoProps = {
  children: React.ReactNode;
  className?: string;
};

const Info: React.FC<InfoProps> = ({ children, className }) => (
  <div
    className={cn(
      'flex-1 min-w-0 flex flex-col justify-between py-1',
      className
    )}
  >
    {children}
  </div>
);

const InfoText: React.FC<InfoProps> = ({ className, children }) => (
  <div className={cn(className)}>{children}</div>
);

type InfoTitleProps = {
  children?: React.ReactNode;
  className?: string;
};

const InfoTitle: React.FC<InfoTitleProps> = ({ children, className }) => {
  const { video } = useVideoCardContext();

  return (
    <h4
      className={cn(
        'text-sm font-semibold text-white line-clamp-2 mb-2 leading-snug',
        className
      )}
    >
      {children || video.name}
    </h4>
  );
};

const InfoBadgeGroup: React.FC<InfoProps> = ({ className, children }) => (
  <div className={cn('flex flex-col gap-1.5', className)}>{children}</div>
);

type InfoTypeBadgeProps = {
  children?: React.ReactNode;
  className?: string;
};

const InfoTypeBadge: React.FC<InfoTypeBadgeProps> = ({
  children,
  className,
}) => {
  const { video } = useVideoCardContext();

  return (
    <span
      className={cn(
        'self-start px-2 py-0.5 text-[10px] font-bold rounded',
        video.type === 'Trailer'
          ? 'bg-[#961200] text-white'
          : video.type === 'Teaser'
          ? 'bg-purple-600 text-white'
          : video.type === 'Clip'
          ? 'bg-green-600 text-white'
          : 'bg-gray-600 text-white',
        className
      )}
    >
      {children || video.type}
    </span>
  );
};

type InfoOfficialBadgeProps = {
  children?: React.ReactNode;
  className?: string;
};

const InfoOfficialBadge: React.FC<InfoOfficialBadgeProps> = ({
  children,
  className,
}) => {
  const { video } = useVideoCardContext();

  if (!video.official) return null;

  return (
    <span
      className={cn(
        'text-[11px] text-gray-400 flex items-center gap-1',
        className
      )}
    >
      <CheckCircle2 className='w-3 h-3 text-[#961200]' />
      {children || 'Official Video'}
    </span>
  );
};

type NowPlayingProps = {
  children?: React.ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<typeof motion.div>;

const NowPlaying: React.FC<NowPlayingProps> = ({
  children,
  className,
  ...props
}) => {
  const { isSelected } = useVideoCardContext();

  if (!isSelected) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex items-center gap-1.5 text-[11px] font-bold text-[#961200] mt-2',
        className
      )}
      {...props}
    >
      <div className='w-1.5 h-1.5 bg-[#961200] rounded-full animate-pulse' />
      {children || 'Now Playing'}
    </motion.div>
  );
};

export const VideoCard = {
  Root,
  Motion,
  Layout,
  Image,
  OverlayLayout,
  OverlayPlayIcon,
  Badge,
  Indicator,
  Info,
  InfoText,
  InfoTitle,
  InfoBadgeGroup,
  InfoTypeBadge,
  InfoOfficialBadge,
  NowPlaying,
};
