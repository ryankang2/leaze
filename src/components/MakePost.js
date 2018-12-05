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
            parking: false         
        };

        this.submitPost = this.submitPost.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.handleRoomType = this.handleRoomType.bind(this);
        this.handleHomeType = this.handleHomeType.bind(this);
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
        console.log(this.state);
    }

    handleRoomType(event){
        const {name, checked, value} = event.currentTarget;
        var stateValue = this.state.room_type;
        if(checked !== false){
            this.setState({
                room_type: stateValue + value,
                [name]: true
            })
        }else{
            var stringToArray = stateValue.split("");
            var index = stringToArray.indexOf(value);
            stringToArray.splice(index, 1);
            var arrayToString = stringToArray.join("");
            this.setState({
                room_type: arrayToString,
                [name]: false
            })
        }
    }

    handleHomeType(event){
        const {name, value, checked} = event.currentTarget;
        var stateValue = this.state.home_type;
        if(checked){
            this.setState({
                [name]: true,
                home_type: stateValue + value
            })
        }
        else{
            var stringToArray = stateValue.split("");
            var index = stringToArray.indexOf(value);
            stringToArray.splice(index, 1);
            var arrayToString = stringToArray.join("");
            this.setState({
                home_type: arrayToString,
                [name]: false
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
                                                    <Input name="single" checked={this.state.single} type="checkbox" value="s" label="Single" onChange={this.handleRoomType}/>
                                                    <Input name="double" checked={this.state.double} type="checkbox" value="d" label="Double" onChange={this.handleRoomType}/>
                                                    <Input name="triple" checked={this.state.triple} type="checkbox" value="t" label="Triple" onChange={this.handleRoomType}/>
                                                    <Input name="living" checked={this.state.living} type="checkbox" value="l" label="Living" onChange={this.handleRoomType}/>
                                                </Row>
                                                <Row>         
                                                    <h4>Home Type</h4>
                                                    <Input name="apartment" checked={this.state.apartment} type="checkbox" value="a" label="Apartment" onChange={this.handleHomeType}/>
                                                    <Input name="home" checked={this.state.home} type="checkbox" value="h" label="Home" onChange={this.handleHomeType}/>
                                                </Row>
                                                <Row>
                                                    <Input s={6} name="price" label="Price/month" onChange={this.handleChange}/>
                                                    <Input s={6} name="dist_to_campus" label="Distance from campus" onChange={this.handleChange}/>
                                                </Row>
                                                <Row>
                                                    <Input s={12} name="description" type="textarea" placeholder="Tell us about your place!" label="Description" onChange={this.handleChange}/>
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
                                            <div className = "col-sm-12 picBox">
                                            {/* <Row>
                                                <Input type="file" label="File" s={12} multiple placeholder="Upload one or more files" />
                                            </Row> */}
                                            </div>
                                        </div>
                                </div>
                            </div>
                            <div className="modal-footer makeAPostFooter">
                                <button class="btn cancelBtn" waves="light" onClick={this.cancelPost.bind(this)}>Cancel</button>

                                <button type="submit" className="btn waves-effect waves-light">Post
                                <i class="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>


            // <div className="postModal">
            //     <div className="modal">
            //         <h3 id="makePostTitle">Make a Post</h3>
            //         <div className="container postContainer">
            //             <form onSubmit={this.submitPost}>
            //                 <div className="row">
            //                     <div className="col-sm-8 postInfoBox">

            //                     </div>
            //                     <div className="col-sm-4 featureBox">

            //                     </div>
            //                 </div>

            //                 <div className="row">
            //                     <div className = "col-sm-12 picBox">

            //                     </div>
            //                 </div>
            //                 <button type="Submit" id="submitPost">Post Listing</button>
            //             </form>


            //         </div>
            //     </div>
            // </div>
        )
    }
}