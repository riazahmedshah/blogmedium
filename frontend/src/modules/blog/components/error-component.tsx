export const ErrorComponent = () => {
  return(
    <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="p-4 mb-4 bg-red-100 rounded-full">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-bold text-gray-900">Failed to load blogs</h3>
        <p className="text-gray-600 max-w-md">We couldn't fetch the blog posts. Please try again later.</p>
        <button 
          className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
  )
}