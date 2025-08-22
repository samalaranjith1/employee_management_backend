"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, Row, Col, Dropdown } from "react-bootstrap";
import { FaCalendarAlt, FaShoppingCart } from "react-icons/fa";
import { startOfMonth, endOfMonth, format } from "date-fns";
import ComponentHeader from "@/components/common/ComponentHeader";
import SupplierDetailsTableMonth from "@/components/common/Tables/SupplierDetailsTableMonth";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useSuppliersUsageMTD } from "@/services/supplier-service";
import { supplierManagementDataFormatter } from "@/utils/data_formatters/dashboardFormatter";
import PurchaseDistributionGraph from "@/components/common/GraphWrapper/PurchaseDistributionGraph";

const styles = {
  container: { padding: "1rem", backgroundColor: "#f8fafc" },
  sectionCard: {
    borderRadius: "12px",
    border: "none",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    marginBottom: "1rem",
    padding: "1rem",
  },
  purchaseCard: {
    backgroundColor: "#f1f5f9",
    borderRadius: "12px",
    padding: "1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  amount: { fontSize: "2rem", fontWeight: "bold", color: "#1e3a8a" },
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SupplierDuesThisMonth = () => {
  const now = new Date();
  const currentMonth = now.toLocaleString("default", { month: "long" });

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [dateRange, setDateRange] = useState({
    startDate: startOfMonth(now),
    endDate: now,
  });

  const scrollRef = useRef(null);

  useEffect(() => {
    const monthIndex = new Date(
      `${selectedMonth} 1, ${now.getFullYear()}`
    ).getMonth();
    const year =
      monthIndex > now.getMonth() ? now.getFullYear() - 1 : now.getFullYear();
    const date = new Date(year, monthIndex, 1);

    setDateRange({
      startDate:
        selectedMonth === currentMonth ? startOfMonth(now) : startOfMonth(date),
      endDate: selectedMonth === currentMonth ? now : endOfMonth(date),
    });
  }, [selectedMonth]);

  const formattedStart = format(dateRange.startDate, "yyyy-MM-dd");
  const formattedEnd = format(dateRange.endDate, "yyyy-MM-dd");

  return (
    <Card style={styles.container} className="m-2">
      <ComponentHeader
        title="Supplier Dues This Month"
        description="Monitor dues and purchases supplier-wise"
        titleColor="rgba(124, 58, 237, 1) fs-4"
        cardBgColor="none"
        isShowArrows={false}
        scrollRef={scrollRef}
        isExpandable={true}
        titleIcon={<FaCalendarAlt size={20} color="rgba(124,58,237,1)" />}
      />

      <ServiceRenderer
        queryHook={useSuppliersUsageMTD}
        queryKey={[
          "supplierDues",
          {
            startdt: dateRange.startDate,
            enddt: dateRange.endDate,
            month: selectedMonth,
          },
        ]}
        queryFn={() =>
          useSuppliersUsageMTD({
            startdt: formattedStart,
            enddt: formattedEnd,
            month: selectedMonth,
          }).queryFn
        }
        queryArgs={[
          {
            startdt: formattedStart,
            enddt: formattedEnd,
            outlet: 1,
            userId: 7,
          },
        ]}
        formatter={supplierManagementDataFormatter}
        shimmerCount={2}
      >
        {(data) => (
          <Card style={styles.sectionCard}>
            <Row className="align-items-center mb-3">
              <Col xs="auto">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    className="d-flex align-items-center gap-2"
                  >
                    <FaCalendarAlt color="#7c3aed" />
                    {selectedMonth}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {months.map((month) => (
                      <Dropdown.Item
                        key={month}
                        onClick={() => setSelectedMonth(month)}
                      >
                        {month}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>

            {/* Purchase Summary */}
            <div style={styles.purchaseCard} className="mb-4">
              <div>
                <div style={{ fontSize: "0.9rem", color: "#334155" }}>
                  Total Purchase MTD
                </div>
                <div style={styles.amount}>{data.cardData.value}</div>
                <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                  {data.cardData.sub}
                </div>
              </div>
              <div
                style={{
                  background: "linear-gradient(90deg,#7c3aed,#6366f1)",
                  borderRadius: "50%",
                  padding: "0.75rem",
                  color: "#fff",
                }}
              >
                <FaShoppingCart size={20} />
              </div>
            </div>

            {/* Graph + Table */}
            <Row>
              <Col md={6}>
                <div className="fw-semibold mb-2">
                  Monthly Purchase Distribution
                </div>
                <PurchaseDistributionGraph
                  pieData={data.pieData}
                  styles={styles}
                />
              </Col>
              <Col md={6}>
                <div className="fw-semibold mb-2">Top Suppliers</div>
                <SupplierDetailsTableMonth supplierData={data.supplierData} />
              </Col>
            </Row>
          </Card>
        )}
      </ServiceRenderer>
    </Card>
  );
};

export default SupplierDuesThisMonth; 
// "use client";

// import ComponentHeader from "@/components/common/ComponentHeader";
// import React, { useEffect, useRef, useState } from "react";
// import { Card, Row, Col, Dropdown } from "react-bootstrap";
// import { FaCalendarAlt, FaShoppingCart } from "react-icons/fa";

// import SupplierDetailsTableMonth from "@/components/common/Tables/SupplierDetailsTableMonth";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import { supplierManagementDataFormatter } from "@/utils/data_formatters/dashboardFormatter";
// import { useSuppliersUsageMTD } from "@/services/supplier-service";
// import { startOfMonth, endOfMonth, format } from "date-fns";
// import PurchaseDistributionGraph from "@/components/common/GraphWrapper/PurchaseDistributionGraph";

// const SupplierDuesThisMonth = () => {
//   const styles = {
//     container: {
//       padding: "1rem",
//       backgroundColor: "#f8fafc",
//     },
//     sectionCard: {
//       borderRadius: "12px",
//       border: "none",
//       boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
//       marginBottom: "1rem",
//       padding: "1rem",
//     },
//     purchaseCard: {
//       backgroundColor: "#f1f5f9",
//       borderRadius: "12px",
//       padding: "1.5rem",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       flex: 1,
//     },
//     amount: {
//       fontSize: "2rem",
//       fontWeight: "bold",
//       color: "#1e3a8a",
//     },
//     pieLegend: {
//       display: "flex",
//       gap: "1rem",
//       flexWrap: "wrap",
//       marginTop: "0.5rem",
//     },
//     legendItem: {
//       display: "flex",
//       alignItems: "center",
//       gap: "0.5rem",
//       fontSize: "0.85rem",
//     },
//     legendDot: {
//       width: "12px",
//       height: "12px",
//       borderRadius: "50%",
//     },
//   };

//   const now = new Date();
//   const currentMonthName = now.toLocaleString("default", { month: "long" });
//   const myScrollRef = useRef(null);

//   // ✅ all months list
//   const allMonths = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const [selectedMonth, setSelectedMonth] = useState(currentMonthName);

//   // internal state for start & end dates
//   const [dateRange, setDateRange] = useState({
//     startDate: startOfMonth(now),
//     endDate: now,
//   });

//   useEffect(() => {
//     if (selectedMonth === currentMonthName) {
//       // current month → start of month to today
//       setDateRange({
//         startDate: startOfMonth(now),
//         endDate: now,
//       });
//     } else {
//       // find correct year & month index
//       const monthIndex = new Date(
//         `${selectedMonth} 1, ${now.getFullYear()}`
//       ).getMonth();

//       const year =
//         monthIndex > now.getMonth() ? now.getFullYear() - 1 : now.getFullYear();

//       const targetDate = new Date(year, monthIndex, 1);

//       setDateRange({
//         startDate: startOfMonth(targetDate),
//         endDate: endOfMonth(targetDate),
//       });
//     }
//   }, [selectedMonth]);

//   return (
//     <Card style={styles.container} className="m-2">
//       <ComponentHeader
//         title={"Supplier Dues This Month"}
//         description={"Monitor dues and purchases supplier-wise"}
//         titleColor={"rgba(124, 58, 237, 1) fs-4"}
//         cardBgColor={"none"}
//         isShowArrows={false}
//         scrollRef={myScrollRef}
//         isExpandable={true}
//         titleIcon={<FaCalendarAlt size={20} color="rgba(124,58,237,1)" />}
//       />

//       <ServiceRenderer
//         queryHook={useSuppliersUsageMTD}
//         queryKey={[
//           "supplierDues",
//           {
//             startdt: dateRange.startDate,
//             enddt: dateRange.endDate,
//             month: selectedMonth,
//           },
//         ]}
//         queryFn={() =>
//           useSuppliersUsageMTD({
//             startdt: format(dateRange.startDate, "yyyy-MM-dd"),
//             enddt: format(dateRange.endDate, "yyyy-MM-dd"),
//             month: selectedMonth,
//           }).queryFn
//         }
//         queryArgs={[
//           {
//             startdt: format(dateRange.startDate, "yyyy-MM-dd"),
//             enddt: format(dateRange.endDate, "yyyy-MM-dd"),
//             outlet: 1,
//             userId: 7,
//           },
//         ]}
//         formatter={supplierManagementDataFormatter}
//         shimmerCount={2}
//       >
//         {(formattedData, refetch) => (
//           <Card style={styles.sectionCard}>
//             <Row className="align-items-center mb-3">
//               <Col xs="auto">
//                 <Dropdown>
//                   <Dropdown.Toggle
//                     variant="light"
//                     className="d-flex align-items-center gap-2"
//                   >
//                     <FaCalendarAlt color="#7c3aed" />
//                     {selectedMonth}
//                   </Dropdown.Toggle>
//                   <Dropdown.Menu>
//                     {allMonths.map((month) => (
//                       <Dropdown.Item
//                         key={month}
//                         onClick={() => setSelectedMonth(month)}
//                       >
//                         {month}
//                       </Dropdown.Item>
//                     ))}
//                   </Dropdown.Menu>
//                 </Dropdown>
//               </Col>
//             </Row>

//             {/* ✅ Purchase Card */}
//             <div style={styles.purchaseCard} className="mb-4">
//               <div>
//                 <div style={{ fontSize: "0.9rem", color: "#334155" }}>
//                   Total Purchase MTD
//                 </div>
//                 <div style={styles.amount}>
//                   {formattedData.cardData.value}
//                   {/* ₹{formattedData.cardData.value?.toLocaleString()} */}
//                 </div>
//                 <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
//                   {formattedData.cardData.sub}
//                   {/* from {formattedData.cardData.suppliers} suppliers */}
//                 </div>
//               </div>
//               <div
//                 style={{
//                   background: "linear-gradient(90deg,#7c3aed,#6366f1)",
//                   borderRadius: "50%",
//                   padding: "0.75rem",
//                   color: "#fff",
//                 }}
//               >
//                 <FaShoppingCart size={20} />
//               </div>
//             </div>

//             {/* ✅ Pie Chart + Table */}
//             <Row>
//               <Col md={6}>
//                 <div className="fw-semibold mb-2">
//                   Monthly Purchase Distribution
//                 </div>
//                 <Col>
//                   <PurchaseDistributionGraph
//                     pieData={formattedData.pieData}
//                     styles={styles}
//                   />
//                 </Col>
//               </Col>
//               <Col md={6}>
//                 <div className="fw-semibold mb-2">Top Suppliers</div>
//                 <SupplierDetailsTableMonth
//                   supplierData={formattedData.supplierData}
//                 />
//               </Col>
//             </Row>
//           </Card>
//         )}
//       </ServiceRenderer>
//     </Card>
//   );
// };

// export default SupplierDuesThisMonth;

// "use client";

// import React, { useState } from "react";
// import { Card, Row, Col, Table, Badge, Dropdown } from "react-bootstrap";
// import { FaCalendarAlt, FaShoppingCart } from "react-icons/fa";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Tooltip,
//   Sector,
// } from "recharts";
// import SupplierDetailsTableMonth from "@/components/common/Tables/SupplierDetailsTableMonth";

// const SupplierDuesThisMonth = () => {
//   const styles = {
//     container: {
//       padding: "1rem",
//       backgroundColor: "#f8fafc",
//     },
//     sectionCard: {
//       borderRadius: "12px",
//       border: "none",
//       boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
//       marginBottom: "1rem",
//       padding: "1rem",
//     },
//     purchaseCard: {
//       backgroundColor: "#f1f5f9",
//       borderRadius: "12px",
//       padding: "1.5rem",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       flex: 1,
//     },
//     amount: {
//       fontSize: "2rem",
//       fontWeight: "bold",
//       color: "#1e3a8a",
//     },
//     pieLegend: {
//       display: "flex",
//       gap: "1rem",
//       flexWrap: "wrap",
//       marginTop: "0.5rem",
//     },
//     legendItem: {
//       display: "flex",
//       alignItems: "center",
//       gap: "0.5rem",
//       fontSize: "0.85rem",
//     },
//     legendDot: {
//       width: "12px",
//       height: "12px",
//       borderRadius: "50%",
//     },
//     stickyHeader: {
//       position: "sticky",
//       top: 0,
//       background: "#fff",
//       zIndex: 2,
//     },
//   };

//   const monthData = {
//     August: {
//       total: 820000,
//       suppliers: 8,
//       pie: [
//         { name: "Dairy Fresh Supply", value: 125000, color: "#8b5cf6" },
//         { name: "Fresh Vegetables Co.", value: 185000, color: "#3b82f6" },
//         { name: "Meat Masters", value: 95000, color: "#14b8a6" },
//         { name: "Oil & Condiments", value: 75000, color: "#f59e0b" },
//         { name: "Rice & Grains Hub", value: 85000, color: "#22c55e" },
//         { name: "Spice World Ltd.", value: 145000, color: "#ef4444" },
//       ],
//       suppliersList: [
//         {
//           supplier: "Fresh Vegetables Co.",
//           category: "Vegetables",
//           location: "Mumbai",
//           purchase: 185000,
//           items: 325,
//         },
//         {
//           supplier: "Fresh Vegetables Co.",
//           category: "Vegetables",
//           location: "Mumbai",
//           purchase: 185000,
//           items: 325,
//         },
//         {
//           supplier: "Fresh Vegetables Co.",
//           category: "Vegetables",
//           location: "Mumbai",
//           purchase: 185000,
//           items: 325,
//         },
//         {
//           supplier: "Fresh Vegetables Co.",
//           category: "Vegetables",
//           location: "Mumbai",
//           purchase: 185000,
//           items: 325,
//         },
//         {
//           supplier: "Fresh Vegetables Co.",
//           category: "Vegetables",
//           location: "Mumbai",
//           purchase: 185000,
//           items: 325,
//         },
//         {
//           supplier: "Spice World Ltd.",
//           category: "Spices",
//           location: "Delhi",
//           purchase: 145000,
//           items: 125,
//         },
//         {
//           supplier: "Dairy Fresh Supply",
//           category: "Dairy",
//           location: "Pune",
//           purchase: 125000,
//           items: 245,
//         },
//         {
//           supplier: "Meat Masters",
//           category: "Meat",
//           location: "Bangalore",
//           purchase: 95000,
//           items: 155,
//         },
//         {
//           supplier: "Rice & Grains Hub",
//           category: "Grains",
//           location: "Chennai",
//           purchase: 85000,
//           items: 185,
//         },
//         {
//           supplier: "Oil & Condiments",
//           category: "Oils",
//           location: "Hyderabad",
//           purchase: 75000,
//           items: 95,
//         },
//       ],
//     },
//     July: {
//       total: 720000,
//       suppliers: 6,
//       pie: [
//         { name: "Dairy Fresh Supply", value: 95000, color: "#8b5cf6" },
//         { name: "Fresh Vegetables Co.", value: 175000, color: "#3b82f6" },
//         { name: "Meat Masters", value: 85000, color: "#14b8a6" },
//         { name: "Oil & Condiments", value: 65000, color: "#f59e0b" },
//         { name: "Rice & Grains Hub", value: 80000, color: "#22c55e" },
//         { name: "Spice World Ltd.", value: 120000, color: "#ef4444" },
//       ],
//       suppliersList: [
//         {
//           supplier: "Fresh Vegetables Co.",
//           category: "Vegetables",
//           location: "Mumbai",
//           purchase: 175000,
//           items: 300,
//         },
//         {
//           supplier: "Spice World Ltd.",
//           category: "Spices",
//           location: "Delhi",
//           purchase: 120000,
//           items: 110,
//         },
//         {
//           supplier: "Dairy Fresh Supply",
//           category: "Dairy",
//           location: "Pune",
//           purchase: 95000,
//           items: 200,
//         },
//         {
//           supplier: "Meat Masters",
//           category: "Meat",
//           location: "Bangalore",
//           purchase: 85000,
//           items: 140,
//         },
//         {
//           supplier: "Rice & Grains Hub",
//           category: "Grains",
//           location: "Chennai",
//           purchase: 80000,
//           items: 160,
//         },
//         {
//           supplier: "Oil & Condiments",
//           category: "Oils",
//           location: "Hyderabad",
//           purchase: 65000,
//           items: 90,
//         },
//       ],
//     },
//   };

//   const [selectedMonth, setSelectedMonth] = useState("August");
//   const data = monthData[selectedMonth];

//   return (
//     <Card style={styles.container} className="m-2">
//       <Card style={styles.sectionCard}>
//         <Row className="align-items-center mb-3">
//           <Col xs="auto">
//             <Dropdown>
//               <Dropdown.Toggle
//                 variant="light"
//                 className="d-flex align-items-center gap-2"
//               >
//                 <FaCalendarAlt color="#7c3aed" />
//                 {selectedMonth}
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 {Object.keys(monthData).map((month) => (
//                   <Dropdown.Item
//                     key={month}
//                     onClick={() => setSelectedMonth(month)}
//                   >
//                     {month}
//                   </Dropdown.Item>
//                 ))}
//               </Dropdown.Menu>
//             </Dropdown>
//           </Col>
//         </Row>

//         <div style={styles.purchaseCard} className="mb-4">
//           <div>
//             <div style={{ fontSize: "0.9rem", color: "#334155" }}>
//               Total Purchase MTD
//             </div>
//             <div style={styles.amount}>₹{data.total.toLocaleString()}</div>
//             <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
//               from {data.suppliers} suppliers
//             </div>
//           </div>
//           <div
//             style={{
//               backgroundColor: "linear-gradient(90deg,#7c3aed,#6366f1)",
//               borderRadius: "50%",
//               padding: "0.75rem",
//               color: "#fff",
//             }}
//           >
//             <FaShoppingCart size={20} />
//           </div>
//         </div>

//         <Row>
//           <Col md={6}>
//             <div className="fw-semibold mb-2">
//               Monthly Purchase Distribution
//             </div>
//             <Card className="p-3">
//               <ResponsiveContainer width="100%" height={250}>
//                 <PieChart>
//                   <Pie
//                     data={data.pie}
//                     innerRadius={60}
//                     outerRadius={90}
//                     paddingAngle={2}
//                     dataKey="value"
//                     activeShape={(props) => <Sector {...props} stroke="none" />}
//                   >
//                     {data.pie.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     formatter={(value, name) => [
//                       `₹${value.toLocaleString()}`,
//                       name,
//                     ]}
//                     contentStyle={{
//                       backgroundColor: "#fff",
//                       border: "none",
//                       borderRadius: "8px",
//                     }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//               <div style={styles.pieLegend}>
//                 {data.pie.map((item, idx) => (
//                   <div style={styles.legendItem} key={idx}>
//                     <div
//                       style={{
//                         ...styles.legendDot,
//                         backgroundColor: item.color,
//                       }}
//                     ></div>
//                     {item.name}
//                   </div>
//                 ))}
//               </div>
//             </Card>
//           </Col>
//           <Col md={6}>
//             <div className="fw-semibold mb-2">Top Suppliers</div>
//             <SupplierDetailsTableMonth supplierData={data} />
//           </Col>
//         </Row>
//       </Card>
//     </Card>
//   );
// };

// export default SupplierDuesThisMonth;
