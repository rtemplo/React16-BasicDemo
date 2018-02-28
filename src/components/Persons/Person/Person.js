import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Person.css';
import Aux from '../../../hoc/Auxilary';
import withClass from '../../../hoc/withClass';

class Person extends Component {
  constructor(props) {
    super(props);
    console.log('[Person.js] Inside Constructor.', props);
  }

  componentWillMount() {
    console.log('[Person.js] Inside componentWillMount().');
  }

  componentDidMount() {
    console.log('[Person.js] Inside componentDidMount().');

    if (this.props.itemIdx === 0) {
      this.inputElement.focus();
    }
  }  

  render () {
    console.log('[Person.js] Inside render().');
    return (
      <Aux>
        <p onClick={this.props.click} >I'm {this.props.name} and I am {this.props.age} years old!</p>
        <p>{this.props.children}</p>
        <input 
          type="text" 
          ref={(inp) => {this.inputElement = inp}}
          onChange={this.props.change} 
          value={this.props.name} />
        <button onClick={this.props.delete}>Delete</button>
      </Aux>
    );
  }

  componentWillUnmount () {
    console.log('[Person.js] Inside componentWillUnmount - Person component is about to be removed.');
  }  
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  change: PropTypes.func,
  delete: PropTypes.func
}

export default withClass(Person, classes.Person);