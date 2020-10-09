import React from "react";
import "./ProgressBar.css"

const ProgressBar = (props) => {
    const { completed, goal } = props;
  
    const fillerStyles = {
      width: `${completed}%`,
    }
  

  
    return (
      <div className="outerContainerStyles">
      <div className="containerStyles">
        <div className="fillerStyles" style={fillerStyles}>
            <p>.</p>
        </div>
      </div>
      <p className="labelStyles">{completed}% of ${goal} goal</p>
      </div>
    );
  };
  

export default ProgressBar;