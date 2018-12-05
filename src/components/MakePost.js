import React, {Component} from "react";
import "./MakePost.css";
import {Input, Row} from 'react-materialize';

export default class MakePost extends Component {

    constructor(props){
        super(props);
        this.state = {
            user_id_posted: "",

            title: "",
            address: "",
            description: "",
            dist_to_campus: "",
            price: 0,
            home_type: 'house',
            room_type: 'single',
            
            pet: "-1",
            in_unit_laundry: "-1",
            furnished: "-1",
            gym: "-1",
            pool: "-1",
            parking: "-1"          
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
                <div className="container postContainer">
                    {/* <form onSubmit={this.submitPost}> */}
                        <div className="row">
                            <div className="col-sm-8 infoBox">

                            </div>
                            <div className="col-sm-4 featureBox">

                            </div>
                        </div>

                        <div className="row">
                            <div className = "col-sm-12 picBox">

                            </div>
                        </div>
                        <button type="Submit" id="submitPost">Post Listing</button>
                    {/* </form> */}

                    {/* <div id="postFormInputs">
                        <form onSubmit={this.submitPost} className="PostForms">
                            
                            <button type="Submit" id="submitPost">Post Listing</button>      
                        </form>
                    </div> */}

                </div>
            </div>
        </div>
    }
}