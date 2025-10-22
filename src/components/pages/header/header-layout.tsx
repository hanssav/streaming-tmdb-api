'use client';

import { IMAGES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ArrowLeft, Menu, Search, X } from 'lucide-react';
import React, { createContext, useContext, ReactNode } from 'react';
import FlexibleImage from '../../container/image-wrapper';
import { usePathname, useRouter } from 'next/navigation';
import { useHeader } from '@/hooks/useHeader';
import { Button } from '../../ui/button';
import { SearchMotion } from './search-layout';

type HeaderContextValue = {
  isScrolled: boolean;
  isOpenMenu: boolean;
  isSearchMode: boolean;
  isPending: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSearchMode: React.Dispatch<React.SetStateAction<boolean>>;
  goHome: () => void;
  goFavorite: () => void;
};

const HeaderContext = createContext<HeaderContextValue | undefined>(undefined);

const useHeaderContext = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error(
      'Header compound components must be used within Header.Root'
    );
  }
  return context;
};

type HeaderRootProps = {
  children: ReactNode;
};

const HeaderRoot = ({ children }: HeaderRootProps) => {
  const pathname = usePathname();
  const { isOpenMenu, setOpenMenu, isScrolled, isSearchMode, setIsSearchMode } =
    useHeader();
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const clearLayout = React.useCallback(() => {
    setOpenMenu(false);
    setIsSearchMode(false);
  }, [setIsSearchMode, setOpenMenu]);

  React.useEffect(() => clearLayout(), [pathname, clearLayout]);

  const goHome = () => {
    startTransition(() => {
      router.push('/home');
    });
  };

  const goFavorite = () => {
    startTransition(() => {
      router.push('/movies/favorite');
    });
  };

  return (
    <HeaderContext.Provider
      value={{
        isScrolled,
        isOpenMenu,
        isSearchMode,
        setOpenMenu,
        setIsSearchMode,
        goHome,
        goFavorite,
        isPending,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

type HeaderContainerProps = {
  children: ReactNode;
};

const HeaderContainer = ({ children }: HeaderContainerProps) => {
  const { isScrolled, isOpenMenu, isSearchMode } = useHeaderContext();

  return (
    <header
      className={cn(
        'fixed top-0 left-0 z-50 w-full lg:px-[140px] h-16 lg:h-[90px]',
        'flex flex-row items-center justify-between gap-4 p-4',
        'border-b border-transparent transition-all duration-300',
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
      {children}
    </header>
  );
};

type HeaderLogoProps = {
  className?: string;
};

const HeaderLogo = ({ className }: HeaderLogoProps) => {
  const { goHome } = useHeaderContext();

  return (
    <FlexibleImage
      src={IMAGES.LOGO}
      alt='logo'
      className={cn(
        'h-[28px] w-[92px] lg:w-[130px] lg:h-10 cursor-pointer',
        className
      )}
      onClick={goHome}
    />
  );
};

const HeaderMobile = () => {
  const { isSearchMode, setIsSearchMode } = useHeaderContext();

  return (
    <div className='lg:hidden'>
      {isSearchMode ? (
        <ArrowLeft
          className='size-6 cursor-pointer'
          onClick={() => setIsSearchMode(false)}
        />
      ) : (
        <HeaderLogo />
      )}
    </div>
  );
};

type HeaderDesktopProps = {
  children: ReactNode;
};

const HeaderDesktop = ({ children }: HeaderDesktopProps) => {
  return <div className='flex gap-4 lg:gap-20'>{children}</div>;
};

type HeaderNavProps = {
  className?: string;
};

const HeaderNav = ({ className }: HeaderNavProps) => {
  const { goHome, goFavorite } = useHeaderContext();

  return (
    <nav
      className={cn(
        'flex gap-6 lg:gap-20 lg:items-center justify-start',
        className
      )}
    >
      <Button variant='ghost' onClick={goHome} className='flex justify-start'>
        Home
      </Button>
      <Button
        variant='ghost'
        onClick={goFavorite}
        className='flex justify-start'
      >
        Favorite
      </Button>
    </nav>
  );
};

type HeaderMobileActionsProps = {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
};

const HeaderMobileActions = ({
  onSearch,
  searchValue,
}: HeaderMobileActionsProps) => {
  const { isOpenMenu, isSearchMode, setOpenMenu, setIsSearchMode } =
    useHeaderContext();

  if (isOpenMenu) {
    return (
      <X
        className='w-6 h-6 cursor-pointer'
        onClick={() => setOpenMenu(false)}
      />
    );
  }

  return (
    <div className={cn('lg:hidden flex gap-6', isSearchMode && 'flex-1')}>
      {isSearchMode ? (
        <SearchMotion.TriggerInput
          id='mobile'
          className='flex lg:hidden max-w-full'
          handleInputChange={onSearch}
          value={searchValue}
        />
      ) : (
        <>
          <Search
            className='w-6 h-6 cursor-pointer'
            onClick={() => setIsSearchMode(true)}
          />
          <Menu
            className='w-6 h-6 cursor-pointer'
            onClick={() => setOpenMenu(true)}
          />
        </>
      )}
    </div>
  );
};

const HeaderMobileDrawer = () => {
  const { isOpenMenu } = useHeaderContext();

  return (
    <div
      className={cn(
        'fixed lg:hidden top-[60px] left-0 w-full h-screen border-none z-50 overflow-hidden',
        'transition-transform duration-300 ease-in-out bg-black',
        isOpenMenu
          ? 'translate-x-0 opacity-100 pointer-events-auto'
          : '-translate-x-full opacity-0 pointer-events-none'
      )}
    >
      <HeaderNav className='flex-col px-4 py-6 gap-4' />
    </div>
  );
};

type HeaderSearchProps = {
  children: ReactNode;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
};

const HeaderSearch = ({
  children,
  onSearch,
  searchValue,
}: HeaderSearchProps) => {
  const { isSearchMode, setIsSearchMode } = useHeaderContext();

  return (
    <SearchMotion.Root
      isSearchMode={isSearchMode}
      setIsSearchMode={setIsSearchMode}
    >
      <SearchMotion.TriggerInput
        id={'desktop'}
        handleInputChange={onSearch}
        value={searchValue}
      />
      {children}
    </SearchMotion.Root>
  );
};

export const HeaderLayout = {
  Root: HeaderRoot,
  Container: HeaderContainer,
  Logo: HeaderLogo,
  Mobile: HeaderMobile,
  Desktop: HeaderDesktop,
  Nav: HeaderNav,
  MobileActions: HeaderMobileActions,
  MobileDrawer: HeaderMobileDrawer,
  Search: HeaderSearch,
};
