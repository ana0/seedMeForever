import React, { Component } from 'react'
import ThreeScene from './ThreeScene'
import './../index.css'

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <ThreeScene />
    )
  }
}

export default Display;