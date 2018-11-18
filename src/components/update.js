import React, {Component} from 'react';
import Navbar from "./Navbar.js"

class Update extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            age:'',
            school:'',
            major:'',
            year:'',
            bio:'',
        };
    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    pushToFirebase(event) {
        const {name, age, school, major, year, bio} = this.state;
        event.preventDefault();
        this.firebaseRef.child(name).set({name, age, school, major, year, bio });
        this.setState({name: '', age: '',school: '', major: '', year: '', bio: ''});
    }

    render(){
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
                  <input id="userInfo" value={this.state.major} Major/>
                  <input id="userInfo2" Year value={this.state.year} />
                  <input type="text" id="biography" Bio value={this.state.bio} write a short bio about yourself/>
                </div> 
      
                <div className="col-md-2" id="ratingArea">
                  {/* User Rating Area goes here */}
                  <p id="ratingString"> Your average rating is: RATING </p>
                  <button onClick="./Preferences.js" class="ratingButton"> Edit Preferences </button>
                  <button onClick="./Update.js" class="ratingButton"> Edit Profile</button>
                </div>
      
                <div className="col-md-4" id="progressArea">
                  {/* User Profile Strength Percentage is here */}
                </div>
      
              </div>
      
              <div class="row" id="rowDivider">
                <hr /> {/* This is the pretty row divider */}
              </div>
      
            </div>
            </div>
      
          );
    }
}


export default Update;