import { BlogList } from '@modules/blog/types';
import React from 'react';
import { Link } from 'react-router-dom';

interface UserBlogListProps {
  blogs: BlogList;
}

export const UserBlogList: React.FC<UserBlogListProps> = ({ blogs }) => {
  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center text-gray-500 p-8 border rounded-lg">
        No blogs found for this user.
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Your Blogs</h3>
      {blogs.map((blog) => (
        <Link to={`/blog/${blog.id}`} key={blog.id} className="block hover:shadow-lg transition-shadow duration-200">
          <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full md:w-32 h-24 object-cover rounded-md flex-shrink-0"
              />
            )}
            <div className="flex-grow">
              <h4 className="text-xl font-semibold text-gray-800">{blog.title}</h4>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2" dangerouslySetInnerHTML={{__html:blog.content}}>
              </p>
              <p className="text-gray-500 text-xs mt-2">Published on: {new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};