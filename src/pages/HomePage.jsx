import React, { useState, useEffect } from "react"


//import { allProjects } from "../data"

import ProjectMap from "../components/ProjectMap/ProjectMap"
import IsLoading from "../components/IsLoading/IsLoading"
import "./HomePage.css"
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

function HomePage() {

    //////////////////////////// variables ////////////////////////////

    // state variables
    const [projectList, setProjectList] = useState([]);
    const [isLoading, setIsLoading] = useState(true)


    //////////////////////////// methods ////////////////////////////

    // fetch project list data
    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_URL}projects/`)
            .then((results) =>  {
                return results.json();
            })
            .then((data) => {
                setProjectList(data);
                setIsLoading(false);
            })


    }, []);


    
    //////////////////////////// return ////////////////////////////
    return (
        <div className="outer-container">

            {/******** Alice Carousel (image carousel) ********/}
            <div id="showcase">

                {/* images for carousel */}
                <div className="container">
                    <AliceCarousel autoPlay autoPlayInterval="3000">
                        <img alt="" src={"https://i.imgur.com/dwkOhts.jpg"} className="sliderimg"/>
                        <img alt="" src={"https://i.imgur.com/cZEW86k.jpg"} className="sliderimg"/>
                        <img alt="" src={"https://i.imgur.com/J7l9nka.jpg"} className="sliderimg"/>
                        <img alt="" src={"https://i.imgur.com/UfzChBu.jpg"} className="sliderimg"/>
                    </AliceCarousel>
                </div>

                {/* text for carousel */}
                <div className="text-superimpose">
                    <h1 className="centered"><span className="text-primary">Empowering </span>Women </h1>
                </div>

            </div>

            
            {/******** Project Cards ********/}

            {/* while fetching data, show loading gif */}
            {/* if data has been fetched, show project cards */}
            {(isLoading) 
                ? <IsLoading /> 
                : <ProjectMap projectList={projectList} /> 
            }

        </div> 
    )
}



export default HomePage