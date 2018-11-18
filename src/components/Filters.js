import React, {Component} from "react";
import "./Filters.css";
import {roomTypeList, distanceList} from './FilterItems';
import Checkbox from './Checkbox';

class Filters extends Component{
    constructor(props){
        super(props);
        this.state = {
            singleRoom: false,
            doubleRoom: false,
            tripleRoom: false,
            livingRoom: false,
            mi2: false,
            mi5: false,
            mi10: false,
            mi20plus: false,
        }

    }
    resetFilters(){
        console.log("reset");
    }
    listClicked(e) {
        e.preventDefault();

        console.log('You clicked the list header');
    }

    handleClick(e) {
        this.setState(state => ({

        }))
        console.log('Clicked checkbox');
    }
    render(){
        return (
            <div className="filtersContainer">
                <div className="titleFilters">
                    <h3>Refine</h3>
                    <button className="btn btn-link" onClick={this.resetFilters}>Clear All</button>
                </div>
                <div className="listOfFilters">
                    <li className="roomType" onClick={this.listClicked}><a href="#">Room Type</a>
                        <ul className="dropdownContainer">
                            <li><input 
                                    type="checkbox" 
                                    checked={this.state.singleRoom}
                                    onClick={this.handleClick} 
                                />Single Room</li>
                            <li><input type="checkbox" checked={this.state.doubleRoom} />Double Room</li>
                            <li><input type="checkbox" checked={this.state.tripleRoom} />Triple Room</li>
                            <li><input type="checkbox" checked={this.state.livingRoom} />Living Room</li>
                        </ul>
                    </li>
                    <li className="distance" onClick={this.listClicked} ><a href="#">Distance Within</a>
                        <ul className="dropdownContainer">
                            <li><input type="checkbox" onClick={this.handleChecked} />2 mi</li>
                            <li><input type="checkbox" onClick={this.handleChecked} />5 mi</li>
                            <li><input type="checkbox" onClick={this.handleChecked} />10 mi</li>
                            <li><input type="checkbox" onClick={this.handleChecked} />20+ mi</li>
                        </ul>
                    </li>

                </div>
            </div>
        )
    };
}


export default Filters;