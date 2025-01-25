var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
// UserContext.tsx
//import React, { createContext, useState, useContext, ReactNode } from 'react';
import { createContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
const UserContext = createContext({
    loggedInUser: null,
    setLoggedInUser: () => { }
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UserProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    useEffect(() => {
        const fetchUser = () => __awaiter(void 0, void 0, void 0, function* () {
            const token = localStorage.getItem("token"); // Get token from storage
            if (!token)
                return;
            try {
                const response = yield axios.get(`${BACKEND_URL}/api/v1/user/user`, {
                    headers: {
                        Authorization: `${token}` // Send token in header
                    }
                });
                const userData = response.data.user;
                setLoggedInUser(userData);
            }
            catch (error) {
                console.error("Failed to fetch user:", error);
            }
        });
        fetchUser();
    }, [setLoggedInUser]);
    return (_jsx(UserContext.Provider, { value: { loggedInUser, setLoggedInUser }, children: children }));
};
export default UserContext;
