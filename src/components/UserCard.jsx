import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {
  const {_id,firstName,lastName,age,gender,about,photoUrl}=user;
  const dispatch=useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      if (err.response?.data?.message === "Connection Request already exists") {
        dispatch(removeUserFromFeed(userId));
      } else {
        console.error("Request failed:", err.response?.data || err.message);
      }
    }
  };
  
  return (
    <div className="card bg-base-300 w-96 shadow-sm  ">
  <figure>
    <img
      src={user.photoUrl}
      alt="Photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " +lastName}</h2>
    {age && gender && <p>{age +" , "+gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-error" onClick={()=>handleSendRequest("ignored",_id)}>❌Ignore</button>
      <button className="btn btn-accent" onClick={()=>handleSendRequest("interested",_id)}>✔️Interested</button>
    </div>
  </div>
</div>
  );
};

export default UserCard;