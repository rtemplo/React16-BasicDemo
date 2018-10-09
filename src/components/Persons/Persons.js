import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
  constructor(props) {
    super(props);
    console.log('[Persons.js] Inside Constructor.', props);
    this.lastPersonRef = React.createRef();
  }

  componentWillMount() {
    console.log('[Persons.js] Inside componentWillMount().');
  }

  componentDidMount() {
    console.log('[Persons.js] Inside componentDidMount().');
    this.lastPersonRef.current.focus();
  }  

  componentWillReceiveProps(nextProps) {
    console.log('[UPDATE Persons.js] Inside componentWillReceiveProps', nextProps);
  }

  // Not needed with the use of PureComponent
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE Persons.js] Inside shouldComponentUpdate', nextProps, nextState);
  //   return nextProps.persons !== this.props.persons ||
  //       nextProps.click !== this.props.click ||
  //       nextProps.change !== this.props.change ||
  //       nextProps.delete !== this.props.delete;
  //   // return true;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE Persons.js] Inside componentWillUpdate()', nextProps, nextState);
  }

  render () {
    console.log('[Persons.js] Inside render().');
    return this.props.persons.map((person, idx) => 
      <Person 
        key={person.id}
        itemIdx={idx}
        name={person.name} age={person.age} 
        click={this.props.switchName.bind(this, person.name + '!!!', idx)} 
        change={(event) => this.props.changeName(event, person.id)} 
        delete={() => this.props.deletePerson(idx)} 
        ref={this.lastPersonRef}
        />
    )
  }

  componentDidUpdate() {
    console.log('[UPDATE Persons.js] Inside componentDidUpdate');
  }

  componentWillUnmount () {
    console.log('[Persons.js] Inside componentWillUnmount - Persons component is about to be removed.');
  }
}

export default Persons;