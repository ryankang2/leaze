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

    registerSubmit(email) {
        console.log(email);
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
                    <form>
                        <label for="regEmail">Email</label>
                        <input id="regEmail"></input>
                    </form>
                    <button onClick={(event) => this.registerSubmit(document.getElementById("regEmail").value)} id="regButton">Next</button>
                </div>
            </div>

        </div>
    }
}