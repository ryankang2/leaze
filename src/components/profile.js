import React, {Component} from "react";
import "./App.css";
import "./person.js"

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            sex:'',
            age:'',
            hometown:'',
            school:'',
            major:'',
            hobbies:'',
        };
    }
    render () {
        return <div id="background">
            <div id="header">
                <h1>{this.state.name}'s Profile
                    <img src="C:/Users/drexl/IdeaProjects/leaze/src/components/profile.jpg" width="100" height="100"></img>
                </h1>
            </div>
            <div>
                <p>Sex: {this.state.sex}</p>
                <p>Age: {this.state.age}</p>
                <p>Hometown: {this.state.hometown}</p>
                <p>Current School: {this.state.name}</p>
                <p>Major: {this.state.major}</p>
                <p>Hobbies: {this.state.hobbies}</p>
            </div>  
            <br />
            <button>Edit</button>
        </div>
    }
}
