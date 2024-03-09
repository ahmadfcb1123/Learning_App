import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
export default function Content() {
  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
            </Grid>
            <Grid item xs>
              <div className='chadmin'>
                <div>
                  <h1>chapter1</h1> 
                  <IconButton>
                    <IntegrationInstructionsIcon />
                  </IconButton>
                </div>
                <div><h1>chapter2 </h1>
                <IconButton>
                    <IntegrationInstructionsIcon />
                  </IconButton>
                </div>
                {/* <div><h1>chapter3</h1>
                <IconButton>
                    <IntegrationInstructionsIcon />
                  </IconButton>
                </div>
                <div><h1>chapter4</h1>
                <IconButton>
                    <IntegrationInstructionsIcon />
                  </IconButton>
                </div> */}
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/* <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
      </Typography> */}
    </Paper>
  );
}