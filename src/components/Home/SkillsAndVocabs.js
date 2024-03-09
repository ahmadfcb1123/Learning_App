import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomAppBar from "../Header/AppBar";

const SkillsAndVocabs = () => {

  const navigate = useNavigate();
  const Location = useLocation();
  const studName = localStorage.getItem('studentName');
  console.log(Location.state);
  const id = Location.state.id;
  const number = Location.state.chapter_number;
  const title = Location.state.title;
  const description = Location.state.description;
  console.log(id)
  console.log(number)
  
  const GotoVocabs = ()=>
  {
    navigate('/vocabulary',{state:{id:id,chapter_number:number,title:title}})
  }

  const GotoSkills = ()=>
  {
    navigate('/skills',{state:{id:id,chapter_number:number}})
  }

  const GotoGrammer = ()=>
  {
    navigate('/grammerDetail',{state:{id:id,chapter_number:number}})
  }
  const GoToSong = ()=>
  {
    navigate('/Song',{state:{id:id,chapter_number:number}})
  }

  return (
    <>
    <CustomAppBar studentName={studName} position="fixed"/>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"0px"}}>
          <span style={{color:"black"}} className="pageTitle">
          <span style={{color:"green"}}>Chapter : </span>   {title}
          <br />
          <span style={{color:"gray"}}>
          {description}
          </span>
          </span>
          <div>
          <img src={`http://127.0.0.1:8000/api/image/${id}`} alt="" style={{margin:"10px"}}/>
            {/* <img src="/img/prof.png" alt="" style={{width:"150px"}} srcset="" /> */}
          </div>
    </div>
    <div style={{textAlign:"center",color:"green"}}>......................</div>

    <div style={{display:"flex",justifyContent:"space-between"}}>
          <div style={{color:"palevioletred",marginLeft:"10px"}}>parts:</div>
    </div>
      <div className='Vocabs-Question'>
      <div onClick={GotoVocabs}>
          <h2>Vocabulary</h2>
          <h3>From here you can see the Vocabulary of chapter {number}</h3>
          <img src='/img/vocab.jpg' alt=""/>
          {/* <img src='/img/listening.jpg' alt=""/> */}
        </div>
        <div onClick={GotoSkills}>
          <h2>Skills</h2>
          <h3>Here you can Practice the Skills of this chapter</h3>
          <img src='/img/skills.jpg' alt=""/>
        </div>
        <div onClick={GotoGrammer}>
          <h2>Grammar</h2>
          <h3>Here you can See and Understand the grammar of this chapter</h3>
          <img src='/img/grammers.jpg' alt=""/>
        </div>
        <div onClick={GoToSong}>
          <h2>Song</h2>
          <h3>Here you can Listen to songs and enjoy it</h3>
          <img src='/img/song3.jpg' alt="" style={{height:"300px"}}/>
        </div>
      </div>
    </>
  );
}

export default SkillsAndVocabs;
