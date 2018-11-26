import React, {Component} from "react";
import "./Filters.css";
import {Row, Input} from 'react-materialize';

class Filters extends Component{
    constructor(props){
        super(props);
        this.state = {
            minPrice: '0',
            maxPrice: '1000',
            distance: '0',
            roomSingle: false,
            roomDouble: false,
            roomTriple: false,
            roomLiving: false,
            roomApart: false,
            roomCondo: false,
            roomHouse: false,
            roomStudio: false,
            roomPets: false,
            newestFirst: false,
        }

        this.submitFormData = this.submitFormData.bind(this);
    }
    resetFilters(){
        console.log("reset");
    }
    listClicked(e) {

        console.log('You clicked the list header');
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


        console.log('Submitted');
    }
    render(){
        console.log(this.state);
        return (
            <form className="filtersContainer" onSubmit={this.submitFormData}>
                <div className="titleFilters">
                    <h3>Refine</h3>
                    <button className="btn btn-link" onClick={this.resetFilters}>Clear All</button>
                </div>
                <Row>
                    <Input s={6} type ='select' label = 'Min Price' name="minPrice" defaultValue = {this.state.minPrice} onChange={this.handleChange.bind(this)}>
                       <option value = '0'> $0</option>
                       <option value = '400'> $400</option>
                       <option value = '600'> $600</option>
                       <option value = '800'> $800</option>
                   </Input>
                   <Input s={6} type ='select' label = 'Max Price' name='maxPrice'  defaultValue = {this.state.maxPrice} onChange={this.handleChange.bind(this)} >
                       <option value = '400'> $400</option>
                       <option value = '600'> $600</option>
                       <option value = '800'> $800</option>
                       <option value = '1000'> $1K+</option>
                   </Input>
                </Row>
                <Row  >
                    <Input s={12} type ='select' label = 'Distance' name='distance' defaultValue ={this.state.distance} onChange={this.handleChange.bind(this)}>
                       <option value = '15'>15 miles</option>
                       <option value = '30'>30 miles</option>
                       <option value = '45'>45 miles</option>
                   </Input>
               </Row>
               <Row  >
                       <Input s={6} name='roomSingle' type='checkbox' checked={this.state.roomSingle} value = 'roomSingle' label='Single Room'  onChange={this.handleCheckBox.bind(this)} />
                       <Input s={6} name='roomDouble' type='checkbox' checked={this.state.roomDouble} value = 'roomDouble' label='Double Room'  onChange={this.handleCheckBox.bind(this)} />
                       <Input s={6} name='roomTriple' type='checkbox' checked={this.state.roomTriple} value = 'roomTriple' label='Triple Room'  onChange={this.handleCheckBox.bind(this)}/>
                       <Input s={6} name='roomLiving' type='checkbox' checked={this.state.roomLiving} value = 'roomLiving' label='Living Room'  onChange={this.handleCheckBox.bind(this)}/>
                </Row>
                <Row  >
                       <Input s={6} name='roomApart' type='checkbox' checked={this.state.roomApart} value = 'roomApart' label='Apartment'  onChange={this.handleCheckBox.bind(this)} />
                       <Input s={6} name='roomCondo' type='checkbox' checked={this.state.roomCondo} value = 'roomCondo' label='Condomenium'  onChange={this.handleCheckBox.bind(this)} />
                       <Input s={6} name='roomHouse' type='checkbox' checked={this.state.roomHouse} value = 'roomHouse' label='House'  onChange={this.handleCheckBox.bind(this)}/>
                       <Input s={6} name='roomStudio' type='checkbox' checked={this.state.roomStudio} value = 'roomStudio' label='Studio'  onChange={this.handleCheckBox.bind(this)}/>
                       <Input s={6} name='roomPets' type='checkbox' checked={this.state.roomPets} value = 'roomPets' label='Pet Friendly'  onChange={this.handleCheckBox.bind(this)}/>
                </Row>
               <Row  >
                       <Input s={12} type ='select' label = 'Newest First' name='distance' defaultValue ='Nearby' onChange={this.handleChange.bind(this)}>
                           <option value = '15'>15 miles</option>
                           <option value = '30'>30 miles</option>
                           <option value = '45'>45 miles</option>
                       </Input>
                </Row>
                <button>Submit</button>
            </form>
        )
    };
}


export default Filters;