import { useQuery } from "@tanstack/react-query"
import { getUserBlogsRequest } from "../api/getUserBlogs"
import { ErrorComponent } from "@modules/blog/components/error-component";

export const UserProfile = () => {
  const {data:blogs, isLoading, isError} = useQuery({
    queryFn: () => getUserBlogsRequest(),
    queryKey:["userBlogs"]
  });

  if(isError){
    <ErrorComponent/>
  }

  if(isLoading){
    return(
      <div>
        Loading...
      </div>
    )
  }
  console.log("User Blogs", blogs)
  return(
    <div>
      Profile page...
    </div>
  )
}