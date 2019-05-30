import React from "react"
import BackgroundImage from "gatsby-background-image"

const BackgroundSection = ({ img }) => {
  return (
    <BackgroundImage
      style={{
        zIndex: "-1",
        height: "45vh",
        backgroundPosition: "center center",
        backgroundRepeat: "repeat-y",
        backgroundSize: "cover",
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
