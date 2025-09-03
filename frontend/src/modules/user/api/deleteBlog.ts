import axios from "@/config/axios"

export const deleteUserBlogRequest = async (id:string) => {
  const response = await axios.delete(`/blog/delete/${id}`);
  return response.data;
}