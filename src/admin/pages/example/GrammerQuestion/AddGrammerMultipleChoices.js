import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Navigator from "../../../Navigator";

const AddGrammerMultipleChoices = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const chapter_id = location.state.chapter_id;
  const Skill_type = location.state.SkillType;
  const Question_type = location.state.Question_type;

  console.log(location.state);
  const [word, setWord] = useState("");
  const [answerWord, setAnswerWord] = useState("");

  const [answers, setAnswers] = useState([]);
  const [words, setWords] = useState([]);

  const [sentence, setSentence] = useState([]);
  const [sentenceAnswer, setSentenceAnswer] = useState([]);

  const [image, setImage] = useState('');

  const [message, setMessage] = useState("");

  const uploadProduct = async () => {
    let formData= new FormData();
    for (let i = 0; i < sentence.length; i++) {
      for (let j = 0; j < sentence[i].length; j++) {
        formData.append(`questions[${i}][]`, sentence[i][j]);
        formData.append(`choices[${i}][]`, sentenceAnswer[i][j]);
      }
    }
    formData.append('skillData','data');
    // formData.append('image', image);
    formData.append('image', image);

    console.log(formData);
    console.log(sentence);
    console.log(sentenceAnswer);
try
{
  const response = await axios.post(
    `http://127.0.0.1:8000/api/AddQuestion/${chapter_id}/${Question_type}/Grammer`,
    formData
  );
  if (response) {
    console.log(response);
    setMessage(response.message);
    setTimeout(() => {
      navigate("/admin", { state: { chapter_id: chapter_id } });
    }, 2000);
  }
}
catch(err)
{

  console.log(err.response);
}
    // console.log(sentence);
    // console.log(sentenceAnswer);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();      
    await uploadProduct();
    };  

  const handleNextWord = () => {
    setWords((prevWords) => [...prevWords, word]);
    setWord("");
  };

  const handleNextAnswer = () => {
    setAnswers((prevAnswers) => [...prevAnswers, answerWord]);
    setAnswerWord("");
  };

  const handleNextSentence = () => {
    console.log(words);
    console.log(answers);
    setSentence((prevSentence) => [...prevSentence, words]);
    setSentenceAnswer((prevSentenceAnswer) => [...prevSentenceAnswer, answers]);
    setWords([]);
    setAnswers([]);
    console.log("1");
    console.log(sentence);
    console.log(sentenceAnswer);
  };


  return (
    <React.Fragment>
      <div style={{marginRight:"30px"}}>
          <Navigator
            PaperProps={{ style: { width: "256" } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
      </div>
      <div className="container" style={{ marginLeft:"280px"}}>
        <div className="row">
          <div className="col-md-8 mt-4">
            <h5 className="mb-4">Add Grammar Multiple Choices Question</h5>
            <p className="text-warning">{message}</p>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3 row">
                <label className="col-sm-3">Question</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3"></label>
                <div className="col-sm-9">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleNextWord}
                  >
                    Next Word
                  </button>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3">Choices</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={answerWord}
                    onChange={(e) => setAnswerWord(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3"></label>
                <div className="col-sm-9">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleNextAnswer}
                  >
                    Next Answer Word
                  </button>
                </div>
              </div>

              <div className="mb-3 row">
              <label  className="col-sm-3">Chapter Image</label>
                <div className="col-sm-9">
                  <input type="file" name="image" className="form-control" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3"></label>
                <div className="col-sm-9">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleNextSentence}
                  >
                    Next Sentence
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>

  );
}

export default AddGrammerMultipleChoices;
