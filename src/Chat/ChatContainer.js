import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { AppBar, Box, IconButton, List, Toolbar } from "@mui/material";
import axios from "../api/axios";
import { useLocation, useNavigate } from "react-router-dom";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SchoolIcon from '@mui/icons-material/School';
import CustomAppBar from '../components/Header/AppBar';
import './ch.css'
import Brightness1Icon from '@mui/icons-material/Brightness1';

function ChatContainer() {

  const studName = localStorage.getItem('studentName');
  const navigate = useNavigate();
  
  const Location = useLocation();
  const [username, setUsername] = useState(studName);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  let allMessages = [];

  const [scoreA , setScoreA] = useState(0);
  const [scoreB , setScoreB] = useState(0);




   const channelName = Location.state.channelName;
   const users = Location.state.users;
   const name  = Location.state.HostName;


  const [prev, setPrev] = useState(-1);



  const submit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "/api/messages",
      JSON.stringify({ username, message ,id:"1", channelName ,scoreA,scoreB}),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      }
    );
    console.log(response?.data);
    console.log(response?.accessToken);
    console.log(JSON.stringify(response));

    setMessage("");
  };

  

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher("76207420121dd00657a9", {
      cluster: "us2",
    });
    
    if (users.includes(name)) {
      const channel = pusher.subscribe(channelName);
      channel.bind("message", function (data) {      
        
      
        allMessages.push(data);
        setMessages(allMessages);
      });
    }
    }, []);

  const gotoChapter = ()=>
  {
    navigate("/home");
  }
//   function ChatsList(){
//     return( <div style={{ height:'75vh' , overflow:'scroll' , overflowX:'hidden' }}>
//           {
//              chats.map((chat, index) => {
//               if(chat.user === user) return <ChatBoxSender  key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />
//               return <ChatBoxReciever key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />
//           })
//           }
//            <div ref={messagesEndRef} />
//     </div>)
   
// }

  return (
  <>
    <CustomAppBar studentName={studName} position="fixed"/>
    <div style={{display: "flex",justifyContent: "space-evenly",flexWrap:"wrap" , marginTop:"10px"}}>
      <div style={{width:"100%"}}>
        <div className="container">
          <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" style={{ height:'75vh'  }}>
            <div style={{background: "rgb(236, 229, 221)"}} className="d-flex online align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
              <input style={{background: "rgb(236, 229, 221)", width:"fit-content",
    border: "none"}}
                className="fs-5 fw-semibold"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div>
              <Brightness1Icon style={{color: "green",width: "17px"}} />
              </div>
            </div>
            
            <div className="list-group list-group-flush border-bottom scrollarea" style={{height:"70vh",overflow:"scroll",background: "rgb(236, 229, 221)",overflowX:"hidden" }}>
              {messages.map((message) => {
                return (
                  <div className="list-group-item list-group-item-action py-3 lh-tight" style={{border:"1px solid yellowgreen",
                    borderRadius: "49px",
                    width: "50%",margin:"10px",background: "rgb(236, 229, 221)"}}>
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">{message.username}</strong>
                    </div>
                    <div className="col-10 mb-1 small">{message.message}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <form onSubmit={(e) => submit(e)} style={{marginTop:"4%"}}>
            <input style={{ width: "70%",margin:"0px auto",border:"1px solid greenyellow",
    borderRadius: "24px"}}
              className="form-control"
              placeholder="Write a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </form>
        </div>
      </div>
      
    </div>
    
        
  </>
  );
}

export default ChatContainer;
// { id: 1, img: "/img/1.jpg", stat: "" },
// { id: 2, img: "/img/tow.jpg", stat: "" },
// { id: 3, img: "/img/3.jpg", stat: "" },
// { id: 2, img: "/img/2.jpg", stat: "" },
// { id: 4, img: "/img/4.jpg", stat: "" },
// { id: 4, img: "/img/four.jpg", stat: "" },
// { id: 5, img: "/img/5.jpg", stat: "" },
// { id: 5, img: "/img/five.jpg", stat: "" },
// { id: 3, img: "/img/three.jpg", stat: "" },
// { id: 6, img: "/img/6.jpg", stat: "" },
// { id: 6, img: "/img/six.jpg", stat: "" },
// { id: 1, img: "/img/one.jpg", stat: "" },
// { id: 7, img: "/img/7.jpg", stat: "" },
// { id: 7, img: "/img/seven.jpg", stat: "" },
// { id: 8, img: "/img/8.jpg", stat: "" },
// { id: 8, img: "/img/eight.jpg", stat: "" },