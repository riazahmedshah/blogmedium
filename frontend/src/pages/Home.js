import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "../components/ui/button";
const AnimatedText = () => {
    const words = useMemo(() => ["inspire", "create", "innovate", "achieve"], []);
    const [currentWord, setCurrentWord] = useState(words[0]);
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 1000); // Change word every second
        return () => clearInterval(interval); // Cleanup on unmount
    }, [words.length]);
    useEffect(() => {
        setCurrentWord(words[index]);
    }, [index, words]);
    return (_jsx(motion.span, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.5 }, className: "from-green-500 via-green-700 to-green-900 bg-gradient-to-br  text-transparent bg-clip-text", children: currentWord }, currentWord));
};
const Home = () => {
    return (_jsxs(_Fragment, { children: [_jsx("header", { className: "absolute z-10 w-full xl:px-28 px-4  shadow-sm top-0 left-0 right-0 mx-auto ", children: _jsxs("nav", { className: "max-w-screen-2xl w-full flex items-center justify-between container md:py-3 pt-4 pb-3  ", children: [_jsx(Link, { to: "/", children: _jsxs("div", { className: "text-4xl font-bold hover:text-green-700 font-mono", children: ["Word", _jsx("span", { className: "text-green-700", children: "Nest" })] }) }), _jsxs("div", { className: "flex flex-row items-center gap-3", children: [_jsx(Link, { to: "/signin", className: "text-gray-600 hover:text-gray-900", children: "Sign In" }), _jsx(Link, { to: "/signup", children: _jsx("button", { className: buttonVariants(), children: "Get Started" }) })] })] }) }), _jsx("div", { className: "absolute md:pt-40 pt-32 min-h-screen w-full from-gray-100 via-green-300 to-green-500 bg-gradient-to-br container mx-auto px-6 xl:px-28", children: _jsx("div", { className: "flex flex-col max-w-screen-lg justify-center mx-auto", children: _jsxs("div", { children: [_jsxs("h1", { className: "md:text-7xl text-5xl  mb-7 font-bold tracking-normal", children: ["Uncover insights,", _jsx("br", {}), "Connect with ideas that ", _jsx(AnimatedText, {}), "."] }), _jsx("h3", { className: "text-gray-800 md:text-xl md:max-w-md max-w-lg text-base tracking-normal mb-7", children: "Dive into a world of creativity, where every story ignites curiosity and passion. Join a community that values diverse perspectives and meaningful dialogue." }), _jsx(Link, { to: "/publish", children: _jsx(Button, { className: "w-48 h-11", children: "Start Writing Blog" }) })] }) }) })] }));
};
export default Home;
