import axios from "@/config/axios"
import { BlogList, SingleBlog } from "../types";
import { isAxiosError } from "axios";

type blogRequestResponse = {
  data:BlogList
  total?: number
  page?: number
  perPage?: number
}
type fullBlogRequestResponse = {
  blog: SingleBlog | null;
  recommendedBlogs: SingleBlog[];
}

export const getBlogRequest = async() => {
  try {
    const response = await axios.get<blogRequestResponse>('/blog/bulk');
      return response.data
  } catch (error) {
    if(isAxiosError(error)){
      if(error.response?.status === 401){
        return null
      }
    }
    throw error
  }
};

export const getSingleBlogRequest = async (blogId:string) => {
  try {
    const response = await axios.get<fullBlogRequestResponse>(`/blog/${blogId}`)
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401 || error.response?.status === 404) {
        console.error(`Error fetching blog ${blogId}: Status ${error.response.status}`);
        return null;
      }
    }
    console.error("An unexpected error occurred while fetching the blog:", error);
    throw error;
  }
}