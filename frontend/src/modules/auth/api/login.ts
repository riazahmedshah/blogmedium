import axios from "@/config/axios"
import { signinRequestData } from "@schemas/authSchema"


export type LoginRequestResponse = {
  token:string
}

export const loginRequest = async (data: signinRequestData) => {
  const response = await axios.post<LoginRequestResponse>('/user/signin', data);
  return response.data
}