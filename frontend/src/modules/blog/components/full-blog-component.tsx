import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom";
import { getSingleBlogRequest } from "../api/getBlogs";
import { ErrorComponent } from "./error-component";
import { NoBlogAvailable } from "./empty-blogPage";
import { FullBlogSkeleton } from "./skeletons/full-blog-skeleton";
import { FullBlogSection } from "./full-blog-section";
import { AuthorSection } from "./author-section";
import { AuthorBlogSkeleton } from "./skeletons/blog-author-skeleton";

export const FullBlog = () => {
  const { blogId } = useParams();
  const {data, isError, isLoading} = useQuery({
    queryFn: () => getSingleBlogRequest(blogId!),
    queryKey: ["blog", blogId],
    staleTime: 1000 * 60 * 5,
    enabled: !!blogId,
  });

  if(isError){
    return(
      <ErrorComponent/>
    )
  }

  if(isLoading){
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <FullBlogSkeleton/>
      </div>
      <div className="md:col-span-1 space-y-8">
        <AuthorBlogSkeleton/>
      </div>
    </div>
  }

  if(!data?.data){
    return <NoBlogAvailable/>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <FullBlogSection
            title={data.data.title}
            content={data.data.content}
            postImage={data.data.image}
            isLoading={isLoading} 
            isError={isError}    
          />
        </div>

        {/* Author Section */}
        <div className="md:col-span-1 space-y-8">
          <AuthorSection
            name={data.data.author.name}
            profilePhoto={data.data.author.profilePhoto}
            role={data.data.author.role}
            isLoading={isLoading} 
            isError={isError}  
          />
        </div>
      </div>
    </div>
  );
}

