import React from "react";
import "./Profile.css";
import Update from "./Update.js"
import Navbar from "./Navbar.js"

export class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state={
        name:'',
        year:'',
        age:'',
        hometown:'',
        school:'',
        major:'',
        hobbies:'',
    };
}
  render() {
    return(
      <div>
      <Navbar />
      <div class="container-fluid" id="mainContainer">
        {/* here lies the top row - Matt works here */}
        <div class="row" id="profileRow">
          <div class="col-md-2" id="profilePictureArea">
            {/* User profile pic here */}
            <img src={ require('./profile.jpg')} id="profilePictureArea" />
            <span class="label-ucsd"> UCSD </span>
          </div>

          <div class="col-md-4" id="bioArea">
            {/* User Bio Area here  */}
            <h1 id="userName"> {this.state.name} Full Name </h1>
            <h2 id="userInfo"> {this.state.major} Major, {this.state.major} Year </h2>
            <p rows = "4" cols="50" id="biography"> {this.state.bio} biography </p>
          </div> 

          <div className="col-md-2" id="ratingArea">
            {/* User Rating Area goes here */}
            <p id="ratingString"> Your average rating is: RATING </p>
            <button onClick="" class="ratingButton"> Edit Preferences </button>
            <button onClick="./Update.js" class="ratingButton"> Edit Profile</button>
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
              Posted Listings:
              <img src={ require('./house.jpg')}  />
            </div>
            <div id="favoriteListings">
              {/* User's Favorite Listings go here */}
              Favorite Listings:
            </div>
          </div>
        </div>
      </div>
      </div>

    );
  }
}

export default Profile;