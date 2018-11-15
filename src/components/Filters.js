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
                            <li><input type="checkbox" />Single Room</li>
                            <li><input type="checkbox" />Double Room</li>
                            <li><input type="checkbox" />Triple Room</li>
                            <li><input type="checkbox" />Living Room</li>
                        </ul>
                    </li>
                    <li className="distance"><a>Distance Within</a>
                        <ul className="dropdownContainer">
                            <li><input type="checkbox" />2 mi</li>
                            <li><input type="checkbox" />5 mi</li>
                            <li><input type="checkbox" />10 mi</li>
                            <li><input type="checkbox" />20+ mi</li>
                        </ul>
                    </li>

                </div>
            </div>
        )
    };
}


export default Filters;