import React from "react";
import "./Popup.css";

class UPopup extends React.Component {
  constructor(props){
    super(props);
    this.state={
        name:'',
        age:'',
        school:'',
        major:'',
        year:'',
        bio:'',
        picture: null,
    };
  }
  fileChangedHandler=(event)=>{
    this.setState({picture:event.target.files[0]})
  }
  uploadHandler=()=> {
    console.log(this.state.picture)
  }
    render() {
      return (
        <div class='popup'>
          <div class='popup_inner'>
            <h1>Update Your Profile</h1>
              <div class="col-sm-3" id="info">
                <label>First Name: </label>
                <input class="inputs" value = {this.state.firstname}
                  onChange={e=> this.setState({firstname:e.target.value})}/>
                <label>Last Name: </label>
                <input class="inputs" value = {this.state.lastname}
                  onChange={e=> this.setState({lastname:e.target.value})}/>
                <label>Age: </label>
                <input class="inputs" value = {this.state.age}
                  onChange={e=> this.setState({age:e.target.value})}/>
                <label>Major: </label>
                <input class="inputs" value = {this.state.major}
                  onChange={e=> this.setState({major:e.target.value})}/>
                <label>Bio: </label>
                <input class="inputsB" value = {this.state.bio}
                  onChange={e=> this.setState({bio:e.target.value})}/>
                <button onClick=
                  {this.props.closeUPopup} className="btn btn-primary">Cancel</button>
              </div>
              <img id="displayPic" src={require("./profile.jpg")} />
              <div class="col-sm-6" id="pic">
                <label>Profile Picture: </label>
                <input type="file" onChange={this.fileChangedHandler}></input>
                <button onClick={this.uploadHandler}>Upload</button>
                <button onClick=
                  {this.props.closeUPopup} className="btn btn-primary">Save Updates</button>
              </div>    
          </div>
        </div>
      );
    }
  }

  export default UPopup;