"use client";

import React from "react";
import { Table } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import { BaseSurface } from "../../dashboard/TablesSort";
import { useTableSort } from "@/components/hooks/useTableSort";
import { TableControls } from "@/components/common/TableControls";
import { useTableControls } from "@/components/hooks/useTableControls";

export default function SalesForeCastByItemTable({ tableData = [] }) {
  // 🔹 Columns for table + Excel export
  const columns = [
    { key: "day", header: "DAY", width: 20 },
    { key: "item", header: "ITEM", width: 25 },
    { key: "orders", header: "ORDERS", width: 15 },
    { key: "itemsSold", header: "ITEMS SOLD", width: 15 },
    { key: "netSales", header: "NET SALES", width: 15 },
    { key: "discount", header: "DISCOUNT", width: 10 },
  ];

  // 🔹 Table sorting
  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(tableData);

  // 🔹 Filters config (example: filter by day)
  const filtersConfig = {
    day: [
      "All",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  };

  // 🔹 Table controls hook (search + filters + export)
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
    searchFields: ["day", "item"], // searchable fields
    filtersConfig,
  });

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  return (
    <div>
      {/* 🔹 Search + Filter + Export Controls */}
      <TableControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        filtersConfig={filtersConfig}
        handleExport={handleExport}
        searchable={true}
        filterable={true} // filters enabled
        exportable={true}
      />

      {/* 🔹 Table */}
      <div
        style={{
          maxHeight: "60vh",
          overflowY: "auto",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="hide-scrollbar"
      >
        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          th.sticky-header {
            position: sticky;
            top: 0;
            background: #fafafa;
            z-index: 3;
          }
        `}</style>

        <div style={{ minWidth: "750px" }}>
          <Table hover className="align-middle mb-0 text-nowrap">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="sticky-header"
                    style={{
                      fontWeight: 700,
                      fontSize: "14px",
                      textTransform: "uppercase",
                      color: "#464f60",
                      cursor: "pointer",
                      padding: "12px 16px",
                      minWidth: col.width ? `${col.width}%` : "120px",
                      borderBottom: "1px solid #eee",
                      backgroundColor:"#f4f7fc"
                    }}
                  >
                    {col.key === "day" ? (
                      <>
                         DAY
                      </>
                    ) : (
                      col.header
                    )}
                    {typeof col.header === "string" && renderSortArrow(col.key)}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "14px 16px",fontWeight:700, fontSize:"14px", color:"#171c26" }}>{row.day}</td>
                    <td style={{ padding: "14px 16px", fontWeight:700, fontSize:"14px", color:"#171c26" }}>{row.item}</td>
                    <td style={{ padding: "14px 16px",fontWeight:500, fontSize:"14px", color:"#171c26" }}>{row.orders}</td>
                    <td style={{ padding: "14px 16px",fontWeight:500, fontSize:"14px", color:"#171c26" }}>{row.itemsSold}</td>
                    <td style={{ padding: "14px 16px",fontWeight:700, fontSize:"14px", color:"#171c26" }}>{row.netSales}</td>
                    <td style={{ padding: "14px 16px",fontWeight:500, fontSize:"14px", color:"#171c26" }}>{row.discount}</td>
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
    </div>
  );
}

// "use client";

// import React from "react";
// import { Table } from "react-bootstrap";
// import { FaCalendarAlt } from "react-icons/fa";
// import { BaseSurface } from "../../dashboard/TablesSort";
// import { useTableSort } from "@/components/hooks/useTableSort";

// export default function SalesForeCastByItemTable({ tableData }) {
//   const { sortedData, sortKey, direction, handleSort } =
//     useTableSort(tableData);

//   const renderSortArrow = (key) =>
//     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

//   const columns = [
//     {
//       key: "day",
//       label: (
//         <>
//           <FaCalendarAlt className="me-1" /> DAY
//         </>
//       ),
//       minWidth: "120px",
//     },
//     { key: "item", label: "ITEM", minWidth: "150px" },
//     { key: "orders", label: "ORDERS", minWidth: "120px" },
//     { key: "itemsSold", label: "ITEMS SOLD", minWidth: "120px" },
//     { key: "netSales", label: "NET SALES", minWidth: "120px" },
//     { key: "discount", label: "DISCOUNT", minWidth: "120px" },
//   ];

//   return (
//     <BaseSurface maxHeight="65vh">
//       <div
//         style={{
//           maxHeight: "60vh",
//           overflowY: "auto",
//           overflowX: "auto",
//           scrollbarWidth: "none",
//           msOverflowStyle: "none",
//         }}
//         className="hide-scrollbar"
//       >
//         <style jsx>{`
//           .hide-scrollbar::-webkit-scrollbar {
//             display: none;
//           }
//           th.sticky-header {
//             position: sticky;
//             top: 0;
//             background: #fafafa;
//             z-index: 3;
//           }
//         `}</style>

//         {/* Horizontal scroll wrapper */}
//         <div style={{ minWidth: "750px" }}>
//           <Table hover bordered className="align-middle mb-0 text-nowrap">
//             <thead>
//               <tr>
//                 {columns.map((col) => (
//                   <th
//                     key={col.key}
//                     onClick={() => handleSort(col.key)}
//                     className="sticky-header"
//                     style={{
//                       fontWeight: 600,
//                       fontSize: "0.85rem",
//                       textTransform: "uppercase",
//                       color: "#555",
//                       cursor: "pointer",
//                       padding: "12px 16px",
//                       minWidth: col.minWidth,
//                       borderBottom: "1px solid #eee",
//                     }}
//                   >
//                     {col.label}
//                     {typeof col.label === "string" && renderSortArrow(col.key)}
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody>
//               {sortedData.length > 0 ? (
//                 sortedData.map((row, idx) => (
//                   <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
//                     <td style={{ padding: "14px 16px" }}>{row.day}</td>
//                     <td style={{ padding: "14px 16px" }}>{row.item}</td>
//                     <td style={{ padding: "14px 16px" }}>{row.orders}</td>
//                     <td style={{ padding: "14px 16px" }}>{row.itemsSold}</td>
//                     <td style={{ padding: "14px 16px" }}>{row.netSales}</td>
//                     <td style={{ padding: "14px 16px" }}>{row.discount}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={columns.length}
//                     style={{
//                       textAlign: "center",
//                       padding: "20px",
//                       color: "#888",
//                       fontStyle: "italic",
//                     }}
//                   >
//                     No data available
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>
//       </div>
//     </BaseSurface>
//   );
// }
