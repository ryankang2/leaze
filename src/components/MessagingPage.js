import React, {Component} from "react";
import "./MessagingPage.css";

export default class MessagingPage extends Component {

    render () {
        return <div id="msgBackground">
            <div id="msgTopBar">
                <h5 id="messagesTitle">Message-LEaze</h5>
            </div>
            <div id="msgHeader">
                <img id="centerLogo" src= {require('./logo_transparent.png')} alt="logo" width="100" height="100"/>
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
                    <div id="typeBoxDiv">
                        <textarea id="typeBox"></textarea>
                    </div>
                    <div id="sendAndIcons">
                        <button id="sendButton">Send</button>
                        <span id="msgIcons">
                            <i className="fa fa-camera" aria-hidden="true"></i>
                            <i className="fa fa-picture-o" aria-hidden="true"></i>
                            <i className="fa fa-handshake-o" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    }
}