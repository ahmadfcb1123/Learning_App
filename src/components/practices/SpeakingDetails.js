import React from 'react';
import { useLocation } from 'react-router-dom';

const SpeakingDetails = () => {

  const Location = useLocation();
  const qlength = Location.state.question.length;
  const sAnswer = Location.state.answer;
  const Question = Location.state.question  ;
  const answer_state = Location.state.answer_state;
  const score = Location.state.score;
  const total_score = Location.state.total_score;

  console.log(Location.state);

  const words = Question.map((c)=>
  {
    return <li key={c.word}>{c.word}</li>;
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
    <div>
      <h1>here is practis of your son</h1>
      <div className='score'>
      <h2>Total Score: {total_score}</h2>
      <h2>Total child Score: {score}</h2>
      </div>
      <div className='Choices'>
      <div>
        <h2>The question have <span>{qlength} </span>photos the word of each them is </h2>
        <ul>
          {words}
        </ul>
      </div>
      <div>
        <h2>but the Student answer is</h2>
        <ul>{StudentAnswer}</ul>
      </div>
      <div>
        <h2>and answer of your child is </h2>
        <ul>{StudentAnswer_state}</ul>
      </div>
      </div>
    </div>   
  );
}

export default SpeakingDetails;
