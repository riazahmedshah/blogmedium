import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth';
import Blogs from './pages/Blogs';
import { Blog } from './pages/singleBlog';
import { Publish } from './pages/Publish';
import { UserProvider } from './components/UserContext';
import Home from './pages/Home';
import Appbar from './components/Appbar';
import Footer from './components/Footer';
import Error from './pages/Error';
import Profile from './pages/Profile';
function Layout() {
    return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx(Appbar, {}), _jsx("div", { className: "flex-grow", children: _jsx(Outlet, {}) }), _jsx(Footer, {})] }));
}
function App() {
    return (_jsx(UserProvider, { children: _jsx(BrowserRouter, { basename: "/", children: _jsxs(Routes, { children: [_jsx(Route, { path: '/signup', element: _jsx(Auth, { type: 'Signup' }) }), _jsx(Route, { path: '/signin', element: _jsx(Auth, { type: 'Signin' }) }), _jsx(Route, { path: '/', element: _jsx(Home, {}) }), _jsxs(Route, { element: _jsx(Layout, {}), children: [_jsx(Route, { path: '/blogs', element: _jsx(Blogs, {}) }), _jsx(Route, { path: '/blog/:id', element: _jsx(Blog, {}) }), _jsx(Route, { path: '/publish', element: _jsx(Publish, {}) }), _jsx(Route, { path: '/profile', element: _jsx(Profile, {}) }), _jsx(Route, { path: '*', element: _jsx(Error, {}) })] })] }) }) }));
}
export default App;
