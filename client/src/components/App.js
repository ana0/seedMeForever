import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import './../index.css';
import ConsentForm from './ConsentForm';
import ImageForm from './ImageForm';
import ThankYou from './ThankYou';
import Display from './Display';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      archiveId: null
    };
  }

  handleConsent(int) {
    this.setState({ stage: int })
  }

  handleArchiveId(id) {
    console.log('setting archiveId')
    this.setState({ archiveId: id })
  }

  render() {
    return (
    <div className="content">
      <h2>remembering network</h2>
      { this.state.stage === 0 ?
        <ConsentForm handleConsent={this.handleConsent.bind(this)} /> :
        null }
      { this.state.stage === 1 ?
        <ImageForm
          handleConsent={this.handleConsent.bind(this)}
          handleArchiveId={this.handleArchiveId.bind(this)} /> :
        null }
      { this.state.stage === 2 ?
        <ThankYou
          handleConsent={this.handleConsent.bind(this)}
          archiveId={this.state.archiveId} /> :
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