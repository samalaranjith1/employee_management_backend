"use client";

import React from "react";
import { Card, Row, Col } from "react-bootstrap";

export default function PurchaseAnalyticsCards({ data = [] }) {
  return (
    <Row className="g-3">
      {data.map((card) => (
        <Col key={card.key} md={3} sm={6} xs={12}>
          <Card
            style={{
              backgroundColor: card.bgColor,
              borderRadius: 16,
              height: "100%",
              border: "none",
              boxShadow:
                "0 4px 6px rgb(99 124 139 / 0.1), 0 1px 3px rgb(99 124 139 / 0.06)",
            }}
          >
            <Card.Body className="d-flex flex-column h-100 justify-content-between">
              {/* Header */}
              <div className="d-flex align-items-center mb-3">
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 12,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 12,
                  }}
                >
                  {card.icon}
                </div>
                <h5 className="mb-0 fw-semibold">{card.label}</h5>
              </div>

              {/* Content */}
              <div>
                <div className="mb-2">
                  <small className="text-secondary d-block mb-1">
                    Purchase Quantity
                  </small>
                  <h5 className="fw-bold" style={{ color: "#065f46" }}>
                    {card.quantity.toLocaleString()} GM
                  </h5>
                </div>
                <div className="mb-3">
                  <small className="text-secondary d-block mb-1">
                    Purchase Price
                  </small>
                  <h5 className="fw-bold" style={{ color: "#065f46" }}>
                    ₹{card.price.toLocaleString()}
                  </h5>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-secondary">Average Price</small>
                  <p
                    className="fw-bold mb-0"
                    style={{ color: card.textColor, fontSize: "1.1rem" }}
                  >
                    ₹{card.avgPrice.toFixed(2)}/GM
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
// "use client";

// import React from "react";
// import { Card, Row, Col } from "react-bootstrap";
// import { FaBox } from "react-icons/fa";

// export default function PurchaseAnalyticsCards({ cards = [] }) {
//       const cardsStyled = [
//         {
//           key: "thisWeek",
//           label: "This Week",
//           quantity: cards?.thisWeekQuantity || 0,
//           price: cards?.thisWeekPrice || 0,
//           avgPrice: cards?.thisWeekAvgPrice || 0,
//           bg: "#DBEAFEEF", // soft blue
//           borderColor: "#3B82F6",
//           textColor: "#3B82F6",
//           icon: "box",
//         },
//         {
//           key: "lastWeek",
//           label: "Last Week",
//           quantity: cards?.lastWeekQuantity || 0,
//           price: cards?.lastWeekPrice || 0,
//           avgPrice: cards?.lastWeekAvgPrice || 0,
//           bg: "#D1FAE5EF", // soft green
//           borderColor: "#22C55E",
//           textColor: "#22C55E",
//           icon: "box",
//         },
//         {
//           key: "thisMonth",
//           label: "This Month",
//           quantity: cards?.thisMonthQuantity || 0,
//           price: cards?.thisMonthPrice || 0,
//           avgPrice: cards?.thisMonthAvgPrice || 0,
//           bg: "#EDE9FEEF", // soft purple
//           borderColor: "#7C3AED",
//           textColor: "#7C3AED",
//           icon: "box",
//         },
//         {
//           key: "lastMonth",
//           label: "Last Month",
//           quantity: cards?.lastMonthQuantity || 0,
//           price: cards?.lastMonthPrice || 0,
//           avgPrice: cards?.lastMonthAvgPrice || 0,
//           bg: "#FFF7EDEF", // soft orange
//           borderColor: "#F97316",
//           textColor: "#F97316",
//           icon: "box",
//         },
//       ];
//   return (
//     <Row className="g-3">
//       {cardsStyled.map((card) => (
//         <Col key={card.key} md={3} sm={6} xs={12}>
//           <Card
//             style={{
//               backgroundColor: card.bg,
//               borderRadius: 16,
//               height: "100%",
//               border: "none",
//               boxShadow:
//                 "0 4px 6px rgb(99 124 139 / 0.1), 0 1px 3px rgb(99 124 139 / 0.06)",
//             }}
//           >
//             <Card.Body className="d-flex flex-column h-100 justify-content-between">
//               {/* Header */}
//               <div className="d-flex align-items-center mb-3">
//                 <div
//                   style={{
//                     width: 36,
//                     height: 36,
//                     borderRadius: 12,
//                     backgroundColor: card.borderColor,
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     color: "white",
//                     marginRight: 12,
//                     fontSize: 20,
//                   }}
//                 >
//                   <FaBox />
//                 </div>
//                 <h5 className="mb-0 fw-semibold">{card.label}</h5>
//               </div>

//               {/* Content */}
//               <div>
//                 <div className="mb-2">
//                   <small className="text-secondary d-block mb-1">
//                     Purchase Quantity
//                   </small>
//                   <h5 className="fw-bold" style={{ color: "#065f46" }}>
//                     {card.quantity.toLocaleString()} GM
//                   </h5>
//                 </div>
//                 <div className="mb-3">
//                   <small className="text-secondary d-block mb-1">
//                     Purchase Price
//                   </small>
//                   <h5 className="fw-bold" style={{ color: "#065f46" }}>
//                     ₹{card.price.toLocaleString()}
//                   </h5>
//                 </div>
//                 <hr />
//                 <div className="d-flex justify-content-between align-items-center">
//                   <small className="text-secondary">Average Price</small>
//                   <p
//                     className="fw-bold mb-0"
//                     style={{ color: card.textColor, fontSize: "1.1rem" }}
//                   >
//                     ₹{card.avgPrice.toFixed(2)}/GM
//                   </p>
//                 </div>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       ))}
//     </Row>
//   );
// }
