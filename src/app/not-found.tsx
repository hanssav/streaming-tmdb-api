"use client";
import { useRoutingWithNProgress } from "@/hooks/useRoutingWithNProgress";

export default function NotFound() {
  const { push } = useRoutingWithNProgress();
  return (
    <div className="flex flex-col items-center justify-center h-[90vh] text-center gap-4  ">
      <h2 className="text-xl lg:text-display-lg font-semibold">No results found 😢</h2>
      <p className="text-sm lg:text-md text-gray-400 mt-2">
        We couldn’t find the page or data you’re looking for.
      </p>
      <button
        onClick={() => push("/home")}
        className="mt-6 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg min-w-[200px] cursor-pointer"
      >
        Back to Home
      </button>
    </div>
  );
}
