import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Navigator from "../../../Navigator";

const AddGrammer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const chapter_id = location.state.chapter_id;

  const [title, settitle] = useState("");
  const [translate, setTranslate] = useState("");
  const [explain, setExplain] = useState("");
  const [image, setImage] = useState(null);
  const [vocabs, setVocabs] = useState([]);

  const [message, setMessage] = useState("");

  const uploadProduct = async () => {

    const formData = new FormData();
    formData.append("grammer", JSON.stringify(vocabs));
    formData.append("image", image);
    console.log(vocabs);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/addGrammers/${chapter_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      settitle("");
      setExplain("");
      setTranslate("");

      if (response) {
        console.log(response.data);
        setMessage(response.data.message);
        setTimeout(() => {
          navigate("/grammar-page", { state: { chapter_id: chapter_id } });
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleNext();
    await uploadProduct();
  };

  const handleNext = () => {
    setVocabs([...vocabs, [title, translate, explain]]);
    settitle("");
    setTranslate("");
    setExplain("");
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
            <h5 className="mb-4">Add Grammers</h5>
            <p className="text-warning">{message}</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label className="col-sm-3">Title</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3">Translate</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={translate}
                    onChange={(e) => setTranslate(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3">Explain</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={explain}
                    onChange={(e) => setExplain(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3">Video</label>
                <div className="col-sm-9">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3"></label>
                <div className="col-sm-9">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          <button type="button" className="btn btn-danger" onClick={handleNext}>Next</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddGrammer;