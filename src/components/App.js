import React, {Component} from "react";
import "./App.css";
import LoginTabs from "./LoginTabs"

export default class App extends Component {
    render () {
        return <div id="background">
            <div id="topBar">
                <h5>Welcome to LEaze</h5>
            </div>
            <div id="header">
                <h1>LEaze</h1>
            </div>  
            <LoginTabs />
            <div id="introInfo">
                <h4 id="needSpace">Why join LEaze?</h4>
                <p id="needSpace">Because you're not a pussy. Pussies don't join leaze because they lick ass at life
                    and such due to their inherint bitchass attitude. So quit being a dickBallz and just 
                    come join leaze cuz if you don't you can just go ahead and lick my titties. Drexler likes big kevin Dong
                </p>
                <p>
                    Sign up for leaze for free. See, it's free. And it helps. So if you don't sign up, 
                    logically, this means your ass is stupid, lazy, and probably ugly. Don't be a stupid
                    ugly baffoon and come join LEaze. We esketit all and every boonk gang day.
                </p>
            </div>
        </div>
    }
}
