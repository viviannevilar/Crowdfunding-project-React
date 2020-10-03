import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
//import fullpageloader


function PrivateRoute ({ path, ...props}) {
    //variables
    //const [loading, setLoading] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    const history = useHistory();

    const isAuthenticated = () => {
        const token = window.localStorage.getItem("token");
        console.log(token)
        if (token != null) {
            console.log("is athenticated = true")
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        if (isAuthenticated()) {
            console.log("useeffect is authenticated true")
            //setLoading(false)
            setLoggedIn(true)
            } else {
            //setLoading(false)
            }
        }, []);

    console.log("check for LoggedIn: " + loggedIn)
    // if (loading) {
    //     return <FullPageLoader />
    // }

    console.log("loggedIn: " + loggedIn)
    if (loggedIn) {
        return props.children;
    } else {
        history.push("/login");
        return null;
    }

}



export default PrivateRoute