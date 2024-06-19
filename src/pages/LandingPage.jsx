import React from 'react'
import Hero from '../components/LandingComponents/Hero'
import Features from '../components/LandingComponents/Features'

import About from '../components/LandingComponents/About'
import TrendingJobs from '../components/LandingComponents/TrendingJobs'
import Footer from '../components/LandingComponents/Footer'

const LandingPage = () => {
  return (
  <>
    <Hero/>
    <Features/>
    <About/>
    <TrendingJobs/>
    <Footer/>
  </>
  )
}

export default LandingPage