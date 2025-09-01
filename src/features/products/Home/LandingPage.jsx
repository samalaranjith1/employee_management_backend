import React from 'react'
import ProductSummaryOverView from './ProductSummaryOverView'
import ProductTrendAnalysis from './ProductTrendAnalysis'
import ProductsIngreidentAnalysis from './ProductsIngreidentAnalysis'

function LandingPage() {
  return (
    <div>
      <ProductSummaryOverView />
      <ProductTrendAnalysis />
      <ProductsIngreidentAnalysis />
    </div>
  )
}

export default LandingPage