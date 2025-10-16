'use client';
import { IMAGES, PATH } from '@/lib/constants';
import { cn, getSafeImage, handleImageError } from '@/lib/utils';
import { ArrowLeft, LucidePlayCircle, Menu, Search, X } from 'lucide-react';
import React from 'react';
import FlexibleImage from '../../container/image-wrapper';
import { usePathname, useRouter } from 'next/navigation';
import { useHeader } from '@/hooks/useHeader';
import { Button } from '../../ui/button';
import { SearchMotion } from './search-layout';
import SectionWrapper from '../../container/section-wrapper';
import { useSearchMovies } from '@/hooks/useMovies';
import { Card } from '../favorite/card';
import { TypographySub, TypographyTitle } from '../../ui/typography';
import { Movie } from '@/types';
import { useDebounce } from '@/hooks/useDebounce';
import EmptyData from '../../container/empty-data';
import { NO_DATA_FOUND } from '@/lib/constants/empty-data';

const ListMenu: React.FC<{
  className?: string;
  open?: boolean;
  goHome: () => void;
  goFavorite: () => void;
}> = ({ goHome, goFavorite, className, open = false }) => {
  return (
    <ul
      className={cn(
        'flex px-4 gap-6 lg:gap-20 lg:items-center',
        open && 'py-6 space-y-4 flex-col',
        className
      )}
    >
      <li className='text-md font-normal'>
        <Button className='' variant={'ghost'} onClick={goHome}>
          Home
        </Button>
      </li>
      <li className='text-md font-normal'>
        <Button variant={'ghost'} onClick={goFavorite}>
          Favorite
        </Button>
      </li>
    </ul>
  );
};

const MobileActions = ({
  isOpenMenu,
  isSearchMode,
  setOpenMenu,
  setIsSearchMode,
  onSearch,
}: {
  isOpenMenu: boolean;
  isSearchMode: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSearchMode: React.Dispatch<React.SetStateAction<boolean>>;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  if (isOpenMenu)
    return <X className='w-6 h-6' onClick={() => setOpenMenu(false)} />;

  return (
    <div className={cn('lg:hidden flex gap-6', isSearchMode && 'flex-1')}>
      {isSearchMode ? (
        <SearchMotion.TriggerInput
          className='flex lg:hidden max-w-full'
          handleInputChange={onSearch}
        />
      ) : (
        <>
          <Search className='w-6 h-6' onClick={() => setIsSearchMode(true)} />
          <Menu className='w-6 h-6' onClick={() => setOpenMenu(true)} />
        </>
      )}
    </div>
  );
};

const HeaderLogo = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) => (
  <FlexibleImage
    src={IMAGES.LOGO}
    alt='logo'
    className={cn('h-[28px] w-[92px] lg:w-[130px] lg:h-10', className)}
    onClick={onClick}
  />
);

const Header = () => {
  const { isOpenMenu, setOpenMenu, isScrolled, isSearchMode, setIsSearchMode } =
    useHeader();

  const router = useRouter();

  const pathname = usePathname();
  const goHome = () => router.push('/');
  const goFavorite = () => router.push('/movies/favorite');
  React.useEffect(() => {
    setOpenMenu(false);
    setIsSearchMode(false);
  }, [pathname, setOpenMenu, isOpenMenu]);

  const [filter, setFilter] = React.useState<{ query: string; page: number }>({
    query: '',
    page: 1,
  });
  const debounceQuery = useDebounce(filter, 300);
  const { data } = useSearchMovies(debounceQuery);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({
      ...prev,
      query: e.target.value,
      page: 1,
    }));
  };

  console.log(filter, 'filter');

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 z-50 w-full lg:px-[140px] h-16 lg:h-[90px]',
          'flex flex-row items-center justify-between gap-4 p-4',
          'border-b border-transparent transition-all duration-300 ',
          {
            'backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 shadow-xl':
              isScrolled && !isOpenMenu && !isSearchMode,
            'dark:supports-[backdrop-filter]:bg-black/40':
              isScrolled && !isOpenMenu && !isSearchMode,
            'border-b border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.05)]':
              isScrolled && !isOpenMenu && !isSearchMode,
            'bg-black': isOpenMenu || isSearchMode,
            'justify-start lg:justify-between': isSearchMode,
          }
        )}
      >
        <div className='lg:hidden'>
          {isSearchMode ? (
            <ArrowLeft
              className='size-6'
              onClick={() => setIsSearchMode(false)}
            />
          ) : (
            <HeaderLogo onClick={goHome} />
          )}
        </div>
        <div className='flex gap-4 lg:gap-20'>
          <HeaderLogo onClick={goHome} className='hidden lg:block' />

          <ListMenu
            className='hidden lg:flex'
            goHome={goHome}
            goFavorite={goFavorite}
          />
        </div>

        <SearchMotion.Root
          isSearchMode={isSearchMode}
          setIsSearchMode={setIsSearchMode}
        >
          <SearchMotion.TriggerInput
            handleInputChange={onSearch}
            value={filter.query}
          />
          <SearchMotion.Layout>
            <SectionWrapper>
              <div className='space-y-6'>
                {data?.results?.length ? (
                  data.results.map((movie: Movie) => (
                    <Card.CardMovie key={movie.id}>
                      <div className='flex gap-6'>
                        <Card.Image
                          src={getSafeImage(
                            movie.poster_path,
                            IMAGES.DEFAULT_PROFILE,
                            PATH.TMDB_IMAGES_URL
                          )}
                          onError={handleImageError(IMAGES.DEFAULT_PROFILE)}
                          alt={`poster-${movie.original_title}`}
                        />

                        <Card.Content className='space-y-2 lg:space-y-6'>
                          <TypographyTitle
                            label={movie.title}
                            size='md'
                            lgSize='display-xs'
                          />
                          <Card.RatingWithValue value={movie.vote_average} />
                          <TypographySub
                            label={movie.overview}
                            className='line-clamp-2'
                            size='sm'
                            lgSize='md'
                          />
                          <Button className='hidden lg:flex p-2' size='lg'>
                            Watch Trailer
                            <LucidePlayCircle />
                          </Button>
                        </Card.Content>

                        <Card.HeartButton
                          // isFavorited={isFavorited?.includes(movie.id)}
                          // onChange={() => onChangeFavorite(movie.id)}
                          className='hidden lg:flex size-16 aspect-square self-center lg:ml-auto'
                        />
                      </div>

                      <Card.Actions className='lg:hidden'>
                        <Button className='flex-1 p-2' size='lg'>
                          Watch Trailer
                          <LucidePlayCircle />
                        </Button>
                        <Card.HeartButton
                        // isFavorited={isFavorited?.includes(movie.id)}
                        // onChange={() => onChangeFavorite(movie.id)}
                        />
                      </Card.Actions>
                    </Card.CardMovie>
                  ))
                ) : (
                  <EmptyData
                    {...NO_DATA_FOUND}
                    className='min-h-[calc(100vh-8rem-5rem)]'
                  />
                )}
              </div>
            </SectionWrapper>
          </SearchMotion.Layout>

          <MobileActions
            isOpenMenu={isOpenMenu}
            isSearchMode={isSearchMode}
            setOpenMenu={setOpenMenu}
            setIsSearchMode={setIsSearchMode}
            onSearch={onSearch}
          />
        </SearchMotion.Root>
      </header>

      <div
        className={cn(
          'fixed lg:hidden top-[60px] left-0 w-full h-screen border-none z-50 overflow-hidden',
          'transition-transform duration-300 ease-in-out bg-black',
          isOpenMenu
            ? 'translate-x-0 opacity-100 pointer-events-auto h-screen'
            : '-translate-x-full opacity-0 pointer-events-none'
        )}
      >
        <ListMenu goHome={goHome} goFavorite={goFavorite} open={isOpenMenu} />
      </div>
    </>
  );
};

export default Header;
