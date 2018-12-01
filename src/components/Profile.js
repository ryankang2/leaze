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
        rating:'', //added by Matt
        progress:'60', //added by Matt
        picture:null,
        showUPopup: false,
        showPPopup: false,
    };
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

  percentFill(n){
    if (this.state.rating >= n + 1) {
      return String(100);
    } else if (this.state.rating < n - 1) {
      return String(0);
    } else {
      return String((this.state.rating - n) * 100);
    }
  }

  render() {
    //for use with star filling for average rating
    let stylesProfile = {
      gradient: {
        width: '0',
        height: '0',
        position: 'absolute',
      },
      meter: {
        border: '1px solid black',
        width: '100%',
        height: '2vh',
        position: 'relative',
        background: 'linear-gradient(.25turn, black '+ this.state.progress +'%, #f7eddc '+ this.state.progress +'%)',
      },
      boldLink: {
        fontWeight: 'bold',
        fontFamily: 'Verdana, Geneva, sans-serif\t\n'
      }
    };

    let points = '12.5,0.5 15.75,8.25 24.75,8.75 17.5,14.5 19.75,22.5 12.5,17.75 5.25,22.5 7.5,14.4 0.5,8.75 9.25,8.25 12.5,0.5';

    return (
      <div>
        <Navbar />
        <div class="container-fluid" id="mainContainer">
          <div class="row" id="profileRow">
            <div class="col-md-2" id="profilePictureArea">
              {/* User profile pic here */}
              <img src={require('./profile.jpg')} id="profilePic" />
              <span class="label-ucsd"> UCSD </span>
            </div>

            <div class="col-md-4" id="bioArea">
              {/* User Bio Area here  */}
              <p id="userName"> {this.state.firstname} {this.state.lastname} Full Name </p>
              <p id="userInfo"> {this.state.major} Major, {this.state.year} Year </p>
              <p rows="4" cols="50" id="biography"> {this.state.bio} </p>
            </div>

            <div className="col-md-2" id="ratingArea">
              {/* User Rating Area goes here */}
              <p id="ratingString"> Your average rating is: {this.state.rating} </p>

              <div id={'starContainer'}>
                <svg style={stylesProfile.gradient} aria-hidden="true" focusable={'false'}>
                  <linearGradient id="ratingGradient0">
                    <stop offset={this.percentFill(0) + '%'} stop-color="black" />
                    <stop offset={this.percentFill(0) + '%'} stop-color="#f7eddc" />
                  </linearGradient>
                  <linearGradient id="ratingGradient1">
                    <stop offset={this.percentFill(1) + '%'} stop-color="black" />
                    <stop offset={this.percentFill(1) + '%'} stop-color="#f7eddc" />
                  </linearGradient>
                  <linearGradient id="ratingGradient2">
                    <stop offset={this.percentFill(2) + '%'} stop-color="black" />
                    <stop offset={this.percentFill(2) + '%'} stop-color="#f7eddc" />
                  </linearGradient>
                  <linearGradient id="ratingGradient3">
                    <stop offset={this.percentFill(3) + '%'} stop-color="black" />
                    <stop offset={this.percentFill(3) + '%'} stop-color="#f7eddc" />
                  </linearGradient>
                  <linearGradient id="ratingGradient4">
                    <stop offset={this.percentFill(4) + '%'} stop-color="black" />
                    <stop offset={this.percentFill(4) + '%'} stop-color="#f7eddc" />
                  </linearGradient>
                </svg>

                <svg viewBox={'0 0 25 25'} class="ratingStars">
                  <polygon points={points} fill={'url(#ratingGradient0'} stroke={'black'}/>
                </svg>
                <svg viewBox={'0 0 25 25'} className="ratingStars">
                  <polygon points={points} fill={'url(#ratingGradient1'} stroke={'black'}/>
                </svg>
                <svg viewBox={'0 0 25 25'} className="ratingStars">
                  <polygon points={points} fill={'url(#ratingGradient2'} stroke={'black'}/>
                </svg>
                <svg viewBox={'0 0 25 25'} className="ratingStars">
                  <polygon points={points} fill={'url(#ratingGradient3'} stroke={'black'}/>
                </svg>
                <svg viewBox={'0 0 25 25'} className="ratingStars">
                  <polygon points={points} fill={'url(#ratingGradient4'} stroke={'black'}/>
                </svg>
              </div>

              <button onClick={this.togglePPopup.bind(this)} className="ratingButton">Edit Preferences</button>
              <button onClick={this.toggleUPopup.bind(this)} class="ratingButton">Edit Profile</button>

            </div>
          </div>

          <div class="row" id="rowDivider">
            <hr />
          </div>

          <div class="row" id="listingsRow">
            <div class="col-sm-8" id="postedListings">
              {/* User's Posted Listings go here */}
              Posted Listings:
                  {/*Ariane's code goes here*/}
              <ListingPreview />
            </div>
            <div class="col-sm-8" id="favoriteListings">
              {/* Ariane's code goes here */}
              Favorite Listings:
                  <ListingPreview />
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
}


export default Profile;