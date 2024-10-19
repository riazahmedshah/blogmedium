import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../../config";


 export interface Blog {
  content :string,
  title: string,
  id:string,
  author:{
    name: string
  }
}

export const useBlogs = () => {
  const[loading, setLoading] = useState(true);
  const[blogs, setBlogs] = useState<Blog[]>();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        authorization: localStorage.getItem("token")
      }
    })
    .then(response => {
      setBlogs(response.data.blogs);
      setLoading(false);
    })
    .catch(error => {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    });
  }, []);
  
  return {
    loading,
    blogs
  }
};




export const useBlog = ({id} : {id:string}) => {
  const [loading, setLoading] = useState(true)
  const [blog, setBlog]  = useState<Blog>();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        authorization: localStorage.getItem("token")
      }
    }). then(response => {
          setBlog(response.data.getBlog);
          setLoading(false);
    })
  },[id])

  return{
    loading,
    blog
  }
}