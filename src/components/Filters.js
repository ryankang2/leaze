import React, {Component} from "react";
import "./Filters.css";
import {Row, Input} from "react-materialize";
import {formatPostData} from "../helpers/formatPostData";
import axios from "axios";

const initialState = {
    user_id: sessionStorage.getItem("user_id"),
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

class Filters extends Component{
    constructor(props){
        super(props);
        this.state = initialState;
        this.resetFilters = this.resetFilters.bind(this);
        this.handleChangeFilter = this.handleChangeFilter.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.handleChangeForm = this.handleChangeForm.bind(this);
        this.saveFilterData = this.saveFilterData.bind(this);
    }

    async componentDidMount(){
        // const params = formatPostData(this.state);
        // const response = await axios.post("http://localhost:8000/api/queries/get_filters.php", params);
        // $("#price_low").text(response.data.price_low)
        // this.setState({price_low: response.data.price_low})
        // $("#price_high").text(response.data.price_high)
        // this.setState({price_high: response.data.price_high})
        // $("#dist_to_campus").text(response.data.dist_to_campus)
        // this.setState({dist_to_campus: response.data.dist_to_campus})
        // $("#dist_to_campus").text(response.data.dist_to_campus)
        // this.setState({dist_to_campus: response.data.dist_to_campus})
        // $("#roomSingle").text(response.data.roomSingle)
        // this.setState({roomSingle: response.data.roomSingle})
        // $("#roomSingle").text(response.data.roomSingle)
        // this.setState({roomSingle: response.data.roomSingle})
        // $("#roomDouble").text(response.data.roomDouble)
        // this.setState({roomDouble: response.data.roomDouble})
        // $("#roomDouble").text(response.data.roomDouble)
        // this.setState({roomDouble: response.data.roomDouble})
        // $("#roomTriple").text(response.data.roomTriple)
        // this.setState({roomTriple: response.data.roomTriple})
        // $("#roomTriple").text(response.data.roomTriple)
        // this.setState({roomTriple: response.data.roomTriple})
        // $("#roomLiving").text(response.data.roomLiving)
        // this.setState({roomLiving: response.data.roomLiving})
        // $("#roomLiving").text(response.data.roomLiving)
        // this.setState({roomLiving: response.data.roomLiving})
        // $("#roomApart").text(response.data.roomApart)
        // this.setState({roomApart: response.data.roomApart})
        // $("#roomApart").text(response.data.roomApart)
        // this.setState({roomApart: response.data.roomApart})
        // $("#roomHouse").text(response.data.roomHouse)
        // this.setState({roomHouse: response.data.roomHouse})
        // $("#roomHouse").text(response.data.roomHouse)
        // this.setState({roomHouse: response.data.roomHouse})
        // $("#pet").text(response.data.pet)
        // this.setState({pet: response.data.pet})
        // $("#pet").text(response.data.pet)
        // this.setState({pet: response.data.pet})
        // $("#laundry").text(response.data.laundry)
        // this.setState({laundry: response.data.laundry})
        // $("#laundry").text(response.data.laundry)
        // this.setState({laundry: response.data.laundry})
        // $("#parking").text(response.data.parking)
        // this.setState({parking: response.data.parking})
        // $("#parking").text(response.data.parking)
        // this.setState({parking: response.data.parking})
        // $("#furnished").text(response.data.furnished)
        // this.setState({furnished: response.data.furnished})
        // $("#furnished").text(response.data.furnished)
        // this.setState({furnished: response.data.furnished})
        // $("#gym").text(response.data.gym)
        // this.setState({gym: response.data.gym})
        // $("#gym").text(response.data.gym)
        // this.setState({gym: response.data.gym})
        // $("#pool").text(response.data.pool)
        // this.setState({pool: response.data.pool})
        // $("#pool").text(response.data.pool)
        // this.setState({pool: response.data.pool})
    }
    
    resetFilters(event){
        event.preventDefault();
        
        this.setState(initialState);
    }

    handleChangeFilter(event) {
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
        // console.log(event.currentTarget);
        // const type = event.currentTarget.type;
        // if( type == "select" ) {
        //     this.handleChangeFilter;
        // }
        // if( type == "checkbox" ) {
        //     this.handleCheckBox;
        // }
        const params = formatPostData(this.state);
        console.log("this.state", this.state);
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
                    Filters
                </div>
                <div id={"priceHeader"} >
                    Minimum to Maximum Price
                </div>
                <Row>
                    <Input s={6} className="browser-default" type="select"  name="price_low" value={this.state.price_low} onChange={this.handleChangeFilter}>
                       <option value = "0"> $0</option>
                       <option value = "400"> $400</option>
                       <option value = "600"> $600</option>
                       <option value = "800"> $800</option>
                   </Input>
                   <Input s={6} className="browser-default" type ="select" name="price_high"  value = {this.state.price_high} onChange={this.handleChangeFilter} >
                       <option value = "400"> $400</option>
                       <option value = "600"> $600</option>
                       <option value = "800"> $800</option>
                       <option value = "5000"> $1K+</option>
                   </Input>
                </Row>
                <div id={"distanceHeader"} >
                    Distance To UCSD in Miles
               </div>
                <Row>
                    <Input s={12} className="browser-default" type ="select" name="dist_to_campus" value ={this.state.dist_to_campus} onChange={this.handleChangeFilter}>
                       <option value = "15">15 miles</option>
                       <option value = "30">30 miles</option>
                       <option value = "45">45 miles+</option>
                   </Input>
               </Row>
               <div id={"roomTypeHeader"} >
                    Room Type
               </div>
               <Row className="roomType">
                       <Input name="roomSingle" type="checkbox" checked={this.state.roomSingle} value="roomSingle" label="Single Room"  onChange={this.handleCheckBox} />
                       <Input name="roomDouble" type="checkbox" checked={this.state.roomDouble} value = "roomDouble" label="Double Room"  onChange={this.handleCheckBox} />
                       <Input name="roomTriple" type="checkbox" checked={this.state.roomTriple} value = "roomTriple" label="Triple Room"  onChange={this.handleCheckBox}/>
                       <Input name="roomLiving" type="checkbox" checked={this.state.roomLiving} value = "roomLiving" label="Living Room"  onChange={this.handleCheckBox}/>
                </Row>
                <div id={"homeTypeHeader"} >
                    Home Type
               </div>
                <Row className="homeType">
                       <Input name="roomApart" type="checkbox" checked={this.state.roomApart} value = "roomApart" label="Apartment"  onChange={this.handleCheckBox} />
                       <Input name="roomHouse" type="checkbox" checked={this.state.roomHouse} value = "roomHouse" label="House"  onChange={this.handleCheckBox}/>
                </Row>
                <div id={"amenitiesHeader"} >
                    Amenities
               </div>
                <Row className="homeMisc">
                    <Input name="pet" type="checkbox" checked={this.state.pet} value = "pet" label="Pet Friendly"  onChange={this.handleCheckBox}/>
                    <Input name="laundry" type="checkbox" checked={this.state.laundry} value="laundry" label="In-unit Laundry"  onChange={this.handleCheckBox} />
                    <Input name="parking" type="checkbox" checked={this.state.parking} value = "parking" label="Has Parking"  onChange={this.handleCheckBox}/>
                    <Input name="furnished" type="checkbox" checked={this.state.furnished} value="furnished" label="Furnished Room"  onChange={this.handleCheckBox} />
                    <Input name="gym" type="checkbox" checked={this.state.gym} value = "gym" label="Has Gym"  onChange={this.handleCheckBox} />
                    <Input name="pool" type="checkbox" checked={this.state.pool} value="pool" label="Has Pool"  onChange={this.handleCheckBox} />
                </Row>
                <button type="button" className="btn btn-primary" onClick={this.saveFilterData}>Save Filters</button>
                <button className="btn btn-link" onClick={this.resetFilters}>Clear All Filters</button>
            </form>
        )
    }
}


export default Filters;