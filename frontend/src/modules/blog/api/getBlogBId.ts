import axios from "@/config/axios"
import { Blog } from "../types"

type posetRequestResponse = {
  blog: {
    blog:Blog
  }
}

export const getBlogById = async (id:string) => {
  const response = await axios.get<posetRequestResponse>(`/blog/${id}`);
  return response.data.blog;
}