import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import CustomAppBar from '../components/Header/AppBar';
import SchoolIcon from '@mui/icons-material/School';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';


const StartChat = () => {

  const studName = localStorage.getItem('studentName');

  const [channel,setChannel] = useState([]);

  const navigate= useNavigate();

const Location = useLocation();

const id = Location.state.competition_id;
console.log(Location.state.competition_id);
console.log(Location.state.HostName);

const HostName = Location.state.HostName;

  const [content,setContent] = useState([]);

  const fetchTrending = async () => {
    const{data}  = await axios.get(`api/getCompetetion/${id}`);
    console.log(data);
    setContent(data.data);
    console.log(content._id);
  };

  
  useEffect(() => {
    fetchTrending();
  },[]);


  const gotoGame = () =>
{
  navigate("/FinalChat" , {state:{users:content.Name,HostName:HostName,channelName:channel}}); 
}

const gotoChapter = ()=>
{
  navigate("/home");
}


  return (
    <div>
    <CustomAppBar studentName={studName} position="fixed"/>
      <span className="pageTitle">Students </span>
      <div>
        {typeof content.Name != undefined ? (
        <div style={{backgroundColor:"white"}}>
          <h1> { content.Name}  </h1>
          {/* ...............
          Name2:{content.Name[1]} */}
        </div>
        ) : (
          <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}/>
        )}

        <button onClick={gotoGame}> go to Chat</button>

        <form >
                    <label htmlFor="name">
                    Enter Channel Name:
                    </label>
                      <input 
                        type="text" 
                        id="name"
                        autoComplete="off"
                        onChange={(e) => setChannel(e.target.value)}
                        value={channel}
                        required
                        aria-describedby="uidnote"
                    />
                    </form>
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
        </div>
    </div>
  );
}

export default StartChat;
