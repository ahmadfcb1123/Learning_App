import axios from "../../api/axios";
// import "./Home.css";
import { useEffect, useState } from "react";
import SingleQuestion from "../direction/SingleQuestion";
import { Box, CircularProgress, Skeleton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CustomAppBar from "../Header/AppBar";

const Speaking = () => {

  const [content, setContent] = useState([]);
  const navigate = useNavigate
  const studName = localStorage.getItem('studentName');

  const Location = useLocation();
  console.log(Location.state.id.id);

  const skill_type = Location.state.skill_type;


  const fetchQuestion = async () => {
    var item;
    item  = await axios.get(`api/getSpeakingQuestions/Speaking/${Location.state.id.id}`,
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
    <span className="pageTitle">Welcom in Speaking Skills</span>
    <div>        
        {content && content.length > 0 ? (
          <>
        <div>
          <span className='question_text'>Read the follwoing text and answer of this Question:</span>
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
          questions={c.questions}
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
}

export default Speaking;
