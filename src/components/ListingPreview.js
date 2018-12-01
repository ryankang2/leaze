import React, {Component} from "react";
import "./ListingPreview.css"

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

    enlargePicture(){
        console.log("PICTURE CLICKED");
    }

    goToProfile(event){
        console.log(event.target.innerText);
        var userName = event.target.innerText;

        console.log("GO TO PROFILE");
    }

    getDiffPostDate(currentDay, currentMonth, postedDay, postedMonth){
        if(currentMonth === postedMonth){
            let dayDifference = currentDay - postedDay;
            return `${dayDifference} Days Ago` 
        } else {
          let daysAfterMonthChange =  currentDay - 0;
          let daysBeforeMonthChange = 30 - postedDay;
          if(daysBeforeMonthChange == '-1'){
              daysBeforeMonthChange = 1;
          }
          return `${daysAfterMonthChange+daysBeforeMonthChange} Days Ago`
        }
    }

    render(){
        console.log(this.props.information);
        const {title, dist_to_campus, date_posted} = this.props.information;
        const {full_name} = this.props.information.user;
        var todayDate = new Date();
        var separatedDate = date_posted.split("-");
        var day = todayDate.getDate();
        var month = todayDate.getMonth() + 1;
        var listing_day = parseInt(separatedDate[2]);
        var listing_month = parseInt(separatedDate[1]);

        return (
            // <div className="list">
            //     <div className="row">
                    <div className="col-sm-4 singleListing">
                        <div className="imageBox">
                            <img className="leaseImage" onClick={ this.enlargePicture} src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7A4jeJ_RBCBZL7kHIc9CSDn3XdSfWgHBOJ1L2ieqBvx9eLcubrQ"/>
                            <i className="fa fa-star-o favorite"></i>
                            <div className="leaseName">
                                {title}
                            </div>
                            <div className = "infoBox">
                                <img className="userPicture" onClick={(event) => this.goToProfile(event)}
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7A4jeJ_RBCBZL7kHIc9CSDn3XdSfWgHBOJ1L2ieqBvx9eLcubrQ"/>
                                <div className="userName" onClick={(event) => this.goToProfile(event)}>{full_name}</div>
                                <div className="distance"> {dist_to_campus} mi</div>
                                <div className="userRating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star-o"></i>
                                <i className="fa fa-star-o"></i>
                                </div>
                                <div className="dateDiff">{this.getDiffPostDate(day, month, listing_day, listing_month)}</div>
                            </div>
                        </div>
                    </div>
        );
    }

}

export default ListingPreview;