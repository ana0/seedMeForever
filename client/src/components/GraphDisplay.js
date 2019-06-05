import React, { Component } from 'react'
import P5Wrapper from './P5Wrapper'
import './index.css'
import { apiUrl } from './env'

let nodes = [
  { x: 50, y: 20 },
  { x: 200, y: 300 },
  { x: 300, y: 40 }
];

let links = [
  { source: nodes[0], target: nodes[1] },
  { source: nodes[1], target: nodes[2] },
  { source: nodes[2], target: nodes[0] }
];

class GraphDisplay extends Component {
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
        links = data.edges
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
        nodes = data.nodes.map((n, index) => {
          n.x = Math.random() * window.innerWidth;
          n.y = Math.random() * window.innerHeight;
          return n;
        })
        links = links.map(e => {
          e.source = nodes.find(n => n.id === e.fromId)
          e.target = nodes.find(n => n.id === e.toId)
          return e;
        })
        this.setState({ nodes, links })
      })

  }

  render() {
    return (
      <P5Wrapper
        p5Props={{ nodes: this.state.nodes, links: this.state.links }}
        onSetAppState={this.onSetAppState}
      />
    );
  }
}

export default GraphDisplay;