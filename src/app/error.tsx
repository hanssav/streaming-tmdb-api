'use client';
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] text-center'>
      <h2 className='text-xl font-semibold text-red-500 mb-4'>
        Something went wrong
      </h2>
      <p className='text-sm text-gray-400'>{error.message}</p>
      <button
        onClick={() => reset()}
        className='mt-6 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700'
      >
        Try Again
      </button>
    </div>
  );
}
