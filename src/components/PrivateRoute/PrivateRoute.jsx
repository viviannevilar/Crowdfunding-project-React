import { useHistory } from "react-router-dom"
//import fullpageloader

function PrivateRoute ({ path, ...props}) {
    //variables
    const history = useHistory();

    function isAuthenticated() {
        const token = window.localStorage.getItem("token");
        if (token != null) {
            return true;
        } else {
            return false;
        }
    }

    if (isAuthenticated()) {
        return props.children;
    } else {
        history.push("/login");
        return null;
    }
}



export default PrivateRoute