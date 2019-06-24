import React, { Component } from 'react'
import ThreeScene from './ThreeScene'
import './../index.css'
import { apiUrl } from './../env'

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
//     return fetch(`${apiUrl}/edges`, {
//     method: "GET",
//     headers: {
//       "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
//     }})
//       .then(response => {
//         return response.json()
//       })
//       .then(data => {
//         //links = data.edges
//       })
//       .then(() => {
//         return fetch(`${apiUrl}nodes`, {
//         method: "GET",
//         headers: {
//           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
//         }})
//       })
//       .then(response => response.json())
//       .then(data => {

//         this.setState({ nodes, links })
//       })

  }

  render() {
    return (
      <ThreeScene />
    )
  }
}

export default Display;