import { useNavigate, useParams } from "react-router-dom"
import { useBlog } from "../components/hooks/useBlogs"
import { FullBlog } from "../components/FullBlog";
import { useContext, useEffect } from "react";
import UserContext from "../components/UserContext";

export const Blog = () => {
    const {loggedInUser} = useContext(UserContext)
    const navigate = useNavigate();
    const {id} = useParams();
    const{ loading, blog }  = useBlog({
        id : id || ""
    });

    useEffect(() => {
          if (!loggedInUser) {
              navigate("/signin"); // Redirect to login if not logged in
          }
      }, [loggedInUser, navigate]);

      
    if(loading) {
        return <div>
            Loading...
        </div>
    };

    return <div>
        {blog ? (<FullBlog blog = {blog}/>) : ""}
     </div>
}