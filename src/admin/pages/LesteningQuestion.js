import React from 'react';
import Navigator from '../Navigator';
import QuestionComponent from './QuestionComponent';


const drawerWidth = 256;

const LesteningQuestion = () => {
  return (
    <div>
              {/* <Navigator          
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          /> */}
      <h1>welcom in Lestining Question page </h1>
      <QuestionComponent questionType="multipleChoice" />
    </div>
  );
}

export default LesteningQuestion;
