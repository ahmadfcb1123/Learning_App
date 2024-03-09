import axios from "../../api/axios";
import CustomAppBar from "../Header/AppBar";
import "./Home.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";



const Skills = () => {


  const studName = localStorage.getItem("studentName");
  const navigate = useNavigate();
  const Location = useLocation();
  
  const GotoLestening = ()=>
  {
    // navigate("/ContinuePage",{state : {ListeningContent:ListeningContent}})
    navigate("/lestining",{state : {id:Location.state,skill_type:'Listening'}});

  }

  const GotoSpeaking = () =>
  {
    navigate("/Speaking",{state : {id:Location.state,skill_type:'Speaking'}});
  }
  
  const GotoReading = () =>
  {
    navigate("/Reading",{state : {id:Location.state,skill_type:'Reading'}});
  }
  const GotoGrammer = () =>
  {
    navigate("/grammer",{state : {id:Location.state,skill_type:'Grammer'}});
  }

  const GotoWriting = () =>
  {
    navigate("/Writing",{state : {id:Location.state,skill_type:'Writing'}});
  }
  return (
    <div>
      <CustomAppBar studentName={studName} position="fixed"/>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:"10px"}}>
      <span style={{color:"black"}} className="pageTitle">
          <span style={{color:"green"}}>Welcome To Skills.</span>   Choose Skill to start Quiz.
          </span>
          <div>
            <img src="/img/185.jpg" alt="" style={{width:"150px"}} srcset="" />
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
};

export default Skills;

