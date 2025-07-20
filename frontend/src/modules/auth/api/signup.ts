import axios from "@/config/axios";
import { signupRequestData } from "@schemas/authSchema"

export type SignupRequestResponse = {
	MESSAGE: string;
}

export const signupRequest = async(data:signupRequestData) => {
  const response = await axios.post<SignupRequestResponse>('/user/create', data);
  return response.data;
}