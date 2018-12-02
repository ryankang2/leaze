import React from "react";
import "./Popup.css";
import { Input } from "react-materialize"

class PPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id:3,
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
    console.log("prerfismounted")
    const params = formatPostData(this.state);
    const response = await axios.post("http://localhost:8000/api/queries/get_pref.php", params);
    console.log(response.data);
    $("guests").text(response.data.gpd)
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

  render() {
    return (
      <div className='ppopup'>
        <div className='popup_inner'>
          <h1 className="title">Update Your Preferences</h1>
          <div className="col-sm-4">
            <label>How many guests days per week?: </label>
            <Input s={12} id='guests' className="inputs" type='select' name='gpd' value={this.state.gpd}
              onChange={this.handleChange.bind(this)} >
              <option value='-1'>0 Days</option>
              <option value='1'>1 Day</option>
              <option value='2'>2 Days</option>
              <option value='3'>3 Days</option>
              <option value='4'>4 Days</option>
              <option value='5'>5 Days</option>
              <option value='6'>6 Days</option>
              <option value='7'>7 Days</option>
            </Input>
            <label>Late Sleeper?: </label>
            <Input s={12} id='latesleeper' className="inputs" type='select' name='latesleep' value={this.state.latesleep}
              onChange={this.handleChange.bind(this)} >
              <option value='-1'>No</option>
              <option value='1'>Yes</option>
            </Input>
            <label>Deep Sleeper?: </label>
            <Input s={12} id='deepsleeper' className="inputs" type='select' name='deepsleep' value={this.state.deepsleep} 
              onChange={this.handleChange.bind(this)}>
              <option value='-1'>No</option>
              <option value='1'>Yes</option>
            </Input>
            <label>Early Riser?: </label>
            <Input s={12} id='earlyriser' className="inputs" type='select' name='earlyrise' value={this.state.earlyrise}
              onChange={this.handleChange.bind(this)}>
              <option value='-1'>No</option>
              <option value='1'>Yes</option>
            </Input>
            <button onClick=
              {this.props.closePPopup} id="button1" className="btn btn-primary">Cancel</button>
          </div>
          <div className="col-sm-4">
            <label>How Messy?: </label>
            <Input s={12} id='messyman' className="inputs" type='select' name='messy' value={this.state.messy}
              onChange={this.handleChange.bind(this)}>
              <option value='1'>Not at All</option>
              <option value='2'>A Little</option>
              <option value='3'>Moderately</option>
              <option value='4'>Very</option>
              <option value='5'>Extremely</option>
            </Input>
            <label>Video Games?: </label>
            <Input s={12} id='gamer' className="inputs" type='select' name='videogames' value={this.state.videogames}
              onChange={this.handleChange.bind(this)}>
              <option value='-1'>Never</option>
              <option value='1'>Rarely</option>
              <option value='2'>Occasionally</option>
              <option value='3'>Often</option>
            </Input>
            <label>Extroverted?: </label>
            <Input s={12} id='social' className="inputs" type='select' name='extro' value={this.state.extro}
              onChange={this.handleChange.bind(this)}>
              <option value='1'>Not at All</option>
              <option value='2'>A Little</option>
              <option value='3'>Moderately</option>
              <option value='4'>Very</option>
              <option value='5'>Extremely</option>
            </Input>
            <label>Substances?: </label>
            <Input s={6} id='alc' name='alcohol' className="inputs" type='checkbox' checked={this.state.alcohol} value='1' label='Alcohol' onChange={this.handleCheckBox.bind(this)} />
            <Input s={6} id='weed' name='marijuana' className="inputs" type='checkbox' checked={this.state.marijuana} value='2' label='Marijuana' onChange={this.handleCheckBox.bind(this)} />
            <Input s={6} id='stoges' name='cigarettes' className="inputs" type='checkbox' checked={this.state.cigarettes} value='3' label='Cigarettes' onChange={this.handleCheckBox.bind(this)} />
            <Input s={6} id='heroin' name='other' className="inputs" type='checkbox' checked={this.state.other} value='5' label='Other' onChange={this.handleCheckBox.bind(this)} />
          </div>
          <div className="col-sm-4">
            <label>Study Noise Level?: </label>
            <Input s={12} id='studynoise' className="inputs" type='select' name='noise' value={this.state.noise}
              onChange={this.handleChange.bind(this)}>
              <option value='1'>Very Quiet</option>
              <option value='2'>Quiet</option>
              <option value='3'>Moderate</option>
              <option value='4'>Loud</option>
              <option value='5'>Very Loud</option>
            </Input>
            <label>Are you willing to share belongings?: </label>
            <Input s={12} id='belongings' className="inputs" type='select' name="share" value={this.state.share}
              onChange={this.handleChange.bind(this)}>
              <option value='1'>Not at All</option>
              <option value='2'>A Little</option>
              <option value='3'>Moderately</option>
              <option value='4'>Willing</option>
              <option value='5'>Very Willing</option>
            </Input>
            <label>What relationship do you expect from a roommate? </label>
            <Input id='friends' className="inputs" type='select' name="relations" value={this.state.relations}
              onChange={this.handleChange.bind(this)}>
              <option value='1'>Find Friends Elsewhere</option>
              <option value='2'>Get Along</option>
              <option value='3'>Close Friends</option>
            </Input>
            <button onClick=
              {this.props.closePPopup} id="button2" className="btn btn-primary">Save Updates</button>
          </div>
        </div>
      </div>

    );
  }
}

export default PPopup;