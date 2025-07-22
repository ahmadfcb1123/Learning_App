import { useEffect, useState } from "react";
import Card from "./Card";
import "./game.css";
import Pusher from "pusher-js";
import { AppBar, Box, IconButton, List, Toolbar } from "@mui/material";
import axios from "../api/axios";
import { useLocation, useNavigate } from "react-router-dom";
import CardTest from "./CardTest";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SchoolIcon from '@mui/icons-material/School';
import CustomAppBar from '../components/Header/AppBar';

function Game() {

  const studName = localStorage.getItem('studentName');
  const navigate = useNavigate();
  var round = 0;
  
  const [count,setCount] = useState(0);
  const Location = useLocation();
  const [username, setUsername] = useState(studName);
  const [messages, setMessages] = useState([]);
  const [id, setId] = useState();
  const [message, setMessage] = useState("");
  let allMessages = [];

  const [scoreA , setScoreA] = useState(0);
  const [scoreB , setScoreB] = useState(0);
  const [number , setNumber] = useState(0);


  console.log(Location.state);
  console.log(Location.state.HostName)

  const channelName = Location.state.channelName;
  const users = Location.state.users;
  const name  = Location.state.HostName;

  const [items, setItems] = useState([
{ id: 1, img: "/img/1.jpg", stat: "" },
{ id: 1, img: "/img/one.jpg", stat: "" },
{ id: 2, img: "/img/tow.jpg", stat: "" },
{ id: 2, img: "/img/2.jpg", stat: "" },
{ id: 3, img: "/img/3.jpg", stat: "" },
{ id: 3, img: "/img/three.jpg", stat: "" },
{ id: 4, img: "/img/4.jpg", stat: "" },
{ id: 4, img: "/img/four.jpg", stat: "" },
{ id: 5, img: "/img/5.jpg", stat: "" },
{ id: 5, img: "/img/five.jpg", stat: "" },
{ id: 6, img: "/img/6.jpg", stat: "" },
{ id: 6, img: "/img/six.jpg", stat: "" },
{ id: 7, img: "/img/7.jpg", stat: "" },
{ id: 7, img: "/img/seven.jpg", stat: "" },
{ id: 8, img: "/img/8.jpg", stat: "" },
{ id: 8, img: "/img/eight.jpg", stat: "" },
  ]);
  //.sort(() => Math.random() - 0.5))

  const [prev, setPrev] = useState(-1);

  function check(current) {
    if (items[current].id == items[prev].id) {
      if (name === users[0])
      {
        setScoreA(scoreA+10);
      }
      else 
      {
        setScoreB(scoreB+10);
      }
      //  setIDes([...IDes,items[current].id]);
      //  IDes.push(items[current].id);
      //  IDes=items[current].id;
      setId(items[current].id);
      items[current].stat = "correct";
      items[prev].stat = "correct";
      setItems([...items]);
      setPrev(-1);
    } else {
      items[current].stat = "wrong";
      items[prev].stat = "wrong";
      setItems([...items]);
      setTimeout(() => {
        items[current].stat = "";
        items[prev].stat = "";
        setItems([...items]);
        setPrev(-1);
      }, 1000);
    }
  }


  const submit = async (e) => {
    e.preventDefault();

    // await fetch('http://localhost:8000/api/messages', {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({
    //         username,
    //         message
    //     })
    // });
    console.log(scoreA);
    console.log(scoreB);

    const response = await axios.post(
      "/api/messages",
      JSON.stringify({ username, message ,id, channelName,scoreA,scoreB}),
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

  

  function handleClick(id) {
    console.log("count is" , count )
    if (prev === -1) {
      if (count!=0)
      {
        console.log("Err")
      }
      else
      {
        items[id].stat = "active";
        setItems([...items]);
        setPrev(id);
      }

    } else {
      if (count!=0)
      {
        console.log("Err")
      }
      else
      {
        setCount(count+1);
        //setRound(round+1)
        //count++;
        check(id);
      }
    }
  }
  const [winner,setWinner] = useState('');
  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher("76207420121dd00657a9", {
      cluster: "us2",
    });
    console.log(users.includes(name))
    if (users.includes(name)) {
      const channel = pusher.subscribe(channelName);
      channel.bind("message", function (data) {      
        
        setScoreA(parseInt(data.scoreA)  + parseInt(scoreA) );
        setScoreB(parseInt(data.scoreB)  + parseInt(scoreB) );
        console.log(number);
        console.log(items.length - 1);
        console.log(scoreA);
        console.log(scoreB);
        if (parseInt(data.scoreA) + parseInt(data.scoreB) == 80) {
          if (parseInt(data.scoreA)>parseInt(data.scoreB)) {
            console.log(users[0] + "is winner")
            setWinner (users[0]);
          }
          else if (parseInt(data.scoreB)>parseInt(data.scoreA))
          {
            console.log(users[1] + "is winner")
            setWinner (users[0]);
          }
          else 
          {
            console.log("same")
            setWinner ("Draw");

          }
        }
        if (name === users[0])
      {
      
        if (round%2 == 0 )
        {          
          // setRound(round+1)
        round++;
        // count++;
        }
        else 
        {
        round++;
          // setRound(round+1)
          setCount(0);
          // count--;
        }
      }
      else 
      {
        if (round%2 != 0 )
        {          
          // setRound(round+1)
        round++;
        // count++;
        }
        else 
        {
        round++;
          // setRound(round+1)
          setCount(0);
          // count--;
        }
      }

        console.log(count)
        console.log(round)
        allMessages.push(data);
        setMessages(allMessages);
        // console.log(IDes2[0]);
        // console.log(items[0].id);
        // console.log(items[0].id == IDes2[0]);
        console.log(data);
  
        // items[0].stat="active";
        for (let index = 0; index < items.length; index++) {
          if (items[index].id == data.id) {
            items[index].stat = "active";
            setNumber(number+1);
            console.log(true);
          }
        }
        setItems([...items]);
      });
    }
    
  }, []);

  const gotoChapter = ()=>
  {
    navigate("/home");
  }

  return (
  <>
    <CustomAppBar studentName={studName} position="fixed"/>
    <div style={{display: "flex",justifyContent: "space-evenly",flexWrap:"wrap" , marginTop:"10px"}}>
      <div>
        <div className="container">
          <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
            <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
              <input
                className="fs-5 fw-semibold"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="list-group list-group-flush border-bottom scrollarea">
              {messages.map((message) => {
                return (
                  <div className="list-group-item list-group-item-action py-3 lh-tight">
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <strong className="mb-1">{message.username}</strong>
                    </div>
                    <div className="col-10 mb-1 small">{message.message}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <form onSubmit={(e) => submit(e)}>
            <input
              className="form-control"
              placeholder="Write a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </form>
        </div>
      </div>
      <div>
      <h1 style={{color:"red"}}>Memory Game</h1>
      <h1> {users[0]} : {scoreA}</h1>
      <h1> {users[1]} : {scoreB}</h1>
      {
        winner==='' ?
        (
          <div>
            <h1>Winner is  ?</h1>
          </div>
        )
      :
      (
        <div>
          <h1>Winner is {winner}</h1>
        </div>
      )
      }
      </div>
      <div className="gameContainer">
        {items.map((item, index) => (
          <CardTest key={index} item={item} id={index} handleClick={handleClick} />
        ))}
      </div>
    </div>
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }} style={{display:"flex",flexDirection:"row",justifyContent: "space-around",background: "#8bdb8b"}}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton style={{margin:"0px 100px 0 0"}} color="inherit">
            <SportsEsportsIcon />
          </IconButton>
          <IconButton onClick={gotoChapter} color="inherit">
            <SchoolIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
  </>
  );
}

export default Game;
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