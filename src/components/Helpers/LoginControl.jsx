import React, { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom";

function LoginControl () {

    const history = useHistory();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false)
 
    function handleLoginClick() {
        history.push("/login/")
    }
  
    function handleLogoutClick() {
        setIsLoggedIn(false);
        window.localStorage.clear();
        history.push("/login/");
    }
    
    useEffect(() => {
        const token = window.localStorage.getItem("token");
        token != null ? setIsLoggedIn(true) : setIsLoggedIn(false);
    }, [location]);

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