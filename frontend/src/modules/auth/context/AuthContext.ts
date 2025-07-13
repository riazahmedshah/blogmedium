import { User } from "@modules/user/types"
import { createContext } from "react"
import { LoginRequestResponse } from "../api/login"

type AuthContext = {
  user: User | null | undefined,
  onLogin: (data: LoginRequestResponse) => void,
  onLogout:() => void
}

export const AuthContext = createContext<AuthContext>(null!)