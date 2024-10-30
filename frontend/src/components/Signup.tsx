import { SignupInput } from "../types/index"
import axios from "axios";
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";
import InputFields from "./InputFields";
import UserContext from "./UserContext";
// import UserContext from "./UserContext";



const Signup = ({type} : {type:"Signup"}) => {
    const navigate = useNavigate();

    // const { setLoggedInUser } = useContext(UserContext)

    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password:""
    });

    const handleCreateUser = async() => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,postInputs)
        const jwt = response.data.token;
        const user = response.data.user;

         setLoggedInUser(user);
         navigate("/blogs");
        localStorage.setItem("token", jwt)

        
    };
    const { setLoggedInUser } = useContext(UserContext);

    // useEffect(() => {
    //     if (loggedInUser) {
    //          // Redirect to login if not logged in
    //     }
    // }, [loggedInUser, navigate]);

    
  return (
    <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div>
                <div className="px-10">
                    <h1 className="font-extrabold text-3xl tracking-tight">Create an account</h1>
                    <p className="px-5 text-slate-400">Already have an account? <Link className="underline" to="/signin">Login</Link></p>
                </div>
            <div className="mt-6">
                <InputFields label="Name" placeholder="Enter your name" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        name: e.target.value
                    })
                }}/>
                <InputFields label="Email" placeholder="example@gmail.com" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        email: e.target.value
                    })
                }}/>
                <InputFields label="Password" type="password" placeholder="123456" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }}/>
                <button onClick={handleCreateUser} type="button" className="mt-4 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type}</button>
            </div>
            </div>
            </div>
        </div>

    </div>
  )
}





export default Signup