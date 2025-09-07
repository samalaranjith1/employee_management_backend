"use client";

import React from "react";
import { Table } from "react-bootstrap";
import { useTableSort } from "@/components/hooks/useTableSort";
import { BaseSurface } from "../../dashboard/TablesSort";
import { TableControls } from "@/components/common/TableControls";
import { useTableControls } from "@/components/hooks/useTableControls";

export default function ClosingTable({ tableData = [] }) {
  // 🔹 Columns for table + Excel export
  const columns = [
    { key: "item", header: "ITEM", minWidth: "250px" },
    { key: "quantity", header: "QUANTITY", minWidth: "120px" },
    { key: "totalPrice", header: "TOTAL PRICE", minWidth: "120px" },
  ];

  // 🔹 Table sorting
  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(tableData);

  // 🔹 Filters config: filterable by item
  const filtersConfig = {
    item: ["All", ...Array.from(new Set(tableData.map((row) => row.item)))],
  };

  // 🔹 Table controls hook (search + filter + export)
  const {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    filteredData,
    handleExport,
  } = useTableControls({
    data: sortedData,
    columns,
    searchFields: ["item", "category"],
    filtersConfig,
  });

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  return (
    <div className="mt-2">
      {/* 🔹 Search + Filter + Export Controls */}
      <TableControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        filtersConfig={filtersConfig}
        handleExport={handleExport}
        searchable={true}
        filterable={true}
        exportable={true}
      />

      {/* 🔹 Table Header */}
      <Table
        hover
        borderless
        className="align-middle mb-0 text-nowrap"
        style={{ minWidth: "600px", tableLayout: "fixed" }}
      >
        <thead
          style={{ display: "table", width: "100%", tableLayout: "fixed" }}
        >
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                  background: "#fafafa",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  color: "#555",
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
      </Table>

      {/* 🔹 Scrollable tbody */}
      <div
        style={{
          maxHeight: "65vh",
          overflowY: "auto",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
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
          borderless
          className="align-middle mb-0 text-nowrap"
          style={{ minWidth: "600px", tableLayout: "fixed" }}
        >
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "14px 16px", minWidth: "250px" }}>
                    <div className="fw-semibold">{row.item}</div>
                    <div className="text-muted small">
                      {row.category} • {row.quantity} • ₹{row.totalPrice}
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", minWidth: "120px" }}>
                    {row.quantity}
                  </td>
                  <td style={{ padding: "14px 16px", minWidth: "120px" }}>
                    ₹{row.totalPrice}
                  </td>
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
    </div>
  );
}
// "use client";

// import React from "react";
// import { Table } from "react-bootstrap";
// import { useTableSort } from "@/components/hooks/useTableSort";
// import { BaseSurface } from "../../dashboard/TablesSort";

// export default function ClosingTable({ tableData }) {
//   const { sortedData, sortKey, direction, handleSort } =
//     useTableSort(tableData);

//   const renderSortArrow = (key) =>
//     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

//   const columns = [
//     { key: "item", label: "ITEM", minWidth: "250px" },
//     { key: "quantity", label: "QUANTITY", minWidth: "120px" },
//     { key: "totalPrice", label: "TOTAL PRICE", minWidth: "120px" },
//   ];

//   return (
//     <BaseSurface style={{ maxHeight: "65vh", overflowX: "auto" }}>
//       <Table
//         hover
//         borderless
//         className="align-middle mb-0 text-nowrap"
//         style={{ minWidth: "600px", tableLayout: "fixed" }}
//       >
//         <thead
//           style={{ display: "table", width: "100%", tableLayout: "fixed" }}
//         >
//           <tr>
//             {columns.map((col) => (
//               <th
//                 key={col.key}
//                 onClick={() => handleSort(col.key)}
//                 style={{
//                   position: "sticky",
//                   top: 0,
//                   zIndex: 10,
//                   background: "#fafafa",
//                   fontWeight: 600,
//                   fontSize: "0.85rem",
//                   textTransform: "uppercase",
//                   color: "#555",
//                   cursor: "pointer",
//                   padding: "12px 16px",
//                   minWidth: col.minWidth,
//                   borderBottom: "1px solid #eee",
//                 }}
//               >
//                 {col.label}
//                 {renderSortArrow(col.key)}
//               </th>
//             ))}
//           </tr>
//         </thead>
//       </Table>

//       {/* Scrollable tbody without visible scrollbar */}
//       <div
//         style={{
//           maxHeight: "65vh",
//           overflowY: "auto",
//           msOverflowStyle: "none", // IE/Edge
//           scrollbarWidth: "none", // Firefox
//         }}
//         className="hide-scrollbar"
//       >
//         <style jsx>{`
//           .hide-scrollbar::-webkit-scrollbar {
//             display: none; /* Chrome, Safari, Opera */
//           }
//         `}</style>

//         <Table
//           hover
//           borderless
//           className="align-middle mb-0 text-nowrap"
//           style={{ minWidth: "600px", tableLayout: "fixed" }}
//         >
//           <tbody>
//             {sortedData.length > 0 ? (
//               sortedData.map((row, idx) => (
//                 <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
//                   <td style={{ padding: "14px 16px", minWidth: "250px" }}>
//                     <div className="fw-semibold">{row.item}</div>
//                     <div className="text-muted small">
//                       {row.category} • {row.quantity} • ₹{row.totalPrice}
//                     </div>
//                   </td>
//                   <td style={{ padding: "14px 16px", minWidth: "120px" }}>
//                     {row.quantity}
//                   </td>
//                   <td style={{ padding: "14px 16px", minWidth: "120px" }}>
//                     ₹{row.totalPrice}
//                   </td>
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
// // import { Card, Table } from "react-bootstrap";

// // const ClosingTable = ({ tableData }) => {
// //   return (
// //     <Card className="shadow-sm">
// //       <Card.Body>
// //         <Table hover responsive borderless>
// //           <thead>
// //             <tr>
// //               <th>ITEM</th>
// //               <th>QUANTITY</th>
// //               <th>TOTAL PRICE</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {tableData.map((row, idx) => (
// //               <tr key={idx}>
// //                 <td>
// //                   <strong>{row.item}</strong>
// //                   <div className="text-muted" style={{ fontSize: "0.85rem" }}>
// //                     {row.category} • {row.quantity} • ₹{row.totalPrice}
// //                   </div>
// //                 </td>
// //                 <td>{row.quantity}</td>
// //                 <td>₹{row.totalPrice}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </Table>
// //       </Card.Body>
// //     </Card>
// //   );
// // };

// // export default ClosingTable;
