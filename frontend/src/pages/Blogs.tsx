
import { useContext, useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../components/hooks/useBlogs";
import UserContext from "../components/UserContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import  BlogSkeleton  from "../components/BlogSkeleton";



const Blogs = () => {
  const navigate = useNavigate();
  const {loggedInUser} = useContext(UserContext);
  const { loading, blogs,filteredBlogs,setFilteredBlogs } = useBlogs();
  
  const[search,setSearch] = useState("");

  useEffect(() => {
    if (!loggedInUser) {
        navigate("/"); // Redirect to login if not logged in
    }
}, [loggedInUser, navigate]); 

  if (loading) {
    return (
      <BlogSkeleton />
    )
  }

  return (
    <div className="min-h-screen">
      

      {/* Blog Post Cards Section */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center pt-2 pb-4">
            <Input className="md:max-w-lg w-full" type="text" value={search} placeholder="Search blogs..." onChange={(e) => {
              setSearch(e.target.value)
            }}/>
            <Button className="bg-green-800/95" onClick={() => {
              const filterBlog = blogs?.filter((blog) => (
                blog.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
              ));
              setFilteredBlogs(filterBlog);
            }}>
              Search
            </Button>
          </div>
          
          <h2 className="text-xl font-semibold text-center md:mb-6 mb-2">Recent Blogs...</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
            {/* Check if blogs are available */}
            {filteredBlogs && filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
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
