import { PlaceholdersAndVanishInputDemo } from '@/components/Home/PlaceHolderVanish'
import PredictiveAnalysis from '@/components/Home/PredictiveAnalysis'
import Layout from '@/components/shared/Layout'
import React from 'react'

const Analysis = () => {
  return (
    <Layout className='pb-16'>
      <PlaceholdersAndVanishInputDemo />
      <PredictiveAnalysis/>
    </Layout>
  )
}

export default Analysis