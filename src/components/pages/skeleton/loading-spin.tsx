import { cn } from '@/lib/utils';

const Spin: React.FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <div className='absolute inset-0 flex items-center justify-center'>
      <span
        className={cn(
          'size-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin',
          className
        )}
      />
    </div>
  );
};

export default Spin;
