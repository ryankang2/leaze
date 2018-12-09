import React from "react";
import "./Profile.css";
import Navbar from "./Navbar.js"
import UPopup from "./UPopup.js"
import PPopup from "./PPopup.js"
import {formatPostData} from "../helpers/formatPostData";
import axios from "axios";
import ListingPreview from "./ListingPreview";

const groupSize = 3;

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
        postedListings: [],
        favoriteListings: [],
    };
  }
  async componentDidMount(){
    const idObj ={
      user_id: sessionStorage.getItem("user_id"),
    }
    const params = formatPostData(idObj);
    const response = await axios.post("http://localhost:8000/api/queries/get_prof.php", params);
    const userListingResponse = await axios.post("http://localhost:8000/api/queries/get_user_listings.php", params);
    const favoriteListingsResponse = await axios.post("http://localhost:8000/api/queries/get_favorites.php", params);
    console.log("FAVORITE LISTING: ", favoriteListingsResponse);
    console.log(userListingResponse);
    if(userListingResponse.data.noListings){
      this.setState({postedListings: <p id="noListings">No Listings to Show</p>})
    }
    else{
      this.showUserListings(userListingResponse.data.listings);
    }
    if(favoriteListingsResponse.data.noFavorites){
      this.setState({favoriteListings: <p id="noListings">No Listings to Show</p>})
    }
    else{
      this.showFavoriteListings(favoriteListingsResponse.data.listings);
    }
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
      array.push(<div>{singleListing}</div>);
    }
    this.setState({
      postedListings: array,
    })
  }

  showFavoriteListings(list){
    var array = [];
    for(var i = 0; i < list.length; i++){
      var singleListing = <ListingPreview information = {list[i]}{...this.props} key={list[i].user_id_posted}/>
      array.push(<div>{singleListing}</div>);
    }
    this.setState({
      favoriteListings: array,
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

  postedListings(postedListings){
    var renderPosts = postedListings.map(function(listings) {
      // map content to html elements
        return <div className="col-sm-2">{listings}</div>
          }).reduce(function(r, element, index) {
              // create element groups with size 3
              index % groupSize === 0 && r.push([]);
              r[r.length - 1].push(element);
              return r;
          }, []).map(function(rowContent) {
              // surround the group with 'row'
              return <div className="row">{rowContent}</div>;
          });

    return renderPosts;
  }

  favoriteListings(favListings){
    var renderFavorites = favListings.map(function(listings) {
      // map content to html elements
      return <div className="col-sm-2">{listings}</div>
  }).reduce(function(r, element, index) {
      // create element groups with size 3
      index % groupSize === 0 && r.push([]);
      r[r.length - 1].push(element);
      return r;
  }, []).map(function(rowContent) {
      // surround the group with 'row'
      return <div className="row">{rowContent}</div>;
  });
    return renderFavorites;
  }

  render() {
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

            <div className="col-md-4" id="socialArea">
              {/* User Profile Strength Percentage is here */}
              <div id="socialInner">
                <div id="socialLinks">
                  <p>Social Media Links</p>
                  <a href={this.state.facebook} target="_blank"><i id="iconLivin" className="fa fa-facebook-square fa-5x" aria-hidden="true"></i></a>
                  <a href={this.state.instagram} target="_blank"><i id="iconLivin" className="fa fa-instagram fa-5x" aria-hidden="true"></i></a>
                  <a href={this.state.twitter} target="_blank"><i id= "iconLivin" className="fa fa-twitter-square fa-5x" aria-hidden="true"></i></a>
                  <a href={'mailto:' + this.state.email + '?subject=Interested in your LEaze posting!' + '&body=Hi ' + this.state.firstname + '! I saw your listing on LEaze and ...'} target="_top"><i id="iconLivin" className="fa fa-envelope-o fa-5x" aria-hidden="true"></i></a>
                </div>
              </div>

            </div>
          </div>

          <div className="row" id="rowDivider">
            <hr /> {/* This is the pretty row divider */}
          </div>

          {/* here lies the bottom row - Drexler works here */}
          <div className="row" id="listingsRow">
            <div id="postedListings">
              {/* User's Posted Listings go here */}
              <div>
                Posted Listings:
              </div>
              <div>
                {/* {this.state.postedListings} */}
                {this.state.postedListings.length ? this.postedListings(this.state.postedListings) : <p>No Listings to show</p>}
              </div>
            </div>
              
            <div id="favoriteListings">
              <div>
                Favorite Listings:
              </div>
              <div>
                {this.state.favoriteListings.length ? this.favoriteListings(this.state.favoriteListings) : <p>No Listings to show</p>}
              </div>
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