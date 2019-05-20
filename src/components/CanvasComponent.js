import React, { Component } from "react"
import * as simpleheat from "simpleheat"
import hoverData from "./db.json"
import io from "socket.io-client"

const url = "https://jurgioserveris.herokuapp.com/"
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
  // overflowX: "hidden",
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
      coords: [],
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
    // this.canvas.width = window.innerWidth * 2
    // this.canvas.height = window.innerHeight * 2
    // this.canvas.style.width = window.innerWidth + "px"
    // this.canvas.style.height = window.innerHeight + "px"
    // const ctx = this.canvas.getContext("2d")
    // ctx.scale(2, 2)

    this.heatmap = simpleheat(this.canvas).max(20)
    this.heatmap.gradient(this.state.col)
    this.heatmap.radius(this.state.r, this.state.r2)
    this.heatmap.clear()
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
      // console.log("coordinate:", coordinate)
      this.heatmap.add(coordinate)
      // this.setState({
      //   data: [...this.state.data, coordinate],
      // })
      // this.state.data
      // console.log("this.state.data:", this.state.data)
      // this.heatmap.draw()
      if (this.heatmap._data.length > this.state.maxlength) {
        this.heatmap._data.shift()

        // this.heatmap.clear()
      }
      window.requestAnimationFrame(this.draw)
      // this.heatmap._data.push(coords.slice(-1)[0])
      // console.log("this.heatmap:", this.heatmap)
      // console.log("received livestream")
    })

    // WINDOW RESIZE QUEST BEGINS HERE
    // solution from here : https://www.hawatel.com/blog/handle-window-resize-in-react/
    this.resizeCanvasToDisplaySize(this.canvas)
    window.addEventListener(
      "resize",
      // this.resizeCanvasToDisplaySize(this.canvas)
      () => {
        this.resizeCanvasToDisplaySize(this.canvas)
      }
    )

    let newWidth = window.innerWidth
    console.log("newWidth:", newWidth)

    console.log("this.canvas:", this.canvas)
  }

  draw = () => {
    // console.time('draw')
    this.heatmap.draw()
    // console.timeEnd('draw')

    frame = null
  }

  resizeCanvasToDisplaySize = canvas => {
    let width = canvas.clientWidth
    let height = canvas.clientHeight
    console.log("ran inside resizeCanvasToDisplaySize")
    console.log("client height:", height)
    console.log("canvas height", canvas.height)

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
      return true
    }
    console.log("in the false zone")
    return false
  }

  collectMouseData = e => {
    e.preventDefault()
    let x = e.offsetX
    let y = e.offsetY
    // console.log("y:", y)

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

    // this.heatmap.add([x, y, 1])
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
