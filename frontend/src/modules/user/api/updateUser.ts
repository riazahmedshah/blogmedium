import axios from "@/config/axios"
import { User } from "../types";
import { updateuserData } from "@schemas/authSchema";

export type updateUserRequestResponse = {
  user: User
}

export const UpdateUserRequest = async(data: updateuserData) => {
  const formData = new FormData();
  if (data.name !== undefined) {
        formData.append('name', data.name)
  }
  if(data.role !== undefined){
    formData.append('role', data.role)
  }
  if(data.profilePhoto instanceof File){
    formData.append('postImage', data.profilePhoto);
  }
  // if (data.profilePhoto !== undefined) {
  //     if (data.profilePhoto === null) {
  //         formData.append('profilePhoto', 'null')
  //     } else {
  //         formData.append('profilePhoto', data.profilePhoto)
  //     }
  // }

  const response = await axios.put(
    '/user/update',
    formData,
    {
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return response.data.updatedUser
}