import React from 'react'
import SuppliersSummaryOverView from './SuppliersSummaryOverView'
import SupplierFinancialAnalysis from './SupplierFinancialAnalysis'
import RawMaterialPurchaseAnalysis from './RawMaterialPurchaseAnalysis'
import MainComponentHoldingCard from '@/components/common/MainComponentHoldingCard'

function LandingPage() {
  return (
    <div style={{marginTop:'-0.5rem'}}>
      <MainComponentHoldingCard>
        <SuppliersSummaryOverView />
      </MainComponentHoldingCard>
      <MainComponentHoldingCard>
        <SupplierFinancialAnalysis />
      </MainComponentHoldingCard>
      <MainComponentHoldingCard>
        <RawMaterialPurchaseAnalysis />
      </MainComponentHoldingCard>
    </div>
  )
}

export default LandingPage