import React, {Component} from "react";
import "./MessagingPage.css";

export default class MessagingPage extends Component {

    render () {
        return <div id="background">
            <div id="topBar">
                <h5 id="messagesTitle">Message-LEaze</h5>
            </div>
            <div id="header">
                <img id="centerLogo" src= {require('./logo.png')} alt="logo" width="50" height="50" />
            </div>  
            <div id="conversations">
                <h2>Messages</h2>
            </div>
            <div id="messageContainer">
                <h2 id="personName">Name of Person</h2>
            </div>
        </div>
    }
}