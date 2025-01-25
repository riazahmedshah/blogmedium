import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Quote from "../components/Quote";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
const Auth = ({ type }) => {
    return (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2", children: [_jsx("div", { children: type === "Signup" ? _jsx(Signup, { type: "Signup" }) : _jsx(Signin, { type: "Signin" }) }), _jsx("div", { className: "hidden sm:block", children: _jsx(Quote, {}) })] }));
};
export default Auth;
