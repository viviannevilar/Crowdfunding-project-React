import React from "react";
import "./ProgressBar.css"

const ProgressBar = (props) => {
    const { completed, goal } = props;
  
    // const containerStyles = {
    //   height: 20,
    //   width: '100%',
    //   backgroundColor: "#e0e0de",
    //   borderRadius: 50,
    //   margin: 50
    // }
  
    const fillerStyles = {
      //height: '100%',
      width: `${completed}%`,
       //borderRadius: 'inherit',
      //textAlign: 'right',
      //transition: 'width 1s ease-in-out',
    }
  
    // const labelStyles = {
    //   padding: 5,
    //   color: 'white',
    //   fontWeight: 'bold'
    // }
  
    return (
      <div className="outerContainerStyles">
      <div className="containerStyles">
        <div className="fillerStyles" style={fillerStyles}>
            <p>.</p>
          {/* <span className="labelStyles">{`${completed}%`}</span> */}
        </div>
      </div>
      <p className="labelStyles">{completed}% of ${goal} goal</p>
      </div>
    );
  };
  

export default ProgressBar;