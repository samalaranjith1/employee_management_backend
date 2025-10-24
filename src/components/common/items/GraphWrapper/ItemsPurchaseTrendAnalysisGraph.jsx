"use client";

import { IconTrendingUp } from "@tabler/icons-react";
import React from "react";
import { Card, ButtonGroup, Button, ToggleButton, Row, Col } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Label,
  Legend,
} from "recharts";

export default function ItemsPurchaseTrendAnalysisGraph({
  chartData,
  filter,
  setFilter,
}) {
  const tabs = ["Daily", "Same Days", "Weekly", "Monthly"];

  return (
    <Card className="shadow-sm border-0 mb-4 rounded-4">
      <Card.Body style={{ overflowX: "auto" }}>
        <div style={{ minWidth: 900, maxWidth: "100%", height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#3b82f6"
                tickFormatter={(v) => `₹${v}`}
              >
                <Label
                  // value="Purchase Amount"
                  angle={-90}
                  position="insideLeft"
                  style={{
                    textAnchor: "middle",
                    fill: "#3b82f6",
                    fontSize: 12,
                  }}
                />
              </YAxis>
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#8b5cf6"
                tickFormatter={(v) => `₹${v}`}
              >
                <Label
                  // value="Average Price"
                  angle={90}
                  position="insideRight"
                  style={{
                    textAnchor: "middle",
                    fill: "#8b5cf6",
                    fontSize: 12,
                  }}
                />
              </YAxis>
              <Tooltip />
              <Legend
                verticalAlign="bottom"
                height={8}
                iconType="line"
                align="center"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="purchaseAmount"
                stroke="#3b82f6"
                name="Purchase Amount"
                strokeWidth={2}
                dot={{ r: 5, fill: "#3b82f6" }}
                label={{
                  position: "top",
                  fill: "#3b82f6",
                  fontSize: 12,
                }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avgPrice"
                stroke="#8b5cf6"
                name="Average Price"
                strokeWidth={2}
                dot={{ r: 5, fill: "#8b5cf6" }}
                label={{
                  position: "top",
                  fill: "#8b5cf6",
                  fontSize: 12,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  );
}
// "use client";

// import { IconTrendingUp } from "@tabler/icons-react";
// import React from "react";
// import { Card, ButtonGroup, Button, ToggleButton, Row, Col } from "react-bootstrap";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   Label,
//   Legend,
// } from "recharts";

// export default function ItemsPurchaseTrendAnalysisGraph({
//   chartData,
//   filter,
//   setFilter,
// }) {
//   const tabs = ["Daily", "Same Days", "Weekly", "Monthly"];

//   return (
//     <Card className="shadow-sm border-0 mb-4 rounded-4">
//       <Card.Body>
//         <div style={{ width: "100%", height: 280 }}>
//           <ResponsiveContainer>
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
//               <XAxis dataKey="date" stroke="#888" />
//               <YAxis
//                 yAxisId="left"
//                 orientation="left"
//                 stroke="#3b82f6"
//                 tickFormatter={(v) => `₹${v}`}
//               >
//                 <Label
//                   // value="Purchase Amount"
//                   angle={-90}
//                   position="insideLeft"
//                   style={{
//                     textAnchor: "middle",
//                     fill: "#3b82f6",
//                     fontSize: 12,
//                   }}
//                 />
//               </YAxis>
//               <YAxis
//                 yAxisId="right"
//                 orientation="right"
//                 stroke="#8b5cf6"
//                 tickFormatter={(v) => `₹${v}`}
//               >
//                 <Label
//                   // value="Average Price"
//                   angle={90}
//                   position="insideRight"
//                   style={{
//                     textAnchor: "middle",
//                     fill: "#8b5cf6",
//                     fontSize: 12,
//                   }}
//                 />
//               </YAxis>
//               <Tooltip />
//               <Legend
//                 verticalAlign="bottom"
//                 height={8}
//                 iconType="line"
//                 align="center"
//               />
//               <Line
//                 yAxisId="left"
//                 type="monotone"
//                 dataKey="purchaseAmount"
//                 stroke="#3b82f6"
//                 name="Purchase Amount"
//                 strokeWidth={2}
//                 dot={{ r: 5, fill: "#3b82f6" }}
//                 label={{
//                   position: "top",
//                   fill: "#3b82f6",
//                   fontSize: 12,
//                 }}
//               />
//               <Line
//                 yAxisId="right"
//                 type="monotone"
//                 dataKey="avgPrice"
//                 stroke="#8b5cf6"
//                 name="Average Price"
//                 strokeWidth={2}
//                 dot={{ r: 5, fill: "#8b5cf6" }}
//                 label={{
//                   position: "top",
//                   fill: "#8b5cf6",
//                   fontSize: 12,
//                 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// }
