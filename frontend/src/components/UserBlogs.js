import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import BlogCard from "./BlogCard";
import BlogSkeleton from "./BlogSkeleton";
import { useUniqueBlog } from "./hooks/useBlogs";
export const UserBlogs = () => {
    const { blogs, loading } = useUniqueBlog();
    console.log("Blogs: ", blogs);
    if (loading) {
        return (_jsx(BlogSkeleton, {}));
    }
    return (_jsxs("div", { className: "max-w-2xl mx-auto px-4 py-4", children: [_jsx("h2", { className: "text-xl font-semibold text-center md:mb-6 mb-2", children: "Recent Blogs..." }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8", children: blogs.length > 0 ? (blogs.map((blog) => (_jsx(BlogCard, { id: blog.id, authorName: blog.author.name || "Anonymous", title: blog.title, content: blog.content, createdAt: blog.createdAt }, blog.id)))) : (_jsx("div", { className: "text-center col-span-full", children: "No blogs available" })) })] }));
};
