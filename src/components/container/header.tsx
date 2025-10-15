'use client';
import { IMAGES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Menu, Search, X } from 'lucide-react';
import React from 'react';
import { Input } from '../ui/input';
import FlexibleImage from './image-wrapper';
import { usePathname, useRouter } from 'next/navigation';
import { useHeader } from '@/hooks/useHeader';

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
      <li className='text-md font-normal' onClick={goHome}>
        Home
      </li>
      <li className='text-md font-normal' onClick={goFavorite}>
        Favorite
      </li>
    </ul>
  );
};

const Header = () => {
  const { isOpenMenu, setOpenMenu, isScrolled } = useHeader();
  const router = useRouter();

  const pathname = usePathname();
  const goHone = () => router.push('/');
  const goFavorite = () => router.push('/movies/favorite');
  React.useEffect(() => setOpenMenu(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 z-50 w-full p-4 flex flex-row items-center justify-between gap-4 lg:px-[140px] lg:h-[90px]',
          'border-b border-transparent transition-all duration-300',
          isScrolled && [
            'backdrop-blur-xl supports-[backdrop-filter]:bg-white/70',
            'dark:supports-[backdrop-filter]:bg-black/40',
            'border-b border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.05)]',
          ],
          isOpenMenu && 'bg-black'
        )}
      >
        <div className='flex gap-4 lg:gap-20'>
          <FlexibleImage
            src={IMAGES.LOGO}
            alt='logo'
            className='h-[28px] w-[92px] lg:w-[130px] lg:h-10'
            onClick={goHone}
          />
          <ListMenu
            className='hidden lg:flex'
            goHome={goHone}
            goFavorite={goFavorite}
          />
        </div>

        <div className='hidden lg:block w-full max-w-[243px]'>
          <Input
            label='search'
            id='search'
            className='bg-[#0A0D1299]'
            iconPosition='left'
            icon={<Search className='size-5 text-neutral-500' />}
          />
        </div>

        {isOpenMenu ? (
          <X className='w-6 h-6' onClick={() => setOpenMenu(false)} />
        ) : (
          <div className='lg:hidden flex gap-6'>
            <Search className='w-6 h-6' />
            <Menu className='w-6 h-6' onClick={() => setOpenMenu(true)} />
          </div>
        )}
      </header>

      <div
        className={cn(
          'absolute lg:hidden top-[60px] left-0 w-full h-screen bg-transparent border-none z-50 overflow-hidden',
          'transition-transform duration-300 ease-in-out bg-black',
          isOpenMenu
            ? 'translate-x-0 opacity-100 pointer-events-auto h-screen'
            : '-translate-x-full opacity-0 pointer-events-none'
        )}
      >
        <ListMenu goHome={goHone} goFavorite={goFavorite} open={isOpenMenu} />
      </div>
    </>
  );
};

export default Header;
