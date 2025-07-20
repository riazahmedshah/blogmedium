import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {Appbar} from "./components/Appbar";
import Footer from "./components/Footer";
import { useAuth } from "@modules/auth/hooks/useAuth";
import { FeatureCategory } from "./components/FeatureCategory";
import { useEffect } from "react";

export const Layout = () => {
  const location = useLocation();
  const pathsToHideFeatureCategory = [
    '/publish',
    '/blog',
    '/profile'
  ];

  const shouldHideFeatureCategory = pathsToHideFeatureCategory.some(path =>
    location.pathname.startsWith(path)
  );
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      {/* Header Section */}
      <header className="shadow-sm">
        <Appbar />
        {!shouldHideFeatureCategory && <FeatureCategory />}
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user === null) {
      navigate('/auth/login', { replace: true });
    }
  }, [user, navigate]);

  if (user === undefined) {
    return <div>Checking authentication...</div>;
  }

  if (user === null) {
    return null; // or a loading spinner
  }

  return <Outlet />;
};