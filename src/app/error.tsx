'use client';
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className='flex flex-col items-center justify-center h-[90vh] text-center gap-4'>
      <h2 className='text-display-xs lg:text-display-lg font-semibold text-red-500 mb-4'>
        Something went wrong
      </h2>
      <p className='text-sm lg:text-md text-gray-400'>{error.message}</p>
      <button
        onClick={() => reset()}
        className='mt-6 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg min-w-[200px]'
      >
        Try Again
      </button>
    </div>
  );
}
