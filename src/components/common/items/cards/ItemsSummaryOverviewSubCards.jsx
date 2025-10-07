"use client";
import React from "react";
import { Row, Col, Card } from "react-bootstrap";

export default function ItemsSummaryOverviewSubCards({ footer = [] }) {
  return (
    <div
      style={{
        overflowX: "auto",
        scrollbarWidth: "none", // for Firefox
        msOverflowStyle: "none", // for IE/Edge
      }}
      className="hide-scrollbar"
    >
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <Row
        className="g-3 mt-3 flex-nowrap"
        style={{
          flex: "1",
          display: "flex",
          alignItems: "center",
          background: "#F3FFF8",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgb(0 0 0 / 0.05)",
          // padding: "1rem",
          whiteSpace: "nowrap",
        }}
      >
        {footer.map((foot) => (
          <Col key={foot.id} style={{ minWidth: "240px" }}>
            <Card
              className="p-3 border-0 h-100"
              style={{ backgroundColor: foot.bg }}
            >
              <Row className="align-items-center h-100 flex-nowrap">
                {/* Icon Column */}
                <Col
                  xs="auto"
                  className="d-flex justify-content-center align-items-center"
                >
                  {foot.icon}
                </Col>

                {/* Text Column */}
                <Col>
                  <h6 className="fw-bold mb-1">{foot.label}</h6>
                  <p className="mb-0 fw-semibold">{foot.value}</p>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
// "use client";
// import React from "react";
// import { Row, Col, Card } from "react-bootstrap";

// export default function ItemsSummaryOverviewSubCards({ footer = [] }) {
//   return (
//     <Row
//       className="g-3 mt-3"
//       style={{
//         flex: "1",
//         display: "flex",
//         alignItems: "center",
//         background: "#F3FFF8",
//         borderRadius: "12px",
//         boxShadow: "0 4px 8px rgb(0 0 0 / 0.05)",
//       }}
//     >
//       {footer.map((foot) => (
//         <Col key={foot.id}>
//           <Card
//             className="p-3 border-0 h-100"
//             style={{ backgroundColor: foot.bg }}
//           >
//             <Row className="align-items-center h-100">
//               {/* Col 1: Icon */}
//               <Col xs="auto" className="d-flex justify-content-center align-items-center">
//                 {foot.icon}
//               </Col>

//               {/* Col 2: Label + Value */}
//               <Col>
//                 <h6 className="fw-bold mb-1">{foot.label}</h6>
//                 <p className="mb-0 fw-semibold">{foot.value}</p>
//               </Col>
//             </Row>
//           </Card>
//         </Col>

//       ))}
//     </Row>
//   );
// }
