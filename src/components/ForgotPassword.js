import React, {Component} from "react";
import {Button, Input, Row} from "react-materialize";
import {formatPostData} from "../helpers/formatPostData";
import axios from "axios";
import "./ForgotPassword.css";

export default class ForgotPassword extends Component { 
    constructor(props){
        super(props);
        this.state = {
            email: "",
        }
    }

    cancelReset(e) {      
        let target = e.target.parentElement;
        target.style.display = "none";
        document.getElementById("codeResent").style.display = "none";
        document.getElementById("forgotCode").value = "";
        document.getElementById("forgotEmail").value = "";
        document.getElementById("myNewPassword").value = "";
        document.getElementById("myConfPassword").value = "";
    }

    async sendCode(email){
        var emailObj = {
            email_of_user: email
        };
        const params = formatPostData(emailObj);
        const response = await axios.post("http://localhost:8000/api/email_recovery.php", params);
    }

    async confirmCode(code, email){
        var confirmObj = {
            code_to_confirm: code,
            email_of_user: email,
        };
        const params = formatPostData(confirmObj);
        const response = await axios.post("http://localhost:8000/api/queries/confirm_code.php", params);
        console.log("RESPONSE FROM BACKEND", response);
        if(!response.data.success){
            console.log("hello " + document.getElementById("forgotModal3").innerText);
            document.getElementById("forgotModal3").style.display='none';
            document.getElementById("forgotModal4").style.display = "block"

        }
        else{
            document.getElementById("forgotModal4").style.display='none';
        }
    }


    async updatePassword(email, password){
        var emailPassObj = {
            email: email,
            password: password,
        }
        const params = formatPostData(emailPassObj);
        const response = await axios.post("http://localhost:8000/api/queries/change_password.php", params);
        console.log("response from backend: ", response);
    }

    FPsubmit(e) {   
        let target = e.target;
        let targetBox = target.parentElement;
        targetBox.style.display = "none"

        if(target.id === "fpEmailSubmit") {
            console.log("We will email a 4-digit confirmation code to the following address: " + 
            document.getElementById("forgotEmail").value);
            var email = document.getElementById("forgotEmail").value;
            this.setState({
                email: email,
            });
            this.sendCode(email);
            document.getElementById("forgotModal2").style.display = "block";
        }

        else if(target.id === "fpCodeSubmit") {
            console.log("This is the code entered: " + document.getElementById("forgotCode").value);
            var code = document.getElementById("forgotCode").value;
            var email = this.state.email;
            this.confirmCode(code, email);
            document.getElementById("forgotModal3").style.display = "block"
        }

        else if(target.id === "fpSubmitPassword") {
            if(document.getElementById("myNewPassword").value.toString().length > 5) {
                if(document.getElementById("myNewPassword").value === document.getElementById("myConfPassword").value) {
                    console.log("Password has successfully been changed!");
                    var password = document.getElementById("myNewPassword").value;
                    this.updatePassword(this.state.email, password);
                }

                else {
                    console.log("Passwords do not match");
                    targetBox.style.display = "block";
                }
            }

            else {
                console.log("Password must be atleast 6 characters long");
                targetBox.style.display = "block";
            }

        }
    }


    
    resendCode(e) {
        document.getElementById("forgotCode").value = "";
        document.getElementById("codeResent").style.display = "block";
        console.log("Confirmation code resent to: " + document.getElementById("forgotEmail").value);
        this.sendCode(this.state.email);
    }
    
    render() {
        return <div className="fpmodalBox">
            <div className="modal" id="forgotModal1">
                <h3>Forgot Password</h3>
                <div>Enter your email address to receive 4-digit confirmation code</div>
                <div className="FPinputs">
                    <input className="FPinputbox" type="email" id="forgotEmail" placeholder="Email" />
                </div>
                <button onClick={this.cancelReset} className="FPcancel">Cancel</button>
                <button onClick={this.FPsubmit.bind(this)} className="FPsubmit" id="fpEmailSubmit">Submit</button>
            </div>
            
            <div className="modal" id="forgotModal2">
                <h3>Forgot Password</h3>
                <p id="codeResent">A code has been resent to your email</p>
                <div className="FPinputs">
                    <label htmlFor="forgotCode">4-Digit Code</label>
                    <input className="FPinputbox" id="forgotCode" placeholder="Enter the code that was sent to you" />
                </div>
                <button onClick={this.resendCode.bind(this)} id="resendCode">Resend Code</button>
                <button onClick={this.FPsubmit.bind(this)} className="FPsubmit" id="fpCodeSubmit">Submit</button>
                <button onClick={this.cancelReset.bind(this)} className="FPcancel">Cancel</button>
            </div>

            <div className="modal" id="forgotModal3">
                <h3>Success!</h3>
                <div className="FPinputs">
                    <label htmlFor="myNewPassword">New Password</label>
                    <input type="password" className="FPinputbox" id="myNewPassword" placeholder="Password must be at least 6 characters long" />
                </div>

                <div className="FPinputs">
                    <label htmlFor="myConfPassword">Confirm New Password</label>
                    <input type="password" className="FPinputbox" id="myConfPassword" placeholder="Re-enter your new password" />
                </div>
                <button onClick={this.FPsubmit.bind(this)} className="FPsubmit" id="fpSubmitPassword">Submit</button>
                <button onClick={this.cancelReset.bind(this)} className="FPcancel">Cancel</button>
            </div>

            <div className="modal" id="forgotModal4">
                <h3>Forgot Password</h3>
                <p id="wrongCode"> The number you entered doesn’t match your code. Please try again. </p>
                <p id="codeResent">A code has been resent to your email</p>
                <div className="FPinputs">
                    <label htmlFor="forgotCode">4-Digit Code</label>
                    <input className="FPinputbox" id="forgotCode" placeholder="Enter the code that was sent to you" />
                </div>
                <button onClick={this.resendCode.bind(this)} id="resendCode">Resend Code</button>
                <button onClick={this.FPsubmit.bind(this)} className="FPsubmit" id="fpCodeSubmit">Submit</button>
                <button onClick={this.cancelReset.bind(this)} className="FPcancel">Cancel</button>
            </div>
        </div>
    }
}