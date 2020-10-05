import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function UserPage() {
    //variables
    const [userData, setUserData] = useState({ pledges: [] });
    const { username } = useParams();
    const thisUser = window.localStorage.getItem("username");

    let token = window.localStorage.getItem("token");
    
    //methods

    function pledgesData() {
        if (thisUser === username) {
            return (
                <div >
                <h3>Pledges: </h3>
                <ListPledge items={userData.supporter_pledges} fallback={""} />
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

    if (userData.username === username) {
        console.log("yay")
        console.log(userData.username)
        console.log("this: ", username)
    }

    return (
        
        <div>
            <h2>{userData.username}</h2>
            <h3>Created at: {userData.date_joined}</h3>
            <h3>{`Status: ${userData.bio}`}</h3>
            <h3>Projects:</h3>
                <ListProject items={userData.owner_projects} fallback={"This user has not created any projects"} />
            {/* <h3>{thisUser === username ? "Pledges:" : ""} </h3> */}
                {pledgesData()}
         
        </div>
    );
}

export default UserPage;


function ListProject({ items, fallback }) {
    if (!items || items.length === 0) {
      return fallback;
    } else {
      return items.map((item, key) => {
        return (
        <div key={key}> 
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