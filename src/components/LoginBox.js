import React, {Component} from "react";
import {formatPostData} from "../helpers/formatPostData";
import axios from "axios";
import { Link, Router, RouterContext, browserHistory, hashHistory } from 'react-router';
import {Input, Row, Icon} from "react-materialize";
import { css } from '@emotion/core';
import './LoginBox.css'
// First way to import
import { ClipLoader } from 'react-spinners';

const override = css`
    display: none;
    margin: 0 auto;
    position: absolute;
    top: 20%;
`;
export default class LoginBox extends Component {
    

    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            active: false,
            classEmail: "valid",
            classPassword: "valid",
            loading: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    toggle(){
        this.setState({active: true});
    }

    toggleSpin(){
        this.setState({loading:!this.state.loading})
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
        this.toggleSpin();
        e.preventDefault();
        this.toggle();
        if(this.infoChecks(this.state.email, this.state.password) === true) {
            const params = formatPostData(this.state);
            const response = await axios.post("/api/queries/sign_in.php", params);
            this.handleResponse(response.data);     
        }
    }

    handleResponse(data) {
        const {history} = this.props;
        if(data.success === false) {
            if(data.correctUser === true) {
                this.toggleSpin();
                console.log("Incorrect password. Please try again or click 'Forgot Password'");
                document.getElementById("wrongInputLogin").className = "FormFieldsError";
                document.getElementById("wrongInputLogin").innerText = "Incorrect password. Please try again or click 'Forgot Password'.";
                this.setState({classPassword:"invalid"});
                this.setState({classEmail:"valid"})
            }

            else {
                this.toggleSpin();
                console.log("User not found. Please sign in with a different account or register before signing in");
                document.getElementById("wrongInputLogin").className = "FormFieldsError";
                document.getElementById("wrongInputLogin").innerText = "Email Address not found.";
                this.setState({classEmail:"invalid"});
            }
        }

        else {
            console.log("Login successful. User will be redirected to the explore page");
            // document.getElementById("wrongInputLogin").className="hidden";
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
                    <p id="wrongInputLogin"></p>
                    <button type="Submit" id="loginButton" className="btn btn-primary" >Log In                         
                    <ClipLoader
                        className={override}
                        sizeUnit={"px"}
                        size={20}
                        color={'#123abc'}
                        loading={this.state.loading}/>                  
                    </button>
                </form>
                
                <button onClick={this.forgotPassword} id="forgotPassword">Forgot Password</button>
            </div>
        </div>    
    }
}
