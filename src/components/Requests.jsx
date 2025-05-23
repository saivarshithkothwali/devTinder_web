import axios from "axios";
import {BASE_URL} from "../utils/constants";
import {useDispatch,useSelector} from "react-redux";
import {addRequests,removeRequest} from "../utils/requestSlice";
import {useEffect} from "react";

  const Requests=()=>{
    const dispatch=useDispatch();
    const requests = useSelector((store) => store.requests);

  const reviewRequest=async(status,_id)=>{
    try{
      const res=await axios.post(BASE_URL+ "/request/review/" +status+ "/" +_id, {}, {withCredentials:true},

      );
      dispatch(removeRequest(_id));

    }catch(err){
      console.error("Failed to fetch requests", err);
    }
  }
    
  
  const fetchRequests=async()=>{
    try{
      const res=await axios.get(BASE_URL+ "/user/requests/received",{
        withCredentials:true,
      });
      dispatch(addRequests(res.data.data));

    }catch(err){
      console.error("Failed to fetch requests", err);
    }
  };

  useEffect(()=>{
    fetchRequests();
  },[]);
  
  if(!requests)  return;

  if(requests.length==0) return <h2 className="flex text-2xl font-semibold text-gray-300 justify-center my-10" >No Requests found</h2>
  
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl mb-6">Requests</h1>

      {requests.map((request)=>{
        const {_id,firstName,lastName,photoUrl,age,gender,about}=request.fromUserId;
        
        return(
          <div key={_id} className="flex justify-between items-center m-2 p-2 rounded-lg bg-base-300 w-[90%] max-w-3xl mx-auto">

          <div><img alt="photo" className="w-12 h-12 rounded-full" src={photoUrl} />
          </div>
          
          <div className="text-left mx-4">
            <h2 className="font-semibold text-base">{firstName + " " +lastName}</h2>
            {age && gender && <p>{age+", " +gender}</p>}
            <p>{about}</p>
          </div>

          <div>
            <button className="btn btn-primary btn-sm mx-1" onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
            <button className="btn btn-secondary btn-sm mx-1" onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
          </div>

        </div>
        );
      })}
    </div>
  );
};
export default Requests;