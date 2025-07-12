import { Bird } from "lucide-react";
import { Button } from "@ui/button";
import { Link } from "react-router-dom";

export const Header = () => {
    return(
        <header className="sticky top-0 z-50 bg-blue-950 text-white h-12">
            <div className="flex items-center justify-between h-full">
                <div className="px-4 text-lg">
                    <ul className="flex items-center gap-4 mx-2">
                        <li>Home</li>
                        <li>About</li>
                        <li>Aticles</li>
                    </ul>
                </div>
                <div className="p-2 flex items-center text-3xl font-mono font-bold gap-1">
                    <span>
                        <Bird size={32}/>
                    </span>
                    <h1>WordNest</h1>
                </div>
                <div className="flex items-center gap-2 px-4">
                    <Button asChild variant="ghost">
                        <Link to="/blogs">
                            Explore
                        </Link>
                    </Button>
                    <Button asChild className="px-10">
                        <Link to="/auth/login">
                            Login
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}