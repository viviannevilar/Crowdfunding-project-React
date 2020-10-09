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
        });
    }, [id]);


    //methods
    const handleChange = (e) => {
        const { id, value } = e.target;
        setProjectData((prevProjectData) => ({
        ...prevProjectData,
        [id]: value,
        }));
    };

    const onChangeValue = (event) => {
        const { id, value } = event.target
        setProjectData((prevProjectData) => ({
            ...prevProjectData,
            [id]: value,
            }));
    }
    

    const postData = async () => {
        let token = window.localStorage.getItem("token");

        // POST request using fetch with async/away 
        const response = await fetch(`${process.env.REACT_APP_API_URL}project/${id}/`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(projectData),
        });
        return response.json();
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            projectData.title && 
            projectData.description && 
            projectData.goal && 
            projectData.image && 
            projectData.duration && 
            projectData.category
        ) {
            postData().then((response) => {
                setErrorMessage("You need to complete all fields.")
            })
        }
    };


    //Check whether user has permission to edit this
    //This checks whether user is owner
    function isOwner(owner) {
        const username = window.localStorage.getItem("username");

        if (owner === username)  {
            return true;
        } else {
            return false;
         }
    }

    //This checks whether this is a draft
    function isDraft(pub_date) {

        if (pub_date === null)  {
            return true;
        } else {
            return false;
        }
    }

    if (isOwner(projectData.owner) && isDraft(projectData.pub_date)) {
        return (
            <div className="form-wrap">
                <h1>Edit Project</h1>
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
    
            {errorMessage != null ? <p className="error">{errorMessage}</p> : null}
            </div>
        );

    } else if (!isOwner(projectData.owner)) {

        return (
            <div className="blankPage">
                <h1>You are not this project's owner!</h1>
            </div>
        )
    } else {
        return (
            
            <div className="blankPage">
                 <h1>This project has been published and can no longer be edited!</h1>
            </div>
        )
    }

 
    }

    export default ProjectEditForm;




