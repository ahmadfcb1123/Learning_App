import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Navigator from "../../../Navigator";

const AddVocabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const chapter_id = location.state.chapter_id;

  const [word, setWord] = useState('');
  const [translate, setTranslate] = useState('');
  const [example, setExample] = useState('');
  const [exTranslate, setExTranslate] = useState('');
  const [vocabs, setVocabs] = useState([]);

  const [message, setMessage] = useState('');

  const uploadProduct = async () => {
    const response = await axios.post(`http://127.0.0.1:8000/api/addVocabs/${chapter_id}`, {
      words: vocabs,
    });

    setWord('');
    setExample('');
    setTranslate('');
    setExTranslate('');

    if (response) {
      console.log(response);
      setMessage(response.message);
      setTimeout(() => {
        navigate("/vocabulary-page", { state: { chapter_id: chapter_id } });
      }, 2000);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadProduct();
  }

  const handleNext = () => {
    setVocabs([...vocabs, [word, translate, example, exTranslate]]);
    setWord('');
    setTranslate('');
    setExample('');
    setExTranslate('');
  }

  return (
    <React.Fragment>
      <div style={{marginRight:"30px"}}>
          <Navigator
            PaperProps={{ style: { width: "256" } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
      </div>
      <div className="container" style={{ marginLeft:"230px"}}>
        <div className="row">
          <div className="col-md-8 mt-4">
            <h5 className="mb-4">Add Vocabs</h5>
            <p className="text-warning">{message}</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label className="col-sm-3">Word</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" value={word} onChange={(e) => setWord(e.target.value)} />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3">Translate</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" value={translate} onChange={(e) => setTranslate(e.target.value)} />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3">Example</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" value={example} onChange={(e) => setExample(e.target.value)} />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3">Example Translate</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" value={exTranslate} onChange={(e) => setExTranslate(e.target.value)} />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3"></label>
                <div className="col-sm-9">
                  <button type="submit" className="btn btn-success">Submit</button>
                </div>
              </div>
            </form>
            <button type="button" className="btn btn-danger" onClick={handleNext}>Next</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddVocabs;