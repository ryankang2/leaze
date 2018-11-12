import React from 'react';

class FilterItem extends React.Component {
    constructor (props){
      super ();
  
      this.state = {
        checked: false
      };
  
      this.handleClick = this.handleClick.bind(this);    
    }
    handleClick (e){
      this.setState({
        checked: !this.state.checked
      });
  
    }
    render (){
      let text = this.state.checked ? <strike>{this.props.message}</strike> : this.props.message;
      return (
          <div className="row">
            <div className="col-md-12">
              <input type="checkbox" onClick={this.handleClick} />&nbsp;{text}
              <hr />
            </div>
          </div>
      );
    }
}

let item2 = <Item message="a new message" />;
let item3 = <Item message="another message" />;
let item4 = <Item message="one more task" />;

let allTheThings = [item2, item3, item4];

class ItemList extends React.Component {
  constructor (props){
    super ();
  }
  render (){
    let items = allTheThings.map(thing => thing);
    return (
        <h4>{items}</h4>
    );
  }
}

export default Filters;