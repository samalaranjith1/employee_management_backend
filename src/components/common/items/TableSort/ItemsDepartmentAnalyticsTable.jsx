"use client";

import React, { useMemo } from "react";
import { useTableSort } from "@/components/hooks/useTableSort";
import { FaArrowTrendUp } from "react-icons/fa6";

export default function ItemsDepartmentAnalyticsTable({ tableData = [] }) {
  // 🔹 Normalize data for sorting (convert strings like ₹, commas to numbers)
  const normalizedData = useMemo(() => {
    return tableData.map((row) => ({
      ...row,
      openingSort:
        parseFloat(String(row?.opening?.value || "").replace(/₹|,/g, "")) || 0,
      consumptionSort:
        parseFloat(String(row?.consumption?.value || "").replace(/₹|,/g, "")) ||
        0,
      closingSort:
        parseFloat(String(row?.closing?.value || "").replace(/₹|,/g, "")) || 0,
      netConsumptionSort:
        parseFloat(
          String(row?.netConsumption?.value || "").replace(/₹|,/g, "")
        ) || 0,
      saleSort:
        parseFloat(String(row?.sale?.value || "").replace(/₹|,/g, "")) || 0,
      burnUtilizationSort:
        parseFloat(
          String(row?.burnUtilization?.value || "").replace(/₹|,/g, "")
        ) || 0,
    }));
  }, [tableData]);

  const { sortedData = [], sortKey, direction, handleSort } = useTableSort(
    normalizedData
  );

  const renderArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  const columns = [
    { key: "department", label: "Department", bgClass: "" },
    { key: "openingSort", label: "Opening", bgClass: "bg-soft-blue" },
    { key: "consumptionSort", label: "Consumption", bgClass: "bg-soft-orange" },
    { key: "closingSort", label: "Closing", bgClass: "bg-soft-green" },
    { key: "netConsumptionSort", label: "Net Consumption", bgClass: "bg-soft-red" },
    { key: "saleSort", label: "Sale", bgClass: "bg-soft-purple" },
    { key: "burnUtilizationSort", label: "Burn & Utilization", bgClass: "bg-soft-gray" },
    { key: "actions", label: "Actions", bgClass: "" },
  ];

  return (
    <div
      style={{
        maxHeight: "65vh",
        overflowY: "auto",
        overflowX: "auto",
        position: "relative",
      }}
    >
      <table
        className="table table-hover table-bordered align-middle text-center analytics-table"
        style={{ marginBottom: 0, width: "100%" }}
      >
        <thead
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            zIndex: 5,
          }}
        >
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => col.key !== "actions" && handleSort(col.key)}
                style={{
                  cursor: col.key !== "actions" ? "pointer" : "default",
                  fontSize: "14px",
                  padding: "12px 16px",
                  backgroundColor: "#f4f7fc",
                  fontWeight: 700,
                  color:"#232425"
                }}
              >
                {col.label} {col.key !== "actions" && renderArrow(col.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => {
                  const cell =
                    row[col.key.replace("Sort", "")] || row[col.key] || {};
                  const isColored = col.bgClass !== "";

                  // Department & Actions have no background
                  if (col.key === "department") {
                    return (
                      <td key={col.key} className="" style={{fontWeight:600, fontSize:"14px", color:"#232425"}}>
                        {row.department}
                      </td>
                    );
                  }
                  if (col.key === "actions") {
                    return (
                      <td key={col.key}>
                        <a
                          href="#"
                          className="text-decoration-none" style={{fontWeight:600, fontSize:"14px", color:"#155DFC"}}
                        >
                          View Trend <FaArrowTrendUp />
                        </a>
                      </td>
                    );
                  }

                  return (
                    <td key={col.key} className="position-relative " style={{fontWeight:600, fontSize:"14px", color:"#232425"}}>
                      {isColored && (
                        <div className={`cell-bg ${col.bgClass}`}></div>
                      )}
                      <div className="position-relative" style={{ zIndex: 2 }}>
                        {cell.label || cell.qty || ""}
                        {cell.value && (
                          <div className="" style={{fontWeight:500, fontSize:"12px", color:"#717182"}}>{cell.value}</div>
                        )}
                        {cell.percentage && (
                          <div className="" style={{fontWeight:500, fontSize:"12px", color:"#717182"}}>{cell.percentage}</div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Styles for partial background */}
      <style jsx>{`
        .analytics-table thead {
          background: #fafafa;
        }

        /* Centered partial background (70%) */
        .cell-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70%;
          height: 70%;
          border-radius: 8px;
          opacity: 0.25;
          z-index: 1;
        }

        .bg-soft-blue {
          background-color: #007bff;
        }
        .bg-soft-orange {
          background-color: #ff6b00;
        }
        .bg-soft-green {
          background-color: #28a745;
        }
        .bg-soft-red {
          background-color: #dc3545;
        }
        .bg-soft-purple {
          background-color: #9c27b0;
        }
        .bg-soft-gray {
          background-color: #555;
        }
      `}</style>
    </div>
  );
}
// "use client";

// import React, { useMemo } from "react";
// import { useTableSort } from "@/components/hooks/useTableSort";
// import { FaArrowTrendUp } from "react-icons/fa6";

// export default function ItemsDepartmentAnalyticsTable({ tableData = [] }) {
//   // 🔹 Normalize data for sorting (convert strings like ₹, commas to numbers)
//   const normalizedData = useMemo(() => {
//     return tableData.map((row) => ({
//       ...row,
//       openingSort:
//         parseFloat(String(row?.opening?.value || "").replace(/₹|,/g, "")) || 0,
//       consumptionSort:
//         parseFloat(String(row?.consumption?.value || "").replace(/₹|,/g, "")) ||
//         0,
//       closingSort:
//         parseFloat(String(row?.closing?.value || "").replace(/₹|,/g, "")) || 0,
//       netConsumptionSort:
//         parseFloat(
//           String(row?.netConsumption?.value || "").replace(/₹|,/g, "")
//         ) || 0,
//       saleSort:
//         parseFloat(String(row?.sale?.value || "").replace(/₹|,/g, "")) || 0,
//       burnUtilizationSort:
//         parseFloat(
//           String(row?.burnUtilization?.value || "").replace(/₹|,/g, "")
//         ) || 0,
//     }));
//   }, [tableData]);

//   const {
//     sortedData = [],
//     sortKey,
//     direction,
//     handleSort,
//   } = useTableSort(normalizedData);

//   const renderArrow = (key) =>
//     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

//   const columns = [
//     { key: "department", label: "Department" },
//     { key: "openingSort", label: "Opening" },
//     { key: "consumptionSort", label: "Consumption" },
//     { key: "closingSort", label: "Closing" },
//     { key: "netConsumptionSort", label: "Net Consumption" },
//     { key: "saleSort", label: "Sale" },
//     { key: "burnUtilizationSort", label: "Burn & Utilization" },
//     { key: "actions", label: "Actions" },
//   ];

//   return (
//     <div
//       style={{
//         maxHeight: "65vh",
//         overflowY: "auto",
//         position: "relative",
//       }}
//     >
//       <table
//         className="table table-hover table-bordered align-middle text-center"
//         style={{ marginBottom: 0, width: "100%" }}
//       >
//         <thead
//           style={{
//             position: "sticky",
//             top: 0,
//             backgroundColor: "#fff",
//             zIndex: 5,
//           }}
//         >
//           <tr>
//             {columns.map((col) => (
//               <th
//                 key={col.key}
//                 onClick={() => col.key !== "actions" && handleSort(col.key)}
//                 style={{
//                   cursor: col.key !== "actions" ? "pointer" : "default",
//                   fontSize: "13px",
//                   padding: "12px 16px",
//                   backgroundColor: "#fff",
//                 }}
//               >
//                 {col.label} {col.key !== "actions" && renderArrow(col.key)}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {sortedData.length > 0 ? (
//             sortedData.map((row) => (
//               <tr key={row.id}>
//                 <td className="fw-bold">{row.department}</td>

//                 <td
//                   style={{
//                     backgroundColor: row.opening.bgColor,
//                     color: row.opening.textColor,
//                   }}
//                 >
//                   {row.opening.label}
//                   <div className="text-muted small">{row.opening.value}</div>
//                 </td>

//                 <td
//                   style={{
//                     backgroundColor: row.consumption.bgColor,
//                     color: row.consumption.textColor,
//                   }}
//                 >
//                   {row.consumption.label}
//                   <div className="text-muted small">
//                     {row.consumption.value}
//                   </div>
//                 </td>

//                 <td
//                   style={{
//                     backgroundColor: row.closing.bgColor,
//                     color: row.closing.textColor,
//                   }}
//                 >
//                   {row.closing.label}
//                   <div className="text-muted small">{row.closing.value}</div>
//                 </td>

//                 <td
//                   style={{
//                     backgroundColor: row.netConsumption.bgColor,
//                     color: row.netConsumption.textColor,
//                   }}
//                 >
//                   {row.netConsumption.label}
//                   <div className="text-muted small">
//                     {row.netConsumption.value}
//                   </div>
//                 </td>

//                 <td
//                   style={{
//                     backgroundColor: row.sale.bgColor,
//                     color: row.sale.textColor,
//                   }}
//                 >
//                   {row.sale.label}
//                   <div className="text-muted small">{row.sale.value}</div>
//                 </td>

//                 <td
//                   style={{
//                     backgroundColor: row.burnUtilization.bgColor,
//                     color: row.burnUtilization.textColor,
//                   }}
//                 >
//                   {row.burnUtilization.label}
//                   <div className="text-muted small">
//                     {row.burnUtilization.value}
//                   </div>
//                 </td>

//                 <td>
//                   <a
//                     href="#"
//                     className="text-primary fw-semibold text-decoration-none"
//                   >
//                     View Trend <FaArrowTrendUp />
//                   </a>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={columns.length} className="text-center">
//                 No data available
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
