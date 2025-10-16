'use client';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Input } from '../../ui/input';
import { Search, X } from 'lucide-react';

type SearchLayoutType = {
  isSearchMode?: boolean;
  setIsSearchMode?: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchLayoutContext = React.createContext<SearchLayoutType | undefined>(
  undefined
);

export const useSearchLayout = () => {
  const ctx = React.useContext(SearchLayoutContext);
  if (!ctx) {
    throw new Error(
      'useSearchLayout must be used within a SearchLayoutProvider'
    );
  }

  return ctx;
};

type SearchLayoutProviderProps = {
  children: React.ReactNode;
  isSearchMode?: boolean;
  setIsSearchMode?: (value: boolean) => void;
};

export const SearchLayoutProvider: React.FC<SearchLayoutProviderProps> = ({
  children,
  isSearchMode: controlledValue,
  setIsSearchMode,
}) => {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(false);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const setValue: React.Dispatch<React.SetStateAction<boolean>> =
    React.useCallback(
      (newValue) => {
        if (isControlled) {
          const nextValue =
            typeof newValue === 'function'
              ? (newValue as (prev: boolean) => boolean)(value)
              : newValue;

          setIsSearchMode?.(nextValue);
        } else {
          setUncontrolledValue(newValue);
        }
      },
      [isControlled, setIsSearchMode, value]
    );

  return (
    <SearchLayoutContext.Provider
      value={{ isSearchMode: value, setIsSearchMode: setValue }}
    >
      {children}
    </SearchLayoutContext.Provider>
  );
};

const Layout: React.FC<
  {
    children: React.ReactNode;
    className?: string;
  } & React.ComponentPropsWithoutRef<typeof motion.div>
> = ({ children, className, ...props }) => {
  const { isSearchMode } = useSearchLayout();

  return (
    <AnimatePresence mode='wait'>
      {isSearchMode && (
        <motion.div
          key='search-layout'
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transition={{
            x: { type: 'tween', duration: 0.5, ease: 'easeInOut' },
            opacity: { duration: 0.3 },
          }}
          className={cn(
            'fixed top-16 lg:top-[90px] left-0 right-0 bottom-0',
            ' bg-black text-white z-50 flex flex-col overflow-y-scroll',
            className
          )}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TriggerInput: React.FC<{
  className?: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  id: string;
}> = ({ className, handleInputChange, value, id }) => {
  const { isSearchMode, setIsSearchMode } = useSearchLayout();

  return (
    <div
      className={cn(
        'hidden lg:block w-full max-w-[243px]',
        isSearchMode && 'relative',
        className
      )}
    >
      <Input
        label='search'
        id={`search-${id}`}
        className='bg-[#0A0D1299]'
        iconPosition='left'
        value={value}
        onChange={handleInputChange}
        onFocus={() => setIsSearchMode?.(true)}
        icon={<Search className='size-5 text-neutral-500' />}
      />
      {isSearchMode && (
        <X
          className={cn(
            'size-5 absolute top-1/2 right-3 -translate-y-1/2',
            'text-neutral-500 cursor-pointer'
          )}
          onClick={() => setIsSearchMode?.(false)}
        />
      )}
    </div>
  );
};

export const SearchMotion = {
  Root: SearchLayoutProvider,
  Layout,
  TriggerInput,
};
