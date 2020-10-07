import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import convertDateTime from "../components/Helpers/DateConverter"
import "./UserPage.css"

function UserPage() {
    //variables
    const [userData, setUserData] = useState({ pledges: [] });
    const { username } = useParams();
    const thisUser = window.localStorage.getItem("username");

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
                <h2>Pledges: </h2>
                <ListPledge items={userData.supporter_pledges} fallback={""} />
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
                <h2>Drafts: </h2>
                <ListDraft items={userData.owner_projects} fallback={""} />
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
            return results.json();
        })
        .then((data) => {
            setUserData(data);
        });
    }, [username, token]);

    return (
        
        <div className="outer-container">
            <div className="profile-info">
                <div className="prof-container-img">
                    <img alt="" className="profile-img" src={userData.pic} />
                </div>
                <div className="prof-container-info">
                    <h1>{userData.username}</h1>
                    <h3>Member since {convertDateTime(userData.date_joined)}</h3>
                    <p>{userData.bio}</p>
                </div>
                    

            </div>

            
            
            <h2>Projects:</h2>
                <ListProject items={userData.owner_projects} fallback={"This user has not created any projects"} />

            {drafts()}

            {/* <h3>{thisUser === username ? "Pledges:" : ""} </h3> */}
                {pledgesData()}

         
        </div>
    );
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