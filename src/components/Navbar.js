import React, {Component} from "react";
import "./Navbar.css";
import {formatPostData} from "../helpers/formatPostData";
import axios from "axios";
import {Link} from "react-router-dom";
import MakePostModal from "./MakePost";
import ListingPreview from "./ListingPreview";

class Navbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchQuery: "",
            listings: [],
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
        this.changeName(response.data.user);
    }

    changeName(user){
        $(".welcome").text("Welcome, " + user[0].first_name + "!");
    }

    logout(){
        sessionStorage.setItem("user_id", "-1");
    }
    
    async handleFormSubmit(event){
        event.preventDefault();
        event.stopPropagation();
        const params = formatPostData(this.state);
        const response = await axios.post("http://localhost:8000/api/queries/searchbox.php",params);
        this.props.getSearch(response);
        this.setState({
            searchQuery: "",
        });
    }


    openModal(){
        $(".makePostModal").css("display", "block");
    }


    render(){
        const {searchQuery} = this.state;
        var linkQuery = "/home/profile/" + sessionStorage.getItem("user_id");
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
                            <form className="col-xs-3 col-sm-5 col-md-5 navbar-form navbar-left" onSubmit={(event) => this.handleFormSubmit(event)}>
                                <div className="form-group">
                                    <input type="search " value={searchQuery} name="userInput" className="form-control searchBox" placeholder="Search..." onChange={(event) => this.handleInput(event)}/>
                                    <i className="searchIcon fa fa-search"></i>
                                </div>
                            </form>
                            <div className="col-xs-2 col-sm-2 col-md-2 profileContainer">
                                <Link to = {linkQuery}>
                                    <div className="welcome">
                                        <i className="fa fa-user-circle-o"></i>
                                    </div>
                                </Link>
                                <div className="settingsContainer">
                                    <div className="nav navbar-nav editContainer">
                                        <li onClick={this.openModal.bind(this)}><a href="#"><i className="glyphicon glyphicon-edit"></i></a></li>
                                    </div>
                                    <Link to = {linkQueryLogin}>
                                        <div className="nav navbar-nav logoutContainer">
                                            <li><a href="#"><i className="glyphicon glyphicon-off" onClick={this.logout.bind(this)}></i></a></li>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <MakePostModal>

                    </MakePostModal>
                </nav>
        );
    }
}

export default Navbar;