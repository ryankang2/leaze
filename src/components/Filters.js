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
    };
}

// class Item extends React.Component {
//     constructor (props){
//       super ();
  
//       this.state = {
//         checked: false
//       };
  
//       this.handleClick = this.handleClick.bind(this);    
//     }
//     handleClick (e){
//       this.setState({
//         checked: !this.state.checked
//       });
  
//     }
//     render (){
//       let text = this.state.checked ? <strike>{this.props.message}</strike> : this.props.message;
//       return (
//           <div className="row">
//             <div className="col-md-12">
//               <input type="checkbox" onClick={this.handleClick} />&nbsp;{text}
//               <hr />
//             </div>
//           </div>
//       );
//     }
//   }
  
//   let item2 = <Item message="Single Room" />;
//   let item3 = <Item message="Double Room" />;
//   let item4 = <Item message="Triple Room" />;
  
  
//   let allTheThings = [item2, item3, item4];
  
//   class ItemList extends React.Component {
//     constructor (props){
//       super ();
//     }
//     render (){
//       let items = allTheThings.map(thing => thing);
//       return (
//           <h4>{items}</h4>
//       );
//     }
//   }


export default Filters;