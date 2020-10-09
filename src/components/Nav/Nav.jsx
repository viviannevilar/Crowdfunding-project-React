import React, { useEffect, useState }  from "react"
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom"
import LoginControl from "../Helpers/LoginControl"
import "./Nav.css"

function Nav() {
    //variables
    //const { username } = props
    const location = useLocation()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [profile, setProfile] = useState("/")

    useEffect(() => {
        let username = window.localStorage.getItem("username")
        setProfile("/user/" + username + "/")
        console.log("thisUsername")
        if (username) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }

    }, [location]);


    // if (username) {
        return (
            <nav id="navbar">
                <div className="navbar-container">
                    <div className="h1-navbar">
                        <h1 ><Link to="/">go fund she</Link></h1>
                    </div>
                    
                    <ul className="nav-tabs">
                        <li><Link to="/">Home</Link></li>
                        {isLoggedIn && <li><Link to="/createproject"><div className="block">Create Project</div></Link></li>}
                        {isLoggedIn && <li><Link to={profile}><div className="block">Profile</div></Link></li>}
                        {/* <li><Link to="/createproject">Create Project</Link></li> */}
                        <li><LoginControl /></li>
                    </ul>
                </div>
            </nav>
        )
    // } else {
    //     return (
    //         <nav id="navbar">
    //             <div className="navbar-container">
    //                 <h1><Link to="/">go fund she</Link></h1>
    //                 <ul>
    //                     <li><Link to="/">Home</Link></li>
    //                     <li><LoginControl /></li>
                         
    //                 </ul>
    //             </div>
    //         </nav>
    //     )
    // }
    

}


export default Nav