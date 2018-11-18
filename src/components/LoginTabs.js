import React, {Component} from "react";
import "./LoginTabs.css";
import { fail } from "assert";

export default class LoginTabs extends Component {
    switchTab(event, loginTab) {
        if (loginTab === 'Login') {
            document.getElementById("Register").style.display = "none";
            document.getElementById("Login").style.display = "block"
        }
        else {
            document.getElementById("Login").style.display = "none";
            document.getElementById("Register").style.display = "block";
        }
    }

    loginSubmit(email, password) {
        let dataObj = { 
            email: email,
            password: password
        }
        $.ajax({
            crossDomain: true,
            data: dataObj,
            url: "http://localhost:8000/api/queries/sign_in.php",
            method: "POST",
            success: (response) => this.handleLoginResponse(response),
            headers: {
                "accept": "application/json",
                "Access-Control-Allow-Origin":"*"
            }
            
        });
    }


    registerSubmit(fname, lname, email, password, confPassword) {
        if(password === confPassword) {
            if(password.length > 5) {
                if(document.getElementById("checkInput").checked) {
                    console.log(fname);
                    console.log(lname);
                    console.log(email);
                    console.log(password);
                    let dataObj = { 
                        first_name: fname,
                        last_name: lname,
                        email: email,
                        password: password,
                    }
                    $.ajax({
                        crossDomain: true,
                        data: dataObj,
                        url: "http://localhost:8000/api/mail_handler.php",
                        method: "POST",
                        success: function(msg){
                            console.log("SUCCESS!!!");
                        },
                        headers: {
                            "accept": "application/json",
                            "Access-Control-Allow-Origin":"*"
                        }
                        
                    });

                }

                else {
                    console.log("Please agree to terms and services before submitting");
                }
            }

            else {
                console.log("Password length must be at least 6 characters long");
            }
        }

        else {
            console.log("Your two password entries don't match");
        }
    }


    render () {
        return <div id="logTabs">
            <div className="tabs">
                <button className="tablinks" onClick={(event) => this.switchTab(this.event, 'Login')} id="defaultOpen">Log in</button>
                <button className="tablinks" onClick={(event) => this.switchTab(this.event, 'Register')}>Register</button>
            </div>

            <div className="tabcontent" id="Login">
                <h3>Log in</h3>
                <div id="logContainer">
                    <form>
                        <label for="loginEmail">Email</label>
                        <input id="loginEmail"></input>
                    </form>
                    <form>
                        <label for="password">Password</label>
                        <input id="password" type="password"></input>
                    </form>
                    <button onClick={(event) => this.loginSubmit(document.getElementById("loginEmail").value, document.getElementById("password").value)} id="loginButton">Log in</button>
                </div>
            </div>
            <div className="tabcontent" id="Register">
                <h3>Register</h3>
                <div id="logContainer">

                    {/* This is where the pasted signup code starts */}

                    <div className="FormField_name">
                        <div>
                            <label className="FormField__Label" htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" className="FormField__Name_Input" placeholder="Enter your first name" name="firstName" value="Ryan" />
                        </div>
                        
                        <div id="divLastName">
                            <label className="FormField__Label" htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" className="FormField__Name_Input" placeholder="Enter your last name" name="lastName" value="Kang"/>
                        </div>
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                        <input type="email" id="email" className="FormField__Input" placeholder="Enter a valid .edu email" name="email" />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="myPassword">Desired Password</label>
                        <input type="password" id="myPassword" className="FormField__Input" placeholder="6 characters minimum" name="password" value="123123" />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="birthday">Confirm Password</label>
                        <input type="password" id="confPassword" className="FormField__Input" placeholder="6 characters minimum" name="confPassword" value="123123"/>
                    </div>

                    <div className="FormField">
                        <label className="FormField__CheckboxLabel">
                            <input className="FormField__Checkbox" type="checkbox" name="hasAgreed" id="checkInput" /> I agree to the<a href="" className="FormField__TermsLink"> terms of service</a>
                        </label>
                    </div>

                    <div className="FormField">
                        <button onClick={(event) => this.registerSubmit(document.getElementById("firstName").value, document.getElementById("lastName").value, document.getElementById("email").value, document.getElementById("myPassword").value, document.getElementById("confPassword").value)} id="regButton">Sign Up</button>
                    </div>    

                </div>
            </div>

        </div>
    }
}
