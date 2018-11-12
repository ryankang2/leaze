import React, {Component} from "react";
import Navbar from "./Navbar";
import Filters from "./Filters";

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
                <Filters />
            </div>

        )
    }
}

export default ResultsPage;