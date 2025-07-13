import axios from "@/config/axios"
import { User } from "@modules/user/types"
import { isAxiosError } from "axios"

type CurrentUserRequestResponse = {
  user: User
}

export const currentUserRequest = async () => {
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

export const currentUserQuery = () => ({
  queryKey: ['currentUser'],
  queryFn: currentUserRequest,
})