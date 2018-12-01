import React, {Component} from "react";
import "./Filters.css";
import {Row, Input} from "react-materialize";
import {formatPostData} from "../helpers/formatPostData";
import axios from "axios";

class Filters extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_id: 3,
            price_low: "0",
            price_high: "1000",
            dist_to_campus: "45",
            roomSingle: false,
            roomDouble: false,
            roomTriple: false,
            roomLiving: false,
            roomApart: false,
            roomHouse: false,
            pet: false,
            laundry: false,
            parking: false,
            furnished: false,
            gym: false,
            pool: false,
        }
        this.handleChangeFilter = this.handleChangeFilter.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.handleChangeForm = this.handleChangeForm.bind(this);
        this.saveFilterData = this.saveFilterData.bind(this);
    }
    resetFilters(){
        console.log("reset");
    }

    handleChangeFilter(event) {
        console.log(event.currentTarget);
        const {name, value} = event.currentTarget;
       this.setState({
           [name]:value
       })
    }

    handleCheckBox(event) {
        const {name, checked} = event.currentTarget;
        if(checked !== false){
           this.setState({
               [name]:true
        })
        }else{
           this.setState({
               [name]:false
           })
        }
    }

    async handleChangeForm(event) {
        // const type = event.currentTarget.type;
        // if( type == "select" ) {
        //     this.handleChangeFilter;
        // }
        // if( type == "checkbox" ) {
        //     this.handleCheckBox;
        // }

        const params = formatPostData(this.state);
        const response = await axios.post("http://localhost:8000/api/queries/get_listings.php", params);
        this.props.getFilterData(response, params);
    }

    async saveFilterData(event) {
        event.preventDefault();

        const params = formatPostData(this.state);
        const response = await axios.post("http://localhost:8000/api/queries/set_filters.php", params);
    }

    render(){
        return (
            <form className="filtersContainer" onChange={this.handleChangeForm} onSubmit={this.saveFilterData}>
                <div className="titleFilters">
                    <h3>Refine</h3>
                    <button type="button" className="btn btn-link" onClick={this.resetFilters}>Clear All</button>
                </div>
                <Row>
                    <Input s={6} className="browser-default" type="select" label="Min Price Per Month" name="price_low" defaultValue={this.state.price_low} onChange={this.handleChangeFilter}>
                       <option value = "0"> $0</option>
                       <option value = "400"> $400</option>
                       <option value = "600"> $600</option>
                       <option value = "800"> $800</option>
                   </Input>
                   <Input s={6} className="browser-default" type ="select" label = "Max Price Per Month" name="price_high"  defaultValue = {this.state.price_high} onChange={this.handleChangeFilter} >
                       <option value = "400"> $400</option>
                       <option value = "600"> $600</option>
                       <option value = "800"> $800</option>
                       <option value = "1000"> $1K+</option>
                   </Input>
                </Row>
                <Row>
                    <Input s={12} className="browser-default" type ="select" label = "Distance To UCSD in Miles" name="dist_to_campus" defaultValue ={this.state.dist_to_campus} onChange={this.handleChangeFilter}>
                       <option value = "15">15 miles</option>
                       <option value = "30">30 miles</option>
                       <option value = "45">45 miles</option>
                   </Input>
               </Row>
               <Row className="roomType">
                       <Input name="roomSingle" type="checkbox" checked={this.state.roomSingle} value="roomSingle" label="Single Room"  onChange={this.handleCheckBox} />
                       <Input name="roomDouble" type="checkbox" checked={this.state.roomDouble} value = "roomDouble" label="Double Room"  onChange={this.handleCheckBox} />
                       <Input name="roomTriple" type="checkbox" checked={this.state.roomTriple} value = "roomTriple" label="Triple Room"  onChange={this.handleCheckBox}/>
                       <Input name="roomLiving" type="checkbox" checked={this.state.roomLiving} value = "roomLiving" label="Living Room"  onChange={this.handleCheckBox}/>
                </Row>
                <Row className="homeType">
                       <Input name="roomApart" type="checkbox" checked={this.state.roomApart} value = "roomApart" label="Apartment"  onChange={this.handleCheckBox} />
                       <Input name="roomHouse" type="checkbox" checked={this.state.roomHouse} value = "roomHouse" label="House"  onChange={this.handleCheckBox}/>
                </Row>
                <Row className="homeMisc">
                    <Input name="pet" type="checkbox" checked={this.state.pet} value = "pet" label="Pet Friendly"  onChange={this.handleCheckBox}/>
                    <Input name="laundry" type="checkbox" checked={this.state.laundry} value="laundry" label="In-unit Laundry"  onChange={this.handleCheckBox} />
                    <Input name="parking" type="checkbox" checked={this.state.parking} value = "parking" label="Has Parking"  onChange={this.handleCheckBox}/>
                    <Input name="furnished" type="checkbox" checked={this.state.furnished} value="furnished" label="Furnished Room"  onChange={this.handleCheckBox} />
                    <Input name="gym" type="checkbox" checked={this.state.gym} value = "gym" label="Has Gym"  onChange={this.handleCheckBox} />
                    <Input name="pool" type="checkbox" checked={this.state.pool} value="pool" label="Has Pool"  onChange={this.handleCheckBox} />
                </Row>
                <button className="btn btn-primary">Save Filters</button>
            </form>
        )
    }
}


export default Filters;