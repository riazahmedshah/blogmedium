import { useLocation } from "react-router-dom";
import { Category } from "./CtegoryComponent";

const categories = [
  "Computer Science", 
  "Global Market", 
  "Tech Trends",
  "Full Stack", 
  "Programming",
  "Personal Projects",
  "JavaScript"
];

export const FeatureCategory = () => {
    const { pathname } = useLocation();
    const category = pathname.split("/").filter(Boolean);
    const tag = category[category.length - 1];
    const posts: any = [];
    
    return (
        <div className="w-full py-12 bg-gradient-to-r from-blue-900 to-indigo-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="font-bold text-4xl md:text-5xl text-white mb-2">
                    <span className="text-blue-300">#</span>
                    {tag ? tag.toUpperCase() : "BLOGS"}
                </h1>
                <p className="text-xl md:text-2xl text-blue-100/80 font-light">
                    {tag 
                        ? `A curated collection of ${posts.length > 0 ? posts.length : 21} posts` 
                        : "Discover an endless collection of knowledge and insights"}
                </p>
            </div>
            
            <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Category categoryArray={categories}/>
            </div>
        </div>
    )
}