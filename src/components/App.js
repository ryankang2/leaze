import React, {Component} from "react";
import ResultsPage from "./ResultsPage";
import "./App.css";
import Profile from "./Profile";
import Navbar from "./Navbar.js"
import ListingPreview from "./ListingPreview.js"
import ResultsContent from "./ResultsContent.js"
import LandingPage from "./LandingPage";
import MessagingPage from "./MessagingPage";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default class App extends Component {
    render () {
        return (
//             <Router>
//                 <div>
//                     {/*<ResultsPage />*/}
//                     {/* <LandingPage /> */}
//                      {/*<Profile />*/}
//                      <Route exact path = "/" component={ResultsPage}/>
//                     <Route path = "/profile/:number" component = {Profile}/>
//                 </div>
//             </Router>
// =======
            <div>
                {/* <ResultsPage /> */}
                {/* <LandingPage /> */}
                <Profile />
            </div>
        )
    }
}
