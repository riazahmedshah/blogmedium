import axios from "@/config/axios"
import {CategoryList} from "../types"
import { isAxiosError } from "axios"

type categoryRequestResponse = {
  category: CategoryList
}

export const getCategoryRequest = async() => {
  try {
    const response = await axios.get<categoryRequestResponse>('/blog/categories');
    return response.data
  } catch (error) {
    if(isAxiosError(error)){
      if(error.response?.status === 401){
        return null
      }
    }
    throw error
  }
}