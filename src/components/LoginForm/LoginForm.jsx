import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LoginForm.css"


function LoginForm() {
  //variables
  //const handleLoginClick = props

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
      `${process.env.REACT_APP_API_URL}api-token-auth/`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      postData().then((response) => {
        //console.log(response);
        window.localStorage.setItem("token", response.token);
        window.localStorage.setItem("username", credentials.username)

        if (response.token != null) {
           //handleLoginClick
           history.push("/");
           
        } else if (response.non_field_errors) {
            console.log(response.non_field_errors)
            setErrorMessage(response.non_field_errors)
            setCredentials({password: ""})
        }
      
      });
    }
  };

  return (
    <div className="form-wrap">
        <h1>Login</h1>
    <form>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          onChange={handleChange}
          //value={credentials.username}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          onChange={handleChange}
          value={credentials.password}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Login
      </button>
    </form>

    {errorMessage != null ? <p>{errorMessage}</p> : null}
    </div>
  );
}

export default LoginForm;
