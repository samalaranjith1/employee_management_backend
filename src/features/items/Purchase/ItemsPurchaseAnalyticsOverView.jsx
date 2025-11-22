"use client";

import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import PurchaseAnalyticsCards from "@/components/common/items/cards/PurchaseAnalyticsCards";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { purchaseAnalyticsOverviewDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
import { useItemHealth } from "@/services/item-service";
import { useItemsContext } from "@/contexts/ItemsContext";
import { IconPackage } from "@tabler/icons-react";

export default function ItemsPurchaseAnalyticsOverview() {
  const { startDate, endDate } = useItemsContext();
  return (
    <ServiceRenderer
      queryHook={useItemHealth}
      queryKey={["itemHealth", { startdt: startDate, enddt: endDate }]}
      queryFn={() =>
        useItemHealth({ startdt: startDate, enddt: endDate }).queryFn
      }
      queryArgs={[74, { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 }]}
      formatter={purchaseAnalyticsOverviewDataFormatter}
      shimmerCount={4}
    >
      {(cards) => (
        <Card className="p-4 bg-white rounded-4 shadow-sm">
          {/* Header */}
          <Row className="align-items-center mb-3">
            <Col xs="auto">
                <div style={{
                  background: '#763ffa', // vivid green gradient
                  borderRadius: '12px',
                  padding: '8px',
                  display: 'inline-block'
                }}>
                  <IconPackage stroke={2} color="#fff" size={20} />
                </div>
            </Col>
            <Col>
              <h5 className=" mb-0" style={{fontWeight:700, fontSize:"18px", color:"#232425"}}>Purchase Analytics Overview</h5>
              {/* <small className="text-muted">
                Comprehensive purchase metrics across different time periods for{" "}
                <strong>GOLD DROP OIL</strong>
              </small> */}
            </Col>
          </Row>
          {/* Cards */}
          <PurchaseAnalyticsCards data={cards} />
        </Card>
      )}
    </ServiceRenderer>
  );
}

// "use client";

// import React from "react";
// import { Card, Row, Col } from "react-bootstrap";
// import { purchaseAnalyticsOverviewDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
// import { useItemHealth } from "@/services/item-service";
// import { useItemsContext } from "@/contexts/ItemsContext";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";

// export default function ItemsPurchaseAnalyticsOverView() {
//   const { startDate, endDate } = useItemsContext();

//   return (
//     <ServiceRenderer
//       queryHook={useItemHealth}
//       queryKey={["itemHealth", { startdt: startDate, enddt: endDate }]}
//       queryFn={() =>
//         useItemHealth({ startdt: startDate, enddt: endDate }).queryFn
//       }
//       queryArgs={[75,{ startdt: startDate, enddt: endDate }]}
//       formatter={(data) => purchaseAnalyticsOverviewDataFormatter(data)}
//       shimmerCount={4}
//     >
//       {(cards) => (
//         <Card
//           className="border-0 shadow-sm p-3 rounded-4"
//           style={{ background: "#fff" }}
//         >
//           <div className="d-flex align-items-center mb-2">
//             <div
//               className="d-flex align-items-center justify-content-center me-2"
//               style={{
//                 width: "36px",
//                 height: "36px",
//                 borderRadius: "12px",
//                 background: "#EEF2FF",
//               }}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="18"
//                 height="18"
//                 fill="#5A5FEF"
//                 viewBox="0 0 16 16"
//               >
//                 <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0Zm0 15A7 7 0 1 1 15 8 7 7 0 0 1 8 15Zm-.5-4.5v-4h1v4Zm0-5V5h1v.5Z" />
//               </svg>
//             </div>
//             <div>
//               <h5 className="mb-0 fw-bold">Purchase Analytics Overview</h5>
//               <p className="mb-0 text-muted" style={{ fontSize: "0.85rem" }}>
//                 Comprehensive purchase metrics across different time periods for
//                 GOLD DROP OIL
//               </p>
//             </div>
//           </div>

//           <Row className="g-3">
//             {cards.map((card) => (
//               <Col md={3} sm={6} xs={12} key={card.key}>
//                 <Card
//                   className="border-0 rounded-4 p-3"
//                   style={{ backgroundColor: card.bgColor, height: "100%" }}
//                 >
//                   <div className="d-flex align-items-center mb-3">
//                     <div
//                       className="me-2 d-flex align-items-center justify-content-center"
//                       style={{
//                         width: "32px",
//                         height: "32px",
//                         borderRadius: "8px",
//                         backgroundColor: card.borderColor,
//                         color: "#fff",
//                       }}
//                     >
//                       {card.icon}
//                     </div>
//                     <h6 className="mb-0 fw-semibold">{card.label}</h6>
//                   </div>
//                   <div className="mb-2">
//                     <p className="text-muted mb-0">Purchase Quantity</p>
//                     <p className="fw-bold fs-5 mb-0">
//                       {card.quantity.toLocaleString()} GM
//                     </p>
//                   </div>
//                   <div className="mb-2">
//                     <p className="text-muted mb-0">Purchase Price</p>
//                     <p className="fw-bold fs-5 mb-0">
//                       ₹{card.price.toLocaleString()}
//                     </p>
//                   </div>
//                   <div>
//                     <p
//                       className="mb-0 fw-bold"
//                       style={{ color: card.textColor }}
//                     >
//                       ₹{card.avgPrice.toFixed(2)}/GM
//                     </p>
//                   </div>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </Card>
//       )}
//     </ServiceRenderer>
//   );
// }

// "use client";

// import React from "react";
// import { Card, Row, Col } from "react-bootstrap";
// import { purchaseAnalyticsOverviewDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";

// export default function ItemsPurchaseAnalyticsOverView({
//   apiData = {
//     etag: null,
//     today: {
//       dt: "2025-09-01",
//       startDate: "2025-09-01",
//       endDate: "2025-09-01",
//       purchaseQuantity: 0,
//       purchaseValue: 0,
//       purchaseItemCount: 0,
//       supplierCount: 0,
//       consumptionQuantity: 30500,
//       consumptionValue: 8235,
//       consumedItemCount: 75,
//       consumedDepartmentCount: 3,
//       consumptionOpeningQuantity: 0,
//       consumptionOpeningValue: 0,
//       purchaseClosingQuantity: 0,
//       purchaseClosingValue: 0,
//       purchaseClosingItemCount: 0,
//       consumptionClosingQuantity: 0,
//       consumptionClosingValue: 0,
//       consumedClosingItemCount: 0,
//       consumedClosingDepartmentCount: 0,
//       leftOverStockValue: -6004.8,
//       startingStockValue: 2230.2,
//       saleQuantity: 0,
//       salePrice: 0,
//       netConsumptionQuantity: 30500,
//       netConsumptionValue: 8235,
//       saleToConsumptionQuantityDifference: -30500,
//       saleToConsumptionMargin: -8235,
//       saleToConsumptionMarginPercentage: -100,
//     },
//     yesterday: {
//       dt: "2025-08-31",
//       startDate: "2025-08-31",
//       endDate: "2025-08-31",
//       purchaseQuantity: 0,
//       purchaseValue: 0,
//       purchaseItemCount: 0,
//       supplierCount: 0,
//       consumptionQuantity: 0,
//       consumptionValue: 0,
//       consumedItemCount: 0,
//       consumedDepartmentCount: 0,
//       consumptionOpeningQuantity: 0,
//       consumptionOpeningValue: 0,
//       purchaseClosingQuantity: 0,
//       purchaseClosingValue: 0,
//       purchaseClosingItemCount: 0,
//       consumptionClosingQuantity: 0,
//       consumptionClosingValue: 0,
//       consumedClosingItemCount: 0,
//       consumedClosingDepartmentCount: 0,
//       leftOverStockValue: 2230.2,
//       startingStockValue: 2230.2,
//       saleQuantity: 194.08,
//       salePrice: 52.4,
//       netConsumptionQuantity: 0,
//       netConsumptionValue: 0,
//       saleToConsumptionQuantityDifference: 194.08,
//       saleToConsumptionMargin: 52.4,
//       saleToConsumptionMarginPercentage: 100,
//     },
//     thisWeek: {
//       dt: "2025-09-01",
//       startDate: "2025-09-01",
//       endDate: "2025-09-01",
//       purchaseQuantity: 0,
//       purchaseValue: 0,
//       purchaseItemCount: 0,
//       supplierCount: 0,
//       consumptionQuantity: 30500,
//       consumptionValue: 8235,
//       consumedItemCount: 75,
//       consumedDepartmentCount: 3,
//       consumptionOpeningQuantity: 0,
//       consumptionOpeningValue: 0,
//       purchaseClosingQuantity: 0,
//       purchaseClosingValue: 0,
//       purchaseClosingItemCount: 0,
//       consumptionClosingQuantity: 0,
//       consumptionClosingValue: 0,
//       consumedClosingItemCount: 0,
//       consumedClosingDepartmentCount: 0,
//       leftOverStockValue: -6004.8,
//       startingStockValue: 2230.2,
//       saleQuantity: 0,
//       salePrice: 0,
//       netConsumptionQuantity: 30500,
//       netConsumptionValue: 8235,
//       saleToConsumptionQuantityDifference: -30500,
//       saleToConsumptionMargin: -8235,
//       saleToConsumptionMarginPercentage: -100,
//     },
//     lastWeek: {
//       dt: "2025-08-31",
//       startDate: "2025-08-25",
//       endDate: "2025-08-31",
//       purchaseQuantity: 0,
//       purchaseValue: 0,
//       purchaseItemCount: 0,
//       supplierCount: 0,
//       consumptionQuantity: 0,
//       consumptionValue: 0,
//       consumedItemCount: 0,
//       consumedDepartmentCount: 0,
//       consumptionOpeningQuantity: 0,
//       consumptionOpeningValue: 0,
//       purchaseClosingQuantity: 0,
//       purchaseClosingValue: 0,
//       purchaseClosingItemCount: 0,
//       consumptionClosingQuantity: 0,
//       consumptionClosingValue: 0,
//       consumedClosingItemCount: 0,
//       consumedClosingDepartmentCount: 0,
//       leftOverStockValue: 2230.2,
//       startingStockValue: 2230.2,
//       saleQuantity: 1400.94,
//       salePrice: 378.25,
//       netConsumptionQuantity: 0,
//       netConsumptionValue: 0,
//       saleToConsumptionQuantityDifference: 1400.94,
//       saleToConsumptionMargin: 378.25,
//       saleToConsumptionMarginPercentage: 100,
//     },
//     thisMonth: {
//       dt: "2025-09-01",
//       startDate: "2025-09-01",
//       endDate: "2025-09-01",
//       purchaseQuantity: 0,
//       purchaseValue: 0,
//       purchaseItemCount: 0,
//       supplierCount: 0,
//       consumptionQuantity: 30500,
//       consumptionValue: 8235,
//       consumedItemCount: 75,
//       consumedDepartmentCount: 3,
//       consumptionOpeningQuantity: 0,
//       consumptionOpeningValue: 0,
//       purchaseClosingQuantity: 0,
//       purchaseClosingValue: 0,
//       purchaseClosingItemCount: 0,
//       consumptionClosingQuantity: 0,
//       consumptionClosingValue: 0,
//       consumedClosingItemCount: 0,
//       consumedClosingDepartmentCount: 0,
//       leftOverStockValue: -6004.8,
//       startingStockValue: 2230.2,
//       saleQuantity: 0,
//       salePrice: 0,
//       netConsumptionQuantity: 30500,
//       netConsumptionValue: 8235,
//       saleToConsumptionQuantityDifference: -30500,
//       saleToConsumptionMargin: -8235,
//       saleToConsumptionMarginPercentage: -100,
//     },
//   },
// }) {
//   const cards = purchaseAnalyticsOverviewDataFormatter(apiData);

//   return (
//     <Card
//       className="border-0 shadow-sm p-3 rounded-4"
//       style={{ background: "#fff" }}
//     >
//       <div className="d-flex align-items-center mb-2">
//         <div
//           className="d-flex align-items-center justify-content-center me-2"
//           style={{
//             width: "36px",
//             height: "36px",
//             borderRadius: "12px",
//             background: "#EEF2FF",
//           }}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="18"
//             height="18"
//             fill="#5A5FEF"
//             viewBox="0 0 16 16"
//           >
//             <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0Zm0 15A7 7 0 1 1 15 8 7 7 0 0 1 8 15Zm-.5-4.5v-4h1v4Zm0-5V5h1v.5Z" />
//           </svg>
//         </div>
//         <div>
//           <h5 className="mb-0 fw-bold">Purchase Analytics Overview</h5>
//           <p className="mb-0 text-muted" style={{ fontSize: "0.85rem" }}>
//             Comprehensive purchase metrics across different time periods for
//             GOLD DROP OIL
//           </p>
//         </div>
//       </div>

//       <Row className="g-3">
//         {cards.map((card) => (
//           <Col md={3} sm={6} xs={12} key={card.key}>
//             <Card
//               className="border-0 rounded-4 p-3"
//               style={{ backgroundColor: card.bgColor, height: "100%" }}
//             >
//               <div className="d-flex align-items-center mb-3">
//                 <div
//                   className="me-2 d-flex align-items-center justify-content-center"
//                   style={{
//                     width: "32px",
//                     height: "32px",
//                     borderRadius: "8px",
//                     backgroundColor: card.borderColor,
//                     color: "#fff",
//                   }}
//                 >
//                   {card.icon}
//                 </div>
//                 <h6 className="mb-0 fw-semibold">{card.label}</h6>
//               </div>
//               <div className="mb-2">
//                 <p className="text-muted mb-0">Purchase Quantity</p>
//                 <p className="fw-bold fs-5 mb-0">
//                   {card.quantity.toLocaleString()} GM
//                 </p>
//               </div>
//               <div className="mb-2">
//                 <p className="text-muted mb-0">Purchase Price</p>
//                 <p className="fw-bold fs-5 mb-0">
//                   ₹{card.price.toLocaleString()}
//                 </p>
//               </div>
//               <div>
//                 <p className="mb-0 fw-bold" style={{ color: card.textColor }}>
//                   ₹{card.avgPrice.toFixed(2)}/GM
//                 </p>
//               </div>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Card>
//   );
// }
