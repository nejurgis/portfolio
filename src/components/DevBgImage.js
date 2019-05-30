import React from "react"
import Img from "gatsby-image"
import styled from "@emotion/styled"

const Parent = styled.div`
  position: relative;
`

const FakeBgImage = styled(Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ height }) => height};
  & > img {
    object-fit: cover;
    object-position: 0% 0% !important;
    font-family: "object-fit: cover";
  }
`
const DevBgImage = () => {
  return <div />
}

export default DevBgImage
