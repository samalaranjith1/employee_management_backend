"use client";

import React from "react";
import { Card } from "react-bootstrap";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function PurchaseDistributionGraph({ pieData, styles }) {
  // Custom label renderer with percentage + leader line
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20; // label position
    const lineRadius = outerRadius + 10; // end of line
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const lineX = cx + lineRadius * Math.cos(-midAngle * RADIAN);
    const lineY = cy + lineRadius * Math.sin(-midAngle * RADIAN);
    const color = pieData[index]?.color || "#000";

    return (
      <g>
        {/* Leader line */}
        <line
          x1={lineX}
          y1={lineY}
          x2={x}
          y2={y}
          stroke={color}
          strokeWidth={1.5}
        />
        {/* Percentage label */}
        <text
          x={x}
          y={y}
          fill={color}
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          style={{ fontSize: 12, fontWeight: 600 }}
        >
          {`${(percent * 100).toFixed(1)}%`}
        </text>
      </g>
    );
  };

  return (
    <>
      <div className="fw-semibold mb-2">Purchase Distribution</div>
      <Card className="p-3">
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart className="pie-chart-no-outline">
              <Pie
                data={pieData}
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                isAnimationActive={true}
                labelLine={false}
                label={renderCustomizedLabel} // percentage labels
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} units`, name]}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "none",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={styles.pieLegend}>
          {pieData.slice(0, 5).map((item, idx) => (
            <div style={styles.legendItem} key={idx}>
              <div
                style={{
                  ...styles.legendDot,
                  backgroundColor: item.color,
                }}
              ></div>
              {item.name}
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
// "use client";

// import React from "react";
// import { Card } from "react-bootstrap";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// export default function PurchaseDistributionGraph({ pieData, styles }) {
//   return (
//     <>
//       <div className="fw-semibold mb-2">Purchase Distribution</div>
//       <Card className="p-3">
//         <div className="chart-wrapper">
//           <ResponsiveContainer width="100%" height={350}>
//             <PieChart className="pie-chart-no-outline">
//               <Pie
//                 data={pieData}
//                 innerRadius={50}
//                 outerRadius={80}
//                 paddingAngle={2}
//                 dataKey="value"
//                 isAnimationActive={true}
//               >
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip
//                 formatter={(value, name) => [`${value} units`, name]}
//                 contentStyle={{
//                   backgroundColor: "#fff",
//                   border: "none",
//                   borderRadius: "8px",
//                 }}
//               />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//         <div style={styles.pieLegend}>
//           {pieData.slice(0,5).map((item, idx) => (
//             <div style={styles.legendItem} key={idx}>
//               <div
//                 style={{
//                   ...styles.legendDot,
//                   backgroundColor: item.color,
//                 }}
//               ></div>
//               {item.name}
//             </div>
//           ))}
//         </div>
//       </Card>
//     </>
//   );
// }
