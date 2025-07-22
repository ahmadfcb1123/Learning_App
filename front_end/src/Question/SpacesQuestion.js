import React, { useState } from 'react';
import "./Question.css";
import { useLocation } from 'react-router-dom';

const SpacesQuestion = () => {


  const Location = useLocation();
  console.log(Location.state);

	const questions = [
		{
			questionText: 'hello, i .... Ahmad',
			answerOptions: [
				{ answerText: 'am', isCorrect: true },
				{ answerText: 'is', isCorrect: false },
				{ answerText: 'are', isCorrect: false },				
			],
		},
		{
			questionText: 'i .... from Lebanon',
			answerOptions: [
				{ answerText: 'am', isCorrect: true },
				{ answerText: 'is', isCorrect: false },
				{ answerText: 'are', isCorrect: false },
			],
		},
		{
			questionText: 'My father .... a doctor',
			answerOptions: [
				{ answerText: 'am', isCorrect: false },
				{ answerText: 'is', isCorrect: true },
				{ answerText: 'are', isCorrect: false },		
			],
		},
		{
			questionText: 'Adam and allan .... my little brothers',
			answerOptions: [
				{ answerText: 'am', isCorrect: false },
				{ answerText: 'is', isCorrect: false },
				{ answerText: 'are', isCorrect: true },		
			],
		},
    {
			questionText: 'our school .... very big',
			answerOptions: [
				{ answerText: 'am', isCorrect: false },
				{ answerText: 'is', isCorrect: true },
				{ answerText: 'are', isCorrect: false },		
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};

  
	return (
		<div className='question'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text-spaces'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default SpacesQuestion ;