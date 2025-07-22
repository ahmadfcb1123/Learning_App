import axios from 'axios';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Employee() {
  const [selectedFile, setSelectedFile] = useState();
  const [id, setId] = useState('');
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [image, setPhoto] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    Load();
  }, []);

  async function Load() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/chapters");
      console.log(response.data);
      setEmployees(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/addChapter", {
        title: name,
        description: address,
        image: image
      });
      alert("Employee Registration Successful");
      setId("");
      setName("");
      setAddress("");
      setPhoto("");
      Load();
    } catch (err) {
      alert("Employee Registration Failed");
      console.error(err);
    }
  }

  function editEmployee(employee) {
    setName(employee.name);
    setAddress(employee.address);
    setPhoto(employee.mobile);
    setId(employee.id);
  }

  async function deleteEmployee(id) {
    try {
      await axios.delete("http://127.0.0.1:8000/api/delete/" + id);
      alert("Employee deleted successfully");
      Load();
    } catch (err) {
      console.error(err);
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      const employeeToUpdate = employees.find(u => u.id === id);
      if (!employeeToUpdate) {
        alert("Employee not found");
        return;
      }
      await axios.put("http://127.0.0.1:8000/api/update/" + employeeToUpdate.id || id, {
        id: id,
        name: name,
        address: address,
        mobile: image
      });
      alert("Registration updated successfully");
      setId("");
      setName("");
      setAddress("");
      setPhoto("");
      Load();
    } catch (err) {
      alert("Registration update failed");
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Chapters</h1>
      <div className="container">
            <div className="row">
              <div className="col-md-8 mt-4">
                <h5 className="mb-4">Add Chapter </h5> 
                    <form >             
                    <div className="mb-3 row">
                    <label  className="col-sm-3">Chapter Title </label>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" onChange={ (e)=>setName(e.target.value)}/>
                    </div>
                    </div>
 
                    <div className="mb-3 row">
                    <label  className="col-sm-3">Chapter Description </label>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" onChange={(e)=>setAddress(e.target.value)}  />
                    </div>
                    </div>
 
                    <div className="mb-3 row">
                    <label  className="col-sm-3">Chapter Image</label>
                    <div className="col-sm-9">
                    <input type="file" className="form-control" onChange={(e)=>setPhoto(e.target.files[0])} />
                    </div>
                    </div>
                    <div>
              <button   class="btn btn-primary mt-4"  onClick={save}>Register</button>
              <button   class="btn btn-warning mt-4"  onClick={update}>Update</button>
              </div> 
                    </form>
        </div>
      </div>  
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td>{employee.title}</td>
              <td>{employee.description}</td>
              <td><img src={`http://127.0.0.1:8000/api/image/${employee._id}`} alt="" height={50} width={90} /></td>
              <td>
                <button type="button" className="btn btn-warning" onClick={() => editEmployee(employee)}>Edit</button>
                <button type="button" className="btn btn-danger" onClick={() => deleteEmployee(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </div>
    </div>
  );
}

export default Employee;