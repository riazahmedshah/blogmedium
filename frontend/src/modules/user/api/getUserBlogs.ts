import axios from "@/config/axios"
import { BlogList } from "@modules/blog/types";
import { isAxiosError } from "axios";

type getUserBlogsRequestResponse = {
  blogs: BlogList
}

export const getUserBlogsRequest = async() => {
  try {
    const response = await axios.get<getUserBlogsRequestResponse>("/user/blogs");
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
          if (error.response?.status === 401 || error.response?.status === 404) {
            console.error(`Error fetching blog: Status ${error.response.status}`);
            return null;
          }
        }
        console.error("An unexpected error occurred while fetching the blog:", error);
        throw error;
  }
}