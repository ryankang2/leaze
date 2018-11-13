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

    render(){
        return (
            <div class="list">
                <div className="row">
                    <div className="col-sm-4 singleListing">Hi
                        <div>
                            <img src="https://carwad.net/sites/default/files/styles/225x120/public/cat-images-free-122692-172264.jpg?itok=lq443nq_" alt=""/>

                        </div>
                    </div>
                    <div className="col-sm-4 singleListing">Hello</div>   
                    <div className="col-sm-4 singleListing">frick yeah</div>                
                </div>
                <div className="row">
                    <div className="col-sm-4 singleListing">Hi</div>             
                </div>
            </div>
        );
    }

}

export default ListingPreview;