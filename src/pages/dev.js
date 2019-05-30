import React, { useState } from "react"
import styled from "@emotion/styled"

import BTC from "../assets/hen.jpg"
import vid from "../assets/vid.webm"
import drift from "../assets/drift.webm"
import lexicon from "../assets/lexicon.webm"
import diff from "../assets/diff.webm"
import ReactPlayer from "react-player"
import { Waypoint } from "react-waypoint"
import { Link } from "gatsby"

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
}

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
}

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  padding: 2rem;
  font-size: 1.7rem;
  color: inherit;
  text-decoration: none;
`
const Homelink = styled(props => <Link {...props} />)`
  text-decoration: none;
  color: black;

  transition: background-color 0.35s ease;

  &:hover {
    text-decoration: underline;
    color: red;
    background-color: blue;
  }
`

const Navlink = styled.a`
  -webkit-font-smoothing: antialiased;
  color: black;
  text-decoration: none;
  transition: background-color 0.35s ease;

  &:hover {
    text-decoration: underline;
    color: red;
    background-color: blue;
  }
`

const Container = styled.div`
  max-width: 100vw;
  padding: 20rem;
  margin: 0 auto;

  @media (max-width: 800px) {
    padding: 0;
  }
`

const Title = styled.div`
  width: 100%;
  border-bottom: 1px solid white;
  padding: 2rem;
  font-size: 4rem;
  line-height: 4rem;
`

const Project = styled.section`
  min-height: 80vh;
  -webkit-box-align: center;
  padding: 1rem;

  @media (max-width: 800) {
    padding: 0;
  }
`
const Wrapper = styled.div`
  margin-top: 4em;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  width: auto;
  height: auto;
`
const ImageSection = styled.div`
@media (max-width: 800px) {
    background: center center;
    background-repeat: no-repeat;
    background-image: url(${BTC});
    background-size: contain;
    height: 90vh;
    box-shadow: 0 0 30px black;
  }
`

const Caption = styled.figcaption`
  text-align: center;
  font-size: 1.7rem;
  margin-top: 1rem;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

const StyledLinks = styled.a`
  font-size: 1.5rem;
  color: tomato;
`

const StyledPlayer = styled(props => <ReactPlayer {...props} />)`
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Likely future */
  margin: 0 auto;
  box-shadow: 0 0 30px black;
  z-index: 1;
  background-color: black;

  @media (max-width: 800px) {
    display: none;
  }
`

const dev = function(props) {
  let [shouldPlay, updatePlayState] = useState(false)

  const handleEnterViewport = () => {
    console.log(StyledPlayer)
    updatePlayState(true)
  }
  const handleExitViewport = () => {
    console.log("exited")
    updatePlayState(false)
  }

  return (
    <>
      <Header>
        <Homelink to="/">Jurgis Lietunovas</Homelink>
        <br />
        <Navlink href="https://github.com/Nejurgis/" target="_blank">
          Github
        </Navlink>
        |
        <Navlink className="navLinks" href="mailto:j.lietunovas@gmail.com">
          Email
        </Navlink>
        <br />
        <Navlink
          className="navLinks"
          href="https://instagram.com/naive.magic/"
          target="_blank"
        >
          Instagram
        </Navlink>
      </Header>
      <Container>
        <Waypoint onEnter={handleEnterViewport} onLeave={handleExitViewport}>
          <Project>
            <Wrapper>
              <StyledPlayer
                width="100%"
                height="100%"
                url={diff}
                playing={shouldPlay}
                loop={true}
                preload="true"
                controls
              />
              <ImageSection />
              <Caption>
                <h3>DIFFEREMENT</h3>
                <p>
                  BUILT FOR D.LANTINGA &amp; D.SMEDEMAN , CODE/DESIGN, MAY 2019
                </p>
                <p>not online yet</p>
              </Caption>
            </Wrapper>
          </Project>
        </Waypoint>
        <Waypoint onEnter={handleEnterViewport} onLeave={handleExitViewport}>
          <Project>
            <Wrapper>
              <StyledPlayer
                width="100%"
                height="100%"
                url={vid}
                playing={shouldPlay}
                loop={true}
                preload="true"
                controls
              />

              <Caption>
                <h3>TIZIANA KRÜGER</h3>
                <p>BUILT FOR T.KRÜGER, CODE/DESIGN, JULY 2017</p>
                <StyledLinks href="http://tizianakruger.com">
                  tizianakruger.com
                </StyledLinks>
              </Caption>
            </Wrapper>
          </Project>
        </Waypoint>
        <Waypoint onEnter={handleEnterViewport} onLeave={handleExitViewport}>
          <Project>
            <Wrapper>
              <StyledPlayer
                width="100%"
                height="100%"
                url={lexicon}
                playing={shouldPlay}
                loop={true}
                preload="true"
                // controls
              />

              <Caption>
                <h3>Lexicon of Graphic Design</h3>
                <p>
                  BUILT FOR AN ASIGNMENT AT THE GERRIT RIETVELD ACADEMIE,
                  CODE/DESIGN, MAY 2017
                </p>
                <StyledLinks href="http://lexicon.surge.sh">
                  lexicon.surge.sh
                </StyledLinks>
              </Caption>
            </Wrapper>
          </Project>
        </Waypoint>
        <Waypoint onEnter={handleEnterViewport} onLeave={handleExitViewport}>
          <Project>
            <Wrapper>
              <StyledPlayer
                width="100%"
                height="100%"
                url={drift}
                playing={shouldPlay}
                loop={true}
                preload="true"
                controls
              />

              <Caption>
                <h3>Festival Drift</h3>
                <p>
                  BUILT FOR FESTIVAL DRIFT, DESIGNED TOGETHER WITH W.JANG AND
                  D.JASIULEVIČIŪTĖ, APRIL 2019
                </p>
                <StyledLinks href="http://festivaldrift.com">
                  festivaldrift.com
                </StyledLinks>
              </Caption>
            </Wrapper>
          </Project>
        </Waypoint>
      </Container>
    </>
  )
}

export default dev
