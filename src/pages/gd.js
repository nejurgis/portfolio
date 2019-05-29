import styled from "@emotion/styled"
import React from "react"
import BTC from "../assets/hen.jpg"
import vid from "../assets/vid.webm"
import drift from "../assets/drift.webm"
import lexicon from "../assets/lexicon.webm"
import diff from "../assets/diff.webm"
import ReactPlayer from "react-player"

const List = styled.ul`
  grid-gap: 2rem 2rem;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  display: grid;
  padding: 0;

  color: white;
  line-height: 2.8rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  word-wrap: break-word;
  word-break: break-word;
  letter-spacing: 0.025rem;
`

const Container = styled.div`
  max-width: 100vw;
  padding: 10rem;
  margin: 0 auto;
`

const Title = styled.div`
  width: 100%;
  border-bottom: 1px solid white;
  padding: 2rem;
  font-size: 4rem;
  line-height: 4rem;
`

const Project = styled.section``
const Wrapper = styled.div`
  margin-top: 4em;
  display: flex;
  flex-direction: column;
`
const ImageSection = styled.div`
  background: center center;
  background-repeat: no-repeat;
  background-image: url(${BTC});
  background-size: contain;
  height: 90vh;
  box-shadow: 0 0 30px black;
`

const Image = styled.div``

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

const Player = styled(props => <ReactPlayer />)`
  margin-top: 1rem;
`

const StyledPlayer = styled(props => <ReactPlayer {...props} />)`
  width: 120%;
  height: 100%;
  margin: 0 auto;
  box-shadow: 0 0 30px black;
`

function gd() {
  return (
    <>
      <Container>
        <Project>
          <Wrapper>
            <ImageSection> </ImageSection>

            <Caption>
              <h3>TIZIANA KRÜGER</h3>
              <p>BUILT FOR T.KRÜGER, CODE/DESIGN, JULY 2017</p>
              <p>not online yet</p>
            </Caption>
          </Wrapper>
        </Project>
        <Project>
          <Wrapper>
            <StyledPlayer
              url={vid}
              playing
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
        <Project>
          <Wrapper>
            <StyledPlayer
              url={lexicon}
              playing
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
        <Project>
          <Wrapper>
            <StyledPlayer
              url={drift}
              playing
              loop={true}
              preload="true"

              // controls
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
      </Container>
    </>
  )
}

export default gd
