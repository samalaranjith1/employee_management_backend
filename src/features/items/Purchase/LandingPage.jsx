import React from 'react'
import ItemsSupplierPurchaseDetails from './ItemsSupplierPurchaseDetails'
import ItemsPurchaseTrendAnalysis from './ItemsPurchaseTrendAnalysis'
import ItemsPurchaseAnalyticsOverView from './ItemsPurchaseAnalyticsOverView'

function LandingPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px',backgroundColor:'#eee'}}>
      <ItemsSupplierPurchaseDetails />
      <ItemsPurchaseTrendAnalysis />
      <ItemsPurchaseAnalyticsOverView />
    </div>
  )
}

export default LandingPage