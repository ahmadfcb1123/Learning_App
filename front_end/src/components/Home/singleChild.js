import { useNavigate } from "react-router-dom";
import "../SingleContent/SingleContent.css";

const SingleChild = ({
  id,
  Firstname,
  Lastname,
  fatherName,
}) => {


  const navigete = useNavigate ();

  const goToSkill=()=> 
  {
    navigete("/chapterPractice",{state :{student_id:id,name:Firstname,fatherName:fatherName}});
  }

  return (
    <div onClick={goToSkill}>
      <h2>Welcom here <span>{fatherName}</span></h2>
      <b className="title">From here practice of Your Child {Firstname}</b>
    </div>
  );
  }

export default SingleChild;