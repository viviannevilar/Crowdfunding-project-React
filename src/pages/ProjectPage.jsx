import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import PledgeForm from "../components/PledgeForm/PledgeForm"


function ProjectPage() {
    const [projectData, setProjectData] = useState({ pledges: [] });
    const { id } = useParams();
    
    useEffect(() => {
        let token = window.localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}project/${id}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            }
        })
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
            <h3>Goal: {projectData.goal}</h3>
            <h3>Published: {projectData.pub_date}</h3>
            <h3>Is open: {projectData.is_open}</h3>
            <h3>Category: {projectData.category}</h3>
            <h3>Duration: {projectData.duration}</h3>            
                                    


            <h3>{`Status: ${projectData.is_open}`}</h3>
            <h3>Pledges:</h3>
                <List items={projectData.project_pledges} fallback={"Be the first one to donate to this project!"} />

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
            if (item.anonymous) {
                return <div key={key}> ${item.amount} from anonymous </div>;
            } else {
                return <div key={key}> ${item.amount} from {item.supporter} </div>;
            }
        // return <div key={key}> ${item.amount} from {(!item.anonymous) ? {item.supporter} : "anonymous"} </div>;

      });
    }
  } 

//solution to the .map problem found here
//https://www.debuggr.io/react-map-of-undefined/