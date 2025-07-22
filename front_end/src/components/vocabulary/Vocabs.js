import React from 'react';
import VocabularyGroup from './VocabularyGroup';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Box, CircularProgress, Skeleton } from '@mui/material';
import CustomAppBar from '../Header/AppBar';
import { Button } from 'bootstrap';

const Vocabs = () => {
  const [vocabs, setVocabs] = useState(null);
  const Location = useLocation();
  const studName = localStorage.getItem('studentName');
  const navigate = useNavigate();
  const chapter_id = Location.state.id;
  const title = Location.state.title;

  const GetVocabs = async () => {
    try {
      const { data } = await axios.get(`api/getVocabs/${chapter_id}`);
      setVocabs(data.data);
      console.log(vocabs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetVocabs();
  }, []);


  const goToReality =()=>
  {
    navigate("/reality")
  }

  return (
    <>
      <CustomAppBar studentName={studName} position="fixed"/>
      <button className='real' onClick={goToReality} style={{border:"1px solid green",boxShadow:"1px 1px 7px 1px green"}}>Vocabulary With Reality</button>
      {vocabs && vocabs.length > 0 ? (
        <div>
          <h1 style={{color:"green",margin:"8px auto"}}> Vocabulary </h1>
          <div style={{display:"flex",justifyContent:"center",border:"1px solid gray" ,margin:"0px auto",borderRadius:"10px 10px",padding:"10px", width:"fit-content"}}>
            <span style={{color:"black",fontWeight:"bold"}}>chapter : </span>
            <span> {title}</span>

          </div>
          {vocabs.map((vocab) => (
            <VocabularyGroup
              key={vocab.id}
              vocabularies={vocab.word_Meaning_sentence}
            />
          ))}
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