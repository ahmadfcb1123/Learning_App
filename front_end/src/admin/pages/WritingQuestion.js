import React from 'react';
import Navigator from '../Navigator';


const drawerWidth = 256;



const WritingQuestion = () => {
  return (
    <div>
              <Navigator          
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
      <h1>welcome in Writing Question page</h1>
    </div>
  );
}

export default WritingQuestion;
