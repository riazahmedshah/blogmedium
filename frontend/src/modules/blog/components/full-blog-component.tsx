import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom";
import { getSingleBlogRequest } from "../api/getBlogs";
import { ErrorComponent } from "./error-component";
import { NoBlogAvailable } from "./empty-blogPage";
import { FullBlogSkeleton } from "./skeletons/full-blog-skeleton";
import { FullBlogSection } from "./full-blog-section";
import { AuthorSection } from "./author-section";
import { AuthorBlogSkeleton } from "./skeletons/blog-author-skeleton";
import { RecommendSection } from "./recommend-section";

export const FullBlog = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useQuery({
    queryFn: () => getSingleBlogRequest(id!),
    queryKey: ["blog", id],
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });

  if (isError) {
    return <ErrorComponent />;
  }

  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <FullBlogSkeleton />
        </div>
        <div className="md:col-span-1 space-y-8">
          <AuthorBlogSkeleton />
        </div>
      </div>
    );
  }

  if (!data.blog) {
    return <NoBlogAvailable />;
  }
  const { blog } = data;
  const recommendedBlogs = data.recommendedBlogs || [];

  const author = blog.author || {};
  const safeAuthor = {
    name: author.name || "Unknown Author",
    profilePhoto: author.profilePhoto || null,
    role: author.role || "Writer"
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <FullBlogSection
            title={blog.title || "Untitled Post"}
            content={blog.content || ""}
            postImage={blog.image || ""}
          />
        </div>

        <div className="md:col-span-1 space-y-8 border-l ">
          <AuthorSection
            name={safeAuthor.name}
            profilePhoto={safeAuthor.profilePhoto}
            role={safeAuthor.role}
          />

          {recommendedBlogs.length > 0 ? (
            <div className="space-y-4">
              {recommendedBlogs.map((recBlog) => (
                <Link to={`/blog/${recBlog.id}`} key={recBlog.id} className="block">
                  <RecommendSection
                    title={recBlog.title || "Untitled Post"}
                    image={recBlog.image || ""}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-gray-100 rounded-lg">
              <p>No recommended blogs available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

