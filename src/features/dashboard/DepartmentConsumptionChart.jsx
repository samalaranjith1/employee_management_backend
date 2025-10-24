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
import { useRouter } from "next/navigation";
import { handleNavigation } from "@/utils";
import { IconChartColumn } from "@tabler/icons-react";
import '@/app/globals.css';

export default function DepartmentConsumptionChart() {
  const { startDate, endDate } = useDashboardContext();
  const myScrollRef = useRef(null);
  const router = useRouter();

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
      justifyContent: "space-between", // pushes text left and value right
      alignItems: "center",
      alignItems: "flex-start",
      marginTop: '-5px'
    },

    scrollBox: {
      maxHeight: "65vh",
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
      <div style={styles.header}>
        <div style={{
          background: 'linear-gradient(135deg, #316FEA 60%, #2680FF 100%)', // blue gradient for Figma match
          borderRadius: '12px',
          padding: '8px',
          display: 'inline-block'
        }}>
          <IconChartColumn stroke={2} color="#fff" size={20} />
        </div>
        <span className="c_medium_text_semi_bold c_black_3">Department Consumption</span>
      </div>
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
        queryArgs={[
          { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
        ]}
        formatter={departmentConsumptionPieChartFormatter}
        shimmerCount={2}
      >
        {(data) => {
          const { chartData, total } = data;
          return (
            <Card style={styles.card}>
              {/* Header */}

              <Row style={{ maxHeight: "65vh" }}>
                {/* Pie Chart */}
                <Col
                  md={6}
                  sm={12}
                  className="d-flex justify-content-center align-items-center"
                >
                  <div
                    style={{
                      width: "100%",
                      maxWidth: 400,      // max width for chart
                      height: 300,        // fixed height for mobile visibility
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center", // vertical center inside the div
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={60}
                          outerRadius={125}   // relative to container, scales nicely
                          paddingAngle={0}
                          label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                          cx="50%"
                          cy="50%"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Col>


                {/* Legend / Details */}
                <Col md={6} sm={12} style={{ maxHeight: "65vh" }}>
                  <div style={styles.scrollBox}>
                    {chartData.map((item, idx) => (
                      <div key={idx} style={styles.legendItem}>
                        <div style={styles.legendLabel}>
                          <span style={styles.colorDot(item.color)}></span>
                          <span className="c_small_text_semi_bold_600">{item.name}</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            minWidth: "100px",
                            fontFamily: "monospace",
                          }}
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
                          <div className="c_small_text_extra_bold">₹{item.value.toLocaleString()}</div>
                          <div className="c_normal_text_semi_regular c_gray_3">
                            {(item.percentage * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={styles.total}>
                    <span className="c_small_text_extra_bold">Total Purchases:</span>
                    <span style={{ paddingRight: "3vw" }} className="c_small_text_extra_bold">
                      ₹{total?.toLocaleString()}
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
