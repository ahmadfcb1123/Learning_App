import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import SinglePractice from './SinglePractice';

const Practice = () => {
  const [content, setContent] = useState([]);
  const navigate = useNavigate();

  const Location = useLocation();

  console.log(Location.state.id);
  console.log(localStorage.getItem("studentId"));
  const id = Location.state.id;
  const name = Location.state.student_name;
  const student_id = Location.state.student_id;
  const skill_type = Location.state.skill_type;
  // const student_id = localStorage.getItem("studentId");



  const fetchPractice = async () => {
    var item
    item = await axios.get(`api/auth/getPractices/${id}/${skill_type}/${student_id}`,
    { 
    headers:
      { 
        'Content-Type': 'application/json',
        Authorization : 'Bearer' + localStorage.getItem('access_token'),
      }
  });
    // console.log(item);
    console.log(item);
    setContent(item.data.data);
    console.log(content.length);
    console.log(content);
  };

  useEffect(() => {
    fetchPractice();
  }, []);

  const goBack =() =>
  {
    navigate("/");
  }

  return (
    <>
      {
      localStorage.getItem('access_token')=== null ? 
      (
        <div className="home" onClick={goBack}>
          <h1>you Are Not Authorized pleas Login to see your chapters click here to Login</h1>
        </div>
      ) : (
        <div>           
        <span className="pageTitle">OUR Chapter</span>
        <div className="home" >
          {content && content.length > 0 ? (
          content.map((c) =>(
            <SinglePractice
            key={c._id}  
            id={c.id}
            chapter_id={c.chapter_id}
            skill_type={c.skill_type}
            answer={c.answer}
            question_type={c.question_type}
            question={c.question}
            answer_state={c.answer_state}
            student_id={c.student_id}
            score={c.score}
            total_score={c.total_score}
            name = {name}
          />))

        ) : (
          <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}/>
        )}
        </div>
      </div>        
      )
    }
    </>
  );
}

export default Practice;
