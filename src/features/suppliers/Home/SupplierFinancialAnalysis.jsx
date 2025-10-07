"use client";

import React, { useEffect, useState } from "react";
import {
  useSupplierSummaryDaily,
  useSupplierSummarySameDay,
  useSupplierSummaryWeekly,
  useSupplierSummaryMonthly,
} from "@/services/supplier-service";
import { supplierFinancialAnalysisDataFormatter } from "@/utils/data_formatters/suppliersDataFormatter";
import { useSuppliersContext } from "@/contexts/SuppliersContext";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { subDays, subWeeks, subMonths, format } from "date-fns";
import SupplierFinancialAnalysisGraph from "@/components/common/suppliers/GraphWrapper/Home/SupplierFinancialAnalysisGraph";
import SupplierFinancialAnalysisTable from "@/components/common/suppliers/TableSort/Home/SupplierFinancialAnalysisTable";

export default function SupplierFinancialAnalysis() {
  const { startDate, endDate } = useSuppliersContext();
  const [filter, setFilter] = useState("daily");
  const [startDateCS, setStartDateCS] = useState("");
  const [endDateCS, setEndDateCS] = useState("");

  // Select hook dynamically
  const useDataFetchMethod = (view) => {
    switch (view) {
      case "daily":
        return useSupplierSummaryDaily;
      case "samedays":
        return useSupplierSummarySameDay;
      case "weekly":
        return useSupplierSummaryWeekly;
      case "monthly":
        return useSupplierSummaryMonthly;
      default:
        return useSupplierSummaryDaily;
    }
  };

  const SelectedHook = useDataFetchMethod(filter);

  const getDateRange = (view) => {
    const today = new Date();
    let startDatetemp;
    switch (view) {
      case "daily":
        startDatetemp = subDays(today, 7);
        break;
      case "weekly":
        startDatetemp = subWeeks(today, 5);
        break;
      case "monthly":
        startDatetemp = subMonths(today, 5);
        break;
      case "samedays":
        startDatetemp = subWeeks(today, 5);
        break;
      default:
        startDatetemp = today;
    }
    setStartDateCS(format(startDatetemp, "yyyy-MM-dd"));
    setEndDateCS(format(today, "yyyy-MM-dd"));
  };

  useEffect(() => {
    getDateRange(filter);
  }, [filter]);

  return (
    <div className="p-3">
      <ServiceRenderer
        queryHook={SelectedHook}
        queryKey={["supplierFinancialAnalysis", filter, startDateCS, endDateCS]}
        queryArgs={[3, { startdt: startDateCS, enddt: endDateCS }]}
        formatter={supplierFinancialAnalysisDataFormatter}
        shimmerCount={2}
      >
        {(formattedData) => {
          const { chart, table, cards } = formattedData;
          return (
            <>
              <SupplierFinancialAnalysisGraph
                cards={cards}
                chart={chart}
                filter={filter}
                setFilter={setFilter}
              />
              <SupplierFinancialAnalysisTable
                cards={cards}
                table={table}
                filter={filter}
                setFilter={setFilter}
              />
            </>
          );
        }}
      </ServiceRenderer>
    </div>
  );
}
// "use client";

// import React, { useState } from "react";
// import { Card, ButtonGroup, ToggleButton, Table } from "react-bootstrap";
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
// } from "recharts";
// import { supplierFinancialAnalysisDataFormatter } from "@/utils/data_formatters/suppliersDataFormatter";
// import { useSupplierSummaryDaily } from "@/services/supplier-service";
// import { useSuppliersContext } from "@/contexts/SuppliersContext";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";

// const SupplierFinancialAnalysis = () => {
//   const { startDate, endDate } = useSuppliersContext();
//   const [filter, setFilter] = useState("daily");

//   return (
//     <div className="p-3">
//       {/* ✅ ServiceRenderer handles fetching, loading, errors, and empty states */}
//       <ServiceRenderer
//         queryHook={useSupplierSummaryDaily}
//         queryKey={[
//           "supplierSummaryDaily",
//           { startdt: startDate, enddt: endDate },
//         ]}
//         queryFn={() =>
//           useSupplierSummaryDaily({
//             startdt: startDate,
//             enddt: endDate,
//           }).queryFn
//         }
//         queryArgs={[3,
//           {
//             startdt: startDate,
//             enddt: endDate,
//           },
//         ]}
//         formatter={supplierFinancialAnalysisDataFormatter}
//         shimmerCount={2}
//       >
//         {(formattedData) => {
//           const { chart, table, cards } = formattedData;

//           return (
//             <>
//               {/* Section 1: Supplier Financial Analysis */}
//               <Card
//                 className="border-0 shadow-sm mb-4"
//                 style={{
//                   backgroundColor: cards[0].bgColor,
//                   borderRadius: "16px",
//                 }}
//               >
//                 <Card.Body>
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <div className="d-flex align-items-center">
//                       <div
//                         style={{
//                           backgroundColor: cards[0].iconBg,
//                           width: "32px",
//                           height: "32px",
//                           borderRadius: "8px",
//                         }}
//                         className="d-flex align-items-center justify-content-center me-2"
//                       >
//                         {cards[0].icon}
//                       </div>
//                       <div>
//                         <h6 className="mb-0 fw-semibold">{cards[0].title}</h6>
//                         <small style={{ color: "#6C757D" }}>
//                           {cards[0].subtitle}
//                         </small>
//                       </div>
//                     </div>

//                     {/* Filters */}
//                     <ButtonGroup>
//                       {["Daily", "Same Days", "Weekly", "Monthly"].map(
//                         (label) => (
//                           <ToggleButton
//                             key={label}
//                             id={`filter-${label}`}
//                             type="radio"
//                             variant="outline-secondary"
//                             checked={filter === label.toLowerCase()}
//                             value={label.toLowerCase()}
//                             onChange={(e) => setFilter(e.currentTarget.value)}
//                             style={{
//                               fontSize: "13px",
//                               borderRadius: "20px",
//                               padding: "2px 12px",
//                               backgroundColor:
//                                 filter === label.toLowerCase()
//                                   ? "#fff"
//                                   : "transparent",
//                               color:
//                                 filter === label.toLowerCase()
//                                   ? "#FF5B22"
//                                   : "#6C757D",
//                               border:
//                                 filter === label.toLowerCase()
//                                   ? "1px solid #FF5B22"
//                                   : "1px solid #dee2e6",
//                             }}
//                           >
//                             {label}
//                           </ToggleButton>
//                         )
//                       )}
//                     </ButtonGroup>
//                   </div>

//                   {/* Chart */}
//                   <ResponsiveContainer width="100%" height={300}>
//                     <LineChart
//                       data={chart}
//                       margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
//                     >
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="date" />
//                       <YAxis
//                         yAxisId="left"
//                         label={{
//                           value: "Purchase Amount",
//                           angle: -90,
//                           position: "insideLeft",
//                         }}
//                       />
//                       <YAxis
//                         yAxisId="right"
//                         orientation="right"
//                         label={{
//                           value: "Payment Amount",
//                           angle: -90,
//                           position: "insideRight",
//                         }}
//                       />
//                       <Tooltip />
//                       <Legend />
//                       <Line
//                         yAxisId="left"
//                         type="monotone"
//                         dataKey="purchaseAmount"
//                         stroke="#E60023"
//                         dot={{ r: 4 }}
//                         name="Purchase Amount"
//                       />
//                       <Line
//                         yAxisId="right"
//                         type="monotone"
//                         dataKey="paymentAmount"
//                         stroke="#28A745"
//                         dot={{ r: 4 }}
//                         name="Payment Amount"
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </Card.Body>
//               </Card>

//               {/* Section 2: Supplier Payment Analytics */}
//               <Card
//                 className="border-0 shadow-sm"
//                 style={{
//                   backgroundColor: cards[1].bgColor,
//                   borderRadius: "16px",
//                 }}
//               >
//                 <Card.Body>
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <div className="d-flex align-items-center">
//                       <div
//                         style={{
//                           backgroundColor: cards[1].iconBg,
//                           width: "32px",
//                           height: "32px",
//                           borderRadius: "8px",
//                         }}
//                         className="d-flex align-items-center justify-content-center me-2"
//                       >
//                         {cards[1].icon}
//                       </div>
//                       <div>
//                         <h6 className="mb-0 fw-semibold">{cards[1].title}</h6>
//                         <small style={{ color: "#6C757D" }}>
//                           {cards[1].subtitle}
//                         </small>
//                       </div>
//                     </div>

//                     {/* Filters */}
//                     <ButtonGroup>
//                       {["Daily", "Same Days", "Weekly", "Monthly"].map(
//                         (label) => (
//                           <ToggleButton
//                             key={label}
//                             id={`table-filter-${label}`}
//                             type="radio"
//                             variant="outline-secondary"
//                             checked={filter === label.toLowerCase()}
//                             value={label.toLowerCase()}
//                             onChange={(e) => setFilter(e.currentTarget.value)}
//                             style={{
//                               fontSize: "13px",
//                               borderRadius: "20px",
//                               padding: "2px 12px",
//                               backgroundColor:
//                                 filter === label.toLowerCase()
//                                   ? "#fff"
//                                   : "transparent",
//                               color:
//                                 filter === label.toLowerCase()
//                                   ? "#FF5B22"
//                                   : "#6C757D",
//                               border:
//                                 filter === label.toLowerCase()
//                                   ? "1px solid #FF5B22"
//                                   : "1px solid #dee2e6",
//                             }}
//                           >
//                             {label}
//                           </ToggleButton>
//                         )
//                       )}
//                     </ButtonGroup>
//                   </div>

//                   {/* Table */}
//                   <Table borderless responsive>
//                     <thead>
//                       <tr>
//                         <th style={{ fontSize: "13px", color: "#6C757D" }}>
//                           Date
//                         </th>
//                         <th style={{ fontSize: "13px", color: "#6C757D" }}>
//                           Purchase Amount
//                         </th>
//                         <th style={{ fontSize: "13px", color: "#6C757D" }}>
//                           Payment Amount
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {table.map((row, idx) => (
//                         <tr key={idx}>
//                           <td>
//                             <div className="fw-semibold">{row.date}</div>
//                             <small style={{ color: "#6C757D" }}>
//                               {row.day}
//                             </small>
//                           </td>
//                           <td
//                             className="fw-semibold"
//                             style={{ color: "#E60023" }}
//                           >
//                             ₹{row.purchaseAmount}
//                           </td>
//                           <td
//                             className="fw-semibold"
//                             style={{ color: "#28A745" }}
//                           >
//                             ₹{row.paymentAmount}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </Card.Body>
//               </Card>
//             </>
//           );
//         }}
//       </ServiceRenderer>
//     </div>
//   );
// };

// export default SupplierFinancialAnalysis;

// // import React, { useState } from "react";
// // import { Card, ButtonGroup, ToggleButton, Table } from "react-bootstrap";
// // import {
// //   ResponsiveContainer,
// //   LineChart,
// //   Line,
// //   CartesianGrid,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   Legend,
// // } from "recharts";
// // import { supplierFinancialAnalysisDataFormatter } from "@/utils/data_formatters/suppliersDataFormatter";

// // const SupplierFinancialAnalysis = ({
// //   apiData = {
// //     etag: null,
// //     list: [
// //       {
// //         dt: "2025-07-28",
// //         startDate: "2025-07-28",
// //         endDate: "2025-07-28",
// //         purchase: {
// //           itemCount: 8,
// //           unitPrice: 0.0,
// //           totalQuantity: 0.0,
// //           totalPrice: 3475.0,
// //           purchaseStartDate: null,
// //           latestPurchaseDate: null,
// //         },
// //         expense: {
// //           purchaseAmount: 3475.0,
// //           taxAmount: 0.0,
// //           totalAmount: 3475.0,
// //         },
// //         payment: { paymentAmount: 0.0, taxAmount: 0.0, totalAmount: 0.0 },
// //       },
// //       {
// //         dt: "2025-07-31",
// //         startDate: "2025-07-31",
// //         endDate: "2025-07-31",
// //         purchase: {
// //           itemCount: 11,
// //           unitPrice: 0.0,
// //           totalQuantity: 0.0,
// //           totalPrice: 5745.0,
// //           purchaseStartDate: null,
// //           latestPurchaseDate: null,
// //         },
// //         expense: {
// //           purchaseAmount: 5745.0,
// //           taxAmount: 0.0,
// //           totalAmount: 5745.0,
// //         },
// //         payment: { paymentAmount: 0.0, taxAmount: 0.0, totalAmount: 0.0 },
// //       },
// //       {
// //         dt: "2025-08-01",
// //         startDate: "2025-08-01",
// //         endDate: "2025-08-01",
// //         purchase: {
// //           itemCount: 5,
// //           unitPrice: 0.0,
// //           totalQuantity: 0.0,
// //           totalPrice: 2550.0,
// //           purchaseStartDate: null,
// //           latestPurchaseDate: null,
// //         },
// //         expense: {
// //           purchaseAmount: 2550.0,
// //           taxAmount: 0.0,
// //           totalAmount: 2550.0,
// //         },
// //         payment: { paymentAmount: 0.0, taxAmount: 0.0, totalAmount: 0.0 },
// //       },
// //       {
// //         dt: "2025-08-02",
// //         startDate: "2025-08-02",
// //         endDate: "2025-08-02",
// //         purchase: {
// //           itemCount: 5,
// //           unitPrice: 0.0,
// //           totalQuantity: 0.0,
// //           totalPrice: 5650.0,
// //           purchaseStartDate: null,
// //           latestPurchaseDate: null,
// //         },
// //         expense: {
// //           purchaseAmount: 5650.0,
// //           taxAmount: 0.0,
// //           totalAmount: 5650.0,
// //         },
// //         payment: { paymentAmount: 0.0, taxAmount: 0.0, totalAmount: 0.0 },
// //       },
// //       {
// //         dt: "2025-08-03",
// //         startDate: "2025-08-03",
// //         endDate: "2025-08-03",
// //         purchase: {
// //           itemCount: 7,
// //           unitPrice: 0.0,
// //           totalQuantity: 0.0,
// //           totalPrice: 6570.0,
// //           purchaseStartDate: null,
// //           latestPurchaseDate: null,
// //         },
// //         expense: {
// //           purchaseAmount: 6570.0,
// //           taxAmount: 0.0,
// //           totalAmount: 6570.0,
// //         },
// //         payment: { paymentAmount: 0.0, taxAmount: 0.0, totalAmount: 0.0 },
// //       },
// //       {
// //         dt: "2025-08-04",
// //         startDate: "2025-08-04",
// //         endDate: "2025-08-04",
// //         purchase: {
// //           itemCount: 3,
// //           unitPrice: 0.0,
// //           totalQuantity: 0.0,
// //           totalPrice: 3550.0,
// //           purchaseStartDate: null,
// //           latestPurchaseDate: null,
// //         },
// //         expense: {
// //           purchaseAmount: 3550.0,
// //           taxAmount: 0.0,
// //           totalAmount: 3550.0,
// //         },
// //         payment: { paymentAmount: 0.0, taxAmount: 0.0, totalAmount: 0.0 },
// //       },
// //     ],
// //   },
// // }) => {
// //   const { chart, table, cards } =
// //     supplierFinancialAnalysisDataFormatter(apiData);
// //   const [filter, setFilter] = useState("daily");

// //   return (
// //     <div className="p-3">
// //       {/* Section 1: Supplier Financial Analysis */}
// //       <Card
// //         className="border-0 shadow-sm mb-4"
// //         style={{ backgroundColor: cards[0].bgColor, borderRadius: "16px" }}
// //       >
// //         <Card.Body>
// //           <div className="d-flex justify-content-between align-items-center mb-3">
// //             <div className="d-flex align-items-center">
// //               <div
// //                 style={{
// //                   backgroundColor: cards[0].iconBg,
// //                   width: "32px",
// //                   height: "32px",
// //                   borderRadius: "8px",
// //                 }}
// //                 className="d-flex align-items-center justify-content-center me-2"
// //               >
// //                 {cards[0].icon}
// //               </div>
// //               <div>
// //                 <h6 className="mb-0 fw-semibold">{cards[0].title}</h6>
// //                 <small style={{ color: "#6C757D" }}>{cards[0].subtitle}</small>
// //               </div>
// //             </div>

// //             {/* Filters */}
// //             <ButtonGroup>
// //               {["Daily", "Same Days", "Weekly", "Monthly"].map((label) => (
// //                 <ToggleButton
// //                   key={label}
// //                   id={`filter-${label}`}
// //                   type="radio"
// //                   variant="outline-secondary"
// //                   checked={filter === label.toLowerCase()}
// //                   value={label.toLowerCase()}
// //                   onChange={(e) => setFilter(e.currentTarget.value)}
// //                   style={{
// //                     fontSize: "13px",
// //                     borderRadius: "20px",
// //                     padding: "2px 12px",
// //                     backgroundColor:
// //                       filter === label.toLowerCase() ? "#fff" : "transparent",
// //                     color:
// //                       filter === label.toLowerCase() ? "#FF5B22" : "#6C757D",
// //                     border:
// //                       filter === label.toLowerCase()
// //                         ? "1px solid #FF5B22"
// //                         : "1px solid #dee2e6",
// //                   }}
// //                 >
// //                   {label}
// //                 </ToggleButton>
// //               ))}
// //             </ButtonGroup>
// //           </div>

// //           {/* Chart */}
// //           <ResponsiveContainer width="100%" height={300}>
// //             <LineChart
// //               data={chart}
// //               margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
// //             >
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="date" />
// //               <YAxis
// //                 yAxisId="left"
// //                 label={{
// //                   value: "Purchase Amount",
// //                   angle: -90,
// //                   position: "insideLeft",
// //                 }}
// //               />
// //               <YAxis
// //                 yAxisId="right"
// //                 orientation="right"
// //                 label={{
// //                   value: "Payment Amount",
// //                   angle: -90,
// //                   position: "insideRight",
// //                 }}
// //               />
// //               <Tooltip />
// //               <Legend />
// //               <Line
// //                 yAxisId="left"
// //                 type="monotone"
// //                 dataKey="purchaseAmount"
// //                 stroke="#E60023"
// //                 dot={{ r: 4 }}
// //                 name="Purchase Amount"
// //               />
// //               <Line
// //                 yAxisId="right"
// //                 type="monotone"
// //                 dataKey="paymentAmount"
// //                 stroke="#28A745"
// //                 dot={{ r: 4 }}
// //                 name="Payment Amount"
// //               />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </Card.Body>
// //       </Card>

// //       {/* Section 2: Supplier Payment Analytics */}
// //       <Card
// //         className="border-0 shadow-sm"
// //         style={{ backgroundColor: cards[1].bgColor, borderRadius: "16px" }}
// //       >
// //         <Card.Body>
// //           <div className="d-flex justify-content-between align-items-center mb-3">
// //             <div className="d-flex align-items-center">
// //               <div
// //                 style={{
// //                   backgroundColor: cards[1].iconBg,
// //                   width: "32px",
// //                   height: "32px",
// //                   borderRadius: "8px",
// //                 }}
// //                 className="d-flex align-items-center justify-content-center me-2"
// //               >
// //                 {cards[1].icon}
// //               </div>
// //               <div>
// //                 <h6 className="mb-0 fw-semibold">{cards[1].title}</h6>
// //                 <small style={{ color: "#6C757D" }}>{cards[1].subtitle}</small>
// //               </div>
// //             </div>

// //             {/* Filters */}
// //             <ButtonGroup>
// //               {["Daily", "Same Days", "Weekly", "Monthly"].map((label) => (
// //                 <ToggleButton
// //                   key={label}
// //                   id={`table-filter-${label}`}
// //                   type="radio"
// //                   variant="outline-secondary"
// //                   checked={filter === label.toLowerCase()}
// //                   value={label.toLowerCase()}
// //                   onChange={(e) => setFilter(e.currentTarget.value)}
// //                   style={{
// //                     fontSize: "13px",
// //                     borderRadius: "20px",
// //                     padding: "2px 12px",
// //                     backgroundColor:
// //                       filter === label.toLowerCase() ? "#fff" : "transparent",
// //                     color:
// //                       filter === label.toLowerCase() ? "#FF5B22" : "#6C757D",
// //                     border:
// //                       filter === label.toLowerCase()
// //                         ? "1px solid #FF5B22"
// //                         : "1px solid #dee2e6",
// //                   }}
// //                 >
// //                   {label}
// //                 </ToggleButton>
// //               ))}
// //             </ButtonGroup>
// //           </div>

// //           {/* Table */}
// //           <Table borderless responsive>
// //             <thead>
// //               <tr>
// //                 <th style={{ fontSize: "13px", color: "#6C757D" }}>Date</th>
// //                 <th style={{ fontSize: "13px", color: "#6C757D" }}>
// //                   Purchase Amount
// //                 </th>
// //                 <th style={{ fontSize: "13px", color: "#6C757D" }}>
// //                   Payment Amount
// //                 </th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {table.map((row, idx) => (
// //                 <tr key={idx}>
// //                   <td>
// //                     <div className="fw-semibold">{row.date}</div>
// //                     <small style={{ color: "#6C757D" }}>{row.day}</small>
// //                   </td>
// //                   <td className="fw-semibold" style={{ color: "#E60023" }}>
// //                     ₹{row.purchaseAmount}
// //                   </td>
// //                   <td className="fw-semibold" style={{ color: "#28A745" }}>
// //                     ₹{row.paymentAmount}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </Table>
// //         </Card.Body>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default SupplierFinancialAnalysis;
