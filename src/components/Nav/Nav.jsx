import React from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import LoginControl from "../Helpers/LoginControl"

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
            <nav>
                <Link to="/">Home</Link>
                <Link to="/createproject">Create Project</Link>
                <LoginControl />
                <p>{username}</p>
            </nav>
        )
    } else {
        return (
            <nav>
                <Link to="/">Home</Link>
                <Link to="/project">Project</Link>
                <LoginControl />
                {/* <p>{username}</p> */}
            </nav>
        )
    }
    

}


export default Nav