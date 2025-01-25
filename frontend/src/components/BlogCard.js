import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { formatter } from "@/types";
import { Heart, MessageCircle, Share } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
const BlogCard = ({ authorName, title, content, createdAt, id }) => {
    const [like, setLike] = useState(false);
    const [count, setCount] = useState(0);
    const changeColor = () => {
        setLike((prevLike) => {
            if (prevLike) {
                setCount((prevCount) => prevCount - 1); // Decrement count
            }
            else {
                setCount((prevCount) => prevCount + 1); // Increment count
            }
            return !prevLike; // Toggle like state
        });
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "p-3 border-b border-black mt-2", children: [_jsxs(Link, { to: `/blog/${id}`, children: [_jsxs("div", { className: "flex", children: [_jsx("div", { className: "pr-1", children: _jsx(Avatar, { name: authorName, size: 23 }) }), _jsxs("div", { className: "flex items-center", children: [_jsxs("h1", { className: "text-xs font-normal text-muted-foreground", children: [authorName, " . "] }), _jsxs("h1", { className: "text-xs font-normal pl-2 text-slate-400", children: [" ", formatter.format(createdAt)] })] })] }), _jsxs("div", { className: "my-2 ", children: [_jsx("h1", { className: "md:text-3xl text-xl font-bold md:font-semibold md:max-w-lg max-w-sm mb-2", children: title.slice(0, 30) + "..." }), _jsx("h3", { className: "md:max-w-lg max-w-xm text-sm font-normal", children: content.slice(0, 100) + "..." })] }), _jsx("div", { className: "mt-5 text-slate-400 text-xs", children: `${Math.ceil(content.length / 100)} minute(s) read` })] }), _jsxs("div", { className: "pt-4 flex items-center gap-3", children: [like ? (_jsxs("p", { onClick: changeColor, className: "cursor-pointer flex items-center gap-1", children: [_jsx(Heart, { className: "md:size-5 size-4", fill: "red", strokeWidth: 0 }), count] })) : (_jsxs("p", { onClick: changeColor, className: "cursor-pointer flex items-center gap-1", children: [_jsx(Heart, { className: "md:size-5 size-4" }), count] })), _jsx("p", { children: _jsx(MessageCircle, { className: "md:size-5 size-4" }) }), _jsx("p", { children: _jsx(Share, { className: "md:size-5 size-4" }) })] })] }) }));
};
export function Avatar({ name, size }) {
    const sizeClass = `w-${size} h-${size}`; // Construct the size classes based on the size prop
    return (_jsx("div", { className: `relative inline-flex items-center justify-center ${sizeClass} overflow-hidden bg-green-900/80 rounded-full dark:bg-gray-600`, style: { width: `${size}px`, height: `${size}px` }, children: _jsx("span", { className: "font-normal text-sm text-white dark:text-gray-300", children: name[0] }) }));
}
export default BlogCard;
