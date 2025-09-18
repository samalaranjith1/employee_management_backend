"use client";

import React, { useRef } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useDepartmentsUsageList } from "@/services/department-service";
import { departmentConsumptionPieChartFormatter } from "@/utils/data_formatters/dashboardFormatter";
import { useDashboardContext } from "@/contexts/DashboardContext";

export default function DepartmentConsumptionChart() {
  const { startDate, endDate } = useDashboardContext();
  const myScrollRef = useRef(null);

  // Styles
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
      color: "#AB47BC",
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
      textAlign: "right",
    },
    scrollBox: {
      maxHeight: "250px",
      overflowY: "auto",
      paddingRight: "6px",
    },
  };

  // Custom Tooltip
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
      <ServiceRenderer
        queryHook={useDepartmentsUsageList}
        queryKey={[
          "departmentConsumption",
          { startdt: startDate, enddt: endDate },
        ]}
        queryFn={() =>
          useDepartmentsUsageList(1, { startdt: startDate, enddt: endDate })
            .queryFn
        }
        queryArgs={[{ startdt: startDate, enddt: endDate ,outlet:1,userId:7}]}
        formatter={departmentConsumptionPieChartFormatter}
        shimmerCount={2}
      >
        {(data) => {
          const { chartData, total } = data;
          return (
            <Card style={styles.card}>
              {/* Header */}
              <div style={styles.header}>
                <FaShoppingCart size={18} />
                <span>Department Consumption</span>
              </div>

              <Row>
                {/* Pie Chart */}
                <Col md={6} sm={12} className="d-flex justify-content-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={3}
                        label={({ percent }) =>
                          `${(percent * 100).toFixed(1)}%`
                        }
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </Col>

                {/* Legend / Details */}
                <Col md={6} sm={12}>
                  <div style={styles.scrollBox}>
                    {chartData.map((item, idx) => (
                      <div key={idx} style={styles.legendItem}>
                        <div style={styles.legendLabel}>
                          <span style={styles.colorDot(item.color)}></span>
                          <span>{item.name}</span>
                        </div>
                        <div>
                          ₹{item.value.toLocaleString()}{" "}
                          <span
                            style={{ color: "#6c757d", fontSize: "0.8rem" }}
                          >
                            {((item.percentage ) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={styles.total}>
                    Total Purchases: ₹{total?.toLocaleString()}
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

// import React from "react";
// import { Card, Row, Col, Container } from "react-bootstrap";
// import { FaShoppingCart } from "react-icons/fa";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function DepartmentConsumptionChart() {
//   // Raw data
//   const data = [
//     { name: "Kitchen Essentials", value: 125000, color: "#FF6B6B" },
//     { name: "Beverages", value: 98000, color: "#4EC5C1" },
//     { name: "Spices & Seasoning", value: 85000, color: "#4A90E2" },
//     { name: "Dairy Products", value: 75000, color: "#A3C9A8" },
//     { name: "Vegetables", value: 68000, color: "#FFD166" },
//     { name: "Meat & Seafood", value: 65000, color: "#F4B3F4" },
//     { name: "Grains & Cereals", value: 52000, color: "#66B2FF" },
//     { name: "Others", value: 45000, color: "#5C4B9D" },
//   ];

//   const totalPurchases = data.reduce((sum, item) => sum + item.value, 0);

//   // Styles
//   const styles = {
//     card: {
//       borderRadius: "12px",
//       padding: "1.5rem",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//       backgroundColor: "#fff",
//       height: "100%",
//     },
//     header: {
//       display: "flex",
//       alignItems: "center",
//       gap: "0.5rem",
//       marginBottom: "1rem",
//       color: "#AB47BC",
//       fontWeight: 600,
//       fontSize: "1.1rem",
//     },
//     legendItem: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: "0.6rem",
//     },
//     legendLabel: {
//       display: "flex",
//       alignItems: "center",
//       gap: "0.5rem",
//       fontSize: "0.9rem",
//     },
//     colorDot: (color) => ({
//       width: "12px",
//       height: "12px",
//       borderRadius: "50%",
//       backgroundColor: color,
//     }),
//     total: {
//       marginTop: "1rem",
//       fontWeight: 600,
//       fontSize: "1rem",
//       textAlign: "right",
//     },
//     scrollBox: {
//       maxHeight: "250px", // adjust if needed
//       overflowY: "auto",
//       paddingRight: "6px",
//     },
//   };

//   // Custom Tooltip for Pie
//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       const { name, value } = payload[0].payload;
//       return (
//         <div
//           style={{
//             background: "#fff",
//             border: "1px solid #ddd",
//             padding: "6px 10px",
//             borderRadius: "6px",
//             fontSize: "0.85rem",
//             boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//           }}
//         >
//           <strong>{name}</strong>
//           <div>₹{value.toLocaleString()}</div>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <Container fluid className="p-2">
//       <Card style={styles.card}>
//         {/* Header */}
//         <div style={styles.header}>
//           <FaShoppingCart size={18} />
//           <span>Department Consumption</span>
//         </div>

//         <Row>
//           {/* Pie Chart */}
//           <Col md={6} sm={12} className="d-flex justify-content-center">
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={data}
//                   dataKey="value"
//                   nameKey="name"
//                   innerRadius={60}
//                   outerRadius={100}
//                   paddingAngle={3}
//                   label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
//                 >
//                   {data.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip content={<CustomTooltip />} />
//               </PieChart>
//             </ResponsiveContainer>
//           </Col>

//           {/* Legend / Details (scrollable) */}
//           <Col md={6} sm={12}>
//             <div style={styles.scrollBox}>
//               {data.map((item, idx) => (
//                 <div key={idx} style={styles.legendItem}>
//                   <div style={styles.legendLabel}>
//                     <span style={styles.colorDot(item.color)}></span>
//                     <span>{item.name}</span>
//                   </div>
//                   <div>
//                     ₹{item.value.toLocaleString()}{" "}
//                     <span style={{ color: "#6c757d", fontSize: "0.8rem" }}>
//                       {((item.value / totalPurchases) * 100).toFixed(1)}%
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div style={styles.total}>
//               Total Purchases: ₹{totalPurchases.toLocaleString()}
//             </div>
//           </Col>
//         </Row>
//       </Card>
//     </Container>
//   );
// }
