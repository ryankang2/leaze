import React, {Component} from "react";
import "./ForgotPassword.css";

export default class ForgotPassword extends Component { 

    cancelReset(e) {      
        let target = e.target.parentElement;
        target.style.display = "none";
        document.getElementById("codeResent").style.display = "none";
        document.getElementById("forgotCode").value = "";
        document.getElementById("forgotEmail").value = "";
        document.getElementById("myNewPassword").value = "";
        document.getElementById("myConfPassword").value = "";
    }

    FPsubmit(e) {   
        let target = e.target;
        let targetBox = target.parentElement;
        targetBox.style.display = "none"

        if(target.id === "fpEmailSubmit") {
            console.log("We will email a 4-digit confirmation code to the following address: " + 
            document.getElementById("forgotEmail").value);
            document.getElementById("forgotModal2").style.display = "block";
        }

        else if(target.id === "fpCodeSubmit") {
            console.log("This is the code entered: " + document.getElementById("forgotCode").value);
            document.getElementById("forgotModal3").style.display = "block"
        }

        else if(target.id === "fpSubmitPassword") {
            if(document.getElementById("myNewPassword").value.toString().length > 5) {
                if(document.getElementById("myNewPassword").value === document.getElementById("myConfPassword").value) {
                    console.log("Password has successfully been changed!");
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
    }
    
    render() {
        return <div className="modalBox">
            <div className="modal" id="forgotModal1">
                <h3>Forgot Password</h3>
                <div className="FPinputs">
                    <label htmlFor="forgotEmail">E-Mail Address</label>
                    <input className="FPinputbox" type="email" id="forgotEmail" placeholder="Enter a valid .edu email" />
                </div>
                <button onClick={this.FPsubmit} className="FPsubmit" id="fpEmailSubmit">Submit</button>
                <button onClick={this.cancelReset} className="FPcancel">Cancel</button>
            </div>
            
            <div className="modal" id="forgotModal2">
                <h3>Forgot Password</h3>
                <p id="codeResent">A code has been resent to your email</p>
                <div className="FPinputs">
                    <label htmlFor="forgotCode">4-Digit Code</label>
                    <input className="FPinputbox" id="forgotCode" placeholder="Enter the code that was sent to you" />
                </div>
                <button onClick={this.resendCode} id="resendCode">Resend Code</button>
                <button onClick={this.FPsubmit} className="FPsubmit" id="fpCodeSubmit">Submit</button>
                <button onClick={this.cancelReset} className="FPcancel">Cancel</button>
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
                <button onClick={this.FPsubmit} className="FPsubmit" id="fpSubmitPassword">Submit</button>
                <button onClick={this.cancelReset} className="FPcancel">Cancel</button>
            </div>

        </div>
    }
}