import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Skeleton } from "@mui/material";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import '../Home/Home.css'
import SingleContent from "./SingleContent";
import CustomAppBar from "../Header/AppBar";


const PracticeChapter = () => {

  const [content, setContent] = useState([]);
  const navigate = useNavigate();
  const Location = useLocation();

  console.log(Location.state.student_id);
  const student_id = Location.state.student_id;
  const student_name = Location.state.name;
  const father_name = Location.state.fatherName;

  console.log(father_name)

  const fetchTrending = async () => {
    const{data}  = await axios.get('api/auth/chapters',
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
        <CustomAppBar studentName={father_name} position="fixed"/>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:"10px"}}>
      <span style={{color:"black"}} className="pageTitle">
          <span style={{color:"green"}}>Welcome To Chapters.</span>   Choose Chapter to See your child`s practice.
          </span>
          <div>
            <img src="/img/maxresdefault.jpg" alt="" style={{width:"200px",marginRight:"20px"}} srcset="" />
          </div>
          </div>
          <div style={{textAlign:"center",color:"green"}}>......................</div>
          <div style={{color:"palevioletred",marginLeft:"10px",fontSize:"26px"}}>Chapters:</div>
        <div className="home" >
          {content && content.length > 0 ? (
          content.map((c) =>
          (
            <SingleContent
            key={c._id}  
            id={c._id}
            number={c.number}
            title={c.title}
            description={c.description}
            student_id={student_id}
            student_name={student_name}
            imageUrl={c.imageUrl}
            father_name = {father_name}
          />))

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

export default PracticeChapter;
