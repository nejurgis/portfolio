import React from "react"
import { Global, css } from "@emotion/core"
import OSWald from "../fonts/OSWald-Grun.woff2"

export default ({ children }) => (
  <>
    <Global
      styles={css`
        div {
          @font-face {
            font-family: 'OSWald';
          src: url('${OSWald}') format("woff2");
          }
          font-family: "OSwald", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          margin: 0;
        }
      `}
    />
    {children}
  </>
)
