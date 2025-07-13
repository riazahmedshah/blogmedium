import { useLocation } from "react-router-dom";
import { Categoty } from "./CtegoryComponent";

const categories = ["computer science", "global market", "What's new in tech market","full stack", "tech","personal projects","javascript"];

export const FeatureCategory = () => {
    const {pathname} = useLocation();
    const category = pathname.split("/").filter(Boolean);
    const tag = category[category.length - 1];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const posts:any = []
    return(
        <div className="w-full py-10 bg-[#1b1b32]">
            <div className="text-center my-2 ">
                <h1 className=" font-semibold text-4xl text-[#FFFFFF]">
                    <span>#</span>
                    {tag ? tag.toUpperCase() : "BLOGS"}
                </h1>
                {tag ? <p className="text-3xl py-2 font-extralight text-[#FFFFFF]/50">
                    {`A collection of ${posts.length > 0 ? posts.length : 21} posts`}
                </p> : <p className="text-3xl py-2 font-extralight text-[#FFFFFF]/50">
                   An endless collection of learning
                </p>
                }
            </div>
            
            <Categoty categoryArray={categories}/>
        </div>
    )
}

