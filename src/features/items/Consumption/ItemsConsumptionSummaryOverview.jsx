"use client";

import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaBoxOpen, FaChartLine, FaCube } from "react-icons/fa";
import { consumptionSummaryOverViewDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
import { useItemSummary } from "@/services/item-service";
import { useItemsContext } from "@/contexts/ItemsContext";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";

export default function ItemsConsumptionSummaryOverview() {
  const { startDate, endDate } = useItemsContext();

  return (
    <ServiceRenderer
      queryHook={useItemSummary}
      queryKey={["itemSummary", { startdt: startDate, enddt: endDate }]}
      queryFn={() =>
        useItemSummary({ startdt: startDate, enddt: endDate }).queryFn
      }
      queryArgs={[
        75,
        { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
      ]}
      formatter={(data) => consumptionSummaryOverViewDataFormatter(data)}
      shimmerCount={3}
    >
      {(cards) => (
        <Card
          className="border-0 shadow-sm p-4 rounded-4"
          style={{ background: "#fff" }}
        >
          {/* Header */}
          <div className="d-flex align-items-center mb-3">
            <div
              className="d-flex align-items-center justify-content-center me-3"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                backgroundColor: "#EEF2FF", // pastel blue background for icon container
                boxShadow: "0 2px 8px rgb(0 0 0 / 0.05)",
                color: "#5A5FEF",
              }}
            >
              {/* Use an inline SVG icon or any icon component here */}
              <FaBoxOpen size={20} />
            </div>
            <div>
              <h5 className="mb-0 fw-bold" style={{ color: "#1F1F1F" }}>
                Summary Overview
              </h5>
              <p className="mb-0 text-muted" style={{ fontSize: "0.85rem" }}>
                Real-time consumption metrics and performance indicators
              </p>
            </div>
          </div>

          {/* Cards grid */}
          <Row className="g-4">
            {cards.map(
              ({
                key,
                label,
                quantity,
                value,
                departments,
                unit,
                icon,
                bgColor,
              }) => (
                <Col md={4} sm={6} xs={12} key={key}>
                  <Card
                    className="h-100 border-0 rounded-4"
                    style={{
                      backgroundColor: bgColor,
                      padding: "24px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div className="d-flex align-items-center mb-3">
                      <div
                        className="d-flex justify-content-center align-items-center me-3"
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "8px",
                          background: "#fff",
                          boxShadow: "0 1px 4px rgb(0 0 0 / 0.1)",
                          color: "#000",
                        }}
                      >
                        {icon}
                      </div>
                      <h6
                        className="mb-0 fw-semibold"
                        style={{ color: "#222" }}
                      >
                        {label}
                      </h6>
                    </div>

                    {/* Quantity */}
                    <div className="d-flex justify-content-between mb-3">
                      <p className="text-muted mb-0">Quantity</p>
                      <p className="fw-bold mb-0" style={{ color: "#111" }}>
                        {quantity.toLocaleString()} {unit}
                      </p>
                    </div>

                    {/* Value */}
                    <div className="d-flex justify-content-between mb-3">
                      <p className="text-muted mb-0">Value</p>
                      <p className="fw-bold mb-0" style={{ color: "#111" }}>
                        ₹{value.toLocaleString()}
                      </p>
                    </div>

                    {/* Departments */}
                    <div className="d-flex justify-content-between">
                      <p className="text-muted mb-0">Departments</p>
                      <p className="fw-bold mb-0" style={{ color: "#111" }}>
                        {departments}
                      </p>
                    </div>
                  </Card>
                </Col>
              )
            )}
          </Row>
        </Card>
      )}
    </ServiceRenderer>
  );
}
// "use client";

// import React from "react";
// import { Card, Row, Col } from "react-bootstrap";
// import { consumptionSummaryOverViewDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
// import { useItemSummary } from "@/services/item-service";
// import { useItemsContext } from "@/contexts/ItemsContext";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";

// export default function ItemsConsumptionSummaryOverview() {
//   const { startDate, endDate } = useItemsContext();

//   return (
//     <ServiceRenderer
//       queryHook={useItemSummary}
//       queryKey={["itemSummary", { startdt: startDate, enddt: endDate }]}
//       queryFn={() =>
//         useItemSummary({ startdt: startDate, enddt: endDate }).queryFn
//       }
//       queryArgs={[75,{ startdt: startDate, enddt: endDate, outlet:1,userId:7 }]}
//       formatter={consumptionSummaryOverViewDataFormatter}
//       shimmerCount={3}
//     >
//       {(cards) => (
//         <Card
//           className="border-0 shadow-sm p-3 rounded-4"
//           style={{ background: "#fff" }}
//         >
//           {/* Header */}
//           <div className="d-flex align-items-center mb-3">
//             <div
//               className="d-flex align-items-center justify-content-center me-2"
//               style={{
//                 width: "36px",
//                 height: "36px",
//                 borderRadius: "12px",
//                 background: "#FFF4E5",
//               }}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="18"
//                 height="18"
//                 fill="#FB8C00"
//                 viewBox="0 0 16 16"
//               >
//                 <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0Zm0 15A7 7 0 1 1 15 8 7 7 0 0 1 8 15Zm-.5-4.5v-4h1v4Zm0-5V5h1v.5Z" />
//               </svg>
//             </div>
//             <div>
//               <h5 className="mb-0 fw-bold">Summary Overview</h5>
//               <p className="mb-0 text-muted" style={{ fontSize: "0.85rem" }}>
//                 Real-time consumption metrics and performance indicators
//               </p>
//             </div>
//           </div>

//           {/* Cards */}
//           <Row className="g-3">
//             {cards.map((card) => (
//               <Col md={4} sm={6} xs={12} key={card.key}>
//                 <Card
//                   className="border-0 rounded-4 p-3"
//                   style={{ backgroundColor: card.bgColor, height: "100%" }}
//                 >
//                   {/* Card Header */}
//                   <div className="d-flex align-items-center mb-3">
//                     <div
//                       className="me-2 d-flex align-items-center justify-content-center"
//                       style={{
//                         width: "32px",
//                         height: "32px",
//                         borderRadius: "8px",
//                         background: "#fff",
//                         color: "#000",
//                       }}
//                     >
//                       {card.icon}
//                     </div>
//                     <h6 className="mb-0 fw-semibold">{card.label}</h6>
//                   </div>

//                   {/* Quantity */}
//                   <div className="mb-2">
//                     <p className="text-muted mb-0">Quantity</p>
//                     <p className="fw-bold fs-6 mb-0">
//                       {card.quantity.toLocaleString()} {card.unit}
//                     </p>
//                   </div>

//                   {/* Value */}
//                   <div className="mb-2">
//                     <p className="text-muted mb-0">Value</p>
//                     <p className="fw-bold fs-6 mb-0">
//                       ₹{card.value.toLocaleString()}
//                     </p>
//                   </div>

//                   {/* Departments */}
//                   <div>
//                     <p className="text-muted mb-0">Departments</p>
//                     <p className="fw-bold fs-6 mb-0">{card.departments}</p>
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
// import { consumptionSummaryOverViewDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";

// export default function ItemsConsumptionSummaryOverview({
//   apiData = {
//     id: "75",
//     item: {
//       id: "75",
//       outletId: "1",
//       name: "HALDI",
//       unit: "GM",
//       unitQuantity: "500",
//       unitPrice: 127,
//       categoryId: 7,
//       categoryName: "Indian Grocery",
//       disabled: false,
//       alias: "HALDI - 500GM",
//       moq: 733,
//       itemTypeId: 1,
//       itemType: "Store Item",
//       itemDescription: null,
//       perishable: false,
//       shelfLifeDays: 0,
//       hsnCode: null,
//       brandName: null,
//       storageLocation: null,
//       createdBy: null,
//       updatedBy: null,
//     },
//     summary: {
//       dt: "2025-08-04",
//       startDate: "2025-08-04",
//       endDate: "2025-08-04",
//       purchaseQuantity: 0,
//       purchaseValue: 0,
//       purchaseItemCount: 0,
//       supplierCount: 0,
//       consumptionQuantity: 750,
//       consumptionValue: 202.5,
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
//       leftOverStockValue: 812.7,
//       startingStockValue: 1015.2,
//       saleQuantity: 224.66,
//       salePrice: 60.66,
//       netConsumptionQuantity: 750,
//       netConsumptionValue: 202.5,
//       saleToConsumptionQuantityDifference: -525.34,
//       saleToConsumptionMargin: -141.84,
//       saleToConsumptionMarginPercentage: -70.04,
//     },
//   },
// }) {
//   const cards = consumptionSummaryOverViewDataFormatter(apiData);

//   return (
//     <Card
//       className="border-0 shadow-sm p-3 rounded-4"
//       style={{ background: "#fff" }}
//     >
//       {/* Header */}
//       <div className="d-flex align-items-center mb-3">
//         <div
//           className="d-flex align-items-center justify-content-center me-2"
//           style={{
//             width: "36px",
//             height: "36px",
//             borderRadius: "12px",
//             background: "#FFF4E5",
//           }}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="18"
//             height="18"
//             fill="#FB8C00"
//             viewBox="0 0 16 16"
//           >
//             <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0Zm0 15A7 7 0 1 1 15 8 7 7 0 0 1 8 15Zm-.5-4.5v-4h1v4Zm0-5V5h1v.5Z" />
//           </svg>
//         </div>
//         <div>
//           <h5 className="mb-0 fw-bold">Summary Overview</h5>
//           <p className="mb-0 text-muted" style={{ fontSize: "0.85rem" }}>
//             Real-time consumption metrics and performance indicators
//           </p>
//         </div>
//       </div>

//       {/* Cards */}
//       <Row className="g-3">
//         {cards.map((card) => (
//           <Col md={4} sm={6} xs={12} key={card.key}>
//             <Card
//               className="border-0 rounded-4 p-3"
//               style={{ backgroundColor: card.bgColor, height: "100%" }}
//             >
//               {/* Card Header */}
//               <div className="d-flex align-items-center mb-3">
//                 <div
//                   className="me-2 d-flex align-items-center justify-content-center"
//                   style={{
//                     width: "32px",
//                     height: "32px",
//                     borderRadius: "8px",
//                     background: "#fff",
//                     color: "#000",
//                   }}
//                 >
//                   {card.icon}
//                 </div>
//                 <h6 className="mb-0 fw-semibold">{card.label}</h6>
//               </div>

//               {/* Quantity */}
//               <div className="mb-2">
//                 <p className="text-muted mb-0">Quantity</p>
//                 <p className="fw-bold fs-6 mb-0">
//                   {card.quantity.toLocaleString()} {card.unit}
//                 </p>
//               </div>

//               {/* Value */}
//               <div className="mb-2">
//                 <p className="text-muted mb-0">Value</p>
//                 <p className="fw-bold fs-6 mb-0">
//                   ₹{card.value.toLocaleString()}
//                 </p>
//               </div>

//               {/* Departments */}
//               <div>
//                 <p className="text-muted mb-0">Departments</p>
//                 <p className="fw-bold fs-6 mb-0">{card.departments}</p>
//               </div>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Card>
//   );
// }
