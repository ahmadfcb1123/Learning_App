import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navigator from "../../../Navigator";

function EditProduct() {
  const navigate = useNavigate();
  const location = useLocation();

  const id = location.state.id;
  const [message, setMessage] = useState("");

  const [inputs, setInputs] = useState({ title: "", description: "" });
  const [fileimage, setPhoto] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  };

  const uploadProduct = async () => {
    console.log(inputs.title);
    console.log(inputs.description);

    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("description", inputs.description);
    formData.append("image", fileimage);

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/editchapter/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage(response.data.message); //"message": "Product successfully updated.."
      console.log(response);
      setTimeout(() => {
        navigate("/chapters-page");
      }, 2000);
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadProduct();
  };

  useEffect(() => {
    getProduct();
  }, []);

  function getProduct() {
    axios.get(`http://127.0.0.1:8000/api/show/${id}`)
      .then(function (response) {
        console.log(response);
        const { title, description } = response.data;
        setInputs({ title, description });
      });
  }

  return (
    <React.Fragment>
      <div style={{marginRight:"30px"}}>
          <Navigator
            PaperProps={{ style: { width: "256" } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
          </div>
      <div className="container" style={{ marginLeft:"250px"}}>
        <div className="row">
          <div className="col-md-8 mt-4">
            <h5 className="mb-4">Edit Chapter</h5>
            <p className="text-success">
              <b>{message}</b>
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label className="col-sm-3">Chapter Title</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    value={inputs.title}
                    className="form-control"
                    name="title"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3">Chapter Description</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    value={inputs.description}
                    className="form-control"
                    name="description"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3">Chapter Image</label>
                <div className="col-sm-9">
                  <img
                    src={`http://127.0.0.1:8000/api/image/${id}`}
                    alt=""
                    height={50}
                    width={90}
                  />
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setPhoto(e.target.files[0])}
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
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EditProduct;