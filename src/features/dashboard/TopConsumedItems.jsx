"use client";

import React, { useRef } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaUtensils, FaExpand } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { useItemsUsageList } from "@/services/item-service";
import { topConsumedItemsDataFormatter } from "@/utils/data_formatters/dashboardFormatter";
import { handleNavigation } from "@/utils";
import { useRouter } from "next/navigation";

// Predefined consistent colors for slices following first image palette
const COLORS = [
  "#F76684", // red slice
  "#C73DD5", // purple slice
  "#4153B2", // blue slice
  "#9BC4A5", // green slice
  "#F4C044", // yellow slice
  "#F5ABDE", // pink slice
  "#65A5ED", // light blue slice
  "#6B4CC4", // dark purple slice
  "#30BDC7", // turquoise slice
  "#FCA54C", // orange slice
];

export default function TopConsumedItems() {
  const { startDate, endDate } = useDashboardContext();
  const myScrollRef = useRef(null);
    const router = useRouter();
  
  // Place percent outside the edge of each sector
  const renderLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    // Push the label outside the pie at the mid angle of the sector
    const labelRadius = outerRadius + 24; // You can tweak this for spacing
    const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
    const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fontWeight="bold"
        fontSize={14}
        fill={COLORS[index % COLORS.length]}
        textAnchor={x > cx ? "start" : "end"}
        alignmentBaseline="middle"
      >
        {percent}%
      </text>
    );
  };

  return (
    <ServiceRenderer
      queryHook={useItemsUsageList}
      queryKey={["topConsumedItems", { startdt: startDate, enddt: endDate }]}
      queryFn={() =>
        useItemsUsageList(1, { startdt: startDate, enddt: endDate }).queryFn
      }
      queryArgs={[{ startdt: startDate, enddt: endDate, outlet: 1, userId: 7 }]}
      formatter={topConsumedItemsDataFormatter}
      shimmerCount={2}
    >
      {(chartData) => {
        const { data, total } = chartData;

        // Calculate percentages if not present
        const totalValue = total || data.reduce((sum, d) => sum + d.value, 0);
        const dataWithPercent = data.map((item) => ({
          ...item,
          percent: item.percent ?? ((item.value / totalValue) * 100).toFixed(1),
        }));

        return (
          <Card
            className="p-3"
            style={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            {/* Header */}
            <Row className="align-items-center mb-3">
              <Col xs="auto">
                <div
                  style={{
                    backgroundColor: "#FFECE7",
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaUtensils color="#FF5016" />
                </div>
              </Col>
              <Col>
                <h6
                  className="mb-0"
                  style={{ color: "#FF5016", fontWeight: 600 }}
                >
                  Top Consumed Items
                </h6>
              </Col>
              <Col xs="auto">
                <FaExpand color="#A0AEC0" />
              </Col>
            </Row>

            {/* Body */}
            <Row>
              {/* Left: Donut Chart */}
              <Col
                md={5}
                className="d-flex align-items-center justify-content-center"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dataWithPercent}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={2}
                      isAnimationActive={true}
                      label={renderLabel}
                    >
                      {dataWithPercent.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name, props) => [
                        `₹${value.toLocaleString()}`,
                        props.payload.name,
                      ]}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        fontSize: "0.85rem",
                        padding: "6px 10px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Col>

              {/* Right: Legend + Values */}
              <Col md={7} style={{ maxHeight: 300, overflowY: "auto" }}>
                {dataWithPercent.map((item, idx) => (
                  <Row
                    key={idx}
                    className="align-items-center mb-2"
                    style={{ fontSize: "14px" }}
                  >
                    {/* Color Dot */}
                    <Col xs="auto">
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: COLORS[idx % COLORS.length],
                        }}
                      />
                    </Col>
                    {/* Name + Category */}
                    <Col>
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      <div style={{ fontSize: "12px", color: "#718096" }}>
                        {item.category}
                      </div>
                    </Col>
                    {/* Value + Percent */}
                    <Col
                      xs="auto"
                      className="text-end"
                      onClick={() =>
                        handleNavigation({
                          router,
                          url: "consumption_analytics",
                          params: {
                            startDate: startDate,
                            endDate: endDate,
                            departments: item?.departmentId,
                          },
                        })
                      }
                    >
                      <div style={{ fontWeight: 600 }}>
                        ₹{Math.round(item.value).toLocaleString()}
                      </div>
                      <div style={{ fontSize: "12px", color: "#718096" }}>
                        {item.percent ? `${item.percent}%` : ""}
                      </div>
                    </Col>
                  </Row>
                ))}
              </Col>
            </Row>

            {/* Footer */}
            <Row className="mt-3">
              <Col>
                <strong>Total Consumption:</strong>
              </Col>
              <Col xs="auto" style={{ fontWeight: 600, color: "#FF5016" }}>
                ₹{totalValue.toLocaleString()}
              </Col>
            </Row>
          </Card>
        );
      }}
    </ServiceRenderer>
  );
}
// "use client";

// import React, { useRef } from "react";
// import { Card, Row, Col } from "react-bootstrap";
// import { FaUtensils, FaExpand, FaSortUp, FaSortDown } from "react-icons/fa";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import { useItemsUsageList } from "@/services/item-service";
// import { topConsumedItemsDataFormatter } from "@/utils/data_formatters/dashboardFormatter";

// export default function TopConsumedItems() {
//   const { startDate, endDate } = useDashboardContext();
//   const myScrollRef = useRef(null);

//   return (
//     <ServiceRenderer
//       queryHook={useItemsUsageList}
//       queryKey={["topConsumedItems", { startdt: startDate, enddt: endDate }]}
//       queryFn={() =>
//         useItemsUsageList(1, { startdt: startDate, enddt: endDate }).queryFn
//       }
//       queryArgs={[{ startdt: startDate, enddt: endDate, outlet: 1, userId: 7 }]}
//       formatter={topConsumedItemsDataFormatter}
//       shimmerCount={2}
//     >
//       {(chartData) => {
//         const { data, total } = chartData;
//         return (
//           <Card
//             className="p-3"
//             style={{
//               borderRadius: "12px",
//               border: "none",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
//             }}
//           >
//             {/* Header */}
//             <Row className="align-items-center mb-3">
//               <Col xs="auto">
//                 <div
//                   style={{
//                     backgroundColor: "#FFECE7",
//                     borderRadius: "50%",
//                     width: 36,
//                     height: 36,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <FaUtensils color="#FF5016" />
//                 </div>
//               </Col>
//               <Col>
//                 <h6
//                   className="mb-0"
//                   style={{ color: "#FF5016", fontWeight: 600 }}
//                 >
//                   Top Consumed Items
//                 </h6>
//               </Col>
//               <Col xs="auto">
//                 <FaExpand color="#A0AEC0" />
//               </Col>
//             </Row>

//             {/* Body */}
//             <Row>
//               {/* Left: Donut Chart */}
//               <Col
//                 md={5}
//                 className="d-flex align-items-center justify-content-center"
//               >
//                 <ResponsiveContainer width="100%" height={250}>
//                   <PieChart>
//                     <Pie
//                       data={chartData}
//                       dataKey="value"
//                       nameKey="name"
//                       innerRadius={70}
//                       outerRadius={100}
//                       paddingAngle={2}
//                       isAnimationActive={true}
//                       label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
//                     >
//                       {chartData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip
//                       formatter={(value, name, props) => [
//                         `₹${value.toLocaleString()}`,
//                         props.payload.name,
//                       ]}
//                       contentStyle={{
//                         backgroundColor: "#fff",
//                         border: "1px solid #ddd",
//                         borderRadius: "6px",
//                         fontSize: "0.85rem",
//                         padding: "6px 10px",
//                       }}
//                     />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </Col>

//               {/* Right: Legend + Values */}
//               <Col md={7} style={{ maxHeight: 250, overflowY: "auto" }}>
//                 {chartData.map((item, idx) => (
//                   <Row
//                     key={idx}
//                     className="align-items-center mb-2"
//                     style={{ fontSize: "14px" }}
//                   >
//                     {/* Color Dot */}
//                     <Col xs="auto">
//                       <div
//                         style={{
//                           width: 10,
//                           height: 10,
//                           borderRadius: "50%",
//                           backgroundColor: item.color,
//                         }}
//                       />
//                     </Col>
//                     {/* Name + Category */}
//                     <Col>
//                       <div style={{ fontWeight: 500 }}>{item.name}</div>
//                       <div style={{ fontSize: "12px", color: "#718096" }}>
//                         {item.category}
//                       </div>
//                     </Col>
//                     {/* Value + Percent */}
//                     <Col xs="auto" className="text-end">
//                       <div style={{ fontWeight: 500 }}>
//                         ₹{item.value.toLocaleString()}
//                         {item.change === "up" && (
//                           <FaSortUp
//                             size={12}
//                             style={{ marginLeft: 4, color: "#2ecc71" }}
//                           />
//                         )}
//                         {item.change === "down" && (
//                           <FaSortDown
//                             size={12}
//                             style={{ marginLeft: 4, color: "#e74c3c" }}
//                           />
//                         )}
//                       </div>
//                       <div style={{ fontSize: "12px", color: "#718096" }}>
//                         {item.percent
//                           ? `${item.percent}%`
//                           : `${((item.value / total) * 100).toFixed(1)}%`}
//                       </div>
//                     </Col>
//                   </Row>
//                 ))}
//               </Col>
//             </Row>

//             {/* Footer */}
//             <Row className="mt-3">
//               <Col>
//                 <strong>Total Consumption:</strong>
//               </Col>
//               <Col xs="auto" style={{ fontWeight: 600, color: "#FF5016" }}>
//                 ₹{total?.toLocaleString()}
//               </Col>
//             </Row>
//           </Card>
//         );
//       }}
//     </ServiceRenderer>
//   );
// }

// // "use client";

// // import React from "react";
// // import { Card, Row, Col } from "react-bootstrap";
// // import { FaUtensils, FaExpand, FaSortUp, FaSortDown } from "react-icons/fa";
// // import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// // export default function TopConsumedItems() {
// //   // Raw data
// //   const data = [
// //     {
// //       name: "Basmati Rice",
// //       category: "Grains",
// //       value: 45000,
// //       percent: 18.5,
// //       color: "#E74C3C",
// //       change: "up",
// //     },
// //     {
// //       name: "Chicken Breast",
// //       category: "Protein",
// //       value: 38000,
// //       percent: 15.6,
// //       color: "#2980B9",
// //       change: "up",
// //     },
// //     {
// //       name: "Paneer",
// //       category: "Dairy",
// //       value: 32000,
// //       percent: 13.2,
// //       color: "#27AE60",
// //       change: "up",
// //     },
// //     {
// //       name: "Onions",
// //       category: "Vegetables",
// //       value: 28000,
// //       percent: 11.5,
// //       color: "#F39C12",
// //       change: "up",
// //     },
// //     {
// //       name: "Tomatoes",
// //       category: "Vegetables",
// //       value: 25000,
// //       percent: 10.3,
// //       color: "#8E44AD",
// //       change: "up",
// //     },
// //     {
// //       name: "Wheat Flour",
// //       category: "Grains",
// //       value: 22000,
// //       percent: 9.1,
// //       color: "#D35400",
// //       change: "up",
// //     },
// //     {
// //       name: "Green Chilies",
// //       category: "Spices",
// //       value: 18000,
// //       percent: 7.4,
// //       color: "#16A085",
// //       change: "down",
// //     },
// //     {
// //       name: "Garam Masala",
// //       category: "Spices",
// //       value: 15000,
// //       percent: 6.2,
// //       color: "#2C3E50",
// //       change: "down",
// //     },
// //   ];

// //   const total = data.reduce((sum, item) => sum + item.value, 0);

// //   return (
// //     <Card
// //       className="p-3"
// //       style={{
// //         borderRadius: "12px",
// //         border: "none",
// //         boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
// //       }}
// //     >
// //       {/* Header */}
// //       <Row className="align-items-center mb-3">
// //         <Col xs="auto">
// //           <div
// //             style={{
// //               backgroundColor: "#FFECE7",
// //               borderRadius: "50%",
// //               width: 36,
// //               height: 36,
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //             }}
// //           >
// //             <FaUtensils color="#FF5016" />
// //           </div>
// //         </Col>
// //         <Col>
// //           <h6 className="mb-0" style={{ color: "#FF5016", fontWeight: 600 }}>
// //             Top Consumed Items
// //           </h6>
// //         </Col>
// //         <Col xs="auto">
// //           <FaExpand color="#A0AEC0" />
// //         </Col>
// //       </Row>

// //       {/* Body */}
// //       <Row>
// //         {/* Left: Donut Chart */}
// //         <Col
// //           md={5}
// //           className="d-flex align-items-center justify-content-center"
// //         >
// //           <ResponsiveContainer width="100%" height={250}>
// //             <PieChart>
// //               <Pie
// //                 data={data}
// //                 dataKey="value"
// //                 nameKey="name"
// //                 innerRadius={70}
// //                 outerRadius={100}
// //                 paddingAngle={2}
// //                 isAnimationActive={true}
// //                 label={({ name, percent }) => `${percent.toFixed(1)}%`}
// //               >
// //                 {data.map((entry, index) => (
// //                   <Cell key={`cell-${index}`} fill={entry.color} />
// //                 ))}
// //               </Pie>
// //               {/* Tooltip on hover */}
// //               <Tooltip
// //                 formatter={(value, name, props) => [
// //                   `₹${value.toLocaleString()}`,
// //                   props.payload.name,
// //                 ]}
// //                 contentStyle={{
// //                   backgroundColor: "#fff",
// //                   border: "1px solid #ddd",
// //                   borderRadius: "6px",
// //                   fontSize: "0.85rem",
// //                   padding: "6px 10px",
// //                 }}
// //               />
// //             </PieChart>
// //           </ResponsiveContainer>
// //         </Col>

// //         {/* Right: Legend + Values */}
// //         <Col md={7} style={{ maxHeight: 250, overflowY: "auto" }}>
// //           {data.map((item, idx) => (
// //             <Row
// //               key={idx}
// //               className="align-items-center mb-2"
// //               style={{ fontSize: "14px" }}
// //             >
// //               {/* Color Dot */}
// //               <Col xs="auto">
// //                 <div
// //                   style={{
// //                     width: 10,
// //                     height: 10,
// //                     borderRadius: "50%",
// //                     backgroundColor: item.color,
// //                   }}
// //                 />
// //               </Col>
// //               {/* Name + Category */}
// //               <Col>
// //                 <div style={{ fontWeight: 500 }}>{item.name}</div>
// //                 <div style={{ fontSize: "12px", color: "#718096" }}>
// //                   {item.category}
// //                 </div>
// //               </Col>
// //               {/* Value + Percent */}
// //               <Col xs="auto" className="text-end">
// //                 <div style={{ fontWeight: 500 }}>
// //                   ₹{item.value.toLocaleString()}
// //                   {item.change === "up" && (
// //                     <FaSortUp
// //                       size={12}
// //                       style={{ marginLeft: 4, color: "#2ecc71" }}
// //                     />
// //                   )}
// //                   {item.change === "down" && (
// //                     <FaSortDown
// //                       size={12}
// //                       style={{ marginLeft: 4, color: "#e74c3c" }}
// //                     />
// //                   )}
// //                 </div>
// //                 <div style={{ fontSize: "12px", color: "#718096" }}>
// //                   {item.percent}%
// //                 </div>
// //               </Col>
// //             </Row>
// //           ))}
// //         </Col>
// //       </Row>

// //       {/* Footer */}
// //       <Row className="mt-3">
// //         <Col>
// //           <strong>Total Consumption:</strong>
// //         </Col>
// //         <Col xs="auto" style={{ fontWeight: 600, color: "#FF5016" }}>
// //           ₹{total.toLocaleString()}
// //         </Col>
// //       </Row>
// //     </Card>
// //   );
// // }
