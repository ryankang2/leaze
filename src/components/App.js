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
                    {/* <Route path="/" component={LandingPage}></Route> */}
                    <Route path="/home" component={ResultsPage}></Route>
                    <Route path="/home/profile/:number" component={Profile}></Route>
                    <Route path="/home/profile/other/:number" component={OtherProfile}></Route>
                </Switch>
                {/* <ResultsPage />  */}
                {/* <LandingPage /> */}
                {/* <Profile /> */}
                {/* <MessagingPage /> */}
            </div>
);



export default withRouter(App);
