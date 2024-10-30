

import { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import UserContext from "./UserContext"
import { Avatar } from "./BlogCard";




const Appbar = () => {

  const location = useLocation();
  //console.log(location.pathname);
  // Determine the link path and text based on the current path
  const linkPath = location.pathname === "/blogs" ? "/publish" : "/blogs";
  const linkText = location.pathname === "/blogs" ? "Publish" : "Blogs";

  const {loggedInUser, setLoggedInUser} = useContext(UserContext);

  function removeToken() {
    localStorage.removeItem('token');
    setLoggedInUser(null);  // Update state to reflect the logged-out status
  }
  
  

  
  return (
      <header className="max-w-screen-2xl xl:px-28 px-4 bg-slate-100 border-b top-0 left-0 right-0 ">
        <nav className="flex items-center justify-between container md:py-4 pt-4 pb-3">
           <Link to={"/"}><div className="text-xl font-bold">WordNest</div></Link>  
            

          {!loggedInUser ? <div className="flex flex-row items-center gap-3">
            <Link to="/signin" className="text-gray-600 hover:text-gray-900">Sign In</Link>
            <Link to="/signup">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Get Started</button>
            </Link>
          </div> : <div className="flex flex-row items-center">
              <Link to={linkPath}>
                <p className="mr-3 text-slate-500 font-medium hover:text-slate-700">{linkText}</p>
              </Link>
              <button onClick={() => removeToken()} className="bg-slate-400 hover:bg-slate-500 text-white px-3 py-1 rounded mr-3">Logout</button>
              <Avatar size={40} name={loggedInUser.name || "U"}/>
            </div>}
        </nav>
      </header>
  )
}

export default Appbar