import axios from "axios";
import {BASE_URL} from "../utils/constants";
import { useEffect } from "react";
import {useDispatch,useSelector} from "react-redux";
import {addConnections} from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections=useSelector((store)=>store.connections);
  const dispatch=useDispatch();
  const fetchConnections=async()=>{
    try{

      const res=await axios.get(BASE_URL+ "/user/connections",{
        withCredentials:true,
      });
      
      dispatch(addConnections(res.data.data));
    }
    catch(err){
      console.error("Failed to fetch connections", err);
    }
  }
  
  useEffect(()=>{
    fetchConnections();
  },[]);

  if(!connections)  return null;

  if(connections.length==0) return <h2 className="flex text-2xl font-semibold text-gray-300 justify-center my-10">No connections found</h2>
  
  
  
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl mb-6">Connections</h1>

      {connections.map((connection,index)=>{
        const {_id,firstName,lastName,photoUrl,age,gender,about}=connection;
        
        return (
          <div key={_id} className="flex justify-between items-center gap-4 mb-4 p-4 rounded-md bg-base-300 w-[95%] max-w-2xl mx-auto">
            
            <div className="flex items-start gap-4">
              <img alt="photo" className="w-12 h-12 rounded-full object-cover" src={photoUrl} />
              <div className="text-left">
                <h2 className="font-semibold text-base text-white">{firstName + " " + lastName}</h2>
                {age && gender && <p className="text-sm text-gray-300">{age + ", " + gender}</p>}
                <p className="text-sm text-gray-400">{about}</p>
              </div>
            </div>

            <Link to={"/chat/"+_id}>
              <button className="btn btn-soft shadow-md rounded-box transition duration-200 hover:bg-primary hover:text-white hover:scale-105 hover:glass ">
                Chat</button>
            </Link>

          </div>
        );
        
        
      })}
    </div>
  );
};

export default Connections;