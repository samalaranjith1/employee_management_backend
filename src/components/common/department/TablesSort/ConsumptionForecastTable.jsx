"use client";

import React from "react";
import { Table } from "react-bootstrap";
import { TableControls } from "@/components/common/TableControls";
import { useTableControls } from "@/components/hooks/useTableControls";
import { useTableSort } from "@/components/hooks/useTableSort";

export default function ConsumptionForecastTable({ tableData = [] }) {
  const columns = [
    { key: "day", header: "DAY", width: 20 },
    { key: "name", header: "ITEM", width: 30 },
    { key: "quantity", header: "TOTAL QUANTITY", width: 20 },
    { key: "totalPrice", header: "TOTAL PRICE", width: 20 },
  ];

  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(tableData);

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
    searchFields: ["name", "category"],
    filtersConfig,
  });

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  return (
    <div>
      <TableControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        filtersConfig={filtersConfig}
        handleExport={handleExport}
        searchable
        filterable
        exportable
      />

      <div
        style={{
          maxHeight: "65vh",
          overflowY: "auto",
          overflowX: "auto",
        }}
      >
        <Table hover className="align-middle mb-0 text-nowrap">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "14px",
                    textTransform: "uppercase",
                    color: "#555",
                    padding: "12px 16px",
                    borderBottom: "1px solid #eee",
                    position: "sticky", // 🔹 make sticky
                    top: 0, // 🔹 stick to top
                    background: "#f4f7fc", // 🔹 background for visibility
                    zIndex: 10, // 🔹 ensure above table rows
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
                <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "14px 16px", fontWeight:700, fontSize:"14px", color:"#171c26" }}>{row.day}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div>
                      <div style={{fontSize:"14px", fontWeight:700, color:"#171c26"} }>{row.name}</div>
                      <div className="'text-muted" style={{fontSize:"12px", fontweight:500, color:"#687182"}}> 
                        <span style={{fontSize:"12px", fontweight:500, color:"#687182"}}>{row.category}</span> . 
                        <span style={{fontSize:"12px", fontweight:500, color:"#687182"}}>{row.unitQuantity} {row.unit}</span> .
                        <span style={{fontSize:"12px", fontweight:500, color:"#687182"}}>₹{row.unitPrice}</span>
                      </div>
                    </div>
                    </td>
                  <td style={{ padding: "14px 16px", fontWeight:700, fontSize:"14px", color:"#464f60" }}>{row.quantity.toLocaleString()} {row.unit.toLowerCase()}</td>
                  <td style={{ padding: "14px 16px", fontweight:500, fontSize:"14px", color:"#464f60" }}>₹{row.totalPrice.toLocaleString()}</td>
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

// import React, { useState, useMemo } from "react";
// import { Table, Form, Button, InputGroup } from "react-bootstrap";
// import { BaseSurface } from "../../dashboard/TablesSort";
// import { useTableSort } from "@/components/hooks/useTableSort";
// import { useExportToExcel } from "@/components/hooks/useExportToExcel";
// import { useFilteredData } from "@/components/hooks/useFilteredData";

// export default function ConsumptionForecastTable({ tableData = [] }) {
//   const [selectedDay, setSelectedDay] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");
//     const { exportToExcel } = useExportToExcel();

//   const { sortedData, sortKey, direction, handleSort } =
//     useTableSort(tableData);

//   // const days = useMemo(() => {
//   //   const uniqueDays = Array.from(new Set(tableData.map((item) => item.day)));
//   //   return ["All", ...uniqueDays];
//   // }, [tableData]);
//   const days = useMemo(
//     () => [
//       "All",
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//       "Sunday",
//     ],
//     []
//   );

//   const filteredData = useFilteredData({
//     data: sortedData,
//     filters: { day: selectedDay },
//     searchTerm,
//     searchFields: ["name", "category"], // search across multiple fields
//   });

//   const renderSortArrow = (key) =>
//     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

//   const columns = [
//     { key: "day", label: "DAY", minWidth: "120px" },
//     { key: "name", label: "ITEM", minWidth: "150px" },
//     { key: "quantity", label: "TOTAL QUANTITY", minWidth: "150px" },
//     { key: "totalPrice", label: "TOTAL PRICE", minWidth: "150px" },
//   ];

//   const handleExport = () => {
//     exportToExcel({ data: filteredData, columns, fileName: "ConsumptionForecast.xlsx" });
//   };

//   return (
//     <div>
//       {/* 🔹 Top Controls */}
//       <div
//         className="d-flex justify-content-between align-items-center flex-wrap gap-2 bg-light pt-4"
//         style={{ padding: "0 10px" }}
//       >
//         {/* Left: Search */}
//         <InputGroup style={{ width: "250px" }}>
//           <Form.Control
//             type="text"
//             placeholder="Search items..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </InputGroup>

//         {/* Right: Dropdown + Export */}
//         <div className="d-flex gap-2">
//           <Form.Select
//             value={selectedDay}
//             onChange={(e) => setSelectedDay(e.target.value)}
//             style={{
//               width: "180px",
//               backgroundColor: "#FF6000",
//               color: "#fff",
//               border: "none",
//               fontWeight: "500",
//               cursor: "pointer",
//             }}
//           >
//             {days.map((day, idx) => (
//               <option
//                 key={idx}
//                 value={day}
//                 style={{
//                   backgroundColor: "#FF6000",
//                   color: "#fff",
//                 }}
//               >
//                 {day}
//               </option>
//             ))}
//           </Form.Select>

//           <Button
//             style={{
//               backgroundColor: "#FF6000",
//               color: "#fff",
//               border: "none",
//               fontWeight: "500",
//             }}
//             onClick={handleExport}
//             onMouseOver={(e) =>
//               (e.currentTarget.style.backgroundColor = "#E65500")
//             }
//             onMouseOut={(e) =>
//               (e.currentTarget.style.backgroundColor = "#FF6000")
//             }
//           >
//             Export
//           </Button>
//         </div>
//       </div>

//       {/* 🔹 Table */}
//       <div
//         style={{
//           maxHeight: "65vh",
//           overflowY: "auto",
//           overflowX: "auto", // scrollbars now visible
//         }}
//       >
//         <style jsx>{`
//           th.sticky-header {
//             position: sticky;
//             top: 0;
//             background: #fafafa;
//             z-index: 3;
//           }
//         `}</style>

//         <div style={{ minWidth: "700px" }}>
//           <Table hover className="align-middle mb-0 text-nowrap">
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
//                     {renderSortArrow(col.key)}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.length > 0 ? (
//                 filteredData.map((row, idx) => (
//                   <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
//                     <td style={{ padding: "14px 16px" }}>{row.day}</td>
//                     <td style={{ padding: "14px 16px" }}>
//                       <div className="d-flex flex-column">
//                         <span>{row.name}</span>
//                         <small className="text-muted">
//                           {row.category} • {row.unitQuantity} {row.unit} • ₹
//                           {row.unitPrice}
//                         </small>
//                       </div>
//                     </td>
//                     <td style={{ padding: "14px 16px" }}>
//                       <strong>
//                         {row.quantity} {row.unit.toLowerCase()}
//                       </strong>
//                     </td>
//                     <td style={{ padding: "14px 16px" }}>
//                       <strong>₹{row.totalPrice.toFixed(0)}</strong>
//                     </td>
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
//     </div>
//   );
// }

// "use client";

// import React from "react";
// import { Table } from "react-bootstrap";
// import { BaseSurface } from "../../dashboard/TablesSort";
// import { useTableSort } from "@/components/hooks/useTableSort";

// export default function ConsumptionForecastTable({ tableData }) {
//   const { sortedData, sortKey, direction, handleSort } =
//     useTableSort(tableData);

//   const renderSortArrow = (key) =>
//     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

//   const columns = [
//     { key: "day", label: "DAY", minWidth: "120px" },
//     { key: "name", label: "ITEM", minWidth: "150px" },
//     { key: "quantity", label: "TOTAL QUANTITY", minWidth: "150px" },
//     { key: "totalPrice", label: "TOTAL PRICE", minWidth: "150px" },
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

//         <div style={{ minWidth: "700px" }}>
//           <Table hover className="align-middle mb-0 text-nowrap">
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
//                     <td style={{ padding: "14px 16px" }}>
//                       <div className="d-flex flex-column">
//                         <span>{row.name}</span>
//                         <small className="text-muted">
//                           {row.category} • {row.unitQuantity} {row.unit} • ₹
//                           {row.unitPrice}
//                         </small>
//                       </div>
//                     </td>
//                     <td style={{ padding: "14px 16px" }}>
//                       <strong>
//                         {row.quantity} {row.unit.toLowerCase()}
//                       </strong>
//                     </td>
//                     <td style={{ padding: "14px 16px" }}>
//                       <strong>₹{row.totalPrice.toFixed(0)}</strong>
//                     </td>
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
