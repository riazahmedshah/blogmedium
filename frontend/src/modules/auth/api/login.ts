import { User } from "@modules/user/types"
import { signinRequestData } from "@schemas/authSchema"
import axios from "axios"

export type LoginRequestResponse = {
  user:User,
  token:string
}

export const loginRequest = async (data: signinRequestData) => {
  const response = await axios.post<LoginRequestResponse>('/user/login', data);
  return response.data
}