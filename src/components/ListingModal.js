import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./ListingModal.css"

export default class ListingModal extends Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    closeModal(){
        $(`.leaseImage-${this.props.information.listing_id}`).css("display", "none");
    }

    render(){
        // console.log("FROM LISTING MODAL: ", this.props.information);
        var linkQuery = "/home/profile/" + this.props.information.user.user_id;

        return (
            <div className={`modal leaseImage-${this.props.information.listing_id}`} id="myModal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <button type="button" className="close"
                                    data-dismiss="modal" onClick={this.closeModal.bind(this)}>&times;</button>
                                <div className="modal-header">
                                    <h4 className="modal-title">{this.props.information.title}</h4>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-4 col-md-4 col-lg-4 pricePerMonth">
                                                <i className="fa fa-money" aria-hidden="true"></i>
                                                ${this.props.information.price}/month
                                            </div>
                                            <div className="col-sm-6 col-md-6 col-lg-6 roomHome">
                                                <i className="fa fa-home" aria-hidden="true"></i>
                                                Single/Home
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="modal-body">
                                    <div className="container">
                                        <div className="row">
                                            <div className="leasingImagesContainer">
                                                <div id="myCarousel" className="carousel slide" data-ride="carousel" data-interval="false">
                                                        <ol className="carousel-indicators">
                                                            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                                                            <li data-target="#myCarousel" data-slide-to="1"></li>
                                                            <li data-target="#myCarousel" data-slide-to="2"></li>
                                                        </ol>

                                                        <div className="carousel-inner">
                                                            <div className="item active">
                                                                <img src={require("./house.jpg")}/>
                                                            </div>

                                                            <div className="item">
                                                                <img src={require("./house2.jpg")} />
                                                            </div>
                                                        
                                                            <div className="item">
                                                                <img src={require("./profile.jpg")} />
                                                            </div>
                                                        </div>

                                                        <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                                                            <span className="glyphicon glyphicon-chevron-left"></span>
                                                            <span className="sr-only">Previous</span>
                                                        </a>
                                                        <a className="right carousel-control" href="#myCarousel" data-slide="next">
                                                            <span className="glyphicon glyphicon-chevron-right"></span>
                                                            <span className="sr-only">Next</span>
                                                        </a>
                                                </div>                                                
                                            </div>
                                            {/* End of listingImagesCountainer */}
                                        </div>

                                        {/* Address and distance from campus */}
                                        <div className="row">
                                            <div className="addressInModal col-sm-8 col-md-8">
                                                {this.props.information.address}
                                            </div>
                                            <div className="distanceInModal col-sm-4 col-md-4">
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                2 miles from campus
                                            </div>
                                        </div>

                                        {/* Description of leasing */}
                                        <div className="row">
                                            <div className="description col-sm-8 col-md-8">
                                                {this.props.information.description}
                                                {/* We are located in the Little Italy neighborhood of Downtown San Diego. A neighborhood that is constantly evolving with
                                                it’s unique repertoire of restaurants, cafes, art galleries & shops always serving up something brilliant and unexpected.
                                                Our home is thoughtfully designed and tastefully decorated that results in a destination striking in both it’s modern 
                                                aesthetic and comfortable feel. It comes fully furnished with everything one would need for a weekend getaway or a business trip! */}
                                            </div>
                                        </div>

                                        {/* Facts */}
                                        <div className="featuresText">
                                                Features
                                        </div>
                                        <div className="row">
                                            <div className={!this.props.information.pet ? "strikeThrough" : "feature col-sm-4 col-md-4"}>
                                                <i className="material-icons" >
                                                pets
                                                </i>
                                                Pets

                                            </div>
                                            <div className={!this.props.information.in_unit_laundry ? "strikeThrough" : "feature col-sm-4 col-md-4"}>
                                                <i className="material-icons">
                                                local_laundry_service
                                                </i>
                                                In Unit Laundry
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className={!this.props.information.gym ? "strikeThrough" : "feature col-sm-4 col-md-4"}>
                                                <i className="material-icons">
                                                fitness_center
                                                </i>
                                                Gym
                                            </div>
                                            <div className={!this.props.information.pool ? "strikeThrough" : "feature col-sm-4 col-md-4"}>
                                                <i className="material-icons">
                                                pool
                                                </i>
                                                Pool
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className={!this.props.information.parking ? "strikeThrough" : "feature col-sm-4 col-md-4"}>
                                                <i className="material-icons">
                                                local_parking
                                                </i>
                                                Parking
                                            </div>
                                            <div className={!this.props.information.furnished ? "strikeThrough" : "feature col-sm-4 col-md-4"}>
                                                <i className="material-icons">
                                                kitchen
                                                </i>
                                                Furnished
                                            </div>
                                        </div>
                                        <div className="row">

                                           <div className="profileBox col-sm-8 col-md-8" >
                                                <Link to = {linkQuery}>
                                                    <img className="userPictureModal" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7A4jeJ_RBCBZL7kHIc9CSDn3XdSfWgHBOJ1L2ieqBvx9eLcubrQ"/>
                                                </Link>
                                                <Link to = {linkQuery}>
                                                    <div className="userNameModal" >{this.props.information.user.full_name}</div>
                                                </Link>


                                                <div className={`match-${this.props.information.listing_id}`} id="matchModal"></div>

                                        </div>


                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger"
                                            data-dismiss="modal" onClick={this.closeModal.bind(this)}>Close
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
        )
    }
}