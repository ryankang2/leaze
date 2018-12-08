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
    this.setState({email: response.data.email})
    this.setState({facebook: response.data.facebook})
    this.setState({instagram: response.data.instagram})
    this.setState({twitter: response.data.twitter})
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
    console.log(this.state);
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

            <div className="col-md-2" id="buttonArea">
              <div id="buttonInner">
                <button onClick={this.toggleUPopup.bind(this)} className="btn btn-primary profButton">Edit Profile</button>
                <button onClick={this.togglePPopup.bind(this)} className="btn btn-primary profButton">Edit Preferences</button>
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