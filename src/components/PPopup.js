import React from "react";
import "./Popup.css";
import {Row, Input } from "react-materialize"
import {formatPostData} from "../helpers/formatPostData";
import axios from "axios";

class PPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id:sessionStorage.getItem("user_id"),
      gpd: '',
      latesleep: '',
      deepsleep: '',
      earlyrise: '',
      messy: '',
      videogames: '',
      extro: '',
      alcohol: false,
      marijuana: false,
      cigarettes: false,
      other: false,
      noise: '',
      share: '',
      relations: '',
    };
  }
  async componentDidMount(){
    const idObj ={
      user_id: sessionStorage.getItem("user_id"),
    }
    const params = formatPostData(idObj);
    const response = await axios.post("http://localhost:8000/api/queries/get_pref.php", params);
    this.setState({gpd: response.data.guests_per_week})
    this.setState({latesleep: response.data.late_sleeper})
    this.setState({deepsleep: response.data.deep_sleeper})
    this.setState({earlyrise: response.data.early_bird})
    this.setState({messy: response.data.messiness})
    this.setState({videogames: response.data.video_games})
    this.setState({extro: response.data.extrovert})
    if (response.data.alcohol=="1"){
      this.setState({alcohol:true})
    }
    if(response.data.marijuana=="1"){
      this.setState({marijuana: true})
    }
    if(response.data.cigarettes=="1"){
      this.setState({cigarettes: true})
    }
    if(response.data.other=="1"){
      this.setState({other: true})
    }
    this.setState({noise: response.data.study_noise_level})
    this.setState({share: response.data.sharing_belongings})
    this.setState({relations: response.data.roommate_relationship})

    console.log(response.data)
  }

  handleChange(event) {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value
    })
  }
  async submitPref(event){
    const params = formatPostData(this.state);
    console.log(this.state)
    const response = await axios.post("http://localhost:8000/api/queries/set_pref.php", params);
    console.log(response.data)
    window.location.reload();
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

  render() {
    return (
      <div className='ppopup'>
        <div className='popup_inner'>
          <h1 className="title">Update Your Preferences</h1>
          <div className="col-sm-4">
            <Row>
            <label>Days per week guests can come over? </label>
            <Input s={12} id='guests' className="browser-default" type='select' name='gpd' value={this.state.gpd}
              onChange={this.handleChange.bind(this)} >
              <option value='0'>No Pref</option> 
              <option value='-1'>0 Days</option>
              <option value='1'>1 Day</option>
              <option value='2'>2 Days</option>
              <option value='3'>3 Days</option>
              <option value='4'>4 Days</option>
              <option value='5'>5 Days</option>
              <option value='6'>6 Days</option>
              <option value='7'>7 Days</option>
            </Input>
            </Row>
            <Row>
            <label>Late Sleeper? </label>
            <Input s={12} id='latesleeper' className="browser-default" type='select' name='latesleep' value={this.state.latesleep}
              onChange={this.handleChange.bind(this)} >
              <option value='0'>No Pref</option> 
              <option value='-1'>No</option>
              <option value='1'>Yes</option>
            </Input>
            </Row>
            <Row>
            <label>Deep Sleeper? </label>
            <Input s={12} id='deepsleeper' className="browser-default" type='select' name='deepsleep' value={this.state.deepsleep} 
              onChange={this.handleChange.bind(this)}>
              <option value='0'>No Pref</option> 
              <option value='-1'>No</option>
              <option value='1'>Yes</option>
            </Input>
            </Row>
            <label>Early Riser? </label>
            <Row>
            <Input s={12} id='earlyriser'  className="browser-default" type='select' name='earlyrise' value={this.state.earlyrise}
              onChange={this.handleChange.bind(this)}>
              <option value='0'>No Pref</option> 
              <option value='-1'>No</option>
              <option value='1'>Yes</option>
            </Input>
            </Row>
            <button onClick=
              {this.props.closePPopup} id="cancelButton" className="btn btn-primary">Cancel</button>
          </div>
          <div className="col-sm-4">
            <Row>
            <label>How Messy? </label>
            <Input s={12} id='messyman' className="browser-default" type='select' name='messy' value={this.state.messy}
              onChange={this.handleChange.bind(this)}>
              <option value='0'>No Pref</option> 
              <option value='1'>Not at All</option>
              <option value='2'>A Little</option>
              <option value='3'>Moderately</option>
              <option value='4'>Very</option>
              <option value='5'>Extremely</option>
            </Input>
            </Row>
            <Row>
            <label>Video Games? </label>
            <Input s={12} id='gamer' className="browser-default" type='select' name='videogames' value={this.state.videogames}
              onChange={this.handleChange.bind(this)}>
              <option value='0'>No Pref</option> 
              <option value='-1'>Never</option>
              <option value='1'>Rarely</option>
              <option value='2'>Occasionally</option>
              <option value='3'>Often</option>
            </Input>
            </Row>
            <Row>
            <label>Extroverted? </label>
            <Input s={12} id='social' className="browser-default" type='select' name='extro' value={this.state.extro}
              onChange={this.handleChange.bind(this)}>
              <option value='0'>No Pref</option> 
              <option value='1'>Not at All</option>
              <option value='2'>A Little</option>
              <option value='3'>Moderately</option>
              <option value='4'>Very</option>
              <option value='5'>Extremely</option>
            </Input>
            </Row>
            <label>What substances are you okay with? </label>
            <Input s={6} id='alc' name='alcohol' className="inputs" type='checkbox' checked={this.state.alcohol} label='Alcohol' onChange={this.handleCheckBox.bind(this)} />
            <Input s={6} id='weed' name='marijuana' className="inputs" type='checkbox' checked={this.state.marijuana} label='Marijuana' onChange={this.handleCheckBox.bind(this)} />
            <Input s={6} id='stoges' name='cigarettes' className="inputs" type='checkbox' checked={this.state.cigarettes} label='Cigarettes' onChange={this.handleCheckBox.bind(this)} />
            <Input s={6} id='heroin' name='other' className="inputs" type='checkbox' checked={this.state.other} label='Other' onChange={this.handleCheckBox.bind(this)} />
          </div>
          <div className="col-sm-4">
            <Row>
            <label>Study Noise Level? </label>
            <Input s={12} id='studynoise' className="browser-default" type='select' name='noise' value={this.state.noise}
              onChange={this.handleChange.bind(this)}>
              <option value='0'>No Pref</option> 
              <option value='1'>Very Quiet</option>
              <option value='2'>Quiet</option>
              <option value='3'>Moderate</option>
              <option value='4'>Loud</option>
              <option value='5'>Very Loud</option>
            </Input>
            </Row>
            <Row>
            <label>Are you willing to share belongings? </label>
            <Input s={12} id='belongings' className="browser-default" type='select' name="share" value={this.state.share}

              onChange={this.handleChange.bind(this)}>
              <option value='0'>No Pref</option> 
              <option value='1'>Not at All</option>
              <option value='2'>A Little</option>
              <option value='3'>Moderately</option>
              <option value='4'>Willing</option>
              <option value='5'>Very Willing</option>
            </Input>
            </Row>
            <Row>
            <label>Expected roommate relationship? </label>
            <Input id='friends' className="browser-default" type='select' name="relations" value={this.state.relations}
              onChange={this.handleChange.bind(this)}>
              <option value='0'>No Pref</option> 
              <option value='1'>Find Friends Elsewhere</option>
              <option value='2'>Get Along</option>
              <option value='3'>Close Friends</option>
            </Input>
            </Row>
            <button onClick=
              {this.submitPref.bind(this)} id="saveButtonP" className="btn btn-primary">Save Updates</button>
          </div>
        </div>
      </div>

    );
  }
}

export default PPopup;