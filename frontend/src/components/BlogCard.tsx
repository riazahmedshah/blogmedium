import { Heart, MessageCircle, Share } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface blogCard{
    id:string,
    authorName:string,
    title:string,
    content:string,
    publishedDate:string,

}

const BlogCard = ({authorName, title,content,publishedDate, id}:blogCard) => {
  const [like,setLike] = useState(false);
  const [count,setCount] = useState(0);
  const changeColor = () => {
    setLike((prevLike) => {
      if (prevLike) {
        setCount((prevCount) => prevCount - 1); // Decrement count
      } else {
        setCount((prevCount) => prevCount + 1); // Increment count
      }
      return !prevLike; // Toggle like state
    });
  };
  return (
    <>
    <div className="p-3 border-b mt-2">
      <Link to={`/blog/${id}`}>
        <div className="flex">
            <div className="pr-1"><Avatar name={authorName} size={23}/></div>
            <div className="flex items-center">
                <h1 className="text-xs font-normal text-muted-foreground">{authorName} . </h1>
                <h1 className="text-xs font-normal pl-2 text-slate-400"> {publishedDate}</h1>
            </div>
        </div>
        <div className="my-2 ">
            <h1 className="md:text-3xl text-xl font-bold md:font-semibold md:max-w-lg max-w-sm mb-2">{title.slice(0,30) + "..."}</h1>
            <h3 className="md:max-w-lg max-w-xm text-sm font-normal">{content.slice(0,100) + "..."}</h3>
        </div>
        <div className="mt-5 text-slate-400 text-xs">
            {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
    </Link>
      <div className="pt-4 flex items-center gap-3">
        {
          like ? (
            <p onClick={changeColor} className="cursor-pointer flex items-center gap-1">
          <Heart className="md:size-5 size-4"  fill="red" strokeWidth={0} />{count}
        </p>
          ) : (
            <p onClick={changeColor} className="cursor-pointer flex items-center gap-1">
          <Heart className="md:size-5 size-4" />{count}
        </p>
          )
        }
        
        <p><MessageCircle className="md:size-5 size-4"/></p>
        <p><Share className="md:size-5 size-4"/></p>
      </div>
    </div>
    </>
  )
};


export function Avatar({ name, size }: { name: string; size: number }) {
    const sizeClass = `w-${size} h-${size}`; // Construct the size classes based on the size prop
  
    return (
      <div
        className={`relative inline-flex items-center justify-center ${sizeClass} overflow-hidden bg-green-900/80 rounded-full dark:bg-gray-600`}
        style={{ width: `${size}px`, height: `${size}px` }} // Use inline style as a fallback for dynamic sizes
      >
        <span className="font-normal text-sm text-white dark:text-gray-300">{name[0]}</span>
      </div>
    );
  }
  

export default BlogCard