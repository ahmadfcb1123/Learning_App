import axios from "../../api/axios";
// import "./Home.css";
import { useEffect, useState } from "react";
import SingleQuestion from "../direction/SingleQuestion";
import { Box, CircularProgress, Skeleton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
// import audio from '../../music.mp3'
// import ReactPlayer from 'react-player';
import AudioPlayer from 'react-audio-player';
import CustomAppBar from "../Header/AppBar";



const Lestening = () => {
  const [content, setContent] = useState([]);
  const navigate = useNavigate
  const studName = localStorage.getItem('studentName');

  const Location = useLocation();
  console.log(Location.state.id.id);

  const skill_type = Location.state.skill_type;



  const fetchQuestion = async () => {
    var item;
    item  = await axios.get(`api/getQuestions/Listening/${Location.state.id.id}`,
    {
      headers: 
        { 
          'Content-Type': 'application/json',
          Authorization : 'Bearer' + localStorage.getItem('access_token'),
        }
    }
    );
    console.log(item);
    setContent(item.data.data);
    console.log(content);
  };

  useEffect(() => {
    if (Location.state.id.id==null)
    {
      goBack();
    }
    else
    {
      fetchQuestion();
    }
  }, []);

  const goBack =()=>
  {
    navigate("/");
  }


  return (
    <>
      <CustomAppBar studentName={studName} position="fixed"/>
    {
      Location.state.id.id == null
      ? (
      <div className="home" onClick={goBack}>
        <h1>you Are Not Authorized pleas Login to see your chapters click here to Login</h1>
      </div>
      ) : 
      (
    <div>
    <span className="pageTitle">Welcom in Listen Skills</span>
    <div>        
        {content && content.length > 0 ? (
          <>
        <div>
          <span className='question_text'>Read the follwoing text and answer of this Question:</span>
        </div>
        <div className='text'>
          <div>
          <AudioPlayer className="audio" src='/audio/music.mp3' controls />
          </div>
          <div>
          <img src={`http://127.0.0.1:8000/api/imageQuestion/Listening/${content[0]._id}/${Location.state.id.id}`} alt=''/>
          </div>
        </div>
        <div className='Skills-Question'>
        { content.map((c) =>(
          <SingleQuestion
          key={c._id}  
          id={c._id}
          type={c.type}
          chapter_id={c.chapter_id}
          Question={c.Question}
          skill_type={skill_type}
          number={c.number}
          />        
          ))}
        </div>
        </>
        ) : (
        <Box sx={{ pt: 0.8 }}>
          <Skeleton variant="rectangular" width={310} height={118} />
          <Skeleton />
          <Skeleton width="60%" />
        </Box>
        )}
        </div>
  
  </div>


      )
    }
    </>
      );
};

export default Lestening;

