import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import convertDateTime from "../components/Helpers/DateConverter"
import DeleteConfirm from "../components/Helpers/DeleteConfirm"
import ProjectCard from "../components/ProjectCard/ProjectCard"
import "./UserPage.css"

function UserPage() {
    //variables
    const [userData, setUserData] = useState({ pledges: [] });
    const { username } = useParams();
    const thisUser = window.localStorage.getItem("username");
    const [noUser, setNoUser] = useState(false)

    let token = window.localStorage.getItem("token");

   
    //methods
    function pledgesData() {
        if (thisUser === username) {
            return (
                <div className="pledges-profile centered">
                <h2 className="centered mt-20">Pledges</h2>
                <ListPledge items={userData.supporter_pledges} fallback={<p className="centered">You have made no pledges so far</p>} />
                </div>
            )
        } else {
            return null
        }
     }

     function drafts() {
        if (thisUser === username) {
            return (
                <div >
                    <h2 className="centered mt-20">Drafts</h2>
                    <div className="project-list">
                        <ListDraft items={userData.owner_projects} fallback={<p className="centered">No drafts to show</p>} />
                    </div>
                </div>
            )
        } else {
            return null
        }
     }
     
    useEffect(() => {
        const headers = token ? {
            Authorization: `Token ${token}`,
        } : {}
        fetch(`${process.env.REACT_APP_API_URL}users/${username}/profile/`, {
            headers
         })
        .then((results) => {
            if (results.status === 404) {
                setNoUser(true)
            }
            return results.json();
        })
        .then((data) => {
            setUserData(data);
        });
    }, [username, token]);


    if (noUser === true) {
        return (
            <div className="blankPage">
                <h1>This user doesn't exist</h1>
            </div>
        )
    } else {
        return (
            <div className="outer-container">
                <h1 className="centered h1-title">{userData.username}</h1>

                <div className="centered buttons">

                    {/* <Link to={`/user/${username}/edit/`}><button className="mr-10 btn-small">Edit Profile</button></Link> */}
                    <DeleteConfirm id = {username} type="user" />

                </div>
                    
                <div className="profile-info mt-20 pad-lr-30">
                    <div className="prof-container-img">
                        <img alt="" className="profile-img" src={userData.pic} />
                    </div>
                    <div className="prof-container-info pad-lr-30">
                        <h3 className="centered">Member since {convertDateTime(userData.date_joined,0)}</h3>
                        <p>{userData.bio}</p>
                    </div>
                </div>       
            
            
            {/* <h2 className="centered">Projects</h2>
                <ListProject items={userData.owner_projects} fallback={<p className="centered">No projects to show</p>} /> */}

                <div className="wrapper">
                    <h2 className="centered mt-20">Projects</h2>
                    <div className="project-list">
                    <ListProject items={userData.owner_projects} fallback={<p className="centered">No projects to show</p>} /> 
                    </div>
               </div>

            {drafts()}

            {pledgesData()}

         
        </div>
    );
}
}

export default UserPage;


function ListProject({ items, fallback }) {
    if (!items || items.length === 0) {
      return fallback;
    } else {
      return items.map((item, key) => {
            return (
                <ProjectCard key={key} projectData={item} image={item.image} showdrafts={false}/>
            )
      })
    }
  }

  // className={` ${(item.pub_date === null) ? "dont-show" : ""}`}

  function ListDraft({ items, fallback }) {
    if (!items || items.length === 0) {
      return fallback;
    } else {
      return items.map((item, key) => {
            return (
                <ProjectCard  key={key} projectData={item} image={item.image} showdrafts={true} />
            )
      })
    }
  }



//    
  function ListPledge({ items, fallback }) {
    if (!items || items.length === 0) {
      return fallback;
    } else {
      return items.map((item, key) => {
        return (
        <div key={key} className="one-pledge"> 


        <p>Donated ${item.amount} to <Link to={`/project/${item.project}/`}>Project {item.project}</Link> with the comment "{item.comment}"</p>
        </div>
        )
      });
    }
  }
//solution to the .map problem found here
//https://www.debuggr.io/react-map-of-undefined/