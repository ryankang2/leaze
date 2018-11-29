import React, {Component} from "react";
import "./Filters.css";
import {Row, Input} from "react-materialize";
import {formatPostData} from "../helpers/formatPostData";
import axios from "axios";

class Filters extends Component{
    constructor(props){
        super(props);
        this.state = {
            minPrice: "0",
            maxPrice: "1000",
            distance: "0",
            roomSingle: false,
            roomDouble: false,
            roomTriple: false,
            roomLiving: false,
            roomApart: false,
            roomHouse: false,
            roomPets: false,
            hasInUnitLaundry: false,
            numParkingSpots: "0",
            isFurnished: false,
            hasGym: false,
            hasPool: false,
        }

        this.submitFormData = this.submitFormData.bind(this);
    }
    resetFilters(){
        console.log("reset");
    }

    handleChange(event) {
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

    async submitFormData(event){
        event.preventDefault();
        const params = formatPostData(this.state);
        const response = await axios.post("http://localhost:8000/api/queries/filters.php", params);
        this.props.getFilterData(response, params);
        // console.log(response.data);
    }

    render(){
        return (
            <form className="filtersContainer" onSubmit={this.submitFormData}>
                <div className="titleFilters">
                    <h3>Refine</h3>
                    <button type="button" className="btn btn-link" onClick={this.resetFilters}>Clear All</button>
                </div>
                <Row>
                    <Input s={6} type="select" label="Min Price" name="minPrice" defaultValue={this.state.minPrice} onChange={this.handleChange.bind(this)}>
                       <option value = "0"> $0</option>
                       <option value = "400"> $400</option>
                       <option value = "600"> $600</option>
                       <option value = "800"> $800</option>
                   </Input>
                   <Input s={6} type ="select" label = "Max Price" name="maxPrice"  defaultValue = {this.state.maxPrice} onChange={this.handleChange.bind(this)} >
                       <option value = "400"> $400</option>
                       <option value = "600"> $600</option>
                       <option value = "800"> $800</option>
                       <option value = "1000"> $1K+</option>
                   </Input>
                </Row>
                <Row>
                    <Input s={12} type ="select" label = "Distance" name="distance" defaultValue ={this.state.distance} onChange={this.handleChange.bind(this)}>
                       <option value = "15">15 miles</option>
                       <option value = "30">30 miles</option>
                       <option value = "45">45 miles</option>
                   </Input>
               </Row>
               <Row className="roomType">
                       <Input name="roomSingle" type="checkbox" checked={this.state.roomSingle} value="roomSingle" label="Single Room"  onChange={this.handleCheckBox.bind(this)} />
                       <Input name="roomDouble" type="checkbox" checked={this.state.roomDouble} value = "roomDouble" label="Double Room"  onChange={this.handleCheckBox.bind(this)} />
                       <Input name="roomTriple" type="checkbox" checked={this.state.roomTriple} value = "roomTriple" label="Triple Room"  onChange={this.handleCheckBox.bind(this)}/>
                       <Input name="roomLiving" type="checkbox" checked={this.state.roomLiving} value = "roomLiving" label="Living Room"  onChange={this.handleCheckBox.bind(this)}/>
                </Row>
                <Row>
                    <Input s={12} type ="select" label = "# of Parking Spots" name="numParkingSpots" defaultValue ={this.state.numParkingSpots} onChange={this.handleChange.bind(this)}>
                       <option value = "0">0 spots</option>
                       <option value = "1">1 spot</option>
                       <option value = "2">2 spots</option>
                       <option value = "3">3+ spots</option>
                   </Input>
               </Row>
                <Row className="homeType">
                       <Input name="roomApart" type="checkbox" checked={this.state.roomApart} value = "roomApart" label="Apartment"  onChange={this.handleCheckBox.bind(this)} />
                       <Input name="roomHouse" type="checkbox" checked={this.state.roomHouse} value = "roomHouse" label="House"  onChange={this.handleCheckBox.bind(this)}/>
                </Row>
                <Row className="homeMisc">
                    <Input name="roomPets" type="checkbox" checked={this.state.roomPets} value = "roomPets" label="Pet Friendly"  onChange={this.handleCheckBox.bind(this)}/>
                    <Input name="hasInUnitLaundry" type="checkbox" checked={this.state.hasInUnitLaundry} value="hasInUnitLaundry" label="In-unit Laundry"  onChange={this.handleCheckBox.bind(this)} />
                    <Input name="isFurnished" type="checkbox" checked={this.state.isFurnished} value="isFurnished" label="Furnished Room"  onChange={this.handleCheckBox.bind(this)} />
                    <Input name="hasGym" type="checkbox" checked={this.state.hasGym} value = "hasGym" label="Contains Gym"  onChange={this.handleCheckBox.bind(this)} />
                    <Input name="hasPool" type="checkbox" checked={this.state.hasPool} value="hasPool" label="Contains Pool"  onChange={this.handleCheckBox.bind(this)} />
                </Row>
                <button className="btn btn-primary">Submit</button>
            </form>
        )
    }
}


export default Filters;