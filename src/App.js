import './App.css';
import React from 'react';
import ToDo from './components/ToDo/ToDo';

class App extends React.Component {

  render() {
    return (
      <div>
        <div>
          <ToDo />
        </div>
      </div>
    )
  }
}

export default  App
