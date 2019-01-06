import React, { Component } from 'react';
import DroneTable from './DroneTable';
import './App.css';

const exampleDrones = {
  drones: [
    {
      id: 'f7aacd5d-ed58-49ec-a396-202faa8e82b1',
      speed: 20
    },
    {
      id: 'ab9bfce2-5231-4545-86e2-2ddcc7064be1',
      speed: 40
    },
    {
      id: '19d3fe50-69bb-4a87-bd00-3cd23290df47',
      speed: 0,
      notMoving: true
    }
  ]
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <DroneTable {...exampleDrones} />
      </div>
    );
  }
}

export default App;
