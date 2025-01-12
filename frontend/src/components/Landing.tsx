import { Link } from "react-router-dom";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";


export function BackgroundBeamsWithCollisionDemo() {
  return (
    <BackgroundBeamsWithCollision className="max-w-screen-xl mx-auto">
      <h2 className="text-xl relative z-20 md:text-3xl  lg:text-6xl font-bold  text-black dark:text-white font-sans tracking-tight">
        <div className="w-[700px]">
            Uncover insights,<br />
            Connect with ideas that<span className="hover:motion-rotate-in"> inspire.</span>
        </div>
        <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))] mb-5">
          <div className="left-0 top-[1px] text-xl text-slate-800 font-normal mt-8">
                Dive into a world of creativity, where every story <br />ignites curiosity and passion.
                Join a community that values diverse <br /> perspectives and meaningful dialogue.
            
          </div>
         <Link to="/publish">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-normal text-lg px-6 py-3 rounded-lg tracking-normal ">
            Start Writing Blog
            </button>
        </Link>
         </div>
      </h2>
    </BackgroundBeamsWithCollision>
  );
}
