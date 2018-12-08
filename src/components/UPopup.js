import React from "react";
import "./Popup.css";
import {Input,Button} from "react-materialize"
import {formatPostData} from "../helpers/formatPostData";
import axios from "axios";

class UPopup extends React.Component {
  constructor(props){
    super(props);
    this.state={
        user_id:'', 
        firstname:'',
        lastname:'',
        age:'',
        email: '',
        school:'',
        major:'',
        year:'',
        bio:'',
        facebook: '',
        instagram: '',
        twitter: '',
        picture: null,
        imageURL:require('./default_profile_pic.jpg'),
    };
  }
  async componentDidMount(){
    const idObj ={
      user_id: sessionStorage.getItem("user_id"),
    }
    this.setState({user_id: sessionStorage.getItem("user_id")})
    const params = formatPostData(idObj);
    const response = await axios.post("http://localhost:8000/api/queries/get_prof.php", params);
    console.log(response.data);
    this.setState({firstname: response.data.firstname})
    this.setState({lastname: response.data.lastname})
    this.setState({age: response.data.age})
    this.setState({email: response.data.email})
    this.setState({school: response.data.school})
    this.setState({major: response.data.major})
    this.setState({year: response.data.year})
    this.setState({bio: response.data.bio})
    this.setState({facebook: response.data.facebook})
    this.setState({instagram: response.data.instagram})
    this.setState({twitter: response.data.twitter})
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
  async submitProf(event){
    const params = formatPostData(this.state);
    const response = await axios.post("http://localhost:8000/api/queries/set_prof.php", params);
    console.log(response.data)
    window.location.reload();
  }
  fileChangedHandler=(event)=>{
    this.setState({picture:event.target.files[0]})
    let reader = new FileReader();
    let file=event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        imageURL: reader.result
      });
    }
    reader.readAsDataURL(file)
    this.uploadHandler()
  }
  uploadHandler=()=> {
    console.log(this.state.imageURL)
  }
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <h1 className="title">Update Your Profile</h1>
              <div className="col-sm-6">
                <label>First Name: </label>
                <input id="firstName" className="inputs" name="firstname" defaultValue={this.state.firstname}
                  onChange={this.handleChange.bind(this)}/>
                <label>Last Name: </label>
                <input id="lastName" className="inputs" name="lastname" defaultValue = {this.state.lastname}
                  onChange={this.handleChange.bind(this)}/>
                <label>Age: </label>
                <input id="years" className="inputs" name="age" defaultValue = {this.state.age}
                  onChange={this.handleChange.bind(this)}/>
                <label>Email (must end with ".edu"): </label>
                <input id="mail" className="inputs" name="email" defaultValue = {this.state.email}
                  onChange={this.handleChange.bind(this)}/>
                <label>School: </label>
                <input id="uni" className="inputs" name="school" defaultValue = {this.state.school}
                  onChange={this.handleChange.bind(this)}/>
                <label>Major: </label>
                <input id="studies" className="inputs" name="major" defaultValue = {this.state.major}
                  onChange={this.handleChange.bind(this)}/>
                <label>Year: </label>
                <Input s={12} id='classYear' className="browser-default" type='select' name='year' value = {this.state.year}
                  onChange={this.handleChange.bind(this)}>
                  <option value='First'>First</option>
                  <option value='Second'>Second</option>
                  <option value='Third'>Third</option>
                  <option value='Fourth'>Fourth</option>
                  <option value='Other'>Other</option>
                </Input>
                <label>Bio: </label>
                <textarea id="descrip" rows='4' className="inputsB" name="bio" value = {this.state.bio}
                  onChange={this.handleChange.bind(this)}/>
                <button onClick=
                  {this.props.closeUPopup} className="btn btn-primary">Cancel</button>
              </div>
              <img id="displayPic" src={this.state.imageURL} />
              <div className="col-sm-6" id="pic">
                <label>Profile Picture: </label>
                <Input id="chooseButton" label="Choose Image" type='file' onChange={this.fileChangedHandler.bind(this)}/>
                <label>Facebook URL: </label>
                <input id="mail" className="inputs" name="facebook" defaultValue = {this.state.facebook}
                  onChange={this.handleChange.bind(this)}/>
                <label>Instagram URL: </label>
                <input id="mail" className="inputs" name="instagram" defaultValue = {this.state.instagram}
                  onChange={this.handleChange.bind(this)}/>
                    <label>Twitter URL: </label>
                <input id="mail" className="inputs" name="twitter" defaultValue = {this.state.twitter}
                  onChange={this.handleChange.bind(this)}/>
                <button onClick=
                  {this.submitProf.bind(this)} id="button4" className="btn btn-primary">Save Updates</button>
              </div>    
          </div>
        </div>
      );
    }
  }

  export default UPopup;