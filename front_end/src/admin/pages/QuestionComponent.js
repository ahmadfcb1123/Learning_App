import React from 'react';

const QuestionComponent = ({ questionType }) => {
  let selectedList = [];

  switch (questionType) {
    case 'reorder':
      selectedList = ['Option 1', 'Option 2', 'Option 3'];
      break;
    case 'multipleChoice':
      selectedList = ['Option A', 'Option B', 'Option C'];
      break;
    case 'Writing':
      selectedList = ['Essay', 'Article', 'Letter'];
      break;
    case 'Speaking':
      selectedList = ['Presentation', 'Dialogue', 'Speech'];
      break;
    default:
      selectedList = [];
  }

  return (
    <div>
      <h2>Question Type: {questionType}</h2>
      <ul>
        {selectedList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionComponent;