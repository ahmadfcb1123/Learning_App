import React from 'react';
import Navigator from '../Navigator';

const drawerWidth = 256;

const Chapters = () => {
  return (
    <div>
        <Navigator          
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
      <h1>welcom in chapters page</h1>
    </div>
  );
}

export default Chapters;
