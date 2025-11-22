"use client";

import React from "react";
import { Card } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { handleNavigation } from "@/utils";
import { useRouter } from "next/navigation";

export default function DepartmentTrendAnalysisGraph({
  trendData,
  filter,
  setFilter,
  startDateCS,
  endDateCS,
}) {
  const router = useRouter();

  // ✅ Custom dot component for click handling
  const CustomDot = ({ cx, cy, payload, stroke, type }) => {
    if (!payload) return null;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill="white"
        stroke={stroke}
        strokeWidth={2}
        cursor="pointer"
        onClick={() => {
          let url = "";
          if (type === "Sales") url = "sp/sales_analytics";
          else if (type === "Consumption") url = "sp/consumption_analytics";
          else if (type === "Opening" || type === "Closing")
            url = "sp/consumption_closing_analytics";

          if (url) {
            handleNavigation({
              router,
              url,
              params: {
                startDate: payload.date,
                endDate: payload.date,
              },
            });
          }
        }}
      />
    );
  };

  return (
    <Card
      className="p-4 shadow-sm"
      style={{
        borderRadius: 16,
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
      {/* ✅ Scrollable wrapper for mobile */}
      <div
        style={{
          width: "100%",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* ✅ Fixed inner width ensures scroll on mobile */}
        <div style={{ width: "100%", minWidth: "900px", height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trendData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke="#ddd" strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(dateStr) => {
                  const date = new Date(dateStr);
                  const options = { month: "short", day: "numeric" };
                  return date.toLocaleDateString("en-US", options);
                }}
                tick={{ fontSize: 12, fill: "#666" }}
                axisLine={false}
                tickLine={false}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}K`}
                tick={{ fontSize: 12, fill: "#666" }}
                axisLine={false}
                tickLine={false}
                width={60}
              />
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Legend
                content={(props) => {
                  const { payload } = props;
                  return (
                    <ul
                      style={{
                        listStyle: "none",
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                        padding: 0,
                        margin: 0,
                        flexWrap: "wrap",
                      }}
                    >
                      {payload.map((entry, index) => (
                        <li
                          key={`legend-${index}`}
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            marginBottom: "6px",
                          }}
                          onClick={() =>
                            handleNavigation({
                              router,
                              url:
                                entry.value === "Sales"
                                  ? "sp/sales_analytics"
                                  : entry.value === "Consumption"
                                  ? "sp/consumption_analytics"
                                  : entry.value === "Opening"
                                  ? "sp/consumption_closing_analytics"
                                  : entry.value === "Closing"
                                  ? "sp/consumption_closing_analytics"
                                  : "",
                              params: {
                                startDate: startDateCS,
                                endDate: endDateCS,
                              },
                            })
                          }
                        >
                          <span
                            style={{
                              width: 12,
                              height: 12,
                              backgroundColor: entry.color,
                              display: "inline-block",
                              borderRadius: "3px",
                            }}
                          />
                          {entry.value}
                        </li>
                      ))}
                    </ul>
                  );
                }}
              />

              {/* ✅ Lines with clickable custom dots */}
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#1faa1f"
                strokeWidth={3}
                dot={<CustomDot stroke="#1faa1f" type="Sales" />}
                activeDot={<CustomDot stroke="#1faa1f" type="Sales" />}
                name="Sales"
              />
              <Line
                type="monotone"
                dataKey="consumption"
                stroke="#f59e0c"
                strokeWidth={3}
                dot={<CustomDot stroke="#f59e0c" type="Consumption" />}
                activeDot={<CustomDot stroke="#f59e0c" type="Consumption" />}
                name="Consumption"
              />
              <Line
                type="monotone"
                dataKey="opening"
                stroke="#3c82f6"
                strokeWidth={3}
                dot={<CustomDot stroke="#3c82f6" type="Opening" />}
                activeDot={<CustomDot stroke="#3c82f6" type="Opening" />}
                name="Opening"
              />
              <Line
                type="monotone"
                dataKey="closing"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={<CustomDot stroke="#8b5cf6" type="Closing" />}
                activeDot={<CustomDot stroke="#8b5cf6" type="Closing" />}
                name="Closing"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
// "use client";

// import React from "react";
// import { Card } from "react-bootstrap";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import { handleNavigation } from "@/utils";
// import { useRouter } from "next/navigation";

// export default function DepartmentTrendAnalysisGraph({
//   trendData,
//   filter,
//   setFilter,
//   startDateCS,
//   endDateCS,
// }) {
//   const tabs = ["Daily", "Same Days", "Weekly", "Monthly"];
//   const router = useRouter();

//   return (
//     <Card
//       className="p-4 shadow-sm"
//       style={{
//         borderRadius: 16,
//         boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
//       }}
//     >
//       {/* ✅ Scrollable wrapper for mobile */}
//       <div
//         style={{
//           width: "100%",
//           overflowX: "auto",
//           WebkitOverflowScrolling: "touch",
//         }}
//       >
//         {/* ✅ Fixed inner width ensures scroll on mobile */}
//         <div style={{ width: "100%", minWidth: "900px", height: 400 }}>
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart
//               data={trendData}
//               margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//             >
//               <CartesianGrid stroke="#ddd" strokeDasharray="3 3" />
//               <XAxis
//                 dataKey="date"
//                 tickFormatter={(dateStr) => {
//                   const date = new Date(dateStr);
//                   const options = { month: "short", day: "numeric" };
//                   return date.toLocaleDateString("en-US", options);
//                 }}
//                 tick={{ fontSize: 12, fill: "#666" }}
//                 axisLine={false}
//                 tickLine={false}
//                 padding={{ left: 10, right: 10 }}
//               />
//               <YAxis
//                 tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}K`}
//                 tick={{ fontSize: 12, fill: "#666" }}
//                 axisLine={false}
//                 tickLine={false}
//                 width={60}
//               />
//               <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
//               <Legend
//                 content={(props) => {
//                   const { payload } = props;
//                   return (
//                     <ul
//                       style={{
//                         listStyle: "none",
//                         display: "flex",
//                         justifyContent: "center",
//                         gap: "20px",
//                         padding: 0,
//                         margin: 0,
//                         flexWrap: "wrap",
//                       }}
//                     >
//                       {payload.map((entry, index) => (
//                         <li
//                           key={`legend-${index}`}
//                           style={{
//                             cursor: "pointer",
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "6px",
//                             marginBottom: "6px",
//                           }}
//                           onClick={() =>
//                             handleNavigation({
//                               router,
//                               url:
//                                 entry.value === "Sales"
//                                   ? "sp/sales_analytics"
//                                   : entry.value === "Consumption"
//                                   ? "sp/consumption_analytics"
//                                   : entry.value === "Opening"
//                                   ? "sp/consumption_closing_analytics"
//                                   : entry.value === "Closing"
//                                   ? "sp/consumption_closing_analytics"
//                                   : "",
//                               params: {
//                                 startDate: startDateCS,
//                                 endDate: endDateCS,
//                               },
//                             })
//                           }
//                         >
//                           <span
//                             style={{
//                               width: 12,
//                               height: 12,
//                               backgroundColor: entry.color,
//                               display: "inline-block",
//                               borderRadius: "3px",
//                             }}
//                           />
//                           {entry.value}
//                         </li>
//                       ))}
//                     </ul>
//                   );
//                 }}
//               />

//               {/* Lines */}
//               <Line
//                 type="monotone"
//                 dataKey="sales"
//                 stroke="#1faa1f"
//                 strokeWidth={3}
//                 dot={{ r: 5, fill: "white", stroke: "#1faa1f", strokeWidth: 2 }}
//                 activeDot={{ r: 7 }}
//                 name="Sales"
//               />
//               <Line
//                 type="monotone"
//                 dataKey="consumption"
//                 stroke="#f59e0c"
//                 strokeWidth={3}
//                 dot={{ r: 5, fill: "white", stroke: "#f59e0c", strokeWidth: 2 }}
//                 name="Consumption"
//               />
//               <Line
//                 type="monotone"
//                 dataKey="opening"
//                 stroke="#3c82f6"
//                 strokeWidth={3}
//                 dot={{ r: 5, fill: "white", stroke: "#3c82f6", strokeWidth: 2 }}
//                 name="Opening"
//               />
//               <Line
//                 type="monotone"
//                 dataKey="closing"
//                 stroke="#8b5cf6"
//                 strokeWidth={3}
//                 dot={{ r: 5, fill: "white", stroke: "#8b5cf6", strokeWidth: 2 }}
//                 name="Closing"
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </Card>
//   );
// }
// "use client";

// import React from "react";
// import { Card, Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import { FaArrowUp } from "react-icons/fa";
// import { IconTrendingUp } from "@tabler/icons-react";
// import { handleNavigation } from "@/utils";
// import { useRouter } from "next/navigation";
// export default function DepartmentTrendAnalysisGraph({
//   trendData,
//   filter,
//   setFilter,
//   startDateCS,
//   endDateCS,
// }) {
//   const tabs = ["Daily", "Same Days", "Weekly", "Monthly"];
//   const router = useRouter();
//   return (
//     <Card
//       className="p-4 shadow-sm"
//       style={{
//         borderRadius: 16,
//         boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
//       }}
//     >
//       <div style={{ width: "100%", height: 400 }}>
//         <ResponsiveContainer>
//           <LineChart
//             data={trendData}
//             margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//           >
//             <CartesianGrid stroke="#ddd" strokeDasharray="3 3" />
//             <XAxis
//               dataKey="date"
//               tickFormatter={(dateStr) => {
//                 const date = new Date(dateStr);
//                 const options = { month: "short", day: "numeric" };
//                 return date.toLocaleDateString("en-US", options); // e.g., Dec 1
//               }}
//               tick={{ fontSize: 12, fill: "#666" }}
//               axisLine={false}
//               tickLine={false}
//               padding={{ left: 10, right: 10 }}
//             />
//             <YAxis
//               tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}K`}
//               tick={{ fontSize: 12, fill: "#666" }}
//               axisLine={false}
//               tickLine={false}
//               width={60}
//             />
//             <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
//             <Legend
//               content={(props) => {
//                 const { payload } = props;
//                 return (
//                   <ul
//                     style={{
//                       listStyle: "none",
//                       display: "flex",
//                       justifyContent: "center",
//                       gap: "20px",
//                       padding: 0,
//                       margin: 0,
//                       flexWrap: "wrap", // ✅ allow wrapping on mobile
//                     }}
//                   >
//                     {payload.map((entry, index) => (
//                       <li
//                         key={`legend-${index}`}
//                         style={{
//                           cursor: "pointer",
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "6px",
//                           marginBottom: "6px", // ✅ add small spacing between wrapped rows
//                         }}
//                         onClick={() =>
//                           handleNavigation({
//                             router,
//                             url:
//                               entry.value === "Sales"
//                                 ? "sp/sales_analytics"
//                                 : entry.value === "Consumption"
//                                 ? "sp/consumption_analytics"
//                                 : entry.value === "Opening"
//                                 ? "sp/consumption_closing_analytics"
//                                 : entry.value === "Closing"
//                                 ? "sp/consumption_closing_analytics"
//                                 : "",
//                             params: {
//                               startDate: startDateCS,
//                               endDate: endDateCS,
//                             },
//                           })
//                         }
//                       >
//                         <span
//                           style={{
//                             width: 12,
//                             height: 12,
//                             backgroundColor: entry.color,
//                             display: "inline-block",
//                             borderRadius: "3px",
//                           }}
//                         />
//                         {entry.value}
//                       </li>
//                     ))}
//                   </ul>
//                 );
//               }}
//             />

//             {/* Sales */}
//             <Line
//               type="monotone"
//               dataKey="sales"
//               stroke="#1faa1f"
//               strokeWidth={3}
//               dot={{ r: 5, fill: "white", stroke: "#1faa1f", strokeWidth: 2 }}
//               activeDot={{ r: 7 }}
//               name="Sales"
//             />
//             {/* Consumption */}
//             <Line
//               type="monotone"
//               dataKey="consumption"
//               stroke="#f59e0c"
//               strokeWidth={3}
//               dot={{ r: 5, fill: "white", stroke: "#f59e0c", strokeWidth: 2 }}
//               name="Consumption"
//             />
//             {/* Opening */}
//             <Line
//               type="monotone"
//               dataKey="opening"
//               stroke="#3c82f6"
//               strokeWidth={3}
//               dot={{ r: 5, fill: "white", stroke: "#3c82f6", strokeWidth: 2 }}
//               name="Opening"
//             />
//             {/* Closing */}
//             <Line
//               type="monotone"
//               dataKey="closing"
//               stroke="#8b5cf6"
//               strokeWidth={3}
//               dot={{ r: 5, fill: "white", stroke: "#8b5cf6", strokeWidth: 2 }}
//               name="Closing"
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </Card>
//   );
// }
// "use client";

// import React from "react";
// import { Card, Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import { FaArrowUp } from "react-icons/fa";
// import { IconTrendingUp } from "@tabler/icons-react";
// import { handleNavigation } from "@/utils";
// import { useRouter } from "next/navigation";
// export default function DepartmentTrendAnalysisGraph({
//   trendData,
//   filter,
//   setFilter,
//   startDateCS,
//   endDateCS,
// }) {
//   const tabs = ["Daily", "Same Days", "Weekly", "Monthly"];
//   const router = useRouter();
//   return (
//     // <Card className="p-3 shadow-sm" style={{ borderRadius: "16px" }}>
//     <Card
//       className="p-4 shadow-sm"
//       style={{
//         borderRadius: 16,
//         boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
//       }}
//     >
//       {/* Header + Filter */}
//       {/* <Row className="align-items-center mb-3">
//         <Col>
//           <h5 className="fw-bold mb-0 d-flex align-items-center">
//             <div
//               style={{
//                 background: "#3a58eb",  
//                 borderRadius: "12px",
//                 padding: "8px",
//                 display: "inline-block",
//               }}
//             >
//               <IconTrendingUp stroke={2} color="#fff" size={20} />
//             </div>

//             <div className="d-flex flex-column">
//               <span className="ps-1">Trend Analysis</span>
//               <small className="text-muted" style={{ fontWeight: "normal" }}>
//                 Sales, consumption, and inventory trends over time
//               </small>
//             </div>
//           </h5>
//         </Col>
//         <Col xs="auto">
//           <ButtonGroup
//             className="rounded-pill"
//             style={{ backgroundColor: "#E6E6E6" }}
//           >
//             {tabs.map((label) => {
//               const value = label.toLowerCase().replace(" ", "");
//               const selected = filter === value;
//               return (
//                 <ToggleButton
//                   key={label}
//                   id={`dept-graph-${label}`}
//                   type="radio"
//                   variant="none"
//                   checked={selected}
//                   value={value}
//                   onChange={(e) => setFilter(e.currentTarget.value)}
//                   className="rounded-pill"
//                   style={{
//                     fontSize: "13px",
//                     padding: "6px 16px",
//                     backgroundColor: selected ? "#FF6600" : "transparent",
//                     color: selected ? "white" : "#888",
//                     border: "none",
//                     cursor: "pointer",
//                     userSelect: "none",
//                   }}
//                 >
//                   {label}
//                 </ToggleButton>
//               );
//             })}
//           </ButtonGroup>
//         </Col>
//       </Row> */}

//       {/* Line Chart */}
//       <div style={{ width: "100%", height: 400 }}>
//         {/* <ResponsiveContainer>
//           <LineChart data={trendData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />

//             <Line
//               type="monotone"
//               dataKey="sales"
//               stroke="#4CAF50"
//               strokeWidth={2}
//               dot={{ r: 4 }}
//               name="Sales"
//             />
//             <Line
//               type="monotone"
//               dataKey="consumption"
//               stroke="#FB8C00"
//               strokeWidth={2}
//               dot={{ r: 4 }}
//               name="Consumption"
//             />
//             <Line
//               type="monotone"
//               dataKey="opening"
//               stroke="#42A5F5"
//               strokeWidth={2}
//               dot={{ r: 4 }}
//               name="Opening"
//             />
//             <Line
//               type="monotone"
//               dataKey="closing"
//               stroke="#9C27B0"
//               strokeWidth={2}
//               dot={{ r: 4 }}
//               name="Closing"
//             />
//           </LineChart>
//         </ResponsiveContainer> */}
//         <ResponsiveContainer>
//           <LineChart
//             data={trendData}
//             margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//           >
//             <CartesianGrid stroke="#ddd" strokeDasharray="3 3" />
//             <XAxis
//               dataKey="date"
//               tickFormatter={(dateStr) => {
//                 const date = new Date(dateStr);
//                 const options = { month: "short", day: "numeric" };
//                 return date.toLocaleDateString("en-US", options); // e.g., Dec 1
//               }}
//               tick={{ fontSize: 12, fill: "#666" }}
//               axisLine={false}
//               tickLine={false}
//               padding={{ left: 10, right: 10 }}
//             />
//             <YAxis
//               tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}K`}
//               tick={{ fontSize: 12, fill: "#666" }}
//               axisLine={false}
//               tickLine={false}
//               width={60}
//             />
//             <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
//             <Legend
//               content={(props) => {
//                 const { payload } = props;
//                 return (
//                   <ul
//                     style={{
//                       listStyle: "none",
//                       display: "flex",
//                       justifyContent: "center",
//                       gap: "20px",
//                       padding: 0,
//                       margin: 0,
//                       flexWrap: "wrap", // ✅ allow wrapping on mobile
//                     }}
//                   >
//                     {payload.map((entry, index) => (
//                       <li
//                         key={`legend-${index}`}
//                         style={{
//                           cursor: "pointer",
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "6px",
//                           marginBottom: "6px", // ✅ add small spacing between wrapped rows
//                         }}
//                         onClick={() =>
//                           handleNavigation({
//                             router,
//                             url:
//                               entry.value === "Sales"
//                                 ? "sp/sales_analytics"
//                                 : entry.value === "Consumption"
//                                 ? "sp/consumption_analytics"
//                                 : entry.value === "Opening"
//                                 ? "sp/consumption_closing_analytics"
//                                 : entry.value === "Closing"
//                                 ? "sp/consumption_closing_analytics"
//                                 : "",
//                             params: {
//                               startDate: startDateCS,
//                               endDate: endDateCS,
//                             },
//                           })
//                         }
//                       >
//                         <span
//                           style={{
//                             width: 12,
//                             height: 12,
//                             backgroundColor: entry.color,
//                             display: "inline-block",
//                             borderRadius: "3px",
//                           }}
//                         />
//                         {entry.value}
//                       </li>
//                     ))}
//                   </ul>
//                 );
//               }}
//             />

//             {/* Sales */}
//             <Line
//               type="monotone"
//               dataKey="sales"
//               stroke="#1faa1f"
//               strokeWidth={3}
//               dot={{ r: 5, fill: "white", stroke: "#1faa1f", strokeWidth: 2 }}
//               activeDot={{ r: 7 }}
//               name="Sales"
//             />
//             {/* Consumption */}
//             <Line
//               type="monotone"
//               dataKey="consumption"
//               stroke="#f59e0c"
//               strokeWidth={3}
//               dot={{ r: 5, fill: "white", stroke: "#f59e0c", strokeWidth: 2 }}
//               name="Consumption"
//             />
//             {/* Opening */}
//             <Line
//               type="monotone"
//               dataKey="opening"
//               stroke="#3c82f6"
//               strokeWidth={3}
//               dot={{ r: 5, fill: "white", stroke: "#3c82f6", strokeWidth: 2 }}
//               name="Opening"
//             />
//             {/* Closing */}
//             <Line
//               type="monotone"
//               dataKey="closing"
//               stroke="#8b5cf6"
//               strokeWidth={3}
//               dot={{ r: 5, fill: "white", stroke: "#8b5cf6", strokeWidth: 2 }}
//               name="Closing"
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* <Row className="mt-3">
//         <Col className="d-flex justify-content-center gap-4">
//           <span className="fw-semibold" style={{ color: "#4CAF50" }}>
//             Sales
//           </span>
//           <span className="fw-semibold" style={{ color: "#FB8C00" }}>
//             Consumption
//           </span>
//           <span className="fw-semibold" style={{ color: "#42A5F5" }}>
//             Opening
//           </span>
//           <span className="fw-semibold" style={{ color: "#9C27B0" }}>
//             Closing
//           </span>
//         </Col>
//       </Row> */}
//       {/* <Row className="mt-3">
//         <Col className="d-flex justify-content-center gap-3">
//           {[
//             { label: "Sales", color: "#4CAF50" },
//             { label: "Consumption", color: "#FB8C00" },
//             { label: "Opening", color: "#42A5F5" },
//             { label: "Closing", color: "#9C27B0" },
//           ].map(({ label, color }) => (
//             <span
//               key={label}
//               className="fw-semibold"
//               style={{ color, fontSize: 13 }}
//             >
//               {label}
//             </span>
//           ))}
//         </Col>
//       </Row> */}
//     </Card>
//   );
// }
