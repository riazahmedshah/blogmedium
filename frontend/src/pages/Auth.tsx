// import Quote from "../components/Quote"
import { LoginForm } from "../components/auth/login-form"
import { RegisterForm } from "../components/auth/register-form"
// import Signin from "../components/Signin"
// import Signup from "../components/Signup"


const Auth = ({type}: {type:"Signup" |  "Signin"}) => {
  return (
    <section className="w-full">
      <div className="h-screen flex items-center justify-center  bg-[#3B3B4F]">
        {type === "Signup" ? <RegisterForm/> : <LoginForm/>}
      </div>
    </section>
  )
}

export default Auth