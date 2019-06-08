import React from "react"
import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"

export default ({ children }) => (
  <>
    <Global
      styles={css`
        div {
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
