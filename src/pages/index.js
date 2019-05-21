// import React from "react"
// import { Link } from "gatsby"
// import Loadable from "react-loadable"

// import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"
// import Menu from "../components/menu"
// import CanvasComponent from "../components/CanvasComponent"
// import "../components/layout.css"
// import { css } from "@emotion/core"
// import styled from "@emotion/styled"

// const Container = styled.div`
//   margin: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: silver;
//   height: 100vh;
// `

// const Text = styled.div`
//   text-align: center;
//   font-size: 4rem;
//   max-width: 110rem;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   z-index: 2;
//   pointer-events: none;
// `
// const NavLink = styled(Link)`
//   color: #222;
//   font-size: 1rem;
//   font-weight: normal;
//   line-height: 1;
//   margin: 1rem 0.5rem 0 0;
//   padding: 0.55rem;
//   text-decoration: none;
//   font-size: 2rem;
//   pointer-events: auto;
// `
// const Clickable = styled.div`
//   z-index: 4;
//   display: inline;
// `
// const DungeonLoading = props => {
//   if (props.error) {
//     return null
//   } else if (props.timedOut) {
//     return null
//   } else if (props.pastDelay) {
//     return null
//   } else {
//     return null
//   }
// }

// const DungeonComponent = Loadable({
//   loader: () => import("../components/DungeonComponent"),
//   loading: DungeonLoading,
// })

// const IndexPage = () => (
//   <>
//     {/* <Layout> */}
//     <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

//     <Container>
//       <Text>
//         <h1>
//           Hey,
//           <Clickable> </Clickable>
//           <NavLink to="/">Jurgis</NavLink>
//           here. I'm a Graphic Designer who does Web Development.
//         </h1>
//       </Text>

//       <CanvasComponent />

//     </Container>
//     {/* </Layout> */}
//   </>
// )

// export default IndexPage

import React, { Component } from "react"
import { Link } from "gatsby"
import Loadable from "react-loadable"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Menu from "../components/menu"
import CanvasComponent from "../components/CanvasComponent"
import "../components/layout.css"
import { css } from "@emotion/core"
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

export default class IndexPage extends Component {
  state = {
    width: window.innerWidth,
  }

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange)
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth })
  }

  render() {
    const { width } = this.state
    const isMobile = width <= 600

    if (isMobile) {
      return (
        <>
          {console.log("mobile")}
          <DungeonComponent />
        </>
      )
    } else {
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
    }
  }
}
