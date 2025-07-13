import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const user = useContext(AuthContext);

  if(!user){
    throw new Error('useAuth must be used within a CurrentUserProvider')
  }
  return user;
}

