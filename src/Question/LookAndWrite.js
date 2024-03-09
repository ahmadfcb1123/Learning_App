import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import CustomAppBar from '../components/Header/AppBar';

const LookAndWrite = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const studName = localStorage.getItem('studentName');

  const [stud_answer, setStudAnswer] = useState('');

  const student_id = localStorage.getItem('studentId');
  const [answer, setAnswer] = useState([]);
  const [correct, setCorrect] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [total_score, setTotalScore] = useState(0);

  console.log(location.state);

  const content = location.state.Question;
  const Question_id = location.state.Question_id;
  const id = location.state.id;
  const skill_type = location.state.skill_type;

  console.log(content);

  const handleAnswer = () => {
    if (stud_answer === content[currentQuestion].word) {
      setScore(score + 10);
      setTotalScore(total_score + 10);
      setAnswer([...answer, stud_answer]);
      setCorrect([...correct, 'is Correct']);
      console.log('true', stud_answer);
      setStudAnswer('');
    } else {
      setTotalScore(total_score + 10);
      setAnswer([...answer, stud_answer]);
      setCorrect([...correct, 'Not Correct']);
      console.log('false', content[0].word);
      setStudAnswer('');
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < content.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const goBack = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        '/api/makePractice',
        JSON.stringify({
          chapter_id: id,
          skill_type: skill_type,
          answer: answer,
          question_type: 'Look And Write',
          question: content,
          answer_state: correct,
          student_id: student_id,
          score: score,
          total_score: total_score,
          Question_number:1,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false,
        }
      );
      console.log(response?.data);
      console.log(JSON.stringify(response));
    } catch (err) {
      if (!err?.response) {
        console.log('No Server Response');
      } else {
        console.log('Error');
      }
    }

    if (score === total_score)
    {
      try{
      const response = await axios.post(`/api/makeProgress/${student_id}/${id}/${skill_type}/${Question_id}`,
      JSON.stringify({}),
      {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false
      }
  );
  console.log(response?.data);
  console.log(JSON.stringify(response))
    }
      catch (err) {
    if (!err?.response) {
      console.log('No Server Response');
    }
    else {
      console.log("Error")
    }
  }
}
    navigate(-2);
  };

  return (
    <>
    <CustomAppBar studentName={studName} position="fixed"/>
    <div className='speach'>
      {showScore === true ? (
        <div className='question'>
          <div className='score-section'>
            You scored {score} out of {total_score}
            <Button variant='contained' disableElevation onClick={goBack}>
              Submit
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{content.length}
            </div>
            <div className='question-text'>{content[currentQuestion].questionText}</div>
          </div>
          <div className='answer-section'>
            <div className='answer-section-img'>
              <img
                src={`http://127.0.0.1:8000/api/getSentencesImageWriting/${Question_id}/${content[currentQuestion]._id.$oid}`}
                alt=''
              />
              <h2>{content[currentQuestion].incompletWord}</h2>
            </div>
            <label htmlFor='name'>Write your Answer:</label>
            <input
              type='text'
              id='name'
              autoComplete='off'
              onChange={(e) => setStudAnswer(e.target.value)}
              value={stud_answer}
              required
            />
            <button onClick={handleAnswer}>Answer</button>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default LookAndWrite;