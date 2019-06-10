import React, { Component } from "react"
import * as simpleheat from "simpleheat"
import io from "socket.io-client"
import styled from "@emotion/styled"

import debounce from "lodash/debounce"

// const url = "https://jurgioserveris.herokuapp.com/"
const url = "localhost:3000"
console.log("went inside of canvas")
if (typeof window !== `undefined`) {
  if (window.innerWidth > 700) {
    console.log("window width:", window.innerWidth)
  }
}
console.log("bigger than that")
const socket = io.connect(url)

let frame, heatmap
let colList = ["blue", "red", "green", "tomato", "yellow"]
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

const OnlineIndicator = styled.h1`
  background-color: blue;
  color: red;
  position: absolute;
  bottom: 0;
  right: 0;
`

const User = styled.span`
  font-size: 1.5rem;
`

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

        0.8: `${colList[Math.floor(Math.random() * colList.length)]}`,
      },
      r: 25,
      r2: 15,
      maxlength: 350,
      url: "localhost:3000",
      isMoving: false,
      userName: "",
    }
    this.onResize = debounce(this._onResize, 200).bind(this)
    this.heatSpace = React.createRef()
  }

  _onResize() {
    const depth = window.devicePixelRatio
    if (this.heatSpace.current !== null) {
      const dims = this.heatSpace.current.getBoundingClientRect()
      const width = dims.width * depth
      const height = dims.height * depth
      // onResize({ width, height })
      this.heatSpace.current.width = width
      this.heatSpace.current.height = height
      heatmap = simpleheat(this.heatSpace.current).max(20)
      heatmap.gradient(this.state.col)
      heatmap.radius(this.state.r, this.state.r2)
      window.requestAnimationFrame(this.draw)

      // console.log("this.heatSpace.current.width():", this.heatSpace.current)
    } else {
      this.heatSpace = React.createRef()
      console.log("heatSpace is null")
      console.log("this.heatSpace:", this.heatSpace)
    }

    //     // console.log("canvas changed")
    //     canvas.width = width
    //     canvas.height = height
    //     heatmap = simpleheat(canvas).max(20)
    //     heatmap.gradient(this.state.col)
    //     heatmap.radius(this.state.r, this.state.r2)

    //     return true
    //   }
  }

  initHeatmap = () => {
    heatmap = simpleheat(this.heatSpace.current).max(20)
    heatmap.gradient(this.state.col)
    heatmap.radius(this.state.r, this.state.r2)
  }

  componentDidMount() {
    socket.emit("load history")
    console.log("mounted canvas")
    this.manualSocketConnect()
    console.log("check 1", socket.connected)
    if (socket.connected === false) {
      // io.connect(url)
      // const socket = io.connect(url)
      // console.log("io.connect(url):", io.connect(url))

      console.log("went into socket check")
    }

    // socket.on("connect", function() {
    //   console.log("check 2", socket.connected)
    // })

    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame
    this.canvas = this.heatSpace.current
    this.initHeatmap()
    // heatmap = simpleheat(this.canvas).max(20)
    // heatmap.gradient(this.state.col)
    // heatmap.radius(this.state.r, this.state.r2)
    // heatmap.clear()
    document.body.addEventListener("mousemove", this.collectMouseData)

    socket.on("here you go", history => {
      console.log("got it thanks", history[0])
      this.setState({
        data: [...this.state.data, ...history],
      })
      this.state.data.forEach(el => {
        heatmap.add(el)
      })

      window.requestAnimationFrame(this.draw)
    })

    socket.on("moving", data => {
      this.setState({ userName: data })
      this.setState({ isMoving: true })
    })

    socket.on("notMoving", () => {
      this.setState({ isMoving: false })
    })
    socket.on("livestream", coordinate => {
      heatmap.add(coordinate)

      // this.setState({ isTyping: true })
      // console.log("heatmap data length:", heatmap._data.length)

      if (heatmap._data.length > 5000) {
        // heatmap._data.splice(0, 4500)
        heatmap.clear()

        console.log(
          "Went here and deleted  5000 elements:",
          heatmap._data.length
        )
      } else if (heatmap._data.length >= 700) {
        heatmap._data.splice(0, 500)

        window.requestAnimationFrame(this.draw)
        console.log(
          "Went here and deleted  500 elements:",
          heatmap._data.length
        )
      }

      if (heatmap._data.length > this.state.maxlength) {
        heatmap._data.shift()
      }
      window.requestAnimationFrame(this.draw)
    })

    // WINDOW RESIZE QUEST BEGINS HERE
    // solution from here : https://www.hawatel.com/blog/handle-window-resize-in-react/
    // this.resizeCanvasToDisplaySize(this.canvas)
    // window.addEventListener(
    //   "resize",

    //   () => {
    //     this.resizeCanvasToDisplaySize(this.canvas)
    //   }
    // )

    window.addEventListener("resize", this.onResize)
  }

  componentWillUnmount() {
    console.log("unmounted canvas")
    document.body.removeEventListener("mousemove", this.collectMouseData)
    this.manualSocketDisconnect()

    // socket.disconnect()
    // socket.close()

    // window.removeEventListener("resize", () => {
    //   this.resizeCanvasToDisplaySize(this.canvas)
    // })
  }

  draw = () => {
    heatmap.draw()
    frame = null
  }

  manualSocketConnect = () => {
    // const socket = io.connect(url)
    socket.emit("connection", socket.id)
    console.log("socket.id:", socket.id)
  }

  manualSocketDisconnect = () => {
    socket.emit("manual-disconnection", socket.id)
    socket.emit("disconnect")
    socket.close()
    console.log("Socket Closed. ")
  }

  // resizeCanvasToDisplaySize = canvas => {
  //   let width = canvas.clientWidth
  //   // let width = this.canvasRef.current.clientWidth

  //   let height = canvas.clientHeight
  //   heatmap = simpleheat(canvas).max(20)

  //   if (canvas.width !== width || canvas.height !== height) {
  //     // console.log("canvas changed")
  //     canvas.width = width
  //     canvas.height = height
  //     heatmap = simpleheat(canvas).max(20)
  //     heatmap.gradient(this.state.col)
  //     heatmap.radius(this.state.r, this.state.r2)

  //     return true
  //   }
  //   console.log("in the false zone")
  //   return false

  //   // let depth = window.devicePixelRatio
  //   // let displayWidth = Math.floor()
  // }
  mouseMoveStopped = () => {
    socket.emit("notMoving")
  }

  collectMouseData = e => {
    e.preventDefault()
    socket.emit("moving")

    let timeout
    ;(() => {
      clearTimeout(timeout)
      timeout = setTimeout(this.mouseMoveStopped, 2000)
    })()
    let x = e.pageX
    let y = e.pageY

    heatmap.add([x, y, 1])
    socket.emit("hell", [x, y, 1])

    if (heatmap._data.length > this.state.maxlength) {
      heatmap._data.shift()
      // heatmap.clear()
    }
    frame = frame || window.requestAnimationFrame(this.draw)
  }

  render() {
    // isTyping = false
    if (typeof window !== `undefined`) {
      return (
        <>
          {this.state.isMoving ? (
            <OnlineIndicator>
              UserID: <User>{this.state.userName}</User> is drawing...
            </OnlineIndicator>
          ) : null}

          <canvas
            style={itemStyle}
            ref={this.heatSpace}
            width={window.innerWidth}
            height={window.innerHeight}
          />
        </>
      )
    } else {
      return <canvas />
    }
  }
}
