import React, {Component} from "react";
import "./App.css";
import Register from "./register";

export default class App extends Component {
    render () {
        return <div id="background">
            <div id="header">
                <h1>Howdy partner</h1>
                <p>Gary is a ball liker</p>
            </div>  
            <Register />
        </div>
    }
}
