//import { useHistory } from "react-router-dom";
import React from "react"


function PublishButton() {

    // function submit() {
    //    //alert("blah")
    //    window.confirm()
    // }

    function confirmed() {
        console.log("clicked")        
       }
    // function handleSubmit() {
    //     console.log("Submit")
    // }


    return (
        // <div className='container'>
        //     <button onClick={submit}>Confirm dialog</button>
        // </div>
        <div className='container'>
        <button onClick={() => {if(window.confirm('Delete the item?')){confirmed()}}}>Confirm dialog</button>
    </div>
    )
}

export default PublishButton

