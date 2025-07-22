import { Button, ButtonBase, ButtonGroup, IconButton } from '@mui/material';
import React from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import CampaignIcon from '@mui/icons-material/Campaign';
import CustomAppBar from '../Header/AppBar';
import { Link } from 'react-router-dom';

const RealityGroup = ({ vocabularies }) => {


  

  const { speak, speaking} = useSpeechSynthesis();

  const handleSpeak = (term) => {
    speak({ text: term });
    console.log("speaking");
  };

  const handleSpeakMean = (term) => {
    speak({ text: term });
    console.log("speaking");
  };

  return (
    <>
    <div className="vocabulary-group">
      {vocabularies.map((vocabulary) => (
        <div className="vocabulary">
          <h3 style={{fontSize:"20px"}}><span style={{color:"green"}}>word : </span>  {vocabulary[0]}</h3>
          <p >{vocabulary[1]}</p>
          <h3 style={{fontSize:"20px"}}><span style={{color:"green"}}>example : </span>  {vocabulary[2]}</h3>
          <p> <Link className='ani' to={vocabulary[3]}>ON R E A L I T Y</Link></p>
          <div>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="text"
        color="secondary"
      >
          <Button onClick={() => handleSpeak(vocabulary[0])} disabled={speaking.speaking}>
            Word
            <IconButton color="inherit">
            <CampaignIcon />
          </IconButton>
          </Button>
          <Button onClick={() => handleSpeak(vocabulary[2])} disabled={speaking.speaking}>
            Example
            <IconButton color="inherit">
            <CampaignIcon />
          </IconButton>
          </Button>
      </ButtonGroup>
          </div>
          {/* <ButtonBase onClick={() => handleSpeakMean(vocabulary.definition)} disabled={speaking.speaking}>
            meaning
          </ButtonBase> */}
        </div>
      ))}

    </div>
    </>
  );
};

export default RealityGroup;