import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import "./NewProjectForm.css"

function ProjectEditForm() {
    //variables
    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        goal: 0,
        image: "",
        duration: 0,
        category: ""
    });

    const { id } = useParams();

    const [errorMessage, setErrorMessage] = useState(null)

    //const history = useHistory();
    

    //methods
    useEffect(() => {
        let token = window.localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}project/${id}`,{
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
            setProjectData(data);
            console.log(data)
        });
    }, [id]);


    //methods
    const handleChange = (e) => {
        const { id, value } = e.target;
        console.log(e.target)
        setProjectData((prevProjectData) => ({
        ...prevProjectData,
        [id]: value,
        }));
    };

    const onChangeValue = (event) => {
        const { id, value } = event.target
        console.log(event.target.valueAsNumber)
        console.log(event.target)
        setProjectData((prevProjectData) => ({
            ...prevProjectData,
            [id]: value,
            }));
    }
    

    const postData = async () => {
        let token = window.localStorage.getItem("token");
        console.log(token)

        // POST request using fetch with async/away 
        const response = await fetch(`${process.env.REACT_APP_API_URL}project/${id}/`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(projectData),
        });
        console.log(response)
        return response.json();
    };


    const handleSubmit = (e) => {
        console.log(projectData);
        e.preventDefault();
        if (
            projectData.title && 
            projectData.description && 
            projectData.goal && 
            projectData.image && 
            projectData.duration && 
            projectData.category
        ) {
            console.log("All data is there")
            console.log(projectData)
            postData().then((response) => {
                console.log(response);
            })
        }
    };

    //publish button
    // const publishProject = async (e) => {
    //     e.preventDefault();
    //     let token = window.localStorage.getItem("token");
 
    //     const response = await fetch(`${process.env.REACT_APP_API_URL}project/${id}/publish/`, {
    //         method: "post",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Token ${token}`,
    //         },
    //     });

    //     console.log(response)
    //     return response.json();
    // }


    //Check whether user has permission to edit this
    //This checks whether user is owner
    function isOwner(owner) {
        const username = window.localStorage.getItem("username");

        if (owner === username)  {
            return true;
            console.log("is owner")
        } else {
            return false;
            console.log("is not owner")
        }
    }

    //This checks whether this is a draft
    function isDraft(pub_date) {

        if (pub_date === null)  {
            console.log("is draft")
            return true;
        } else {
            console.log("is not draft")
            return false;
        }
    }

    if (isOwner(projectData.owner) && isDraft(projectData.pub_date)) {
        return (
            <div className="form-wrap">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                        type="text"
                        id="title"
                        placeholder="Enter title"
                        onChange={handleChange}
                        value={projectData.title}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                        type="text"
                        id="description"
                        placeholder="Enter description"
                        onChange={handleChange}
                        value={projectData.description}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="goal">Goal</label>
                        <input
                        type="text"
                        id="goal"
                        placeholder="Enter goal"
                        onChange={handleChange}
                        value={projectData.goal}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <input
                        type="text"
                        id="image"
                        placeholder="Enter image url address"
                        onChange={handleChange}
                        value={projectData.image}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="duration">Duration</label>
                        <input
                        type="text"
                        id="duration"
                        placeholder="Enter duration"
                        onChange={handleChange}
                        value={projectData.duration}
                        />
                    </div>
                    
                    <p>Category</p>
                    <div onChange={onChangeValue} 
                    value={projectData.category}
                    className="radio-buttons">
                        
                        <div>
                        <input  
                        type="radio" 
                        id="category" 
                        value="Shelter" 
                        checked={projectData.category === 'Shelter'}
                        />
                        <label>Shelter</label>
                        </div>
    
                        <div>
                        <input 
                        type="radio" 
                        id="category" 
                        value="Course" 
                        checked={projectData.category === 'Course'}                    
                        />
                        <label>Course</label>
                        </div>
                        
                        <div>
                        <input 
                        type="radio" 
                        id="category" 
                        value="Business" 
                        checked={projectData.category === "Business"}                    
                        />
                        <label>Business</label>
                        </div>
                        
                        <div>
                        <input 
                        type="radio" 
                        id="category" 
                        value="Individual" 
                        checked={projectData.category === 'Individual'}                    
                        />
                        <label>Individual</label>
                        </div>
                        
                        <div>
                        <input 
                        type="radio" 
                        id="category" 
                        value="Other" 
                        checked={projectData.category === 'Other'}                    
                        />
                        <label>Other</label>
                        </div>
                    </div>
    
                    <button type="submit" onClick={handleSubmit}>
                        Save Draft
                    </button>
                   {/* <button onClick={() => {if (window.confirm('Are you sure you want to publish this project? You will not be able to edit once it is published.')){publishProject()}}}>Publish</button>  */}
                   {/* <button onClick={publishProject}>Publish</button>  */}
                </form>
    
            {errorMessage != null ? <p>{errorMessage}</p> : null}
            </div>
        );

    } else if (!isOwner(projectData.owner)) {

        console.log(isOwner(projectData.owner))
        console.log(isDraft(projectData.pub_date))

        return (
            <div>
                <br></br>
                <h3>You are not this project's owner!</h3>
            </div>
        )
    } else {
        return (
            
            <div>
                <br></br>
                <h3>This project has been published and can no longer be edited!</h3>
            </div>
        )
    }

 
    }

    export default ProjectEditForm;




