'use client';

import { useGetVideoTrailer } from '@/hooks/useMovies';
import React, { useState } from 'react';
import { Youtube, BadgeCheck } from 'lucide-react';
import { SectionWrapper } from '@/components/container';
import { TrailerPlayer, VideoCard } from '@/components/pages/trailer';
import { Video } from '@/components/pages/trailer/video-card';

const TrailerClient: React.FC<{ id: number }> = ({ id }) => {
  const { data } = useGetVideoTrailer(id);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  React.useEffect(() => {
    if (data?.results?.length > 0 && !selectedVideo) {
      const trailer = data.results.find(
        (v: Video) => v.type === 'Trailer' && v.site === 'YouTube'
      );
      setSelectedVideo(trailer || data.results[0]);
    }
  }, [data, selectedVideo]);

  if (data?.results?.length === 0) {
    return (
      <SectionWrapper>
        <div className='flex flex-col items-center justify-center py-20 text-center'>
          <div className='w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center mb-6'>
            <Youtube className='w-10 h-10 text-gray-400' />
          </div>
          <p className='text-2xl font-bold text-white mb-2'>
            No videos available
          </p>
          <p className='text-gray-400'>
            Check back later for trailers and clips
          </p>
        </div>
      </SectionWrapper>
    );
  }

  const allVideos =
    data?.results?.filter((v: Video) => v.site === 'YouTube') || [];

  return (
    <SectionWrapper>
      <TrailerPlayer.Root
        selectedVideo={selectedVideo}
        allVideos={allVideos}
        onVideoChange={setSelectedVideo}
      >
        <TrailerPlayer.Container>
          {/* Main Video Section */}
          <TrailerPlayer.Main>
            <TrailerPlayer.Player />

            <TrailerPlayer.InfoContainer>
              <TrailerPlayer.Title>{selectedVideo?.name}</TrailerPlayer.Title>
              <TrailerPlayer.BadgeGroup>
                <TrailerPlayer.TypeBadge>
                  {selectedVideo?.type}
                </TrailerPlayer.TypeBadge>
                <TrailerPlayer.OfficialBadge>
                  <BadgeCheck className='text-current size-4' />
                  Official
                </TrailerPlayer.OfficialBadge>
              </TrailerPlayer.BadgeGroup>
            </TrailerPlayer.InfoContainer>
          </TrailerPlayer.Main>

          {/* Sidebar Section */}
          <TrailerPlayer.Sidebar>
            <TrailerPlayer.SidebarHeader>
              <TrailerPlayer.SidebarTitle>
                Related Videos
              </TrailerPlayer.SidebarTitle>
              <TrailerPlayer.Count>{allVideos.length}</TrailerPlayer.Count>
            </TrailerPlayer.SidebarHeader>

            <TrailerPlayer.List>
              {allVideos.map((video: Video, index: number) => (
                <VideoCard.Root
                  key={video.id}
                  video={video}
                  isSelected={selectedVideo?.id === video.id}
                  onClick={() => setSelectedVideo(video)}
                  index={index}
                >
                  <VideoCard.Motion>
                    <VideoCard.Layout>
                      <VideoCard.Image>
                        <VideoCard.OverlayLayout>
                          <VideoCard.OverlayPlayIcon />
                        </VideoCard.OverlayLayout>
                        <VideoCard.Badge>{video.type}</VideoCard.Badge>
                        <VideoCard.Indicator />
                      </VideoCard.Image>

                      <VideoCard.Info>
                        <VideoCard.InfoText>
                          <VideoCard.InfoTitle>
                            {video.name}
                          </VideoCard.InfoTitle>
                          <VideoCard.InfoBadgeGroup>
                            <VideoCard.InfoTypeBadge>
                              {video.type}
                            </VideoCard.InfoTypeBadge>
                            <VideoCard.InfoOfficialBadge>
                              Official Video
                            </VideoCard.InfoOfficialBadge>
                          </VideoCard.InfoBadgeGroup>
                        </VideoCard.InfoText>
                        <VideoCard.NowPlaying>Now Playing</VideoCard.NowPlaying>
                      </VideoCard.Info>
                    </VideoCard.Layout>
                  </VideoCard.Motion>
                </VideoCard.Root>
              ))}
            </TrailerPlayer.List>
          </TrailerPlayer.Sidebar>
        </TrailerPlayer.Container>
      </TrailerPlayer.Root>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #961200, #c41800);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #c41800, #961200);
        }
      `}</style>
    </SectionWrapper>
  );
};

export default TrailerClient;
