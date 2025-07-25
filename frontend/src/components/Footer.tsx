// const Footer = () => {
//     return(
//        <div>
//             <footer className="py-5 bg-slate-900 text-white">
//                 <div className="max-w-6xl mx-auto text-center">
//                 <p className="mb-2">&copy; 2025 WordNest. All rights reserved.</p>
//                 <div className="space-x-6">
//                     <a href="/about" className="hover:text-gray-300">About</a>
//                     <a href="/privacy" className="hover:text-gray-300">Privacy Policy</a>
//                     <a href="/contact" className="hover:text-gray-300">Contact Us</a>
//                 </div>
//                 </div>
//             </footer>
//         </div>
//     )
// }

import { Link } from "react-router-dom";

// export default Footer;

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold mb-4 flex items-center">
                            <span className="bg-blue-600 p-1 rounded mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 11a9 9 0 0 1 9 9"></path>
                                    <path d="M4 4a16 16 0 0 1 16 16"></path>
                                    <circle cx="5" cy="19" r="1"></circle>
                                </svg>
                            </span>
                            WordNest
                        </h3>
                        <p className="text-gray-300">
                            A platform for developers to share knowledge, showcase projects, and grow together.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <a 
                                    href="https://riazdev.vercel.app/"
                                    target="_blank" 
                                    className="text-gray-300 hover:text-white transition-colors">
                                        About
                                </a>
                            </li>
                            <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
                            <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/#" className="text-gray-300 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link>
                            </li>
                            <li>
                                <Link to="/#" className="text-gray-300 hover:text-white transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400">
                        &copy; {new Date().getFullYear()} WordNest. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="#" className="text-gray-400 hover:text-white">
                            <span className="sr-only">Twitter</span>

                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                            </svg>
                        </Link>
                        <a href="https://github.com/riazahmedshah" target="_blank" className="text-gray-400 hover:text-white">
                            <span className="sr-only">GitHub</span>

                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;