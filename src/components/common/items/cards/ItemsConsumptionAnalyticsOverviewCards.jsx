// ItemsConsumptionAnalyticsOverviewCards.js

"use client";
import React from "react";
import { Card } from "react-bootstrap";

export default function ItemsConsumptionAnalyticsOverviewCards({ item }) {
  return (
    <Card
      className="card-item"
      style={{
        borderRadius: "16px",
        boxShadow: "0px 2px 12px rgba(0,0,0,0.06)",
        padding: "20px",
        transition: "all 0.2s ease-in-out",
        height: "100%",
        minWidth: "300px",
        flexShrink: 0,
        background: item.cardBg,
        border: "0",
      }}
    >
      {/* Title with Icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "",
        }}
      >
        {item.icon}
        <span
          style={{
            fontWeight: 700,
            fontSize: "14px",
            marginLeft: "12px",
            // color: item.textColor,
            letterSpacing: 0.5,
          }}
        >
          {item.title}
        </span>
      </div>

      {/* Consumption Box */}
      <Card
        style={{
          border: "0",
          borderRadius: "12px",
          background: "#F2F6FA",
          marginBottom: "",
          padding: "20px 18px 16px 18px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          {/* Consumption Section */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div style={{ color: "#878A99", fontWeight: 500, fontSize: 14 }}>
              Consumption
            </div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#232425"}}>
              {item.data?.consumptionQuantity || 0}
            </div>
            <div style={{ color: "#717182", fontSize: 13, fontWeight: 500 }}>
              GM
            </div>
          </div>

          {/* Total Section */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <div style={{ color: "#f3f6fa", fontWeight: 500, fontSize:"14px", marginBottom: 4 }}>
              Total
            </div>
            <div style={{ fontWeight: 700, fontSize:"14px", color: "#232425", marginBottom: 2 }}>
              ₹{item.data?.consumptionValue || 0}
            </div>
            <div style={{ color: "#717182", fontSize:"14px", fontWeight: 500 }}>
              Total
            </div>
          </div>
        </div>

      </Card>

      {/* Net Consumption Box */}
      <Card
        style={{
          border: "0",
          borderRadius: "12px",
          background: "#FFF4ED",
          marginBottom: "14px",
          padding: "20px 18px 16px 18px",
        }}
      >

        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          {/* Net Consumption Section */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div style={{ color: "#717182", fontWeight: 500, fontSize:"14px"}}>
              Net Consumption
            </div>
            <div style={{ fontWeight: 700, fontSize: "14px", color: "#232425"}}>
              {item.data?.netConsumptionQuantity || 0}
            </div>
            <div style={{ color: "#717182", fontSize:"14px", fontWeight: 500 }}>
              GM
            </div>
          </div>

          {/* Total Section */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <div style={{ color: "#f3f6fa", fontWeight: 500, fontSize: 14, marginBottom: 4 }}>
              Total
            </div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#232425", marginBottom: 2 }}>
              ₹{item.data?.netConsumptionValue || 0}
            </div>
            <div style={{ color: "#717182", fontSize: 13, fontWeight: 500 }}>
              Total
            </div>
          </div>
        </div>

      </Card>

      {/* Utilization */}
      <div
        style={{
          fontWeight: "600",
          fontSize: "14px",
          marginTop: "8px",
          textAlign: "right",
          backgroundColor: "#fff",
          background: item.cardBg,
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <div style={{fontSize:"14px", fontWeight:600, color:"#717182"}}>Utilization Rate </div>
        <div style={{ backgroundColor: "#cff7cfff", padding: "2px",color: "#008236", }}>{item.utilizationRate}</div>
      </div>
    </Card>
  );
}
// "use client";
// import React from "react";
// import { Card } from "react-bootstrap";

// export default function ItemsConsumptionAnalyticsOverviewCards({ item }) {
//   return (
//     <Card
//       className="card-item"
//       style={{
//         borderRadius: "12px",
//         boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
//         padding: "16px",
//         transition: "all 0.2s ease-in-out",
//         height: "100%",
//         minWidth: "300px",
//         flexShrink: 0,
//         backgroundColor: "#fff", // Figma white background
//       }}
//     >
//       {/* Title with Icon */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           marginBottom: "12px",
//         }}
//       >
//         <span
//           style={{
//             width: "36px",
//             height: "36px",
//             borderRadius: "8px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             marginRight: "8px",
//             background: "transparent", // Use item.icon background gradient if needed
//           }}
//         >
//           {item.icon}
//         </span>
//         <span
//           style={{
//             fontWeight: 600,
//             fontSize: "14px",
//             color: "#000", // Figma dark text for title
//           }}
//         >
//           {item.title}
//         </span>
//       </div>

//       {/* Consumption Box */}
//       <Card
//         style={{
//           border: "0",
//           borderRadius: "10px",
//           background: "#F8F9FA", // Light background from Figma
//           marginBottom: "12px",
//           padding: "12px",
//         }}
//       >
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <div>
//             <h6 style={{ fontSize: "12px", color: "#6c757d", marginBottom: "4px" }}>
//               Consumption
//             </h6>
//             <div style={{ fontWeight: 600, fontSize: "16px", color: "#000" }}>
//               {item.data?.consumptionQuantity || 0}
//             </div>
//             <small style={{ color: "#6c757d", fontSize: "12px" }}>GM</small>
//           </div>
//           <div style={{ textAlign: "right" }}>
//             <h6 style={{ fontSize: "12px", color: "#6c757d", marginBottom: "4px" }}>
//               Total
//             </h6>
//             <div style={{ fontWeight: 600, fontSize: "16px", color: "#000" }}>
//               ₹{item.data?.consumptionValue || 0}
//             </div>
//           </div>
//         </div>
//       </Card>

//       {/* Net Consumption Box */}
//       <Card
//         style={{
//           border: "0",
//           borderRadius: "10px",
//           background: "#FFF4EB", // Figma soft orange/pink background
//           marginBottom: "12px",
//           padding: "12px",
//         }}
//       >
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <div>
//             <h6 style={{ fontSize: "12px", color: "#6c757d", marginBottom: "4px" }}>
//               Net Consumption
//             </h6>
//             <div style={{ fontWeight: 600, fontSize: "16px", color: "#000" }}>
//               {item.data?.netConsumptionQuantity || 0}
//             </div>
//             <small style={{ color: "#6c757d", fontSize: "12px" }}>GM</small>
//           </div>
//           <div style={{ textAlign: "right" }}>
//             <h6 style={{ fontSize: "12px", color: "#6c757d", marginBottom: "4px" }}>Total</h6>
//             <div style={{ fontWeight: 600, fontSize: "16px", color: "#000" }}>
//               ₹{item.data?.netConsumptionValue || 0}
//             </div>
//           </div>
//         </div>
//       </Card>

//       {/* Utilization */}
//       <div
//         style={{
//           color: "#28a745",
//           fontWeight: 600,
//           fontSize: "13px",
//           textAlign: "left",
//         }}
//       >
//         Utilization Rate {item.utilizationRate || item.data?.saleToConsumptionMarginPercentage}%
//       </div>
//     </Card>
//   );
// }
// "use client";
// import React from "react";
// import { Card } from "react-bootstrap";

// export default function ItemsConsumptionAnalyticsOverviewCards({ item }) {
//   return (
//     <Card
//       className="card-item"
//       style={{
//         borderRadius: "12px",
//         boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
//         padding: "16px",
//         transition: "all 0.2s ease-in-out",
//         height: "100%",
//         minWidth: "300px", // Matches swipeable card sizing
//         flexShrink: 0,
//       }}
//     >
//       {/* Title with Icon */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           marginBottom: "12px",
//         }}
//       >
//         <span
//           style={{
//             background: item.iconBg,
//             width: "34px",
//             height: "34px",
//             borderRadius: "8px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             marginRight: "8px",
//           }}
//         >
//           {item.icon}
//         </span>
//         <span style={{ fontWeight: "600", fontSize: "14px" }}>
//           {item.title}
//         </span>
//       </div>

//       {/* Consumption Box */}
//       <Card
//         style={{
//           border: "0",
//           borderRadius: "10px",
//           background: "#F8F9FA",
//           marginBottom: "12px",
//           padding: "12px",
//         }}
//       >
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <div>
//             <h6>Net Consumption</h6>

//             <div style={{ fontWeight: "600", fontSize: "16px" }}>
//               {item.data?.netConsumptionQuantity || 0}
//             </div>
//             <small style={{ color: "#6c757d" }}>GM</small>
//           </div>
//           <div>
//             <div style={{ fontWeight: "600", fontSize: "16px" }}>
//               ₹{item.data?.netConsumptionValue || 0}
//             </div>
//             <small style={{ color: "#6c757d" }}>Total</small>
//           </div>
//         </div>
//       </Card>

//       {/* Net Consumption Box */}
//       <Card
//         style={{
//           border: "0",
//           borderRadius: "10px",
//           background: "#FFE6E6",
//           marginBottom: "12px",
//           padding: "12px",
//         }}
//       >
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <div>
//             <h6>Sales</h6>
//             <div style={{ fontWeight: "600", fontSize: "16px" }}>
//               {item.data?.saleQuantity || 0}
//             </div>
//             <small style={{ color: "#6c757d" }}>GM</small>
//           </div>
//           <div>
//             <div style={{ fontWeight: "600", fontSize: "16px" }}>
//               ₹{item.data?.salePrice || 0}
//             </div>
//             <small style={{ color: "#6c757d" }}>Total</small>
//           </div>
//         </div>
//       </Card>

//       {/* Utilization */}
//       <div
//         style={{
//           color: "#28a745",
//           fontWeight: "600",
//           fontSize: "13px",
//         }}
//       >
//         Utilization Rate {item.data?.saleToConsumptionMarginPercentage}%
//       </div>
//     </Card>
//   );
// }
