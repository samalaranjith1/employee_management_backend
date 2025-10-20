"use client";
import React from "react";
import { Table } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";
import BaseSurface from "./BaseSurface";
import { useTableSort } from "@/components/hooks/useTableSort";
import { useTableControls } from "@/components/hooks/useTableControls";
import { TableControls } from "@/components/common/TableControls";
import '@/app/globals.css'
export default function ItemConsumptionDistributionTable({ data }) {
  const { sortedData, sortKey, direction, handleSort } = useTableSort(data);

  const columns = [
    { key: "percentile", label: "Percentile Bucket" },
    { key: "items", label: "Items" },
    { key: "value", label: "Consumption Value" },
    { key: "percentValue", label: "% of Total" },
    { key: "classification", label: "Classification" },
  ];

  // 🔹 Filters (by classification)
  const filtersConfig = {
    classification: [
      "All",
      ...Array.from(new Set(data.map((d) => d.classification))),
    ],
  };

  // 🔹 Table controls
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
    searchFields: ["classification", "percentile"],
    filtersConfig,
  });

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  const getBadgeVariant = (classification) => {
    if (classification === "High Consumption")
      return { bg: "#FFEAEA", color: "#dc2620" };
    if (classification === "Medium Consumption")
      return { bg: "#fff5e7", color: "#d58e23" };
    if (classification === "Low Consumption")
      return { bg: "#f1fff1", color: "#288128" };
    return { bg: "#EEE", color: "#000" };
  };

  return (
    <div style={{ borderRadius: "12px", maxHeight:"65vh" }}>
      {/* 🔹 Controls (Search + Filter + Export) */}
      <TableControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        filtersConfig={filtersConfig}
        handleExport={handleExport}
        searchable={true}
        filterable={true}
        exportable={false}
      />

      <div style={{ overflowX: "auto", maxHeight: "60vh", overflowY: "auto" }}>
        <Table
          borderless
          className="align-middle mb-0"
          style={{ minWidth: "700px" }}
        >
          <thead
            className="table-light"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 5,
              backgroundColor: "#464f60",
            }}
          >
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{ cursor: "pointer",color:"#464f60",backgroundColor:'#f4f7fc' }}
                >
                  {col.label}
                  {renderSortArrow(col.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, idx) => (
                <tr key={idx}>
                  {columns.map((col) => {
                    switch (col.key) {
                      case "percentile": {
                        const badge = getBadgeVariant(row.classification);
                        return (
                          <td key={col.key} className="fw-bold" style={{ color: badge.color }}>
                            {row.percentile}
                          </td>
                        );
                      }

                      case "items":
                        return (
                          <td key={col.key}>
                            <div className="fw-bold">{row.items}</div>
                            <small style={{
                              color:'#464f60',
                              fontSize:'14px',
                              fontWeight:'700'
                            }}>
                              {row.percentItems} <small className="text-muted">of items</small>
                            </small>
                          </td>
                        );

                      case "value":
                        return (
                          <td key={col.key} className="text-success fw-bold" style={{
                            color:'#288128',
                            fontWeight:'700',
                            fontSize:'14px'
                          }}>
                            <div>₹{row.value.toLocaleString()}</div>
                            <small className="text-success fw-bold">
                              consumption
                            </small>
                          </td>
                        );

                      case "percentValue":
                        return (
                          <td key={col.key} className="fw-bold">
                            <div style={{
                              color:'#464f60',
                              fontSize:'14px',
                              fontWeight:'700'
                            }}>{row.percentValue}</div>
                            <small className="text-muted fw-bold">
                              of total value
                            </small>
                          </td>
                        );

                      case "classification": {
                        const badge = getBadgeVariant(row.classification);
                        return (
                          <td key={col.key}>
                            <span
                              style={{
                                display: "inline-block",
                                backgroundColor: badge.bg,
                                color: badge.color,
                                fontWeight: 500,
                                padding: "6px 12px",
                                borderRadius: "8px",
                                fontSize: "0.85rem",
                              }}
                            >
                              {row.classification}
                            </span>
                          </td>
                        );
                      }

                      default:
                        return <td key={col.key}>{row[col.key]}</td>;
                    }
                  })}
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
// import { Table, Badge } from "react-bootstrap";
// import { FaCircle, FaArrowUp } from "react-icons/fa";
// import BaseSurface from "./BaseSurface";
// import { useTableSort } from "@/components/hooks/useTableSort";

// export default function ItemConsumptionDistributionTable({ data }) {
//   const { sortedData, sortKey, direction, handleSort } = useTableSort(data);

//   const getBadgeVariant = (classification) => {
//     if (classification === "High Consumption")
//       return { bg: "#FFEAEA", color: "#E53935" };
//     if (classification === "Medium Consumption")
//       return { bg: "#FFF8E1", color: "#FBC02D" };
//     if (classification === "Low Consumption")
//       return { bg: "#E8F8F0", color: "#43A047" };
//     return { bg: "#EEE", color: "#000" };
//   };

//   const renderSortArrow = (key) =>
//     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

//   const columns = [
//     { key: "percentile", label: "Percentile Bucket" },
//     { key: "items", label: "Items" },
//     { key: "value", label: "Consumption Value" },
//     { key: "percentValue", label: "% of Total" },
//     { key: "classification", label: "Classification" },
//   ];

//   return (
//     <BaseSurface maxHeight="65vh" containerStyle={{ borderRadius: "12px" }}>
//       <div style={{ overflowX: "auto", maxHeight: "60vh", overflowY: "auto" }}>
//         <Table
//           borderless
//           className="align-middle mb-0"
//           style={{ minWidth: "700px" }}
//         >
//           <thead
//             className="table-light"
//             style={{
//               position: "sticky",
//               top: 0,
//               zIndex: 5,
//               backgroundColor: "#F9FAFB",
//             }}
//           >
//             <tr>
//               {columns.map((col) => (
//                 <th
//                   key={col.key}
//                   onClick={() => handleSort(col.key)}
//                   style={{ cursor: "pointer" }}
//                 >
//                   {col.label}
//                   {renderSortArrow(col.key)}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {sortedData.map((row, idx) => (
//               <tr key={idx}>
//                 {columns.map((col) => {
//                   switch (col.key) {
//                     case "percentile":
//                       const bgColor = getBadgeVariant(row.classification);
//                       return (
//                         <td key={col.key} className="fw-medium" 
//                             style={{ color: bgColor.color }}
//                         >
//                           {row.percentile}
//                         </td>
//                       );
//                     case "items":
//                       return (
//                         <td key={col.key}>
//                           <div className="fw-bold">{row.items}</div>
//                           <small className="text-muted">
//                             {row.percentItems} of items
//                           </small>
//                         </td>
//                       );
//                     case "value":
//                       return (
//                         <td key={col.key} className="text-success fw-bold">
//                           <div>₹{row.value.toLocaleString()}</div>
//                           <small className="text-success fw-normal">
//                             <FaArrowUp size={10} className="me-1" />
//                             consumption
//                           </small>
//                         </td>
//                       );
//                     case "percentValue":
//                       return (
//                         <td key={col.key} className="fw-bold">
//                           <div>{row.percentValue}{" "}</div>
//                           <small className="text-muted fw-normal">of total value</small>
//                         </td>
//                       );
//                     case "classification":
//                       const badge = getBadgeVariant(row.classification);
//                       return (
//                         <td key={col.key}>
//                           <span
//                             style={{
//                               display: "inline-block",
//                               backgroundColor: badge.bg, // your dynamic bg
//                               color: badge.color,        // your dynamic text color
//                               fontWeight: 500,
//                               padding: "6px 12px",
//                               borderRadius: "8px",
//                               fontSize: "0.85rem",       // matches bootstrap badge size
//                             }}
//                           >
//                             {row.classification}
//                           </span>

//                         </td>
//                       );
//                     default:
//                       return <td key={col.key}>{row[col.key]}</td>;
//                   }
//                 })}
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </BaseSurface>
//   );
// }