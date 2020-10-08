import React, { useState, useEffect } from "react"
//import { allProjects } from "../data"
import ProjectCard from "../components/ProjectCard/ProjectCard"
import "./HomePage.css"
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

function HomePage() {
    //variables
    const [projectList, setProjectList] = useState([]);

    //methods
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}projects/`)
            .then((results) =>  {
                return results.json();
            })
            .then((data) => {
                setProjectList(data);
            })
        //setProjectList(allProjects);
    }, []);

    //template
    return (
        <div className="outer-container">
            {/* <div id="showcase">
                <div className="container">
                    <div className="showcase-content">
                    <h1><span className="text-primary">Empowering </span>Women</h1>
                    <p className="lead">Supporting women through courses, shelters for abused women, single mothers and teenagers, individual help and programs that aim at levelling the field. </p>
                    <a className="btn" href="about.html">About Our Mission</a>
                    </div>
                </div>
            </div> */}

            {/* <div className="categories">
                <div className="category">
                    <div className="half" id="category-1">
                        <h2>Shelter</h2>
                    </div>
                    <div className="half">

                    </div>
                </div>
            </div> */}
            <div id="showcase">
            <div className="container">
            <AliceCarousel autoPlay autoPlayInterval="3000">
                <img src={"https://i.imgur.com/dwkOhts.jpg"} className="sliderimg"/>
                <img src={"https://i.imgur.com/cZEW86k.jpg"} className="sliderimg"/>
                <img src={"https://i.imgur.com/J7l9nka.jpg"} className="sliderimg"/>
                <img src={"https://i.imgur.com/hBoDhQX.jpg"} className="sliderimg"/>
            </AliceCarousel>
            </div>
            </div>

            <div className="wrapper">
                <div id="project-list">
                    {projectList.map((projectData,key) => {
                        // return <div key={key}>{projectData.title}</div>
                        return <ProjectCard key={key} projectData={projectData} image={projectData.image} />;
                    })}
                </div>
            </div>
        </div>
    )
}



export default HomePage