import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
//import { Link } from "react-router-dom"
import "./App.css"
import Nav from "./components/Nav/Nav"
import ProjectPage from "./pages/ProjectPage"
import HomePage from "./pages/HomePage"
//import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import UserPage from "./pages/UserPage"
import UserUpdatePage from "./pages/UserUpdatePage"
import NewProjectPage from "./pages/NewProjectPage"
import ProjectEditPage from "./pages/ProjectEditPage"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
//import LoginControl from "./components/Helpers/LoginControl"

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
                    
                    <Nav username={username} />
                </header>

                <br></br>
                <Switch>
                    <Route exact path="/project/:id/">
                        <ProjectPage />
                    </Route>
                    <Route path="/project/:id/edit/">
                        <ProjectEditPage />
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
                    <Route path="/user/:username/edit/">
                        <UserUpdatePage />
                    </Route>                   
                    <Route exact path="/user/:username/">
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




