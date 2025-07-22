import { useNavigate } from "react-router-dom";
import "./SingleContent.css";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';


const SingleContent = ({
  id,
  number,
  title,
  description,
  imageUrl,
  stud_Id,
}) => {

  // const [freeChapter,setFreeChapter] = useState(["64ca8fde9e755bfdea6280db"]);
  // const [lockedChapter,setLockedChapter] = useState(["64ca8fde9e755bfdea6280db"]);
  // const [chapter,setChapter] = useState([]);


  const navigete = useNavigate ();

  const goToSkill=()=> 
  {
    navigete("/SkillsAndVocabs",{state :{id:id,chapter_number:number,title:title,description:description}});
  }


  return (
    <>

          <div onClick={goToSkill} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #fff",
            boxShadow: "1px 1px 5px 1px green",
            }}>
          <h2>Chapter <span>{number}</span></h2>
          <h3 className="title">{title}</h3>
          <h4 className="subTitle">{description}</h4>
          <img src={`http://127.0.0.1:8000/api/image/${id}`} alt=""/>
          {/* <HourglassBottomIcon className="lock-icon" style={{ fontSize:"200px" , color:"blue"}} /> */}
          </div>    
    </>
  );
};

export default SingleContent;