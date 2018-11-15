import React, {Component} from "react";
import "./Filters.css"

class Filters extends Component{
    constructor(props){
        super(props);
        this.state = {
            singleRoom: true,
            doubleRoom: true,
            tripleRoom: true,
            livingRoom: true,
        }
    }

    resetFilters(){
        console.log("reset");
    }

    render(){
        return (
            <div className="filtersContainer">
                <div className="titleFilters">
                    <h3>Refine</h3>
                    <button className="btn btn-link" onClick={this.resetFilters}>Clear All</button>
                </div>
                <div className="listOfFilters">
                    <li className="roomType"><a href="#">Room Type</a>
                        <ul className="dropdownContainer">
                            <li>Single Room</li>
                            <li>Double Room</li>
                            <li>Triple Room</li>
                            <li>Living Room</li>
                        </ul>
                    </li>
                    <li className="distance"><a>Distance Within</a>
                        <ul className="dropdownContainer">
                            <li>2 mi</li>
                            <li>5 mi</li>
                            <li>10 mi</li>
                            <li>20+ mi</li>
                        </ul>
                    </li>

                </div>
            </div>
        )
    }
}


export default Filters;