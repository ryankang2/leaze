import React, {Component} from "react";
import {Input} from "react-materialize";

export default class RegisterBox extends Component {

    constructor() {
        super();

        this.state = {
            fname: '',
            lname: '',
            email: '',
            password: '',
            confPassword: '',
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

        if(this.registerSubmit(this.state.password, this.state.confPassword, this.state.email) === true) {
            console.log('Register successful with the following data:');
            console.log(this.state);
        }
    }

    registerSubmit(password, confPassword, email) {
        if(password === confPassword) {
            if(password.length > 5) {
                if(this.validEmail(email) === true) {
                    if(document.getElementById("checkInput").checked) {
                        return true;
                    }

                    else {
                        console.log("Please agree to terms and services before submitting");
                        return false;
                    }
                }

                else {
                    console.log("All valid emails must end in .edu");
                    return false;
                }
                
            }

            else {
                console.log("Password length must be at least 6 characters long");
                return false;
            }
            
        }

        else {
            console.log("Your two password entries don't match");
            return false;
        }
    }

    validEmail(email) {
        let valid = email.substr(email.length - 4);
        if(valid === ".edu") {
            return true
        }

        else {
            return false;
        }
    }

    render() {
        return <div class="tabcontent" id="Register">
        <div className="logContainer">

            {/* This is where the pasted signup code starts */}
            <form onSubmit={this.handleSubmit} className="FormFields">

                <div className="FormField_name">
                    <div>
                        <label className="FormField__Label" htmlFor="fname">First Name</label>
                        <input type="text" id="firstName" className="FormField__Name_Input" placeholder="Enter your first name" name="fname" value={this.state.fname} onChange={this.handleChange} />
                    </div>
                    
                    <div id="divLastName">
                        <label className="FormField__Label" htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" className="FormField__Name_Input" placeholder="Enter your last name" name="lname" value={this.state.lname} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="FormField">
                    <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                    <input type="email" id="email" className="FormField__Input" placeholder="Enter a valid .edu email" name="email" value={this.state.email} onChange={this.handleChange}/>
                </div>

                <div className="FormField">
                    <label className="FormField__Label" htmlFor="myPassword">Desired Password</label>
                    <input type="password" id="myPassword" className="FormField__Input" placeholder="6 characters minimum" name="password"  value={this.state.password} onChange={this.handleChange}/>
                </div>

                <div className="FormField">
                    <label className="FormField__Label" htmlFor="confPassword">Confirm Password</label>
                    <input type="password" id="confPassword" className="FormField__Input" placeholder="6 characters minimum" name="confPassword" value={this.state.confPassword} onChange={this.handleChange}/>
                </div>

                <div className="FormField">
                    <Input id="checkInput" name='terms' type='checkbox' value='checked' label='I Agree to the ' /><a href="" className="FormField__TermsLink">terms of service</a>
                </div>

                <div className="FormField" id="submitDiv">
                    <button type="Submit" id="regButton" className="btnSubmit">Sign Up</button>
                </div>    
            </form>

        </div>
    </div>
    }
}