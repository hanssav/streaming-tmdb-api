'use client';

import React from 'react';
import { BadgeCheck } from 'lucide-react';
import { SectionWrapper } from '@/components/container';
import {
  Loading,
  NotFound,
  TrailerPlayer,
  VideoCard,
} from '@/components/pages/trailer';
import { Video } from '@/components/pages/trailer/video-card';
import { useTrailer } from './hooks';

const TrailerClient: React.FC<{ id: number }> = ({ id }) => {
  const { allVideos, data, isLoading, selectedVideo, setSelectedVideo } =
    useTrailer(id);

  if (isLoading) return <Loading />;
  if (data?.results?.length === 0) return <NotFound />;

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
    </SectionWrapper>
  );
};

export default TrailerClient;
