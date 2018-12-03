import React, {Component} from "react";
import "./MakePost.css";
import {Input, Row} from 'react-materialize';

export default class MakePost extends Component {

     constructor(props){
         super(props);
         this.state = {
             roomType: 'single',
             homeType: 'house',
             
             address: '',
             price: 0,
             addNotes: ''
         };

         this.submitPost = this.submitPost.bind(this);
     }

     handleChange(e) {
         let target = e.target;
         let value = target.type === 'checkbox' ? target.checked : target.value;
         let name = target.name;

         this.setState({
           [name]: value
         });
    }

    submitPost(e) {
        console.log(this.state);
    }

    cancelPost(e) {
        document.getElementById("makePostTitle").parentElement.style.display = "none";
    }

    render () {
        return <div className="postModal">
            <div className="modal">
                <h3 id="makePostTitle">Make a Post</h3>
                <div id="postFormInputs">
                    <form onSubmit={this.submitPost} className="PostForms">
                        <Row className="col-sm-6">
                            <Input className="browser-default" id="roomType" type ='select' label="Room Type" name="roomType" defaultValue = {this.state.roomType} onChange={this.handleChange.bind(this)}>
                                <option value="single">Single</option>
                                <option value="double">Double</option>
                                <option value="triple">Triple</option>
                                <option value="livingRoom">Living Room</option>
                            </Input>

                            <div className="mpInputDiv">
                                <label className="MPlabel" htmlFor="MPaddress">Address</label>
                                <input id="MPaddress" className="MPinput" placeholder="Enter the address" name="address" value={this.state.address} onChange={this.handleChange.bind(this)} />
                            </div>

                            <div class=".input-field" >
                                <label className="MPlabel" htmlFor="addNotes" id="mytestingniqqa">Additional Notes</label>
                                <Input type="textarea" id="addNotes" className="MPinput" placeholder="Write any important details here" name="addNotes" value={this.state.addNotes} onChange={this.handleChange.bind(this)}></Input>
                            </div>
                        </Row>
                        <Row className="col-sm-6">
                            <Input id="homeType" className="browser-default" id="homeType" type ='select' label="Home Type" name="homeType" defaultValue = {this.state.homeType} onChange={this.handleChange.bind(this)}>
                                <option value="house">House</option>
                                <option value="apartment">Apartment</option>
                            </Input>

                            <div className="mpInputDiv">
                                <label className="MPlabel" htmlFor="MPprice">Price/Month</label>
                                <input id="MPprice" className="MPinput" placeholder="Enter the monthly price" name="price" value={this.state.price} onChange={this.handleChange.bind(this)} />
                            </div>
                            <div id="picUpload">
                                <Input  type="file" label="Pictures" s={12} />
                            </div>
                        </Row>
                        <button type="Submit" id="submitPost">Post Listing</button>      
                    </form>
                    <button id="cancelPost" onClick={this.cancelPost}>Cancel</button>
                </div>
            </div>
        </div>
    }
}