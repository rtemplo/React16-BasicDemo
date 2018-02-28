import React from 'react';
import classes from './Cockpit.css';
import Aux from '../../hoc/Auxilary';

const cockpit = (props) => {
  const dynClasses = [];
  let btnClass = 'classes.Button';

  if (props.showPersons) {
    btnClass = [classes.Button, classes.Red].join(' ');
  }

  if (props.personsLength <= 2) {
    dynClasses.push(classes.red);
  }
  if (props.personsLength <= 1) {
    dynClasses.push(classes.bold);
  }

  return (
    // This Aux method for rendering adjacent tags is about to be outdated by React.Fragments 
    //  which essentially does the same thing with empty JSX tags <> ... </>.
    // It's not used here because babel-core 7 which is in beta is not yet installed.
    <Aux>
      <h1>{props.appTitle}</h1>
      <p className={dynClasses.join(' ')}>This is really working!</p>
      <button 
        className={btnClass}
        onClick={props.togglePersons}>Toggle Persons</button>      
    </Aux>
  );
};

export default cockpit;