import React from "react";
import "./Popup.css";

class PPopup extends React.Component {
  constructor(props){
    super(props);
    this.state={
        email:'',
        gpd:'',
        latesleep:'',
        deepsleep:'',
        earlyrise:'',
        messy:'',
        videogames: '',
        extro: '',
        drugs: '',
        noise: '',
        share:'',
        relations:'',
    };
  }
    render() {
      return (
        <div class='ppopup'>
          <div class='popup_inner'>
            <h1>Update Your Preferences</h1>
            <div class="row-md-12" id="info">
              <label>Email: </label>
              <input class="inputs" value = {this.state.email}
                onChange={e=> this.setState({email:e.target.value})}/>
              <label>How many guests days per week?: </label>
              <input class="inputs" value = {this.state.gdp}
                onChange={e=> this.setState({gdp:e.target.value})}/>
              <label>Late Sleeper?: </label>
              <input class="inputs" value = {this.state.latesleep}
                onChange={e=> this.setState({latesleep:e.target.value})}/>
              <label>Deep Sleeper?: </label>
              <input class="inputs" value = {this.state.deepsleep}
                onChange={e=> this.setState({deepsleep:e.target.value})}/>
              <label>Early Riser?: </label>
              <input class="inputs" value = {this.state.earlyrise}
                onChange={e=> this.setState({earlyrise:e.target.value})}/>
              <label>How Messy? (1-5): </label>
              <input class="inputs" value = {this.state.messy}
                onChange={e=> this.setState({messy:e.target.value})}/>
              <label>Video Games? (Never=0, Rarely=1, Occasionally=2, Often=3): </label>
              <input class="inputs" value = {this.state.videogames}
                onChange={e=> this.setState({videogames:e.target.value})}/>
              <label>Extroverted? (1-5): </label>
              <input class="inputs" value = {this.state.extro}
                onChange={e=> this.setState({extro:e.target.value})}/>
              <label>Substances? (Alcohol=1, Marijuana=2, Cigarettes=3, Other=5) Put all numbers that apply: </label>
              <input class="inputs" value = {this.state.drugs}
                onChange={e=> this.setState({drugs:e.target.value})}/>
              <label>Study Noise Level? (1-5): </label>
              <input class="inputs" value = {this.state.noise}
                onChange={e=> this.setState({noise:e.target.value})}/>
              <label>Are you willing to share belongings? (1-5): </label>
              <input class="inputs" value = {this.state.share}
                onChange={e=> this.setState({share:e.target.value})}/>
              <label>What relationship do you expect from a roommate? (Close Friends = 0, Get Along = 1, Find Friends Elsewhere = 2): </label>
              <input class="inputs" value = {this.state.relations}
                  onChange={e=> this.setState({relations:e.target.value})}/>
              <button onClick=
                {this.props.closePPopup}>Save Changes</button>
            </div>
          </div>
        </div>
      );
    }
  }

  export default PPopup;