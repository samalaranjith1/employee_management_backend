"use client";

import React from "react";
import { Col } from "react-bootstrap";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function ItemsDepartmentDistributionChartGraph({ formatted }) {
  // ✅ check if data is valid
  const validData = Array.isArray(formatted)
    ? formatted.filter((d) => d.value > 0)
    : [];

  if (!validData || validData.length < 2) {
    return (
      <Col md={6} className="d-flex justify-content-center align-items-center">
        <div className="text-muted fw-semibold">No Data Available</div>
      </Col>
    );
  }

  return (
    <Col
      md={6}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <div style={{ width: "260px", height: "260px" }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={validData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
            >
              {validData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value}`, name]}
              contentStyle={{ borderRadius: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ Labels / Legend */}
      <div className="mt-3 d-flex flex-wrap justify-content-center">
        {validData.map((entry, index) => (
          <div
            key={index}
            className="d-flex align-items-center mx-2 mb-1"
            style={{ fontSize: "13px" }}
          >
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                borderRadius: "3px",
                backgroundColor: entry.color,
                marginRight: "6px",
              }}
            ></span>
            <span className="fw-semibold me-1">{entry.name}</span>
            <span className="text-muted">({entry.value})</span>
          </div>
        ))}
      </div>
    </Col>
  );
}
// "use client";

// import React from "react";
// import { Col } from "react-bootstrap";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// export default function ItemsDepartmentDistributionChartGraph({ formatted }) {
//   return (
//     <Col md={6} className="d-flex justify-content-center">
//       <div style={{ width: "260px", height: "260px" }}>
//         <ResponsiveContainer>
//           <PieChart>
//             <Pie
//               data={formatted}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               innerRadius={70}
//               outerRadius={100}
//               paddingAngle={3}
//             >
//               {formatted?.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={entry.color}
//                   stroke="#fff"
//                   strokeWidth={2}
//                 />
//               ))}
//             </Pie>
//             <Tooltip
//               formatter={(value, name) => [`${value}`, name]}
//               contentStyle={{ borderRadius: "12px" }}
//             />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </Col>
//   );
// }
