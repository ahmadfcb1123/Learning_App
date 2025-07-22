import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SchoolIcon from '@mui/icons-material/School';
import CustomAppBar from '../components/Header/AppBar';

const ChooseGame = () => {

  const studName = localStorage.getItem('studentName');
  const navigate = useNavigate();

  const PlayWithAthors = ()=>
  {
    navigate("/Hosting");
  }

  const PlayAlone =() =>
  {
    navigate("/GamaTest");
  }


  const gotoChapter = ()=>
{
  navigate("/home");
}

  return (
  <>
    <CustomAppBar studentName={studName} position="fixed"/>
    <div style={{display:"flex" ,alignItems:"center" ,justifyContent:"center", margin:"200px auto"}}>
      <button onClick={PlayWithAthors}>Group game</button>
      <button onClick={PlayAlone}>Single game</button>
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
  </>
  );
}

export default ChooseGame;
