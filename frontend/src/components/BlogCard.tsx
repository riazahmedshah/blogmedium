import { Link } from "react-router-dom";

interface blogCard{
    id:string,
    authorName:string,
    title:string,
    content:string,
    publishedDate:string,

}

const BlogCard = ({authorName, title,content,publishedDate, id}:blogCard) => {
  return (
    <Link to={`/blog/${id}`}>
    <div className="p-3 border-b mt-2">
        <div className="flex">
            <div className="pr-2"><Avatar name={authorName} size={20}/></div>
            <div className="flex items-center">
                <h1 className="text-xs font-normal">{authorName} . </h1>
                <h1 className="text-xs font-normal pl-2 text-slate-400"> {publishedDate}</h1>
            </div>
        </div>
        <div className="my-2 ">
            <h1 className="text-xl font-bold max-w-lg mb-2">{title}</h1>
            <h3 className="max-w-lg text-sm">{content.slice(0,100) + "..."}</h3>
        </div>
        <div className="mt-5 text-slate-400 text-xs">
            {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
    </div>
    </Link>
  )
};


export function Avatar({ name, size }: { name: string; size: number }) {
    const sizeClass = `w-${size} h-${size}`; // Construct the size classes based on the size prop
  
    return (
      <div
        className={`relative inline-flex items-center justify-center ${sizeClass} overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600`}
        style={{ width: `${size}px`, height: `${size}px` }} // Use inline style as a fallback for dynamic sizes
      >
        <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
      </div>
    );
  }
  

export default BlogCard