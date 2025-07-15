import { useQuery } from "@tanstack/react-query";

import { getBlogRequest } from "../api/getBlogs";

import { BlogCard } from "../components/blog-card";
import { BlogCardSkeleton } from "../components/blog-card-skeleton";

const BlogsPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getBlogRequest(),
    queryKey: ["blogs"]
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
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
    );
  }

  if (!data?.blog || data.blog.length === 0) {
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

  return (
    <div className="space-y-6">
      {data.blog.map((blog) => (
        <BlogCard 
          key={blog.id}
          category={blog.category.name}
          title={blog.title}
          image={blog.image}
          authorImage={blog.author.profilePhoto}
          authorName={blog.author.name}
          createdAt={blog.createdAt}
        />
      ))}
    </div>
  );
};

export default BlogsPage;