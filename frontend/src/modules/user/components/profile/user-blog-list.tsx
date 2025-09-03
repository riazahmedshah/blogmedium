import { BlogList } from '@modules/blog/types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUserBlogRequest } from '@modules/user/api/deleteBlog';
import { toast } from 'sonner';

interface UserBlogListProps {
  blogs: BlogList;
}

export const UserBlogList: React.FC<UserBlogListProps> = ({ blogs }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [blogToDeleteId, setBlogToDeleteId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation({
    mutationFn: deleteUserBlogRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userBlogs'] });
      setIsDeleteDialogOpen(false);
      toast.success(`Successfully deleted the blog`)
    },
    onError: (error) => {
        console.error("Failed to delete blog:", error);
        toast(error.message)
    }
  })

  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center text-gray-500 p-8 border rounded-lg">
        No blogs found for this user.
      </div>
    );
  }

  const handleDeleteClick = (blogId: string) => {
    setBlogToDeleteId(blogId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (blogToDeleteId) {
      mutate(blogToDeleteId);
      
      setIsDeleteDialogOpen(false);
      setBlogToDeleteId(null);
    }
  };

  const handleEditClick = (blogId: string) => {
    // **PLACE YOUR NAVIGATION TO EDIT PAGE HERE**
    console.log(`Editing blog with ID: ${blogId}`);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">Your Blogs</h3>
      {blogs.map((blog) => (
        <div key={blog.id} className='flex flex-col md:flex-row md:items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200'>
          
          {/* Main content area */}
          <Link to={`/blog/${blog.id}`} className="flex-grow flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full md:w-32 h-24 object-cover rounded-md flex-shrink-0"
              />
            )}
            <div className="flex-grow flex-shrink-0 w-full md:w-7/12">
              <h4 className="text-xl font-semibold text-gray-800 line-clamp-2">{blog.title.slice(0,50) + "..."}</h4>
              <p className="text-gray-600 text-sm mt-1 line-clamp-3" dangerouslySetInnerHTML={{__html: blog.content.slice(0,200) + "..."}}></p>
              <p className="text-gray-500 text-xs mt-2">Published on: {new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
          </Link>

          {/* Buttons container */}
          <div className='flex items-center space-x-2 mt-4 md:mt-0 md:ml-4 flex-shrink-0'>
            <Button variant="outline" onClick={() => handleEditClick(blog.id)}>
              Edit
            </Button>
            <Button variant="destructive" onClick={() => handleDeleteClick(blog.id)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              {isPending ? 'Deleting...' : 'Continue'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};