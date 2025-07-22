import React from 'react';
import VocabularyGroup from './VocabularyGroup';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, CircularProgress, Skeleton } from '@mui/material';
import CustomAppBar from '../Header/AppBar';
import RealityGroup from './RealityGroup';

const Vocabs = () => {
  const [vocabs, setVocabs] = useState(null);
  const studName = localStorage.getItem('studentName');
  const navigate = useNavigate();

  // Sample vocabs list
  const sampleVocabs = [
    {
      id: 1,
      word: 'apple',
      translate:'تفاحة',
      meaning: 'i like apple',
      Link: 'http://127.0.0.1:5500/demos/objectManip/index.html',
    },
    {
      id: 2,
      word: 'Ghost',
      translate:'شبح',
      meaning: 'a Ghosts are just lies',
      Link: 'http://127.0.0.1:5500/demos/objectManip3/index.html',
    },
    {
    id: 3,
    word: 'dinosaur',
    translate:'ديناصور',
    meaning: 'Dinosaurs disappeared long ago',
    Link: 'http://127.0.0.1:5500/demos/objectManip2/index.html',
  },
  {
  id: 4,
  word: 'Banana',
  translate:'موز',
  meaning: 'These bananas are very delicious',
  Link: 'http://127.0.0.1:5500/demos/objectManip/index.html',
},
  ];

  useEffect(() => {
    // Simulating API call
    const getVocabs = () => {
      // Simulate API delay
      setTimeout(() => {
        setVocabs(sampleVocabs);
      }, 1000);
    };

    getVocabs();
  }, []);


  return (
    <>
      <CustomAppBar studentName={studName} position="fixed" />
      {vocabs && vocabs.length > 0 ? (
        <div>
          <h1 style={{ color: 'green', margin: '8px auto' }}>Reality Vocabulary</h1>
          <div style={{display:"flex",flexDirection:"row"}}>
          {vocabs.map((vocab) => (
            <RealityGroup
              vocabularies={[
                [vocab.word, vocab.translate, vocab.meaning, vocab.Link],
              ]}
            />
          ))}
          </div>
        </div>
      ) : (
        <Box sx={{ pt: 0.8 }}>
        <Skeleton variant="rectangular" width={310} height={118} />
        <Skeleton />
        <Skeleton width="60%" />
      </Box>        
      )}
    </>
  );
};

export default Vocabs;