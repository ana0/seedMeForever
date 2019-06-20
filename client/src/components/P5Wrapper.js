import React, { Component } from 'react'
import p5 from 'p5'
import sketch from './../scenes/sketch'

export default class P5Wrapper extends Component {
  componentDidMount() {
    this.canvas1 = new p5(sketch, 'canvas-container')
    this.canvas1.props = this.props.p5Props
    this.canvas1.onSetAppState = this.props.onSetAppState
  }

  shouldComponentUpdate(nextProps) {
    this.canvas1.props = nextProps.p5Props
    return false
  }

  componentWillUnmount() {
    this.canvas1.remove()
  }

  render() {
    return (
      <div
        id="canvas-container"
        style={{
          position: "fixed",
          left: "0px",
          width: "100%",
          textAlign: "center",
          marginTop: "-8px" }}
      />
    )
  }
}