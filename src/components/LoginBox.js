import React, {Component} from "react";
import {formatPostData} from "../helpers/formatPostData";
import axios from "axios";
import {Link} from "react-router-dom";
import "./LoginBox.css";

export default class LoginBox extends Component {

    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            active: false,
            classEmail: "valid",
            classPassword: "valid",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggle(){
        this.setState({active: true});
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.toggle();
        if(this.infoChecks(this.state.email, this.state.password) === true) {
            const params = formatPostData(this.state);
            const response = await axios.post("http://localhost:8000/api/queries/sign_in.php", params);
            // this.props.getFilterData(response, params);
            console.log(response.data);  
            this.handleResponse(response.data);     
        }
    }

    handleResponse(data) {
        if(data.success === false) {
            if(data.correctUser === true) {
                console.log("Incorrect password. Please try again or click 'Forgot Password'");
                document.getElementById("wrongInput").className = "show";
                document.getElementById("wrongInput").innerText = "Incorrect password. Please try again or click 'Forgot Password";
                this.setState({classPassword:"invalid"});
                this.setState({classEmail:"valid"})
            }

            else {
                console.log("User not found. Please sign in with a different account or register before signing in");
                document.getElementById("wrongInput").className = "show";
                document.getElementById("wrongInput").innerText = "User not found. Please sign in with a different account or register before signing in";
                this.setState({classEmail:"invalid"});
            }
        }

        else {
            console.log("Login successful. User will be redirected to the explore page");
            document.getElementById("wrongInput").className="hidden";
            this.setState({classPassword:"valid"});
            this.setState({classPassword:"valid"});
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
        return <div className="tabcontent" id="Login">
            <div className="logContainer" id="logContainer">
                <form onSubmit={this.handleSubmit} className="FormFields">
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="loginEmail">E-Mail Address</label>
                        <input type="email" id="loginEmail" className={this.state.active ? this.state.classEmail : "FormField__Input"} placeholder="Enter a valid .edu email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="loginPassword">Password</label>
                        <input type="password" id="loginPassword" className={this.state.active ? this.state.classPassword: "FormField__Input"} placeholder="6 characters minimum" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <span id="wrongInput" className="hidden"></span>
                    <button type="Submit" id="loginButton" className="btnSubmit">Log in</button>
                </form>
                <button onClick={this.forgotPassword} id="forgotPassword">Forgot Password</button>
            </div>
        </div>    
    }
}