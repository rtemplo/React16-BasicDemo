import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Auxilary';
import withClass from '../hoc/withClass'; //lower case import name because it is not a real component with JSX
// import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

class App extends PureComponent {
  constructor(props) {
    super(props);
    console.log('[App.js] Inside Constructor.', props);
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount().');
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount().');
  }  

  // Not needed with the use of PureComponent
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
  //   return nextState.persons !== this.state.persons ||
  //       nextState.showPersons !== this.state.showPersons;
  //   // return true;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] Inside componentWillUpdate()', nextProps, nextState);
  }  

  componentDidUpdate() {
    console.log('[UPDATE App.js] Inside componentDidUpdate');
  }  

  state = {
    persons: [
      {id: 1000, name:'Ray', age:38},
      {id: 1001, name:'Pam', age:36},
      {id: 1002, name:'Avery', age:19},
      {id: 1003, name:'Olivia', age:6}
    ],
    otherState: 'some other info',
    showPersons: false,
    toggleClicked: 0
  }

  togglePersonsHandler = () => {
    const showPersonsList = this.state.showPersons;
    // this.setState({showPersons: !showPersonsList});

    this.setState((prevState, props) => {
      return {
        showPersons: !showPersonsList,
        toggleClicked: prevState.toggleClicked + 1
      }
    })
  }

  switchNameHandler = (newName, idx) => {
    let modifiedPersonsArr = [...this.state.persons];
    modifiedPersonsArr[idx].name = newName;

    this.setState(prevState => ({
      persons: modifiedPersonsArr
    }));
  }

  //This worked just fine but index was replaced by id which is more realistic of real records
  //changeNameHandler = (event, idx) => {
    // let modifiedPersonsArr = [...this.state.persons];
    // modifiedPersonsArr[idx].name = event.target.value;

    changeNameHandler = (event, personId) => {
      let modifiedPersonsArr = [...this.state.persons];
  
      modifiedPersonsArr.find(p => p.id === personId).name = event.target.value;
      this.setState({
        persons: modifiedPersonsArr
      });
    }

  deletePersonHandler = (idx) => {
    //Note that the setState method can have a callback. In this case we are logging the persons array after setState is finished.

    //This way works but the alternative is presented below. Not sure which way is more efficient.
    // this.setState(prevState => ({
    //   persons: prevState.persons.filter((person, personIdx) => idx !== personIdx)
    // }), () => {console.log(this.state.persons)});
    
    //If you want to use the slice method you can't use it with prevState. You will have to create a new copy of the array first and then perform the splice the splice first.
    let newPersonsArr = [...this.state.persons];
    newPersonsArr.splice(idx, 1);
    this.setState({persons: newPersonsArr}, () => {console.log(this.state.persons)});
  }

  render() {
    console.log('[App.js] Inside render().');
    
    let persons = null;
    let personsLength = this.state.persons.length;

    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons 
            persons={this.state.persons}
            switchName={this.switchNameHandler} 
            changeName={this.changeNameHandler} 
            deletePerson={this.deletePersonHandler} />         
        </div>
      );
    }

    return (
      <Aux>
        <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
        <Cockpit 
          appTitle={this.props.title}
          personsLength={personsLength} 
          showPersons={this.state.showPersons}
          togglePersons={this.togglePersonsHandler} />
        {persons}
      </Aux>
    )

    // return React.createElement('div', null, React.createElement('h1', {className: 'App'}, 'Does this work now?'));
  }
}

export default withClass(App, classes.App);
