import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person'

class App extends Component {

  state = {
    persons: [
      {id: "a", name: "Ravi", age: "28"},
      {id: "b", name: "Teja", age: "24"},
      {id: "c", name: "Rupa", age: "21"}
    ],
    showPersons: false
  }

  nameChangeHandler = (event, id) => {
   const personIndex = this.state.persons.findIndex(p => {
     return p.id === id;
   });
   const person = {...this.state.persons[personIndex]};
   person.name = event.target.value;
   const persons = [...this.state.persons];
   persons[personIndex] = person;
   this.setState({
     persons : persons
   });
  }

  togglePersonsHandler = () => {
    const showStatus = this.state.showPersons;
    this.setState({
      showPersons: !showStatus
    })
  }

  deletePersonHandler = (pIndex) => {
    const persons =  [...this.state.persons];
    persons.splice(pIndex, 1);
    this.setState({persons: persons});
    }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      cursor: 'pointer',
      padding: '8px',
      ':hover':{
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }

    let allPersons = null;

    if(this.state.showPersons) {
      allPersons = (
            <div>
              {this.state.persons.map((el, index) => {
                return <Person 
                delete={() => this.deletePersonHandler(index)} 
                name={el.name} 
                age={el.age}
                key={el.id}
                changed={(event) => this.nameChangeHandler(event, el.id)}/>
              })}
            </div>
      )

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    let classes = [];

    if (this.state.persons.length <= 2) {
      classes.push('red');
    } 
    
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <StyleRoot>
      <div className="App">
        <h1>I'm a React App</h1>
        <p className={classes.join(' ')}>This is working.</p>
        <button style={style} onClick={() => this.togglePersonsHandler()}>Toggle Names</button>
       {allPersons}
      </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);