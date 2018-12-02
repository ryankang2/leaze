import React, {Component} from "react";
import "./ListingPreview.css"
import Profile from "./Profile";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import {formatPostData} from "../helpers/formatPostData";
import ListingModal from "./ListingModal";



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


    toggleHeart(){
        this.setState({favorite: !this.state.favorite})
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

    async handleMatchPercentage(user_id) {
        const userIDs = {
            mainUser: sessionStorage.getItem("user_id"),
            other: user_id,
        }
        const params = formatPostData(userIDs);
        const response = await axios.post("http://localhost:8000/api/matching_algorithm.php", params);
        var str = "Match: " + response.data.result + "%";
        $(`.match-${this.props.information.listing_id}`).text(str);
        $(`.match-${this.props.information.listing_id}`).css({
            "grid-column-start":"2",
            "grid-column-end":"5",
            "grid-row-start":"5",
            "font-size": "12px",
            "text-align": "left",
            "margin-top": "-10%",
         });

        if(response.data.result >= 70) {
            $(`.match-${this.props.information.listing_id}`).css({
                "color": "green"
            });
        }

    }

    openModal(){
        $(`.leaseImage-${this.props.information.listing_id}`).css("display", "block");
    }

    closeModal(){
        // $(`.leaseImage-${this.props.information.listing_id}`).css("display", "none");
        $(".modal-backdrop").remove();
        $(".show").remove();
        $(".in").remove();
    }



    render(){
        // console.log(this.props.information);
        const {title, dist_to_campus, date_posted, address, price, listing_id} = this.props.information;
        const {full_name,rating,favorite,user_id} = this.props.information.user;
        var todayDate = new Date();
        var separatedDate = date_posted.split("-");
        var day = todayDate.getDate();
        var month = todayDate.getMonth() + 1;
        var listing_day = parseInt(separatedDate[2]);
        var listing_month = parseInt(separatedDate[1]);
        var linkQuery = "/home/profile/" + this.props.information.user.user_id;
        // console.log("Response: ", this.handleMatchPercentage(user_id) );
        var matchPercentage = this.handleMatchPercentage(user_id);
        //changed data-target="#myModal"    {`modal-${this.props.pullId}`}

        return (
                <div>
                    <div className="col-sm-4 singleListing" onClick={this.openModal.bind(this)}>
                        <div className="imageBox">
                            <img className="leaseImage" data-toggle="modal" onClick={this.openModal.bind(this)} src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7A4jeJ_RBCBZL7kHIc9CSDn3XdSfWgHBOJ1L2ieqBvx9eLcubrQ"/>
                            {/*<i className="fa fa-star-o favorite"></i>*/}
                            {/*{this.state.favorite &&  <i className="fa fa-heart favorite_fill"> </i>}*/}
                            <i id="fav" className={this.state.favorite ? "fa fa-heart favorite_fill" : "fa fa-heart-o favorite"} onClick={this.toggleHeart.bind(this)}> </i>

                            <div className = "infoBox">
                                <div className="leaseName" data-toggle="modal" onClick={this.openModal.bind(this)} >
                                    {title}
                                </div>
                                
                                <Link to = {linkQuery}>
                                    <img className="userPicture"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7A4jeJ_RBCBZL7kHIc9CSDn3XdSfWgHBOJ1L2ieqBvx9eLcubrQ"
                                    onClick={this.closeModal.bind(this)}/>
                                </Link>

                                <Link to = {linkQuery} information={this.props.information}>
                                    <div className="userName" onClick={this.closeModal.bind(this)}>{full_name}</div>
                                </Link>

                                <div className={`match-${this.props.information.listing_id}`}></div>

                                {/*</Link>*/}
                                <div className="address"> {address}</div>
                                <div className="price"> ${price}/month</div>

                                {/*<div className="dateDiff">{this.getDiffPostDate(day, month, listing_day, listing_month)}</div>*/}
                            </div>
                        </div>
                    </div> 
                    <ListingModal className={`leaseImage-${this.props.information.listing_id}`} information={this.props.information}>
                    </ListingModal>

                </div>
        );
    }

}

export default ListingPreview;