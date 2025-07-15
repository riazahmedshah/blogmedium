import { Outlet, useNavigate } from "react-router-dom";
import {Appbar} from "./components/Appbar";
import Footer from "./components/Footer";
import { useAuth } from "@modules/auth/hooks/useAuth";
import { FeatureCategory } from "./components/FeatureCategory";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      {/* Header Section */}
      <header className="shadow-sm">
        <Appbar />
        <FeatureCategory />
      </header>

      {/* Main Content - flex-grow ensures it takes remaining space */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet /> {/* This will render the child routes */}
      </main>

      {/* Footer - always at bottom */}
      <Footer />
    </div>
  );
};

export const ProtectedRoute = () => {
  const navigate = useNavigate()
  const {user} = useAuth();

  if (user === null) {
    navigate("/auth/login");
  }

  if (user === undefined) {
    return <div>Checking authentication...</div>;
  }


  return <Outlet/>;
}