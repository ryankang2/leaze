import React from "react";
import "./Profile.css";
import Navbar from "./Navbar.js"
import UPopup from "./UPopup.js"
import PPopup from "./PPopup.js"
import {Button} from "react-materialize"
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
        email:'',
        picture:null,
        imageURL: require("./default_profile_pic.jpg"),
        rating: '',
        progress: '',
        facebook: '',
        instagram: '',
        twitter: '',
        showUPopup: false,
        showPPopup: false,
        listings: [],
    };
  }
  async componentDidMount(){
    const idObj ={
      user_id: sessionStorage.getItem("user_id"),
    }
    const params = formatPostData(idObj);
    const response = await axios.post("http://localhost:8000/api/queries/get_prof.php", params);
    const userListingResponse = await axios.post("http://localhost:8000/api/queries/get_user_listings.php", params);
    console.log(userListingResponse);
    this.showUserListings(userListingResponse.data.listings);
    // console.log(response.data);
    this.setState({firstname: response.data.firstname})
    this.setState({lastname: response.data.lastname})
    this.setState({major: response.data.major})
    this.setState({year: response.data.year})
    this.setState({bio: response.data.bio})
    this.setState({email: response.data.email})
    this.setState({facebook: response.data.facebook})
    this.setState({instagram: response.data.instagram})
    this.setState({twitter: response.data.twitter})
  }

  showUserListings(list){
    var array = [];
    for(var i = 0; i < list.length; i++){
      var singleListing = <ListingPreview information = {list[i]}{...this.props} key={list[i].user_id_posted}/>
      array.push(singleListing);
    }
    this.setState({
      listings: array,
    })
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
        // console.log(this.state)
    return (
      <div>
        <Navbar />
        <div className="container-fluid" id="mainContainer">
          {/* here lies the top row - Matt works here */}
          <div className="row" id="profileRow">
            <div className="col-md-2" id="profilePictureArea">
              {/* User profile pic here */}
              <img src={this.state.imageURL} id="profilePic" />
              <span className="label-ucsd"> UCSD </span>
            </div>

            <div className="col-md-4" id="bioArea">
              {/* User Bio Area here  */}
              <h1 id="userName" > {this.state.firstname} {this.state.lastname} </h1>
              <h2 id="userInfo"> {this.state.major}, {this.state.year} Year</h2>
              <p rows="4" cols="50" id="biography"> {this.state.bio} </p>
            </div>

            <div className="col-md-2" id="ratingArea">
              {/* User Rating Area goes here */}
             
              <button id="buttonU" onClick={this.toggleUPopup.bind(this)} className="btn btn-primary">Edit Profile</button>
              <button id="buttonP" onClick={this.togglePPopup.bind(this)} className="btn btn-primary">Edit Preferences</button>

            </div>

            <div className="col-md-4" id="progressArea">
              {/* User Profile Strength Percentage is here */}
              <div id="progressAreaInner">
                <div id="progressTextArea">
                  <p>Social Media Links</p>
                  <a href={'https://' + this.state.facebook} target="_blank"><i id="iconLivin" className="fa fa-facebook-square fa-5x" aria-hidden="true"></i></a>
                  <a href={'https://' + this.state.instagram} target="_blank"><i id="iconLivin" className="fa fa-instagram fa-5x" aria-hidden="true"></i></a>
                  <a href={'https://' + this.state.twitter} target="_blank"><i id= "iconLivin" className="fa fa-twitter-square fa-5x" aria-hidden="true"></i></a>
                  <a href={'mailto:' + this.state.email} target="_top"><i id="iconLivin" className="fa fa-envelope-o fa-5x" aria-hidden="true"></i></a>
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
                  {this.state.listings}
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