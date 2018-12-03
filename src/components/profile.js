import React from "react";
import "./Profile.css";
import Navbar from "./Navbar.js"
import UPopup from "./UPopup.js"
import PPopup from "./PPopup.js"
import ListingPreview from "./ListingPreview.js"
import {formatPostData} from "../helpers/formatPostData";
import axios from "axios";

export class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state={
        user_id:'',
        firstname:'',
        lastname:'',
        age:'',
        school:'',
        major:'',
        year:'',
        bio:'',
        picture:null,
        rating: '',
        progress: '',
        showUPopup: false,
        showPPopup: false,
    };
  }
  async componentDidMount(){
    const idObj ={
      user_id: sessionStorage.getItem("user_id"),
    }
    const params = formatPostData(idObj);
    const response = await axios.post("http://localhost:8000/api/queries/get_prof.php", params);
    console.log(response.data);
    this.setState({firstname: response.data.firstname})
    this.setState({lastname: response.data.lastname})
    this.setState({major: response.data.major})
    this.setState({year: response.data.year})
    this.setState({bio: response.data.bio})
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
        <div className="container-fluid" id="mainContainer">
          {/* here lies the top row - Matt works here */}
          <div className="row" id="profileRow">
            <div className="col-md-2" id="profilePictureArea">
              {/* User profile pic here */}
              <img src={require('./profile.jpg')} id="profilePic" />
              <span className="label-ucsd"> UCSD </span>
            </div>

            <div className="col-md-4" id="bioArea">
              {/* User Bio Area here  */}
              <h1 id="userName" > {this.state.firstname} {this.state.lastname} </h1>
              <h2 id="userInfo"> {this.state.major} {this.state.year}</h2>
              <p rows="4" cols="50" id="biography"> {this.state.bio} </p>
            </div>

            <div className="col-md-2" id="ratingArea">
              {/* User Rating Area goes here */}
              <p id="ratingString"> Your average rating is: RATING </p>
              <div id={'starContainer'}>
                <svg style={stylesProfile.gradient} aria-hidden="true" focusable={'false'}>
                  <linearGradient id="ratingGradient0">
                    <stop offset={this.percentFill(0) + '%'} stopColor="black" />
                    <stop offset={this.percentFill(0) + '%'} stopColor="#f7eddc" />
                  </linearGradient>
                  <linearGradient id="ratingGradient1">
                    <stop offset={this.percentFill(1) + '%'} stopColor="black" />
                    <stop offset={this.percentFill(1) + '%'} stopColor="#f7eddc" />
                  </linearGradient>
                  <linearGradient id="ratingGradient2">
                    <stop offset={this.percentFill(2) + '%'} stopColor="black" />
                    <stop offset={this.percentFill(2) + '%'} stopColor="#f7eddc" />
                  </linearGradient>
                  <linearGradient id="ratingGradient3">
                    <stop offset={this.percentFill(3) + '%'} stopColor="black" />
                    <stop offset={this.percentFill(3) + '%'} stopColor="#f7eddc" />
                  </linearGradient>
                  <linearGradient id="ratingGradient4">
                    <stop offset={this.percentFill(4) + '%'} stopColor="black" />
                    <stop offset={this.percentFill(4) + '%'} stopColor="#f7eddc" />
                  </linearGradient>
                </svg>

                <svg viewBox={'0 0 25 25'} className="ratingStars">
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
              <button id="buttonU" onClick={this.toggleUPopup.bind(this)} className="btn btn-primary">Edit Profile</button>
              <button id="buttonP" onClick={this.togglePPopup.bind(this)} className="btn btn-primary">Edit Preferences</button>

            </div>

            <div className="col-md-4" id="progressArea">
              {/* User Profile Strength Percentage is here */}
              <div id="progressAreaInner">
                <div style={stylesProfile.meter}> </div>
                <div id="progressTextArea">
                  {this.state.progress}% <br />
                  <p id="progressMessage">
                    Getting there! The stronger your profile is, the better results you'll get.
                    Click <a href={'#link'} style={stylesProfile.boldLink}>here</a> for a checklist to strengthen your profile!
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="row" id="rowDivider">
            <hr /> {/* This is the pretty row divider */}
          </div>

          {/* here lies the bottom row - Drexler works here */}
          <div className="row" id="listingsRow">
            <div className="col-sm-8" id="postedListings">
              {/* User's Posted Listings go here */}
              Posted Listings:
                  {/*Ariane's code goes here*/}
                  {/* <ListingPreview /> */}
            </div>
            <div className="col-sm-8" id="favoriteListings">
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
}


export default Profile;