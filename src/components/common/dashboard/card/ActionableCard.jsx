"use client";
import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaArrowUp, FaExclamationTriangle } from "react-icons/fa";
import CommonCard from "./CommonCard";
import { IconPackage, IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import "@/app/globals.css";

export default function ActionableCard({
  data,
  priorityColors,
  bgColor,
  textColor,
  scrollRef,
  priorityBorderColor
}) {
  // Map text color per priority for label
  const priorityTextColor = {
    high: priorityColors.high,
    medium: priorityColors.medium,
    low: priorityColors.low,
  };

  // Background and border top adjusted too
  const cardBgColor = bgColor[data.priority];
  const borderTopColor = priorityBorderColor[data.priority];

  return (
    <CommonCard
      scrollRef={scrollRef}
      bgColor={cardBgColor}
      textColor={textColor}
      widthDesktop="31%"
      border={`1.5px solid #CACACA`} // Mid gray border consistent with Figma style guide
      style={{
        borderTop: `7px solid ${borderTopColor}`,
        borderRadius: "16px",
        boxShadow: "none",
        // padding: "24px 20px",
      }}
    >
      <Row className="align-items-center mb-2" style={{ gap: "0.5rem" }}>
  
        <Col
          className="flex align-items-center gap-1 c_small_text_bold"
          style={{
            color: priorityTextColor[data.priority],
          }}
        >
          <FaExclamationTriangle  className="m-1"/>
          {data.priority?.charAt(0).toUpperCase() +
            data.priority?.slice(1)}{" "}
          Priority
        </Col>
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
            }}
          >
            {data.priority === "low" ? (<div
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                background: "#45bbe9ff", // Adjust color to match Figma or differentiate as in your design
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconTrendingDown color="white" size={28} stroke={2} />
            </div>) : data.priority === "high" ? <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                background: "#fd4a21",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconTrendingUp color="white" size={28} stroke={2} />
            </div> : <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                background: "#e89d04",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconPackage color="white" size={28} stroke={2} />
            </div>}
          </div>
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
        className="c_large_text_bold"
      >
        {data.title}
      </h6>
      <span
        dangerouslySetInnerHTML={{ __html: data.message }}
        // className=".c_small_text_regular"
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
