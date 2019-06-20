import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import './../index.css';
import ConsentForm from './ConsentForm';
import ImageForm from './ImageForm';
import Display from './Display';

// class Graph extends Component {
//   render() {
//     return (
//       <div>
//         <GraphDisplay />
//       </div>
//     )
//   }
// }

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      consent: false
    };
  }

  handleConsent() {
    this.setState({ consent: true })
  }

  render() {
    return (
    <div>
      <h2>seed me forever</h2>
      { !this.state.consent ?
        <ConsentForm handleConsent={this.handleConsent.bind(this)}/> :
        null }
      { this.state.consent ?
        <ImageForm handleConsent={this.handleConsent.bind(this)}/> :
        null }
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
          <Route path="/display" component={Display}/>
        </Switch>
      </div>
    )
  }
}

export default App;