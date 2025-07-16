import { Clock } from "lucide-react";

export const BlogCardSkeleton = () => (
  <article className="max-w-4xl mx-auto overflow-hidden rounded-lg border border-gray-200 shadow-sm py-4 px-2 animate-pulse">
    <div className="flex flex-col sm:flex-row">
      <div className="relative h-48 sm:h-auto sm:w-1/3 min-w-[200px] bg-gray-200"></div>
      
      <div className="flex-1 p-4 sm:p-6">
        <div className="mb-2">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-transparent uppercase rounded-full bg-gray-200">
            Loading category
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold text-transparent bg-gray-200 rounded line-clamp-2">
          Loading blog title
        </h3>
        <div className="flex items-center mt-4">
          <div className="flex-shrink-0 mr-3">
            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          </div>
          
          <div className="w-full text-sm flex justify-between">
            <p className="font-medium text-transparent bg-gray-200 rounded">Loading author</p>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1 text-gray-200" />
              <span className="text-transparent bg-gray-200 rounded">Loading date</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button className="text-sm font-medium text-transparent bg-gray-200 rounded">
            Continue reading →
          </button>
        </div>
      </div>
    </div>
  </article>
);
