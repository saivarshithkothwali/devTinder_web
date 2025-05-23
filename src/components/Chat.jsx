import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const {targetUserId}=useParams();
  const [messages,setMessages]=useState([]);
  const [newMessage,setNewMessage]=useState("");
  const user=useSelector((store)=>store.user);
  const userId=user?._id;

  const fetchChatMessages=async()=>{
    const chat=await axios.get(BASE_URL+ "/chat/" +targetUserId,{
      withCredentials:true,
    });
    console.log(chat.data.messages);

    const chatMessages=chat?.data?.messages.map(msg=>{
      const {senderId,text}=msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(()=>{
    fetchChatMessages();
  },[]);

  useEffect(()=>{
    if(!userId){
      return;
    }
    const socket=createSocketConnection();
    socket.emit("joinChat",{firstName:user.firstName,lastName:user.lastName,userId,targetUserId});

    socket.on("messageReceived",({firstName,lastName,text})=>{
      console.log(firstName + "  :  " +text);
      setMessages((messages)=>[...messages,{firstName,lastName,text}]);
    });

    return()=>{
      socket.disconnect();
    };
  },[userId,targetUserId]);
  
  const sendMessage=()=>{
    const socket=createSocketConnection();
    socket.emit("sendMessage",{firstName:user.firstName,userId,targetUserId,text:newMessage});
    setNewMessage("");
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-base-200 border border-gray-700 m-5 h-[80vh] flex flex-col shadow-lg rounded-xl">


      <h1 className="p-5 border-b border-gray-700">chat</h1>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {messages.map((msg,index)=>{
          return(
            <div key={index} className={"chat " +(user.firstName===msg.firstName? "chat-end" :"chat-start")}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://static.vecteezy.com/system/resources/previews/045/944/199/non_2x/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration-vector.jpg"
                  />
                </div>
              </div>
              <div className="chat-header">
                {`${msg.firstName}  ${msg.lastName}`}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          );
        })}
      </div>
      <div className="p-4 border-t border-gray-700 flex items-center gap-2 bg-base-300">

        <input 
          value={newMessage}
          onChange={(e)=>setNewMessage(e.target.value)}
         className="flex-1 border border-gray-600 text-white rounded-box p-2 ">
        </input>
        <button onClick={sendMessage} className="btn btn-active rounded-box hover:bg-base-200 hover:text-white hover:scale-105 ">Send</button>
      </div>
    </div>
  );
    

};

export default Chat;
