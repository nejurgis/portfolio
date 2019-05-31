import React, { Component } from "react"
import { Link } from "gatsby"
import Loadable from "react-loadable"
import "../components/main.css"

import SEO from "../components/seo"
import "../components/layout.css"
import styled from "@emotion/styled"

// const Header = styled.header`
//   display: flex;
//   position: fixed;
//   box-sizing: border-box;

//   display: flex;

//   background-color: red;

//   justify-content: space-between;
//   width: 100%;
//   color: white;
//   font-size: 2.9rem;
//   padding: 1.4rem;
//   mix-blend-mode: hard-light;
//   user-select: none;
// `
const Nav = styled.nav`
  pointer-events: all;
  width: 100%;
  color: white;
  font-size: 2.9rem;
  padding: 1.4rem;
  mix-blend-mode: hard-light;
  user-select: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

const StyledLink = styled(props => <Link {...props} />)`
  margin-left: 1.6rem;
  color: black;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &:visited {
    text-decoration: none;
  }
  &:focus {
    text-decoration: none;
  }
`

const Container = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: silver;
  height: 100vh;
`

const MobTextWrapper = styled.div`
  max-width: 60vw;
  margin: 10rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: silver;
`

const MobText = styled.div`
  line-height: 5rem;
  margin-top: 4rem;
  text-align: center;
  font-size: 4rem;
  max-width: 110rem;
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  z-index: 2;
  pointer-events: none;
`
const Text = styled.div`
  text-align: center;
  font-size: 4rem;
  max-width: 90rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  z-index: 2;
  pointer-events: none;
`
const NavLink = styled(Link)`
  color: black;
  line-height: 1;
  margin: 1rem 0.5rem 0 0;
  padding: 0.55rem;
  text-decoration: underline;
  pointer-events: auto;
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

const CanvasLoading = props => {
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
  loading: CanvasLoading,
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

    if (this.state.width <= 700) {
      this.setState({ mode: "mobile" })
      console.log(this.state.width)
    } else {
      this.setState({ mode: "desktop" })
    }
  }

  renderDungeon = () => {
    if (this.state.mode === "mobile") {
      return (
        <>
          <Nav>
            <StyledLink to="/dev">Portfolio</StyledLink>
          </Nav>

          <MobTextWrapper>
            <MobText>Hey, feel free to look around</MobText>
          </MobTextWrapper>
          <DungeonComponent />
        </>
      )
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
              <h1 ref={this.selector}>
                <p id="text" />
                Hey, Jurgis Here. I'm a{" "}
                <NavLink to="/dev/">Web Developer</NavLink>who does Graphic
                Design.
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
