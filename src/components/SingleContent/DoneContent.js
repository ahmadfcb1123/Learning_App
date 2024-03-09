import { useNavigate } from "react-router-dom";
import "./SingleContent.css";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

const SingleContent = ({
  id,
  number,
  title,
  description,

}) => {


  const navigete = useNavigate ();

  const goToSkill=()=> 
  {
    navigete("/SkillsAndVocabs",{state :{id:id,chapter_number:number}});
  }


  return (
    <>

      <div onClick={goToSkill}>
          <h2>Chapter <span>{number}</span></h2>
          <h3 className="title">{title}</h3>
          <h4 className="subTitle">{description}</h4>
        <div className="image-container">
          <img src={`http://127.0.0.1:8000/api/image/${id}`} alt=""/>
          <DoneOutlineIcon className="lock-icon" style={{ fontSize:"125px" , color:"green"}} />
        </div> 
      </div>    
    </>
  );
};

export default SingleContent;