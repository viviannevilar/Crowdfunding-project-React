import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./RegisterForm.css"


function RegisterForm() {
  //variables
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null)

  const history = useHistory();

  //methods
  const handleChange = (e) => {
    const { id, value } = e.target;
    //-=console.log(e.target)
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const postData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/register/`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    // !response.ok -> console.error("Cann")
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
    
        postData().then((response) => {
            console.log(response)
            console.log(response.username)
            if (response.username === credentials.username) {
                console.log("Success")
                setErrorMessage("Account created successfully")
                setCredentials({password: "", username: ""})
                history.push("/")

            } else {
                console.log("response.username " + response.username)
                setErrorMessage(response.username)
                setCredentials({password: "", username: ""})
            }
            // if (response.status === 201) {
            //     history.push("/");
            // } else {
            //     setErrorMessage("something went wrong")
            //     setCredentials({password: ""})
            // }
        
 
        // console.log("Response token: " + response.token)
        // console.log("Response: " + response.ok)
       
      });
    }
  };

  return (
    <div className="form-wrap">
        <h1>Register</h1>
    <form>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          onChange={handleChange}
          value={credentials.username}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          onChange={handleChange}
          value={credentials.password}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Register
      </button>
    </form>
    {/* <p>{errorMessage != null ? {errorMessage} : null }</p> */}
    <div>
        {errorMessage != null ? <p className="error">{errorMessage}</p> : <></>}   
    </div>
     
    </div>
  );
}

export default RegisterForm;
