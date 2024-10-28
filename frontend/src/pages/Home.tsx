// import Footer from "../components/Footer";

import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="mt-20 max-w-screen-xl container mx-auto px-2 xl:px-28">
      {/* <div className="flex justify-between items-center"> */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>

      <h1 className="text-4xl mb-7 font-bold tracking-normal">
        Uncover insights,<br />
        Connect with ideas that inspire.
      </h1>
      <h3 className="text-gray-600 text-lg tracking-tight leading-6 mb-7">
        Dive into a world of creativity, where every story <br />ignites curiosity and passion.
        Join a community that values diverse <br /> perspectives and meaningful dialogue.
      </h3>
      <Link to="/publish">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded">
          Start Writing Blog
        </button>
      </Link>
      </div>
      <div className="mx-16 rounded-full hidden sm:block ">
        <img className="w-64  rounded-tl-full rounded-br-full " alt="hero-img" src="/hero.png"/>
        <img className="w-64  rounded-bl-full rounded-tr-full absolute  -mt-[256px] " alt="hero-img" src="./public/hero.png"/>
      </div>
      
      </div>
    </div>
  );
};

export default Home;
