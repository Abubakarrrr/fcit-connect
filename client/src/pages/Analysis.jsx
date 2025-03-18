import { PlaceholdersAndVanishInputDemo } from '@/components/Home/PlaceHolderVanish'
import PredictiveAnalysis from '@/components/Home/PredictiveAnalysis'
import { PredictiveAnalysisTool } from '@/components/Home/PromptAnalysis'
import Layout from '@/components/shared/Layout'
import React from 'react'

const Analysis = () => {
  return (
    <Layout className=''>
      <PredictiveAnalysisTool/>
      {/* <PlaceholdersAndVanishInputDemo /> */}
      <PredictiveAnalysis/>
    </Layout>
  )
}

export default Analysis