import {useState} from "react";
import UserCard from "./UserCard";
import {BASE_URL} from "../utils/constants";
import axios from "axios";
import {useDispatch} from "react-redux";
import { addUser } from "../utils/userSlice"; 

const EditProfile = ({user}) => {
  
  const [firstName,setFirstName]=useState(user.firstName);
  const [lastName,setLastName]=useState(user.lastName);
  const [photoUrl,setPhotoUrl]=useState(user.photoUrl);
  const [age,setAge]=useState(user.age);
  const [gender,setGender]=useState(user.gender);
  const [about,setAbout]=useState(user.about);
  const [error,setError]=useState("");
  const dispatch=useDispatch();
  const [showToast,setShowToast]=useState(false);

  const saveProfile=async()=>{
    //clear Error
    setError("");
    try{
      const res=await axios.patch(BASE_URL +"/profile/edit",{firstName,lastName,photoUrl,age,gender,about},{withCredentials:true});
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(()=>{
        setShowToast(false);

      },3000);

    }
    catch(err){
      setError(err.response.data);
    }
  };
  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300  w-96 shadow-xl">
            <div className="card-body">
              <h3 className="card-title justify-center">Edit Profile</h3>
              <div>
                <fieldset className="fieldset py-3 ">
                  <legend className="label-text">First Name </legend>
                  <input type="text" value={firstName} className="input" onChange={(e)=>setFirstName(e.target.value)}/>
                </fieldset>

                <fieldset className="fieldset py-3 ">
                  <legend className="label-text">Last Name </legend>
                  <input type="text" value={lastName} className="input" onChange={(e)=>setLastName(e.target.value)}/>
                </fieldset>

                <fieldset className="fieldset py-3 ">
                  <legend className="label-text">Photo Url </legend>
                  <input type="text" value={photoUrl} className="input" onChange={(e)=>setPhotoUrl(e.target.value)}/>
                </fieldset>

                <fieldset className="fieldset py-3 ">
                  <legend className="label-text">Age </legend>
                  <input type="text" value={age} className="input" onChange={(e)=>setAge(e.target.value)}/>
                </fieldset>

                <fieldset className="fieldset py-3">
  <legend className="label-text">Gender</legend>
  
  <select
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    className="input w-full"
    style={{ width: '320px' }} // Adjust width as needed
  >
    <option value="" disabled>Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
</fieldset>





                <fieldset className="fieldset py-3">
                  <legend className="label-text">About </legend>
                  <input type="text" value={about} className="input" onChange={(e)=>setAbout(e.target.value)}/>
                </fieldset>

              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile} >Save Profile</button>
              </div>
            </div>
          </div>
        </div>
        <UserCard user={{firstName,lastName,photoUrl,age,gender,about}}/>
        
      </div>
      
      {showToast && (<div className="toast toast-top toast-center">
        <div className="alert alert-success">
          
            <span>Profile Updated Succesfully.</span>
         
        </div>
      </div>
    )}
    </>
  );
  
};

export default EditProfile;