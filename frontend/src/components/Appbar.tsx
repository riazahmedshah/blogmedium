// import { Avatar } from "./BlogCard"

import { Link } from "react-router-dom"




const Appbar = () => {

  

  
  return (
      <header className="max-w-screen-2xl xl:px-28 px-4 bg-slate-100 border-b top-0 left-0 right-0 ">
        <nav className="flex items-center justify-between container md:py-4 pt-4 pb-3">
          <Link to={"/"}><div className="text-xl font-bold">WordNest</div></Link>
          <div className="flex flex-row items-center gap-3">
            <Link to="/signin" className="text-gray-600 hover:text-gray-900">Sign In</Link>
            <Link to="/signup">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Get Started</button>
            </Link>
          </div>
        </nav>
      </header>
  )
}

export default Appbar