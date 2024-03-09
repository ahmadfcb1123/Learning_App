import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import CustomAppBar from '../components/Header/AppBar';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';


const CreateRoom = () => {


  
  const studName = localStorage.getItem('studentName');


  const [hostNumber , setHostNumber] = useState();
  const [Name,setUser]=useState(studName);
  const navigate = useNavigate();

  const handleSubmit =async (event)=>
  {
    event.preventDefault();
    const response = await axios.post('/api/addCompetetion',
            JSON.stringify({Name,hostNumber}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false
            }
        );

        const { _id } = response.data.data;
        console.log(_id);;
        navigate("/StartChat",{state:{HostName:Name,competition_id:_id}});
  }

  const gotoChapter = ()=>
{
  navigate("/home");
}


  return (
    <div>
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
                        value={Name}
                        onChange={(e) => setUser(e.target.value)}
                        required
                    />
                    <label htmlFor="email">
                          Chat Number
                    </label>
                    <input
                          type="text"
                          id="email"
                          autoComplete="off"
                          onChange={(e) => setHostNumber(e.target.value)}
                          value={hostNumber}
                          required
                          aria-describedby="uidnote"
                    />
                    <button>Chat Now</button>
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

export default CreateRoom;
