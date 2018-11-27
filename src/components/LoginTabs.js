import React, {Component} from "react";
import "./LoginTabs.css";
import "./LoginBox.js";
import LoginBox from "./LoginBox.js";



export default class LoginTabs extends Component {

    constructor(mn  ) {
        super();
        

        this.state = {u
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
   
   



    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        
        this.toggler();
        if(this.registerSubmit() === true) {
            console.log('Register successful with the following data:');
            console.log(this.state);
        }
    }

    registerSubmit() {
        
        if(document.getElementById("checkInput").checked) {
            document.getElementById("ToS").className = "hidden";
            const errors = this.vali(this.state.fname, this.state.lname,
                                this.state.email, this.state.password,
                                this.state.confPassword);
            //if every state is free of errors returns false
            const isValid = Object.keys(errors).some(i => errors[i]);
            if(!isValid){
                return true;
            }
            else{
                return false;
            }
        }
        else {
            document.getElementById("ToS").className = "show";
            return false;
        }

     } 

    validEmail(email) {
        
        let valid = email.substr(email.length - 4);
        if(valid === ".edu") {
            return false
        }

        else {
            return true;
        }
    }

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
    //turns on error handling, is called when form submits
    toggler(){
        this.setState({active: true});
    }
    /* Method to validate the values within each state.
    *  if a state has an error its value is set to true,
    *  false otherwise.
    */
    vali(fname, lname, email, password, confPassword){
        return{
            fname: fname.length === 0,
            lname: lname.length === 0,
            email: this.validEmail(email),
            password: password.length === 0,
            confPassword: !(password === confPassword),
        };
    }
    /* Method to check whether the current value of the state
    *  contains errors. Returns the appropriate className to style the
    *  input boxes
    */
    checkError(field){
        const errors = this.vali(this.state.fname, this.state.lname, 
                            this.state.email, this.state.password, this.state.confPassword);
        const hasError = errors[field];
        if(hasError){
            return "formField_Input_Error";
        }
        else{
            return "FormField__Input";
        }
    }

    render () {
        return <div id="logTabs">
            <div class="tabs">
                <button class="tablinks" onClick={(event) => this.switchTab(this.event, 'Login')} id="defaultOpen">Log in</button>
                <button class="tablinks" onClick={(event) => this.switchTab(this.event, 'Register')}>Register</button>
            </div>
            
            <LoginBox />
            
            <div class="tabcontent" id="Register">
                <h3>Register</h3>
              
                <div className="logContainer">
                
                    {/* This is where the pasted signup code starts */}
                    <form onSubmit={this.handleSubmit} className="FormFields">

                        <div className="FormField_name">
                            <div>
                            
                                <label className="FormField__Label" htmlFor="fname">First Name</label>
                                <input type="text" id="firstName" className={this.state.active ? this.checkError("fname") : "FormField__Input"} placeholder="Enter your first name" name="fname" value={this.state.fname} onChange={this.handleChange} />

                            </div>
                            
                            <div id="divLastName">
                                <label className="FormField__Label" htmlFor="lastName">Last Name</label>
                                <input type="text" id="lastName" className={this.state.active ? this.checkError("lname"): "FormField__Name_Input"} placeholder="Enter your last name" name="lname" value={this.state.lname} onChange={this.handleChange}/>
                                
                            </div>
                        </div>

                        <br/>
                        

                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                            <input type="email" id="email" className={this.state.active ? this.checkError("email") : "FormField__Input"} placeholder="Enter a valid .edu email" name="email" value={this.state.email} onChange={this.handleChange}/>
                        </div>
                        

                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="myPassword">Desired Password</label>
                            <input type="password" id="myPassword" className={this.state.active ? this.checkError("password"): "FormField__Input"} placeholder="6 characters minimum" name="password"  value={this.state.password} onChange={this.handleChange}/>
                        </div>

                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="confPassword">Confirm Password</label>
                            <input type="password" id="confPassword" className={this.state.active ? this.checkError("confPassword"): "FormField__Input"} placeholder="6 characters minimum" name="confPassword" value={this.state.confPassword} onChange={this.handleChange}/>
                            
                           
                        </div>

                        

                        <div className="FormField">
                            <label className="FormField__CheckboxLabel">
                                <input className="FormField__Checkbox" type="checkbox" name="hasAgreed" id="checkInput" /> I agree to the<a href="" className="FormField__TermsLink"> terms of service</a>
                            </label>
                        </div>
                        <span id="ToS" className="hidden" style={{color:"orange"}}>Please agree to the terms of service </span> 

                        

                        <div className="FormField">
                            <button type="Submit" id="regButton" className="btnSubmit">Sign Up</button>
                        </div> 
                        
                    </form>

                </div>
            </div>
   
    }
    
}