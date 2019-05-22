import React, { useState, useEffect, Component } from "react"
import { Link } from "gatsby"
import Loadable from "react-loadable"

import SEO from "../components/seo"
// import CanvasComponent from "../components/CanvasComponent"
import "../components/layout.css"
import styled from "@emotion/styled"

const Container = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: silver;
  height: 100vh;
`

const Text = styled.div`
  text-align: center;
  font-size: 4rem;
  max-width: 110rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  z-index: 2;
  pointer-events: none;
`
const NavLink = styled(Link)`
  color: #222;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1;
  margin: 1rem 0.5rem 0 0;
  padding: 0.55rem;
  text-decoration: none;
  font-size: 2rem;
  pointer-events: auto;
`
const Clickable = styled.div`
  z-index: 4;
  display: inline;
`
const DungeonLoading = props => {
  if (props.error) {
    return null
  } else if (props.timedOut) {
    return null
  } else if (props.pastDelay) {
    return null
  } else {
    return null
  }
}

const DungeonComponent = Loadable({
  loader: () => import("../components/DungeonComponent"),
  loading: DungeonLoading,
})

const CanvasComponent = Loadable({
  loader: () => import("../components/CanvasComponent"),
  loading: DungeonLoading,
})

export default class IndexPage extends Component {
  state = {
    width: "",
    mode: "mobile",
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange)

    if (typeof window !== "undefined") {
      this.setState({ width: window.innerWidth })
      if (window.innerWidth <= 600) {
        this.setState({ mode: "mobile" })
      } else {
        this.setState({ mode: "desktop" })
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange)
  }

  handleWindowSizeChange = () => {
    // console.log("pixel ratio", window.devicePixelRatio)
    // console.log("state of screen", this.state.mode)
    this.setState({ width: window.innerWidth })
    // console.log("window width", this.state.width)

    if (this.state.width <= 600) {
      this.setState({ mode: "mobile" })
    } else {
      this.setState({ mode: "desktop" })
    }
  }

  renderDungeon = () => {
    if (this.state.mode === "mobile") {
      return <DungeonComponent />
    } else {
      return null
    }
  }

  renderDesktop = () => {
    if (this.state.mode === "desktop") {
      return (
        <>
          <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

          <Container>
            <CanvasComponent />
            <Text>
              <h1>
                Hey,
                <Clickable> </Clickable>
                <NavLink to="/">Jurgis</NavLink>
                Here. I'm a Graphic Designer who does Web Development.
              </h1>
            </Text>
          </Container>
        </>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <>
        {this.renderDesktop()}
        {this.renderDungeon()}
      </>
    )
  }
}

// render() {
//   const { width } = this.state
//   const isMobile = width <= 600
//   console.log("width", width)
//   if (isMobile) {
//     return (
//       <>
//         {console.log("mobile")}
//         <DungeonComponent />
//       </>
//     )
//   } else {
//     return (
//       <>
//         {console.log("Desktop")}
//         <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

//         <Container>
//           <CanvasComponent />
//           <Text>
//             <h1>
//               Hey,
//               <Clickable> </Clickable>
//               <NavLink to="/">Jurgis</NavLink>
//               Here. I'm a Graphic Designer who does Web Development.
//             </h1>
//           </Text>
//         </Container>
//       </>
//     )
//   }
// }
