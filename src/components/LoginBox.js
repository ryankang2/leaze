import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./LoginBox.css";

export default class LoginBox extends Component {

    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if(this.infoChecks(this.state.email, this.state.password) === true) {
            console.log('The form was submitted with the following data:');
            console.log(this.state);
        }
    }

    infoChecks(email, password) {
        return true;
    } 

    forgotPassword(e) {
        console.log("forgot password");
        let modal = document.getElementById("forgotModal1");
        modal.style.display = "block"
    }

    render() {
        return <div class="tabcontent" id="Login">
            <h3>Log in</h3>
            <div className="logContainer" id="logContainer">
                <form onSubmit={this.handleSubmit} className="FormFields">
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="loginEmail">E-Mail Address</label>
                        <input type="email" id="loginEmail" className="FormField__Input" placeholder="Enter a valid .edu email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="loginPassword">Password</label>
                        <input type="password" id="loginPassword" className="FormField__Input" placeholder="6 characters minimum" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <button type="Submit" id="loginButton" className="btnSubmit">Log in</button>
                </form>
                <button onClick={this.forgotPassword} id="forgotPassword">Forgot Password</button>
            </div>
        </div>    
    }
}