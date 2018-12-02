import React, {Component} from "react";
import {formatPostData} from "../helpers/formatPostData";
import axios from "axios";
import { Link, Router, RouterContext, browserHistory, hashHistory } from 'react-router';
import {Input, Row, Icon} from "react-materialize";

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
            console.log(response.data);  
            this.handleResponse(response.data);     
        }
    }

    handleResponse(data) {
        const {history} = this.props;
        if(data.success === false) {
            if(data.correctUser === true) {
                console.log("Incorrect password. Please try again or click 'Forgot Password'");
                document.getElementById("wrongInputLogin").className = "show";
                document.getElementById("wrongInputLogin").innerText = "Incorrect password. Please try again or click 'Forgot Password";
                this.setState({classPassword:"invalid"});
                this.setState({classEmail:"valid"})
            }

            else {
                console.log("User not found. Please sign in with a different account or register before signing in");
                document.getElementById("wrongInputLogin").className = "show";
                document.getElementById("wrongInputLogin").innerText = "User not found. Please sign in with a different account or register before signing in";
                this.setState({classEmail:"invalid"});
            }
        }

        else {
            console.log("Login successful. User will be redirected to the explore page");
            // document.getElementById("wrongInputLogin").className="hidden";
            this.setState({classPassword:"valid"});
            this.setState({classPassword:"valid"});
            sessionStorage.setItem("user_id", data.id);
            browserHistory.push("/home");
            window.location.reload();
        }
    }

    infoChecks(email, password) {
        return true;
    } 

    forgotPassword(e) {
        let modal = document.getElementById("forgotModal1");
        modal.style.display = "block"
    }

    render() {
        return <div className="tabcontent" id="Login">
            <div className="logContainer" id="logContainer">
                <form onSubmit={this.handleSubmit} className="FormFields">
                    <h4>Sign in to access your LEaZe account</h4>
                    <div className="FormField">
                        <Row>
                            <Input s={8} label="Email" type="email" id="loginEmail" className={this.state.active ? this.state.classEmail : "FormField__Input"} 
                                name="email" value={this.state.email} onChange={this.handleChange}> 
                                <Icon>account_circle</Icon> 
                            </Input>
                        </Row>
                    </div>

                    <div className="FormField">
                        <Row>
                            <Input s={8} label="Password" type="password" id="loginPassword" className={this.state.active ? this.state.classPassword: "FormField__Input"} 
                                name="password" value={this.state.password} onChange={this.handleChange}>
                                <Icon>lock</Icon>
                            </Input>
                        </Row>
                    </div>
                    <button type="Submit" id="loginButton" className="btn btn-primary">Log in</button>
                </form>
                <button onClick={this.forgotPassword} id="forgotPassword">Forgot Password</button>
            </div>
        </div>    
    }
}