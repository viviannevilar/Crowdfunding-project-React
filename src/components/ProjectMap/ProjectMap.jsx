import React from "react"
import ProjectCard from "../ProjectCard/ProjectCard"


// I want to be able to pass component as chidren so that I can use this function with other Cards, not just this Homepage ProjectCard
// may be helpful:
// https://stackoverflow.com/questions/25797048/how-to-pass-in-a-react-component-into-another-react-component-to-transclude-the

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



