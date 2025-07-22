import React from 'react';
import Navigator from '../Navigator';
import axios from 'axios';
import {useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

const drawerWidth = 256;

const Vocabularies = () => {


  const location = useLocation();

  const chapter_id = location.state.chapter_id;
  console.log(chapter_id);

  const [selectedFile, setSelectedFile] = useState();


  const [id, setId] = useState('');
  const [word, setWord] = useState("");
  const [employees, setUsers] = useState([]);

useEffect(() => {
  (async () => await Load())();
  }, []);

  async function  Load()
  {
    const result = await axios.get(
        `http://127.0.0.1:8000/api/getVocabs/${chapter_id}`);
        setUsers(result.data.data);
        console.log(result.data);
  }

    
    async function save(event)
    {
        event.preventDefault();
    try
        {
        await axios.post(`http://127.0.0.1:8000/api/addVocabs/${chapter_id}`,        {
        word_Meaning_sentence:word
        });
          alert("Employee Registation Successfully");
          setId("");
          setWord("");
          Load();        
        }
    catch(err)
        {
          alert("User Registation Failed");
        }
  }
  // async function editEmployee(employees)
  // {
  //   setName(employees.name);
  //   setAddress(employees.address);
  //   setMobile(employees.mobile); 

  //   setId(employees.id);
    
  // }



  async function DeleteEmployee(id)
  {
      
        await axios.delete("http://127.0.0.1:8000/api/delete/" + id); 
        alert("Employee deleted Successfully");
        Load();
  
  }



  // async function update(event)
  // {    
  //   event.preventDefault();

  // try
  //     {
        
  //       await axios.put("http://127.0.0.1:8000/api/update/"+ employees.find(u => u.id === id).id || id,
  //     {
  //       id: id,
  //       name: name,
  //       address: address,
  //       mobile: mobile
      
  //     });
  //       alert("Registation Updateddddd");
  //       setId("");
  //       setName("");
  //       setAddress("");
  //       setMobile("");
  //       Load();
      
  //     }
  // catch(err)
  //     {
  //       alert("User Registation Failed");
  //     }
  // }

  return (
    <div>
      <h1>Vocabularies</h1>
      <div class="container mt-4" >
          <form>
              <div class="form-group">
              <input  type="text" class="form-control" id="employee_id" hidden
              value={id}
              onChange={(event) =>
                {
                  setId(event.target.value);      
                }}
              
              />
                <label>Word</label>
                <input  type="text" class="form-control" id="employeeName"
                value={word}
                onChange={(event) =>
                  {
                    setWord(event.target.value);      
                  }}
                />
              </div>

                <div>
              <button   class="btn btn-primary mt-4"  onClick={save}>Register</button>
              <button   class="btn btn-warning mt-4"  >Update</button>
              </div>   
            </form>
          </div>
          <table class="table table-dark" align="center">
  <thead>
    <tr>
      <th scope="col">word Id</th>
      <th scope="col">word</th>
      <th scope="col">Option</th>
    </tr>
  </thead>
      {employees.map(function fn(employee)
      {
            return(
            <tbody>
                <tr>
                <th scope="row">{employee._id} </th>
                <td>{employee.word_Meaning_sentence}</td>       
                <td>
                    <button type="button" class="btn btn-warning"  >Edit</button>  
                    <button type="button" class="btn btn-danger" onClick={() => DeleteEmployee(employee.id)}>Delete</button>
                </td>
                </tr>
            </tbody>
            );
            })}
            </table>
    </div>
  );
}

export default Vocabularies;
