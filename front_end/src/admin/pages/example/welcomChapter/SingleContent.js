import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';


const SingleContent = ({
  id,
  title,
  description,
  imageUrl,
  SkillType,
}) => {

  // const [freeChapter,setFreeChapter] = useState(["64ca8fde9e755bfdea6280db"]);
  // const [lockedChapter,setLockedChapter] = useState(["64ca8fde9e755bfdea6280db"]);
  // const [chapter,setChapter] = useState([]);


  const navigete = useNavigate ();

  const goToSkill=()=> 
  {
    navigete("/GrammerQuestionList",{state :{id:id , SkillType:SkillType}});
    // navigete("/SkillPage",{state :{id:id}});
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
          <h3 className="title">{title}</h3>
          <h4 className="subTitle">{description}</h4>
          <img src={`http://127.0.0.1:8000/api/image/${id}`} alt=""/>
          {/* <HourglassBottomIcon className="lock-icon" style={{ fontSize:"200px" , color:"blue"}} /> */}
          </div>    
    </>
  );
};

export default SingleContent;