import React from 'react';
import './test.css';
const ContainerPractice = ({ leftContent, rightContent }) => {

  return (
<div className="grid-container">
      <div className="left">
        <h2>{leftContent.question_type}</h2>
      </div>
      <div className="right">
        <h2>{rightContent.question_type}</h2>
      </div>
    </div>
  );
}

export default ContainerPractice;
