import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../components/hooks/useBlogs";
import UserContext from "../components/UserContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import BlogSkeleton from "../components/BlogSkeleton";
const Blogs = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10; // Number of blogs per page
    const { loading, blogs, filteredBlogs, setFilteredBlogs } = useBlogs(currentPage, limit);
    const [search, setSearch] = useState("");
    const { loggedInUser } = useContext(UserContext);
    useEffect(() => {
        if (!loggedInUser) {
            navigate("/signin");
        }
        ;
    }, [loggedInUser, navigate]);
    if (loading) {
        return (_jsx(BlogSkeleton, {}));
    }
    return (_jsx("div", { className: "min-h-screen", children: _jsx("section", { className: "py-10", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [_jsxs("div", { className: "flex items-center justify-center pt-2 pb-4", children: [_jsx(Input, { className: "md:max-w-lg w-full", type: "text", value: search, placeholder: "Search blogs...", onChange: (e) => {
                                    setSearch(e.target.value);
                                } }), _jsx(Button, { className: "bg-green-800/95", onClick: () => {
                                    const filterBlog = blogs === null || blogs === void 0 ? void 0 : blogs.filter((blog) => (blog.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())));
                                    setFilteredBlogs(filterBlog);
                                }, children: "Search" })] }), _jsx("h2", { className: "text-xl font-semibold text-center md:mb-6 mb-2", children: "Recent Blogs..." }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8", children: filteredBlogs && filteredBlogs.length > 0 ? (filteredBlogs.map((blog) => (_jsx(BlogCard, { id: blog.id, authorName: blog.author.name || "Anonymous", title: blog.title, content: blog.content, createdAt: blog.createdAt }, blog.id)))) : (_jsx("div", { className: "text-center col-span-full", children: "No blogs available" })) })] }) }) }));
};
export default Blogs;
