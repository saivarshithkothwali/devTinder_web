import {useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import { addUser } from "../utils/userSlice";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../utils/constants";

const Login = () => {
  const [emailId,setEmailId]=useState("tony@gmail.com");
  const [password,setPassword]=useState("Tony@123");
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
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300  w-96 shadow-xl">
        <div className="card-body">
          <h3 className="card-title justify-center">Login</h3>
          <div>
            <fieldset className="fieldset py-3 ">
              <legend className="label-text">Email ID </legend>
              <input type="text" value={emailId} className="input" onChange={(e)=>setEmailId(e.target.value)}/>
            </fieldset>

            <fieldset className="fieldset py-3 ">
              <legend className="label-text">Password</legend>
              <input type="text" value={password} className="input" onChange={(e)=>setPassword(e.target.value)}/>
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Login


