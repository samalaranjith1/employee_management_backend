"use client";

import React from "react";
import { Table } from "react-bootstrap";
import { BaseSurface } from "../../dashboard/TablesSort";
import { useTableSort } from "@/components/hooks/useTableSort";
import { FaRupeeSign } from "react-icons/fa";
import { TableControls } from "@/components/common/TableControls";
import { useTableControls } from "@/components/hooks/useTableControls";

export default function SalesForeCastTableBudget({ tableData = [] }) {
  const columns = [
    { key: "day", header: "DAY" },
    { key: "budget", header: "BUDGET" },
    { key: "sales", header: "SALES" },
    { key: "orders", header: "ORDERS" },
    { key: "items", header: "ITEMS" },
  ];

  // 🔹 Table sorting
  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(tableData);

  // 🔹 Search + Export (no filters)
  const { searchTerm, setSearchTerm, filteredData, handleExport } =
    useTableControls({
      data: sortedData,
      columns,
      searchFields: ["day"], // searchable field
      filtersConfig: {}, // empty because no filters
    });

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  return (
    <div>
      {/* 🔹 Search + Export Controls */}
      <TableControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={{}} // empty
        setFilters={() => {}} // noop
        filtersConfig={{}} // empty
        handleExport={handleExport}
        searchable={true} // enable search
        filterable={false} // disable filters
        exportable={true} // enable export
      />

      {/* 🔹 Table */}
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
                  {col.header}
                  {renderSortArrow(col.key)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, idx) => (
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
          <tfoot>
            <tr
              style={{
                fontWeight: 700,
                position: "sticky",
                bottom: 0,
                backgroundColor: "#fafafa",
                borderTop: "2px solid #eee",
              }}
            >
              <td style={{ padding: "12px 16px" }}>Total</td>
              <td style={{ padding: "12px 16px" }}>
                <FaRupeeSign />{" "}
                {Math.round(
                  filteredData.reduce((sum, row) => sum + row.budget, 0)
                ).toLocaleString()}
              </td>
              <td style={{ padding: "12px 16px" }}>
                <FaRupeeSign />{" "}
                {Math.round(
                  filteredData.reduce((sum, row) => sum + row.sales, 0)
                ).toLocaleString()}
              </td>
              <td style={{ padding: "12px 16px" }}>
                {filteredData.reduce((sum, row) => sum + row.orders, 0)}
              </td>
              <td style={{ padding: "12px 16px" }}>
                {filteredData.reduce((sum, row) => sum + row.items, 0)}
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </div>
  );
}
// "use client";

// import React from "react";
// import { Table, Badge } from "react-bootstrap";
// import { BaseSurface } from "../../dashboard/TablesSort";
// import { useTableSort } from "@/components/hooks/useTableSort";
// import { FaRupeeSign } from "react-icons/fa";

// export default function SalesForeCastTableBudget({ tableData }) {
//   const { sortedData, sortKey, direction, handleSort } =
//     useTableSort(tableData);

//   const renderSortArrow = (key) =>
//     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

//   const columns = [
//     { key: "day", label: "DAY", minWidth: "120px" },
//     { key: "budget", label: "BUDGET", minWidth: "150px" },
//     { key: "sales", label: "SALES", minWidth: "150px" },
//     { key: "orders", label: "ORDERS", minWidth: "120px" },
//     { key: "items", label: "ITEMS", minWidth: "120px" },
//   ];

//   return (
//     <BaseSurface maxHeight="65vh">
//       <div
//         style={{
//           maxHeight: "60vh",
//           overflowY: "auto",
//           overflowX: "auto",
//           scrollbarWidth: "none", // Firefox
//           msOverflowStyle: "none", // IE/Edge
//         }}
//         className="hide-scrollbar"
//       >
//         <style jsx>{`
//           .hide-scrollbar::-webkit-scrollbar {
//             display: none;
//           }
//         `}</style>

//         <Table
//           hover
//           bordered={false}
//           className="align-middle mb-0 text-nowrap"
//           style={{ minWidth: "700px", tableLayout: "fixed" }}
//         >
//           <thead>
//             <tr>
//               {columns.map((col) => (
//                 <th
//                   key={col.key}
//                   onClick={() => handleSort(col.key)}
//                   style={{
//                     background: "#fafafa",
//                     fontWeight: 600,
//                     fontSize: "0.85rem",
//                     textTransform: "uppercase",
//                     color: "#555",
//                     position: "sticky",
//                     top: 0,
//                     zIndex: 2,
//                     cursor: "pointer",
//                     padding: "12px 16px",
//                     minWidth: col.minWidth,
//                     borderBottom: "1px solid #eee",
//                   }}
//                 >
//                   {col.label}
//                   {renderSortArrow(col.key)}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {sortedData.length > 0 ? (
//               sortedData.map((row, idx) => (
//                 <tr
//                   key={idx}
//                   className={row.day === "Total" ? "fw-bold" : ""}
//                   style={{ borderBottom: "1px solid #eee" }}
//                 >
//                   <td style={{ padding: "14px 16px" }}>{row.day}</td>
//                   <td style={{ padding: "14px 16px" }}>
//                     <FaRupeeSign /> {Math.round(row.budget).toLocaleString()}
//                   </td>
//                   <td style={{ padding: "14px 16px" }}>
//                     <FaRupeeSign /> {Math.round(row.sales).toLocaleString()}
//                   </td>
//                   <td style={{ padding: "14px 16px" }}>{row.orders}</td>
//                   <td style={{ padding: "14px 16px" }}>{row.items}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan={columns.length}
//                   style={{
//                     textAlign: "center",
//                     padding: "20px",
//                     color: "#888",
//                     fontStyle: "italic",
//                   }}
//                 >
//                   No data available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       </div>
//     </BaseSurface>
//   );
// }
// // "use client";

// // import React from "react";
// // import { Table } from "react-bootstrap";
// // import { FaRupeeSign } from "react-icons/fa";

// // export default function SalesForeCastTableBudget({ tableData }) {
// //   return (
// //     <div style={{ maxHeight: "65vh", overflowY: "auto" }}>
// //       <Table striped bordered hover responsive>
// //         <thead>
// //           <tr>
// //             <th>DAY</th>
// //             <th>BUDGET</th>
// //             <th>SALES</th>
// //             <th>ORDERS</th>
// //             <th>ITEMS</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {tableData.map((row, idx) => (
// //             <tr key={idx} className={row.day === "Total" ? "fw-bold" : ""}>
// //               <td>{row.day}</td>
// //               <td>
// //                 <FaRupeeSign /> {Math.round(row.budget).toLocaleString()}
// //               </td>
// //               <td>
// //                 <FaRupeeSign /> {Math.round(row.sales).toLocaleString()}
// //               </td>
// //               <td>{row.orders}</td>
// //               <td>{row.items}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </Table>
// //     </div>
// //   );
// // }
