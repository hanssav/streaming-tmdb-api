'use client';
import { cn } from '@/lib/utils';
import { CheckCircle, CircleX } from 'lucide-react';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<
    (ToastProps & { closing?: boolean }) | null
  >(null);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast((prev) => (prev ? { ...prev, closing: true } : null));
      setTimeout(() => setToast(null), 300);
    }, 1000);
  };

  const closeToast = () => setToast(null);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          className={cn(
            'fixed top-20 lg:top-40 left-1/2 z-50 px-5 py-3 rounded-2xl text-white flex items-center gap-3 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-[40px] transition-all duration-300 w-9/10 lg:w-3/10',
            toast.type === 'success' ? 'bg-[#00000080]' : 'bg-[#ce1c084a]',
            toast.closing ? 'animate-toast-out' : 'animate-toast-in'
          )}
        >
          {toast.type === 'success' ? (
            <CheckCircle className='size-6' />
          ) : (
            <CircleX className='size-6' />
          )}
          <p className='text-xs lg:text-sm font-medium flex-1'>
            {toast.message}
          </p>
          <button
            onClick={closeToast}
            className='ml-2 text-white hover:opacity-70'
          >
            ✕
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
