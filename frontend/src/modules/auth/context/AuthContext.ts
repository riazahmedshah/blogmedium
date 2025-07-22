import { User } from "@modules/user/types"
import { createContext } from "react"
import { LoginRequestResponse } from "../api/login"

type AuthContextType = {
  user: User | null | undefined,
  isLoading: boolean,
  onLogin: (data: LoginRequestResponse) => void,
  onLogout:() => void
}

export const AuthContext = createContext<AuthContextType>(null!)