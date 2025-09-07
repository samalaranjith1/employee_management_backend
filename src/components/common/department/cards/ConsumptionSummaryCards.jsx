"use client";

import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaUtensils, FaShoppingCart, FaChartLine } from "react-icons/fa";

export default function ConsumptionSummaryCards({ cards, scrollRef }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMinWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };
    updateMinWidth();
    window.addEventListener("resize", updateMinWidth);
    return () => window.removeEventListener("resize", updateMinWidth);
  }, []);

  if (!cards) return null;

  return (
    <div
      ref={scrollRef}
      className="d-flex gap-4 mb-4"
      style={{
        overflowX: "auto",
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE/Edge
        WebkitOverflowScrolling: "touch",
      }}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          className="card-item border-0 rounded-4 p-4"
          style={{
            background: card.bg,
            flex: "0 0 auto",
            width: isMobile ? "88vw" : "30vw",
          }}
        >
          <Card.Body>
            {/* Title + Value + Change */}
            <Row className="justify-content-between align-items-center mb-3">
              <Col>
                <h6 className="text-muted" style={{ fontWeight: 400 }}>
                  {card.title}
                </h6>
                <h3 className="fw-bold mb-1">{card.value}</h3>
                <small
                  className={`fw-semibold ${
                    card.change >= 0 ? "text-success" : "text-danger"
                  }`}
                  style={{ letterSpacing: "0.03em" }}
                >
                  {card.change >= 0 ? "▲" : "▼"} {Math.abs(card.change)}%
                </small>
              </Col>
              <Col xs="auto">
                <div
                  style={{
                    background: "white",
                    borderRadius: "12px",
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "46px",
                    height: "46px",
                  }}
                >
                  <span style={{ color: card.textColor }}>{card.icon}</span>
                </div>
              </Col>
            </Row>

            <hr style={{ borderColor: "#E9E9E9", margin: "0 0 10px 0" }} />

            {/* Stats */}
            {card.stats.map((s, i) => (
              <Row key={i} className="mb-1">
                <Col xs={7}>
                  <small className="fw-semibold" style={{ color: "#666" }}>
                    {s.label}
                  </small>
                </Col>
                <Col xs={5} className="text-end fw-bold">
                  {s.value}
                </Col>
              </Row>
            ))}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
} // "use client";

// import React, { useEffect, useState } from "react";
// import { Card, Row, Col } from "react-bootstrap";

// export default function ConsumptionSummaryCards({ cards, scrollRef }) {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const updateMinWidth = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     updateMinWidth();
//     window.addEventListener("resize", updateMinWidth);
//     return () => window.removeEventListener("resize", updateMinWidth);
//   }, []);

//   if (!cards) return null;

//   return (
//     // ✅ Wrap cards in a scrollable container (same as ItemConsumptionDistributionCard)
//     <div
//       ref={scrollRef}
//       className="d-flex gap-3 mb-4 "
//       style={{
//         overflowX: "auto",
//         scrollbarWidth: "none", // Firefox
//         msOverflowStyle: "none", // IE/Edge
//         WebkitOverflowScrolling: "touch",
//       }}
//     >
//       {cards.map((card) => (
//         <Card
//           key={card.id}
//           className="card-item border-0 rounded-4 p-1"
//           style={{
//             background: card.bg,
//             flex: "0 0 auto",
//             width: isMobile ? "88vw" : "30vw", // ✅ Mobile responsive
//           }}
//         >
//           <Card.Body>
//             {/* Title + Value + Change */}
//             <Row className="justify-content-between align-items-center mb-2">
//               <Col>
//                 <h6 className="text-muted">{card.title}</h6>
//                 <h4 className="fw-bold mb-0">{card.value}</h4>
//                 <small
//                   className={`fw-semibold ${
//                     card.change >= 0 ? "text-success" : "text-danger"
//                   }`}
//                 >
//                   {card.change >= 0 ? "▲" : "▼"} {card.change}%
//                 </small>
//               </Col>
//               <Col xs="auto">
//                 <div
//                   style={{
//                     background: "white",
//                     borderRadius: "12px",
//                     padding: "8px",
//                   }}
//                 >
//                   <span style={{ color: card.textColor }}>{card.icon}</span>
//                 </div>
//               </Col>
//             </Row>

//             <hr />

//             {/* Stats */}
//             {card.stats.map((s, i) => (
//               <Row key={i} className="mb-1">
//                 <Col xs={7}>
//                   <small className="fw-medium">{s.label}</small>
//                 </Col>
//                 <Col xs={5} className="text-end fw-semibold">
//                   {s.value}
//                 </Col>
//               </Row>
//             ))}
//           </Card.Body>
//         </Card>
//       ))}
//     </div>
//   );
// }
