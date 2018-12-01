import React, {Component} from "react";
import ResultsPage from "./ResultsPage";
import "./App.css";
import Profile from "./Profile";
import Navbar from "./Navbar.js"
import ListingPreview from "./ListingPreview.js"
import ResultsContent from "./ResultsContent.js"
import LandingPage from "./LandingPage";
import MessagingPage from "./MessagingPage";


export default class App extends Component {
    render () {
        return (
            <div>
                <ResultsPage />
                {/* <LandingPage /> */}
                {/* <Profile /> */}
                {/* <MessagingPage /> */}
            </div>
        )
    }
}
