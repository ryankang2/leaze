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

    componentDidMount(){
        var userID = sessionStorage.getItem("user_id");
        this.getUserName(userID);
    }

    handleInput(event){
        const {value} = event.target;
        this.setState({
            searchQuery: value,
        })
    }

    async getUserName(userID){
        const userObj = { 
            id: userID,
        };
        const params = formatPostData(userObj);
        const response = await axios.post("http://localhost:8000/api/queries/get_single_user.php", params);
        console.log(response);
        this.changeName(response.data.user);
    }

    changeName(user){
        $(".welcome").text("Welcome, " + user[0].first_name + "!");
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
                    <div className="container container-fluid">
                        <div className="row">
                            <div className="col-xs-3 col-sm-3 col-md-3 navbar-header">
                                <img className="logoPic" src={require('./logo_transparent.png')} alt=""/>
                            </div>
                            <form className="col-xs-3 col-sm-5 col-md-5 navbar-form navbar-left" onSubmit={(event) => this.handleFormSubmit(event)}>
                                <div className="form-group">
                                    <input type="search " value={searchQuery} name="userInput" className="form-control searchBox" placeholder="Search..." onChange={(event) => this.handleInput(event)}/>
                                    <i className="searchIcon fa fa-search"></i>
                                </div>
                            </form>
                            <div className="col-xs-2 col-sm-2 col-md-2 profileContainer">
                                <div className="welcome"> 
                                    <i className="fa fa-user-circle-o"></i>
                                </div>
                                <ul className="nav navbar-nav settingsContainer">
                                    <li><a href="#"><i className="glyphicon glyphicon-edit"></i></a></li>
                                    <li><a href="#"><i className="glyphicon glyphicon-envelope"></i></a></li>
                                    <li><a href="#"><i className="glyphicon glyphicon-bell"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
        );
    }
}

export default Navbar;