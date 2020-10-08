import React from "react"
import { FaHome, FaFemale, FaBriefcase, FaGraduationCap, FaQuestion } from 'react-icons/fa';
import "./Icons.css"

function Icons(props) {
    const { category } = props

    if (category === "Shelter") {
        return (
            <div className="category-icon">
                <FaHome className="icon" />
                <p>{category}</p>
        </div>
        )
    } else if (category === "Individual") {
        return (
        <div className="category-icon">
            <FaFemale className="icon" />
            <p>{category}</p>
        </div>
        )
    } else if (category === "Business") {
        return (
            <div className="category-icon">
                <FaBriefcase className="icon" />
               <p>{category}</p>
            </div>
        )
    } else if (category === "Course") {
        return (
            <div className="category-icon">
                <FaGraduationCap className="icon" /> 
                <p>{category}</p>
            </div>
        )
    } else if (category === "Other") {
        return (
            <div className="category-icon">
                <FaQuestion className="icon" />
                <p>{category}</p>
            </div>
        )
    }
}
export default Icons

/*  Shelter */
/*  Individual */
/*  Business */
/*  Courses */
/* <i class="far fa-calendar-check"></i> Events */
/*  Other */

