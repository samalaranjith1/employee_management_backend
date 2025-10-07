"use client";

import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#82ca9d",
  "#ffc658",
  "#8884d8",
  "#a4de6c",
];

export default function ProductsIngreidentAnalysisGraph({
  chartData = [],
  totalCost = 0,
}) {
  // ✅ Process data to include percentages
  const processedData = useMemo(() => {
    const total = chartData.reduce((acc, item) => acc + (item.value || 0), 0);
    return chartData.map((item) => ({
      ...item,
      percentage: total ? ((item.value / total) * 100).toFixed(1) : 0,
    }));
  }, [chartData]);

  // ✅ Custom label renderer to place percentage labels around the pie
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 18;
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
        height: "65vh",
        overflow: "hidden",
      }}
    >
      {/* ✅ Title */}
      <h6
        className="fw-semibold mb-3"
        style={{
          color: "#1A1A1A",
          fontSize: "14px",
          alignSelf: "flex-start",
          flexShrink: 0,
        }}
      >
        Total Cost Distribution
      </h6>

      {/* ✅ Pie Chart Section */}
      <div style={{ width: "100%", height: 260, flexShrink: 0 }}>
        <ResponsiveContainer height={300}>
          <PieChart>
            <Pie
              data={processedData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
              label={renderCustomizedLabel}
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

      {/* ✅ Scrollable Label Cards Section */}
      <div
        className="w-100 mt-2"
        style={{
          overflowY: "auto",
          flexGrow: 1,
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

        {/* ✅ Total cost footer */}
        <div
          className="d-flex justify-content-between align-items-center mt-2 p-2 rounded"
          style={{
            backgroundColor: "#FAFAFA",
            fontWeight: 600,
            borderTop: "1px solid #EAEAEA",
          }}
        >
          <span>Total Cost</span>
          <span>₹{totalCost.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
// "use client";

// import React from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const COLORS = [
//   "#0088FE",
//   "#00C49F",
//   "#FFBB28",
//   "#FF8042",
//   "#82ca9d",
//   "#ffc658",
//   "#8884d8",
//   "#a4de6c",
// ];

// export default function ProductsIngreidentAnalysisGraph({
//   chartData,
//   totalCost,
// }) {
//   // Custom legend renderer (first 5 items, horizontal)
//   const renderCustomLegend = (props) => {
//     const { payload } = props;
//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           flexWrap: "wrap",
//           gap: "12px",
//           marginTop: "8px",
//         }}
//       >
//         {payload.slice(0, 5).map((entry, index) => (
//           <div
//             key={`item-${index}`}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               fontSize: "0.85rem",
//             }}
//           >
//             <span
//               style={{
//                 display: "inline-block",
//                 width: 12,
//                 height: 12,
//                 backgroundColor: entry.color,
//                 marginRight: 6,
//               }}
//             ></span>
//             {entry.value}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="d-flex flex-column align-items-center">
//       <h6 className="fw-semibold">Total Cost Distribution</h6>
//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie
//             data={chartData}
//             cx="50%"
//             cy="50%"
//             innerRadius={70}
//             outerRadius={110}
//             paddingAngle={3}
//             dataKey="value"
//           >
//             {chartData.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={COLORS[index % COLORS.length]}
//               />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend verticalAlign="bottom" content={renderCustomLegend} />
//         </PieChart>
//       </ResponsiveContainer>
//       <div className="fw-bold mt-2">Total Cost: ₹{totalCost.toFixed(2)}</div>
//     </div>
//   );
// }
