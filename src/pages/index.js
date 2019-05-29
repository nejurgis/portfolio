import React, { Component } from "react"
import { Link } from "gatsby"
import Loadable from "react-loadable"

import SEO from "../components/seo"
import "../components/layout.css"
import styled from "@emotion/styled"

const Header = styled.header`
  display: flex;
  position: fixed;
  box-sizing: border-box;

  justify-content: space-between;
  width: 100%;
  color: white;
  font-size: 2.9rem;
  padding: 1.4rem;
  mix-blend-mode: hard-light;
  user-select: none;
`
const Nav = styled.nav`
  pointer-events: all;
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

const MobText = styled.div`
  line-height: 5rem;
  margin-top: 4rem;
  text-align: center;
  font-size: 4rem;
  max-width: 110rem;
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
  // background-color: red;

  line-height: 1;
  margin: 1rem 0.5rem 0 0;
  padding: 0.55rem;

  text-decoration: underline;
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

const HeaderLoading = props => {
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

const HeaderComponent = Loadable({
  loader: () => import("../components/ThreeHeader"),
  loading: HeaderLoading,
})

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
          {/* <MobText>
            <h3>
              Hey,
              <Clickable> </Clickable>
              <NavLink to="/">Jurgis</NavLink>
              Here. I'm a Graphic Designer who does Web Development &amp;
              Experience Design.
            </h3>
          </MobText> */}
          {/* <HeaderComponent /> */}
          <Header>
            <Nav>
              <StyledLink to="/">GD</StyledLink>
              <StyledLink to="/web/">WEB</StyledLink>
              <StyledLink to="/">VIDEO</StyledLink>
            </Nav>
          </Header>
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
                Hey,
                <Clickable> </Clickable>
                <NavLink to="">Jurgis</NavLink>
                Here. I'm a <NavLink to="/dev/">Web Developer</NavLink>who does
                Graphic Design.
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
