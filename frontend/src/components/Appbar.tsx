
// // import { useContext } from "react"
// import { Link, useLocation } from "react-router-dom"
// // import UserContext from "./UserContext"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
// import { Button, buttonVariants } from "./ui/button";
// import { User2 } from "lucide-react";




// const Appbar = () => {

//   const location = useLocation();
//   //console.log(location.pathname);
//   // Determine the link path and text based on the current path
//   const linkPath = location.pathname === "/blogs" ? "/publish" : "/blogs";
//   const linkText = location.pathname === "/blogs" ? "Publish" : "Blogs";

//   // const {loggedInUser, setLoggedInUser} = useContext(UserContext);

//   // function removeToken() {
//   //   localStorage.removeItem('token');
//   //   setLoggedInUser(null);  // Update state to reflect the logged-out status
//   // }




//   return (
//       <header className="w-full xl:px-28 px-4  shadow-sm top-0 left-0 right-0 mx-auto ">
//         <nav className="max-w-screen-2xl w-full flex items-center justify-between container md:py-3 pt-4 pb-3  ">
//            <Link to={"/"}><div className="text-4xl font-bold hover:text-green-700 font-mono">Word<span className="text-green-700">Nest</span></div></Link>  


//           <div className="flex flex-row items-center gap-3">
//               <Link to={linkPath}>
//                 <p className={`${buttonVariants({ variant: "link" })} font-normal text-[19px]`}>{linkText}</p>
//               </Link>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button className="rounded-full size-10" variant="outline">
//                     <User2/>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent>
//                   <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                   <DropdownMenuSeparator/>
//                   <DropdownMenuItem >Logout</DropdownMenuItem>
//                   <DropdownMenuItem>Profile</DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//         </nav>
//       </header>
//   )
// }

// export default Appbar

import { Bird, User2 } from "lucide-react";
import { Button } from "@ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@modules/auth/hooks/useAuth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@ui/dropdown-menu";

export const Appbar = () => {
    const { user } = useAuth()
    return (
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
                            <Bird size={30} />
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
                    {!user ? <Button asChild className="px-10">
                        <Link to="/auth/login">
                            Login
                        </Link>
                    </Button> :
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                {!user.profilePhoto ? 
                                <Button className="rounded-full size-10" variant="outline">
                                    <User2 />
                                </Button>:
                                <Button className="rounded-full size-10" variant="outline">
                                    <img src={user.profilePhoto} alt="profile"/>
                                </Button>
                                }
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem >Logout</DropdownMenuItem>
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                </div>
            </div>
        </header>
    )
}