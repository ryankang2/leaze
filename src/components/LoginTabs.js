import React, {Component} from "react";

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
        console.log(email);
        console.log(password);
    }

    registerSubmit(name, email, password) {
        console.log(name);
        console.log(email);
        console.log(password);
    }

    render () {
        return <div id="logTabs">
            <div class="tabs">
                <button class="tablinks" onClick={(event) => this.switchTab(this.event, 'Login')} id="defaultOpen">Log in</button>
                <button class="tablinks" onClick={(event) => this.switchTab(this.event, 'Register')}>Register</button>
            </div>

            <div class="tabcontent" id="Login">
                <h3>Log in</h3>
                <div id="logContainer">
                    <form>
                        <label for="loginEmail">Email</label>
                        <input id="loginEmail"></input>
                    </form>
                    <form>
                        <label for="password">Password</label>
                        <input id="password"></input>
                    </form>
                    <button onClick={(event) => this.loginSubmit(document.getElementById("loginEmail").value, document.getElementById("password").value)} id="loginButton">Log in</button>
                </div>
            </div>
            <div class="tabcontent" id="Register">
                <h3>Register</h3>
                <div id="logContainer">

                    {/* This is where the pasted signup code starts */}

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="name">Full Name</label>
                        <input type="text" id="name" className="FormField__Input" placeholder="Enter your full name" name="name" />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                        <input type="email" id="email" className="FormField__Input" placeholder="Enter a valid .edu email" name="email" />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="myPassword">Desired Password</label>
                        <input type="password" id="myPassword" className="FormField__Input" placeholder="6 characters minimum" name="password"  />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="birthday">Confirm Password</label>
                        <input type="text" id="confPassword" className="FormField__Input" placeholder="6 characters minimum" name="confPassword" />
                    </div>

                    <div className="FormField">
                        <label className="FormField__CheckboxLabel">
                        
                            <input className="FormField__Checkbox" type="checkbox" name="hasAgreed" /> I agree to the<a href="" className="FormField__TermsLink"> terms of service</a>
                        </label>
                    </div>

                    <div className="FormField">
                        <button onClick={(event) => this.registerSubmit(document.getElementById("name").value, document.getElementById("email").value, document.getElementById("myPassword").value)} id="regButton">Sign Up</button>
                    </div>    

                </div>
            </div>

        </div>
    }
}