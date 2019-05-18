import React from 'react'
import Layout from '../../components/layout';

import "../../components/main.css"
import SelectedPoster from "../../images/SelectedPoster.jpg"

const Selected = () => {
  return (
    <Layout>
      <header>
        <h1 className="heading-primary">Selected Campaign</h1>
        <p>With my dear friend Deima we made and Identity for the Yearly Gerrit Rietveld Academie Show of Selected student works </p>
      </header>
      <img style={{width:'20rem', margin: '0 auto'}} src={SelectedPoster} alt=""/>
    </Layout>
  )
}

export default Selected
