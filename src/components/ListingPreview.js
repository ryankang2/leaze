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

    render(){
        return (
            <div class="list">
                <div className="row">

                    <div className="col-sm-4 singleListing">
                        <div className = "imageBox">
                            <img className="leaseImage" onClick={ this.enlargePicture} src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7A4jeJ_RBCBZL7kHIc9CSDn3XdSfWgHBOJ1L2ieqBvx9eLcubrQ"/>
                            <i className="fa fa-star-o favorite"></i>
                            <div className= "leaseName">HAHAH HI TITLE</div>
                        </div>
                        <div className = "infoBox">
                            <img className="userPicture" onClick={(event) => this.goToProfile(event)}
                                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7A4jeJ_RBCBZL7kHIc9CSDn3XdSfWgHBOJ1L2ieqBvx9eLcubrQ"/>
                            <div className="userName" onClick={(event) => this.goToProfile(event)}> ARIBERRy:P</div>
                            <div className="distance"> 0.69MI</div>
                            <div className="userRating">
                               <i className="fa fa-star"></i>
                               <i className="fa fa-star"></i>
                               <i className="fa fa-star"></i>
                               <i className="fa fa-star-o"></i>
                               <i className="fa fa-star-o"></i>
                            </div>
                            <div className="dateDiff"> 1 Day Ag0</div>
                        </div>
                    </div>
                    <div className="col-sm-4 singleListing">
                        <div className = "imageBox">
                            <img className="leaseImage" src = "https://www.rd.com/wp-content/uploads/2018/02/30_Adorable-Puppy-Pictures-that-Will-Make-You-Melt_124167640_YamabikaY-760x506.jpg"/>
                            <i className="fa fa-star-o favorite"></i>
                            <div className= "leaseName">HAHAH HI TITLE</div>

                        </div>
                        <div className = "infoBox">
                            <img className="userPicture"
                                 src="https://www.rd.com/wp-content/uploads/2018/02/30_Adorable-Puppy-Pictures-that-Will-Make-You-Melt_124167640_YamabikaY-760x506.jpg"/>
                            <div className="userName"> ARIBERRy:P</div>
                            <div className="distance"> 0.69MI</div>
                            <div className="userRating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star-o"></i>
                                <i className="fa fa-star-o"></i>

                            </div>
                            <div className="dateDiff"> 1 Day Ag0</div>

                        </div>

                    </div>

                    <div className="col-sm-4 singleListing">
                        <div className = "imageBox">
                            <img className="leaseImage" src = "http://images6.fanpop.com/image/photos/41500000/adorable-puppies-cute-puppies-41538743-590-393.jpg"/>
                            <i className="fa fa-star-o favorite"></i>
                            <div className= "leaseName">HAHAH HI TITLE</div>
                        </div>
                        <div className = "infoBox">
                            <img className="userPicture"
                                 src="http://images6.fanpop.com/image/photos/41500000/adorable-puppies-cute-puppies-41538743-590-393.jpg"/>
                            <div className="userName"> ARIBERRy:P</div>
                            <div className="distance"> 0.69MI</div>
                            <div className="userRating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star-o"></i>
                                <i className="fa fa-star-o"></i>
                            </div>
                            <div className="dateDiff"> 1 Day Ag0</div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 singleListing">
                        <div className = "imageBox">
                            <img className="leaseImage" src = "https://2static.fjcdn.com/large/pictures/c3/1e/c31e9d_5929666.jpg"/>
                            <i className="fa fa-star-o favorite"></i>
                            <div className= "leaseName">HAHAH HI TITLE</div>
                        </div>
                        <div className = "infoBox">
                            <img className="userPicture"
                                 src="https://2static.fjcdn.com/large/pictures/c3/1e/c31e9d_5929666.jpg"/>
                            <div className="userName"> ARIBERRy:P</div>
                            <div className="distance"> 0.69MI</div>
                            <div className="userRating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star-o"></i>
                                <i className="fa fa-star-o"></i>

                            </div>
                            <div className="dateDiff"> 1 Day Ag0</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default ListingPreview;