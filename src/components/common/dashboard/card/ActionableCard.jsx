"use client";
import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaArrowUp, FaExclamationTriangle } from "react-icons/fa";
import CommonCard from "./CommonCard";

export default function ActionableCard({
  data,
  priorityColors,
  bgColor,
  textColor,
  scrollRef,
}) {
  // Map text color per priority for label
  const priorityTextColor = {
    high: priorityColors.high,
    medium: priorityColors.medium,
    low: priorityColors.low,
  };

  // Background and border top adjusted too
  const cardBgColor = bgColor[data.priority];
  const borderTopColor = priorityColors[data.priority];

  return (
    <CommonCard
      scrollRef={scrollRef}
      bgColor={cardBgColor}
      textColor={textColor}
      widthDesktop = "31vw"
      border={`1.5px solid #CACACA`} // Mid gray border consistent with Figma style guide
      style={{
        borderTop: `7px solid ${borderTopColor}`,
        borderRadius: "16px",
        boxShadow: "none",
        // padding: "24px 20px",
      }}
    >
      <Row className="align-items-center mb-2" style={{ gap: "0.5rem" }}>
        <Col xs="auto">
          <div
            style={{
              backgroundColor: borderTopColor,
              borderRadius: "12px",
              // padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              width: "42px",
              height: "42px",
            }}
          >
            <FaArrowUp size={20} />
          </div>
        </Col>
        <Col
          className="fw-semibold d-flex align-items-center gap-1"
          style={{
            color: priorityTextColor[data.priority],
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize: "1rem",
          }}
        >
          <FaExclamationTriangle />
          {data.priority?.charAt(0).toUpperCase() +
            data.priority?.slice(1)}{" "}
          Priority
        </Col>
      </Row>
      <h6
        style={{
          fontWeight: 700,
          fontSize: "1.25rem",
          color: "#232323", // $secondary color from style guide for strong text
          marginBottom: "0.25rem",
          fontFamily: "'Nunito Sans', sans-serif",
        }}
      >
        {data.title}
      </h6>
      <span
        dangerouslySetInnerHTML={{ __html: data.message }}
        style={{
          fontSize: "0.95rem",
          color: "#555555", // Mid gray for body text
          maxWidth: "100%",
          wordBreak: "break-word",
          fontFamily: "'Nunito Sans', sans-serif",
          lineHeight: "1.4",
        }}
      />
    </CommonCard>
  );
}
// "use client";
// import React from "react";
// import { Row, Col } from "react-bootstrap";
// import { FaArrowUp, FaExclamationTriangle } from "react-icons/fa";
// import CommonCard from "./CommonCard";

// export default function ActionableCard({
//   data,
//   priorityColors,
//   bgColor,
//   textColor,
//   scrollRef,
// }) {
//   return (
//     <CommonCard
//       scrollRef={scrollRef}
//       bgColor={bgColor[data.priority]}
//       textColor={textColor}
//       border={`2px solid gray`}
//       style={{ borderTop: `8px solid ${priorityColors[data.priority]}` }}
//     >
//       <Row className="align-items-center mb-2">
//         <Col xs="auto">
//           <div
//             style={{
//               background: "linear-gradient(135deg, #ff6a00, #ff3c3c)",
//               borderRadius: "12px",
//               padding: "8px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "white",
//             }}
//           >
//             <FaArrowUp size={20} />
//           </div>
//         </Col>
//         <Col className="text-danger fw-semibold d-flex align-items-center gap-1">
//           <FaExclamationTriangle />{" "}
//           {data.priority?.charAt(0).toUpperCase() + data.priority?.slice(1)}{" "}
//           Priority
//         </Col>
//       </Row>
//       <h6>{data.title}</h6>
//       <span
//         dangerouslySetInnerHTML={{ __html: data.message }}
//         style={{
//           fontSize: "0.95rem",
//           color: "#555",
//           maxWidth: "100%",
//           wordBreak: "break-word",
//         }}
//       />
//     </CommonCard>
//   );
// }
