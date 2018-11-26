import React, {Component} from "react";
import "./Filters.css";
import {roomTypeList, distanceList} from './FilterItems';
import Checkbox from './Checkbox';

class Filters extends Component{
    constructor(props){
        super(props);
        this.state = {
            checkedItems: new Map(),
        }

        this.handleChange = this.handleChange.bind(this);
    }
    resetFilters(){
        console.log("reset");
    }
    listClicked(e) {

        console.log('You clicked the list header');
    }

    handleChange(e) {
        const item = e.target.name;
        const isChecked = e.target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
        console.log(item);
        console.log(isChecked);
    }

    submitFormData(e) {
        e.preventDefault();
        console.log('Submitted');

        console.log(checkedItems);

    }
    render(){
        return (
            <form className="filtersContainer" onSubmit={this.submitFormData}>
                <div className="titleFilters">
                    <h3>Refine</h3>
                    <button className="btn btn-link" onClick={this.resetFilters}>Clear All</button>
                </div>
                <div className="listOfFilters">
                    <li className="roomType" onClick={this.listClicked}><a href="#">Room Type</a></li>
                        {
                            roomTypeList.map(item => (
                                <label key={item.key} className="checkbox">
                                    <Checkbox name={item.name} checked={this.state.checkedItems.get(item.name)} onChange={this.handleChange} />
                                    {item.name}
                                </label>
                            ))
                        }
                    <li className="distance" onClick={this.listClicked} ><a href="#">Distance Within</a></li>
                        {
                            distanceList.map(item => (
                                <label key={item.key} className="checkbox">
                                    <Checkbox name={item.name} checked={this.state.checkedItems.get(item.name)} onChange={this.handleChange} />
                                    {item.name}
                                </label>
                            ))
                        }
                </div>
                <button>Submit</button>
            </form>
        )
    };
}


export default Filters;