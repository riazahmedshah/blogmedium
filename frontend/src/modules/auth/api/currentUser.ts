import axios from "@/config/axios"
import { User } from "@modules/user/types"
import { queryOptions } from "@tanstack/react-query"
import { isAxiosError } from "axios"

export type CurrentUserRequestResponse = {
  user: User
}

export const currentUserRequest = async (): Promise<User | null> => {
  try {
    const response = await axios.get<CurrentUserRequestResponse>('/user/me');
    return response.data.user
  } catch (error) {
    if(isAxiosError(error)){
      if(error.response?.status === 401){
        return null
      }
    }
    throw error
  }
}

export const currentUserQuery = () => {
  return queryOptions({
    queryKey: ['currentUser'],
    queryFn: currentUserRequest,
  })
}