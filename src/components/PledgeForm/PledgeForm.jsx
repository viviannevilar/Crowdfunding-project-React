import React, { useState, useEffect } from "react";
//import { useHistory } from "react-router-dom";
import "./PledgeForm.css"

function PledgeForm(props) {
    //variables
    const { project_id } = props

    const [pledgeData, setPledgeData] = useState({
        amount: "",
        comment: "",
        anonymous: false,
        project: project_id,
    });

    const [errorMessage, setErrorMessage] = useState(null)

    const [allOk, setAllOk] = useState(false)

    //const history = useHistory();

    //methods
    const handleChange = (e) => {
        const { id, value } = e.target;
        console.log(e.target)
        setPledgeData((prevPledgeData) => ({
        ...prevPledgeData,
        [id]: value,
        }));
    };

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
    
        setPledgeData((prevPledgeData) => ({
            ...prevPledgeData,
            anonymous: value,
            }));
      }

    // const onChangeValue = (event) => {
    //     const { id, value } = event.target
    //     console.log(event.target.valueAsNumber)
    //     console.log(event.target)
    //     setPledgeData((prevPledgeData) => ({
    //         ...prevPledgeData,
    //         [id]: value,
    //         }));
    // }

    useEffect(() => {
        //console.log("All OK changed")
        if (allOk) {
            window.location.reload(false);
        }

    }, [allOk]);

    const postData = async () => {
        let token = window.localStorage.getItem("token");
        console.log(token)
        console.log(pledgeData)

        // POST request using fetch with async/away 
        const response = await fetch(`${process.env.REACT_APP_API_URL}pledges/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(pledgeData),
        });
        console.log(response)
        setAllOk(response.ok)
        //console.log("response.ok: ",response.ok)
        return response.json();

    };


    const handleSubmit = (e) => {
        console.log(pledgeData);
        e.preventDefault();
        if (
            pledgeData.amount && 
            pledgeData.comment && 
            // pledgeData.anonymous && 
            pledgeData.project
        ) {
            console.log("All data is there")
            console.log(pledgeData)
            postData().then((response) => {
                console.log(response);
                console.log("allOK: ", allOk)
                if (!allOk) {
                    setErrorMessage(response[Object.keys(response)[0]])

                } else {
                    window.location.reload(false);
                    console.log("Why didn't it reload?!")
                }
            })

        } else {
            console.log("not all data was there")
            setErrorMessage("You need to add a comment!")
        }
    };


    return (
        <div className="form-wrap pledge-form-wrap">
            <form>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                    type="text"
                    id="amount"
                    placeholder="Enter amount"
                    onChange={handleChange}
                    //value={credentials.username}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Comment</label>
                    <textarea
                    type="text"
                    id="comment"
                    placeholder="Enter comment"
                    onChange={handleChange}
                    //value={credentials.password}
                    />
                </div>
                <div>
                        <input
                            name="anonymous"
                            type="checkbox"
                            checked={pledgeData.anonymous}
                            onChange={handleInputChange} />
                        <label> Anonymous</label>
                </div>

                <button type="submit" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
            <div>
                {errorMessage != null ? <p className="error">{errorMessage}</p> : <></>}   
            </div>
        {/* {errorMessage != null ? <p>{errorMessage}</p> : null} */}
        </div>
    );
    }

    export default PledgeForm;




