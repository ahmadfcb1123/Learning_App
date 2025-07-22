import axios from "../../api/axios";
import "../Home/Home.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomAppBar from "../Header/AppBar";


const SkillsPractice = () => {
  const navigate = useNavigate();
  const Location = useLocation();
  
  console.log(Location.state.student_name);
  const father_name = Location.state.father_name;
  
  const GotoLestening = ()=>
  {
    // navigate("/ContinuePage",{state : {ListeningContent:ListeningContent}})
    navigate("/practiceGroup",{state : {id:Location.state.id,skill_type:'Listening',student_id:Location.state.student_id,student_name:Location.state.student_name,father_name:father_name}});

  }

  const GotoSpeaking = () =>
  {
    navigate("/practiceGroup",{state : {id:Location.state.id,skill_type:'Speaking',student_id:Location.state.student_id,student_name:Location.state.student_name}});
  }
  
  const GotoReading = () =>
  {
    navigate("/practiceGroup",{state : {id:Location.state.id,skill_type:'Reading',student_id:Location.state.student_id,student_name:Location.state.student_name}});
  }
  const GotoGrammer = () =>
  {
    navigate("/practiceGroup",{state : {id:Location.state.id,skill_type:'Grammer',student_id:Location.state.student_id,student_name:Location.state.student_name}});
  }

  const GotoWriting = () =>
  {
    navigate("/practiceGroup",{state : {id:Location.state.id,skill_type:'Writing',student_id:Location.state.student_id,student_name:Location.state.student_name}});
  }
  return (
    <div>
            <CustomAppBar studentName={father_name} position="fixed"/>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:"10px"}}>
      <span style={{color:"black"}} className="pageTitle">
          <span style={{color:"green"}}>Welcome To Skills.</span>   Choose Skill
          </span>
          <div>
            <img src="/img/maxresdefault.jpg" alt="" style={{width:"200px",marginRight:"20px"}} srcset="" />
          </div>
          </div>
          <div style={{textAlign:"center",color:"green"}}>......................</div>
          <div style={{color:"palevioletred",marginLeft:"10px",fontSize:"26px"}}>Skills:</div>
      <div className="chapter_skills">
        <div onClick={GotoLestening}>
          <h2>Listening</h2>
          <p>let's lesten together</p>
          <img src='/img/listening.jpg' alt=""/>
        </div>
        <div onClick={GotoReading}>
          <h2>Reading</h2>
          <p>let's read together</p>
          <img src='/img/reading.jpg' alt=""/>
        </div>
        <div onClick={GotoSpeaking}>
          <h2>Speaking</h2>
          <p>let's learn how to words be</p>
          <img src='/img/speaking.jpg' alt=""/>
        </div>
        <div onClick={GotoGrammer}>
          <h2>Grammer</h2>
          <p>Let's play with grammar!</p>
          <img src='/img/grammer.png' alt=""/>
        </div>
        <div onClick={GotoWriting}>
          <h2>Writing</h2>
          <p>Let's write amazing stories</p>
          <img src='/img/writing.jpg' alt=""/>
        </div>
      </div>
    </div>
  );
}

export default SkillsPractice;
