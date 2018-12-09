import React, {Component} from "react";
import "./MakePost.css";
import {Input, Row, Icon, Modal, Button} from 'react-materialize';
import {formatPostData} from "../helpers/formatPostData";
import axios from "axios";

const intialState= { 
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
    active: false,
    title_class: "",
    price_class: "",
    address_class: "",
    error: "hidden",
    images: [],
}

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
            home_type: "h",
            room_type:  "s",
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
            active: false,
            title_class: "",
            price_class: "",
            address_class: "",
            error: "hidden",
            images: [],
        };

        this.submitPost = this.submitPost.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.fileReader = new FileReader();

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

    validate(title, address, price){
        return{
            title: title.length === 0,
            address: address.length === 0,
            price: price === 0 || price.length === 0,
        };
    }

    checkError(){
        
        if(this.state.title === ""){
            this.setState({title_class:"invalid"});
        }else{
            this.setState({title_class:"valid"});
        }
        if(this.state.price === 0 || this.state.price.length === 0){
            this.setState({price_class:"invalid"});
        }else{
            this.setState({price_class:"valid"})
        }
        if(this.state.address === ""){
            this.setState({address_class:"invalid"});
        }else{
            this.setState({address_class:"valid"});
        }
    }

    async submitPost(e) {
        e.preventDefault();
        // var data   = new FormData();
        
        // this.state.images.forEach(function(image, i) {
        //     data.append('image_' + i, image);
        // });
        // this.setState({
        //     images: data,
        // })
        // console.log("STATE: ", this.state);
        const errors = this.validate(this.state.title, this.state.address, this.state.price);
        let isValid = Object.keys(errors).some(i => errors[i]);
        if(!isValid){
            this.setState({active:false})
            document.getElementById("error").className = "hidden";
            // this.setState({
            //     images: JSON.stringify(this.state.images)
            // })
            const params = formatPostData(this.state);
            const response = await axios.post("/api/queries/make_post.php", params);
            const photoResponse = await axios.post("/api/queries/add_listing_photos.php", params)
            
            console.log(response);
            if(response.data.success  && photoResponse.data.success){
               $(".makePostModal").css("display", "none");
              $("#myModal2").css("display", "block");
            }
        }
        else{
            this.setState({active:true});
            this.checkError();
            this.setState({error:""})
        }
    }

    cancelPost(e) {
        $(".makePostModal").css("display", "none");
        this.setState(initialState);
    }



    fileChangedHandler=(event)=>{
        // let reader = new FileReader();
        let files=event.target.files;
        console.log("files: ", files);
        var array = [];
        for(var i = 0; i < files.length; i++){
            let reader = new FileReader();
            var file = files[i];
            // this.handleLoadImage(file);
            reader.onloadend = () => {
                this.setState({images: this.state.images.concat(reader.result)});
                // this.setState({images: array});
            }
            reader.readAsDataURL(file);
        }

        // for(var i = 0; i < this.state.images.length; i++){
        //     $(".picsContainer").append('<img id="listingPics" src="' + this.state.images[i] + '"/>');
        // }
        console.log("this.state: ", this.state);
      }

    //   handleLoadImage = (file) => {
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             var array = this.state.images;
    //             array.push(reader.result);
    //             console.log("ARRAY: ", array);
    //             this.setState(() => ({
    //                 images: array,
    //             }));         
    //         };
    //         reader.readAsDataURL(file);
    //       }
    //   }



    render () {
        let {images} = this.state;
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
                                                    <Input s={8} name="title" label="Title" className={this.state.active ? this.state.title_class : ""} onChange={this.handleChange.bind(this)}/>
                                                </Row>
                                                <Row>
                                                    <Input s={12} name="address" label="Full Address" class={this.state.active ? this.state.address_class : ""} onChange={this.handleChange.bind(this)}/>
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
                                                    <Input s={6} name="price" type="number" label="Price/month" class={this.state.active ? this.state.price_class : ""} onChange={this.handleChange}/>
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
                                                    {images.map((item,index) => <img id="listingPics" src={item} />)}
                                                </div>
                                                <div className="inputContainer">
                                                    <Row>
                                                        <Input s={8} label="Select" type="file" name="images" multiple onChange={this.fileChangedHandler.bind(this)}></Input>
                                                    </Row>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer makeAPostFooter">
                                <p id="error" class={this.state.active ? this.state.error : "hidden"}>You must fill in the highlighted fields</p>
                                <button class="btn cancelBtn" waves="light" onClick={this.cancelPost.bind(this)}>Cancel</button>
                                
                                <button type="submit" className="btn waves-effect waves-light">Post
                                
                                <i class="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
