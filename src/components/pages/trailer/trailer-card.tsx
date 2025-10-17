import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type Video = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
};

type TrailerPlayerContextValue = {
  selectedVideo: Video | null;
  allVideos: Video[];
  setSelectedVideo: (video: Video) => void;
};

const TrailerPlayerContext = React.createContext<
  TrailerPlayerContextValue | undefined
>(undefined);

const useTrailerPlayerContext = () => {
  const ctx = React.useContext(TrailerPlayerContext);
  if (!ctx) {
    throw new Error(
      'TrailerPlayer components must be used within TrailerPlayer.Root'
    );
  }
  return ctx;
};

type RootProps = {
  children: React.ReactNode;
  selectedVideo: Video | null;
  allVideos: Video[];
  onVideoChange: (video: Video) => void;
};

const Root: React.FC<RootProps> = ({
  children,
  selectedVideo,
  allVideos,
  onVideoChange,
}) => {
  return (
    <TrailerPlayerContext.Provider
      value={{
        selectedVideo,
        allVideos,
        setSelectedVideo: onVideoChange,
      }}
    >
      {children}
    </TrailerPlayerContext.Provider>
  );
};

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FC<ContainerProps> = ({ children, className }) => (
  <div className={cn('flex flex-col lg:flex-row gap-8', className)}>
    {children}
  </div>
);

const Main: React.FC<ContainerProps> = ({ children, className }) => (
  <div className={cn('flex-1 lg:flex-[0_0_68%]', className)}>{children}</div>
);

const Sidebar: React.FC<ContainerProps> = ({ children, className }) => (
  <div className={cn('lg:flex-[0_0_32%]', className)}>
    <div className='lg:sticky lg:top-4 lg:max-h-[calc(100vh-120px)] flex flex-col'>
      {children}
    </div>
  </div>
);

type PlayerProps = {
  className?: string;
};

const Player: React.FC<PlayerProps> = ({ className }) => {
  const { selectedVideo } = useTrailerPlayerContext();

  if (!selectedVideo) return null;

  return (
    <motion.div
      key={selectedVideo.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn('space-y-6', className)}
    >
      <div className='relative group'>
        <div className='aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10'>
          <iframe
            width='100%'
            height='100%'
            src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1&rel=0`}
            title={selectedVideo.name}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            className='w-full h-full'
          />
        </div>
        <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-[#961200] via-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-xl' />
      </div>
    </motion.div>
  );
};

type InfoContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const InfoContainer: React.FC<InfoContainerProps> = ({
  children,
  className,
}) => (
  <div className={cn('space-y-4', className)}>
    <div className='flex items-start justify-between gap-4'>
      <div className='flex-1'>{children}</div>
    </div>
  </div>
);

type TitleProps = {
  children: React.ReactNode;
  className?: string;
};

const Title: React.FC<TitleProps> = ({ children, className }) => {
  return (
    <h3
      className={cn(
        'text-2xl md:text-3xl font-bold text-white leading-tight mb-3',
        className
      )}
    >
      {children}
    </h3>
  );
};

type BadgeGroupProps = {
  children: React.ReactNode;
  className?: string;
};

const BadgeGroup: React.FC<BadgeGroupProps> = ({ children, className }) => (
  <div className={cn('flex flex-wrap items-center gap-2', className)}>
    {children}
  </div>
);

type TypeBadgeProps = {
  children?: React.ReactNode;
  className?: string;
};

const TypeBadge: React.FC<TypeBadgeProps> = ({ children, className }) => {
  const { selectedVideo } = useTrailerPlayerContext();

  if (!selectedVideo) return null;

  return (
    <span
      className={cn(
        'px-4 py-1.5 text-sm font-semibold rounded-full',
        selectedVideo.type === 'Trailer'
          ? 'bg-gradient-to-r from-[#961200] to-[#c41800] text-white'
          : selectedVideo.type === 'Teaser'
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
          : selectedVideo.type === 'Clip'
          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
          : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white',
        className
      )}
    >
      {children || selectedVideo.type}
    </span>
  );
};

type OfficialBadgeProps = {
  children?: React.ReactNode;
  className?: string;
};

const OfficialBadge: React.FC<OfficialBadgeProps> = ({
  children,
  className,
}) => {
  const { selectedVideo } = useTrailerPlayerContext();

  if (!selectedVideo?.official) return null;

  return (
    <span
      className={cn(
        'px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-full flex items-center gap-1.5 border border-white/20',
        className
      )}
    >
      {children || (
        <>
          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
              clipRule='evenodd'
            />
          </svg>
          Official
        </>
      )}
    </span>
  );
};

type SidebarHeaderProps = {
  children?: React.ReactNode;
  className?: string;
};

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  children,
  className,
}) => {
  const { allVideos } = useTrailerPlayerContext();

  return (
    <div className={cn('flex items-center justify-between mb-6', className)}>
      {children || (
        <>
          <h3 className='text-xl font-bold text-white flex items-center gap-2'>
            <div className='w-1 h-6 bg-gradient-to-b from-[#961200] to-[#c41800] rounded-full' />
            Related Videos
          </h3>
          <span className='px-3 py-1 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/10'>
            {allVideos.length}
          </span>
        </>
      )}
    </div>
  );
};

type SidebarTitleProps = {
  children?: React.ReactNode;
  className?: string;
};

const SidebarTitle: React.FC<SidebarTitleProps> = ({ children, className }) => (
  <h3
    className={cn(
      'text-xl font-bold text-white flex items-center gap-2',
      className
    )}
  >
    <div className='w-1 h-6 bg-gradient-to-b from-[#961200] to-[#c41800] rounded-full' />
    {children || 'Related Videos'}
  </h3>
);

type CountProps = {
  children?: React.ReactNode;
  className?: string;
};

const Count: React.FC<CountProps> = ({ children, className }) => {
  const { allVideos } = useTrailerPlayerContext();

  return (
    <span
      className={cn(
        'px-3 py-1 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/10',
        className
      )}
    >
      {children || allVideos.length}
    </span>
  );
};

type ListProps = {
  children: React.ReactNode;
  className?: string;
};

const List: React.FC<ListProps> = ({ children, className }) => (
  <div
    className={cn('space-y-3 overflow-y-auto custom-scrollbar pr-2', className)}
  >
    {children}
  </div>
);

export const TrailerPlayer = {
  Root,
  Container,
  Main,
  Sidebar,
  Player,
  InfoContainer,
  Title,
  BadgeGroup,
  TypeBadge,
  OfficialBadge,
  SidebarHeader,
  SidebarTitle,
  Count,
  List,
};
