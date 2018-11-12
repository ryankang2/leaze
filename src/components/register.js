import React, {Component} from "react";

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            form: {
                email: "",
                password: "",
            }
        }
    }

    handleChange(event){
        const {name, value} = event.target;
        const {form} = this.state;
        this.setState({form: {...form, [name]: value}});
    }

    handleFormSubmit(event){
        event.preventDefault();
        console.log(this.state);
        const newState = {
            form: {
                email: "",
                password: ""
            }
        }
        this.setState(newState);
    }
    
    render(){
        const {email, password} = this.state.form;
        return (
            <form onSubmit={(event) => {this.handleFormSubmit(event)}}>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} name="email" onChange={(event) => this.handleChange(event)}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} name="password" onChange={(event) => this.handleChange(event)}/>
                </div>
                <button>Register</button>
            </form>
        )
    }
}

export default Register;

