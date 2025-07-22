import React, { useEffect, useState } from 'react';
import './Test.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from '../../api/axios';
import CustomAppBar from '../Header/AppBar';
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function Test() {


  
  const navigate = useNavigate();
  const Location = useLocation();
  const studName = localStorage.getItem('studentName');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isListening, setIsListening] = useState(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [note, setNote] = useState(null)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [savedNotes, setSavedNotes] = useState([])


  const student_id =localStorage.getItem("studentId");
  const [answer , setAnswer] = useState([]);
  const [Correct , setCorrect] = useState([]);

	const [currentQuestion, setCurrentQuestion] = useState(0);  
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [total_score, setTotalScore] = useState(0);  

  console.log(Location.state);

  const content = Location.state.Question;
  const Question_id = Location.state.Question_id;
  const id = Location.state.id;
  const skill_type = Location.state.skill_type;
  const Question_number = Location.state.Question_number;


  // const [content, setContent] = useState([
  //     { photo: image1, word: 'can' },
  //     { photo: image2, word: 'game' },
      // Add more objects if needed
    //]);
  
  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])

    if(note === content[currentQuestion].word)
    {
      setScore(score+10)
			setTotalScore(total_score + 10);
      setAnswer([...answer,note]);
      setCorrect([...Correct,"is Correct"]);
      console.log("true",content[currentQuestion].word)
    }
    else
    {
      setTotalScore(total_score + 10);
      setAnswer([...answer,note]);
      setCorrect([...Correct,"Not Correct"]); 
      console.log("false",content[0].word)
    }

		const nextQuestion = currentQuestion + 1;
    if (nextQuestion < content.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
    setNote(null);
  };

  const clear =()=>
  {
    setSavedNotes([]);
    console.log(savedNotes);
  }

  const goBack = async(event) =>
  {
    event.preventDefault();
    try {
      const response = await axios.post('/api/makePractice',
          JSON.stringify({chapter_id:id,
                          skill_type:skill_type, 
                          answer:answer,
                          question_type:'Pronunciation',
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

  console.log(content[currentQuestion]._id.$oid)
  console.log(Question_id)

  return (
    <>
    <CustomAppBar studentName={studName} position="fixed"/>
    <div className='speach'>
      {showScore===true ? (
      <div className='question'>
        <div className='score-section'>
          You scored {score} out of {total_score}
          <Button variant="contained" disableElevation onClick={goBack}>
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
            <div className='question-text'>pronunciation of this words</div>
            </div>
            <div className='answer-section'>
              <div className='answer-section-img'>
{/* //                <img src={content[currentQuestion].photo} alt='image1'/> */}
                  <img src={`http://127.0.0.1:8000/api/getSentencesImage/${Question_id}/${content[currentQuestion]._id.$oid}`} alt=""/>
                <h2>{content[currentQuestion].word}</h2>                
              </div>
            </div>
            <div className="container202">
            <div className="box">
              <h2>Talk Here</h2>
              {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
              <button onClick={handleSaveNote} disabled={!note || isListening===true}>
                submit
              </button>
              <button onClick={() => setIsListening(prevState => !prevState)}>
                Start/Stop
              </button>
              <p>{note}</p>
            </div>
            <div className="box">
              <h2>Notes</h2>
              {savedNotes.map((n,index) => (
                <p key={index}>{n}</p>
              ))}
              </div>
          </div>
        </>
      )
}
    </div>
    </>
  );
}

export default Test;
