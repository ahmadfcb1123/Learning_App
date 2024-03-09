import { useNavigate } from "react-router-dom";
import "../SingleContent/SingleContent.css"
const SinglePractice = ({
  id,
  chapter_id,
  skill_type,
  answer,
  question_type,
  question,
  answer_state,
  student_id,
  score,
  total_score,
  name,
  father_name
}) => {


  const navigete = useNavigate ();

  const goToSkill=()=> 
  {
    if(skill_type === "Speaking")
    {
      navigete("/speakingPractice",{state :{id:id,answer:answer,question:question,answer_state:answer_state,question_type:question_type,score:score,total_score:total_score,father_name:father_name}});
    }
    else
    {
    navigete("/practiceDetails",{state :{id:id,answer:answer,question:question,answer_state:answer_state,question_type:question_type,score:score,total_score:total_score,father_name:father_name}});
    }
  }

  return (
    <div onClick={goToSkill}>
      <h2 className="title">this Question is {question_type} question</h2>
    </div>
  );
};

export default SinglePractice;