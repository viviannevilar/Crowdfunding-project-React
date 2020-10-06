import React from "react";
import "./ProgressBar.css"

const ProgressBar = (props) => {
    const { completed } = props;
  
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
      <div className="containerStyles">
        <div className="fillerStyles" style={fillerStyles}>
          <span className="labelStyles">{`${completed}%`}</span>
        </div>
      </div>
    );
  };
  

export default ProgressBar;