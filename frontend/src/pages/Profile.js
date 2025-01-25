import { jsx as _jsx } from "react/jsx-runtime";
import { useContext, useEffect } from "react";
import { ProfileCard } from "../components/ProfileCard";
import UserContext from "@/components/UserContext";
import { useNavigate } from "react-router-dom";
const Profile = () => {
    const { loggedInUser } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!loggedInUser) {
            navigate("/signin"); // Redirect to login if not logged in
        }
    }, [loggedInUser, navigate]);
    return (_jsx("div", { children: _jsx(ProfileCard, { data: loggedInUser }) }));
};
export default Profile;
