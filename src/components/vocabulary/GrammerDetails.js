import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import { CircularProgress } from '@mui/material';
import CustomAppBar from "../Header/AppBar";

const GrammerDetails = () => {
  const [grammer, setGrammer] = useState(null);
  const Location = useLocation();
  const chapter_id = Location.state.id;
  const studName = localStorage.getItem('studentName');

  console.log(chapter_id);

  const GetGrammer = async () => {
    try {
      const { data } = await axios.get(`api/getgrammer/${chapter_id}`);
      setGrammer(data.data);
      console.log(grammer);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetGrammer();
  }, []);
  
  return (
    <div>
          <CustomAppBar studentName={studName} position="fixed"/>

      <h1 style={{color:"green"}}>Grammer Details</h1>
      {/* <div className='pageTitle'>
        <h3>Grammer address: subject pronouns.</h3>
      </div> */}
      <div className='text' style={{paddingLift:"10px"}}>
        <h2 style={{color:"brown"}}> Video:</h2>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <video style={{width:"50%",borderRadius:"10px 10px"}} controls src="/audio/section.mp4"></video>
      <p style={{color:"gray",paddingTop:"10px",fontWeight:"bold"}}>Subject Pronoun && Verb To Be</p>
      <p style={{color:"gray"}}>explain about Subject Pronoun && Verb To Be with various example</p>
      
      </div>
      <div style={{color:"brown",marginLift:"10px"}}> <h2 style={{marginLift:"10px"}}>More Details :</h2>  </div>
      <div >
        {grammer && grammer.length > 0 ? (
          <>
          {grammer.map((vocab) => {
            console.log('vocab:', vocab);
            return (
              <div className="vocabulary-group">
                {vocab.grammer.map((grammerItem) => {
                  console.log('grammerItem:', grammerItem);
                  return (
                    <div className="vocabulary" style={{width:"70%" ,marginBottom:"20px" ,height:"fit-content",margin:"10px auto"}}>
                      <h3 style={{color:"green",fontSize:"24px"}}><span style={{color:"brown"}}>Title:</span>  {grammerItem[0]}</h3>
                      
                      <p style={{color:"green",fontSize:"24px"}}>{grammerItem[1]}</p>
                      <img style={{    margin: "10px auto"}} src="/img/grammers.jpg" alt="" />
                      <h3 style={{fontSize:"24px",color:"gray"}}> {grammerItem[2]}</h3>
                    </div>
                  );
                })}
              </div>
            );

          })}
      {/* <div style={{display:"flex" ,alignItems:"center", justifyContent:"center" }}>
        <img style={{height:"300px",width:"400px" , borderRadius:"40px"}} src={`http://127.0.0.1:8000/api/imagegrammer/${grammer[0]._id}/${chapter_id}`} alt=""/>
      </div> */}
        </>
        ) : (
          <CircularProgress style={{ margin: 100 }} color="inherit" size={150} thickness={1} />
        )}
      </div>
    </div>
  );
};

export default GrammerDetails;