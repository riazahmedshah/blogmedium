import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "./UserContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button, buttonVariants } from "./ui/button";
import { User2 } from "lucide-react";
const Appbar = () => {
    const location = useLocation();
    //console.log(location.pathname);
    // Determine the link path and text based on the current path
    const linkPath = location.pathname === "/blogs" ? "/publish" : "/blogs";
    const linkText = location.pathname === "/blogs" ? "Publish" : "Blogs";
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    function removeToken() {
        localStorage.removeItem('token');
        setLoggedInUser(null); // Update state to reflect the logged-out status
    }
    return (_jsx("header", { className: "w-full xl:px-28 px-4  shadow-sm top-0 left-0 right-0 mx-auto ", children: _jsxs("nav", { className: "max-w-screen-2xl w-full flex items-center justify-between container md:py-3 pt-4 pb-3  ", children: [_jsx(Link, { to: "/", children: _jsxs("div", { className: "text-4xl font-bold hover:text-green-700 font-mono", children: ["Word", _jsx("span", { className: "text-green-700", children: "Nest" })] }) }), !loggedInUser ? _jsxs("div", { className: "flex flex-row items-center gap-3", children: [_jsx(Link, { to: "/signin", className: buttonVariants({ variant: "outline" }), children: "Sign In" }), _jsx(Link, { to: "/signup", children: _jsx(Button, { children: "Get Started" }) })] }) : _jsxs("div", { className: "flex flex-row items-center gap-3", children: [_jsx(Link, { to: linkPath, children: _jsx("p", { className: `${buttonVariants({ variant: "link" })} font-normal text-[19px]`, children: linkText }) }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { className: "rounded-full size-10", variant: "outline", children: _jsx(User2, {}) }) }), _jsxs(DropdownMenuContent, { children: [_jsx(DropdownMenuLabel, { children: "My Account" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { onClick: removeToken, children: "Logout" }), _jsx(DropdownMenuItem, { children: _jsx(Link, { to: "/profile", children: "Profile" }) })] })] })] })] }) }));
};
export default Appbar;
