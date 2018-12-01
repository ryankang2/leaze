import React from "react";
import "./Popup.css";
import {Input,Button} from "react-materialize"

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
        <div className='popup'>
          <div className='popup_inner'>
            <h1 className="title">Update Your Profile</h1>
              <div className="col-sm-6">
                <label>First Name: </label>
                <input className="inputs" name="firstname" value = {this.state.firstname}
                  onChange={this.handleChange.bind(this)}/>
                <label>Last Name: </label>
                <input className="inputs" name="lastname" value = {this.state.lastname}
                  onChange={this.handleChange.bind(this)}/>
                <label>Age: </label>
                <input className="inputs" name="age" value = {this.state.age}
                  onChange={this.handleChange.bind(this)}/>
                <label>Email (must end with ".edu"): </label>
                <input className="inputs" name="email" value = {this.state.email}
                  onChange={this.handleChange.bind(this)}/>
                <label>School: </label>
                <input className="inputs" name="school" value = {this.state.school}
                  onChange={this.handleChange.bind(this)}/>
                <label>Major: </label>
                <input className="inputs" name="major" value = {this.state.major}
                  onChange={this.handleChange.bind(this)}/>
                <label>Year: </label>
                <Input className="inputs" type='select' name='year' value = {this.state.year}
                  onChange={this.handleChange.bind(this)}>
                  <option value='1'>First</option>
                  <option value='2'>Second</option>
                  <option value='3'>Third</option>
                  <option value='4'>Fourth</option>
                  <option value='5'>Other</option>
                </Input>
                <label>Bio: </label>
                <input className="inputsB" name="bio" value = {this.state.bio}
                  onChange={this.handleChange.bind(this)}/>
                <button onClick=
                  {this.props.closeUPopup} className="btn btn-primary">Cancel</button>
              </div>
              <img id="displayPic" src={(this.state.picture)} />
              <div className="col-sm-6" id="pic">
                <label>Profile Picture: </label>
                <Input id="chooseButton" label="Choose Image" type="file" onChange={this.fileChangedHandler}/>
                <Button id="uploadButton" onClick={this.uploadHandler}>Upload</Button>
                <button onClick=
                  {this.props.closeUPopup} id="button4" className="btn btn-primary">Save Updates</button>
              </div>    
          </div>
        </div>
      );
    }
  }

  export default UPopup;