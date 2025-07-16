import axios from "@/config/axios"
import { BlogList } from "../types";
import { isAxiosError } from "axios";

type blogRequestResponse = {
  data:BlogList
  total?: number
  page?: number
  perPage?: number
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
