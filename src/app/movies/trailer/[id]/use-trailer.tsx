import { Video } from '@/components/pages/trailer/video-card';
import { useGetVideoTrailer } from '@/hooks/useMovies';
import React from 'react';

export const useTrailer = (id: number) => {
  const { data, isLoading } = useGetVideoTrailer(id);
  const [selectedVideo, setSelectedVideo] = React.useState<Video | null>(null);

  React.useEffect(() => {
    if (data?.results?.length > 0 && !selectedVideo) {
      const trailer = data.results.find(
        (v: Video) => v.type === 'Trailer' && v.site === 'YouTube'
      );
      setSelectedVideo(trailer || data.results[0]);
    }
  }, [data, selectedVideo]);

  const allVideos =
    data?.results?.filter((v: Video) => v.site === 'YouTube') || [];

  return { data, isLoading, allVideos, selectedVideo, setSelectedVideo };
};
