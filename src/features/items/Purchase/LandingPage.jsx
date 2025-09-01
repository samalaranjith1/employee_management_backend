import React from 'react'
import ItemsSupplierPurchaseDetails from './ItemsSupplierPurchaseDetails'
import ItemsPurchaseTrendAnalysis from './ItemsPurchaseTrendAnalysis'
import ItemsPurchaseAnalyticsOverView from './ItemsPurchaseAnalyticsOverView'

function LandingPage() {
  return (
    <div>
      <ItemsSupplierPurchaseDetails />
      <ItemsPurchaseTrendAnalysis />
      <ItemsPurchaseAnalyticsOverView />
    </div>
  )
}

export default LandingPage