import React, { Component } from "react"

let projects = {
  zIndex: "1000",
  width: "100vw",
  cursor: "pointer !important",
  display: "flex",
  flexDirection: "row-reverse",
  flexWrap: "wrap-reverse",
  justifyContent: "space-between",
}
let project = {
  backgroundColor: "red",
  paddingBottom: "10px",
  width: "50vw",
  height: "50vh",
  // marginRight: '25%'
}
export default class Projects extends Component {
  render() {
    return (
      <div style={projects}>
        <iframe
          style={project}
          src="http://ravecave.herokuapp.com"
          frameBorder="0"
          allowfullscreen
          sandbox
        >
          <p>
            {" "}
            <a href="https://developer.mozilla.org/en-US/docs/Glossary">
              Fallback link for browsers that don't support iframes
            </a>{" "}
          </p>
        </iframe>

        <iframe
          style={project}
          src="http://lexicon.surge.sh/"
          frameBorder="0"
          sandbox
        >
          <p>
            {" "}
            <a href="https://developer.mozilla.org/en-US/docs/Glossary">
              Fallback link for browsers that don't support iframes
            </a>{" "}
          </p>
        </iframe>

        <iframe
          style={project}
          src="http://festivaldrift.nl"
          frameBorder="0"
          allowfullscreen
          sandbox
        >
          <p>
            {" "}
            <a href="https://developer.mozilla.org/en-US/docs/Glossary">
              Fallback link for browsers that don't support iframes
            </a>{" "}
          </p>
        </iframe>

        <iframe
          style={project}
          src="http://tizianakruger.com/"
          frameBorder="0"
          allowfullscreen
          sandbox
        >
          <p>
            {" "}
            <a href="https://developer.mozilla.org/en-US/docs/Glossary">
              Fallback link for browsers that don't support iframes
            </a>{" "}
          </p>
        </iframe>
      </div>
    )
  }
}
