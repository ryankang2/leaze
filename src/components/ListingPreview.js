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
        console.log("PICTURE CLICKED");

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
            // <div className="list">
            //     <div className="row">
                    <div className="col-sm-4 singleListing">
                        <div className="imageBox">
                            <img className="leaseImage" onClick={ this.leasePopup} src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7A4jeJ_RBCBZL7kHIc9CSDn3XdSfWgHBOJ1L2ieqBvx9eLcubrQ"/>
                            {/*<i className="fa fa-star-o favorite"></i>*/}
                            <i className="fa fa-heart-o favorite" onClick={(event) => this.toggleHeart(event)}> </i>

                            <div className = "infoBox">
                                <div className="leaseName"  onClick={ this.leasePopup}>
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

                                {/*<div className="userRating">*/}
                                {/*<i className="fa fa-star"></i>*/}
                                {/*<i className="fa fa-star"></i>*/}
                                {/*<i className="fa fa-star"></i>*/}
                                {/*<i className="fa fa-star-o"></i>*/}
                                {/*<i className="fa fa-star-o"></i>*/}
                                {/*</div>*/}
                                {/*<div className="dateDiff">{this.getDiffPostDate(day, month, listing_day, listing_month)}</div>*/}
                            </div>
                        </div>
                    </div>
            //     </div>
            // </div>
            // <div class="list">
            //     <div className="row">

            //         <div className="col-sm-4 singleListing">
            //             <div className = "imageBox">
            //                 <img className="leaseImage" onClick={ this.enlargePicture} src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7A4jeJ_RBCBZL7kHIc9CSDn3XdSfWgHBOJ1L2ieqBvx9eLcubrQ"/>
            //                 <i className="fa fa-star-o favorite"></i>
            //                 <div className= "leaseName">HAHAH HI TITLE</div>
            //             </div>
            //             <div className = "infoBox">
            //                 <img className="userPicture" onClick={(event) => this.goToProfile(event)}
            //                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7A4jeJ_RBCBZL7kHIc9CSDn3XdSfWgHBOJ1L2ieqBvx9eLcubrQ"/>
            //                 <div className="userName" onClick={(event) => this.goToProfile(event)}> ARIBERRy:P</div>
            //                 <div className="distance"> 0.69MI</div>
            //                 <div className="userRating">
            //                    <i className="fa fa-star"></i>
            //                    <i className="fa fa-star"></i>
            //                    <i className="fa fa-star"></i>
            //                    <i className="fa fa-star-o"></i>
            //                    <i className="fa fa-star-o"></i>
            //                 </div>
            //                 <div className="dateDiff"> 1 Day Ag0</div>
            //             </div>
            //         </div>
            //         <div className="col-sm-4 singleListing">
            //             <div className = "imageBox">
            //                 <img className="leaseImage" src = "https://www.rd.com/wp-content/uploads/2018/02/30_Adorable-Puppy-Pictures-that-Will-Make-You-Melt_124167640_YamabikaY-760x506.jpg"/>
            //                 <i className="fa fa-star-o favorite"></i>
            //                 <div className= "leaseName">HAHAH HI TITLE</div>

            //             </div>
            //             <div className = "infoBox">
            //                 <img className="userPicture"
            //                      src="https://www.rd.com/wp-content/uploads/2018/02/30_Adorable-Puppy-Pictures-that-Will-Make-You-Melt_124167640_YamabikaY-760x506.jpg"/>
            //                 <div className="userName"> ARIBERRy:P</div>
            //                 <div className="distance"> 0.69MI</div>
            //                 <div className="userRating">
            //                     <i className="fa fa-star"></i>
            //                     <i className="fa fa-star"></i>
            //                     <i className="fa fa-star"></i>
            //                     <i className="fa fa-star-o"></i>
            //                     <i className="fa fa-star-o"></i>

            //                 </div>
            //                 <div className="dateDiff"> 1 Day Ag0</div>

            //             </div>

            //         </div>

            //         <div className="col-sm-4 singleListing">
            //             <div className = "imageBox">
            //                 <img className="leaseImage" src = "http://images6.fanpop.com/image/photos/41500000/adorable-puppies-cute-puppies-41538743-590-393.jpg"/>
            //                 <i className="fa fa-star-o favorite"></i>
            //                 <div className= "leaseName">HAHAH HI TITLE</div>
            //             </div>
            //             <div className = "infoBox">
            //                 <img className="userPicture"
            //                      src="http://images6.fanpop.com/image/photos/41500000/adorable-puppies-cute-puppies-41538743-590-393.jpg"/>
            //                 <div className="userName"> ARIBERRy:P</div>
            //                 <div className="distance"> 0.69MI</div>
            //                 <div className="userRating">
            //                     <i className="fa fa-star"></i>
            //                     <i className="fa fa-star"></i>
            //                     <i className="fa fa-star"></i>
            //                     <i className="fa fa-star-o"></i>
            //                     <i className="fa fa-star-o"></i>
            //                 </div>
            //                 <div className="dateDiff"> 1 Day Ag0</div>
            //             </div>
            //         </div>
            //     </div>
            //     <div className="row">
            //         <div className="col-sm-4 singleListing">
            //             <div className = "imageBox">
            //                 <img className="leaseImage" src = "https://2static.fjcdn.com/large/pictures/c3/1e/c31e9d_5929666.jpg"/>
            //                 <i className="fa fa-star-o favorite"></i>
            //                 <div className= "leaseName">HAHAH HI TITLE</div>
            //             </div>
            //             <div className = "infoBox">
            //                 <img className="userPicture"
            //                      src="https://2static.fjcdn.com/large/pictures/c3/1e/c31e9d_5929666.jpg"/>
            //                 <div className="userName"> ARIBERRy:P</div>
            //                 <div className="distance"> 0.69MI</div>
            //                 <div className="userRating">
            //                     <i className="fa fa-star"></i>
            //                     <i className="fa fa-star"></i>
            //                     <i className="fa fa-star"></i>
            //                     <i className="fa fa-star-o"></i>
            //                     <i className="fa fa-star-o"></i>

            //                 </div>
            //                 <div className="dateDiff"> 1 Day Ag0</div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
        );
    }

}

export default ListingPreview;