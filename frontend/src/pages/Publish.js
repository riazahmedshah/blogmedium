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
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import UserContext from "../components/UserContext";
export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { loggedInUser } = useContext(UserContext);
    const handlePublish = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!title || !description) {
            setError("Both title and content are required.");
            return;
        }
        try {
            const response = yield axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: description,
            }, {
                headers: {
                    Authorization: localStorage.getItem("token") || "",
                }
            });
            navigate(`/blog/${response.data.id}`);
        }
        catch (err) {
            console.error(err);
            setError("Failed to publish. Please try again later.");
        }
    });
    useEffect(() => {
        if (!loggedInUser) {
            navigate("/signin"); // Redirect to login if not logged in
        }
    }, [loggedInUser, navigate]);
    return (_jsx("div", { children: _jsx("div", { className: "flex justify-center w-full pt-8", children: _jsxs("div", { className: "max-w-screen-lg w-full bg-white p-6 rounded-lg", children: [_jsx("input", { onChange: (e) => setTitle(e.target.value), className: "w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-4", type: "text", placeholder: "Title" }), _jsx(TextEditor, { onChange: (e) => setDescription(e.target.value) }), error && _jsx("div", { className: "text-red-500 mt-2", children: error }), _jsx("button", { onClick: handlePublish, type: "submit", className: "mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800", children: "Publish Post" })] }) }) }));
};
// Text Editor Component
function TextEditor({ onChange, }) {
    return (_jsx("div", { className: "mt-2", children: _jsx("div", { className: "w-full mb-4 ", children: _jsx("div", { className: "flex items-center justify-between border rounded-lg", children: _jsxs("div", { className: "my-2 bg-white rounded-b-lg w-full", children: [_jsx("label", { className: "sr-only", children: "Publish post" }), _jsx("textarea", { onChange: onChange, id: "editor", rows: 8, className: "focus:outline-none block w-full px-2 py-2 text-sm text-gray-800 bg-white border-0", placeholder: "Write an article...", required: true })] }) }) }) }));
}
export default Publish;
