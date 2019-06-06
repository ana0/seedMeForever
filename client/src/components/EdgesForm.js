import React, { Component } from 'react'
import './../index.css'
import { apiUrl } from './../env'

class FormRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      publicKey: '',
      value: ''
    };
  }

  handleChange(event) {
    const key = (event.target.value.trim()).toLowerCase()
    this.setState({ publicKey: key, value: key })
    this.props.handleChange(key);
  }

  render() {
    return (
      <div>
        <input type="text"
          value={this.state.value}
          //onKeyPress={(e)=>{e.target.keyCode === 13 && e.preventDefault()} }
          onChange={this.handleChange.bind(this)} />
        <input type="button"
          //onKeyPress={(e)=>{e.target.keyCode === 13 && e.preventDefault()} }
          value={this.props.value}
          onClick={() => {
            this.props.handleClick(this.state.publicKey)
            this.setState({ value: '' })
          }} />
      </div>
    )
  }
}

class EdgesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      instructions: "Enter the names of all the animals you discovered one by one:",
      error: '',
      private: '',
      public: '',
      discoveredKeys: [],
      disabled: false,
      currentlySelectedAnimal: ''
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('submit')
    if (!this.state.public) { alert('Please enter your password!'); return }
    this.handleClick(this.state.currentlySelectedAnimal)
    .then(() => {
      if (this.state.discoveredKeys.length === 0) { alert('No animals to submit!'); return; }
      if (this.state.hasError) { alert('Cannot submit with errors!') }
      else { 
        const data = { edges: this.state.discoveredKeys, private: this.state.private }
        return fetch(`${apiUrl}edges`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        })
        .then(response => {
          console.log(response)
          this.setState({
            error: '',
            private: '',
            public: '',
            discoveredKeys: [],
            disabled: false
          })
          return alert('Success! Your discovered animals were submitted')
        })
      }
    })
  }

  handleChange(value) {
    this.setState({ currentlySelectedAnimal: value })
  }

  handleAuth(privateKey) {
    return fetch(`${apiUrl}nodes/${privateKey}?private=true`, {
     method: "GET",
     headers: {
     "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
   }})
    .then(response => {
     return response.json()
    })
    .then(data => {
      if (data.error) return this.setState({
        hasError: true,
        error: `Password ${privateKey} not found, did you spell it correctly?`
      })
      this.setState({
        hasError: false,
        private: privateKey,
        public: data.node.public,
        disabled: true
      })
    });
  }

  handleClick(publicKey) {
    return fetch(`${apiUrl}nodes/${publicKey}`, {
     method: "GET",
     headers: {
     "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
   }})
    .then(response => {
     return response.json()
    })
    .then(data => {
      if (data.error) return this.setState({
        hasError: true,
        error: `Animal ${publicKey} not found, did you spell it correctly?`
      })
      const discoveredKeys = this.state.discoveredKeys
      discoveredKeys.push(data.node.public);
      this.setState({
        hasError: false,
        discoveredKeys: discoveredKeys
      })
    });
  }

  render() {
    return (
      <form 
        onSubmit={this.handleSubmit.bind(this)}
        onKeyPress={(e)=>{e.target.keyCode === 13 && e.preventDefault()} }>
        {this.state.hasError ? <p style={{color:'red'}}>{this.state.error}</p> : null}
        {this.state.public ? <p>You are: {this.state.public}</p> : null}
        {this.state.discoveredKeys.length ? <p>You have discovered: {JSON.stringify(this.state.discoveredKeys)}</p> : null}
        <br />
        {!this.state.disabled ?
          <div>
          <p style={{color:'black'}}>Enter your secret food here:</p>
          <FormRow
            handleChange={this.handleChange.bind(this)}
            handleClick={this.handleAuth.bind(this)}
            value='login'/>
          </div> :
          null}
        {this.state.disabled ?
          <div>
            <p style={{color:'black'}}>{this.state.instructions}</p>
            <FormRow
              handleChange={this.handleChange.bind(this)}
              handleClick={this.handleClick.bind(this)}
              value='+'/>
            <br />
            <input
              type="submit"
              value="Submit animals"
              //onKeyPress={(e)=>{} }
              />
          </div> :
          null}
      </form>
    )
  }
}

export default EdgesForm;