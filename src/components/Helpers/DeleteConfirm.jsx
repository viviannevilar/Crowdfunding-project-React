import React, { useState } from "react"
import { useHistory } from "react-router-dom"


// Button to confirm whether the person wants to delete the project
function DeleteConfirm(props) {

    //variables
    const { id } = props
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const history = useHistory();

    //delete button

    const deleteProject = async (e) => {
        e.preventDefault();
        let token = window.localStorage.getItem("token");
    
        const response = await fetch(`${process.env.REACT_APP_API_URL}project/${id}/`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        });

        console.log(response)
        history.push("/")
    }


    return (
        <div>
            <button className="btn" onClick={() => {setDeleteConfirm(true)}}>Delete</button> 
            {deleteConfirm && <p >Are you sure you want to delete this project? You won't be able to recover it once you delete it</p>}   
            {deleteConfirm && <button className="btn-50" onClick={deleteProject}>Confirm</button>}
            {deleteConfirm && <button className="btn-50" onClick={() => {setDeleteConfirm(false)}}>Cancel</button>}
        </div>
    )


}

export default DeleteConfirm