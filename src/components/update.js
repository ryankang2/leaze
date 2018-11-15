import React, {Component} from 'react';
import "./update.css";

class Update extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            sex:'',
            age:'',
            hometown:'',
            school:'',
            major:'',
            hobbies:'',
        };
    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    pushToFirebase(event) {
        const {name, sex, age, hometown, school, major, hobbies} = this.state;
        event.preventDefault();
        this.firebaseRef.child(name).set({name, sex, age, hometown, school, major, hobbies });
        this.setState({name: '', sex: '', age: '', hometown: '',school: '', major: '', hobbies: ''});
    }

    render(){
        return(
            <div id="background">
            <div id="header">
                <h1>Edit Your Profile</h1>
            </div>
                <label>Name:</label>
                <input
                    value = { this.state.name }
                    onChange= {e => this.setState({name: e.target.value})}/>
                <br />
                <label>Sex:</label>
                <input
                    value = { this.state.sex }
                    onChange= {e => this.setState({sex: e.target.value})}/>
                <br />
                <label>Age:</label>
                <input
                    value = { this.state.age }
                    onChange= {e => this.setState({age: e.target.value})} />
                <br />
                <label>Hometown:</label>
                <input
                    value = { this.state.hometown }
                    onChange= {e => this.setState({hometown: e.target.value})}/>
                <br />
                <label>School:</label>
                <input
                    value = { this.state.school }
                    onChange= {e => this.setState({school: e.target.value})}/>
                <br />
                <label>Major:</label>
                <input
                    value = { this.state.major }
                    onChange= {e => this.setState({major: e.target.value})}/>
                <br />
                <label>Hobbies:</label>
                <input
                    value = { this.state.hobbies }
                    onChange= {e => this.setState({hobbies: e.target.value})}/>
                <br />
                <textarea rows = "4" cols="50">
                  </textarea>
                  <br />
                {/*</div>/<button onClick={(event) => this.updateSub(document.getElementById('regName').value)}*/}
            </div>
        );
    }
}


export default Update;