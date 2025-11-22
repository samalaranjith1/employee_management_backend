"use client";

import React, { useState } from "react";
import { Card, Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import {
  useDepartmentSummarySameDay,
  useDepartmentSummaryDaily,
  useDepartmentSummaryMonthly,
  useDepartmentSummaryWeekly,
} from "@/services/department-service";
import { departmentPeriodDropDownDataFormatter } from "@/utils/data_formatters/departmentPage";

import DepartmentPeriodDropDownCards from "@/components/common/department/cards/DepartmentPeriodDropDownCards";
import DepartmentPeriodDropDownTable from "@/components/common/department/TablesSort/DepartmentPeriodDropDownTable";
import { IconArrowsMaximize, IconCalendar } from "@tabler/icons-react";
import { useDepartmentContext } from "@/contexts/DepartmentContext";

export default function DepartmentPeriodDropDown() {
  const { startDate, endDate, isMobile } = useDepartmentContext()
  const [filter, setFilter] = useState("daily");

  const useDataFetchMethod = (view) => {
    switch (view) {
      case "daily":
        return useDepartmentSummaryDaily;
      case "samedays":
        return useDepartmentSummarySameDay;
      case "weekly":
        return useDepartmentSummaryWeekly;
      case "monthly":
        return useDepartmentSummaryMonthly;
      default:
        return useDepartmentSummaryDaily;
    }
  };

  const SelectedHook = useDataFetchMethod(filter);
  const tabs = ["Daily", "Same Days", "Weekly", "Monthly"];

  return (
    <Card className="p-3 shadow-sm" style={{ borderRadius: "16px" }}>
      {/* Header */}
      <Row className="align-items-center mb-4">
        <Col xs="auto">
          <div style={{
            background: '#fe4e16',
            borderRadius: '12px',
            padding: '8px',
            display: 'inline-block'
          }}>
            <IconCalendar stroke={2} color="#fff" size={24} />
          </div>
        </Col>

        {/* Text Column */}
        <Col>
          <h5 className="fw-bold mb-0" style={{
            color: '#232425',
            fontSize: "18px",
            fontWeight: '600',
            marginLeft: '-10px'
          }}>Period Data Breakdown</h5>
        </Col>
        <Col xs="auto">
          {/* <ButtonGroup>
            {tabs.map((label) => {
              const value = label.toLowerCase().replace(" ", "");
              return (
                <ToggleButton
                  key={label}
                  id={`dept-${label}`}
                  type="radio"
                  variant="outline-secondary"
                  checked={filter === value}
                  value={value}
                  onChange={(e) => setFilter(e.currentTarget.value)}
                  className="rounded-pill px-3 fw-semibold"
                  style={{
                    fontSize: "13px",
                    backgroundColor: filter === value ? "#fff" : "transparent",
                    color: filter === value ? "#f97316" : "#6C757D",
                    border:
                      filter === value
                        ? "1px solid #f97316"
                        : "1px solid #dee2e6",
                  }}
                >
                  {label}
                </ToggleButton>
              );
            })}
          </ButtonGroup> */}
          {!isMobile && <ButtonGroup
            className="rounded-pill"
            style={{ backgroundColor: "#E6E6E6" }}
          >
            {tabs.map((label) => {
              const value = label.toLowerCase().replace(" ", "");
              const selected = filter === value;
              return (
                <ToggleButton
                  key={label}
                  id={`dept-${label}`}
                  type="radio"
                  variant="none"
                  checked={selected}
                  value={value}
                  onChange={(e) => setFilter(e.currentTarget.value)}
                  className="rounded-pill"
                  style={{
                    fontSize: "13px",
                    padding: "6px 16px",
                    backgroundColor: selected ? "#FF6600" : "transparent",
                    color: selected ? "white" : "#888",
                    backgroundColor: selected ? "white" : "transparent",
                    color: selected ? "#FF6600" : "#888",
                    border: "none",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  {label}
                </ToggleButton>
              );
            })}
          </ButtonGroup>}
          {<span style={{ color: "#232425" }}><IconArrowsMaximize /></span>}
        </Col>
      </Row>
      {isMobile &&
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ButtonGroup
            className="rounded-pill"
            style={{ backgroundColor: "#E6E6E6" }}
          >
            {tabs.map((label) => {
              const value = label.toLowerCase().replace(" ", "");
              const selected = filter === value;
              return (
                <ToggleButton
                  key={label}
                  id={`dept-${label}`}
                  type="radio"
                  variant="none"
                  checked={selected}
                  value={value}
                  onChange={(e) => setFilter(e.currentTarget.value)}
                  className="rounded-pill"
                  style={{
                    fontSize: "13px",
                    padding: "6px 16px",
                    backgroundColor: selected ? "#FF6600" : "transparent",
                    color: selected ? "white" : "#888",
                    backgroundColor: selected ? "white" : "transparent",
                    color: selected ? "#FF6600" : "#888",
                    border: "none",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  {label}
                </ToggleButton>
              );
            })}
          </ButtonGroup></div>}

      {/* 🔹 ServiceRenderer */}
      <ServiceRenderer
        queryHook={SelectedHook}
        queryKey={["departmentPeriodDropDown", filter]}
        queryArgs={[2, { userId: 7, outlet: 1, startdt: startDate, enddt: endDate }]}
        formatter={departmentPeriodDropDownDataFormatter}
        shimmerCount={2}
      >
        {({ cards, table }) => (
          <>
            <DepartmentPeriodDropDownCards cards={cards} />
            <DepartmentPeriodDropDownTable table={table} />
          </>
        )}
      </ServiceRenderer>
    </Card>
  );
}
// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   Row,
//   Col,
//   ButtonGroup,
//   ToggleButton,
//   Table,
//   Badge,
// } from "react-bootstrap";
// import {
//   useDepartmentSummarySameDay,
//   useDepartmentSummaryDaily,
//   useDepartmentSummaryMonthly,
//   useDepartmentSummaryWeekly,
// } from "@/services/department-service";
// import { departmentPeriodDropDownDataFormatter } from "@/utils/data_formatters/departmentPage";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";

// export default function DepartmentPeriodDropDown() {
//   const [filter, setFilter] = useState("daily");

//   // 🔹 Dynamically choose correct hook
//   const useDataFetchMethod = (view) => {
//     switch (view) {
//       case "daily":
//         return useDepartmentSummaryDaily;
//       case "samedays":
//         return useDepartmentSummarySameDay;
//       case "weekly":
//         return useDepartmentSummaryWeekly;
//       case "monthly":
//         return useDepartmentSummaryMonthly;
//       default:
//         return useDepartmentSummaryDaily;
//     }
//   };

//   const SelectedHook = useDataFetchMethod(filter);
//   const tabs = ["Daily", "Same Days", "Weekly", "Monthly"];

//   return (
//     <Card className="p-3 shadow-sm" style={{ borderRadius: "16px" }}>
//       {/* Header */}
//       <Row className="align-items-center mb-4">
//         <Col>
//           <h5 className="fw-bold mb-0">Period Data Breakdown</h5>
//           <small className="text-muted">
//             Detailed metrics across different time periods
//           </small>
//         </Col>
//         <Col xs="auto">
//           <ButtonGroup>
//             {tabs.map((label) => {
//               const value = label.toLowerCase().replace(" ", "");
//               return (
//                 <ToggleButton
//                   key={label}
//                   id={`dept-${label}`}
//                   type="radio"
//                   variant="outline-secondary"
//                   checked={filter === value}
//                   value={value}
//                   onChange={(e) => setFilter(e.currentTarget.value)}
//                   className="rounded-pill px-3 fw-semibold"
//                   style={{
//                     fontSize: "13px",
//                     backgroundColor: filter === value ? "#fff" : "transparent",
//                     color: filter === value ? "#f97316" : "#6C757D",
//                     border:
//                       filter === value
//                         ? "1px solid #f97316"
//                         : "1px solid #dee2e6",
//                   }}
//                 >
//                   {label}
//                 </ToggleButton>
//               );
//             })}
//           </ButtonGroup>
//         </Col>
//       </Row>

//       {/* 🔹 Wrap Cards + Table in ServiceRenderer */}
//       <ServiceRenderer
//         queryHook={SelectedHook}
//         queryKey={["departmentPeriodDropDown", filter]}
//         queryArgs={[2, { userId: 7, outlet: 1 }]} // Adjust args to match API
//         formatter={departmentPeriodDropDownDataFormatter}
//         shimmerCount={2}
//       >
//         {({ cards, table }) => (
//           <>
//             {/* Metrics Cards */}
//             <Row className="mb-4">
//               {cards.map((c, idx) => (
//                 <Col key={idx} md={3} xs={6} className="mb-3">
//                   <Card
//                     className="h-100 d-flex flex-column justify-content-center"
//                     style={{
//                       backgroundColor: c.bg,
//                       borderRadius: "12px",
//                       border: "none",
//                     }}
//                   >
//                     <Card.Body className="d-flex align-items-center">
//                       <div
//                         className="p-2 d-flex align-items-center justify-content-center me-3"
//                         style={{
//                           backgroundColor: c.iconBg,
//                           borderRadius: "8px",
//                           width: 40,
//                           height: 40,
//                         }}
//                       >
//                         {c.icon}
//                       </div>
//                       <div>
//                         <div
//                           className="fw-semibold text-muted"
//                           style={{ fontSize: 13 }}
//                         >
//                           {c.title}
//                         </div>
//                         <div className="fw-bold" style={{ fontSize: 18 }}>
//                           {c.value}
//                         </div>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>

//             {/* Table */}
//             <div style={{ overflowX: "auto" }}>
//               <Table hover responsive className="align-middle">
//                 <thead>
//                   <tr style={{ fontSize: 13, color: "#6B7280" }}>
//                     <th>#</th>
//                     <th>Date</th>
//                     <th>Sales</th>
//                     <th>Consumption</th>
//                     <th>Waste</th>
//                     <th>Cost Ratio</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {table.map((row) => {
//                     const today = new Date();
//                     const rowDate = new Date(row.rawDate || row.date); // use rawDate from API if available
//                     const isToday =
//                       rowDate.getDate() === today.getDate() &&
//                       rowDate.getMonth() === today.getMonth() &&
//                       rowDate.getFullYear() === today.getFullYear();
//                         const formattedDay = rowDate.toLocaleDateString(
//                           "en-US",
//                           {
//                             weekday: "short",
//                           }
//                         );

//                     // Format date like "Dec 7"
//                     const formattedDate = rowDate.toLocaleDateString("en-US", {
//                       month: "short",
//                       day: "numeric",
//                     });

//                     return (
//                       <tr key={row.index}>
//                         <td>{row.index}</td>
//                         <td>
//                           <div className="fw-semibold" style={{ fontSize: 14 }}>
//                             {formattedDate}{" "}
//                             {isToday && (
//                               <span
//                                 className="text-muted"
//                                 style={{ fontSize: 12 }}
//                               >
//                                 (Today)
//                               </span>
//                             )}
//                           </div>
//                           <div
//                             className="text-muted"
//                             style={{ fontSize: 12, marginTop: 2 }}
//                           >
//                             {formattedDay}
//                           </div>
//                         </td>
//                         <td style={{ fontSize: 13 }}>
//                           ₹{row.sales?.toLocaleString()}
//                         </td>
//                         <td style={{ fontSize: 13 }}>
//                           ₹{row.consumption?.toLocaleString()}
//                         </td>
//                         <td style={{ fontSize: 13 }}>
//                           ₹{row.waste?.toLocaleString()}
//                         </td>
//                         <td>
//                           <Badge
//                             bg=""
//                             style={{
//                               backgroundColor: row.costColor,
//                               fontSize: 12,
//                               padding: "4px 8px",
//                               borderRadius: "12px",
//                               fontWeight: 500,
//                               color: "#fff",
//                             }}
//                           >
//                             {row.costRatio.toFixed(1)}%
//                           </Badge>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </Table>
//             </div>
//           </>
//         )}
//       </ServiceRenderer>
//     </Card>
//   );
// }
