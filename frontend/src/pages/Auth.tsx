import Quote from "../components/Quote"
import Signin from "../components/Signin"
import Signup from "../components/Signup"


const Auth = ({type}: {type:"Signup" |  "Signin"}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          {
            type === "Signup" ? <Signup type="Signup"/> : <Signin type="Signin"/>
          }
            
        </div>
        <div className="hidden sm:block"> 
            <Quote/>
        </div>
    </div>
  )
}

export default Auth