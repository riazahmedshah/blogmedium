import { Avatar } from "./BlogCard"




const Appbar = () => {

  

  
  return (
    <div className="py-3 px-5 border-b">
        <div className="flex justify-between items-center">
        <div className="font-bold italic text-xl">medBlogs</div>
        <div>
            <Avatar size={40} name="Guest"/>
        </div>
        </div>
    </div>
  )
}

export default Appbar