import React, {Component} from "react";
import LoginTabs from "./LoginTabs"

export default class LandingPage extends Component {
    render () {
        return <div id="background">
            <div id="topBar">
                <h5>Welcome to LEaze</h5>
            </div>
            <div id="header">
                <img src= {require('./logo.png')} alt="logo" width="50" height="50" />
                <h1>Your new home. Just the way you like it.</h1>
            </div>  
            <LoginTabs />
            <div id="introInfo">
                <h4 id="needSpace">Why join LEaze?</h4>
                <p id="needSpace">Because you're not a pussy. Pussies don't join leaze because they lick ass
                    and such due to their bitchass attitude. So quit being a dick and just come join
                    leaze cuz if you don't you can just go ahead and lick my titties. Drexler likes big kevin Dong
                </p>
                <p>
                    Sign up for leaze for free. See, it's free. And it helps. So if you don't sign up, 
                    logically, Fuck you vato. Don't be a baffoon and come join LEaze. We esketit all and every 
                    boonk gang day.
                </p>
            </div>
        </div>
    }
}