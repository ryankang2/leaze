import React, {Component} from "react";
import "./Navbar.css";

class Navbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchQuery: "",
        }
    }

    handleInput(event){
        const {value} = event.target;
        this.setState({
            searchQuery: value,
        })
    }

    handleFormSubmit(event){
        event.preventDefault();
        console.log("finalSearchQuery: ", this.state.searchQuery);
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