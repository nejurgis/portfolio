import React from "react"
import styled from "@emotion/styled"

const Section = styled.section`
  background-color: rgb(51, 51, 51);
  width: 100vw;
  padding: 0 2rem 2rem;
  font-size: 2rem;
  color: white;
  line-height: 2.8rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  word-wrap: break-word;
  word-break: break-word;
  letter-spacing: 0.025rem;
`
const Links = styled.a`
  color: white;
  background-color: blue;
  text-decoration: none;
  &:visited {
    text-decoration: none;
  }
  &:focus {
    text-decoration: none;
  }
`

const TitleWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid white;
  padding: 2rem;
  font-size: 4rem;
  line-height: 4rem;
`
const Text = styled.p``

const WebSectionComponent = () => {
  return (
    <>
      <Section>
        <TitleWrapper>About this Website</TitleWrapper>
        <p>
          This Website has a mobile and a desktop version. The mobile version
          was built in React/Gatsby by using the one and only ThreeJS, while the
          Desktop version features a live heatmap of all the current visitors
          cursor positions. I achieved that by writing and separately deploying
          a small API that serves this data over a socket stream. So
          'technically' speaking it's a full stack app.
        </p>
        <TitleWrapper>Tiziana Kruger</TitleWrapper>
        <p>
          This was a website for a photographer who asked me to <i>not</i> make
          another flat photography portfolio website. Since she was open to
          experiments we tried out this 3D carousel library. I remember having
          lots of difficulties in making it mobile friendly.
        </p>
        <Links href="http://tizianakruger.com">tizianakruger.com</Links>
        <TitleWrapper>Lexicon</TitleWrapper>
        <p>
          One of my first websites that I deployed online was this dictionary of
          keywords that we co-wrote with my classmates while studying at the
          Gerrit Rietveld Academy. It's a lexicon / collection of terms for
          describing contemporary graphic design. In this case I really wanted
          to have a snappy search function, where the results show up as you
          type the words. I used elastic search library for this one. It's a bit
          buggy but it's fine.
        </p>
        <Links href="http://lexicon.surge.sh">lexicon.surge.sh</Links>
      </Section>
    </>
  )
}

export default WebSectionComponent
