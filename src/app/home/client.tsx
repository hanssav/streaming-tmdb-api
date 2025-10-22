"use client";
import React from "react";
import { SectionWrapper } from "@/components/container";
import { Hero, ShowOrSkeleton } from "@/components/container";
import { Button } from "@/components/ui/button";
import { TypographyTitle } from "@/components/ui/typography";
import { IMAGES } from "@/lib/constants";
import { useInfiniteDiscoverMovies, usePrefetchMovieDetail } from "@/hooks/useMovies";
import { LucidePlayCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MappingMovieSkeleton, MovieCard } from "@/components/pages/home";
import { HeroImageSkeleton, MovieCardSkeleton } from "@/components/pages/skeleton";
import { cn, getSafeImage } from "@/lib/utils";
import { useDiscoverData, useInfiniteParams } from "./hooks";
import { useRoutingWithNProgress } from "@/hooks/useRoutingWithNProgress";

const HomeClient: React.FC<{ initialRandomIndex: number }> = ({ initialRandomIndex }) => {
  const { featuredMovie, isLoading, mixedIdx, trending } = useDiscoverData(initialRandomIndex);
  const { title, backdrop_path, overview } = featuredMovie || {};
  const { push } = useRoutingWithNProgress();
  const { params } = useInfiniteParams();

  const {
    movies,
    isLoading: moviesLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteDiscoverMovies(params);

  const { prefetchMovieDetail } = usePrefetchMovieDetail();

  const onClickMovie = async (id: number) => {
    await prefetchMovieDetail(id);
    push(`/movies/${id}`);
  };

  return (
    <>
      <ShowOrSkeleton isLoading={isLoading} skeleton={<HeroImageSkeleton />}>
        <Hero>
          <Hero.Image
            src={getSafeImage(backdrop_path, IMAGES.DEFAULT_BACKDROP)}
            alt="hero"
            className="rounded-xl shadow-lg"
          />
          <Hero.Overlay />
          <Hero.Content className="w-full max-w-[361px] lg:max-w-[635px]">
            <Hero.Title label={title} className="text-white" />
            <Hero.Subtitle label={overview} className="text-gray-300 line-clamp-3" />
            <Hero.Actions className="mt-4">
              <Button
                className="lg:flex-1"
                size="lg"
                onClick={() => push(`/movies/trailer/${trending?.[mixedIdx]?.id}`)}
              >
                Watch Trailer
                <LucidePlayCircle />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="lg:flex-1 bg-neutral-950"
                onClick={() => onClickMovie(trending?.[mixedIdx]?.id)}
              >
                See Detail
              </Button>
            </Hero.Actions>
          </Hero.Content>
        </Hero>
      </ShowOrSkeleton>
      <SectionWrapper className="relative z-30 mt-4 lg:mt-20">
        <TypographyTitle label="Trending Now" />
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            <ShowOrSkeleton
              isLoading={isLoading}
              skeleton={
                <>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <CarouselItem key={i} className="basis-1/2 lg:basis-1/5">
                      <MovieCardSkeleton />
                    </CarouselItem>
                  ))}
                </>
              }
            >
              {trending.map(({ id, title, poster_path, vote_average }) => (
                <CarouselItem
                  key={id}
                  className="basis-1/2 lg:basis-1/5"
                  onClick={() => onClickMovie(id)}
                >
                  <MovieCard className="hover:scale-105 transition">
                    <MovieCard.Image src={poster_path} alt={title} className="rounded-2xl" />
                    <MovieCard.Content className="space-y-2">
                      <MovieCard.Title>{title}</MovieCard.Title>
                      <MovieCard.Rating value={vote_average} className="text-sm" />
                    </MovieCard.Content>
                  </MovieCard>
                </CarouselItem>
              ))}
            </ShowOrSkeleton>
          </CarouselContent>
          <CarouselPrevious className="border-none bg-[#0A0D1299]" />
          <CarouselNext className="border-none bg-[#0A0D1299]" />
        </Carousel>
      </SectionWrapper>
      <SectionWrapper className="relative overflow-visible min-h-[600px]">
        <TypographyTitle label="New Release" />
        <div className="relative">
          <div
            className={cn(
              "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
              "gap-8 lg:gap-[50px] relative min-h-[500px]",
            )}
          >
            <ShowOrSkeleton isLoading={moviesLoading} skeleton={<MappingMovieSkeleton />}>
              {movies?.map(({ poster_path, title, vote_average, id }, idx) => (
                <MovieCard
                  key={`${id}-${idx}`}
                  className="hover:scale-105 transition"
                  onClick={() => onClickMovie(id)}
                >
                  <MovieCard.Image src={poster_path} alt={title} className="rounded-2xl" />
                  <MovieCard.Content className="space-y-2">
                    <MovieCard.Title>{title}</MovieCard.Title>
                    <MovieCard.Rating value={vote_average} className="text-sm" />
                  </MovieCard.Content>
                </MovieCard>
              ))}
              {isFetchingNextPage && <MappingMovieSkeleton />}
            </ShowOrSkeleton>
          </div>
        </div>
        <SectionWrapper.Overlay />
        {movies && movies.length > 0 && (
          <div className="absolute bottom-52 left-1/2 transform -translate-x-1/2 z-20">
            <Button
              variant={"outline"}
              className="w-full min-w-[230px] items-center bg-[#0A0D1299]"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage || !hasNextPage}
            >
              {isFetchingNextPage ? "Loading" : "Load More"}
            </Button>
          </div>
        )}
      </SectionWrapper>
    </>
  );
};

export default HomeClient;
