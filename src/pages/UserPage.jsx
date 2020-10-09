import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import convertDateTime from "../components/Helpers/DateConverter"
import DeleteConfirm from "../components/Helpers/DeleteConfirm"
import "./UserPage.css"

function UserPage() {
    //variables
    const [userData, setUserData] = useState({ pledges: [] });
    const { username } = useParams();
    const thisUser = window.localStorage.getItem("username");
    const [noUser, setNoUser] = useState(false)

    let token = window.localStorage.getItem("token");

    //const userIsOwner = (username === thisUser)
    //console.log(userIsOwner)
    
    //methods

    console.log(userData.pic)
    console.log(userData)


    function pledgesData() {
        if (thisUser === username) {
            return (
                <div >
                <h2 className="centered">Pledges</h2>
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
                <h2 className="centered">Drafts</h2>
                <ListDraft items={userData.owner_projects} fallback={<p className="centered">No drafts to show</p>} />
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
                console.log("setNoUser = true")
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
                <h1 className="centered">{userData.username}</h1>

                <div className="centered mb-20">
                    <DeleteConfirm id = {username} type="user" />
                    <button>Create Project</button>
                </div>
                    
                <div className="profile-info mt-20">
                    <div className="prof-container-img">
                        <img alt="" className="profile-img" src={userData.pic} />
                    </div>
                    <div className="prof-container-info">
                        <h3 className="centered">Member since {convertDateTime(userData.date_joined,0)}</h3>
                        <p>{userData.bio}</p>
                    </div>
                </div>       
            
            
            <h2 className="centered">Projects</h2>
                <ListProject items={userData.owner_projects} fallback={<p className="centered">No projects to show</p>} />

            {drafts()}

            {pledgesData()}

         
        </div>
    );
}
}

export default UserPage;

// function ListProject({ items, fallback }) {
//     if (!items || items.length === 0) {
//       return fallback;
//     } else {
//       return items.map((item, key) => {
//         return (
//         <div key={key}> 
//             <h3>{item.title}</h3>
//             <p>{item.description}</p> 
//         </div>
//         )
//       });
//     }
//   }


//


function ListProject({ items, fallback }) {
    if (!items || items.length === 0) {
      return fallback;
    } else {
      return items.map((item, key) => {
            return (
            <div key={key} className={` ${(item.pub_date === null) ? "dont-show" : ""}`}> 
                <h3>{item.title}</h3>
                <p>{item.description}</p> 
            </div>
            )
      });
    }
  }

  function ListDraft({ items, fallback }) {
    if (!items || items.length === 0) {
      return fallback;
    } else {
      return items.map((item, key) => {
            return (
            <div key={key} className={` ${(item.pub_date === null) ? "" : "dont-show"}`}> 
                <h3>{item.title}</h3>
                <p>{item.description}</p> 
            </div>
            )
      });
    }
  }

  function ListPledge({ items, fallback }) {
    if (!items || items.length === 0) {
      return fallback;
    } else {
      return items.map((item, key) => {
        return (
        <div key={key}> 
            <h3>{item.project}</h3>
            <p>{item.comment}</p> 
        </div>
        )
      });
    }
  }
//solution to the .map problem found here
//https://www.debuggr.io/react-map-of-undefined/