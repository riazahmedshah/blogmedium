import { useQuery, useQueryClient } from "@tanstack/react-query"
import { currentUserQuery } from "../api/currentUser";
import { LoginRequestResponse } from "../api/login";
import { removeAuthToken, storeAuthToken } from "../helper/authToken";
import { AuthContext } from "../context/AuthContext";
import { ReactNode, useState } from "react";
import { isAxiosError } from "axios";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [_logoutTrigger, setLogoutTrigger] = useState(false);

  const {data:user, isLoading} = useQuery({
    ...currentUserQuery(),
    retry: (failureCount, error) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      return false;
    }
    return failureCount < 3;
  },
  });

  const handleLogin = async(data:LoginRequestResponse) => {
    storeAuthToken(data.token);
    await queryClient.invalidateQueries({queryKey: currentUserQuery().queryKey});
  }

  const handleLogout = () => {
    removeAuthToken();
    queryClient.clear();
    queryClient.setQueryData(currentUserQuery().queryKey, null);
    setLogoutTrigger(prev => !prev);
  }


  const contextValue = {
    user: user ?? null,
    isLoading:isLoading,
    onLogin: handleLogin,
    onLogout: handleLogout
  }
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )

}