import { LoginForm } from "../components/login-form"

const LoginPage = ({type}: {type:"Signup" |  "Signin"}) => {
  return (
    <section className="w-full">
      <div className="h-screen flex items-center justify-center  bg-[#3B3B4F]">
        {type === "Signin" && <LoginForm/>}
      </div>
    </section>
  )
}

export default LoginPage