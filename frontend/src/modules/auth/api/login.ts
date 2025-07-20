import axios from "@/config/axios"
import { User } from "@modules/user/types"
import { signinRequestData } from "@schemas/authSchema"


export type LoginRequestResponse = {
  user:User
  token:string
}

export const loginRequest = async (data: signinRequestData) => {
  const response = await axios.post<LoginRequestResponse>('/user/signin', data);
  return response.data
}