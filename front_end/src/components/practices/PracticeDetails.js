import React from 'react';
import { useLocation } from 'react-router-dom';
import CustomAppBar from "../Header/AppBar";

const PracticeDetail = () => {

  const Location = useLocation();
  const qlength = Location.state.question.length;
  const sAnswer = Location.state.answer;
  const Question = Location.state.question  ;
  const answer_state = Location.state.answer_state;
  const question_type = Location.state.question_type;
  const score = Location.state.score;
  const total_score = Location.state.total_score;
  const father_name = Location.state.father_name;

  console.log(Location.state)


  // const ReorderSentences = Question.map((c) => {
  //   const words = c.words.map((word) => {
  //     return <li key={word}>{word}</li>;
  //   });

  //   return (
  //     <li key={c.id}>
  //       <ul>{words}</ul>
  //     </li>
  //   );
  // });


  // const ReorderAnswers = Question.map((c) => {
  //   const answers = c.answer.map((answer) => {
  //     return <li key={answer}>{answer}</li>;
  //   });

  //   return (
  //     <li key={c.id}>
  //       <ul>{answers}</ul>
  //     </li>
  //   );
  // });

  // const StudentReorderAnswer = sAnswer.map((c) => {
  //   const answers = c.map((answer) => {
  //     return <li key={answer}>{answer.word}</li>;
  //   });

  //   return (
  //     <li key={c.id}>
  //       <ul>{answers}</ul>
  //     </li>
  //   );
  // });




  const sentences = Question.map((c)=>
  {
    return <li key={c.firstSentences}>{c.firstSentences} .... {c.seconedSentences}</li>;
  });

  const CorrectAnswer = Question.map((c)=>
  {
    return <li key={c.answer}>{c.answer}</li>;
  });

  const StudentAnswer = sAnswer.map((c)=>
  {
    return <li key={c.answer}>{c}</li>;
  });

  const StudentAnswer_state = answer_state.map((c)=>
  {
    return <li key={c.answer}>{c}</li>;
  });



  return (
    <div >
      <CustomAppBar studentName={father_name} position="fixed"/>
      <h1>practice Details</h1>
      <div className='score'>
      <h2>Total Score: {total_score}</h2>
      <h2>Total child Score: {score}</h2>
      </div>
    {
      question_type ==='MultipleChoice' ? 
      (
    <div className='reorderq'>
      <div>
        <h2 style={{fontSize:"10px"}}>The question have <span style={{color:"red"}}>{qlength} </span>sentences</h2>
        <ul>
          {sentences}
        </ul>
      </div>
      <div>
        <h2>Correct answers: </h2>
        <ul>
          {CorrectAnswer}
        </ul>
      </div>
      <div>
        <h2>Child Answe</h2>
        <ul>{StudentAnswer}</ul>
      </div>
      <div>
        <h2>and answer of your child is </h2>
        <ul>{StudentAnswer_state}</ul>
      </div>
    </div>   
      )
      : 
      (
      <div className='reorderq'>
       {/* <img src="img/details.jpg" alt="" style={{width:"15%",height:"300px"}}/> */}
        <div className='qdet'>
        <h2 style={{fontSize:"19px",padding:"20px"}}>The question have <span>{qlength} </span>sentences</h2>
        <ul>
          {Question.map((c) => {
          const answers = c.answer.map((answer) => {
      return <li key={answer}>{answer}</li>;
    });

    return (
      <li key={c.id}>
        <ul>{answers}</ul>
      </li>
    );
  })
  }
        </ul>
      </div>
      <div className='Answer'>        
        <h2 style={{fontSize:"19px",padding:"20px",color:"green"}}>Correct Answer:</h2>
        <ul>
          {Question.map((c) => {
    const answers = c.answer.map((answer) => {
      return <li key={answer}>{answer}</li>;
    });

    return (
      <li key={c.id}>
        <ul>{answers}</ul>
      </li>
    );
  })}
        </ul>
      </div>
      <div>
        <h2 style={{fontSize:"19px",padding:"20px",color:"green"}}>Child Answer :</h2>
        <ul>
          {sAnswer.map((c) => {
    const answers = c.map((answer) => {
      return <li key={answer}>{answer.word}</li>;
    });

    return (
      <li key={c.id}>
        <ul>{answers}</ul>
      </li>
    );
  })}
        </ul>
        </div>
        <div className='state'>
        <h2 style={{fontSize:"19px",padding:"20px",color:"green"}}>Answer state : </h2>
        <ul>
          {StudentAnswer_state}
        </ul>
      </div>
      {/* <img src="img/true.jpg" alt="" /> */}
    </div>    
      )
    }
    </div>
  );

}

export default PracticeDetail;
