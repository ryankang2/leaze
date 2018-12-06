import React, {Component} from "react";
import {Input, Row, Icon, Button} from "react-materialize";
import axios from "axios";
import {formatPostData} from "../helpers/formatPostData";

export default class RegisterBox extends Component {

    constructor() {
        super();

        this.state = {
            fname: '',
            lname: '',
            email: '',
            password: '',
            confPassword: '',
            active: false,

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggle(){
        this.setState({active: true});
    }

    validate(fname, lname, email, password, confPassword){
        return{
            fname: fname.length === 0,
            lname: lname.length === 0,
            email: !this.validEmail(email),
            password: password.length === 0 || password.length < 6,
            confPassword: confPassword.length === 0 || !(password === confPassword),
            
        };
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
        if(this.state.active){
            if(this.checkError(name)=== "valid"){
                document.getElementById("wrongInputRegister").className = "hidden";
            }
        }
        
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if(this.registerSubmit() === true&&document.getElementById("checkInput").checked) {
            const params = formatPostData(this.state);
            const mailResponse = await axios.post("http://localhost:8000/api/mail_handler.php", params);
            const regResponse = await axios.post("http://localhost:8000/api/queries/user_reg.php", params);
            var userCode = (mailResponse.data.slice(mailResponse.data.length-5, -1));
            sessionStorage.setItem("userCode", userCode);
            document.getElementById("confRegister").style.display = "block";
        }
    }

    registerSubmit() {

        this.toggle();
        const errors = this.validate(this.state.fname, this.state.lname, this.state.email, 
                                    this.state.password, this.state.confPassword);
        
        let isValid = Object.keys(errors).some(i => errors[i]);
       
        if(!isValid){
            document.getElementById("wrongInputRegister").className = "hidden";
            return true;
        }
        else{
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

    termsPopup(e) {
        document.getElementById("termsModal").style.display = "block";
    }

    closeTerms(e) {
        document.getElementById("termsModal").style.display = "none";
    }
    checkError(field){

        const errors = this.validate(this.state.fname, this.state.lname, 
                                 this.state.email, this.state.password, this.state.confPassword);
        const hasError = errors[field];
        
        
        if(hasError){
            if(errors["email"]){
                document.getElementById("wrongInputRegister").className = "FormFieldsError";
                document.getElementById("wrongInputRegister").innerText = "You must enter a valid .edu email address";
            }
            else if(errors["password"]){
                document.getElementById("wrongInputRegister").className = "FormFieldsError";
                document.getElementById("wrongInputRegister").innerText = "Password must be at least six characters long";
                
            }
            else if(errors["confPassword"]){
                document.getElementById("wrongInputRegister").className = "FormFieldsError";
                document.getElementById("wrongInputRegister").innerText = "Passwords must match";  
            }
            else if(errors["fname"]||errors["lname"]){
                document.getElementById("wrongInputRegister").className = "FormFieldsError";
                document.getElementById("wrongInputRegister").innerText = "All fields must be filled";
            }
            return "invalid";
        }
        else{
            let isValid = Object.keys(errors).some(i => errors[i]);
            if(!document.getElementById("checkInput").checked&&!isValid){
                document.getElementById("wrongInputRegister").className = "FormFieldsError";
                document.getElementById("wrongInputRegister").innerText = "Please agree to the terms of service";
            }
            
            return "valid";
        }
    }

    cancelConfirm(e) {      
        let target = e.target.parentElement.parentElement;
        target.style.display = "none";
        document.getElementById("confCodeResent").style.display = "none";
        document.getElementById("confWrongCode").style.display = "none";
        document.getElementById("confForgotCode").value = "";
    }

    // Ask Ryan about what to do upon submit
    confirmSubmit(e) { 
        
        document.getElementById("confCodeResent").style.display = "none";
        let correctCode = sessionStorage.getItem("userCode");
        let enteredCode = document.getElementById("confForgotCode").value;

        if(correctCode !== enteredCode) {
            document.getElementById("confWrongCode").style.display="block";
        }

        else {
            //Display message saying they can now cancel and log in
            document.getElementById("confWrongCode").style.display="none";
            document.getElementById("confCodeResent").style.display = "none";
            document.getElementById("correctCodeMsg").style.display = "block"

        }    
    }

    confResendCode(e) {
        document.getElementById("confForgotCode").value = "";
        document.getElementById("confCodeResent").style.display = "block";

        // this.sendCode(this.state.email);
    }

    render() {
        return <div className="tabcontent" id="Register">
        <div className="logContainer">
        
        <div className="modal" id="confRegister">
            <h3>Confirm your account</h3>
            <p id="confWrongCode"> The number you entered doesn’t match your code. Please try again. </p>
            <p id="confCodeResent">A code has been resent to your email</p>
            <p id="correctCodeMsg">Code confirmed! You can now go back and Log In</p>
            <div>
                <label htmlFor="confForgotCode">4-Digit Code</label>
                <Row>
                    <Input s={10} label="Enter the code that was sent to you" id="confForgotCode"
                            name="code" onChange={this.handleChange}>
                        <Icon> check_circle_outline</Icon>
                    </Input>
                </Row>
            </div>
            <div className="confButtons">
                <Button onClick={this.confResendCode.bind(this)}>Resend Code</Button>
                <Button onClick={this.cancelConfirm.bind(this)} className="FPcancel">Cancel</Button>
                <Button onClick={this.confirmSubmit.bind(this)} id="confCodeSubmit">Submit</Button>
            </div>
        </div>

            <form onSubmit={this.handleSubmit} className="FormFields">
                <h4>Create a LEaZe Account</h4>

                <div className="FormField">
                    <Row>
                        <Input s={5} label="First Name" type="text" id="firstName" className={this.state.active ? this.checkError("fname") : "FormField__Input"} placeholder="Enter your first name"
                            name="fname" value={this.state.fname} onChange={this.handleChange}>
                        <Icon>face</Icon>
                        </Input>
                        <Input s={5} label="Last Name" type="text" id="lastName" className={this.state.active ? this.checkError("lname") : "FormField__Input"} placeholder="Enter your last name"
                            name="lname" value={this.state.lname} onChange={this.handleChange}>
                        </Input>
                    </Row>
                </div>
                <div className="FormField">
                    <Row>
                        <Input s={8} label="Email" type="email" id="email" className={this.state.active ? this.checkError("email") : "FormField__Input"} placeholder="Enter a valid .edu email"
                            name="email" value={this.state.email} onChange={this.handleChange}>
                            <Icon>email</Icon>
                        </Input>
                    </Row>
                </div>

                <div className="FormField">
                    <Row>
                        <Input s={8} label="Enter desired password" type="password" id="myPassword" className={this.state.active ? this.checkError("password") : "FormField__Input"} placeholder="6 characters minimum" 
                            name="password"  value={this.state.password} onChange={this.handleChange}>
                            <Icon>lock</Icon>
                        </Input>
                    </Row>

                </div>

                <div className="FormField">
                    <Row>
                        <Input s={8} label="   Confirm password" type="password" id="confPassword" className={this.state.active ? this.checkError("confPassword") : "FormField__Input"} placeholder="" 
                            name="confPassword" value={this.state.confPassword} onChange={this.handleChange}>
                            <Icon>check_circle</Icon>
                        </Input>
                    </Row>             
                </div>

                <div className="FormField">
                    <Input id="checkInput" name='terms' type='checkbox' onClick={this.handleChange} value='checked' label='I Agree to the ' /><a href="" className="FormField__TermsLink" >terms of service</a>
                </div>

                <br/>
                <p id="wrongInputRegister" className="hidden"></p>

                <div className="FormField" id="submitDiv">
                    <button type="Submit" id="regButton" className="btn btn-primary">Sign Up</button>
                </div>    
            </form>

            <div className="modal" id="termsModal">
                <p id="termsP">These will be the terms of service that a user of LEaze must sign and adhere to.</p>
                <button onClick={this.closeTerms} id="closeTerms">Sounds good</button>
            </div>

        </div>
    </div>
    }
}