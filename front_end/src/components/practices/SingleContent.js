import { useNavigate } from "react-router-dom";
import "../SingleContent/SingleContent.css";

const SingleContent = ({
  id,
  number,
  title,
  description,
  student_id,
  student_name,
  imageUrl,
  father_name,
}) => {


  const navigete = useNavigate ();

  const goToSkill=()=> 
  {
    navigete("/skillsPractice",{state :{id:id,student_id:student_id,student_name:student_name,father_name:father_name}});
  }

  return (
    <div onClick={goToSkill}>
      <h2>Chapter <span>{number}</span></h2>
      <h3 className="title">{title}</h3>
      <span className="subTitle">{description}</span>
      <img src={`http://127.0.0.1:8000/api/image/${id}`} alt=""/>
    </div>
  );
};

export default SingleContent;