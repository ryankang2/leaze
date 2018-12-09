import React from "react";
import "./Profile.css";
import Navbar from "./Navbar.js"
import ListingPreview from "./ListingPreview.js"
import {formatPostData} from "../helpers/formatPostData";
import axios from "axios";
import { bindActionCreators } from "redux";

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
        email: '',
        picture:null,
        imageURL: require("./default_profile_pic.jpg"),
        showUPopup: false,
        showPPopup: false,
        postedListings: '',
        matchPercent: '',
    };
  }
  async componentDidMount(){
    var i=window.location.href.length-1
    var userID="";
    while(window.location.href[i] != '/'){
      userID=(window.location.href[i].toString())+userID;
      i--;
    }
    const idObject = { 
      user_id: userID
    }
    const params = formatPostData(idObject);
    const response = await axios.post("http://localhost:8000/api/queries/get_prof.php", params);
    const userListingResponse = await axios.post("http://localhost:8000/api/queries/get_user_listings.php", params);
    this.showUserListings(userListingResponse.data.listings);
    console.log(response.data);
    this.setState({firstname: response.data.firstname})
    this.setState({lastname: response.data.lastname})
    this.setState({major: response.data.major})
    this.setState({year: response.data.year})
    this.setState({bio: response.data.bio})
    this.setState({email: response.data.email})

    const dualID = {
      user1: userID,
      user2: sessionStorage.getItem("user_id"),
    }
    const dualParams = formatPostData(dualID);
    const matchResponse = await axios.post("http://localhost:8000/api/matching_algorithm.php", dualParams );
    console.log("Match", matchResponse.data);
    this.setState({matchPercent: matchResponse.data.result})
  }

  showUserListings(list){
    var array = [];
    for(var i = 0; i < list.length; i++){
      var singleListing = <ListingPreview information = {list[i]}{...this.props} key={list[i].user_id_posted}/>
      array.push(<div className="col-sm-3">{singleListing}</div>);
    }
    this.setState({
      postedListings: array,
    })
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
              <img src={this.state.imageURL} id="profilePic" />
              <span className="label-ucsd"> UCSD </span>
            </div>

            <div className="col-md-6" id="bioAreaO">
              {/* User Bio Area here  */}
              <h1 id="userName" > {this.state.firstname} {this.state.lastname} </h1>
              <h2 id="userInfo"> {this.state.major}, {this.state.year} Year</h2>
              <p rows="4" cols="50" id="biography"> {this.state.bio} </p>
            </div>

            <div className="col-md-2" id="ratingArea">
              {/* User Rating Area goes here */}    
              <p id="matchPercent">Match Percent: {this.state.matchPercent}% </p>

            </div>

            <div className="col-md-4" id="socialArea">
              {/* User Profile Strength Percentage is here */}
              <div id="socialInner">
                <div id="socialLinks">
                  <p>Social Media Links</p>
                  <a href={'https://' + this.state.facebook} target="_blank"><i id="iconLivin" className="fa fa-facebook-square fa-5x" aria-hidden="true"></i></a>
                  <a href={'https://' + this.state.instagram} target="_blank"><i id="iconLivin" className="fa fa-instagram fa-5x" aria-hidden="true"></i></a>
                  <a href={'https://' + this.state.twitter} target="_blank"><i id= "iconLivin" className="fa fa-twitter-square fa-5x" aria-hidden="true"></i></a>
                  <a href={'mailto:' + this.state.email + '?subject=Interested in your LEaze posting!' + '&body=Hi ' + this.state.firstname + '! I saw your listing on LEaze and ...'} target="_top"><i id="iconLivin" className="fa fa-envelope-o fa-5x" aria-hidden="true"></i></a>
                </div>
              </div>

            </div>

          </div>

          <div className="row" id="rowDivider">
            <hr /> {/* This is the pretty row divider */}
          </div>

          {/* here lies the bottom row - Drexler works here */}
          <div id="listingsRow">
            <div id="postedListingsO">
              {/* User's Posted Listings go here */}
                Posted Listings:
            </div>
            <div id="listingContainer">
                  {this.state.postedListings}
                  {/*Ariane's code goes here*/}
                  {/* <ListingPreview /> */}
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

