import React from "react"
import { Link } from "react-router-dom"
import LoginControl from "../Helpers/LoginControl"

function Nav() {


    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/project">Project</Link>
            <LoginControl />
        </nav>
    )
}


export default Nav