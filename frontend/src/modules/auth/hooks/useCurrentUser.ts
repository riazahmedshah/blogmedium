import { useAuth } from "./useAuth"

export const useCurrentUser = () => {
  const {user, isLoading} = useAuth();

  return {user, isLoading}
}