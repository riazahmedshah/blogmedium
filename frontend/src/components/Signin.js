var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
//import { SigninInput } from "@riyazsh9311/medium-common"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import InputFields from "./InputFields";
import UserContext from "./UserContext";
const Signin = ({ type }) => {
    // const { setLoggedInUser } = useContext(UserContext)
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const handleLoginUser = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true); // Set loading to true before starting the request
        try {
            const response = yield axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs);
            const jwt = response.data.token;
            const user = response.data.user;
            //console.log("User details: ",user);
            setLoggedInUser(user);
            localStorage.setItem("token", jwt);
            //   navigate("/blogs"); // Navigate after successful login
        }
        catch (error) {
            console.error("Error signing in user:", error);
            // Handle error, show error message, etc.
        }
        finally {
            setLoading(false); // Reset loading state after the request completes
        }
    });
    useEffect(() => {
        if (loggedInUser) {
            navigate("/blogs");
        }
    }, [loggedInUser, navigate]);
    return (_jsx("div", { className: "h-screen flex justify-center flex-col", children: _jsx("div", { className: "flex justify-center", children: _jsx("div", { children: _jsxs("div", { children: [_jsxs("div", { className: "px-10", children: [_jsx("h1", { className: "font-extrabold text-3xl tracking-tight", children: "Login an account" }), _jsxs("p", { className: "px-5 text-slate-400", children: ["Dont have an account? ", _jsx(Link, { className: "underline", to: "/signup", children: "Signup" })] })] }), _jsxs("div", { className: "mt-6", children: [_jsx(InputFields, { label: "Email", placeholder: "example@gmail.com", onChange: (e) => {
                                        setPostInputs(Object.assign(Object.assign({}, postInputs), { email: e.target.value }));
                                    } }), _jsx(InputFields, { label: "Password", type: "password", placeholder: "123456", onChange: (e) => {
                                        setPostInputs(Object.assign(Object.assign({}, postInputs), { password: e.target.value }));
                                    } }), _jsx("button", { onClick: handleLoginUser, type: "button", className: "mt-4 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700", children: loading ? "Loading..." : type })] })] }) }) }) }));
};
export default Signin;
