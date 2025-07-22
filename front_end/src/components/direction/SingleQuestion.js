import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SingleQuestion = ({
  id,
  type,
  Question,
  chapter_id,
  skill_type,
  number,
  questions,
}) => {


  const navigete = useNavigate ();
 
  const goToQuestions=()=> 
  {
    if (type === "MultipleChoice")
    {
    navigete("/ChoiseQuestion",{state : {Question_id:id,Question:Question,id:chapter_id,skill_type:skill_type,Question_number:number}});
    }
    else if (type === "TrueFalse")
    {
    navigete("/TrueFalseqQuestion",{state :{}});
    }
    else if (type === "Matching")
    {
    navigete("/test",{state :{Question:questions,id:chapter_id,skill_type:skill_type,Question_id:id,Question_number:number}});
    }
    else if (type === "LookingAndWriting")
    {
    navigete("/LookAndWrite",{state :{Question:questions,id:chapter_id,skill_type:skill_type,Question_id:id,Question_number:number}});
    }
    else if (type === "Reorder")
    {
      navigete("/ReorderTest",{state : {Question:Question,id:chapter_id,skill_type:skill_type,Question_id:id,Question_number:number}});
    }
  }

  return (
    <div onClick={goToQuestions}>
      <h2>{skill_type} Question {number}:</h2>
      <h3 className="title">let's try to solve this question</h3>
      <h5>click here to move to challenge</h5>
    </div>
  );
};
export default SingleQuestion;




// <Card sx={{ minWidth: 275 }}>
// <CardContent>
//   <Typography  variant="h5"  color="text.secondary" gutterBottom>
//     {skill_type} Question {number}:
//   </Typography>
//   <Typography variant="body2">
//     let's try to solve this question 
//   </Typography>
//   <Typography variant="body2">
//     click on it to go to challenge
//   </Typography>
// </CardContent>
// </Card>