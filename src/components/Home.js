import React, {Component} from "react";
import "./App.css";

export default class Home extends Component {
    constructor(props){
        super();
    }
    render () {
        return (
        <div id="background">
            <div id="header">
                <h1>Howdy partner</h1>
                <p>Gary hello</p>
            </div>  
            <input></input>
            <div>
                <FiltersList />
            </div>
        </div>
        );
    }
}