import {useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import { addUser } from "../utils/userSlice";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../utils/constants";

const Login = () => {
  const [emailId,setEmailId]=useState("");
  const [password,setPassword]=useState("");
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [isLoginForm,setIsLoginForm]=useState(true);
  const [error,setError]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLogin= async()=>{
    try{
      const res=await axios.post(BASE_URL+ "/login",{
        emailId,
        password,
      },
    {withCredentials: true }
  );
  
  dispatch(addUser(res.data));
  return navigate("/");
    }
    catch(err){
      setError(err?.response?.data || "Something went wrong");
      
    }
  }

  const handleSignUp=async()=>{
    try{
      const res=await axios.post(BASE_URL+ "/signup",{
        firstName,
        lastName,
        emailId,
        password,

      },
    {withCredentials: true }
  );
  
  dispatch(addUser(res.data.data));
  return navigate("/profile");
    }
    catch(err){
      setError(err?.response?.data || "Something went wrong");
      
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300  w-96 shadow-xl">
        <div className="card-body">
          <h3 className="card-title justify-center">{isLoginForm?"Login":"SignUp"}</h3>
          <div>
            {!isLoginForm && <><fieldset className="fieldset py-3 ">
              <legend className="label-text">First Name </legend>
              <input type="text" value={firstName} className="input" onChange={(e)=>setFirstName(e.target.value)}/>
            </fieldset>

            <fieldset className="fieldset py-3 ">
              <legend className="label-text">Last Name</legend>
              <input type="text" value={lastName} className="input" onChange={(e)=>setLastName(e.target.value)}/>
            </fieldset>
            </>}
            
            <fieldset className="fieldset py-3 ">
              <legend className="label-text">Email ID </legend>
              <input type="text" value={emailId} className="input" onChange={(e)=>setEmailId(e.target.value)}/>
            </fieldset>

            <fieldset className="fieldset py-3 ">
              <legend className="label-text">Password</legend>
              <input type="password" value={password} className="input" onChange={(e)=>setPassword(e.target.value)}/>
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={isLoginForm?handleLogin:handleSignUp}>{isLoginForm?"login":"SignUp"}</button>
          </div>

          <p className="m-auto cursor-pointer py-2 text-gray-400 hover:text-white transition-colors duration-300" onClick={()=>setIsLoginForm((value)=>!value)}>
            {
              isLoginForm?"New User? Sign Up here":"Existing User? Login Here"
            }
          </p>

        </div>
      </div>
    </div>
    )
}

export default Login;


