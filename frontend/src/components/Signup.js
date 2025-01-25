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
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import InputFields from "./InputFields";
import UserContext from "./UserContext";
// import UserContext from "./UserContext";
const Signup = ({ type }) => {
    const navigate = useNavigate();
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [postInputs, setPostInputs] = useState({
        name: "",
        email: "",
        password: ""
    });
    const handleCreateUser = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            setLoading(true);
            const response = yield axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
            const jwt = response.data.token;
            const user = response.data.user;
            setLoggedInUser(user);
            navigate("/blogs");
            localStorage.setItem("token", jwt);
        }
        catch (error) {
            console.error("Error signing in user:", error);
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
    return (_jsx("div", { className: "h-screen flex justify-center flex-col", children: _jsx("div", { className: "flex justify-center", children: _jsx("div", { children: _jsxs("div", { children: [_jsxs("div", { className: "px-10", children: [_jsx("h1", { className: "font-extrabold text-3xl tracking-tight", children: "Create an account" }), _jsxs("p", { className: "px-5 text-slate-400", children: ["Already have an account? ", _jsx(Link, { className: "underline", to: "/signin", children: "Login" })] })] }), _jsxs("div", { className: "mt-6", children: [_jsx(InputFields, { label: "Name", placeholder: "Enter your name", onChange: (e) => {
                                        setPostInputs(Object.assign(Object.assign({}, postInputs), { name: e.target.value }));
                                    } }), _jsx(InputFields, { label: "Email", placeholder: "example@gmail.com", onChange: (e) => {
                                        setPostInputs(Object.assign(Object.assign({}, postInputs), { email: e.target.value }));
                                    } }), _jsx(InputFields, { label: "Password", type: "password", placeholder: "123456", onChange: (e) => {
                                        setPostInputs(Object.assign(Object.assign({}, postInputs), { password: e.target.value }));
                                    } }), _jsx("button", { onClick: handleCreateUser, type: "button", className: "mt-4 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700", children: loading ? "loading..." : type })] })] }) }) }) }));
};
export default Signup;
