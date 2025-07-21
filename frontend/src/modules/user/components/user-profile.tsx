import { useQuery } from "@tanstack/react-query"
import { getUserBlogsRequest } from "../api/getUserBlogs"
import { ErrorComponent } from "@modules/blog/components/error-component";
import { useCurrentUser } from "@modules/auth/hooks/useCurrentUser";
import { UserProfileDetails } from "./profile/user-profile-card";
import { UserBlogList } from "./profile/user-blog-list";

export const UserProfile = () => {
  const user = useCurrentUser();
  const {data:blogsData, isLoading, isError} = useQuery({
    queryFn: () => getUserBlogsRequest(),
    queryKey:["userBlogs", user?.id],
    enabled: !!user?.id
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-700">
        Loading user profile and blogs...
      </div>
    );
  }

  if(isError){
    <ErrorComponent/>
  }

  const userDetails = {
    name: user?.name,
    email: user?.email,
    profilePhoto: user?.profilePhoto  || undefined,
    role: user?.role
  }


  const userBlogs = blogsData?.blogs || [];
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">My Profile</h1>

      <UserProfileDetails user={userDetails}  blogCount={userBlogs.length}/>

      <UserBlogList blogs={userBlogs} />

    </div>
  );
}