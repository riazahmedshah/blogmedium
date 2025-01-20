import BlogCard from "./BlogCard";
import BlogSkeleton from "./BlogSkeleton";
import { useUniqueBlog } from "./hooks/useBlogs";

export const UserBlogs = () => {

    const {blogs,loading} = useUniqueBlog()
        console.log("Blogs: ", blogs);
      
        if (loading) {
            return (
              <BlogSkeleton />
            )
          }

    return(
        <div className="max-w-2xl mx-auto px-4 py-4">
            <h2 className="text-xl font-semibold text-center md:mb-6 mb-2">Recent Blogs...</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
            {/* Check if blogs are available */}
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  authorName={blog.author.name || "Anonymous"}
                  title={blog.title}
                  content={blog.content}
                  publishedDate={"2nd Feb 2024"} // Example date
                />
              ))
            ) : (
              <div className="text-center col-span-full">No blogs available</div>
            )}
          </div>

        </div>
    )
}