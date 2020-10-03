import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import PledgeForm from "../components/PledgeForm/PledgeForm"


function ProjectPage() {
    const [projectData, setProjectData] = useState({ pledges: [] });
    const { id } = useParams();
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}project/${id}`)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            setProjectData(data);
        });
    }, [id]);

    return (
        <div>
            <h2>{projectData.title}</h2>
            <h3>Created at: {projectData.date_created}</h3>
            <h3>{`Status: ${projectData.is_open}`}</h3>
            <h3>Pledges:</h3>
                <List items={projectData.project_pledges} fallback={"No pledges"} />

            <PledgeForm project_id = {id}/>
        </div>
    );
}

export default ProjectPage;


function List({ items, fallback }) {
    if (!items || items.length === 0) {
      return fallback;
    } else {
      return items.map((item, key) => {
        return <div key={key}> ${item.amount} from {item.supporter} </div>;
      });
    }
  }

//solution to the .map problem found here
//https://www.debuggr.io/react-map-of-undefined/