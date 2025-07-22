import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React, { useEffect, useState } from "react";
import "./Question.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button, Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "../api/axios";


function ReorderQuestion() {


  console.log(localStorage.getItem("studentId"));
  const student_id =localStorage.getItem("studentId");

  const [answer , setAnswer] = useState([]);
  const [Correct , setCorrect] = useState([]);

  
  const navigate = useNavigate();
  const Location = useLocation();
  const content = Location.state.Question;
  const id = Location.state.id;
  const skill_type = Location.state.skill_type;
  console.log(content);

const [items, setItems] = useState([]);
const [items1, setItems1] = useState([]);

const [score, setScore] = useState(0);
const [total_score, setTotalScore] = useState(0);
const [buttonEnabled, setButtonEnabled] = useState(true);
const [buttonEnabled1, setButtonEnabled1] = useState(true);


const fill = () => {
  setItems(prevItems => {
    const newItems = [];
    for (let i = 0; i < content[0].words.length; i++) {
      const newItem = { id: uuidv4(), word: content[0].words[i] };
      newItems.push(newItem);
    }
    return [...prevItems, ...newItems];
  });
};

const fillSentence2 = () => {
  setItems1(prevItems => {
    const newItems = [];
    for (let i = 0; i < content[1].words.length; i++) {
      const newItem = { id: uuidv4(), word: content[1].words[i] };
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



  const onDragEnd2 = (result) => {
    if (!result.destination) {
      return;
    }
    const newItems1 = [...items1];
    const [removed] = newItems1.splice(result.source.index, 1);
    newItems1.splice(result.destination.index, 0, removed);
    setItems1(newItems1);
  };


  function checkOrder(finalOrder) {
    if (finalOrder.length !== content[0].answer.length) return false;
    for (let i = 0; i < finalOrder.length; i++) {
      if (finalOrder[i].word !== content[0].answer[i]) return false;
    }
    return true;
  }

  function checkOrder1(finalOrder) {
    if (finalOrder.length !== content[1].answer.length) return false;
    for (let i = 0; i < finalOrder.length; i++) {
      if (finalOrder[i].word !== content[1].answer[i]) return false;
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
    setButtonEnabled(false)
  };

  console.log(answer);

  const handleCheckOrder1 = () => {
    const finalOrder = items1;
    setAnswer([...answer,finalOrder]);
    const isCorrectOrder = checkOrder1(finalOrder);
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
    setButtonEnabled1(false)
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
                        total_score:total_score
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


      navigate(-2);
        
}


  useEffect(() => {
    fill();
    fillSentence2();
  }, []);



  return (
    <div className="ReorderingContainer">
    <div className="containerReorder">
      <span className="reorderspan">
      your Score is {score}
      {/* <FontAwesomeIcon icon={faCheck} className={ (!buttonEnabled && score!=0 )? "valid" : "hide"} />
      <FontAwesomeIcon icon={faTimes} className={ ( buttonEnabled && score===0) ? "hide" : "invalid"} /> */}
      </span>
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
      <button className="reorder" onClick={handleCheckOrder} disabled={!buttonEnabled}>
        Check Order
      </button>
    </div>
    <div className="containerReorder">
      <span className="reorderspan">
      your Score is {score}
      {/* <FontAwesomeIcon icon={faCheck} className={ (!buttonEnabled1 && score!=0 )? "valid" : "hide"} />
      <FontAwesomeIcon icon={faTimes} className={ ( buttonEnabled1 && score===0) ? "hide" : "invalid"} /> */}
      </span>
      <DragDropContext onDragEnd={onDragEnd2}>
        <Droppable droppableId="items1" direction="horizontal">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {items1.map((item, index) => (
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
      <button className="reorder" onClick={handleCheckOrder1} disabled={!buttonEnabled1}>
        Check Order
      </button>
    </div>
    <button  className="reorder" disabled={buttonEnabled && buttonEnabled1} onClick={submit}> submit </button>
    </div>
  );
}

export default ReorderQuestion;