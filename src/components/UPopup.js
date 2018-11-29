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
  handleChange(event) {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value
    })
  }

  handleCheckBox(event) {
    const { name, checked } = event.currentTarget;
    if (checked !== false) {
      this.setState({
        [name]: true
      })
    } else {
      this.setState({
        [name]: false
      })
    }
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
            <h1 className="title">Update Your Profile</h1>
              <div class="col-sm-3" id="info">
                <label>First Name: </label>
                <input class="inputs" value = {this.state.firstname}
                  onChange={this.handleChange.bind(this)}/>
                <label>Last Name: </label>
                <input class="inputs" value = {this.state.lastname}
                  onChange={this.handleChange.bind(this)}/>
                <label>Age: </label>
                <input class="inputs" value = {this.state.age}
                  onChange={this.handleChange.bind(this)}/>
                <label>Email (must end with ".edu"): </label>
                <input class="inputs" value = {this.state.email}
                  onChange={this.handleChange.bind(this)}/>
                <label>Major: </label>
                <input class="inputs" value = {this.state.major}
                  onChange={this.handleChange.bind(this)}/>
                <label>Bio: </label>
                <input class="inputsB" value = {this.state.bio}
                  onChange={this.handleChange.bind(this)}/>
                <button onClick=
                  {this.props.closeUPopup} id="button3" className="btn btn-primary">Cancel</button>
              </div>
              <img id="displayPic" src={require("./profile.jpg")} />
              <div class="col-sm-6" id="pic">
                <label>Profile Picture: </label>
                <input type="file" onChange={this.fileChangedHandler}></input>
                <button onClick={this.uploadHandler}>Upload</button>
                <button onClick=
                  {this.props.closeUPopup} id="button4" className="btn btn-primary">Save Updates</button>
              </div>    
          </div>
        </div>
      );
    }
  }

  export default UPopup;