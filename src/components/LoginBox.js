import React, {Component} from "react";
import "./LoginBox.css";
import {formatPostData} from "../helpers/formatPostData";
import axios from "axios";

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

    async handleSubmit(e) {
        e.preventDefault();
        
        if(this.infoChecks(this.state.email, this.state.password) === true) {
            const params = formatPostData(this.state);
            const response = await axios.post("http://localhost:8000/api/queries/sign_in.php", params);
            // this.props.getFilterData(response, params);
            console.log(response.data);
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