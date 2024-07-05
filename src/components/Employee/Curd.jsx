import React, { useEffect, useState } from "react";
import { Employee } from "../../Employee";

function Curd() {
  const [data, setData] = useState([]);
  const [ firstName, setFirstName] = useState("");
  const [ lastName, setLastName] = useState("");
  const [ age, setAge] = useState(0);
  const [ id, setId] = useState(0);
  const [ isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(Employee);
  }, []);

  const handleEdit = (id) => {
    const dt = data.filter((item) => item.id === id);
    if (dt !== undefined) 
      {
      setIsUpdate(true);
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }         
  };

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure to delete this item?")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
      }
    }
  };

  const handlesave = (e) => {
    let error = "";

    if(firstName === '')
      error += 'first name is required,'

    if(lastName === '')
      error += 'last name is required,'

    if(age <= 0)
      error += 'age is required.'

    if(error === ''){
      e.preventDefault();
      const dt = [...data]
      const newObject = {
        id : Employee.length + 1,
        firstName : firstName,
        lastName  : lastName,
        age  : age
      }
      dt.push(newObject);
      setData(dt);
    }
    else{
      alert(error)
    }
   
  };

  const handleupdate = () => {
    const index = data.map((item) => {
      return item.id
    }).indexOf(id)

    const dt = [...data]
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].age = age;

     setData(dt);
     handleclear();
  };

  const handleclear = () => {
    setId(0);
    setFirstName("");
    setLastName("");
    setAge("");
    setIsUpdate(false)
  };

  useEffect(() => {
    const  data = JSON.parse(localStorage.getItem("data"))

    if(data && data.length > 0){
      setData(data)
    }
  }, [])

    useEffect(()=> {
      localStorage.setItem("data", JSON.stringify(data))
    }, [data])

  return (
    <div style={{margin: '50px 30px', }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          marginBottom: "10px",
          gap: "10px",
        }}
      >
        <div>
          <label>
            First Name :
            <input
              type="text"
              placeholder="Enter Your First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              style={{border: '2px solid black', borderRadius: '4px'}}
            />
          </label>
        </div>
        <div>
          <label>
            Last Name :
            <input
              type="text"
              placeholder="Enter Your Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              style={{border: '2px solid black', borderRadius: '4px'}}
            />
          </label>
        </div>
        <div>
          <label>
            Age :
            <input
              type="text"
              placeholder="Enter Your Age"
              onChange={(e) => setAge(e.target.value)}
              value={age}
              style={{border: '2px solid black', borderRadius: '4px'}}
            />
          </label>
        </div>
        {
          !isUpdate ? 
          <button className="btn btn-primary" onClick={(e) => handlesave(e)}>
          Save
        </button>
        :
        <button className="btn btn-primary" onClick={() => handleupdate()}>
        Update
      </button>
        }
        <button className="btn btn-danger" onClick={() => handleclear()}>
          Clear
        </button>
      </div>

      <table className="table table-hover" style={{ textAlign: "center" }}>
        <thead>
          <tr>
          <td>Sr.no</td>
          <td>Id</td>
          <td>First Name</td>
          <td>Last Name</td>
          <td>Age</td>
          <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {
          data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Curd;
