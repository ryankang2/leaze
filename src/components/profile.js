import React, {Component} from "react";
import "./profile.css";
//import "./update.js"

class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            sex:'',
            age:'',
            hometown:'',
            school:'',
            major:'',
            hobbies:'',
        };
    }
    render () {
        return (
        <div>
    <div class="container-fluid" id="mainContainer">
        {/* here lies the top row - Matt works here */}
        <div id="background">
            <div id="header">
            </div>
            <h1>{this.state.name}USER's Profile</h1>
            <div>
              <img src={ require('./profile.jpg')} id="profilePictureArea" />
            </div>
            <div id="info">
                <p>Sex: {this.state.sex}</p>
                <p>Age: {this.state.age}</p>
                <p>Hometown: {this.state.hometown}</p>
                <p>Current School: {this.state.name}</p>
                <p> Major: {this.state.major}</p>
                <p>Hobbies: {this.state.hobbies}</p>
                <div class="col-md-4" id="bioArea">
                  Bio:
                  {/* User Bio Area here  */}
                  <p rows = "4" cols="50">
                    {this.state.bio} 
                  </p>
                </div>
              <a href="update.js" float="left">Edit</a>
            </div>  
        </div>
        <div class="row" id="profileRow">
          <div class="col-md-2" id="profilePictureArea">
            {/* User profile pic here */}
          </div>


          <div className="col-md-2" id="ratingArea">
            {/* User Rating Area goes here */}
          </div>

          <div className="col-md-4" id="progressArea">
            {/* User Profile Strength Percentage is here */}
          </div>

        </div>

        <div class="row" id="rowDivider">
          <hr /> {/* This is the pretty row divider */}
        </div>

        {/* here lies the bottom row - Drexler works here */}
        <div class="row" id="listingsRow">
          <div class="col-md-12">
            <div id="postedListings">
              {/* User's Posted Listings go here */}
            </div>
            <div id="favoriteListings">
              {/* User's Favorite Listings go here */}
              <img src={ require('./house.jpg')} id="favoriteListings" />
            </div>
          </div>
        </div>
    </div>
    </div>
        );
    }
}

export default Profile;