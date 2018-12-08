import React, {Component} from "react";
import Navbar from "./Navbar";
import Filters from "./Filters";
import ListingPreview from "./ListingPreview";
import ResultsContent from "./ResultsContent";
import MakePost from "./MakePost"

class ResultsPage extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div>
                <Navbar />
                <ResultsContent />
                {/* <MakePost /> */}
            </div>

        )
    }
}

export default ResultsPage;