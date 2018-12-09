import React, {Component} from "react";
import "./MakePost.css";
import {Input, Row, Icon, Modal, Button} from 'react-materialize';
import {formatPostData} from "../helpers/formatPostData";
import axios from "axios";

export default class MakePost extends Component {

    constructor(props){
        super(props);
        this.state = {
            user_id_posted: sessionStorage.getItem("user_id"),
            title: "",
            address: "",
            description: "",
            dist_to_campus: "",
            price: 0,
            home_type: "",
            room_type:  "",
            single: false,
            double: false,
            triple: false,
            living:false,
            home: false,
            apartment: false,
            
            pet: false,
            in_unit_laundry: false,
            furnished: false,
            gym: false,
            pool: false,
            parking: false, 
            images: [],
        };

        this.submitPost = this.submitPost.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleCheckBox(event) {
        const {name, checked} = event.currentTarget;
        if(checked !== false){
           this.setState({
               [name]:true
        })
        }else{
           this.setState({
               [name]:false
           })
        }
    }



    handleChange(event){
        const {name, value} = event.currentTarget;
        this.setState({
            [name]: value
        })
    }


    async submitPost(e) {
        e.preventDefault();
        const params = formatPostData(this.state);
        const response = await axios.post("http://localhost:8000/api/queries/make_post.php", params);
        console.log(response);
        if(response.data.success){
            $(".makePostModal").css("display", "none");
            $("#myModal2").css("display", "block");
        }

    }

    cancelPost(e) {
        $(".makePostModal").css("display", "none");
    }



    fileChangedHandler=(event)=>{
        // let reader = new FileReader();
        let files=event.target.files;
        const reader = new FileReader();

        for(var i = 0; i < files.length; i++){
            var file = files[i];
            this.handleLoadImage(file);
        }
        for(var i = 0; i < this.state.images.length; i++){
            console.log("forloop: ", i);
            $(".picsContainer").append('<img id="listingPics" src="' + this.state.images[i] + '"/>');
        }
        console.log(this.state);
        this.setState({
            images: [],
        });
      }

      handleLoadImage = (file) => {
          console.log("handleimageLoad");
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                var array = this.state.images;
                array.push(reader.result);
                console.log("ARRAY: ", array);
                this.setState(() => ({
                    images: array,
                }));         
            };
            reader.readAsDataURL(file);
          }
      }

    


    render () {
        return (
            <div className="modal makePostModal">
                <div className="modal-dialog">
                    <form onSubmit={this.submitPost}>
                        <div className="modal-content makePostContent">
                            <button type="button" className="close"
                                data-dismiss="modal" onClick={this.cancelPost.bind(this)}>&times;</button>
                            <div className="modal-header">
                                <h4 className="modal-title">
                                    Make a Post
                                </h4>
                            </div>
                            <div className="modal-body makeAPostBody">
                                <div className="container postContainer">
                                        <div className="row">
                                            <div className="col-sm-8 postInfoBox">
                                                <Row>
                                                    <Input s={8} name="title" label="Title" onChange={this.handleChange.bind(this)}/>
                                                </Row>
                                                <Row>
                                                    <Input s={12} name="address" label="Full Address" onChange={this.handleChange.bind(this)}/>
                                                </Row>
                                                <Row>
                                                    <h4>Room Type</h4>
                                                    <Input s={12} className="browser-default" name="room_type" type="select" onChange={this.handleChange}>
                                                        <option value="s">Single</option>
                                                        <option value="d">Double</option>
                                                        <option value="t">Triple</option>
                                                        <option value="l">Living</option>
                                                    </Input>
                                                </Row>
                                                <Row>         
                                                    <h4>Home Type</h4>
                                                    <Input s={12} className="browser-default" name="home_type" type="select" onChange={this.handleChange}>
                                                        <option value="h">Home</option>
                                                        <option value="a">Apartment</option>
                                                    </Input>
                                                </Row>
                                                <Row>
                                                    <Input s={6} name="price" label="Price/month" onChange={this.handleChange}/>
                                                    <Input s={6} name="dist_to_campus" label="Distance from campus" onChange={this.handleChange}/>
                                                </Row>
                                                <Row>
                                                    <Input s={12} className="descriptionInput" name="description" type="textarea" placeholder="Tell us about your place!" label="Description" onChange={this.handleChange}/>
                                                </Row>
                                            </div>
                                            <div className="col-sm-4 featureBox">
                                                <Row>
                                                    <h4>Amenities and Features</h4>
                                                    <Input s={12} name="pet" checked={this.state.pet}  label="Pets" type="checkbox" onChange={this.handleCheckBox}>
                                                        <Icon>pets</Icon>
                                                    </Input>
                                                    <Input s={12} name="in_unit_laundry" checked={this.state.in_unit_laundry} label="Laundry" type="checkbox" onChange={this.handleCheckBox}>
                                                        <Icon>local_laundry_service</Icon>
                                                    </Input>
                                                    <Input s={12} name="furnished" checked={this.state.furnished} label="Furnished" type="checkbox" onChange={this.handleCheckBox}>
                                                        <Icon>kitchen</Icon>
                                                    </Input>
                                                    <Input s={12} name="gym" checked={this.state.gym} label="Gym" type="checkbox" onChange={this.handleCheckBox}>
                                                        <Icon>fitness_center</Icon>
                                                    </Input>
                                                    <Input s={12} name="pool" checked={this.state.pool} label="Pool" type="checkbox" onChange={this.handleCheckBox}>
                                                        <Icon>pool</Icon>
                                                    </Input>
                                                    <Input s={12} name="parking" checked={this.state.parking} label="Parking" type="checkbox" onChange={this.handleCheckBox}>
                                                        <Icon>local_parking</Icon>
                                                    </Input>
                                                </Row>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 picBox">
                                                <div className="picsContainer">
                                                    
                                                </div>
                                                <div className="inputContainer">
                                                    <Row>
                                                        <Input s={12} label="Upload Images" type="file" multiple onChange={this.fileChangedHandler.bind(this)}></Input>
                                                    </Row>
                                                </div>

                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer makeAPostFooter">
                                <button className="btn cancelBtn" waves="light" onClick={this.cancelPost.bind(this)}>Cancel</button>

                                <button type="submit" className="btn waves-effect waves-light">Post
                                <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}