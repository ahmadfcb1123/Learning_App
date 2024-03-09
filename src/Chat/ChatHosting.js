import React from 'react';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import CustomAppBar from '../components/Header/AppBar';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';

const ChatHosting = () => {

  
  const navigate = useNavigate();
  const studName = localStorage.getItem('studentName');

  const GotoCreate = ()=>
  {
    navigate("/CreateRoom");
  }

  const GotoJoin =() =>
  {
    navigate("/joinRoom");
  }

  const gotoChapter = ()=>
  {
    navigate("/home");
  }
  
  return (
    <>
    <CustomAppBar studentName={studName} position="fixed"/>
    <div style={{display:"flex" ,alignItems:"center" ,justifyContent:"center", margin:"200px auto"}}>
      <button onClick={GotoCreate}>Create A Room</button>
      <button onClick={GotoJoin}>Join To Room</button>
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

export default ChatHosting;
