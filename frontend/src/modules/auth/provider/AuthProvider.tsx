import { useQuery, useQueryClient } from "@tanstack/react-query"
import { currentUserQuery } from "../api/currentUser";
import { LoginRequestResponse } from "../api/login";
import { removeAuthToken, storeAuthToken } from "../helper/authToken";
import { AuthContext } from "../context/AuthContext";
import { ReactNode, useState } from "react";
import { isAxiosError } from "axios";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [logoutTrigger, setLogoutTrigger] = useState(false);

  const {data:user} = useQuery({
    ...currentUserQuery(),
    retry: (failureCount, error) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      return false;
    }
    return failureCount < 3;
  },
  });

  // console.log("user", user)

  const handleLogin = async(data:LoginRequestResponse) => {
    storeAuthToken(data.token);
    await queryClient.invalidateQueries({queryKey: currentUserQuery().queryKey});
    // queryClient.setQueryData(currentUserQuery().queryKey, data.user);
  }

  const handleLogout = () => {
    removeAuthToken();
    queryClient.clear();
    queryClient.setQueryData(currentUserQuery().queryKey, null);
    setLogoutTrigger(prev => !prev);
  }


  const contextValue = {
    user: user ?? null,
    onLogin: handleLogin,
    onLogout: handleLogout
  }
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )

}