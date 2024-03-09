import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useEffect } from 'react';
import { Box, CircularProgress, Skeleton } from '@mui/material';
import SingleChild from './singleChild';

const HomeParent = () => {

  const parentId= localStorage.getItem("parentId");
  const [content, setContent] = useState([]);
  const navigate = useNavigate();

  const fetchTrending = async () => {
    const{data}  = await axios.get(`api/auth/childreens/${parentId}`,
    {
    headers: 
      { 
        'Content-Type': 'application/json',
        Authorization : 'Bearer' + localStorage.getItem('access_token'),
      }
  });
    console.log(localStorage.getItem('access_token'));
    console.log(data);
    setContent(data.data);
    console.log(content);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  const goBack =() =>
  {
    navigate("/");
  }


  return (
    <>
      {
      localStorage.getItem('access_token')=== null ? 
      (
        <div className="home" onClick={goBack}>
          <h1>you Are Not Authorized pleas Login to see your chapters click here to Login</h1>
        </div>
      ) : (
      <div>
        <div>
        <span className="pageTitle">Your Childrens click on it to move to thier practices </span>
          {content && content.length > 0 ? (
        <div className="child" >
          {content.map((c) =>
          (
            <SingleChild
            key={c._id}  
            id={c._id}
            Firstname={c.Firstname}
            Lastname={c.Lastname}
            fatherName={c.fatherName}
          />))}
          </div>

        ) : (
          <Box sx={{ pt: 0.8 }}>
          <Skeleton variant="rectangular" width={310} height={118} />
          <Skeleton />
          <Skeleton width="60%" />
        </Box>
        )}
        </div>
      </div>
      )
    }
    </>
  );
}

export default HomeParent;
