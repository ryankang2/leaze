import React, {Component} from "react";
import "./App.css";

export default class App extends Component {
    render () {
        return (<div id="background">
            <div id="header">
                <h1>LEAZE</h1>
                <div className="topnav">
                    <input type="text" placeholder="Search.."></input>
                    <a className="active" href="#home">Home</a>
                    <a href="#????????">????????</a>
                    <a href="#messages">Messages</a>
                    <a href="#notifications">Notifications</a>

                </div>

            </div>

        </div>
        );
    }
}
