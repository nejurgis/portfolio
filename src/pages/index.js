import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Projects from "../components/projects"
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

const IndexPage = () => (
  <>
    {/* <Layout> */}
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Container>
      <Text>
        <h1>
          Hey,
          <Clickable> </Clickable>
          <NavLink to="/">Jurgis</NavLink>
          here. I'm a Graphic Designer who does Web Development.
        </h1>
      </Text>
      <ul id="messages" />
      <form action="">
        <input id="m" />
        <button>Send</button>
      </form>
      <CanvasComponent />
    </Container>
    {/* </Layout> */}
  </>
)

export default IndexPage
