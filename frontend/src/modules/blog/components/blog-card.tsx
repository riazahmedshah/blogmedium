import { Clock, User2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

interface BlogCardProps {
  id?: string;
  image: string | null;
  title: string;
  category: string;
  authorName?: string;
  authorImage?: string | null;
  createdAt: Date | string;
  className?: string;
}

export const BlogCard = ({ 
  id,
  category, 
  image, 
  title, 
  authorName = "Anonymous",
  authorImage,
  createdAt,
  className = ""
}: BlogCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [authorImageError, setAuthorImageError] = useState(false);
  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <article 
      className={`max-w-4xl mx-auto group overflow-hidden rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 py-4 px-2 ${className}`}
      aria-labelledby={`blog-title-${id}`}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-48 sm:h-auto sm:w-1/3 min-w-[200px] overflow-hidden bg-gray-100">
          {image && !imageError ? (
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <User2 className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
        
        <div className="flex-1 p-4 sm:p-6">
          <div className="mb-2">
            <span 
              className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-blue-600 uppercase rounded-full bg-blue-50"
              aria-label={`Category: ${category}`}
            >
              {category}
            </span>
          </div>
          
          <h3 
            id={`blog-title-${id}`}
            className="mb-2 text-xl font-bold text-gray-900 line-clamp-2"
          >
            {title}
          </h3>
          
          <div className="flex items-center mt-4">
            <div className="flex-shrink-0 mr-3">
              {authorImage && !authorImageError ? (
                <img
                  src={authorImage}
                  alt={authorName}
                  className="w-8 h-8 rounded-full object-cover"
                  loading="lazy"
                  onError={() => setAuthorImageError(true)}
                />
              ) : (
                <div 
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <User2 className="w-4 h-4 text-gray-500" />
                </div>
              )}
            </div>
            
            <div className="w-full text-sm text-gray-500 flex justify-between">
              <p 
                className="font-medium text-gray-900 truncate max-w-[120px] sm:max-w-[200px]"
                title={authorName}
              >
                {authorName}
              </p>
              <div 
                className="flex items-center"
                aria-label={`Published ${formattedDate}`}
              >
                <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="whitespace-nowrap">
                  {formattedDate}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button 
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm"
              aria-label={`Continue reading ${title}`}
            >
              Continue reading →
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};