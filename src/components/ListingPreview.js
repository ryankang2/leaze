import React, {Component} from "react";
import "./ListingPreview.css"
import Profile from "./Profile";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import {formatPostData} from "../helpers/formatPostData";
import ListingModal from "./ListingModal";
import { format } from "util";



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
        this.openDelete = this.openDelete.bind(this);
        this.openModal = this.openModal.bind(this);
        this.toggleHeart = this.toggleHeart.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);


    }


    async toggleHeart(event){
        console.log("hey des fav: ", this.state.favorite);
        event.stopPropagation();

            this.setState({favorite: !this.state.favorite});
            const userListingHeart = {
                user_id: sessionStorage.getItem("user_id"),
                listing_id: $(event.currentTarget).attr('value'),
                unfavorited: this.state.favorite,
            }
            const params = formatPostData(userListingHeart);
            const response = await axios.post("http://localhost:8000/api/queries/update_favorite_status.php", params);

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
        console.log(sessionStorage.getItem("user_id"));
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

    openModal(event){
        event.stopPropagation();
        $(`.leaseImage-${this.props.information.listing_id}`).css("display", "block");
    }

    openDelete(event){
        console.log("delete");
        event.stopPropagation();
        $(`.deleteModal-${this.props.information.listing_id}`).css("display", "block");
    }

    closeModal(){
        // $(`.leaseImage-${this.props.information.listing_id}`).css("display", "none");
        $(".modal-backdrop").remove();
        $(".show").remove();
        $(".in").remove();
    }

    async closeDeleteModal(event){
        $(`.deleteModal-${this.props.information.listing_id}`).css("display", "none");
        $(`.leaseImageG-${this.props.information.listing_id}`).css("opacity", "0.4");
        $(`.infoBox-${this.props.information.listing_id}`).css("opacity", "0.4");
        var listingObj= {
            listing_id: this.props.information.listing_id,
        }
        console.log("LISTINgID:!! ",listingObj.listing_id);
        var params = formatPostData(listingObj);

        const response = await axios.post("http://localhost:8000/api/queries/archive_listing.php", params);
        console.log("deleting response: ", response);


    }


    render(){
        console.log("LISTING INFORMATION PROPS: " , this.props.information);
        const {title, dist_to_campus, date_posted, address, price, listing_id} = this.props.information;
        console.log("LISTING_ID: ", listing_id);
        const {full_name,rating,favorites,user_id} = this.props.information.user;
        var todayDate = new Date();
        var separatedDate = date_posted.split("-");
        var day = todayDate.getDate();
        var month = todayDate.getMonth() + 1;
        var listing_day = parseInt(separatedDate[2]);
        var listing_month = parseInt(separatedDate[1]);
        if(favorites!=null) {
            this.state.favorite = favorites.includes(listing_id);
        }
        var linkQuery = "/home/profile/other/" + this.props.information.user.user_id;
        // console.log("Response: ", this.handleMatchPercentage(user_id) );

        var matchPercentage = this.handleMatchPercentage(user_id);

        return (
                <div>
                    <div onClick={this.openModal.bind(this)}>
                        <div className="imageBox">
                            <img className={`leaseImageG-${this.props.information.listing_id}`} data-toggle="modal" onClick={(event) => this.openModal(event)} src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7A4jeJ_RBCBZL7kHIc9CSDn3XdSfWgHBOJ1L2ieqBvx9eLcubrQ"/>
                            {/*<i className="fa fa-star-o favorite"></i>*/}
                            {/*{this.state.favorite &&  <i cslassName="fa fa-heart favorite_fill"> </i>}*/}
                            <i id="fav" className={ sessionStorage.getItem("user_id") != user_id ? (this.state.favorite ? "fa fa-heart favorite_fill" : "fa fa-heart-o favorite"):"none" }
                                onClick={this.toggleHeart.bind(this)} value={listing_id}> </i>
                            <i id="delete" className={sessionStorage.getItem("user_id") == user_id ? "fa fa-trash-o" : "none"}  onClick={(event)=>this.openDelete(event)}></i>

                            <div className = {`infoBox-${this.props.information.listing_id}`}>
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
                    <div className={`modal trashModal deleteModal-${this.props.information.listing_id}`} >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.closeDeleteModal.bind(this)}>&times;</button>
                                    <h4 className="modal-title">Delete Listing</h4>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to delete this listing?</p>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn yesDelete"
                                            data-dismiss="modal" onClick={this.closeDeleteModal.bind(this)}>Yes
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