import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import './index.css';
import EdgesForm from './EdgesForm';
import GraphDisplay from './GraphDisplay';

class Graph extends Component {
  render() {
    return (
      <div>
        <GraphDisplay />
      </div>
    )
  }
}

class Home extends Component {
  render() {
    return (
    <div>
      <h2>socialgram</h2>
      <EdgesForm />
    </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/graph" component={Graph}/>
        </Switch>
      </div>
    )
  }
}

export default App;