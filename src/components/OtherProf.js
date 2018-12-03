import React from "react";
import "./Profile.css";
import Navbar from "./Navbar.js"
import ListingPreview from "./ListingPreview.js"
import {formatPostData} from "../helpers/formatPostData";
import axios from "axios";

export default class OtherProfile extends React.Component {
  constructor(props){
    super(props);
    this.state={
        user_id: '',
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
  async componentDidMount(){
    const userID = window.location.href[window.location.href.length-1];
    const idObject = { 
      user_id: userID
    }
    const params = formatPostData(idObject);
    const response = await axios.post("http://localhost:8000/api/queries/get_prof.php", params);
    console.log(response.data);
    $("#userName").text(response.data.firstname +' ' + response.data.lastname)
    $("#userInfo").text(response.data.major + ', ' + response.data.year)
    $("#biography").text(response.data.bio)
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid" id="mainContainer">
          {/* here lies the top row - Matt works here */}
          <div className="row" id="profileRow">
            <div className="col-md-2" id="profilePictureArea">
              {/* User OtherProfile pic here */}
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
              <button id="buttonU" className="btn btn-primary">Send a Message</button>

            </div>

            <div className="col-md-4" id="progressArea">
              {/* User OtherProfile Strength Percentage is here */}
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


// export default OtherProfile;