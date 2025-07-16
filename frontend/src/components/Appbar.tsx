import { Bird, User2 } from "lucide-react";
import { Button } from "@ui/button";
import { Link, useLocation } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@ui/dropdown-menu";
import { useCurrentUser } from "@modules/auth/hooks/useCurrentUser";

export const Appbar = () => {
    const user= useCurrentUser();
    const location = useLocation();

    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-950 to-blue-900 text-white shadow-lg">
            <div className="container mx-auto flex items-center justify-between h-16 px-4">
                <div className="hidden md:flex items-center space-x-6">
                    <Link
                        to="/"
                        className={`hover:text-blue-300 transition-colors ${location.pathname === '/' ? 'text-blue-300 font-medium' : ''}`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/blogs"
                        className={`hover:text-blue-300 transition-colors ${location.pathname.startsWith('/blogs') ? 'text-blue-300 font-medium' : ''}`}
                    >
                        Articles
                    </Link>
                    <a
                        href="https://riazdev.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-300 transition-colors"
                    >
                        About
                    </a>
                </div>

                <Link
                    to="/"
                    className="flex items-center gap-2 group mx-4"
                >
                    <Bird
                        size={28}
                        className="text-blue-300 group-hover:rotate-12 transition-transform duration-300"
                    />
                    <h1 className="text-2xl font-bold font-mono bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                        WordNest
                    </h1>
                </Link>

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <Button
                                asChild
                                variant="ghost"
                                className="hidden sm:inline-flex"
                            >
                                <Link to="/publish">
                                    Create Post
                                </Link>
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="rounded-full h-10 w-10 p-0 relative overflow-hidden border-blue-300 hover:border-blue-200 transition-colors"
                                    >
                                        {user.profilePhoto ? (
                                            <img
                                                src={user.profilePhoto}
                                                alt="Profile"
                                                className="absolute inset-0 w-full h-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <User2 className="h-5 w-5 text-blue-300" />
                                        )}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 bg-blue-900 border-blue-700 text-white font-bold">
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium">{user.name || 'My Account'}</p>
                                            <p className="text-xs text-blue-300">{user.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-blue-700" />
                                    <DropdownMenuItem className="hover:bg-blue-800 focus:bg-blue-800">
                                        <Link to="/profile" className="w-full">
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-blue-800 focus:bg-blue-800">
                                        <Link to="/profile/settings" className="w-full">
                                            Settings
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-blue-700" />
                                    <DropdownMenuItem className="text-red-300 hover:bg-blue-800 hover:text-red-200 focus:bg-blue-800">
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Button
                                asChild
                                variant="ghost"
                                className="hidden sm:inline-flex"
                            >
                                <Link to="/blogs">
                                    Explore
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="default"
                                className="bg-blue-600 hover:bg-blue-500 px-6"
                            >
                                <Link to="/auth/login">
                                    Sign In
                                </Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};