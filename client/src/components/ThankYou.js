import React, { Component } from 'react'
import './../index.css';
import { apiUrl } from './../env';

class ThankYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: '',
      animal: ''
    };
  }

  componentDidMount() {
    return fetch(`${apiUrl}/animals/${this.props.archiveId}`, {
    method: "GET",
    headers: {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    }})
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({ hash: data.hash, animal: data.name })
      })

  }

  render() {
    return (
      <div className="content">
        <p className="instructions">Thank you for contributing!</p>
        <p
          className="instructions"
          style={{'wordWrap': 'break-word', 'overflowWrap': 'break-word'}}>
          {`${this.state.animal} is now archived at `}
          <a href={`${this.state.hash}`}>{this.state.hash}</a></p>
      </div>
    )
  }
}

export default ThankYou;