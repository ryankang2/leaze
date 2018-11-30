import React, {Component} from "react";
import "./ListingPreview.css"
import Profile from "./profile";
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
            favorited: false,
        }
    }

    leasePopup(){
        console.log("PICTURE/CLICKED");


    }

    goToProfile(event){
        console.log(event.target.innerText);
        var userName = event.target.innerText;

        console.log("GO TO PROFILE");
    }

    toggleHeart(x) {
        x.classList.toggle("fa fa-heart");
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
        const {full_name,rating} = this.props.information.user;
        var todayDate = new Date();
        var separatedDate = date_posted.split("-");
        var day = todayDate.getDate();
        var month = todayDate.getMonth() + 1;
        var listing_day = parseInt(separatedDate[2]);
        var listing_month = parseInt(separatedDate[1]);
        var linkQuery = "/profile/" + this.props.information.user.user_id;

        return (
                <div>
                    <div className="col-sm-4 singleListing">
                        <div className="imageBox">
                            <img className="leaseImage" onClick={ this.leasePopup} src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7A4jeJ_RBCBZL7kHIc9CSDn3XdSfWgHBOJ1L2ieqBvx9eLcubrQ"/>
                            {/*<i className="fa fa-star-o favorite"></i>*/}
                            <i className="fa fa-heart-o favorite" onClick={(event) => this.toggleHeart(event)}> </i>

                            <div className = "infoBox">
                                <div className="leaseName"  data-toggle="modal" onClick={ this.leasePopup} data-target="#popupModal">
                                    {title}
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
                    <div id="popupModal" className="modal">
                        <div className="modal-dialog">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h4 className="modal-title">Modal Heading</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>

                                <div className="modal-body">
                                    Modal body..
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close
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