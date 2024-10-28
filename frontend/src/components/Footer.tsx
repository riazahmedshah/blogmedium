

const Footer = () => {
    return(
       <div>
            <footer className="py-5 bg-slate-900 text-white">
                <div className="max-w-6xl mx-auto text-center">
                <p className="mb-2">&copy; 2024 WordNest. All rights reserved.</p>
                <div className="space-x-6">
                    <a href="/about" className="hover:text-gray-300">About</a>
                    <a href="/privacy" className="hover:text-gray-300">Privacy Policy</a>
                    <a href="/contact" className="hover:text-gray-300">Contact Us</a>
                </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;