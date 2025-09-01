import React from 'react'
import SuppliersSummaryOverView from './SuppliersSummaryOverView'
import SupplierFinancialAnalysis from './SupplierFinancialAnalysis'
import RawMaterialPurchaseAnalysis from './RawMaterialPurchaseAnalysis'

function LandingPage() {
  return (
    <div>
      <SuppliersSummaryOverView />
      <SupplierFinancialAnalysis />
      <RawMaterialPurchaseAnalysis />
    </div>
  )
}

export default LandingPage