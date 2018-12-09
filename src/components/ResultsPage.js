import React, {Component} from "react";
import Navbar from "./Navbar";
import Filters from "./Filters";
import SingleListing from "./ListingPreview";
import ResultsContent from "./ResultsContent";
import MakePost from "./MakePost"

class ResultsPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            listings: [],
        }
    }

    searchResults(responseObject){
         // console.log("responseObject: ", responseObject);
         var array = [];
         for(var i = 0; i < responseObject.data.listings.length; i++){
             var singleListing = <SingleListing information = {responseObject.data.listings[i]}{...this.props} key={responseObject.data.listings[i].user_id_posted}/>
             array.push(singleListing);
         }
         this.setState({
             listings: array,
         })
    }

    render(){
        return (
            <div>
                <Navbar getSearch={this.searchResults.bind(this)}/>
                <ResultsContent searchResults={this.state.listings}/>
                <MakePost />
            </div>

        )
    }
}

export default ResultsPage;