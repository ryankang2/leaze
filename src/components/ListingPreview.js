import React, {Component} from "react";
import "./ListingPreview.css"
import Profile from "./Profile";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



class ListingPreview extends Component{
    constructor(props){
        super(props);
        this.state = {
            picture: "",
            userName: "",
            userRating: "",
            userPicture: "",
            distance: "",
            dateDiff: "",
            postTitle: "",
            favorite: false,
        }
    }

    leasePopup(){
        console.log("PICTURE/CLICKED");
        $("#popupModal").modal("open");

    }


    goToProfile(event){
        console.log(event.target.innerText);
        var userName = event.target.innerText;

        console.log("GO TO PROFILE");
    }

    toggleHeart(){
        this.setState({favorite: !this.state.favorite})
        console.log("heart clicked");
        // x.classList.toggle("fa fa-heart");
    }

    getDiffPostDate(currentDay, currentMonth, postedDay, postedMonth){
        if(currentMonth === postedMonth){
            let dayDifference = currentDay - postedDay;
            return `${dayDifference}d ago`
        } else {
          let daysAfterMonthChange =  currentDay - 0;
          let daysBeforeMonthChange = 30 - postedDay;
          if(daysBeforeMonthChange == '-1'){
              daysBeforeMonthChange = 1;
          }
          // return `${daysAfterMonthChange+daysBeforeMonthChange}d ago`
        }
    }

    render(){
        console.log(this.props.information);
        const {title, dist_to_campus, date_posted, address, price} = this.props.information;
        const {full_name,rating,favorite} = this.props.information.user;
        var todayDate = new Date();
        var separatedDate = date_posted.split("-");
        var day = todayDate.getDate();
        var month = todayDate.getMonth() + 1;
        var listing_day = parseInt(separatedDate[2]);
        var listing_month = parseInt(separatedDate[1]);
        var linkQuery = "/home/profile/" + this.props.information.user.user_id;

        return (
                <div>
                    <div className="col-sm-4 singleListing">
                        <div className="imageBox">
                            <img className="leaseImage" data-toggle="modal" data-target="#myModal" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7A4jeJ_RBCBZL7kHIc9CSDn3XdSfWgHBOJ1L2ieqBvx9eLcubrQ"/>
                            {/*<i className="fa fa-star-o favorite"></i>*/}
                            {/*{this.state.favorite &&  <i className="fa fa-heart favorite_fill"> </i>}*/}
                            <i id="fav" className={this.state.favorite ? "fa fa-heart favorite_fill" : "fa fa-heart-o favorite"} onClick={this.toggleHeart.bind(this)}> </i>

                            <div className = "infoBox">
                                <div className="leaseName" data-toggle="modal" data-target="#myModal" >
                                    {title}
                                    {/*data-toggle="modal" data-target="#myModal"*/}
                                </div>
                                
                                <Link to = {linkQuery}>
                                    <img className="userPicture" onClick={(event) => this.goToProfile(event)}
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7A4jeJ_RBCBZL7kHIc9CSDn3XdSfWgHBOJ1L2ieqBvx9eLcubrQ"/>
                                </Link>

                                <Link to = {linkQuery} information={this.props.information}>
                                    <div className="userName" onClick={(event) => this.goToProfile(event)}>{full_name}</div>
                                </Link>

                                {/*<div className="distance"> {dist_to_campus} mi</div>*/}
                                {/*</Link>*/}
                                <div className="address"> {address}</div>
                                <div className="price"> ${price}/month</div>

                                {/*<div className="dateDiff">{this.getDiffPostDate(day, month, listing_day, listing_month)}</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className="modal" id="myModal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <button type="button" className="close"
                                    data-dismiss="modal">&times;</button>
                                <div className="modal-header">
                                    <h4 className="modal-title">2Bed 2Bath! Come live here!</h4>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-4 col-md-4 col-lg-4 pricePerMonth">
                                                <i className="fa fa-money" aria-hidden="true"></i>
                                                $564/month
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
                                                <div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="false">
                                                        <ol className="carousel-indicators">
                                                            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
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
                                                9705 San Huerta Circle Buena Park CA, 90620
                                            </div>
                                            <div className="distanceInModal col-sm-4 col-md-4">
                                                <i class="fa fa-map-marker" aria-hidden="true"></i>
                                                {dist_to_campus} miles from campus
                                            </div>
                                        </div>

                                        {/* Description of leasing */}
                                        <div className="row">
                                            <div className="description col-sm-8 col-md-8">
                                                We are located in the Little Italy neighborhood of Downtown San Diego. A neighborhood that is constantly evolving with
                                                it’s unique repertoire of restaurants, cafes, art galleries & shops always serving up something brilliant and unexpected.
                                                Our home is thoughtfully designed and tastefully decorated that results in a destination striking in both it’s modern 
                                                aesthetic and comfortable feel. It comes fully furnished with everything one would need for a weekend getaway or a business trip!
                                            </div>
                                        </div>

                                        {/* Facts */}
                                        <div className="featuresText">
                                                Features
                                        </div>
                                        <div className="row">
                                            <div className="feature col-sm-4 col-md-4">
                                                <i class="material-icons">
                                                pets
                                                </i>
                                                Pets
                                            </div>
                                            <div className="feature col-sm-4 col-md-4">
                                                <i class="material-icons">
                                                local_laundry_service
                                                </i>
                                                In Unit Laundry
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="feature col-sm-4 col-md-4">
                                                <i class="material-icons">
                                                fitness_center
                                                </i>
                                                Gym
                                            </div>
                                            <div className="feature col-sm-4 col-md-4">
                                                <i class="material-icons">
                                                pool
                                                </i>
                                                Pool
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="feature col-sm-4 col-md-4">
                                                <i class="material-icons">
                                                local_parking
                                                </i>
                                                Parking
                                            </div>
                                            <div className="feature col-sm-4 col-md-4">
                                                <i class="material-icons">
                                                kitchen
                                                </i>
                                                Furnished
                                            </div>
                                        </div>
                                        <div className="row">

                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger"
                                            data-dismiss="modal">Close
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
        );
    }

}

export default ListingPreview;