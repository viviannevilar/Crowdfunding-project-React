import React, { useState } from "react"
import { useHistory, Link } from "react-router-dom"



// Button to confirm whether the person wants to delete the project
function DeleteConfirm(props) {

    //variables
    const { id, type } = props
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const history = useHistory();

    let otherType
    let urlAddress
    if (type === "project") {
        urlAddress = "project/" + id 
        otherType = "Project"
    } else {
        urlAddress = "users/" + id 
        otherType = "Account"
    }


    //delete button

    const deleteFunction = async (e) => {
        e.preventDefault();
        let token = window.localStorage.getItem("token");
    
        const response = await fetch(`${process.env.REACT_APP_API_URL}${urlAddress}/`, {
            method: "delete",
            headers: {
                Authorization: `Token ${token}`,
            },
        });

        if (type === "user") {
            window.localStorage.clear()
        }
        history.push("/")

    }


    return (
        <div>
            {(otherType === "Account") && <Link to={`/user/${id}/edit/`}><button className="mr-10 btn-small">Edit Profile</button></Link>}

            {deleteConfirm && <p >Are you sure you want to delete this {otherType}? You won't be able to recover it once you delete it</p>}   
            {deleteConfirm && <button className="mr-10 btn-50 btn-small btn-warning" onClick={deleteFunction}>Confirm</button>}
            {deleteConfirm && <button className="btn-50 btn-small" onClick={() => {setDeleteConfirm(false)}}>Cancel</button>}

    {!deleteConfirm && <button className="delete btn-small btn-warning" onClick={() => {setDeleteConfirm(true)}}>Delete {otherType}</button> }


        </div>
    )


}

export default DeleteConfirm