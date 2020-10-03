import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { Link } from "react-router-dom"
import "./App.css"
//import Nav from "./components/Nav/Nav"
import ProjectPage from "./pages/ProjectPage"
import HomePage from "./pages/HomePage"
//import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import UserPage from "./pages/UserPage"
import NewProjectPage from "./pages/NewProjectPage"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import LoginControl from "./components/Helpers/LoginControl"

function App() {


    const username = window.localStorage.getItem("username");

    return (
        <Router>
            <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <header>
                    <h1>gofundshe</h1>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/project">Project</Link>
                        <LoginControl />
                        <p>{username}</p>
                </nav>
                </header>

                <br></br>
                <Switch>
                    <Route path="/project/:id/">
                        <ProjectPage />
                    </Route>
                    <Route path="/login/">
                        <LoginPage />
                    </Route>
                    <Route path="/register/">
                        <RegisterPage />
                    </Route>
                    <PrivateRoute path="/createproject/">
                        <NewProjectPage />
                    </PrivateRoute> 
                    <Route path="/user/:username/">
                        <UserPage />
                    </Route>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                </Switch>
                <Footer />
            </div>

        </Router>

    )
}

export default App;




