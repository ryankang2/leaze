import React, {Component} from "react";
import ResultsPage from "./ResultsPage";
import "./App.css";
import Profile from "./Profile";
import Popup from"./Profile";
import Navbar from "./Navbar.js"
import Update from "./Update.js"

export default class App extends Component {
    render () {
        return (
            <div>
                <Profile />
                {/*<ResultsPage />*/}
            </div>
        )
    }
}

