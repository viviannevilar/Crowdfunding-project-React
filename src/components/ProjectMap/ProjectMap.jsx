import React from "react"
import ProjectCard from "../ProjectCard/ProjectCard"


// enumerates the projects in "projectList"
function ProjectMap(props) {

    const { projectList } = props

    return (
        <div className="wrapper">
            <div className="project-list">
    
                {projectList.map((projectData,key) => {
                    return (<ProjectCard 
                        key={key} 
                        projectData={projectData} 
                        image={projectData.image} 
                        showdrafts={false}/>
                        )
                    })
                }
    
            </div>
        </div>
    )

}

export default ProjectMap



