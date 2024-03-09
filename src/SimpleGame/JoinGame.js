import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import CustomAppBar from '../components/Header/AppBar';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';


const JoinGame = () => {

  const studName = localStorage.getItem('studentName');


  const navigate = useNavigate()

  const [competition_id , setCompetition_id] = useState();
  const [name , setName] = useState(studName);
  const [number , setNumber] = useState();    
  const handleSubmit = async (event) => {
    event.preventDefault();
      const response = await axios.post(`api/addCompetitionMembers/${number}/${name}`);
      console.log(JSON.stringify(response));
      
      const { _id } = response.data.data;
      console.log(_id);
      // const competition_id = user._id;
      // localStorage.setItem('competition_id', competition_id);     
      
      navigate("/Competition",{state:{competition_id:_id,HostName:name}});  
  }  

  const gotoChapter = ()=>
{
  navigate("/home");
}
  return (
    <div>
      <CustomAppBar studentName={studName} position="fixed"/>
      <form id='form' className='flex flex-col' onSubmit={handleSubmit}>
                    <label htmlFor="name">
                        your name:
                    </label>
                      <input 
                        type="text" 
                        id="name"
                        autoComplete="off"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label htmlFor="email">
                          Host Number
                    </label>
                    <input
                          type="text"
                          id="email"
                          autoComplete="off"
                          onChange={(e) => setNumber(e.target.value)}
                          value={number}
                          required
                          aria-describedby="uidnote"
                    />
                    <button>Join Now</button>
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
  );
}

export default JoinGame;
