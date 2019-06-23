import React, { Component } from 'react'
import P5Wrapper from './P5Wrapper'
import './../index.css'
import { apiUrl } from './../env'

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      nodes: []
    };
  }

  componentDidMount() {
    return fetch(`${apiUrl}edges`, {
    method: "GET",
    headers: {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    }})
      .then(response => {
        return response.json()
      })
      .then(data => {
        //links = data.edges
      })
      .then(() => {
        return fetch(`${apiUrl}nodes`, {
        method: "GET",
        headers: {
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
        }})
      })
      .then(response => response.json())
      .then(data => {

//        this.setState({ nodes, links })
      })

  }

  render() {
    return (
      <P5Wrapper
        p5Props={{ nodes: this.state.nodes, links: this.state.links }}
        onSetAppState={this.onSetAppState}
      />
    )
  }
}

export default Display;