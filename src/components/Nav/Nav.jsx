import React from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import LoginControl from "../Helpers/LoginControl"
import "./Nav.css"

function Nav(props) {
    //variables
    const { username } = props

    let loggedInUser = window.localStorage.getItem("username")

    function changeUsername() {
        console.log("function changeUsername")
    }
    //const [thisUsername, setThisUsername] = useState()
    // let loggedInUser = window.localStorage.getItem("username")

    // useEffect(() => {
    //     console.log("This Username changed: ",thisUsername)
    // }, [thisUsername]
    // )

    if (username) {
        return (
            <nav id="navbar">
                <div className="navbar-container">
                    <h1><Link to="/">go fund she</Link></h1>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/createproject">Create Project</Link></li>
                    <li><LoginControl /></li>
                </ul>

                {/* <p>{username}</p> */}
                </div>
            </nav>
        )
    } else {
        return (
            <nav id="navbar">
                <div className="navbar-container">
                    <h1><Link to="/">go fund she</Link></h1>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><LoginControl /></li>
                            {/* <p>{username}</p> */}
                    </ul>
                </div>
            </nav>
        )
    }
    

}


export default Nav