import React from "react"
import { Global, css } from "@emotion/core"

const Layout = ({ children }) => (
  <>
    <Global
      styles={css`
        * {
          box-sizing: border-box;
          margin: 0;
        }

        html,
        body {
          margin: 0;
          color: #555;
          font-family: "OSwald", sans-serif;
          font-size: 10px;
          line-height: 1.4;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: silver;
        }
      `}
    />
    {children}
  </>
)

export default Layout
