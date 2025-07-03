import { useLocation } from "react-router-dom";

const categories = ["computer science", "global market", "What's new in tech market","full stack", "tech","personal projects","javascript"];

const FeatureCategory = () => {
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

export default FeatureCategory;

interface CategoryProps {
  categoryArray: string[];
}

export const Categoty: React.FC<CategoryProps> = ({categoryArray}) => {
    return(
        <div className=" max-w-2xl mx-auto">
            <div className="flex items-center justify-center flex-wrap">
                {
                    categoryArray.map((category,idx:number) => (
                        <div key={idx}  className="">
                            <div className="bg-[#3B3B4F] text-[#D0D0D5] hover:text-[#3B3B4F] font-semibold hover:bg-[#D0D0D5] hover:ease-in-out py-2 px-8 mx-2 my-2">
                                <span>#</span>
                                {category.toUpperCase()}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}