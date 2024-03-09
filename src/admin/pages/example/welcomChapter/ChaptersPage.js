import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../../../api/axios';
import { Box, Skeleton } from '@mui/material';
import { useEffect } from 'react';
import SingleContent from './SingleContent';

const ChaptersPage = () => {

  const location = useLocation();
  const SkillType = location.state.SkillType;

  const [content, setContent] = useState([]);
  const navigate = useNavigate();

  const fetchTrending = async () => {
    const { data } = await axios.get('api/chapters', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(data);
    setContent(data.data);
  };

  useEffect(() => {
    fetchTrending();
  }, []);


  return (
          <div>
          <div className="home">
            {content && content.length > 0 ? (
              content.map((c) =>
                      <SingleContent
                      key={c._id}
                      id={c._id}
                      title={c.title}
                      description={c.description}
                      imageUrl={c.imageUrl}
                      SkillType={SkillType}
                    />                  
              )
            ) : (
              <Box sx={{ pt: 0.8 }}>
                <Skeleton variant="rectangular" width={310} height={118} />
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            )}
          </div>      
    </div>
  );
}

export default ChaptersPage;
