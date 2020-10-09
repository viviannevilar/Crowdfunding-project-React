import React, { useState } from "react"
import { useHistory } from "react-router-dom"



// Button to confirm whether the person wants to delete the project
function DeleteConfirm(props) {

    //variables
    const { id, type } = props
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const history = useHistory();

    let urlAddress
    if (type === "project") {
        urlAddress = "project/" + id 
    } else {
        urlAddress = "users/" + id 
    }

    //delete button

    const deleteFunction = async (e) => {
        e.preventDefault();
        let token = window.localStorage.getItem("token");
    
        const response = await fetch(`${process.env.REACT_APP_API_URL}${urlAddress}/`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        });

        console.log(response)
        if (type === "user") {
            window.localStorage.clear()
        }
        history.push("/")

    }


    return (
        <div>
            <button className="btn" onClick={() => {setDeleteConfirm(true)}}>Delete</button> 
            {deleteConfirm && <p >Are you sure you want to delete this {type}? You won't be able to recover it once you delete it</p>}   
            {deleteConfirm && <button className="btn-50" onClick={deleteFunction}>Confirm</button>}
            {deleteConfirm && <button className="btn-50" onClick={() => {setDeleteConfirm(false)}}>Cancel</button>}
        </div>
    )


}

export default DeleteConfirm