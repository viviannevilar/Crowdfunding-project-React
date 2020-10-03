import React, { useState } from "react"
import { useHistory } from "react-router-dom";

function LoginControl () {

    const history = useHistory();
    const [isLoggedIn, setIsLoggedIn] = useState(false)
 
    function handleLoginClick() {
        //setIsLoggedIn(true);
        history.push("/login/");
    }
  
    function handleLogoutClick() {
        setIsLoggedIn(false);
        console.log("log off");
        window.localStorage.clear();
    }
  
    let button;
    if (isLoggedIn) {
        button = <LogoutButton onClick={handleLogoutClick} />;
    } else {
        button = <LoginButton onClick={handleLoginClick} />;
    }
  
      return (
        <div>
            {button}
        </div>
      );
    }
export default LoginControl


function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    );
  }
  
function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
  }