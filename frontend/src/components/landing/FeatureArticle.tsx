import { ArrowRight, Calendar, Clock, User2 } from "lucide-react";
import { Button } from "../ui/button";

const FeatureArticle = () => {
    return(
        <div className="max-w-6xl mx-auto mt-10 mb-8">
            <div className="flex items-center h-24 bg-[#3B3B4F] text-[#D0D0D5]">
                <h1 className="font-bold text-2xl mx-8">#Featured Article</h1>
            </div>
            <div className="bg-white grid grid-cols-2 py-20">
                <div className="pl-14">
                    <h1 className="font-bold text-5xl">The Future of Web Development in 2025</h1>
                    <div className="flex my-6 gap-4 text-lg">
                        <div className="flex items-center gap-1">
                            <User2/>
                            <p>Sarah Johnson</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar/>
                            <p>June 20, 2025</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock/>
                            <p>8 min read</p>
                        </div>
                    </div>
                    <p className="text-xl text-gray-800">
                        Explore the cutting-edge technologies and frameworks that are shaping the future of web development. From AI-powered tools to revolutionary new frameworks, discover what's coming next in the world of web development.
                    </p>
                    <div className="mt-4">
                        <Button variant="link" className="bg-[#D0D0D5] text-[#3B3B4F]">
                            Read Full Article
                            <ArrowRight/>
                        </Button>
                    </div>
                </div>

                {/* for image */}
                <div className="flex items-center justify-center">
                    <div className="w-3/4 rounded-[15px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.3)]">
                        <img 
                            className=" object-cover h-[300px] transition-transform duration-300 ease-in-out hover:scale-105"
                            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                            alt="Web development" 
                        />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default FeatureArticle;