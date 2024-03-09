import React from 'react';
import Navigator from '../Navigator';


const drawerWidth = 256;

const ReadingQuestion = () => {
  return (
    <div>
              <Navigator          
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
      <h1>welcom in Reading Question page</h1>
    </div>
  );
}

export default ReadingQuestion;
