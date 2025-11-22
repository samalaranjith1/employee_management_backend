import React from 'react'
import ProductSummaryOverView from './ProductSummaryOverView'
import ProductTrendAnalysis from './ProductTrendAnalysis'
import ProductsIngreidentAnalysis from './ProductsIngreidentAnalysis'
import MainComponentHoldingCard from '@/components/common/MainComponentHoldingCard'

function LandingPage() {
  return (
    <div style={{ marginTop: '-0.5rem' }}>
      <MainComponentHoldingCard>
        <ProductSummaryOverView />
      </MainComponentHoldingCard>
      <MainComponentHoldingCard>
        <ProductTrendAnalysis />
      </MainComponentHoldingCard>
      <MainComponentHoldingCard>
        <ProductsIngreidentAnalysis />
      </MainComponentHoldingCard>
    </div>
  )
}

export default LandingPage