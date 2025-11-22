"use client";

import React, { useMemo } from "react";
import { Col } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function ItemsMenuItemConsumptionAnalysisGraph({ chartData }) {
  const COLORS = [
    "#4e79a7",
    "#59a14f",
    "#f28e2c",
    "#e15759",
    "#76b7b2",
    "#edc949",
  ];

  // ✅ Filter valid data
  const validData = useMemo(() => chartData.filter((d) => d.value > 0), [chartData]);

  // ✅ Calculate total for percentages
  const total = useMemo(() => validData.reduce((sum, d) => sum + (d.value || 0), 0), [validData]);

  if (!validData || validData.length === 0) {
    return (
      <Col md={5} className="d-flex flex-column justify-content-center align-items-center">
        <div className="text-muted fw-semibold">No Data Available</div>
      </Col>
    );
  }

  return (
    <Col
      md={5}
      className="d-flex flex-column"
      style={{
        maxHeight: "65vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Title */}
      <h6 className=" text-center mb-3" style={{fontWeight:800, fontSize:"16px", color:"#232425"}}>Consumption Distribution</h6>

      {/* Pie Chart */}
      <div
        style={{
          flexShrink: 0,
          height: 250,
          marginBottom: "1rem",
        }}
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={validData}
              cx="50%"
              cy="50%"
              label={false} // ✅ Remove labels around the pie chart
              labelLine={false}
              outerRadius={90}
              innerRadius={60}
              dataKey="value"
            >
              {validData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: "12px" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Scrollable Labels Below Pie Chart */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingRight: "6px",
          marginBottom: "3rem",
        }}
      >
        {validData.map((d, i) => (
          <div key={i} className="d-flex justify-content-between small mb-2">
            <span style={{ fontWeight:500,
                  fontSize:"14px", color:"#232425"}}>
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: COLORS[i % COLORS.length],
                  marginRight: 6,
                 
                }}
              />
              {d.name}
            </span>
            <span style={{fontWeight:500, fontSize:"12px", color:"#232425"}}>
              {d.value} gm
              <div className="text-muted" style={{ fontSize: "10px", fontWeight:400, color:"#717182" }}>
                {total > 0 ? ((d.value / total) * 100).toFixed(1) : 0}%
              </div>
            </span>
          </div>
        ))}
      </div>

      {/* Fixed Total Consumption Footer */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          padding: "8px 12px",
          backgroundColor: "#f9fafb",
          fontWeight: 600,
          textAlign: "left",
          borderTop: "1px solid #ddd",
        }}
      >
        Total Consumption: {total} gm
      </div>
    </Col>
  );
}

// "use client";

// import React from "react";
// import { Col } from "react-bootstrap";
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// export default function ItemsMenuItemConsumptionAnalysisGraph({ chartData }) {
//   const COLORS = [
//     "#4e79a7",
//     "#59a14f",
//     "#f28e2c",
//     "#e15759",
//     "#76b7b2",
//     "#edc949",
//   ];

//   return (
//     <Col
//       md={5}
//       className="d-flex flex-column"
//       style={{
//         maxHeight: "65vh",
//         overflow: "hidden",
//       }}
//     >
//       {/* Title */}
//       <h6 className="fw-bold text-center mb-3">Consumption Distribution</h6>

//       {/* Chart Section */}
//       <div
//         style={{
//           flexShrink: 0,
//           height: 250,
//           marginBottom: "1rem",
//         }}
//       >
//         <ResponsiveContainer>
//           <PieChart>
//             <Pie
//               data={chartData}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               outerRadius={90}
//               dataKey="value"
//             >
//               {chartData.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       <div
//         style={{
//           maxHeight: "200px", // 👈 Fixed height for labels
//           overflowY: "auto",
//           paddingRight: "6px",
//         }}
//       >
//         {chartData.map((d, i) => (
//           <div key={i} className="d-flex justify-content-between small mb-2">
//             <span>
//               <span
//                 style={{
//                   display: "inline-block",
//                   width: 10,
//                   height: 10,
//                   borderRadius: "50%",
//                   backgroundColor: COLORS[i % COLORS.length],
//                   marginRight: 6,
//                 }}
//               />
//               {d.name}
//             </span>
//             <span>{d.value} gm</span>
//           </div>
//         ))}
//       </div>
//     </Col>
//   );
// }
