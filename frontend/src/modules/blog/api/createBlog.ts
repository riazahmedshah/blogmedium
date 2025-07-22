import axios from "@/config/axios"
import { createPostRequest } from "@schemas/postSchema";
import { Blog } from "../types";

type postRequestResponse = {
  blog:Blog
}

export const createBlogRequest = async(data:createPostRequest) => {
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
  if(data.postImage instanceof File){
    formData.append('postImage', data.postImage);
  }
  // if(data.postImage !== undefined){
  //   if (data.postImage === null) {
  //         formData.append('postImage', 'null')
  //     } else {
  //         formData.append('postImage', data.postImage)
  //     }
  // }
  const response = await axios.post<postRequestResponse>(
    '/blog/create',
    formData,
    {
      headers:{
        'Content-Type':'multipart/form-data'
      }
    }
  )
  return response.data.blog
}