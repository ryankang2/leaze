import React, {Component} from "react";
import ListingPreview from "./ListingPreview";
import Filters from "./Filters";
import "./ResultsContent.css";

class ResultsContent extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return (
            <div className="container">
                <h2> Explore Housing</h2>
                <div className="row">
                    <div className="col-sm-2">
                        <Filters />
                    </div>
                    <div className="col-sm-10 listingPreviewContainer">
                        <ListingPreview />      
                    </div>
                </div>
            </div>

        )
    }
}

export default ResultsContent;