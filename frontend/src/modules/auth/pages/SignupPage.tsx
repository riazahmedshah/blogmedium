import { RegisterForm } from "../components/register-form";
import { motion } from "framer-motion";
import { Bird } from "lucide-react";
import { Link } from "react-router-dom";

const SignupPage = ({ type }: { type: "Signup" | "Signin" }) => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900">
      <div className="container relative h-screen flex items-center justify-center px-4">
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:60px_60px]"></div>
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute top-10 left-10 text-blue-300"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/">
            <Bird size={48} className="hover:rotate-12 transition-transform" />
          </Link>
        </motion.div>
        
        {/* Main content */}
        <motion.div
          className="w-full max-w-md z-10"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {type === "Signup" && <RegisterForm />}
        </motion.div>

        {/* Footer note */}
        <motion.div 
          className="absolute bottom-6 text-center text-blue-100 text-sm w-full px-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p>By registering, you agree to our Terms of Service and Privacy Policy</p>
        </motion.div>
      </div>
    </section>
  );
};

export default SignupPage;