import React from "react"
import styled from "@emotion/styled"
import vid from "../assets/vid.webm"
import drift from "../assets/drift.webm"
import lexicon from "../assets/lexicon.webm"
import diff from "../assets/diff.webm"
import ReactPlayer from "react-player"

import { Link, graphql, useStaticQuery } from "gatsby"
import BackgroundSection from "../components/BackgroundSection"
// Styles disappear on reload

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  padding: 2rem;
  font-size: 1.7rem;
  color: inherit;
  text-decoration: none;
  /* @media (max-width: 800px) {
    position: absolute;
    top: 0;
    left: 0;
  } */
`
const Homelink = styled(props => <Link {...props} />)`
  text-decoration: none;
  color: black;

  // transition: background-color 0.35s ease;
  transition: background-color 200ms cubic-bezier(0.08, 0.69, 0.83, 0.67);

  &:hover {
    text-decoration: underline;
    color: red;
    background-color: blue;
  }
`
const Title = styled.h3`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`
const BgWrapper = styled.div`
  > .bg {
    display: none;
    @media (max-width: 800px) {
      display: block;
      margin: 0;
      padding-top: calc(984 / 1528 * 100%);
    }
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
  padding: 15.5rem;
  margin: 0 auto;

  @media (max-width: 1200px) {
    padding: 0;
  }
  @media (max-width: 800px) {
    padding: 0;
  }
`

const Project = styled.section`
  @media (min-width: 800px) {
    -webkit-box-align: center;
    padding: 1rem 1rem 3rem 1rem;
  }

  @media (max-width: 800px) {
    padding: 0 0 0.5rem 0;
  }
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  width: auto;
  height: auto;
  @media (max-width: 800px) {
    margin: 0;
  }
`

const Caption = styled.figcaption`
  text-align: center;
  font-size: 1.7rem;
  margin-top: 1rem;
  margin-bottom: 5rem;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @media (max-width: 800px) {
    margin-bottom: 0;
    padding: 0.5rem;
  }
`

const StyledLinks = styled.a`
  font-size: 1.7rem;
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
export const fluidImage = graphql`
  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
`
const dev = () => {
  const data = useStaticQuery(graphql`
    query {
      tiziana: file(relativePath: { eq: "tiziana.png" }) {
        ...fluidImage
      }
      selected: file(relativePath: { eq: "selected.jpg" }) {
        ...fluidImage
      }
      lexicon: file(relativePath: { eq: "lexicon.png" }) {
        ...fluidImage
      }
      differement: file(relativePath: { eq: "differement.png" }) {
        ...fluidImage
      }
      drift: file(relativePath: { eq: "drift.png" }) {
        ...fluidImage
      }
    }
  `)

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
        <Project>
          <Wrapper>
            <BgWrapper>
              <BackgroundSection
                img={data.tiziana.childImageSharp.fluid}
                className="Container-bravo"
              />
            </BgWrapper>

            <StyledPlayer
              width="100%"
              height="100%"
              url={vid}
              playing
              loop={true}
              preload="true"
              controls
            />

            <Caption>
              <Title>TIZIANA KRÜGER</Title>
              <p>BUILT FOR T.KRÜGER, CODE/DESIGN, JULY 2017</p>
              <StyledLinks href="http://tizianakruger.com">
                tizianakruger.com
              </StyledLinks>
            </Caption>
          </Wrapper>
        </Project>
        <Project>
          <Wrapper>
            <BgWrapper>
              <BackgroundSection
                img={data.differement.childImageSharp.fluid}
                className="Container-bravo"
              />
            </BgWrapper>

            <StyledPlayer
              width="100%"
              height="100%"
              url={diff}
              playing
              loop={true}
              preload="true"
              controls
            />

            <Caption>
              <Title>DIFFEREMENT</Title>
              <p>
                BUILT FOR D.LANTINGA &amp; D.SMEDEMAN , CODE/DESIGN, MAY 2019
              </p>
              <p>not online yet</p>
            </Caption>
          </Wrapper>
        </Project>

        <Project>
          <Wrapper>
            <BgWrapper>
              <BackgroundSection
                img={data.lexicon.childImageSharp.fluid}
                className="Container-bravo"
              />
            </BgWrapper>
            <StyledPlayer
              width="100%"
              height="100%"
              url={lexicon}
              playing
              loop={true}
              preload="true"
              // controls
            />

            <Caption>
              <Title>Lexicon of Graphic Design</Title>
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

        <Project>
          <Wrapper>
            <BgWrapper>
              <BackgroundSection
                img={data.drift.childImageSharp.fluid}
                className="Container-bravo"
              />
            </BgWrapper>

            <StyledPlayer
              width="100%"
              height="100%"
              url={drift}
              playing
              loop={true}
              preload="true"
              controls
            />

            <Caption>
              <Title>Festival Drift</Title>
              <p>
                BUILT FOR FESTIVAL DRIFT, DESIGNED TOGETHER WITH W.JANG AND
                D.JASIULEVIČIŪTĖ, APRIL 2019
              </p>
              <StyledLinks href="http://festivaldrift.com">
                festivaldrift.nl
              </StyledLinks>
            </Caption>
          </Wrapper>
        </Project>
      </Container>
    </>
  )
}

export default dev
