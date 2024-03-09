import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { Box, CircularProgress, Skeleton } from '@mui/material';
import { useEffect } from 'react';
import SinglePractice from './SinglePractice';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';


const PracticeTest = () => {

  const [totalMultipleChoiceScore, setTotalMultipleChoiceScore] = useState(0);
  const [totalMultipleChoiceChildScore, setTotalMultipleChoiceChildScore] = useState(0);
  const [totalReorderScore, setTotalReorderScore] = useState(0);
  const [totalReorderChildScore, setTotalReorderChildScore] = useState(0);
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
  };

  useEffect(() => {
    fetchPractice();
  }, []);

  const multipleChoiceQuestions = content.filter(q => q.question_type=== 'MultipleChoice');
  const reorderQuestions = content.filter(q => q.question_type === 'Reorder');

  useEffect(() => {
    const totalMCQScore = multipleChoiceQuestions.reduce((acc, cur) => acc + cur.total_score, 0);
    setTotalMultipleChoiceScore(totalMCQScore);
    const totalMCQChildScore = multipleChoiceQuestions.reduce((acc, cur) => acc + cur.score, 0);
    setTotalMultipleChoiceChildScore(totalMCQChildScore);

    const totalReorderScore = reorderQuestions.reduce((acc, cur) => acc + cur.total_score, 0);
    setTotalReorderScore(totalReorderScore);
    const totalReorderChildScore = reorderQuestions.reduce((acc, cur) => acc + cur.score, 0);
    setTotalReorderChildScore(totalReorderChildScore);

  }, [multipleChoiceQuestions, reorderQuestions]);



  const goBack =() =>
  {
    navigate("/");
  }

  console.log(content);
  

  const data1 = [
  { name: 'Total Score', score: totalReorderScore },
  { name: `Total ${name} Score`, score: totalReorderChildScore },
];


const data2 = [
  { name: 'Total Score', score: totalMultipleChoiceScore },
  { name: `Total ${name} Score`, score: totalMultipleChoiceChildScore },
];

  return (
  <div>
    <span className="pageTitle">Welcom in  Practice your son {name} in {skill_type} skills </span>
    <div className='chart' style={{ textAlign: "center" }}>
      <div>
        <h2>First Questions</h2>
        <p>Total Score: {totalReorderScore}</p>
        <p>Total {name} Score: {totalReorderChildScore}</p>
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
          reorderQuestions && reorderQuestions.length > 0 ? (        
          <div className='practice'>      
          {reorderQuestions.map((practice) => (
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
        <p>Total Score: {totalMultipleChoiceScore}</p>
        <p>Total {name} Score: {totalMultipleChoiceChildScore}</p>
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
          
          multipleChoiceQuestions && multipleChoiceQuestions.length > 0 ? (                
          <div  className='practice'>
          {multipleChoiceQuestions.map((practice) => (
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

export default PracticeTest;
