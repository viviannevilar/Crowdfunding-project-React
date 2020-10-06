import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
//import "./NewProjectForm.css"

function UserUpdateForm() {
    //variables
    const [userData, setUserData] = useState({
        bio: "",
        pic: ""
    });

    const { username } = useParams();

    const [errorMessage, setErrorMessage] = useState(null)

    //const history = useHistory();
    

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
            console.log(data)
        });
    }, [username]);



    //methods
    const handleChange = (e) => {
        const { id, value } = e.target;
        console.log(e.target)
        setUserData((prevUserData) => ({
        ...prevUserData,
        [id]: value,
        }));
    };

    const onChangeValue = (event) => {
        const { id, value } = event.target
        console.log(event.target.valueAsNumber)
        console.log(event.target)
        setUserData((prevUserData) => ({
            ...prevUserData,
            [id]: value,
            }));
    }
    

    const postData = async () => {
        let token = window.localStorage.getItem("token");
        console.log(token)

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
        console.log(userData);
        e.preventDefault();
        if (
            userData.bio && 
            userData.pic
        ) {
            console.log("All data is there")
            console.log(userData)
            postData().then((response) => {
                console.log(response);
            })
        }
    };


    return (
        <div className="form-wrap">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
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




