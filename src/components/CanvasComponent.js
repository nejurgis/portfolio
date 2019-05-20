import React, { Component } from "react"
import * as simpleheat from "simpleheat"
import io from "socket.io-client"

// const url = "https://jurgioserveris.herokuapp.com/"
const url = "localhost:3000"
const socket = io.connect(url)

let frame
const itemStyle = {
  // MAKES THE CANVAS ON TOP OF STUFF
  position: "absolute",
  width: "100vw",
  height: "100vh",
  WebkitTransform: "translateZ(0)",
  transform: "translateZ(0)",
  WebkitBackfaceVisibility: "hidden",
  BackfaceVisibility: "hidden",
  verticalAlign: "bottom",
  pointerEvents: "none",
}

export default class CanvasComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      col: {
        0.9: "orange",
        0.1: "red",
        0.5: "blue",
        0.8: "cyan",
        0.8: "yellow",
      },
      r: 25,
      r2: 15,
      maxlength: 250,
    }
  }

  canvasRef = React.createRef()

  componentDidMount() {
    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame
    this.canvas = this.canvasRef.current

    this.heatmap = simpleheat(this.canvas).max(20)
    this.heatmap.gradient(this.state.col)
    this.heatmap.radius(this.state.r, this.state.r2)
    // this.heatmap.clear()
    document.body.addEventListener("mousemove", this.collectMouseData)

    socket.emit("load history")
    socket.on("here you go", history => {
      // console.log("got it thanks", history[0])
      this.setState({
        data: [...this.state.data, ...history],
      })
      this.state.data.forEach(el => {
        this.heatmap.add(el)
      })
      window.requestAnimationFrame(this.draw)
    })
    socket.on("livestream", coordinate => {
      this.heatmap.add(coordinate)

      if (this.heatmap._data.length > this.state.maxlength) {
        this.heatmap._data.shift()
      }
      window.requestAnimationFrame(this.draw)
    })

    // WINDOW RESIZE QUEST BEGINS HERE
    // solution from here : https://www.hawatel.com/blog/handle-window-resize-in-react/
    this.resizeCanvasToDisplaySize(this.canvas)
    window.addEventListener(
      "resize",

      () => {
        this.resizeCanvasToDisplaySize(this.canvas)
      }
    )

    let newWidth = window.innerWidth
    console.log("newWidth:", newWidth)

    console.log("this.canvas:", this.canvas)
  }

  draw = () => {
    this.heatmap.draw()
    frame = null
  }

  resizeCanvasToDisplaySize = canvas => {
    let width = canvas.clientWidth
    let height = canvas.clientHeight

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
      this.heatmap = simpleheat(canvas).max(20)
      this.heatmap.gradient(this.state.col)
      this.heatmap.radius(this.state.r, this.state.r2)

      return true
    }
    console.log("in the false zone")
    return false
  }

  collectMouseData = e => {
    e.preventDefault()
    let x = e.offsetX
    let y = e.offsetY

    this.heatmap.add([x, y, 1])
    socket.emit("hell", [x, y, 1])

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
