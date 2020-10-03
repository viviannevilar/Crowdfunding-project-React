import React from "react"
import RegisterForm from "../components/RegisterForm/RegisterForm"
import "./LoginPage.css"
import { Link } from "react-router-dom";

function RegisterPage() {
    return (
    <div id="form-container">
        <RegisterForm />
        <div className="form-footer">
            Already have an account? <Link to="/login/">Login Here</Link>
        </div>
    </div>
    )

}

export default RegisterPage;