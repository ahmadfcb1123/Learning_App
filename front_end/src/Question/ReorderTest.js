import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React, { useEffect, useState } from "react";
import "./Question.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button, Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "../api/axios";
import CustomAppBar from "../components/Header/AppBar";

const ReorderTest = () => {

  const student_id =localStorage.getItem("studentId");

  const [answer , setAnswer] = useState([]);
  const [Correct , setCorrect] = useState([]);
  const studName = localStorage.getItem('studentName');

	const [showScore, setShowScore] = useState(false);

  const navigate = useNavigate();
  const Location = useLocation();
  const content = Location.state.Question;
  const id = Location.state.id;
  const skill_type = Location.state.skill_type;
  const Question_number = Location.state.Question_number;
  const Question_id = Location.state.Question_id;
  console.log(content);

const [items, setItems] = useState([]);

const [score, setScore] = useState(0);
const [total_score, setTotalScore] = useState(0);

const [currentQuestion, setCurrentQuestion] = useState(0);  

const fill = () => {
  setItems(prevItems => {
    const newItems = [];
    for (let i = 0; i < content[currentQuestion].words.length; i++) {
      const newItem = { id: uuidv4(), word: content[currentQuestion].words[i] };
      newItems.push(newItem);
    }
    return [...prevItems, ...newItems];
  });
};

const onDragEnd = (result) => {
  if (!result.destination) {
    return;
  }
  const newItems = [...items];
  const [removed] = newItems.splice(result.source.index, 1);
  newItems.splice(result.destination.index, 0, removed);
  setItems(newItems);
};

function checkOrder(finalOrder) {
  if (finalOrder.length !== content[currentQuestion].answer.length) return false;
  for (let i = 0; i < finalOrder.length; i++) {
    if (finalOrder[i].word !== content[currentQuestion].answer[i]) return false;
  }
  return true;
}

const handleCheckOrder = () => {
  const finalOrder = items;
  setAnswer([...answer,finalOrder]);
  const isCorrectOrder = checkOrder(finalOrder);
  // console.log(isCorrectOrder);
  if (isCorrectOrder) 
  {
    setScore(score+10);
    setTotalScore(total_score+10)
    setCorrect([...Correct,"is Correct"]);
  }
  else 
  {
    setTotalScore(total_score+10)
    setCorrect([...Correct,"Not Correct"]);
  }
  const nextQuestion = currentQuestion + 1;
  
  if (nextQuestion < content.length)
  {
    setCurrentQuestion(nextQuestion);
    setItems([]);
    setItems(prevItems => {
      const newItems = [];
      for (let i = 0; i < content[nextQuestion].words.length; i++) {
        const newItem = { id: uuidv4(), word: content[nextQuestion].words[i] };
        newItems.push(newItem);
      }
      return [...prevItems, ...newItems];
    });
  } 
  else 
  {
    setShowScore(true);
  }
};

const submit = async (event)=>
{
  event.preventDefault();
  try {
    const response = await axios.post('/api/makePractice',
        JSON.stringify({chapter_id:id,
                        skill_type:skill_type, 
                        answer:answer,
                        question_type:'Reorder',
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
          console.log("bshshshshshs")
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

useEffect(() => {
  fill();
}, []);


  return (
    <>
    <CustomAppBar studentName={studName} position="fixed"/>
    <div className='question'>
    {showScore===true ? (
      <div className='score-section'>
        You scored {score} out of {total_score}
        <Button variant="contained" disableElevation onClick={submit}>
            Submit
        </Button>
      </div>
    ):
    (
    <div className="question-section">
        <div className='question-count'>
        <span>Question {currentQuestion + 1}</span>/{content.length}
        </div>
      <div className='question-text'>Reorder the folowing words:</div>
    <div className="answer-section">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="items" direction="horizontal">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.word}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      </div>
      <div style={{display:"flex" , justifyContent:"center"}}>
      <button className="reorderButton" onClick={() => handleCheckOrder()}>
        Check Order
      </button>
      </div>
    </div>
    )
}
</div>
</>
  );
}

export default ReorderTest;
