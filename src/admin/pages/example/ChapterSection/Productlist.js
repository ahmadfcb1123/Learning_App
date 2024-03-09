import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navigator from "../../../Navigator";

const drawerWidth = 256;


function Productlist()
{ 

  const navigate = useNavigate();
    const[product, setProduct]= useState([]);
     
    useEffect( ()=>{
        const getProduct= ()=>{
            fetch("http://127.0.0.1:8000/api/chapters")
            .then(res=>{ return res.json()})
            .then(response=>{ 
                console.log(response.products)
                setProduct(response.data)
            })
            .catch(error=>{ console.log(error)});
        }
        getProduct();
    },[]);
  
   
    const deletChapter = (id) => {
        axios.post(`http://127.0.0.1:8000/api/deleteChapter/${id}`).then(function(response){
            console.log(response.data);
            alert("Successfully Deleted");
        });
    }

    const Add = () => 
    {
      navigate("/add");
    }


    const AddVocabs = (id) =>
    {
      navigate("/vocabulary-page",{state:{chapter_id:id}});
    }

    const AddGramm = (id) =>
    {
      navigate("/grammar-page",{state:{chapter_id:id}});
    }

    const Edit = (id) =>
    {
      navigate("/editproduct" , {state:{id:id}})
    }

    return(
        <React.Fragment>
          <div style={{marginRight:"30px"}}>
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
          </div>
            <button onClick={Add} className="btn btn-active">Add Chapter</button>
            <div className="container container_overflow">
                <div className="row">
                    <div className="col-12">
                        <h5 className="mb-4">Chapter List</h5> 
                        <p className="text-danger"> </p>                 
                                <table className="table table-bordered" style={{whiteSpace: "none",maxWidth: "120%", marginLeft:"130px"}}>
                                <thead>
                                <tr>
                                <th scope="col">Chapter Id</th>
                                <th scope="col">Chapter Title</th>
                                <th scope="col">Chapter Description</th>
                                <th scope="col">Chapter Image</th>
                                <th scope="col" width="200">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        product.map((pdata, index)=>(
                                            <tr key={index}>
                                            <td>{pdata._id } </td>
                                            <td>{pdata.title } </td>
                                            <td>{pdata.description} </td>
                                            <td><img src={`http://127.0.0.1:8000/api/image/${pdata._id}`} alt="" height={50} width={90} /></td>
                                            <td>
                                                <button onClick={() => Edit(pdata._id)} className="btn btn-success mx-2">Edit</button>
                                                <button onClick={() => deletChapter(pdata._id)} className="btn btn-danger">Delete</button>
                                                <button onClick={()=> AddVocabs(pdata._id)} className="btn btn-alert">Add Vocabs</button>
                                                <button onClick={()=> AddGramm(pdata._id)} className="btn btn-success">Add Grammer</button>
                                            </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                </table>  
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default Productlist;