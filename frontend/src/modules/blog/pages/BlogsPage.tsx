import { useQuery } from "@tanstack/react-query";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@ui/pagination"

import { getBlogRequest } from "../api/getBlogs";

import { BlogCard } from "../components/blog-card";
import { BlogCardSkeleton } from "../components/skeletons/blog-card-skeleton";
import { NoBlogAvailable } from "../components/empty-blogPage";
import { ErrorComponent } from "../components/error-component";
import { Link } from "react-router-dom";
import { useState } from "react";

const BlogsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getBlogRequest(currentPage,postsPerPage),
    queryKey: ["blogs", currentPage],
    staleTime: 1000 * 60 * 5,
  });

  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages || 1;
  const currentPageFromAPI = pagination?.currentPage || currentPage;

  const getPageNumber = () => {
    const pages = [];
    const maxVisiblePage = 5;

    if(totalPages <= maxVisiblePage){
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else{
      pages.push(1);
      
      // Calculate start and end of visible page range
      let start = Math.max(2, currentPageFromAPI - 1);
      let end = Math.min(totalPages - 1, currentPageFromAPI + 1);
      
      // Adjust if we're near the beginning
      if (currentPageFromAPI <= 3) {
        end = 4;
      }
      
      // Adjust if we're near the end
      if (currentPageFromAPI >= totalPages - 2) {
        start = totalPages - 3;
      }
    
      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
      pages.push('...');
    }
    
    // Always include last page
    pages.push(totalPages);
  }
    return pages;
}

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
    <div>
      <div className="">
        {data.data.map((blog) => (
          <Link to={`/blog/${blog.id}`} state={{blogData: blog}} key={blog.id} className="block mb-6">
            <BlogCard 
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
      <div className="py-8">
        <Pagination className="">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={(e) => {
                e.preventDefault();
                if(currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
             />
          </PaginationItem>
          {
            getPageNumber().map((page, i) => (
              <PaginationItem key={i} onClick={() => setCurrentPage(i+1)}>
                { page === '...' ? (
                  <span className="px-3 py-2">...</span>
                ):(
                  <PaginationLink className="cursor-pointer">
                    {page}
                  </PaginationLink>
                )
                }
              </PaginationItem>
            ))
          }
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext 
              onClick={(e) => {
                e.preventDefault();
                if(currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : 'cursor-pointer'}
               />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      </div>
    </div>
  );
};

export default BlogsPage;