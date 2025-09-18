"use client";

import React from "react";
import { Card, Table, Badge } from "react-bootstrap";
import { useTableSort } from "@/components/hooks/useTableSort";
import { useTableControls } from "@/components/hooks/useTableControls";
import { TableControls } from "@/components/common/TableControls";

const DEPARTMENT_COLORS = {
  "SOUTH INDIAN": "#8750f7",
  "NORTH INDIAN": "#8750f7",
  BIRYANI: "#8750f7",
  BEVERAGES: "#8750f7",
  CHINESE: "#8750f7",
};

export default function ItemConsumptionEfficiencyTable({ tableData = [] }) {
  const columns = [
    { key: "name", label: "ITEM DETAILS" },
    { key: "department", label: "DEPARTMENT" },
    { key: "consumed", label: "CONSUMED" },
    { key: "sales", label: "SALES QUANTITY" },
    { key: "difference", label: "DIFFERENCE" },
    { key: "waste", label: "WASTE %" },
    { key: "costImpact", label: "COST IMPACT" },
    { key: "status", label: "STATUS" },
  ];

  const filtersConfig = {
    name: ["All", ...Array.from(new Set(tableData.map((t) => t.name)))],
  };

  const {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    filteredData,
    handleExport,
  } = useTableControls({
    data: tableData,
    columns,
    searchFields: ["name", "department"],
    filtersConfig,
  });

  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(filteredData);

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  const getBadgeStyle = (type, val) => {
    // For waste%
    if (type === "waste") {
      if (val > 30) return { background: "#fd4137", color: "#fff" };
      if (val > 20) return { background: "#fcaa34", color: "#fff" };
      return { background: "#ffc065", color: "#fff" };
    }
    // For status
    if (type === "status") {
      if (val === "red")
        return { background: "#ffeceb", color: "#fd4137", border: "none" };
      if (val === "orange")
        return { background: "#fff5eb", color: "#fcaa34", border: "none" };
      return { background: "#e4fce6", color: "#0db143", border: "none" };
    }
    // For department badge
    return {
      background: "none",
      border: `1px solid ${DEPARTMENT_COLORS[val] || "#8750f7"}`,
      color: DEPARTMENT_COLORS[val] || "#8750f7",
    };
  };

  return (
    <Card className="shadow-sm" style={{ borderRadius: "18px" }}>
      <Card.Body>
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
        <div style={{ maxHeight: "65vh", overflowY: "auto" }}>
          <Table
            hover
            className="align-middle mb-0 text-nowrap"
            style={{ minWidth: "900px", background: "#fafbfc", fontSize: 15 }}
          >
            <thead
              style={{
                position: "sticky",
                top: 0,
                zIndex: 5,
                background: "#FAFAFA",
              }}
            >
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    style={{
                      cursor: "pointer",
                      fontWeight: 700,
                      color: "#595959",
                      padding: "10px 16px",
                      textTransform: "uppercase",
                      fontSize: ".77rem",
                      background: "#F8F9FC",
                      borderBottom: "1px solid #f0f0f1",
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
                  <tr key={idx} style={{ background: "#fff" }}>
                    {/* ITEM DETAILS */}
                    <td>
                      <div className="fw-bold">{row.name}</div>
                      <div
                        style={{
                          color: "#888",
                          fontSize: "13px",
                          marginTop: 1,
                        }}
                      >
                        {row.consumedUnit && row.price
                          ? `${row.consumedUnit} • ₹${row.price}`
                          : ""}
                      </div>
                    </td>

                    {/* DEPARTMENT */}
                    <td>
                      <span
                        className="px-3 py-1 rounded-pill"
                        style={{
                          ...getBadgeStyle("department", row.department),
                          fontWeight: 600,
                          fontSize: "13px",
                          background: "#f3ecff",
                        }}
                      >
                        {row.department}
                      </span>
                    </td>

                    {/* CONSUMED */}
                    <td style={{ fontWeight: 600, color: "#212121" }}>
                      {row.consumed}{" "}
                      <span style={{ color: "#bbb", fontWeight: 500 }}>
                        {row.consumedUnit}
                      </span>
                    </td>

                    {/* SALES */}
                    <td style={{ color: "#0db143", fontWeight: 700 }}>
                      {row.sales}{" "}
                      <span style={{ color: "#bbb", fontWeight: 500 }}>
                        {row.salesUnit} 
                      </span>
                    </td>

                    {/* DIFFERENCE */}
                    <td style={{ color: "#fd4137", fontWeight: 600 }}>
                      +{row.difference}{" "}
                      <span style={{ fontWeight: 500, color: "#fd4137" }}>
                        {row.differenceUnit} 
                      </span>
                    </td>

                    {/* WASTE */}
                    <td>
                      <span
                        className="px-3 py-1 rounded-pill"
                        style={{
                          ...getBadgeStyle("waste", row.waste),
                          fontWeight: 700,
                          fontSize: 13,
                        }}
                      >
                        {row.waste ?? "-"}%
                      </span>
                    </td>

                    {/* COST IMPACT */}
                    <td style={{ color: "#fd4137", fontWeight: 700 }}>
                      ₹{row.costImpact}{" "}
                      {/* <span
                        style={{
                          color: "#fd4137",
                          fontWeight: 500,
                          fontStyle: "italic",
                          fontSize: 13,
                        }}
                      >
                        loss incurred
                      </span> */}
                    </td>

                    {/* STATUS */}
                    <td>
                      <span
                        className="px-3 py-1 rounded-pill"
                        style={{
                          ...getBadgeStyle("status", row.status),
                          fontWeight: 700,
                          fontSize: 14,
                        }}
                      >
                        {row.status === "red"
                          ? "Critical"
                          : row.status === "orange"
                          ? "Monitor"
                          : "Monitor"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    style={{
                      textAlign: "center",
                      padding: "24px",
                      color: "#888",
                      fontStyle: "italic",
                      background: "#fff",
                    }}
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}
// "use client";

// import React from "react";
// import { Card, Table, Badge } from "react-bootstrap";
// import { useTableSort } from "@/components/hooks/useTableSort";
// import { useTableControls } from "@/components/hooks/useTableControls";
// import { TableControls } from "@/components/common/TableControls";

// export default function ItemConsumptionEfficiencyTable({ tableData = [] }) {
//   // 🔹 Columns (match second table style)
//   const columns = [
//     { key: "name", label: "ITEM DETAILS" },
//     { key: "department", label: "DEPARTMENT" },
//     { key: "consumed", label: "CONSUMED" },
//     { key: "sales", label: "SALES QUANTITY" },
//     { key: "difference", label: "DIFFERENCE" },
//     { key: "waste", label: "WASTE %" },
//     { key: "costImpact", label: "COST IMPACT" },
//     { key: "status", label: "STATUS" },
//   ];

//   // 🔹 Filters
//   const filtersConfig = {
//     name: ["All", ...Array.from(new Set(tableData.map((t) => t.name)))],
//   };

//   // 🔹 Search & Filter (useTableControls)
//   const {
//     searchTerm,
//     setSearchTerm,
//     filters,
//     setFilters,
//     filteredData,
//     handleExport,
//   } = useTableControls({
//     data: tableData,
//     columns,
//     searchFields: ["name", "department"],
//     filtersConfig,
//   });

//   // 🔹 Sorting (useTableSort)
//   const { sortedData, sortKey, direction, handleSort } =
//     useTableSort(filteredData);

//   const renderSortArrow = (key) =>
//     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

//   return (
//     <Card className="shadow-sm" style={{ borderRadius: "16px" }}>
//       <Card.Body>
//         {/* 🔹 Search + Filters + Export */}
//         <TableControls
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           filters={filters}
//           setFilters={setFilters}
//           filtersConfig={filtersConfig}
//           handleExport={handleExport}
//           searchable
//           filterable
//           exportable
//         />

//         {/* 🔹 Scrollable Table with Sticky Header */}
//         <div style={{ maxHeight: "65vh", overflowY: "auto" }}>
//           <Table
//             striped
//             hover
//             className="align-middle mb-0 text-nowrap"
//             style={{ minWidth: "900px" }} // keep if needed
//           >
//             <thead
//               className="table-light"
//               style={{
//                 position: "sticky",
//                 top: 0,
//                 zIndex: 500,
//                 background: "white", // Needed to cover rows scrolling underneath
//               }}
//             >
//               <tr>
//                 {columns.map((col) => (
//                   <th
//                     key={col.key}
//                     onClick={() => handleSort(col.key)}
//                     style={{
//                       cursor: "pointer",
//                       fontWeight: 600,
//                       minWidth: col.key === "name" ? "250px" : "120px",
//                     }}
//                   >
//                     {col.label}
//                     {renderSortArrow(col.key)}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {sortedData.length > 0 ? (
//                 sortedData.map((row, idx) => (
//                   <tr key={idx}>
//                     {/* ITEM DETAILS */}
//                     <td>
//                       <div className="fw-bold">{row.name}</div>
//                       <div
//                         className="text-muted"
//                         style={{ fontSize: "0.75rem" }}
//                       >
//                         {row.consumedUnit} • {row.price}
//                       </div>
//                     </td>

//                     {/* DEPARTMENT */}
//                     <td>
//                       <Badge
//                         bg="light"
//                         text="primary"
//                         className="px-3 py-1 rounded-pill border"
//                       >
//                         {row.department}
//                       </Badge>
//                     </td>

//                     {/* CONSUMED */}
//                     <td className="fw-bold">
//                       {row.consumed} {row.consumedUnit}
//                     </td>

//                     {/* SALES */}
//                     <td className="text-success fw-bold">
//                       {row.sales} {row.salesUnit} sold
//                     </td>

//                     {/* DIFFERENCE */}
//                     <td className="text-danger fw-bold">
//                       +{row.difference} {row.differenceUnit} excess
//                     </td>

//                     {/* WASTE */}
//                     <td>
//                       <Badge
//                         bg={
//                           row.waste > 30
//                             ? "danger"
//                             : row.waste > 20
//                             ? "warning"
//                             : "info"
//                         }
//                         className="px-2 py-1"
//                       >
//                         {row.waste}%
//                       </Badge>
//                     </td>

//                     {/* COST IMPACT */}
//                     <td className="text-danger fw-bold">
//                       ₹{row.costImpact} loss incurred
//                     </td>

//                     {/* STATUS */}
//                     <td>
//                       <Badge
//                         bg={
//                           row.status === "red"
//                             ? "danger"
//                             : row.status === "orange"
//                             ? "warning"
//                             : "success"
//                         }
//                         className="px-3 py-1 rounded-pill"
//                       >
//                         {row.status === "red"
//                           ? "Critical"
//                           : row.status === "orange"
//                           ? "Monitor"
//                           : "Healthy"}
//                       </Badge>
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
//       </Card.Body>
//     </Card>
//   );
// }
// // "use client";

// // import React, { useMemo } from "react";
// // import { Card, Table, Badge } from "react-bootstrap";
// // import { useTableSort } from "@/components/hooks/useTableSort";
// // import { useTableControls } from "@/components/hooks/useTableControls";
// // import { TableControls } from "@/components/common/TableControls";

// // export default function ItemConsumptionEfficiencyTable({ tableData = [] }) {
// //   // 🔹 Columns
// //   const columns = [
// //     { key: "name", label: "ITEM DETAILS" },
// //     { key: "department", label: "DEPARTMENT" },
// //     { key: "consumed", label: "CONSUMED" },
// //     { key: "sales", label: "SALES QUANTITY" },
// //     { key: "difference", label: "DIFFERENCE" },
// //     { key: "waste", label: "WASTE %" },
// //     { key: "costImpact", label: "COST IMPACT" },
// //     { key: "status", label: "STATUS" },
// //   ];

// //   // 🔹 Filters
// //   const filtersConfig = {
// //     name: ["All", ...Array.from(new Set(tableData.map((t) => t.name)))],
// //   };

// //   // 🔹 Table Controls (filter & search first)
// //   const {
// //     searchTerm,
// //     setSearchTerm,
// //     filters,
// //     setFilters,
// //     filteredData,
// //     handleExport,
// //   } = useTableControls({
// //     data: tableData,
// //     columns,
// //     searchFields: ["name", "department"],
// //     filtersConfig,
// //   });

// //   // 🔹 Now sort AFTER filtering (ensures sort always applies on visible data)
// //   const { sortedData, sortKey, direction, handleSort } =
// //     useTableSort(filteredData);

// //   const renderSortArrow = (key) =>
// //     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

// //   return (
// //     <Card className="shadow-sm" style={{ borderRadius: "16px" }}>
// //       <Card.Body>
// //         {/* 🔹 Table Controls */}
// //         <TableControls
// //           searchTerm={searchTerm}
// //           setSearchTerm={setSearchTerm}
// //           filters={filters}
// //           setFilters={setFilters}
// //           filtersConfig={filtersConfig}
// //           handleExport={handleExport}
// //           searchable
// //           filterable
// //           exportable
// //         />

// //         {/* 🔹 Scrollable Table with Sticky Header */}
// //         <div
// //           style={{
// //             maxHeight: "65vh",
// //             overflowY: "auto",
// //             overflowX: "auto",
// //           }}
// //         >
// //           <Table
// //             hover
// //             responsive
// //             className="align-middle mb-0 text-nowrap"
// //             style={{ borderCollapse: "separate", borderSpacing: 0 }}
// //           >
// //             <thead
// //               className="bg-light text-uppercase text-muted"
// //               style={{
// //                 fontSize: "0.8rem",
// //                 position: "sticky",
// //                 top: 0,
// //                 zIndex: 5,
// //               }}
// //             >
// //               <tr>
// //                 {columns.map((col) => (
// //                   <th
// //                     key={col.key}
// //                     onClick={() => handleSort(col.key)}
// //                     style={{
// //                       padding: "12px 16px",
// //                       fontWeight: 600,
// //                       cursor: "pointer",
// //                       minWidth: col.key === "name" ? "250px" : "120px",
// //                       backgroundColor: "#f8f9fa",
// //                     }}
// //                   >
// //                     {col.label}
// //                     {renderSortArrow(col.key)}
// //                   </th>
// //                 ))}
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {sortedData.length > 0 ? (
// //                 sortedData.map((row) => (
// //                   <tr
// //                     key={row.id}
// //                     style={{
// //                       verticalAlign: "middle",
// //                       borderBottom: "1px solid #eee",
// //                     }}
// //                   >
// //                     <td>
// //                       <div className="fw-bold">{row.name}</div>
// //                       <div
// //                         className="text-muted"
// //                         style={{ fontSize: "0.75rem" }}
// //                       >
// //                         {row.consumedUnit} • {row.price}
// //                       </div>
// //                     </td>
// //                     <td>
// //                       <Badge
// //                         bg="light"
// //                         text="primary"
// //                         className="px-3 py-1 rounded-pill border"
// //                       >
// //                         {row.department}
// //                       </Badge>
// //                     </td>
// //                     <td className="fw-bold">
// //                       {row.consumed} {row.consumedUnit}
// //                     </td>
// //                     <td className="text-success fw-bold">
// //                       {row.sales} {row.salesUnit} sold
// //                     </td>
// //                     <td className="text-danger fw-bold">
// //                       +{row.difference} {row.differenceUnit} excess
// //                     </td>
// //                     <td>
// //                       <Badge
// //                         bg={
// //                           row.waste > 30
// //                             ? "danger"
// //                             : row.waste > 20
// //                             ? "warning"
// //                             : "info"
// //                         }
// //                         className="px-2 py-1"
// //                       >
// //                         {row.waste}%
// //                       </Badge>
// //                     </td>
// //                     <td className="text-danger fw-bold">
// //                       ₹{row.costImpact} loss incurred
// //                     </td>
// //                     <td>
// //                       <Badge
// //                         bg={
// //                           row.status === "red"
// //                             ? "danger"
// //                             : row.status === "orange"
// //                             ? "warning"
// //                             : "success"
// //                         }
// //                         className="px-3 py-1 rounded-pill"
// //                       >
// //                         {row.status === "red"
// //                           ? "Critical"
// //                           : row.status === "orange"
// //                           ? "Monitor"
// //                           : "Healthy"}
// //                       </Badge>
// //                     </td>
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td
// //                     colSpan={columns.length}
// //                     style={{
// //                       textAlign: "center",
// //                       padding: "20px",
// //                       color: "#888",
// //                       fontStyle: "italic",
// //                     }}
// //                   >
// //                     No data available
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </Table>
// //         </div>
// //       </Card.Body>
// //     </Card>
// //   );
// // }
