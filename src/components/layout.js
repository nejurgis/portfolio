import React from "react"
import { Global, css } from "@emotion/core"

export default ({ children }) => (
  <>
    <Global
      styles={css`
        div {
          @font-face {
            font-family: "OSWald";
            src: url("../fonts/OSWald-Grun.woff2") format("woff2");
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
