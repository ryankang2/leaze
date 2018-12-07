import React, {Component} from "react";
import "./Navbar.css";
import {formatPostData} from "../helpers/formatPostData";
import axios from "axios";
import {Link} from "react-router-dom";

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

    logout(user){
        sessionStorage.setItem("user_id", "-1");
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
        var linkQuery = "/home/profile/" + sessionStorage.getItem("user_id");
        var linkQueryMessages = linkQuery + "/messages";
        var linkQueryLogin = "/";


        return (
            <nav className="navbar navbar-inverse">
                    <div className="container container-fluid">
                        <div className="row">
                            <Link to="/home">
                                <div className="col-xs-3 col-sm-3 col-md-3 navbar-header">
                                    <img className="logoPic" src={require('../../dist/logo_transparent.png')} alt=""/>
                                </div>              
                            </Link>
                            {/*<form className="col-xs-3 col-sm-5 col-md-5 navbar-form navbar-left" onSubmit={(event) => this.handleFormSubmit(event)}>*/}
                                {/*<div className="form-group">*/}
                                    {/*<input type="search " value={searchQuery} name="userInput" className="form-control searchBox" placeholder="Search..." onChange={(event) => this.handleInput(event)}/>*/}
                                    {/*<i className="searchIcon fa fa-search"></i>*/}
                                {/*</div>*/}
                            {/*</form>*/}
                            <ul className="col-xs-2 col-sm-2 col-md-2 profileContainer">
                                <Link to = {linkQuery}>
                                    <div className="welcome">
                                        <i className="fa fa-user-circle-o"></i>
                                    </div>
                                </Link>

                            </ul>
                            <ul className="col-xs-2 col-sm-2 col-md-2 settingsContainer">
                                <ul className="nav navbar-nav editContainer">
                                    <li><a href="#"><i className="glyphicon glyphicon-edit"></i></a></li>
                                </ul>

                                <Link to = {linkQueryMessages}>
                                    <ul className="nav navbar-nav envelopeContainer">
                                        <li><a href="#"><i className="glyphicon glyphicon-envelope"></i></a></li>
                                    </ul>
                                </Link>

                                <Link to = {linkQueryLogin}>
                                    <ul className="nav navbar-nav logoutContainer">
                                        <li><a href="#"><i className="glyphicon glyphicon-off" onClick={this.logout.bind(this)}></i></a></li>
                                    </ul>
                                </Link>

                                    {/*<li><a href="#"><i className="glyphicon glyphicon-bell"></i></a></li>*/}
                            </ul>
                        </div>
                    </div>
                </nav>
        );
    }
}

export default Navbar;