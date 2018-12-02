import React, {Component} from "react";
import "./MessagingPage.css";

export default class MessagingPage extends Component {

    render () {
        return <div id="background">
            <div id="topBar">
                <h5 id="messagesTitle">Message-LEaze</h5>
            </div>
            <div id="header">
                <img id="centerLogo" src= {require('./logo_transparent.png')} alt="logo" width="50" height="50"/>
            </div>  

            <div id="conversations">
                <div className="containerTitles">
                    <h2 className="msgh2">Messages</h2>
                </div>
                <div id="convoList">

                </div>
            </div>

            <div id="messageContainer">
                <div className="containerTitles">
                    <h2 className="msgh2" id="personName">Name of Person</h2>
                </div>
                <div id="currentConvo">
                    <div id="myCurConvo">

                        <hr id="between-vert"/>
                    </div>                  
                    <div id="currentListing">
                        
                    </div>
                    <hr id="between-hor" />
                    <div id="typeBox">

                    </div>
                </div>
            </div>
        </div>
    }
}