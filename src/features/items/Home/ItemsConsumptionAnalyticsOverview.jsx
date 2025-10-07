"use client";
import React, { useRef } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { itemHealthDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
import { useItemHealth } from "@/services/item-service";
import { useItemsContext } from "@/contexts/ItemsContext";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import ItemsConsumptionAnalyticsOverviewCards from "@/components/common/items/cards/ItemsConsumptionAnalyticsOverviewCards";
import ComponentHeader from "@/components/common/ComponentHeader";
import { IconPackage } from "@tabler/icons-react";

const ItemsConsumptionAnalyticsOverview = () => {
  const { startDate, endDate } = useItemsContext();
  const scrollRef = useRef(null);

  return (
    <Container fluid className="bg-white">
      <ComponentHeader
        title="Consumption Analytics Overview"
        description="Comprehensive consumption metrics across different time periods for GOLD DROP OIL"
        titleColor="#000"
        cardBgColor="none"
        isShowArrows={true}
        scrollRef={scrollRef}
        isExpandable={false}
        titleIcon={<div style={{
          background: '#8f1efb', // vivid green gradient
          borderRadius: '12px',
          padding: '8px',
          display: 'inline-block'
        }}>
          <IconPackage stroke={2} color="#fff" size={20} />
        </div>}
      />

      <ServiceRenderer
        queryHook={useItemHealth}
        queryKey={["itemHealth", { startdt: startDate, enddt: endDate }]}
        queryFn={() =>
          useItemHealth({
            startdt: startDate,
            enddt: endDate,
          }).queryFn
        }
        queryArgs={[
          74,
          { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
        ]}
        formatter={itemHealthDataFormatter}
        shimmerCount={4}
      >
        {(analytics) => (
          <div
            ref={scrollRef}
            className="d-flex"
            style={{
              gap: "16px",
              paddingBottom: "0.5rem",
              overflowX: "auto",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {analytics.map((item, idx) => (
              <ItemsConsumptionAnalyticsOverviewCards key={idx} item={item} />
            ))}
          </div>
        )}
      </ServiceRenderer>
    </Container>
  );
};

export default ItemsConsumptionAnalyticsOverview;

// "use client";

// import React from "react";
// import { Card, Row, Col } from "react-bootstrap";
// import { itemHealthDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
// import { useItemHealth } from "@/services/item-service";
// import { useItemsContext } from "@/contexts/ItemsContext";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";

// const ItemsConsumptionAnalyticsOverview = () => {
//   const { startDate, endDate } = useItemsContext();

//   return (
//     <ServiceRenderer
//       queryHook={useItemHealth}
//       queryKey={["itemHealth", { startdt: startDate, enddt: endDate }]}
//       queryFn={() =>
//         useItemHealth({
//           startdt: startDate,
//           enddt: endDate,
//         }).queryFn
//       }
//       queryArgs={[75,{ startdt: startDate, enddt: endDate ,outlet:1,userId:7}]}
//       formatter={itemHealthDataFormatter}
//       shimmerCount={4}
//     >
//       {(analytics) => (
//         <div
//           style={{ background: "#fff", padding: "24px", borderRadius: "12px" }}
//         >
//           {/* Header */}
//           <h5
//             style={{
//               fontWeight: "600",
//               fontSize: "18px",
//               display: "flex",
//               alignItems: "center",
//               marginBottom: "4px",
//             }}
//           >
//             <span
//               style={{
//                 fontSize: "20px",
//                 marginRight: "8px",
//                 display: "inline-flex",
//                 alignItems: "center",
//               }}
//             >
//               📦
//             </span>
//             Consumption Analytics Overview
//           </h5>
//           <p
//             style={{
//               color: "#6c757d",
//               marginBottom: "24px",
//               fontSize: "14px",
//             }}
//           >
//             Comprehensive consumption metrics across different time periods for{" "}
//             <b>GOLD DROP OIL</b>
//           </p>

//           {/* Cards */}
//           <Row>
//             {analytics.map((item, index) => (
//               <Col key={index} md={3} sm={6} xs={12} className="mb-3">
//                 <Card
//                   style={{
//                     borderRadius: "12px",
//                     boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
//                     padding: "16px",
//                     transition: "all 0.2s ease-in-out",
//                     height: "100%",
//                   }}
//                 >
//                   {/* Title with Icon */}
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       marginBottom: "12px",
//                     }}
//                   >
//                     <span
//                       style={{
//                         background: item.iconBg,
//                         width: "34px",
//                         height: "34px",
//                         borderRadius: "8px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         marginRight: "8px",
//                       }}
//                     >
//                       {item.icon}
//                     </span>
//                     <span style={{ fontWeight: "600", fontSize: "14px" }}>
//                       {item.title}
//                     </span>
//                   </div>

//                   {/* Consumption Box */}
//                   <Card
//                     style={{
//                       border: "0",
//                       borderRadius: "10px",
//                       background: "#F8F9FA",
//                       marginBottom: "12px",
//                       padding: "12px",
//                     }}
//                   >
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <div>
//                         <div style={{ fontWeight: "600", fontSize: "16px" }}>
//                           {item.data?.consumptionQuantity || 0}
//                         </div>
//                         <small style={{ color: "#6c757d" }}>GM</small>
//                       </div>
//                       <div>
//                         <div style={{ fontWeight: "600", fontSize: "16px" }}>
//                           ₹{item.data?.consumptionValue || 0}
//                         </div>
//                         <small style={{ color: "#6c757d" }}>Total</small>
//                       </div>
//                     </div>
//                   </Card>

//                   {/* Net Consumption Box */}
//                   <Card
//                     style={{
//                       border: "0",
//                       borderRadius: "10px",
//                       background: "#FFE6E6",
//                       marginBottom: "12px",
//                       padding: "12px",
//                     }}
//                   >
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <div>
//                         <div style={{ fontWeight: "600", fontSize: "16px" }}>
//                           {item.data?.netConsumptionQuantity || 0}
//                         </div>
//                         <small style={{ color: "#6c757d" }}>GM</small>
//                       </div>
//                       <div>
//                         <div style={{ fontWeight: "600", fontSize: "16px" }}>
//                           ₹{item.data?.netConsumptionValue || 0}
//                         </div>
//                         <small style={{ color: "#6c757d" }}>Total</small>
//                       </div>
//                     </div>
//                   </Card>

//                   {/* Utilization */}
//                   <div
//                     style={{
//                       color: "#28a745",
//                       fontWeight: "600",
//                       fontSize: "13px",
//                     }}
//                   >
//                     Utilization Rate {item.utilizationRate}
//                   </div>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </div>
//       )}
//     </ServiceRenderer>
//   );
// };

// export default ItemsConsumptionAnalyticsOverview;

// // import React from "react";
// // import { Card, Row, Col } from "react-bootstrap";
// // import { itemHealthDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
// // import { useItemsContext } from "@/contexts/ItemsContext";

// // const ItemsConsumptionAnalyticsOverview = ({
// //   apiResponse = {
// //     etag: null,
// //     today: {
// //       dt: "2025-08-28",
// //       startDate: "2025-08-28",
// //       endDate: "2025-08-28",
// //       purchaseQuantity: 0.0,
// //       purchaseValue: 0.0,
// //       purchaseItemCount: 0,
// //       supplierCount: 0,
// //       consumptionQuantity: 0.0,
// //       consumptionValue: 0.0,
// //       consumedItemCount: 0,
// //       consumedDepartmentCount: 0,
// //       consumptionOpeningQuantity: 0.0,
// //       consumptionOpeningValue: 0.0,
// //       purchaseClosingQuantity: 0.0,
// //       purchaseClosingValue: 0.0,
// //       purchaseClosingItemCount: 0,
// //       consumptionClosingQuantity: 0.0,
// //       consumptionClosingValue: 0.0,
// //       consumedClosingItemCount: 0,
// //       consumedClosingDepartmentCount: 0,
// //       leftOverStockValue: 2230.2,
// //       startingStockValue: 2230.2,
// //       saleQuantity: 0.0,
// //       salePrice: 0.0,
// //       netConsumptionQuantity: 0.0,
// //       netConsumptionValue: 0.0,
// //       saleToConsumptionQuantityDifference: 0.0,
// //       saleToConsumptionMargin: 0.0,
// //       saleToConsumptionMarginPercentage: 100.0,
// //     },
// //     yesterday: {
// //       dt: "2025-08-27",
// //       startDate: "2025-08-27",
// //       endDate: "2025-08-27",
// //       purchaseQuantity: 0.0,
// //       purchaseValue: 0.0,
// //       purchaseItemCount: 0,
// //       supplierCount: 0,
// //       consumptionQuantity: 0.0,
// //       consumptionValue: 0.0,
// //       consumedItemCount: 0,
// //       consumedDepartmentCount: 0,
// //       consumptionOpeningQuantity: 0.0,
// //       consumptionOpeningValue: 0.0,
// //       purchaseClosingQuantity: 0.0,
// //       purchaseClosingValue: 0.0,
// //       purchaseClosingItemCount: 0,
// //       consumptionClosingQuantity: 0.0,
// //       consumptionClosingValue: 0.0,
// //       consumedClosingItemCount: 0,
// //       consumedClosingDepartmentCount: 0,
// //       leftOverStockValue: 2230.2,
// //       startingStockValue: 2230.2,
// //       saleQuantity: 44.59,
// //       salePrice: 12.04,
// //       netConsumptionQuantity: 0.0,
// //       netConsumptionValue: 0.0,
// //       saleToConsumptionQuantityDifference: 44.59,
// //       saleToConsumptionMargin: 12.04,
// //       saleToConsumptionMarginPercentage: 100.0,
// //     },
// //     thisWeek: {
// //       dt: "2025-08-28",
// //       startDate: "2025-08-25",
// //       endDate: "2025-08-28",
// //       purchaseQuantity: 0.0,
// //       purchaseValue: 0.0,
// //       purchaseItemCount: 0,
// //       supplierCount: 0,
// //       consumptionQuantity: 0.0,
// //       consumptionValue: 0.0,
// //       consumedItemCount: 0,
// //       consumedDepartmentCount: 0,
// //       consumptionOpeningQuantity: 0.0,
// //       consumptionOpeningValue: 0.0,
// //       purchaseClosingQuantity: 0.0,
// //       purchaseClosingValue: 0.0,
// //       purchaseClosingItemCount: 0,
// //       consumptionClosingQuantity: 0.0,
// //       consumptionClosingValue: 0.0,
// //       consumedClosingItemCount: 0,
// //       consumedClosingDepartmentCount: 0,
// //       leftOverStockValue: 2230.2,
// //       startingStockValue: 2230.2,
// //       saleQuantity: 448.33,
// //       salePrice: 121.05,
// //       netConsumptionQuantity: 0.0,
// //       netConsumptionValue: 0.0,
// //       saleToConsumptionQuantityDifference: 448.33,
// //       saleToConsumptionMargin: 121.05,
// //       saleToConsumptionMarginPercentage: 100.0,
// //     },
// //     lastWeek: {
// //       dt: "2025-08-24",
// //       startDate: "2025-08-18",
// //       endDate: "2025-08-24",
// //       purchaseQuantity: 5000.0,
// //       purchaseValue: 1350.0,
// //       purchaseItemCount: 75,
// //       supplierCount: 1,
// //       consumptionQuantity: 1510.0,
// //       consumptionValue: 407.7,
// //       consumedItemCount: 75,
// //       consumedDepartmentCount: 6,
// //       consumptionOpeningQuantity: 0.0,
// //       consumptionOpeningValue: 0.0,
// //       purchaseClosingQuantity: 0.0,
// //       purchaseClosingValue: 0.0,
// //       purchaseClosingItemCount: 0,
// //       consumptionClosingQuantity: 0.0,
// //       consumptionClosingValue: 0.0,
// //       consumedClosingItemCount: 0,
// //       consumedClosingDepartmentCount: 0,
// //       leftOverStockValue: 2230.2,
// //       startingStockValue: 1287.9,
// //       saleQuantity: 1371.42,
// //       salePrice: 370.28,
// //       netConsumptionQuantity: 1510.0,
// //       netConsumptionValue: 407.7,
// //       saleToConsumptionQuantityDifference: -138.58,
// //       saleToConsumptionMargin: -37.42,
// //       saleToConsumptionMarginPercentage: -9.18,
// //     },
// //     thisMonth: {
// //       dt: "2025-08-28",
// //       startDate: "2025-08-01",
// //       endDate: "2025-08-28",
// //       purchaseQuantity: 10000.0,
// //       purchaseValue: 2700.0,
// //       purchaseItemCount: 75,
// //       supplierCount: 2,
// //       consumptionQuantity: 6240.0,
// //       consumptionValue: 1684.8,
// //       consumedItemCount: 75,
// //       consumedDepartmentCount: 35,
// //       consumptionOpeningQuantity: 0.0,
// //       consumptionOpeningValue: 0.0,
// //       purchaseClosingQuantity: 0.0,
// //       purchaseClosingValue: 0.0,
// //       purchaseClosingItemCount: 0,
// //       consumptionClosingQuantity: 0.0,
// //       consumptionClosingValue: 0.0,
// //       consumedClosingItemCount: 0,
// //       consumedClosingDepartmentCount: 0,
// //       leftOverStockValue: 2230.2,
// //       startingStockValue: 1215.0,
// //       saleQuantity: 6009.48,
// //       salePrice: 1622.56,
// //       netConsumptionQuantity: 6240.0,
// //       netConsumptionValue: 1684.8,
// //       saleToConsumptionQuantityDifference: -230.52,
// //       saleToConsumptionMargin: -62.24,
// //       saleToConsumptionMarginPercentage: -3.69,
// //     },
// //   },
// // }) => {
// //     const { startDate, endDate, setStartDate, setEndDate } = useItemsContext();
// //   const analytics = itemHealthDataFormatter(apiResponse);

// //   return (
// //     <div style={{ background: "#fff", padding: "24px", borderRadius: "12px" }}>
// //       {/* Header */}
// //       <h5
// //         style={{
// //           fontWeight: "600",
// //           fontSize: "18px",
// //           display: "flex",
// //           alignItems: "center",
// //           marginBottom: "4px",
// //         }}
// //       >
// //         <span
// //           style={{
// //             fontSize: "20px",
// //             marginRight: "8px",
// //             display: "inline-flex",
// //             alignItems: "center",
// //           }}
// //         >
// //           📦
// //         </span>
// //         Consumption Analytics Overview
// //       </h5>
// //       <p style={{ color: "#6c757d", marginBottom: "24px", fontSize: "14px" }}>
// //         Comprehensive consumption metrics across different time periods for{" "}
// //         <b>GOLD DROP OIL</b>
// //       </p>

// //       {/* Cards */}
// //       <Row>
// //         {analytics.map((item, index) => (
// //           <Col key={index} md={3} sm={6} xs={12} className="mb-3">
// //             <Card
// //               style={{
// //                 borderRadius: "12px",
// //                 boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
// //                 padding: "16px",
// //                 transition: "all 0.2s ease-in-out",
// //                 height: "100%",
// //               }}
// //             >
// //               {/* Title with Icon */}
// //               <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
// //                 <span
// //                   style={{
// //                     background: item.iconBg,
// //                     width: "34px",
// //                     height: "34px",
// //                     borderRadius: "8px",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     marginRight: "8px",
// //                   }}
// //                 >
// //                   {item.icon}
// //                 </span>
// //                 <span style={{ fontWeight: "600", fontSize: "14px" }}>{item.title}</span>
// //               </div>

// //               {/* Consumption Box */}
// //               <Card
// //                 style={{
// //                   border: "0",
// //                   borderRadius: "10px",
// //                   background: "#F8F9FA",
// //                   marginBottom: "12px",
// //                   padding: "12px",
// //                 }}
// //               >
// //                 <div style={{ display: "flex", justifyContent: "space-between" }}>
// //                   <div>
// //                     <div style={{ fontWeight: "600", fontSize: "16px" }}>
// //                       {item.data?.consumptionQuantity || 0}
// //                     </div>
// //                     <small style={{ color: "#6c757d" }}>GM</small>
// //                   </div>
// //                   <div>
// //                     <div style={{ fontWeight: "600", fontSize: "16px" }}>
// //                       ₹{item.data?.consumptionValue || 0}
// //                     </div>
// //                     <small style={{ color: "#6c757d" }}>Total</small>
// //                   </div>
// //                 </div>
// //               </Card>

// //               {/* Net Consumption Box */}
// //               <Card
// //                 style={{
// //                   border: "0",
// //                   borderRadius: "10px",
// //                   background: "#FFE6E6",
// //                   marginBottom: "12px",
// //                   padding: "12px",
// //                 }}
// //               >
// //                 <div style={{ display: "flex", justifyContent: "space-between" }}>
// //                   <div>
// //                     <div style={{ fontWeight: "600", fontSize: "16px" }}>
// //                       {item.data?.netConsumptionQuantity || 0}
// //                     </div>
// //                     <small style={{ color: "#6c757d" }}>GM</small>
// //                   </div>
// //                   <div>
// //                     <div style={{ fontWeight: "600", fontSize: "16px" }}>
// //                       ₹{item.data?.netConsumptionValue || 0}
// //                     </div>
// //                     <small style={{ color: "#6c757d" }}>Total</small>
// //                   </div>
// //                 </div>
// //               </Card>

// //               {/* Utilization */}
// //               <div
// //                 style={{
// //                   color: "#28a745",
// //                   fontWeight: "600",
// //                   fontSize: "13px",
// //                 }}
// //               >
// //                 Utilization Rate {item.utilizationRate}
// //               </div>
// //             </Card>
// //           </Col>
// //         ))}
// //       </Row>
// //     </div>
// //   );
// // };

// // export default ItemsConsumptionAnalyticsOverview;
