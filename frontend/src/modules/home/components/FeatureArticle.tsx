import { ArrowRight, Calendar, Clock, User2 } from "lucide-react";
import { Button } from "@ui/button";
import { Link } from "react-router-dom";

export const FeatureArticle = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
            <div className="bg-gradient-to-r from-blue-800 to-indigo-800 text-white rounded-t-xl p-6 shadow-lg">
                <h1 className="font-bold text-2xl md:text-3xl flex items-center">
                    <span className="bg-white text-blue-800 rounded-full p-2 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                    </span>
                    Featured Article
                </h1>
            </div>
            
            <div className="bg-white rounded-b-xl shadow-xl overflow-hidden grid md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
                        The Future of Web Development in 2025
                    </h1>
                    
                    <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
                        <div className="flex items-center gap-2">
                            <User2 className="text-blue-600" size={18}/>
                            <span>Sarah Johnson</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="text-blue-600" size={18}/>
                            <span>June 20, 2025</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="text-blue-600" size={18}/>
                            <span>8 min read</span>
                        </div>
                    </div>
                    
                    <p className="text-lg text-gray-700 mb-8">
                        Explore the cutting-edge technologies and frameworks that are shaping the future of web development. From AI-powered tools to revolutionary new frameworks, discover what's coming next in the world of web development.
                    </p>
                    
                    <div>
                        <Link to="/tag/blogs">
                        <Button className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300">
                            <span className="mr-2">Read Full Article</span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18}/>
                        </Button>
                        </Link>
                    </div>
                </div>

                <div className="relative h-64 md:h-auto">
                    <img 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                        alt="Web development" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
            </div>
        </section>
    )
}