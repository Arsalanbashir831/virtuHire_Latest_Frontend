import React, { useEffect,useState } from 'react'
import PostureCorrection from '../components/PostureCorrection'
import SpeechToText from '../components/SpeechToText'

const AIQA = () => {
    
  return (
    <>
    <div className='grid grid-cols-2'>
    <PostureCorrection/>
    <SpeechToText />
    </div>
       
    </>
  )
}

export default AIQA