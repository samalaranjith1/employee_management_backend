"use client";

import React, { useRef } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { useItemsUsageList } from "@/services/item-service";
import { topConsumedItemsDataFormatter } from "@/utils/data_formatters/dashboardFormatter";
import { handleNavigation } from "@/utils";
import { useRouter } from "next/navigation";
import ComponentHeader from "@/components/common/ComponentHeader";
import { IconTarget } from "@tabler/icons-react";
import '@/app/globals.css'
// Predefined consistent colors for slices
const COLORS = [
  "#F76684",
  "#C73DD5",
  "#4153B2",
  "#9BC4A5",
  "#F4C044",
  "#F5ABDE",
  "#65A5ED",
  "#6B4CC4",
  "#30BDC7",
  "#FCA54C",
];

export default function TopConsumedItems() {
  const { startDate, endDate } = useDashboardContext();
  const myScrollRef = useRef(null);
  const router = useRouter();

  const styles = {
    card: {
      borderRadius: "12px",
      padding: "1.5rem",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      backgroundColor: "#fff",
      height: "100%",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      marginBottom: "1rem",
      color: "#000",
      fontWeight: 600,
      fontSize: "1.1rem",
    },
    legendItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "0.6rem",
    },
    legendLabel: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.9rem",
    },
    colorDot: (color) => ({
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      backgroundColor: color,
    }),
    total: {
      marginTop: "1rem",
      fontWeight: 600,
      fontSize: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginTop: "-5px",
    },
    scrollBox: {
      maxHeight: "65vh",
      overflowY: "auto",
      paddingRight: "6px",
    },
  };

  // Place percent outside the edge of each sector
  const renderLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const labelRadius = outerRadius + 24;
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

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      return (
        <div
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            padding: "6px 10px",
            borderRadius: "6px",
            fontSize: "0.85rem",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          <strong>{name}</strong>
          <div>₹{value.toLocaleString()}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <Container fluid className="p-2">
      <ComponentHeader
        title={"Top Consumed Items"}
        description={
          "Monitor wastage patterns and consumption inefficiencies across menu items"
        }
        titleColor={"#000"}
        cardBgColor={"none"}
        isShowArrows={true}
        isExpandable={true}
        titleIcon={
          <div
            style={{
              background: "#fc3830",
              borderRadius: "12px",
              padding: "8px",
              display: "inline-block",
            }}
          >
            <IconTarget stroke={2} color="#fff" size={24} />
          </div>
        }
        text={""}
      />

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
          const totalValue = total || data.reduce((sum, d) => sum + d.value, 0);
          const dataWithPercent = data.map((item) => ({
            ...item,
            percent: item.percent ?? ((item.value / totalValue) * 100).toFixed(1),
          }));

          return (
            <Card style={styles.card}>
              <Row style={{ height: "65vh" }}>
                {/* Pie Chart */}
                <Col
                  md={6}
                  sm={12}
                  className="d-flex justify-content-center align-items-center"
                >
                  <div
                    style={{
                      width: "100%",
                      maxWidth: 400,
                      height: 300, // fixed height works well on mobile
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={dataWithPercent}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={70}
                          outerRadius={125} // slightly smaller than 125 to fit mobile
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
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Col>


                {/* Right: Legend + Values */}
                <Col md={6} sm={12} style={{ height: "60vh" }}>
                  <div style={styles.scrollBox}>
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
                              url: "sp/consumption_analytics",
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
                  </div>
                  <div style={styles.total}>
                    <span className="c_small_text_extra_bold">Total Consumption:</span>
                    <span
                      style={{ paddingRight: "3vw" }}
                      className="c_small_text_extra_bold"
                    >
                      ₹{totalValue.toLocaleString()}
                    </span>
                  </div>
                </Col>
              </Row>

            </Card>
          );
        }}
      </ServiceRenderer>
    </Container>

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
