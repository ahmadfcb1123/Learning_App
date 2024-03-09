
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";



const SkillPage = () => {


  const navigate = useNavigate();
  const Location = useLocation();

  console.log(Location.state);
  
  const GotoLestening = ()=>
  {
    // navigate("/ContinuePage",{state : {ListeningContent:ListeningContent}})
    navigate("/lestining",{state : {id:Location.state.id,skill_type:'Listening'}});

  }

  const GotoSpeaking = () =>
  {
    navigate("/Speaking",{state : {id:Location.state.id,skill_type:'Speaking'}});
  }
  
  const GotoReading = () =>
  {
    navigate("/Reading",{state : {id:Location.state.id,skill_type:'Reading'}});
  }
  const GotoGrammer = () =>
  {
    navigate("/GrammerQuestionList",{state : {id:Location.state.id,skill_type:'Grammer'}});
  }

  const GotoWriting = () =>
  {
    navigate("/Writing",{state : {id:Location.state.id,skill_type:'Writing'}});
  }
  return (
    <div>
      <span className="pageTitle">Choos Skill</span>
      <div style={{display:"flex"}}>
        <div onClick={GotoLestening} style={{width:"20%" , border:"solid black",display:"flex" ,justifyContent: "center", borderRadius:"40px"}}>
          <h2>Listening</h2>
        </div>
        <div onClick={GotoReading} style={{width:"20%" , border:"solid black",display:"flex" ,justifyContent: "center", borderRadius:"40px"}}>
          <h2>Reading</h2>
        </div>
        <div onClick={GotoSpeaking} style={{width:"20%" , border:"solid black",display:"flex" ,justifyContent: "center", borderRadius:"40px"}}>
          <h2>Speaking</h2>
        </div>
        <div onClick={GotoGrammer} style={{width:"20%" , border:"solid black",display:"flex" ,justifyContent: "center", borderRadius:"40px"}}>
          <h2>Grammer</h2>
        </div>
        <div onClick={GotoWriting} style={{width:"20%" , border:"solid black",display:"flex" ,justifyContent: "center", borderRadius:"40px"}}>
          <h2>Writing</h2>
        </div>
      </div>
    </div>
  );
};

export default SkillPage;
