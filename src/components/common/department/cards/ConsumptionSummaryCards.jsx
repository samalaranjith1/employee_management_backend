"use client";

import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaUtensils, FaShoppingCart, FaChartLine } from "react-icons/fa";
import { handleNavigation } from "@/utils";
import { useRouter } from "next/navigation";
import { useDepartmentContext } from "@/contexts/DepartmentContext";
export default function ConsumptionSummaryCards({ cards, scrollRef }) {
  const router = useRouter();
  const { startDate,endDate,isMobile } = useDepartmentContext();

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
        <div className="col-md-4">
          <Card
          key={card.id}
          className="card-item border-0 rounded-4 p-4"
          style={{
             flexShrink: 5,
             flexGrow:1,
            background: card.bg,
            flex: "0 2px auto",
            width: isMobile ? "88vw" : "31vw",
            minWidth: "300px",
            maxWidth:'400px',
            cursor: "pointer",
          }}
          onClick={() =>
            handleNavigation({
              router,
              url: `sp/${card?.routeUrl}`,
              params: {
                startDate: startDate,
                endDate: endDate,
                departments: "2",
              },
            })
          }
        >
          <Card.Body>
            {/* Title + Value + Change */}
            <Row className="justify-content-between align-items-center mb-3">
              <Col>
                <h6 style={{ fontWeight: 600,fontSize:'14px',color:'#6d6d6d' }}>
                  {card.title}
                </h6>
                <h3 style={{
                  fontWeight:'800',
                  fontSize:'24px',
                  color:'#232425'
                }}>{card.value}</h3>
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
                  <small style={{ color: card.textColor,fontWeight:'600',fontSize:'14px' }}>
                    {s.label}
                  </small>
                </Col>
                <Col xs={5} className="text-end"  style={{ color: "#232425",fontWeight:'800',fontSize:'14px' }}>
                  {s.value}
                </Col>
              </Row>
            ))}
          </Card.Body>
        </Card>
        </div>
      ))}
    </div>
  );
} 
// "use client";

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
