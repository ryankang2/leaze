import React from "react";
import "./Profile.css";
import Navbar from "./Navbar.js"
import UPopup from "./UPopup.js"
import PPopup from "./PPopup.js"
import ListingPreview from "./ListingPreview.js"

export class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state={
        firstname:'',
        lastname:'',
        age:'',
        school:'',
        major:'',
        year:'',
        bio:'',
        picture:null,
        showUPopup: false,
        showPPopup: false,
    };
  }

  componentDidMount(){
    console.log(this.props.match);
  }

  toggleUPopup(){
    this.setState({
      showUPopup: !this.state.showUPopup
    });
  }
  togglePPopup(){
    this.setState({
      showPPopup: !this.state.showPPopup
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div class="container-fluid" id="mainContainer">
        
          {/* here lies the top row - Matt works here */}
          <div class="row" id="profileRow">
            <div class="col-md-2" id="profilePictureArea">
              {/* User profile pic here */}
              <img src={require('./profile.jpg')} id="profilePictureArea" />
              <span class="label-ucsd"> UCSD </span>
            </div>

            <div class="col-md-4" id="bioArea">
              {/* User Bio Area here  */}
              <h1 id="userName"> {this.state.firstname} {this.state.lastname} Full Name </h1>
              <h2 id="userInfo"> {this.state.major} Major, {this.state.year} Year </h2>
              <p rows="4" cols="50" id="biography"> {this.state.bio} biography </p>
            </div>

            <div className="col-md-2" id="ratingArea">
              {/* User Rating Area goes here */}
              <p id="ratingString"> Your average rating is: RATING </p>
              <button onClick={this.toggleUPopup.bind(this)} class="ratingButton">Edit Profile</button>
              <button onClick={this.togglePPopup.bind(this)} class="ratingButton">Edit Preferences</button>

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
            <div class="col-sm-8" id="postedListings">
              {/* User's Posted Listings go here */}
              Posted Listings:
                  {/*Ariane's code goes here*/}
              {/*<ListingPreview />*/}
            </div>
            <div class="col-sm-8" id="favoriteListings">
              {/* Ariane's code goes here */}
              Favorite Listings:
                  {/*<ListingPreview />*/}
            </div>
          </div>
        </div>
        {this.state.showUPopup ?
          <UPopup closeUPopup={this.toggleUPopup.bind(this)}/>: null}
        {this.state.showPPopup ?
          <PPopup closePPopup={this.togglePPopup.bind(this)}/>: null}
      </div>

    );
  }
};


export default Profile;