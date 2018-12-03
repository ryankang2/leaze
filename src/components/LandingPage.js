import React, {Component} from "react";
import LoginTabs from "./LoginTabs"
import ForgotPassword from "./ForgotPassword.js"
import "./LandingPage.css"

export default class LandingPage extends Component {
    render () {
        return <div id="background">
            <div id="header">
                <img src= {require('../../dist/logo_transparent.png')} alt="logo" width="125" height="125" />
                <h1 id="headerMsg">Your new home. Just the way you like it.</h1>
            </div>  

            <ForgotPassword />
            <LoginTabs />
            
            <div id="introInfo">
                <h4 className="needSpace">Why join LEaze?</h4>
                <p className="needSpace">
                    College students are stressed enough. Whether it be the end of a long quarter, or start
                    of a new quarter, your housing situation should be the last of your worries. LEaze can help you 
                    deal with your lease with ease. Welcome home.
                </p>
                <p>
                    Sign up for a FREE LEaze account to gain instant access to student housing listings, compatible
                    tenants, and more, tailored just for you.
                </p>
            </div>
        </div>
    }
}