import React, { Component } from "react"
import * as simpleheat from "simpleheat"
import hoverData from "./hoverData.JSON"

let frame
const itemStyle = {
  // MAKES THE CANVAS ON TOP OF STUFF
  position: "absolute",
  // display: 'none'
  // pointerEvents: 'none'
  WebkitTransform: "translateZ(0)",
  transform: "translateZ(0)",
  WebkitBackfaceVisibility: "hidden",
  BackfaceVisibility: "hidden",
  verticalAlign: "bottom",
  overflowX: "hidden",
  pointerEvents: "none",
}

export default class CanvasComponent extends Component {
  state = {
    data: [[38, 20, 2], [38, 690, 3], [48, 30, 1], [48, 40, 1]],
    col: { 0.9: "orange", 0.1: "red", 0.5: "blue", 0.8: "cyan", 0.8: "yellow" },
    r: 25,
    r2: 15,
    maxlength: 1500,
  }

  canvasRef = React.createRef()

  componentDidMount() {
    console.log(hoverData[0])
    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame
    this.canvas = this.canvasRef.current
    // this.canvas.width = window.innerWidth * 2
    // this.canvas.height = window.innerHeight * 2
    // this.canvas.style.width = window.innerWidth + "px"
    // this.canvas.style.height = window.innerHeight + "px"
    // const ctx = this.canvas.getContext("2d")
    // ctx.scale(2, 2)

    // this.canvas
    console.log("CANVAS", this.canvasRef)

    this.heatmap = simpleheat(this.canvas).max(20)
    this.heatmap.gradient(this.state.col)
    this.heatmap.radius(this.state.r, this.state.r2)
    this.heatmap.clear()
    document.body.addEventListener("mousemove", this.collectMouseData)
    console.log("this.heatmap:", document.body)
  }

  draw = () => {
    // console.time('draw')
    this.heatmap.draw()
    // console.log('this.heatmap:', this.heatmap)
    // console.timeEnd('draw')
    frame = null
  }

  collectMouseData = e => {
    e.preventDefault()
    let x = e.offsetX
    let y = e.offsetY
    console.log("y:", y)

    // if (e.touches) {
    //   console.log("e.touches:", e.touches)
    //   x = e.touches[0].pageX
    //   y = e.touches[0].pageY
    // }
    // this.setState(state => {
    //   const data = ['h',...state.data ]
    // })
    // this.setState({
    //   data: [
    //     ...this.state.data,
    //     [x,y,1]
    //   ]
    // })
    //slow
    // this.heatmap.add(this.state.data[this.state.data.length-1])
    this.heatmap.add([x, y, 1])

    if (this.heatmap._data.length > this.state.maxlength) {
      this.heatmap._data.shift()
      // this.heatmap.clear()
    }
    frame = frame || window.requestAnimationFrame(this.draw)
  }

  render() {
    return (
      <canvas
        style={itemStyle}
        ref={this.canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    )
  }
}
