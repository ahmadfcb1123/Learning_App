import { useState } from 'react'
import Card from './Card'
import './game.css'
import axios from '../api/axios';
import { useEffect } from 'react';
import { AppBar, Box, IconButton, Skeleton, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import CustomAppBar from '../components/Header/AppBar';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const GamaTest = () => {
  const  navigate = useNavigate();
  const studName = localStorage.getItem('studentName');

  const [items,setItems] = useState([]);
  const [game,setGame] = useState([]);
  const chapter_id='64ca8fde9e755bfdea6280db'

  const GetGame = async () =>
  {
    const {data} = await axios.get(`api/getGamesDetails/${chapter_id}`);

    console.log(game);
    setGame(data.data);
    setItems(data.data[0].images.sort(() => Math.random() - 0.5));
    console.log(items);
  }

  useEffect(() => {
    GetGame();
  }, []);

  const [prev, setPrev] = useState(-1)

  function check(current){
    if(items[current].id == items[prev].id){
        items[current].stat = "correct"
        items[prev].stat = "correct"
        setItems([...items])
        setPrev(-1)
    }else{
        items[current].stat = "wrong"
        items[prev].stat = "wrong"
        setItems([...items])
        setTimeout(() => {
            items[current].stat = ""
            items[prev].stat = ""
            setItems([...items])
            setPrev(-1)
        }, 1000)
    }
}

function handleClick(id){
  if(prev === -1){
      items[id].stat = "active"
      setItems([...items])
      setPrev(id)
  }else{
      check(id)
  }
}

const gotoChapter = ()=>
{
  navigate("/home");
}


  return (
    <>
        <CustomAppBar studentName={studName} position="fixed"/>

    {
      game && game.length>0 && items.length>0 ?
      (
        <>
          <span className='pageTitle' > {game[0].title} </span>
          <h2> {game[0].discription}</h2>                  
          <div className="gameContainer">            
            { items.map((item, index) => (
                <Card key={index} item={item} id={index} number={item.number} gameId={game[0]._id} handleClick={handleClick} />
            )) }
          </div>
        </>
      ):
      (
        <Box sx={{ pt: 0.8 }}>
        <Skeleton variant="rectangular" width={310} height={118} />
        <Skeleton />
        <Skeleton width="60%" />
      </Box>
      )
    }
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

export default GamaTest;
