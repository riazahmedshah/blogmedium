export const NoBlogAvailable = () => {
  return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="p-4 mb-4 bg-blue-100 rounded-full">
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-bold text-gray-900">No blog posts yet</h3>
        <p className="text-gray-600 max-w-md">Check back later for new content or subscribe to our newsletter.</p>
      </div>
    );
} 