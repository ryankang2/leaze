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