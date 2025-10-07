"use client";

import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ButtonGroup, ToggleButton, Card, Row, Col } from "react-bootstrap";
import { FaChartLine } from "react-icons/fa";
import { IconTrendingUp } from "@tabler/icons-react";

const tabs = ["Daily", "Same Days", "Weekly", "Monthly"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          padding: 8,
          borderRadius: 6,
          fontSize: 14,
          color: "#333",
        }}
      >
        <p>{label}</p>
        {payload.map((entry, idx) => (
          <p key={`item-${idx}`} style={{ color: entry.color, margin: 0 }}>
            {entry.name}: ₹{entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ItemsTrendAnalysisGraph({
  chartData,
  filter,
  setFilter,
}) {
  return (
    <Card
      style={{
        borderRadius: 16,
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        background: "white",
      }}
      className="mb-3"
    >
      <Card.Body>
        <Row
          className="align-items-center mb-3 p-2"
          style={{
            backgroundColor: "rgb(243,246,255)",
          }}
        >
          <Col xs="auto">
            <div style={{
              background: 'linear-gradient(135deg, #924CFE 60%, #BC75FF 100%)', // bold purple
              borderRadius: '16px',
              padding: '12px',
              display: 'inline-block'
            }}>
              <IconTrendingUp stroke={2} color="#fff" size={24} />
            </div>
          </Col>
          <Col>
            <h4 className="fw-bold mb-0" style={{ color: "#111" }}>
              Trend Analysis
            </h4>
            <small style={{ color: "#6b7280" }}>
              Sales, consumption, and inventory trends over time
            </small>
          </Col>
          <Col xs="auto">
            <ButtonGroup
              style={{
                backgroundColor: "#e4e4e7",
                borderRadius: 20,
                padding: 4,
                userSelect: "none",
              }}
            >
              {tabs.map((label) => {
                const value = label.toLowerCase().replace(/\s+/g, "");
                const isChecked = filter === value;

                return (
                  <ToggleButton
                    key={value}
                    id={`toggle-${value}`}
                    type="radio"
                    name="trend-filter" // <-- Important: same name for all radios
                    variant="light"
                    value={value}
                    checked={isChecked}
                    onChange={(e) => setFilter(e.currentTarget.value)}
                    className="rounded-pill"
                    style={{
                      fontSize: 13,
                      backgroundColor: isChecked ? "#FF5B22" : "transparent",
                      color: isChecked ? "#ffffff" : "#6C757D",
                      border: isChecked
                        ? "1px solid #FF5B22"
                        : "1px solid #dee2e6",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                  >
                    {label}
                  </ToggleButton>
                );
              })}
            </ButtonGroup>
          </Col>
          <Col xs="auto">
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#999",
                fontSize: 18,
                padding: 0,
              }}
              title="Expand"
            >
              &#x26F6;
            </button>
          </Col>
        </Row>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              stroke="#888"
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis
              stroke="#888"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `₹${value}`}
              domain={["dataMin", "dataMax"]}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="bottom"
              height={40}
              wrapperStyle={{ fontSize: 14, fontWeight: 600 }}
            />

            <Line
              type="monotone"
              dataKey="opening"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: "#3B82F6", stroke: "white", strokeWidth: 2, r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="consumption"
              stroke="#F97316"
              strokeWidth={3}
              dot={{ fill: "#F97316", stroke: "white", strokeWidth: 2, r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="closing"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ fill: "#10B981", stroke: "white", strokeWidth: 2, r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="consumptionValue"
              stroke="#8B5CF6"
              strokeWidth={3}
              dot={{ fill: "#8B5CF6", stroke: "white", strokeWidth: 2, r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
}
// "use client";

// import React from "react";
// import { Card, Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// export default function ItemsTrendAnalysisGraph({
//   chartData,
//   filter,
//   setFilter,
// }) {
//   return (
//     <Card
//       style={{
//         borderRadius: "16px",
//         padding: "20px",
//         background: "#fff",
//         boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
//       }}
//       className="mb-4"
//     >
//       <Row className="align-items-center mb-3">
//         <Col>
//           <h5 style={{ fontWeight: "600", color: "#1E1E1E", margin: 0 }}>
//             Trend Analysis
//           </h5>
//           <p style={{ color: "#6B7280", fontSize: "14px", margin: 0 }}>
//             Sales, consumption, and inventory trends over time
//           </p>
//         </Col>
//         <Col xs="auto">
//           <ButtonGroup>
//             {["Daily", "Same Days", "Weekly", "Monthly"].map((label) => (
//               <ToggleButton
//                 key={label}
//                 id={`filter-${label}`}
//                 type="radio"
//                 variant="light"
//                 value={label.toLowerCase().replace(" ", "")}
//                 checked={filter === label.toLowerCase().replace(" ", "")}
//                 onChange={(e) => setFilter(e.currentTarget.value)}
//                 className="rounded-pill px-3"
//                 style={{
//                   fontSize: "13px",
//                   backgroundColor:
//                     filter === label.toLowerCase().replace(" ", "")
//                       ? "#fff"
//                       : "transparent",
//                   color:
//                     filter === label.toLowerCase().replace(" ", "")
//                       ? "#FF5B22"
//                       : "#6C757D",
//                   border:
//                     filter === label.toLowerCase().replace(" ", "")
//                       ? "1px solid #FF5B22"
//                       : "1px solid #dee2e6",
//                 }}
//               >
//                 {label}
//               </ToggleButton>
//             ))}
//           </ButtonGroup>
//         </Col>
//       </Row>

//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//           <XAxis dataKey="date" stroke="#6B7280" />
//           <YAxis stroke="#6B7280" />
//           <Tooltip />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey="opening"
//             stroke="#3B82F6"
//             strokeWidth={2}
//             dot={false}
//             name="Opening"
//           />
//           <Line
//             type="monotone"
//             dataKey="consumption"
//             stroke="#F97316"
//             strokeWidth={2}
//             dot={false}
//             name="Consumption"
//           />
//           <Line
//             type="monotone"
//             dataKey="closing"
//             stroke="#10B981"
//             strokeWidth={2}
//             dot={false}
//             name="Closing"
//           />
//           <Line
//             type="monotone"
//             dataKey="consumptionValue"
//             stroke="#8B5CF6"
//             strokeWidth={2}
//             dot={false}
//             name="Consumption Value"
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </Card>
//   );
// }
