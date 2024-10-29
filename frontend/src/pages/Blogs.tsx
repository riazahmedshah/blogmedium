
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../components/hooks/useBlogs";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div className="text-center text-lg py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      

      {/* Blog Post Cards Section */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Recent Blogs</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
            {/* Check if blogs are available */}
            {blogs && blogs.length > 0 ? (
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
      </section>
    </div>
  );
};

export default Blogs;
