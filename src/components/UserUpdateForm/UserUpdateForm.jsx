import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom"
//import "./NewProjectForm.css"


function UserUpdateForm() {
    //variables
    const [userData, setUserData] = useState({
        bio: "",
        pic: ""
    });

    const { username } = useParams();

    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState(null)

    //const history = useHistory();
    const linkTo = "/user/" + username + "/"
    //methods
    useEffect(() => {
        let token = window.localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}users/${username}`,{
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            }
        }
        )
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            setUserData(data);
        });
    }, [username]);



    //methods
    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData((prevUserData) => ({
        ...prevUserData,
        [id]: value,
        }));
    };

    const onChangeValue = (event) => {
        const { id, value } = event.target

        setUserData((prevUserData) => ({
            ...prevUserData,
            [id]: value,
            }));
    }
    

    const postData = async () => {
        let token = window.localStorage.getItem("token");

        // POST request using fetch with async/away 
        const response = await fetch(`${process.env.REACT_APP_API_URL}users/${username}/`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(userData),
        });
        console.log(response)
        return response.json();
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            userData.bio && 
            userData.pic
        ) {
            postData().then((response) => {
                console.log("test")
                history.push(linkTo)
                console.log(linkTo)
            })
        }
    };


    return (
        <div className="form-wrap">
            <h1>Update Profile</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                    type="text"
                    id="bio"
                    placeholder="Write something about yourself"
                    onChange={handleChange}
                    value={userData.bio}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="pic">Pic</label>
                    <input
                    type="text"
                    id="pic"
                    placeholder="Enter image of your profile picture"
                    onChange={handleChange}
                    value={userData.pic}
                    />
                </div>
 
                <button type="submit" onClick={handleSubmit}>
                    Save
                </button>
            </form>

        {errorMessage != null ? <p>{errorMessage}</p> : null}
        </div>
    );
    }

    export default UserUpdateForm;




