import React, {Component} from "react";
import ListingPreview from "./ListingPreview";
import Filters from "./Filters";
import "./ResultsContent.css";
import SingleListing from "./ListingPreview";

class ResultsContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            listings: [],
        };
    }

    getFilterResponseData(responseObject, searchParams){
        console.log("responseObject: ", responseObject);
        var array = [];
        for(var i = 0; i < responseObject.data.listings.length; i++){
            var singleListing = <SingleListing information = {responseObject.data.listings[i]}{...this.props}/>
            array.push(singleListing);
        }
        this.setState({
            listings: array,
        })
    }

    render(){
        return (
            <div className="resultsContainer container">
                <h2> Explore Housing</h2>
                <div className="row">
                    <div className="col-sm-3 col-md-3">
                        <Filters getFilterData={this.getFilterResponseData.bind(this)}/>
                    </div>
                    <div className="col-sm-9 col-md-9 listingPreviewContainer">
                        {/* <ListingPreview />       */}
                        <div className="list">
                            <div className="row">
                                {this.state.listings}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default ResultsContent;