"use client";

import { useDepartmentContext } from "@/contexts/DepartmentContext";
import React from "react";
import { Card, Row, Col } from "react-bootstrap";

export default function DepartmentPeriodDropDownCards({ cards = [] }) {
  const { isMobile } = useDepartmentContext();

  if (!cards?.length) return null;

  return (
    <>
      {isMobile ? (
        // ✅ Mobile: Horizontal swipeable cards
        <div
          className="d-flex gap-3 mb-2"
          style={{
            overflowX: "auto",
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE
            WebkitOverflowScrolling: "touch",
          }}
        >
          {cards.map((c, idx) => (
            <Card
              key={idx}
              className="flex-shrink-0"
              style={{
                width: "88vw",
                backgroundColor: c.bg,
                borderRadius: "12px",
                border: "1px solid #ddd",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
              }}
            >
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "#6d6d6d",
                      fontWeight: "600",
                    }}
                  >
                    {c.title}
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      color: "#232425",
                      fontWeight: "800",
                    }}
                  >
                    {c.value}
                  </div>
                </div>

                <div
                  className="text-end"
                  style={{
                    backgroundColor: c.iconBg,
                    borderRadius: "12px",
                    width: 40,
                    height: 40,
                    float:'right',
                    marginLeft:'+20px'
                  }}
                >
                  {c.icon}
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        // ✅ Desktop / Tablet: 4-column grid
        <Row className="mb-4">
          {cards.map((c, idx) => (
            <Col key={idx} md={3} xs={6} className="mb-3">
              <Card
                className="h-100 d-flex flex-column justify-content-center"
                style={{
                  backgroundColor: c.bg,
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
                  padding: "0 20px",
                }}
              >
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        color: "#6d6d6d",
                        fontWeight: "600",
                      }}
                    >
                      {c.title}
                    </div>
                    <div
                      style={{
                        fontSize: 24,
                        color: "#232425",
                        fontWeight: "800",
                      }}
                    >
                      {c.value}
                    </div>
                  </div>

                  <div
                    className="p-2 d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: c.iconBg,
                      borderRadius: "12px",
                      width: 40,
                      height: 40,
                    }}
                  >
                    {c.icon}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
// "use client";

// import { useDepartmentContext } from "@/contexts/DepartmentContext";
// import React from "react";
// import { Card, Row, Col } from "react-bootstrap";

// export default function DepartmentPeriodDropDownCards({ cards = [] }) {
//   const {isMobile} = useDepartmentContext()
//   return (
//     <Row className="mb-4">
//       {cards.map((c, idx) => (
//         <Col key={idx} md={3} xs={6} className="mb-3">
//           <Card
//             className="h-100 d-flex flex-column justify-content-center"
//             style={{
//               backgroundColor: c.bg, // c.bg must be #f0fdf4, #f5f3ff, etc. exactly
//               borderRadius: "12px",
//               border: "1px solid #ddd",
//               boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
//               padding:'0 20px'
//             }}
//           >
//             <Card.Body className="d-flex justify-content-between align-items-center">
//               {/* Left: Text Block */}
//               <div>
//                 <div style={{ fontSize: 14,color:'#6d6d6d' ,fontWeight:'600'}}>
//                   {c.title}
//                 </div>
//                 <div style={{ fontSize: 24,color:'#232425' ,fontWeight:'800'}}>
//                   {c.value}
//                 </div>
//               </div>

//               {/* Right: Icon */}
//               <div
//                 className="p-2 d-flex align-items-center justify-content-center"
//                 style={{
//                   backgroundColor: c.iconBg,
//                   borderRadius: "12px",
//                   width: 40,
//                   height: 40,
//                 }}
//               >
//                 {c.icon}
//               </div>
//             </Card.Body>

//           </Card>
//         </Col>
//       ))}
//     </Row>
//   );
// }
