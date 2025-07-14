import {useQuery, useQueryClient} from "@tanstack/react-query"
import { currentUserQuery } from "../api/currentUser";
import { User } from "@modules/user/types";
import { LoginRequestResponse } from "../api/login";
import { removeAuthToken, storeAuthToken } from "../helper/authToken";
import { AuthContext } from "../context/AuthContext";
import { ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const {data:user} = useQuery<User | null>(currentUserQuery());

  const handleLogin = (data:LoginRequestResponse) => {
    storeAuthToken(data.token);
    queryClient.setQueryData(currentUserQuery().queryKey, data.user);
  }

  const handleLogout = () => {
    removeAuthToken();
    queryClient.setQueryData(currentUserQuery().queryKey, null);
  }


  const contextValue = {
    user,
    onLogin: handleLogin,
    onLogout: handleLogout
  }
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )

}