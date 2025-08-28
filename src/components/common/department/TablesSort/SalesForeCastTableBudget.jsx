"use client";

import React from "react";
import { Table, Badge } from "react-bootstrap";
import { BaseSurface } from "../../dashboard/TablesSort";
import { useTableSort } from "@/components/hooks/useTableSort";
import { FaRupeeSign } from "react-icons/fa";

export default function SalesForeCastTableBudget({ tableData }) {
  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(tableData);

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  const columns = [
    { key: "day", label: "DAY", minWidth: "120px" },
    { key: "budget", label: "BUDGET", minWidth: "150px" },
    { key: "sales", label: "SALES", minWidth: "150px" },
    { key: "orders", label: "ORDERS", minWidth: "120px" },
    { key: "items", label: "ITEMS", minWidth: "120px" },
  ];

  return (
    <BaseSurface maxHeight="65vh">
      <div
        style={{
          maxHeight: "60vh",
          overflowY: "auto",
          overflowX: "auto",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
        className="hide-scrollbar"
      >
        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <Table
          hover
          bordered={false}
          className="align-middle mb-0 text-nowrap"
          style={{ minWidth: "700px", tableLayout: "fixed" }}
        >
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{
                    background: "#fafafa",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    color: "#555",
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                    cursor: "pointer",
                    padding: "12px 16px",
                    minWidth: col.minWidth,
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {col.label}
                  {renderSortArrow(col.key)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((row, idx) => (
                <tr
                  key={idx}
                  className={row.day === "Total" ? "fw-bold" : ""}
                  style={{ borderBottom: "1px solid #eee" }}
                >
                  <td style={{ padding: "14px 16px" }}>{row.day}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <FaRupeeSign /> {Math.round(row.budget).toLocaleString()}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <FaRupeeSign /> {Math.round(row.sales).toLocaleString()}
                  </td>
                  <td style={{ padding: "14px 16px" }}>{row.orders}</td>
                  <td style={{ padding: "14px 16px" }}>{row.items}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#888",
                    fontStyle: "italic",
                  }}
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </BaseSurface>
  );
}
// "use client";

// import React from "react";
// import { Table } from "react-bootstrap";
// import { FaRupeeSign } from "react-icons/fa";

// export default function SalesForeCastTableBudget({ tableData }) {
//   return (
//     <div style={{ maxHeight: "65vh", overflowY: "auto" }}>
//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>DAY</th>
//             <th>BUDGET</th>
//             <th>SALES</th>
//             <th>ORDERS</th>
//             <th>ITEMS</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.map((row, idx) => (
//             <tr key={idx} className={row.day === "Total" ? "fw-bold" : ""}>
//               <td>{row.day}</td>
//               <td>
//                 <FaRupeeSign /> {Math.round(row.budget).toLocaleString()}
//               </td>
//               <td>
//                 <FaRupeeSign /> {Math.round(row.sales).toLocaleString()}
//               </td>
//               <td>{row.orders}</td>
//               <td>{row.items}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// }
