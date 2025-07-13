import axios from "@/config/axios";
import { User } from "@modules/user/types";
import { signupRequestData } from "@schemas/authSchema"

export type SignupRequestResponse = {
	user: User
}

export const signupRequest = async(data:signupRequestData) => {
  const response = await axios.post<SignupRequestResponse>('/user/create', data);
  return response.data;
}