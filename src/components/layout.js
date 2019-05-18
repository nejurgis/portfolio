import React from "react"
import { Global, css } from "@emotion/core"
import Header from "./header"

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

          > div {
            margin-top: 0;
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            color: #222;
          }

          li {
            margin-top: 0.25rem;
          }
        }
      `}
    />
    <Header />
    <main
      css={css`
        max-width: 90vw;
        width: 550px;
      `}
    >
      {children}
    </main>
  </>
)

export default Layout
