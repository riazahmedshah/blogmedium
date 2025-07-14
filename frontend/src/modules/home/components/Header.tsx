import { Bird } from "lucide-react";
import { Button } from "@ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@modules/auth/hooks/useAuth";

export const Header = () => {
    const { user } = useAuth()
    return(
        <header className="sticky top-0 z-50 bg-blue-950 text-white h-12">
            <div className="flex items-center justify-between h-full">
                <div className="px-4 text-lg">
                    <ul className="flex items-center gap-4 mx-2">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="https://riazdev.vercel.app/">About</Link></li>
                        <li><Link to="/blogs">Aticles</Link></li>
                    </ul>
                </div>
                <Link to="/">
                    <div className="hover:text-blue-500 p-2 flex items-center text-3xl font-mono font-bold gap-1">
                            <span>
                                <Bird size={30}/>
                            </span>
                            <h1>WordNest</h1>
                    </div>
                </Link>
                <div className="flex items-center gap-2 px-4">
                    <Button asChild variant="ghost">
                        {!user ? <Link to="/blogs">
                            Explore
                        </Link> : <Link to="/publish">
                            Publish
                        </Link>}
                    </Button>
                    {!user && <Button asChild className="px-10">
                        <Link to="/auth/login">
                            Login
                        </Link>
                    </Button>}
                </div>
            </div>
        </header>
    )
}