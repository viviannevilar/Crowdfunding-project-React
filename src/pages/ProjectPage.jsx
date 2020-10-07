import React, { useState, useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import PledgeForm from "../components/PledgeForm/PledgeForm"
import ProgressBar from "../components/Helpers/ProgressBar"
import convertDateTime from "../components/Helpers/DateConverter"

function ProjectPage() {
    const [projectData, setProjectData] = useState({ pledges: [] });
    const { id } = useParams();

    const myLink = "/project/" + id + "/edit/"

    const username = window.localStorage.getItem("username")
    //const location = useLocation()
    let completed

    const [isLoading, setIsLoading] = useState(true)

    const [publishConfirm, setPublishConfirm] = useState(false)

    const [projError, setProjError] = useState()

    if (projectData.tot_donated === 0) {
        completed = 0
    } else {
        completed = Math.round(projectData.goal/projectData.tot_donated)
    }

    useEffect(() => {
        let token = window.localStorage.getItem("token");

        fetch(`${process.env.REACT_APP_API_URL}project/${id}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            }
        })
        // .catch((error) => {
        //     alert("you loser you haven't completed the form");
        // })
        .then((results) => {
            setProjError(results.status)
            return results.json();
        })
        .then((data) => {
            setProjectData(data);
            setIsLoading(false)
        })



    }, [id]);

    function Pledges() {
        if (projectData.is_open) {
            return (
            <div>
            <h3>Pledges:</h3>
                <List items={projectData.project_pledges} fallback={"Be the first one to donate to this project!"} />
            <PledgeForm project_id = {id}/>

            </div>
            )
        } else {
            return (
                
                <Link to={myLink}>Edit</Link>
                // <button type="submit" onClick={handleEdit}>
                //     Edit Draft
                // </button>
            )
        }
    }

    
    function handleEdit() {
        const myLink = "/project/" + {id} + "/edit/"
        console.log("handle edit");
        
        // history.push(myLink)
     };
    
    //publish button
    const publishProject = async (e) => {
        e.preventDefault();
        let token = window.localStorage.getItem("token");
 
        const response = await fetch(`${process.env.REACT_APP_API_URL}project/${id}/publish/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        });

        console.log(response)
        window.location.reload();
        return response.json();
    }

    if (isLoading) {
        return (
            <div>
                <img src={"https://www.dropbox.com/s/f1d134j7tbxrfol/Loading.gif?dl=0"}/>
            </div>
        )
    } else if (projError === 401) {
        return (
            <div>
                <h1>This project has not been published yet, and you don't have permission to see it. </h1>
            </div>
        )

    } else if (projectData.pub_date === null && projectData.owner == username ) {
        return (
            <div>
                <h1>This is a draft</h1>
                <h2>{projectData.title}</h2>
                <h3>Created at: {convertDateTime(projectData.date_created)}</h3>
                <h3>Goal: {projectData.goal}</h3>
                <h3>Published: {convertDateTime(projectData.pub_date)}</h3>
                <h3>Category: {projectData.category}</h3>
                <h3>Duration: {projectData.duration}</h3>      
                <h3>{`Status: ${projectData.is_open}`}</h3>      

                <button onClick={() => {setPublishConfirm(true)}}>Publish</button> 
                {publishConfirm && <button onClick={publishProject}>Confirm</button>}
                {/* <button onClick={publishProject}>Publish</button>  */}
            </div>
        )
    } else {
        return (
            <div>
                <h2>{projectData.title}</h2>
                <h3>Created at: {convertDateTime(projectData.date_created)}</h3>
                <h3>Goal: {projectData.goal}</h3>
                <h3>Published: {convertDateTime(projectData.pub_date)}</h3>
                <h3>Category: {projectData.category}</h3>
                <h3>Duration: {projectData.duration}</h3>      
                <h3>{`Status: ${projectData.is_open}`}</h3>      
    
                <div className="progressBarContainer">
                    <ProgressBar completed={completed} />
                </div>
    
                {/* <h3>Pledges:</h3>
                    <List items={projectData.project_pledges} fallback={"Be the first one to donate to this project!"} /> */}
    
                {Pledges()}
            </div>
        );
    }
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