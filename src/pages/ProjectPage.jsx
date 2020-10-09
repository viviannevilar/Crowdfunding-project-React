import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import PledgeForm from "../components/PledgeForm/PledgeForm"
import ProgressBar from "../components/Helpers/ProgressBar"
import convertDateTime from "../components/Helpers/DateConverter"
import DeleteConfirm from "../components/Helpers/DeleteConfirm"
import PublishConfirm from "../components/Helpers/PublishConfirm"
import "./ProjectPage.css"
import Icons from "../components/Helpers/Icons"

function ProjectPage() {
    const [projectData, setProjectData] = useState({ pledges: [] });
    const { id } = useParams();

    const myLink = "/project/" + id + "/edit/"

    const username = window.localStorage.getItem("username")

    const [isLoading, setIsLoading] = useState(true)
    const [noProject, setNoProject] = useState(false)


    const [projError, setProjError] = useState()

    let completed

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
        .then((results) => {
            setProjError(results.status)
            console.log(results.status)
            if (results.status === 404) {
                setNoProject(true)
                console.log("setNoProject = true")
            }
            return results.json();
        })
        .then((data) => {
            setProjectData(data);
            setIsLoading(false)
        })
        .catch((error) => {
            alert("something went wrong");
        })

    }, [id]);

    function Pledges() {
        if (projectData.is_open) {
            return (
            <div className="margin-10 pledges-outer-wrapper">
                <h2 className="centered">Pledges</h2>
                    <div className="centered">
                    <List items={projectData.project_pledges} fallback={"Be the first one to donate to this project!"} />
                    </div>
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



    if (isLoading) {
        return (
            <div className="white-background">
                <img src={"https://i.imgur.com/3BOX1wi.gif"}/>
            </div>
        )
    } else if (noProject === true) {
        return (
            <div className="blankPage">
                <h1>This project no longer exists</h1>
            </div>
        )
    } else if (projError === 401) {
        return (
            <div className="blankPage">
                <h1>This project has not been published yet, and you don't have permission to see it. </h1>
            </div>
        )

    } else if (projectData.pub_date === null && projectData.owner == username ) {
        return (
            <div>
  
                <h1 className="centered">{projectData.title}</h1>
                <Icons category={projectData.category} />
                <h2 className="centered error">Preview</h2>
                <div className="project-main-info">
                    <div className="project-img">
                        <img alt="" src={projectData.image} />
                    </div>
                    <div className="project-info">
                        <h3 className="centered">{projectData.owner}</h3>
                        <h4>Started on {convertDateTime(projectData.pub_date, 0)}</h4>
                        <h4>Ends on {convertDateTime(projectData.pub_date, projectData.duration)}</h4>
                        <div className="progressBarContainer">
                            <ProgressBar completed={completed} goal={projectData.goal}/>
                        </div>
                    </div>
                </div>   
                <div className="project-description">
                    {projectData.description}
                </div>
                {/* <h3>{`Status: ${projectData.is_open}`}</h3>       */}


                <PublishConfirm id = {id} />
                <DeleteConfirm id = {id} />

             </div>
        )
    } else {
        return (
            <div className="outer-container">

                <h1 className="centered">{projectData.title}</h1>     
                <Icons category={projectData.category} />        
                <div className="project-main-info">
                    <div className="project-img">
                        <img alt="" src={projectData.image} />
                    </div>
                    <div className="project-info">
                        <h3 className="centered">{projectData.owner}</h3>
                        <h3>Started on {convertDateTime(projectData.pub_date, 0)}</h3>
                        <h3>Ends on {convertDateTime(projectData.pub_date, projectData.duration)}</h3>
                        <div className="progressBarContainer">
                            <ProgressBar completed={completed} goal={projectData.goal}/>
                        </div>
                    </div>
                </div>
                <div className="project-description">
                    {projectData.description}
                </div>
                <DeleteConfirm id = {id} />

                {/* <h3>{`Status: ${projectData.is_open}`}</h3>       */}

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
                return (
                    <div className="pledge-wrapper">
                        <div key={key}> ${item.amount} from anonymous </div>
                        <p>{item.comment}</p>
                    </div>
                )
            } else {
                return (
                    <div className="pledge-wrapper">
                        <div key={key}> ${item.amount} from {item.supporter} </div>
                        <p>{item.comment}</p>
                    </div>
                )
            }
        // return <div key={key}> ${item.amount} from {(!item.anonymous) ? {item.supporter} : "anonymous"} </div>;

      });
    }
  } 

//solution to the .map problem found here
//https://www.debuggr.io/react-map-of-undefined/