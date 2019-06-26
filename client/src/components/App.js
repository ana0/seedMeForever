import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import './../index.css';
import ConsentForm from './ConsentForm';
import ImageForm from './ImageForm';
import Display from './Display';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      consent: false
    };
  }

  handleConsent(boolean) {
    this.setState({ consent: boolean })
  }

  render() {
    return (
    <div className="content">
      <h2>remembering network</h2>
      { !this.state.consent ?
        <ConsentForm handleConsent={this.handleConsent.bind(this)} /> :
        null }
      { this.state.consent ?
        <ImageForm handleConsent={this.handleConsent.bind(this)} /> :
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
          <Route exact path="/" component={Home} />
          <Route path="/display" component={Display} />
        </Switch>
      </div>
    )
  }
}

export default App;