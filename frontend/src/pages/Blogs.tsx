// import Appbar from "../components/Appbar"
// import BlogCard from "../components/BlogCard"
// import {useBlogs} from "../components/hooks/useBlogs"


// const Blogs = () => {
//     const {loading, blogs} = useBlogs();
//     if(loading){
//           return<div>
//             loading...
//           </div>  
//     };


//     return (
        
//         <div>
            
//             <Appbar/>
//         <div className="flex  justify-center">
//             <div className=" p-2">
//                 {blogs ? 
//                     (blogs.map(blog => (
//                         <BlogCard
//                             key={blog.id}
//                             id = {blog.id}
//                             authorName={blog.author.name || "Anonymous"} 
//                             title={blog.title}
//                             content={blog.content} 
//                             publishedDate={"2nd feb 2024"} />
//                     ))) : "No Blogs available"
//                 }
//              </div>   
//         </div>
//         </div>
//     )
// }

// export default Blogs

import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../components/hooks/useBlogs";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div className="text-center text-lg py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header / Appbar */}
      <Appbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center py-16 bg-gray-200">
        <h1 className="text-4xl font-bold mb-4">Discover stories that matter to you</h1>
        <input
          type="text"
          className="w-1/2 p-3 rounded shadow-md mb-8"
          placeholder="Search for topics or stories..."
        />
      </section>

      {/* Blog Post Cards Section */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Recent Blogs</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Trending Topics */}
      <section className="py-10 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6">Trending Topics</h2>
        <div className="flex justify-center space-x-4">
          <button className="bg-gray-300 px-6 py-2 rounded-full text-gray-700 hover:bg-gray-400">
            #Technology
          </button>
          <button className="bg-gray-300 px-6 py-2 rounded-full text-gray-700 hover:bg-gray-400">
            #Design
          </button>
          <button className="bg-gray-300 px-6 py-2 rounded-full text-gray-700 hover:bg-gray-400">
            #Programming
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-900 text-white text-center">
        <p>&copy; 2024 YourBlog. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Blogs;
