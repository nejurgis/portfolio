import React from "react"
import BackgroundImage from "gatsby-background-image"

const BackgroundSection = ({ img }) => {
  return (
    <BackgroundImage
      style={{
        zIndex: "-1",
        height: "70vh",
        width: "66vw",
        margin: "0 auto",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        boxShadow: "0 0 30px black",
      }}
      fluid={img}
      className="bg"
    />
  )
}

BackgroundSection.defaultProps = {
  title: "default title",
  styleClass: "default-background",
}

export default BackgroundSection
