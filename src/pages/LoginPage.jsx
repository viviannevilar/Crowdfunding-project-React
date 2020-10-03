import React from "react"
import LoginForm from "../components/LoginForm/LoginForm"
import "./LoginPage.css"
import { Link } from "react-router-dom";
          

function LoginPage() {
    //const handleLoginClick = props

    return (
    <div id="form-container">
        <LoginForm  />
        <div className="form-footer">
            Don't have an account? <Link to="/register/">Register Here</Link>
        </div>
    </div>
    )

}         

export default LoginPage;