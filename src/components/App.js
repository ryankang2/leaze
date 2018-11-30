import React, {Component} from "react";
import {Switch, Route, BrowserRouter as Router, Link, withRouter} from "react-router-dom";
import ResultsPage from "./ResultsPage";
import Profile from "./Profile";
import ResultsContent from "./ResultsContent.js"
import LandingPage from "./LandingPage";
import MessagingPage from "./MessagingPage";


// export default class App 
const App = () => (
            <div>
                <Switch>
                    <Route exact path="/" component={LandingPage}></Route>
                    <Route exact path="/home" component={ResultsPage}></Route>
                </Switch>
                {/* <ResultsPage />  */}
                {/* <LandingPage /> */}
                {/* <Profile />*/}
            </div>
);

export default withRouter(App);
