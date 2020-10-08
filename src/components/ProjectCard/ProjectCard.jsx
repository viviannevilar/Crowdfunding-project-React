import React from "react";
import { Link } from "react-router-dom"
import ProgressBar from "../Helpers/ProgressBar"
import "./ProjectCard.css"

function ProjectCard(props) {
    //variables
    const { projectData, image } = props;
    let completed

    if (projectData.tot_donated === 0) {
        completed = 0
    } else {
        completed = Math.round(projectData.goal/projectData.tot_donated)
    }

    

    function copyLink() {

        const linkText = "https://desolate-lake-14847.herokuapp.com/project/" + projectData.id + "/"

        navigator.clipboard.writeText(linkText)
       
        // /* Alert the copied text */
        // alert("Copied the text: " + linkText.value);
      }



    //template
    return (
        <div className="project-card">
            <Link to={`/project/${projectData.id}`}>
                <div className="pc-img-container">
                    <img alt="" className="project-img" src={image} />
                </div>
                <h3>{projectData.title}</h3>

            <div className="progressBarContainer">
                <ProgressBar completed={completed} goal={projectData.goal}/>
              </div>

            </Link>
            {/* <div className="card-link"> */}
                <button className="copy-link" onClick={copyLink}>Copy Link</button>
            {/* </div> */}
            
        </div>
    )
}

export default ProjectCard