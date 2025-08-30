import axios from "@/config/axios"
import { BlogList, SingleBlog } from "../types";
import { isAxiosError } from "axios";

type blogRequestResponse = {
  data:BlogList
  pagination:{
    currentPage: number,
    perPage: number,
    totalPages: number,
    totalCount: number,
    hasPagination: boolean
  }
}
type fullBlogRequestResponse = {
  blog: SingleBlog | null;
}

export const getBlogRequest = async(page?:number, perPage?:number) => {
  try {
    const response = await axios.get<blogRequestResponse>(`/blog/bulk?page=${page}&perPage=${perPage}`);
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
    return response.data.blog
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