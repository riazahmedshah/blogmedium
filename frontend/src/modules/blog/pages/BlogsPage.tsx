import { useQuery } from "@tanstack/react-query";

import { getBlogRequest } from "../api/getBlogs";

import { BlogCard } from "../components/blog-card";
import { BlogCardSkeleton } from "../components/skeletons/blog-card-skeleton";
import { NoBlogAvailable } from "../components/empty-blogPage";
import { ErrorComponent } from "../components/error-component";
import { Link } from "react-router-dom";

const BlogsPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getBlogRequest(),
    queryKey: ["blogs"],
    staleTime: 1000 * 60 * 5,
  });
  console.log("DATA",data)
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
      <ErrorComponent/>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <NoBlogAvailable/>
    );
  }

  return (
    <div className="space-y-6">
      {data.data.map((blog) => (
        <Link to={`/blog/${blog.id}`} state={{blogData: blog}}>
          <BlogCard 
            key={blog.id}
            category={blog.category.name}
            title={blog.title}
            image={blog.image}
            authorImage={blog.author.profilePhoto}
            authorName={blog.author.name}
            createdAt={blog.createdAt}
          />
        </Link>
      ))}
    </div>
  );
};

export default BlogsPage;