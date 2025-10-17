export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] text-center'>
      <h2 className='text-xl font-semibold'>No results found 😢</h2>
      <p className='text-sm text-gray-400 mt-2'>
        We couldn’t find the page or data you’re looking for.
      </p>
    </div>
  );
}
