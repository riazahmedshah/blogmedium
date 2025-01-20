import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../../config";
import UserContext from "../UserContext";




 export interface Blog {
  content :string,
  title: string,
  id:string,
  author:{
    name: string
  },
  createdAt:Date
}

export const useBlogs = (page: number, limit: number) => {
  const[loading, setLoading] = useState(true);
  const[blogs, setBlogs] = useState<Blog[]>();
  const[filteredBlogs,setFilteredBlogs] = useState<Blog[]>();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        authorization: localStorage.getItem("token")
      },
      params: {
        page: page,
        limit: limit
      }
    })
    .then(response => {
      setBlogs(response.data.blogs);
      setFilteredBlogs(response.data.blogs);
      setLoading(false);
    })
    .catch(error => {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    });
  }, [page,limit]);
  
  return {
    loading,
    blogs,
    filteredBlogs,
    setFilteredBlogs
  }
};

export const useUniqueBlog = () => {
  const { loggedInUser } = useContext(UserContext);
  const id = loggedInUser?.id;

  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    if (id) {
      axios.get(`${BACKEND_URL}/api/v1/blog/userblog?userId=${id}`, {
        headers: {
          authorization: localStorage.getItem("token"),
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
    }
  }, [id]);

  return {
    loading,
    blogs
  };
};




export const useBlog = ({id} : {id:string}) => {
  const [loading, setLoading] = useState(true)
  const [blog, setBlog]  = useState<Blog>();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        authorization: localStorage.getItem("token")
      },
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