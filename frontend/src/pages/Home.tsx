/* eslint-disable react-hooks/exhaustive-deps */

import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../components/UserContext";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Button, buttonVariants } from "../components/ui/button";
import { User2 } from "lucide-react";

const AnimatedText = () => {
  const words = ["inspire", "create", "innovate", "achieve"]; // Words to cycle through
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [index, setIndex] = useState(0);

  const {loggedInUser} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000); // Change word every second
    return () => clearInterval(interval); // Cleanup on unmount
  }, [words.length]);

  useEffect(() => {
    setCurrentWord(words[index]);
  }, [index, words]);

  // if(loggedInUser){
  //   navigate("/blogs")
  // }
  if(!loggedInUser){
    navigate("/")
  }

  return (
    <motion.span
      key={currentWord} // Key helps Framer Motion know when the word changes
      initial={{ opacity: 0, y: 20 }} // Initial state
      animate={{ opacity: 1, y: 0 }} // Animate to this state
      exit={{ opacity: 0, y: -20 }} // Exit state
      transition={{ duration: 0.5 }} // Transition duration
      className="from-green-500 via-green-700 to-green-900 bg-gradient-to-br  text-transparent bg-clip-text"
    >
      {currentWord}
    </motion.span>
  );
};

const Home = () => {
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/"); // Redirect to login if not logged in
    }
  }, [loggedInUser, navigate]);

  const linkPath = location.pathname === "/blogs" ? "/publish" : "/blogs";
  const linkText = location.pathname === "/blogs" ? "Publish" : "Blogs";

  return (
    <>
    <header className="absolute z-10 w-full xl:px-28 px-4  shadow-sm top-0 left-0 right-0 mx-auto ">
        <nav className="max-w-screen-2xl w-full flex items-center justify-between container md:py-3 pt-4 pb-3  ">
           <Link to={"/"}><div className="text-4xl font-bold hover:text-green-700 font-mono">Word<span className="text-green-700">Nest</span></div></Link>  
            

          {!loggedInUser ? <div className="flex flex-row items-center gap-3">
            <Link to="/signin" className="text-gray-600 hover:text-gray-900">Sign In</Link>
            <Link to="/signup">
              <button className={buttonVariants()}>Get Started</button>
            </Link>
          </div> : <div className="flex flex-row items-center">
              <Link to={linkPath}>
                <p className={`${buttonVariants({variant:"link"})} font-bold text-xl`}>{linkText}</p>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="rounded-full size-10" variant="outline">
                    <User2/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>}
        </nav>
      </header>
    <div className="absolute pt-40 min-h-screen w-full from-gray-100 via-green-300 to-green-500 bg-gradient-to-br container mx-auto px-2 xl:px-28">
      <div className="flex flex-col max-w-screen-lg justify-center mx-auto">
        <div>
          <h1 className="text-7xl mb-7 font-bold tracking-normal">
            Uncover insights,<br />
            Connect with ideas that <AnimatedText />.
          </h1>
          <h3 className="text-gray-800 text-xl tracking-tight leading-6 mb-7">
            Dive into a world of creativity, where every story <br />ignites
            curiosity and passion. Join a community that values diverse <br />
            perspectives and meaningful dialogue.
          </h3>
          <Link to="/publish">
            <Button className="w-48 h-11">
              Start Writing Blog
            </Button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
