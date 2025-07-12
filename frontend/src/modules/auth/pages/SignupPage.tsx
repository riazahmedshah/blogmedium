import { RegisterForm } from "../components/register-form"


const SignupPage = ({type}: {type:"Signup" |  "Signin"}) => {
  return (
    <section className="w-full">
      <div className="h-screen flex items-center justify-center  bg-[#3B3B4F]">
        {type === "Signup" && <RegisterForm/>}
      </div>
    </section>
  )
}

export default SignupPage