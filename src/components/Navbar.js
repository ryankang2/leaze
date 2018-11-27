import React, {Component} from "react";
import "./Navbar.css";
import {formatPostData} from "../helpers/formatPostData";
import axios from "axios";
class Navbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchQuery: "",
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleInput(event){
        const {value} = event.target;
        this.setState({
            searchQuery: value,
        })
    }

    async handleFormSubmit(event){
        event.preventDefault();
        event.stopPropagation();
        const params = formatPostData(this.state);
        const response = await axios.post("http://localhost:8000/api/queries/searchbox.php",params);
        console.log(response);
        this.setState({
            searchQuery: "",
        });
    }


    render(){
        const {searchQuery} = this.state;
        return (
            <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                        <a className="navbar-brand" href="#">Leaze</a>
                        </div>
                        <form className="navbar-form navbar-left" onSubmit={(event) => this.handleFormSubmit(event)}>
                            <div className="form-group">
                                <input type="text" value={searchQuery} name="userInput" className="form-control searchBox" placeholder="Search..." onChange={(event) => this.handleInput(event)}/>
                            </div>
                            <button type="submit" className="btn btn-default">
                                <i className="glyphicon glyphicon-search"></i>
                            </button>
                        </form>
                        <div className="profileContainer">
                            <div>Welcome, USER</div>
                            <ul className="nav navbar-nav settingsContainer">
                                <li><a href="#"><i className="glyphicon glyphicon-edit"></i></a></li>
                                <li><a href="#"><i className="glyphicon glyphicon-envelope"></i></a></li>
                                <li><a href="#"><i className="glyphicon glyphicon-bell"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
        );
    }
}

export default Navbar;