import React, { Component } from "react"

import threeEntryPoint from "./threejs/threeEntryPoint"
// import "./header.css"
import { withStyles } from "@material-ui/core"

const styles = {
  animationRoot: {
    background: "linear-gradient(45deg, blue 30%, green 90%)",
    opacity: 0.8,
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    height: [["100%"], "!important"],
    width: [["100%"], "!important"],
  },
}

class Header extends Component {
  componentDidMount() {
    threeEntryPoint(this.threeRootElement)
    console.log(threeEntryPoint(this.threeRootElement))
  }

  render() {
    const { classes } = this.props
    return (
      <div
        // className="header-header"
        className={classes.animationRoot}
        ref={element => (this.threeRootElement = element)}
      />
    )
  }
}

export default withStyles(styles)(Header)
