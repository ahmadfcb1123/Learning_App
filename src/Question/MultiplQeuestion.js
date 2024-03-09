import React, { useState } from 'react';
import "./Question.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from '../api/axios';
import CustomAppBar from '../components/Header/AppBar';

const MultiplQeuestion = () => {

  console.log(localStorage.getItem("studentId"));
  const student_id =localStorage.getItem("studentId");
  const studName = localStorage.getItem('studentName');

  const [answer , setAnswer] = useState([]);
  const [Correct , setCorrect] = useState([]);

  const navigate = useNavigate();
  const Location = useLocation();
  const content = Location.state.Question;
  const id = Location.state.id;
  const skill_type = Location.state.skill_type;
  const Question_number = Location.state.Question_number;
  const Question_id = Location.state.Question_id;

  console.log(content);
  console.log(id);
  console.log(skill_type);
	const [currentQuestion, setCurrentQuestion] = useState(0);  
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [total_score, setTotalScore] = useState(0);

	const handleAnswerOptionClick = (x) => 
  {
		if (x===content[currentQuestion].answer) {
			setScore(score + 10);
			setTotalScore(total_score + 10);
    setAnswer([...answer,x]);
    setCorrect([...Correct,"is Correct"]);
		}
    else
    {
			setTotalScore(total_score + 10);
      setAnswer([...answer,x]);
      setCorrect([...Correct,"Not Correct"]);
    }

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < content.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
  };


  const goBack = async (event)=>
  {
    event.preventDefault();
    try {
      const response = await axios.post('/api/makePractice',
          JSON.stringify({chapter_id:id,
                          skill_type:skill_type, 
                          answer:answer,
                          question_type:'MultipleChoice',
                          question:content,
                          answer_state:Correct,
                          student_id:student_id,
                          score:score,
                          total_score:total_score,
                          Question_number:Question_number
                        }),
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
  }

  // const Back = ()=>
  // {
  //   const prevQuestion = currentQuestion - 1;
  //   if (Correct[prevQuestion]==="is Correct")
  //   {
  //     setScore(score - 10);
	// 		setTotalScore(total_score - 10);
  //     setAnswer([...answer.slice(0, prevQuestion), ...answer.slice(prevQuestion + 1)]);
  //     // answer.slice(prevQuestion,1);
  //     // setCorrect([...Correct,"is Correct"]);
  //     Correct.splice(prevQuestion,1);
  //   }
  //   else if (Correct[prevQuestion]==="Not Correct")
  //   {
	// 		setTotalScore(total_score - 10);
  //     answer.slice(prevQuestion,1);
  //     Correct.splice(prevQuestion,1);
  //   }
	// 	if (prevQuestion > 0) {
	// 		setCurrentQuestion(prevQuestion);
	// 	} else {
  //     setCurrentQuestion(0);
	// 	}
  // }

  const Back = () => {
    const prevQuestion = currentQuestion - 1;
    if (Correct[prevQuestion] === "is Correct") {
      setScore(score - 10);
      setTotalScore(total_score - 10);
      setAnswer((prevAnswer) => {
        const updatedAnswer = [...prevAnswer];
        updatedAnswer.splice(prevQuestion, 1);
        return updatedAnswer;
      });
      setCorrect((prevCorrect) => {
        const updatedCorrect = [...prevCorrect];
        updatedCorrect.splice(prevQuestion, 1);
        return updatedCorrect;
      });
    } else if (Correct[prevQuestion] === "Not Correct") {
      setTotalScore(total_score - 10);
      setAnswer((prevAnswer) => {
        const updatedAnswer = [...prevAnswer];
        updatedAnswer.splice(prevQuestion, 1);
        return updatedAnswer;
      });
      setCorrect((prevCorrect) => {
        const updatedCorrect = [...prevCorrect];
        updatedCorrect.splice(prevQuestion, 1);
        return updatedCorrect;
      });
    }
    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
    } else {
      setCurrentQuestion(0);
    }
  };

  if(showScore===true)
  {
  console.log(answer);
  console.log(Correct);
  }

  // console.log(content[currentQuestion]._id);
  return (
    <>
    <CustomAppBar studentName={studName} position="fixed"/>
    <div className='question'>
      {showScore===true ? (
        <div className='score-section'>
          You scored {score} out of {total_score}
          <Button style={{textAlign:"center"}} variant="contained" disableElevation onClick={goBack}>
              Submit
          </Button>
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{content.length}
            </div>
            <div className='question-text'>{content[currentQuestion].firstSentences}.....{content[currentQuestion].seconedSentences}</div>
            <div className="back-button">
              <button onClick={Back}>Back</button>
            </div>
          </div>
          <div className='answer-section'>
            {content[currentQuestion].choices.map((c) => (
              <button onClick={() => handleAnswerOptionClick(c)}>{c}</button>
            ))}
          </div>
        </>
      )}
    </div>
    </>
  );
	
}

export default MultiplQeuestion ;