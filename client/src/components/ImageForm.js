import React, { Component } from 'react'
import './../index.css'
import { apiUrl } from './../env'

class ImageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animal: ''
    };
  }

  componentDidMount() {
    return fetch(`${apiUrl}/animals`, {
    method: "GET",
    headers: {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    }})
      .then(response => {
        console.log(`${apiUrl}/animals`)
        return response.json()
      })
      .then(data => {
        this.setState({ animal: data.name })
      })

  }

  handleSubmit(event) {
    event.preventDefault();

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

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div>
            <p>{this.state.animal}</p>
            <br />
            <input
              type="button"
              value="Yes"
              onClick={this.props.handleConsent}
              />
          </div>
      </form>
    )
  }
}

export default ImageForm;