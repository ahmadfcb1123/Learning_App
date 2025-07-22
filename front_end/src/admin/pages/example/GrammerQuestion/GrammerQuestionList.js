import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import Navigator from "../../../Navigator";


const GrammerQuestionList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const chapter_id = location.state.id;
  const SkillType = location.state.SkillType;


  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProduct = () => {
      fetch(`http://127.0.0.1:8000/api/getgrammer/${chapter_id}`)
        .then(res => res.json())
        .then(response => {
          console.log(response.products);
          setProduct(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    };
    getProduct();
  }, []);

  const deleteProduct = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/productdelete/${id}`)
      .then(function(response) {
        console.log(response.data);
        alert("Successfully Deleted");
      });
  };

  const goToReorder = () => {
    navigate("/AddGrammerQuestion" , {state:{chapter_id:chapter_id,SkillType:SkillType,Question_type:'Reorder'}});
  };

  const goToChoices = () => {
    navigate("/AddGrammerMultipleChoices" , {state:{chapter_id:chapter_id,SkillType:SkillType,Question_type:'MultipleChoice'}});
  };


  return (
    <>
    <div style={{marginRight:"30px"}}>
          <Navigator
            PaperProps={{ style: { width: "256" } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
      </div>
    <div style={{ marginLeft:"230px"}}>
      <h1>welcom in {SkillType} Page </h1>
      <span style={{ marginLeft:"50px"}}>pleas Enter the Type of Question do you want to add it</span>
      <div style={{display:"flex" ,alignItems:"center" ,justifyContent:"center"}}>
      <button onClick={goToReorder}>ReOrder</button>
      <button onClick={goToChoices}>MultipleChoice Or True & false</button>
    </div>
    </div>
    </>
  );
}

export default GrammerQuestionList;
