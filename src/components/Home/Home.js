import axios from "../../api/axios";
import "./Home.css";
import { useEffect, useState } from "react";
import SingleContent from "../SingleContent/SingleContent";
import { AppBar, Box, CircularProgress, IconButton, Skeleton, Toolbar } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LockedContent from "../SingleContent/LockedContent";
import DoneContent from "../SingleContent/DoneContent";
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SchoolIcon from '@mui/icons-material/School';
import CustomAppBar from "../Header/AppBar";


const Home = () => {
  const [content, setContent] = useState([]);
  const [freeChapter, setFreeChapter] = useState(["64ca8fde9e755bfdea6280db"]);
  const [doneChapter, setDoneChapter] = useState([]);

  const navigate = useNavigate();

  const studName = localStorage.getItem('studentName');
  const stud_Id = localStorage.getItem('studentId');
  console.log(studName);
  console.log(stud_Id);

  const fetchTrending = async () => {
    const { data } = await axios.get('api/auth/chapters', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
    setContent(data.data);
  };

  const ChapterDone = async () => {
    const { data } = await axios.post(`api/ISProgress/${stud_Id}`);
    setDoneChapter(data.data);
  };

  const getFreeChapter = () => {
    const newFreeChapter = [];

    for (let i = 0; i < content.length - 1; i++) {
      if (doneChapter.includes(content[i]._id)) {
        console.log("Found free chapter");
        newFreeChapter.push(content[i + 1]._id);
      } else {
        console.log("No free chapter found");
      }
    }
    setFreeChapter([...freeChapter, ...newFreeChapter]);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  useEffect(() => {
    ChapterDone();
  }, []);

  useEffect(() => {
    getFreeChapter();
  }, [doneChapter, content]);

  const isDone = (item) => {
    return doneChapter.includes(item);
  };

  const isExist = (item) => {
    return freeChapter.includes(item);
  };

  const goBack = () => {
    navigate("/");
  };

  console.log(content);
  console.log(doneChapter);
  console.log(freeChapter);

  const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  });


  const gotoGame = ()=>
  {
    navigate("/ChooseGame");
  }

  return (
    <>
    <CustomAppBar studentName={studName} position="fixed"/>
      {localStorage.getItem('access_token') === null ? (
        <div className="home" onClick={goBack}>
          <h1>
            You are not authorized. Please login to see your chapters. Click here to login.
          </h1>
        </div>
      ) : (
        <div>
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <span style={{color:"black"}} className="pageTitle">
          <span style={{color:"green"}}>Welcome {studName}.</span>   Choose chapter to start.
          </span>
          <div>
            <img src="/img/prof.png" alt="" style={{width:"150px"}} srcset="" />
          </div>
          </div>
          <div style={{textAlign:"center",color:"green"}}>......................</div>
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <div style={{color:"palevioletred",marginLeft:"10px"}}>Chapters:</div>
          
          </div>
          <div className="home">
            {content && content.length > 0 ? (
              content.map((c) => {
                if (isDone(c._id)) {
                  return (
                    <DoneContent
                      key={c._id}
                      id={c._id}
                      number={c.number}
                      title={c.title}
                      description={c.description}
                    />
                  );

                } else if (isExist(c._id)) {
                  return (
                    <SingleContent
                      key={c._id}
                      id={c._id}
                      number={c.number}
                      title={c.title}
                      description={c.description}
                      imageUrl={c.imageUrl}
                      stud_Id={stud_Id}
                    />
                  );
                  
                } else {
                  return (
                    <LockedContent
                      key={c._id}
                      id={c._id}
                      number={c.number}
                      title={c.title}
                      description={c.description}
                    />
                  );
                }
              })
            ) : (
              <Box sx={{ pt: 0.8 }}>
                <Skeleton variant="rectangular" width={310} height={118} />
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            )}
          </div>
      <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0 }} style={{display:"flex",flexDirection:"row",justifyContent: "space-around",background: "#8bdb8b"}}>
        <Toolbar sx={{ backgroundColor: '#8bdb8b' }}>
          <Box sx={{ flexGrow: 1 }} />
          <div>Games</div>
          <IconButton style={{margin:"0px 100px 0 0"}} onClick={gotoGame} color="inherit">
            <SportsEsportsIcon />
          </IconButton>
          <div>||</div>
          <IconButton color="inherit">
            <SchoolIcon />
          </IconButton>
          <div>Chapters</div>
        </Toolbar>
      </AppBar>
        </div>
      )}
    </>
  );
};

export default Home;