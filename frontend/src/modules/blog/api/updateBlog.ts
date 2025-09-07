import axios from "@/config/axios"
import { UpdatePostRequest } from "@schemas/postSchema";
import { Blog } from "../types";

export const updateBlog = async (id:string, data:UpdatePostRequest) => {
  const formData = new FormData();
  if(data.title !== undefined){
    formData.append("title", data.title)
  }
  if(data.content !== undefined){
    formData.append("content", data.content)
  }
  if(data.categoryId !== undefined){
    formData.append('categoryId', (data.categoryId).toString(),)
  }
  const response = await axios.put<Blog>(`/blog/update/${id}`,
    formData,
    {
      headers:{
        'Content-Type':'application/json'
      }
    }
  );
  return response.data
}