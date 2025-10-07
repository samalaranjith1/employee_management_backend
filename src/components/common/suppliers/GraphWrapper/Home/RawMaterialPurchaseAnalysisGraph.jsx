"use client";

import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#4285F4",
  "#34A853",
  "#FBBC05",
  "#EA4335",
  "#9C27B0",
  "#00ACC1",
  "#F4511E",
  "#7CB342",
];

const RawMaterialPurchaseAnalysisGraph = ({ pieData = [] }) => {
  // ✅ Calculate total and percentages safely
  const processedData = useMemo(() => {
    const total = pieData.reduce((acc, item) => acc + (item.value || 0), 0);
    return pieData.map((item) => ({
      ...item,
      percentage: total ? ((item.value / total) * 100).toFixed(1) : 0,
    }));
  }, [pieData]);

  // ✅ Custom label renderer for placing text around pie chart
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 18; // distance from pie edge
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#1A1A1A"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{
          fontSize: "12px",
          fontWeight: 500,
        }}
      >
        {(percent * 100).toFixed(1)}%
      </text>
    );
  };

  return (
    <div
      className="d-flex flex-column align-items-center w-100"
      style={{
        fontFamily: "Inter, sans-serif",
        height: "65vh", // ✅ Full height for component
        overflow: "hidden", // prevent outer scroll
      }}
    >
      {/* Title */}
      <h6
        className="fw-semibold mb-3"
        style={{
          color: "#1A1A1A",
          fontSize: "14px",
          alignSelf: "flex-start",
          flexShrink: 0,
        }}
      >
        Purchase Distribution
      </h6>

      {/* Chart Container */}
      <div
        style={{
          width: "100%",
          height: 260,
          flexShrink: 0,
        }}
      >
        <ResponsiveContainer height={300}>
          <PieChart>
            <Pie
              data={processedData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
              label={renderCustomizedLabel} // ✅ Custom percentage labels around pie
            >
              {processedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(val) => `₹${val.toLocaleString("en-IN")}`}
              contentStyle={{
                borderRadius: "8px",
                fontSize: "12px",
                padding: "6px 10px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Scrollable Legend Section */}
      <div
        className="w-100 mt-2"
        style={{
          overflowY: "auto", // ✅ Scroll enabled
          flexGrow: 1, // take remaining height
          paddingRight: "6px",
        }}
      >
        {processedData.map((item, index) => (
          <div
            key={index}
            className="d-flex justify-content-between align-items-center py-2"
            style={{
              borderBottom:
                index !== processedData.length - 1
                  ? "1px solid #F1F1F1"
                  : "none",
            }}
          >
            <div className="d-flex align-items-center gap-2">
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  color: "#1A1A1A",
                  fontWeight: 500,
                }}
              >
                {item.name}
              </span>
            </div>

            <div className="d-flex flex-column align-items-end">
              <span
                style={{
                  fontSize: "13px",
                  color: "#1A1A1A",
                  fontWeight: 600,
                }}
              >
                ₹{item.value.toLocaleString("en-IN")}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "#757575",
                  fontWeight: 400,
                }}
              >
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RawMaterialPurchaseAnalysisGraph;


// "use client";

// import React from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// const COLORS = [
//   "#4285F4",
//   "#34A853",
//   "#FBBC05",
//   "#EA4335",
//   "#9C27B0",
//   "#00ACC1",
//   "#F4511E",
//   "#7CB342",
// ];

// const RawMaterialPurchaseAnalysisGraph = ({ pieData = [] }) => {
//   return (
//     <div className="d-flex flex-column align-items-center">
//       <h6
//         className="fw-semibold mb-3"
//         style={{ color: "#1A1A1A", fontSize: "14px" }}
//       >
//         Purchase Distribution
//       </h6>
//       <ResponsiveContainer width="100%" height={220}>
//         <PieChart>
//           <Pie
//             data={pieData}
//             cx="50%"
//             cy="50%"
//             labelLine={false}
//             innerRadius={60}
//             outerRadius={80}
//             dataKey="value"
//           >
//             {pieData.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={COLORS[index % COLORS.length]}
//               />
//             ))}
//           </Pie>
//           <Tooltip formatter={(val) => `₹${val.toLocaleString("en-IN")}`} />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default RawMaterialPurchaseAnalysisGraph;
