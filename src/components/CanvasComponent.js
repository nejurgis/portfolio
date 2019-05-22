import React, { Component } from "react"
import * as simpleheat from "simpleheat"
import io from "socket.io-client"

const url = "https://jurgioserveris.herokuapp.com/"
// const url = "localhost:3000"
console.log("went inside of canvas")
const socket = io.connect(url)

let frame
const itemStyle = {
  // MAKES THE CANVAS ON TOP OF STUFF
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: "100% !IMPORTANT",
  height: "100% !IMPORTANT",
  WebkitTransform: "translateZ(0)",
  transform: "translateZ(0)",
  WebkitBackfaceVisibility: "hidden",
  BackfaceVisibility: "hidden",
  verticalAlign: "bottom",
  pointerEvents: "none",
}

export default class CanvasComponent extends React.Component {
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
      url: "localhost:3000",
    }
  }

  canvasRef = React.createRef()

  componentDidMount() {
    console.log("mounted canvas")

    console.log("check 1", socket.connected)
    if (socket.connected === false) {
      // io.connect(url)
      // const socket = io.connect(url)
      // console.log("io.connect(url):", io.connect(url))

      console.log("went into socket check")
    }

    socket.on("connect", function() {
      console.log("check 2", socket.connected)
    })
    // io.connect(url)
    // }

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
      console.log("got it thanks", history[0])
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
      // console.log("heatmap data length:", this.heatmap._data.length)

      if (this.heatmap._data.length > 5000) {
        // this.heatmap._data.splice(0, 4500)
        this.heatmap.clear()
        // window.requestAnimationFrame(this.draw)

        console.log(
          "Went here and deleted  5000 elements:",
          this.heatmap._data.length
        )
      } else if (this.heatmap._data.length >= 700) {
        this.heatmap._data.splice(0, 500)
        window.requestAnimationFrame(this.draw)
        console.log(
          "Went here and deleted  500 elements:",
          this.heatmap._data.length
        )
      }

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
  }

  componentWillUnmount() {
    console.log("unmounted canvas")
    document.body.removeEventListener("mousemove", this.collectMouseData)
    this.manualSocketDisconnect()

    // socket.disconnect()
    // socket.close()
    window.removeEventListener(
      "resize",

      () => {
        this.resizeCanvasToDisplaySize(this.canvas)
      }
    )
  }

  draw = () => {
    this.heatmap.draw()
    frame = null
  }

  manualSocketConnect = () => {
    socket.emit("connection", socket.id)
    console.log("socket.id:", socket.id)
  }

  manualSocketDisconnect = () => {
    socket.emit("manual-disconnection", socket.id)

    socket.close()

    console.log("Socket Closed. ")
  }

  resizeCanvasToDisplaySize = canvas => {
    let width = canvas.clientWidth
    // let width = this.canvasRef.current.clientWidth

    let height = canvas.clientHeight
    this.heatmap = simpleheat(canvas).max(20)

    if (canvas.width !== width || canvas.height !== height) {
      // console.log("canvas changed")
      canvas.width = width
      canvas.height = height
      this.heatmap = simpleheat(canvas).max(20)
      this.heatmap.gradient(this.state.col)
      this.heatmap.radius(this.state.r, this.state.r2)

      return true
    }
    console.log("in the false zone")
    return false

    // let depth = window.devicePixelRatio
    // let displayWidth = Math.floor()
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
    if (typeof window !== `undefined`) {
      return (
        <canvas
          style={itemStyle}
          ref={this.canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )
    } else {
      return <canvas />
    }
  }
}
