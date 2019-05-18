import React from "react"

import styled from "@emotion/styled"
import { css } from "@emotion/core"
import { Link } from "gatsby"

const NavLink = styled(Link)`
  color: #222;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1;
  margin: 1rem 0.5rem 0 0;
  padding: 0.55rem;
  text-decoration: none;
  font-size: 2rem;
`

const Header = () => (
  <header
    css={css`
      background: #eee;
      border-bottom: 1px solid #ddd;
      display: flex;
      padding: 0.5rem calc((100vw - 550px) / 2);
      justify-content: space-between;
    `}
  >
    <NavLink to="/">Jurgis </NavLink>
    <NavLink>Last Updated on May 16th 2018</NavLink>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/about/">About</NavLink>
  </header>
)

export default Header
