import { useQuery } from "@tanstack/react-query";

import { getBlogRequest } from "../api/getBlogs";

import { BlogCard } from "../components/blog-card";
import { BlogCardSkeleton } from "../components/blog-card-skeleton";
import { NoBlogAvailable } from "../components/empty-blogPage";
import { ErrorComponent } from "../components/error-component";

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
      <ErrorComponent/>
    );
  }

  if (!data?.blog || data.blog.length === 0) {
    return (
      <NoBlogAvailable/>
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