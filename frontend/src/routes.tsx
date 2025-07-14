import { Navigate, Outlet } from "react-router-dom";
import Appbar from "./components/Appbar";
import Footer from "./components/Footer";
import { useAuth } from "@modules/auth/hooks/useAuth";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Appbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export const ProtectedRoute = () => {
  const {user} = useAuth();

  if (user === null) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user === undefined) {
    return <div>Checking authentication...</div>;
  }


  return <Outlet/>;
}