"use client";
import { IMAGES, PATH } from "@/lib/constants";
import { getSafeImage, handleImageError } from "@/lib/utils";
import { LucidePlayCircle } from "lucide-react";
import React from "react";
import { Button } from "../../ui/button";
import { SearchMotion } from "./search-layout";
import SectionWrapper from "../../container/section-wrapper";
import { Card } from "../favorite/card";
import { TypographySub, TypographyTitle } from "../../ui/typography";
import { Movie } from "@/types";
import EmptyData from "../../container/empty-data";
import { NO_DATA_FOUND } from "@/lib/constants/empty-data";
import { HeaderLayout } from "./header-layout";
import { useInfiniteScroll, useMovieFavorites, useMovieNavigation, useMovieSearch } from "./hooks";
import { useRoutingWithNProgress } from "@/hooks/useRoutingWithNProgress";

const Header = () => {
  const {
    movies,
    searchValue: filter,
    onSearch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMovieSearch();

  const { loadMoreRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const { isFavorite, onChangeFavorite } = useMovieFavorites();
  const { navigateToDetail } = useMovieNavigation();
  const { push } = useRoutingWithNProgress();

  return (
    <HeaderLayout.Root>
      <HeaderLayout.Container>
        <HeaderLayout.Mobile />

        <HeaderLayout.Desktop>
          <HeaderLayout.Logo className="hidden lg:block" />
          <HeaderLayout.Nav className="hidden lg:flex" />
        </HeaderLayout.Desktop>

        <HeaderLayout.Search onSearch={onSearch} searchValue={filter.query}>
          <SearchMotion.Layout>
            <SectionWrapper>
              <div className="space-y-6">
                {movies.length ? (
                  <>
                    {movies.map((movie: Movie, idx) => (
                      <Card.CardMovie
                        key={`${movie.id}-${idx}`}
                        onClick={async () => {
                          navigateToDetail(movie.id);
                        }}
                      >
                        <div className="flex gap-6">
                          <Card.Image
                            src={getSafeImage(
                              movie.poster_path,
                              IMAGES.DEFAULT_PROFILE,
                              PATH.TMDB_IMAGES_URL,
                            )}
                            onError={handleImageError(IMAGES.DEFAULT_PROFILE)}
                            alt={`poster-${movie.original_title}`}
                          />

                          <Card.Content className="space-y-2 lg:space-y-6">
                            <TypographyTitle label={movie.title} size="md" lgSize="display-xs" />
                            <Card.RatingWithValue value={movie.vote_average} />
                            <TypographySub
                              label={movie.overview}
                              className="line-clamp-2"
                              size="sm"
                              lgSize="md"
                            />
                            <Button
                              className="hidden lg:flex p-2"
                              size="lg"
                              onClick={(e) => {
                                e.stopPropagation();
                                push(`/movies/trailer/${movie.id}`);
                              }}
                            >
                              Watch Trailer
                              <LucidePlayCircle />
                            </Button>
                          </Card.Content>
                          <Card.HeartButton
                            isFavorited={isFavorite(movie.id)}
                            onChange={(e) => {
                              e.stopPropagation();
                              onChangeFavorite(movie.id, isFavorite(movie.id));
                            }}
                            className="hidden lg:flex size-16 aspect-square self-center lg:ml-auto"
                          />
                        </div>

                        <Card.Actions className="lg:hidden">
                          <Button
                            className="flex-1 p-2"
                            size="lg"
                            onClick={(e) => {
                              e.stopPropagation();
                              push(`/movies/trailer/${movie.id}`);
                            }}
                          >
                            Watch Trailer
                            <LucidePlayCircle />
                          </Button>
                          <Card.HeartButton
                            isFavorited={isFavorite(movie.id)}
                            onChange={(e) => {
                              e.stopPropagation();
                              onChangeFavorite(movie.id, isFavorite(movie.id));
                            }}
                          />
                        </Card.Actions>
                      </Card.CardMovie>
                    ))}
                    {hasNextPage && (
                      <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
                        {isFetchingNextPage && (
                          <p className="text-center text-sm text-gray-400">Loading more...</p>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <EmptyData {...NO_DATA_FOUND} className="min-h-[calc(100vh-8rem-5rem)]" />
                )}
              </div>
            </SectionWrapper>
          </SearchMotion.Layout>
          <HeaderLayout.MobileActions onSearch={onSearch} searchValue={filter.query} />
        </HeaderLayout.Search>
      </HeaderLayout.Container>

      <HeaderLayout.MobileDrawer />
    </HeaderLayout.Root>
  );
};

export default Header;
