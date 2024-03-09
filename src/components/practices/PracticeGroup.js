import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { Box, CircularProgress, Skeleton } from '@mui/material';
import { useEffect } from 'react';
import SinglePractice from './SinglePractice';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';
import CustomAppBar from '../Header/AppBar';

const PracticeGroup = () => {


  const [totalFirstQuestionScore, setTotalFirstQuestionScore] = useState(0);
  const [totalFirstQuestionChildScore, setTotalFirstQuestionChildScore] = useState(0);
  const [totalSecondQuestionScore, setTotalSecondQuestionScore] = useState(0);
  const [totalSecondQuestionChildScore, setTotalSecondQuestionChildScore] = useState(0);

  const [content, setContent] = useState([]);
  const navigate = useNavigate();

  const Location = useLocation();

  console.log(Location.state.id);
  console.log(localStorage.getItem("studentId"));
  const id = Location.state.id;
  const name = Location.state.student_name;
  const student_id = Location.state.student_id;
  const skill_type = Location.state.skill_type;
  const father_name = Location.state.father_name;

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
  };

  useEffect(() => {
    fetchPractice();
  }, []);

  const firstQuestion = content.filter(q => q.Question_number=== '1');
  const secondQuestion = content.filter(q => q.Question_number=== '2');

  useEffect(() => {
    const totalFirstScore = firstQuestion.reduce((acc, cur) => acc + cur.total_score, 0);
    setTotalFirstQuestionScore(totalFirstScore);
    const totalfirstChildScore = firstQuestion.reduce((acc, cur) => acc + cur.score, 0);
    setTotalFirstQuestionChildScore(totalfirstChildScore);

    const totalSecondScore = secondQuestion.reduce((acc, cur) => acc + cur.total_score, 0);
    setTotalSecondQuestionScore(totalSecondScore);
    const totalSecondChildScore = secondQuestion.reduce((acc, cur) => acc + cur.score, 0);
    setTotalSecondQuestionChildScore(totalSecondChildScore);

  }, [firstQuestion, secondQuestion]);


  const data1 = [
    { name: 'Total Score', score: totalFirstQuestionScore },
    { name: `Total ${name} Score`, score: totalFirstQuestionChildScore },
  ];

  const data2 = [
    { name: 'Total Score', score: totalSecondQuestionScore },
    { name: `Total ${name} Score`, score: totalSecondQuestionChildScore },
  ];
  

  return (
    <div>
    <CustomAppBar studentName={father_name} position="fixed"/>
    <span className="pageTitle">Welcom in  Practice your son {name} in {skill_type} skills </span>
    <div className='chart' style={{ textAlign: "center" }}>
      <div>
        <h2>First Questions</h2>
        <p>Total Score: {totalFirstQuestionScore}</p>
        <p>Total {name} Score: {totalFirstQuestionChildScore}</p>
      </div>
      <div>
      <BarChart
          width={500}
          height={300}
          data={data1}
          margin={{
            top: 20,
            right: 30,
            left: 100,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="score" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
        </div>
      </div>
    <div>
        {
          firstQuestion && firstQuestion.length > 0 ? (        
          <div className='practice'>      
          {firstQuestion.map((practice) => (
          <SinglePractice
          key={practice._id}  
          id={practice.id}
          chapter_id={practice.chapter_id}
          skill_type={practice.skill_type}
          answer={practice.answer}
          question_type={practice.question_type}
          question={practice.question}
          answer_state={practice.answer_state}
          student_id={practice.student_id}
          score={practice.score}
          total_score={practice.total_score}
          name = {name}
          father_name={father_name}
        />
        ))}
        </div>

          ):(
            <Box sx={{ pt: 0.8 }}>
            <Skeleton variant="rectangular" width={310} height={118} />
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
          )
        }
    </div>
    <hr />
    <div className='chart' style={{ textAlign: "center" }}>
      <div>
        <h2>Second Questions</h2>
        <p>Total Score: {totalSecondQuestionScore}</p>
        <p>Total {name} Score: {totalSecondQuestionChildScore}</p>
      </div>
      <div>
      <BarChart
          width={500}
          height={300}
          data={data2}
          margin={{
            top: 20,
            right: 30,
            left: 100,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="score" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
        </div>
      </div>
    <div>
        {
          
          secondQuestion && secondQuestion.length > 0 ? (                
          <div  className='practice'>
          {secondQuestion.map((practice) => (
          <SinglePractice
          key={practice._id}  
          id={practice.id}
          chapter_id={practice.chapter_id}
          skill_type={practice.skill_type}
          answer={practice.answer}
          question_type={practice.question_type}
          question={practice.question}
          answer_state={practice.answer_state}
          student_id={practice.student_id}
          score={practice.score}
          total_score={practice.total_score}
          name = {name}
          father_name={father_name}
        />
        ))}
        </div>
          ):(
            <Box sx={{ pt: 0.8 }}>
            <Skeleton variant="rectangular" width={310} height={118} />
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
          )      
      }
    </div>
    </div>
  );
}

export default PracticeGroup;
