import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import Navigator from "../../../Navigator";


const GrammerList = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const chapter_id = location.state.chapter_id;
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

  const Add = () => {
    navigate("/addGrammer" , {state:{chapter_id:chapter_id}});
  };



  return (
    <React.Fragment>
        <div style={{marginRight:"30px"}}>
          <Navigator
            PaperProps={{ style: { width: "256" } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
        </div>
      <button onClick={Add} className="btn btn-active">Add Grammers</button>
      <div className="container container_overflow">
        <div className="row">
          <div className="col-12">
            <h5 className="mb-4" style={{marginLeft:"110px"}}>Grammers List</h5>
            <p className="text-danger"></p>
            <table className="table table-bordered" style={{ whiteSpace: "none", maxWidth: "120%" ,  marginLeft:"130px"}}>
              <thead>
                <tr>
                  <th scope="col">grammer Id</th>
                  <th scope="col">title</th>
                  <th scope="col">Translat</th>
                  <th scope="col">Explain</th>
                  <th scope="col" width="200">Action</th>
                </tr>
              </thead>
              <tbody>
                {product.map((pdata, index) => (
                  <React.Fragment key={index}>
                    {pdata.grammer.map((word, wordIndex) => (
                      <tr key={wordIndex}>
                        <td>{word._id}</td>
                        <td>{word[0]}</td>
                        <td>{word[1]}</td>
                        <td>{word[2]}</td>                        
                        <td>
                          <Link to={`/editproduct/${pdata.id}/edit`} className="btn btn-success mx-2">Edit</Link>
                          <button onClick={() => deleteProduct(pdata.id)} className="btn btn-danger">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default GrammerList;
