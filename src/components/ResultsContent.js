import React, {Component} from "react";
// import ListingPreview from "./ListingPreview";
import Filters from "./Filters";
import "./ResultsContent.css";
import SingleListing from "./ListingPreview";
import {formatPostData} from "../helpers/formatPostData";
import axios from "axios";

class ResultsContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            listings: [],
            update: 0
        };
    }

    async componentDidMount(){
        const userID = { 
            user_id: sessionStorage.getItem("user_id"),
        }        
        const params = formatPostData(userID);
        const response = await axios.post("http://localhost:8000/api/queries/get_default_listings.php", params);
        if(!response.data.noListings){
            this.getFilterResponseData(response);
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            listings: [],
        })
        console.log("PROPS: ", this.props.searchResults);
        console.log("NEXTPROPS: ", nextProps);
        this.setState({
            listings: nextProps.searchResults
        })
    }


    getFilterResponseData(responseObject){
        // console.log("responseObject: ", responseObject);
        var array = [];
        for(var i = 0; i < responseObject.data.listings.length; i++){
            var singleListing = <SingleListing information = {responseObject.data.listings[i]}{...this.props} key={responseObject.data.listings[i]}/>
            array.push(singleListing);
        }
        this.setState({
            listings: array,
        })
    }

    render(){
        var groupSize = 4;
        var rows = this.state.listings.map(function(listings) {
            // map content to html elements
            return <div className="col-sm-3">{listings}</div>
        }).reduce(function(r, element, index) {
            // create element groups with size 3
            index % groupSize === 0 && r.push([]);
            r[r.length - 1].push(element);
            return r;
        }, []).map(function(rowContent) {
            // surround the group with 'row'
            return <div className="row">{rowContent}</div>;
        });

        return (
            <div className="resultsContainer container">
                <h2> Explore Housing</h2>
                <div className="row">
                    <div className="col-sm-3 col-md-3">
                        <Filters getFilterData={this.getFilterResponseData.bind(this)}/>
                    </div>
                    <div className="col-sm-9 col-md-9 listingPreviewContainer">
                        <div className="list">
                            <div className="row">
                                {rows}
                                {/* {this.state.listings} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default ResultsContent;