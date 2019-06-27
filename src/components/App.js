import React, {Component} from "react";
import {Switch, Route, BrowserRouter as Router, Link, withRouter} from "react-router-dom";
import ResultsPage from "./ResultsPage";
import Profile from "./Profile";
import ResultsContent from "./ResultsContent.js"
import LandingPage from "./LandingPage";
import MessagingPage from "./MessagingPage";
import OtherProfile from "./OtherProf";



// export default class App 
const App = () => (
            <div>
                {/* <OtherProfile></OtherProfile> */}
                <Switch>
                    <Route exact path="/" component={LandingPage}></Route>
                    <Route exact path="/home" component={ResultsPage}></Route>
                    <Route exact path="/home/profile/:number" component={Profile}></Route>
                    <Route exact path="/home/profile/other/:number" component={OtherProfile}></Route>
                </Switch>
                {/* <ResultsPage />  */}
                {/* <LandingPage /> */}
                {/* <Profile /> */}
                {/* <MessagingPage /> */}
            </div>
);

export default withRouter(App);
