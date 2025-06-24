
import { formatter } from "@/types"
import { Avatar } from "./BlogCard"
import { Blog } from "./hooks/useBlogs"



export const FullBlog = ({blog} : {blog : Blog}) => {
    
    
    return(
        <div>
            <div className="flex justify-center">
                <div className="grid md:grid-cols-12 px-10 w-full space-y-10  max-w-screen-xl py-12">
                    <div className="col-span-8">
                        <div className="md:text-5xl md:max-w-2xl text-3xl  font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 pt-2">
                            {formatter.format(blog.createdAt)}
                        </div>
                        <div className="pt-4 md:max-w-sm max-w-sm md:text-lg text-sm">
                            {blog.content}
                        </div>
                    </div>
                    <div className="col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size={20} name={blog.author?.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author?.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        </div>
    )
}