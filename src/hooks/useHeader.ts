import * as React from 'react';

/**
 * Lock or unlock body scroll when `isLocked` changes.
 */
export function useHideOverflow(isLocked: boolean) {
  React.useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isLocked]);
}

/**
 * Manage header state (menu open, scroll state, search mode, etc.)
 */
export function useHeader() {
  const [isOpenMenu, setOpenMenu] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isSearchMode, setIsSearchMode] = React.useState(false);

  useHideOverflow(isOpenMenu || isSearchMode);

  // Detect scroll
  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    isOpenMenu,
    setOpenMenu,
    isScrolled,
    isSearchMode,
    setIsSearchMode,
  };
}
