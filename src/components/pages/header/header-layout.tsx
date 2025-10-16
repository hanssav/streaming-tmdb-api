import React, { createContext, useContext } from 'react';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { FlexibleImage } from '@/components/container';
import { IMAGES } from '@/lib/constants';

type HeaderContextValue = {
  isScrolled: boolean;
  isOpenMenu: boolean;
  isSearchMode: boolean;
  setIsSearchMode: (value: boolean) => void;
  goHome: () => void;
  goFavorite: () => void;
};

const HeaderContext = createContext<HeaderContextValue | undefined>(undefined);

const useHeaderContext = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('Header compound components must be used within Header');
  }
  return context;
};

type HeaderProps = {
  children: React.ReactNode;
  isScrolled: boolean;
  isOpenMenu: boolean;
  isSearchMode: boolean;
  setIsSearchMode: (value: boolean) => void;
  goHome: () => void;
  goFavorite: () => void;
};

export const Header = ({
  children,
  isScrolled,
  isOpenMenu,
  isSearchMode,
  setIsSearchMode,
  goHome,
  goFavorite,
}: HeaderProps) => {
  return (
    <HeaderContext.Provider
      value={{
        isScrolled,
        isOpenMenu,
        isSearchMode,
        setIsSearchMode,
        goHome,
        goFavorite,
      }}
    >
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
    </HeaderContext.Provider>
  );
};

type HeaderMobileProps = {
  children?: React.ReactNode;
};

const HeaderMobile = ({ children }: HeaderMobileProps) => {
  const { isSearchMode, setIsSearchMode, goHome } = useHeaderContext();

  return (
    <div className='lg:hidden'>
      {children ? (
        children
      ) : isSearchMode ? (
        <ArrowLeft className='size-6' onClick={() => setIsSearchMode(false)} />
      ) : (
        <HeaderLogo onClick={goHome} />
      )}
    </div>
  );
};

type HeaderLogoProps = {
  onClick: () => void;
  className?: string;
};

const HeaderLogo = ({ onClick, className }: HeaderLogoProps) => (
  <FlexibleImage
    src={IMAGES.LOGO}
    alt='logo'
    className={cn('h-[28px] w-[92px] lg:w-[130px] lg:h-10', className)}
    onClick={onClick}
  />
);

interface HeaderDesktopProps {
  children: React.ReactNode;
}

const HeaderDesktop = ({ children }: HeaderDesktopProps) => {
  return <div className='flex gap-4 lg:gap-20'>{children}</div>;
};

interface HeaderLogoComponentProps {
  onClick?: () => void;
  className?: string;
}

const HeaderLogoComponent = ({
  onClick,
  className,
}: HeaderLogoComponentProps) => {
  return <HeaderLogo onClick={onClick} className={className} />;
};

// Menu Component
interface HeaderMenuProps {
  className?: string;
}

const HeaderMenu = ({ className }: HeaderMenuProps) => {
  const { goHome, goFavorite } = useHeaderContext();

  return (
    <ListMenu className={className} goHome={goHome} goFavorite={goFavorite} />
  );
};

// Mobile Menu Drawer Component
interface HeaderMobileMenuProps {
  children?: React.ReactNode;
}

const HeaderMobileMenu = ({ children }: HeaderMobileMenuProps) => {
  const { isOpenMenu, goHome, goFavorite } = useHeaderContext();

  return (
    <div
      className={cn(
        'fixed lg:hidden top-[60px] left-0 w-full h-screen border-none z-50 overflow-hidden',
        'transition-transform duration-300 ease-in-out bg-black',
        isOpenMenu
          ? 'translate-x-0 opacity-100 pointer-events-auto h-screen'
          : '-translate-x-full opacity-0 pointer-events-none'
      )}
    >
      {children || (
        <ListMenu goHome={goHome} goFavorite={goFavorite} open={isOpenMenu} />
      )}
    </div>
  );
};

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

Header.Mobile = HeaderMobile;
Header.Desktop = HeaderDesktop;
Header.Logo = HeaderLogoComponent;
Header.Menu = HeaderMenu;
Header.MobileMenu = HeaderMobileMenu;
