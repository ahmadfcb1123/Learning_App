import React from 'react';
import Navigator from '../Navigator';

const drawerWidth = 256;

const SpeakingQuestion = () => {
  return (
    <div>
              <Navigator          
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
      <h1>welcome in Speaking Question page</h1>
    </div>
  );
}

export default SpeakingQuestion;
