"use client";
import React from "react";
import { Card } from "react-bootstrap";
import CommonCard from "./CommonCard";
import '@/app/globals.css';

export default function DepartmentPerformanceCards({ cards }) {
  return (
    <div
      className="d-flex flex-lg-column gap-3 mb-3 mb-lg-0"
      style={{
        overflowX: "auto", // horizontal scroll for mobile
        WebkitOverflowScrolling: "touch", // smooth scrolling on iOS
        scrollbarWidth: "none", // hide scrollbar Firefox
        msOverflowStyle: "none", // hide scrollbar IE
        width: "100%", // take full width of parent Col
      }}
    >
      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari, Opera */
        .d-flex::-webkit-scrollbar {
          display: none;
        }

        /* Stretch cards full width when stacked vertically (desktop) */
        @media (min-width: 992px) {
          .d-flex.flex-lg-column > * {
            width: 100% !important;
          }
        }
      `}</style>

      {cards.map((card, idx) => (
        <CommonCard
          key={idx}
          textColor="#000"
          minWidth="220px"
          style={{
            // borderLeft: `5px solid ${card.borderColor}`,
            padding: "0px",
            flex: "0 0 auto", // prevent shrink in horizontal scroll
          }}
          bgColor={card.bgColor}
        >
          <Card.Body>
            <div className="d-flex p-0 align-items-center">
              <div>
                <h6 className="mb-1 c_table_columns_semi_bold">{card.title}</h6>
                <h4 className="c_normal_text_extra_bold c_heading_5">{card.value}</h4>
              </div>
              <div style={{ marginLeft: "auto" }}>{card.icon}</div>
            </div>
          </Card.Body>
        </CommonCard>
      ))}
    </div>
  );
}
// "use client";
// import React from "react";
// import { Col, Card } from "react-bootstrap";
// import CommonCard from "./CommonCard";

// export default function DepartmentPerformanceCards({ cards }) {
//   return (
//     <>
//       <Col
//         xs={12}
//         lg={3}
//         className="d-flex flex-lg-column gap-3 mb-3 mb-lg-0"
//         style={{
//           overflowX: "auto",
//           WebkitOverflowScrolling: "touch", // smooth scroll on iOS
//           scrollbarWidth: "none", // Firefox
//           msOverflowStyle: "none", // IE
//         }}
//       >
//         <style jsx>{`
//           /* Hide scrollbar for Chrome, Safari, Opera */
//           .d-flex::-webkit-scrollbar {
//             display: none;
//           }

//           /* Ensure cards stretch full width in column view */
//           @media (min-width: 992px) {
//             .d-flex.flex-lg-column > * {
//               width: 100% !important;
//             }
//           }
//         `}</style>

//         {cards.map((card, idx) => (
//           <CommonCard
//             key={idx}
//             textColor="#000"
//             minWidth="220px"
//             style={{
//               borderLeft: `5px solid ${card.borderColor}`,
//               padding: "0px",
//               flex: "0 0 auto", // prevent shrink in horizontal scroll
//             }}
//             bgColor={card.bgColor}
//           >
//             <Card.Body>
//               <div className="d-flex p-0 align-items-center">
//                 <div>
//                   <h6 className="fw-bold mb-1">{card.title}</h6>
//                   <h4 className="fw-bold">{card.value}</h4>
//                 </div>
//                 <div style={{ marginLeft: "auto" }}>{card.icon}</div>
//               </div>
//             </Card.Body>
//           </CommonCard>
//         ))}
//       </Col>
//     </>
//   );
// }
// "use client";
// import React from "react";
// import { Col, Card } from "react-bootstrap";
// import CommonCard from "./CommonCard";

// export default function DepartmentPerformanceCards({ cards }) {
//   return (
//     <Col
//       xs={12}
//       className="d-flex gap-3 mb-3 mb-lg-0"
//       style={{
//         overflowX: "auto", // horizontal scroll
//         WebkitOverflowScrolling: "touch", // smooth scrolling on iOS
//         scrollbarWidth: "none", // Firefox
//         msOverflowStyle: "none", // IE 10+
//       }}
//     >
//       <style jsx>{`
//         /* Hide scrollbar for Chrome, Safari and Opera */
//         .d-flex::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>

//       {cards.map((card, idx) => (
//         <CommonCard
//           key={idx}
//           textColor="#000"
//           minWidth="220px"
//           style={{
//             borderLeft: `5px solid ${card.borderColor}`,
//             padding: "0px",
//             flex: "0 0 auto", // prevent shrinking for horizontal scroll
//           }}
//           bgColor={card.bgColor}
//         >
//           <Card.Body>
//             <div className="d-flex p-0 align-items-center">
//               <div>
//                 <h6 className="fw-bold mb-1">{card.title}</h6>
//                 <h4 className="fw-bold">{card.value}</h4>
//               </div>
//               <div style={{ marginLeft: "auto" }}>{card.icon}</div>
//             </div>
//           </Card.Body>
//         </CommonCard>
//       ))}
//     </Col>
//   );
// }
// "use client";
// import React from "react";
// import { Col, Card } from "react-bootstrap";
// import CommonCard from "./CommonCard";

// export default function DepartmentPerformanceCards({ cards }) {
//   return (
//     <Col
//       xs={12}
//       lg={3}
//       className="d-flex flex-lg-column flex-row gap-3 mb-3 mb-lg-0"
//       style={{ whiteSpace: "nowrap" }}
//     >
//       {cards.map((card, idx) => (
//         <CommonCard
//           key={idx}
//           textColor="#000"
//           minWidth="220px"
//           style={{
//             borderLeft: `5px solid ${card.borderColor}`,
//             padding: "0px",
//           }}
//         bgColor={card.bgColor}
//         >
//           <Card.Body>
//             <div className="d-flex d-flex-row p-0">
//               <div>
//                 <h6 className="fw-bold mb-1">{card.title}</h6>
//                 <h4 className="fw-bold">{card.value}</h4>
//               </div>
//               <div style={{ marginLeft: "auto" }}>
//                 {card.icon}
//               </div>
//             </div>
//           </Card.Body>
//         </CommonCard>
//       ))}
//     </Col>
//   );
// }
// "use client";
// import React from "react";
// import { Col, Card } from "react-bootstrap";
// import {
//   FaRupeeSign,
//   FaUtensils,
//   FaPercentage,
//   FaBullseye,
//   FaCartPlus,
// } from "react-icons/fa";
// import CommonCard from "./CommonCard";
// import { FaArrowTrendUp } from "react-icons/fa6";

// export default function DepartmentPerformanceCards({cards}) {
//   return (
//     <Col
//       xs={12}
//       lg={3}
//       className="d-flex flex-lg-column flex-row gap-3 mb-3 mb-lg-0"
//       style={{ whiteSpace: "nowrap" }}
//     >
//       <CommonCard
//         bgColor="#cff9d6ff"
//         textColor="#000"
//         minWidth="220px"
//         style={{ borderLeft: "5px solid #3b82f6", padding: '0px' }}
//       >
//         <Card.Body>
//           <div className="d-flex d-flex-row p-0">
//             <div>
//               <h6 className="fw-bold mb-1">Total Sales</h6>
//               <h4 className="fw-bold">₹413K</h4>
//             </div>
//             <div style={{ marginLeft: "auto" }}>
//               <FaCartPlus className="text-success fs-4" />
//             </div>
//           </div>
//         </Card.Body>
//       </CommonCard>
//       <CommonCard
//         bgColor="#eaeffaff"
//         textColor="#000"
//         minWidth="220px"
//         style={{ borderLeft: "5px solid #10b981", padding: '0px' }}
//       >
//         <Card.Body>
//           <div className="d-flex d-flex-row p-0">
//             <div>
//               <h6 className="fw-bold mb-1">Consumption</h6>
//               <h4 className="fw-bold">₹255K</h4>
//             </div>
//             <div style={{ marginLeft: "auto" }}>
//               <FaCartPlus className="text-primary fs-4" />
//             </div>
//           </div>
//         </Card.Body>
//       </CommonCard>
//       <CommonCard
//         bgColor="#fff5e6"
//         textColor="#000"
//         minWidth="220px"
//         style={{ borderLeft: "5px solid #f97316", padding: '0px' }}
//       >
//         <Card.Body>
//           <div className="d-flex d-flex-row">
//             <div>
//               <h6 className="fw-bold mb-1">Overall Cost %</h6>
//               <h4 className="fw-bold">61.7%</h4>
//             </div>
//             <div style={{ marginLeft: "auto" }}>
//               <FaCartPlus className="text-primary fs-4" />
//             </div>
//           </div>
//         </Card.Body>
//       </CommonCard>
//       <CommonCard
//         bgColor="#efe5f7ff"
//         textColor="#000"
//         minWidth="220px"
//         style={{ borderLeft: "5px solid #a855f7", padding: "0px" }}
//       >
//         <Card.Body>
//           <div className="d-flex d-flex-row">
//             <div>
//               <h6 className="fw-bold mb-1">Total Cost %</h6>
//               <h4 className="fw-bold">61.7%</h4>
//             </div>
//             <div style={{ marginLeft: "auto" }}>
//               <FaArrowTrendUp className="text-primary fs-4" />
//             </div>
//           </div>
//         </Card.Body>
//       </CommonCard>
//     </Col>
//   );
// }
