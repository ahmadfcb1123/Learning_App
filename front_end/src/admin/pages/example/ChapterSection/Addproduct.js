import React, { useState } from "react";
 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigator from "../../../Navigator";
 


function Addproduct()
{  
    const navigate = useNavigate();
     
    const[txtname, setName]= useState('');
    const[txtdescription, setdescription]= useState('');
    const[image, setPhoto]= useState('');
    const[message, setMessage]= useState('');
 
    const uploadProduct= async()=>{
        console.log(image)
        const formData= new FormData();
        formData.append('title', txtname);
        formData.append('description',txtdescription);
        formData.append('image', image);
        const responce= await axios.post("http://127.0.0.1:8000/api/addChapter", formData, {
            headers:{'Content-Type':"multipart/form-data"},
        } );
 
        if(responce)
        {
            console.log(responce)
            setMessage(responce.message); //"message": "Product successfully created."
            setTimeout(()=>{
                navigate('/chapters-page');
            }, 2000);
        }
    }
 
    const handleSubmit= async(e)=>{
      e.preventDefault();
      await uploadProduct();
 
   }

   
    return(
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
                <h5 className="mb-4">Add Chapter </h5> 
                <p className="text-warning">{ message}</p>                              
                    <form onSubmit={ handleSubmit}>             
                    <div className="mb-3 row">
                    <label  className="col-sm-3">Chapter Title </label>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" onChange={ (e)=>setName(e.target.value)}/>
                    </div>
                    </div>
 
                    <div className="mb-3 row">
                    <label  className="col-sm-3">Chapter Description </label>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" onChange={(e)=>setdescription(e.target.value)}  />
                    </div>
                    </div>
 
                    <div className="mb-3 row">
                    <label  className="col-sm-3">Chapter Image</label>
                    <div className="col-sm-9">
                    <input type="file" className="form-control" onChange={(e)=>setPhoto(e.target.files[0])} />
                    </div>
                    </div>
 
                    <div className="mb-3 row">
                    <label className="col-sm-3"></label>
                    <div className="col-sm-9">
                    <button type="submit" className="btn btn-success">Submit</button>
                    </div>
                    </div>
 
                    </form>
 
            </div>
            </div>
        </div>
    </React.Fragment>
    );
}
export default Addproduct;