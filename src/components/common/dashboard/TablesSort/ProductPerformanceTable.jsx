"use client";
import React from "react";
import { Table } from "react-bootstrap";
import BaseSurface from "./BaseSurface";
import { useTableSort } from "@/components/hooks/useTableSort";
import { useTableControls } from "@/components/hooks/useTableControls";
import { TableControls } from "@/components/common/TableControls";

export default function ProductPerformanceTable({ data }) {
  const classificationColors = {
    "Top Performers": { bg: "#d4f6e7", color: "#2a9d8f" },
    "Moderate Performers": { bg: "#fff3d4", color: "#f4a261" },
    "Low Performers": { bg: "#f9e5e5ff", color: "#e13307ff" },
  };

  const barColors = {
    green: "#27ae60",
    orange: "#f4a261",
    red: "#e76f51",
  };

  // 🔹 Sorting hook
  const { sortedData, sortKey, direction, handleSort } = useTableSort(data);

  // 🔹 Columns
  const columns = [
    { key: "percentile", label: "Percentile" },
    { key: "products", label: "Products" },
    { key: "sales", label: "Sales" },
    { key: "salesPercent", label: "Sales %" },
    { key: "margin", label: "Margin" },
    { key: "marginPercent", label: "Margin %" },
    { key: "classification", label: "Classification" },
  ];

  // 🔹 Filters config
  const filtersConfig = {
    classification: [
      "All",
      ...Array.from(new Set(data.map((d) => d.classification))),
    ],
  };

  // 🔹 Table controls (search, filters, export)
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
    searchFields: ["products", "classification", "percentile"], // searchable fields
    filtersConfig,
  });

  // 🔹 Sorting arrow
  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  return (
    <BaseSurface
      containerStyle={{
        borderRadius: 12,
        boxShadow: "0 0 10px rgb(0 0 0 / 0.05)",
      }}
      bodyStyle={{ padding: 0 }}
    >
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

      <div style={{ maxHeight: "65vh", overflowY: "auto", overflowX: "auto" }}>
        <Table
          hover
          className="mb-0"
          style={{ minWidth: 900 }}
        >
          <thead
            style={{
              backgroundColor: "#f4f7fc",
              position: "sticky",
              top: 0,
              zIndex: 2,
            }}
          >
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{
                    cursor: "pointer", fontWeight: 600,
                    backgroundColor: "#f4f7fc",
                    color: '#464f60',
                    fontSize: '14px'
                  }}
                >
                  {col.label}
                  {renderSortArrow(col.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map(
                (
                  {
                    percentile,
                    products,
                    sales,
                    salesPercent,
                    margin,
                    marginPercent,
                    classification,
                    barColor,
                  },
                  idx
                ) => {
                  const classColor = classificationColors[classification] || {
                    bg: "#eee",
                    color: "#444",
                  };
                  return (
                    <tr
                      key={idx}
                      style={{
                        backgroundColor: idx % 2 === 0 ? "#fff8f0" : "white",
                      }}
                    >
                      <td
                        className="d-flex align-items-center gap-2"
                        style={{ fontWeight: 600 }}
                      >
                        <div
                          style={{
                            width: 8,
                            height: 28,
                            fontSize:'14px',
                            fontWeight:700,
                            color:'#171c26',
                            backgroundColor:
                              barColors[barColor] || "#288128",
                            borderRadius: 5,
                          }}
                        />
                        {percentile}
                      </td>
                      <td style={{ fontWeight: "700",fontSize:'14px',color:'#464f60' }}>{products}</td>
                      <td style={{ fontWeight: "700",fontSize:'14px',color:'#464f60' }}>{sales}</td>
                      <td style={{ fontWeight: "700",fontSize:'14px',color:'#464f60' }}>{salesPercent}</td>
                      <td style={{ fontWeight: "700",fontSize:'14px',color:'#464f60' }}>{margin}</td>
                      <td style={{ fontWeight: "700",fontSize:'14px',color:'#464f60' }}>{marginPercent}</td>
                      <td>
                        <span
                          style={{
                            backgroundColor: classColor.bg,
                            color: classColor.color,
                            fontWeight: 700,
                            fontSize:"14px",
                            padding: "4px 10px",
                            borderRadius: "10px",
                            display: "inline-block",
                          }}
                        >
                          {classification}
                        </span>
                      </td>
                    </tr>
                  );
                }
              )
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
// import { Table, Badge } from "react-bootstrap";
// import BaseSurface from "./BaseSurface";
// import { useTableSort } from "@/components/hooks/useTableSort";

// export default function ProductPerformanceTable({ data }) {
//   const classificationColors = {
//     "Top Performers": { bg: "#d4f6e7", color: "#2a9d8f" },
//     "Moderate Performers": { bg: "#fff3d4", color: "#f4a261" },
//     "Low Performers": { bg: "#f9e5e5ff", color: "#e13307ff" },
//   };

//   const barColors = {
//     green: "#27ae60",
//     orange: "#f4a261",
//     red: "#e76f51",
//   };

//   // Sorting hook
//   const { sortedData, sortKey, direction, handleSort } = useTableSort(data);

//   const renderSortArrow = (key) =>
//     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

//   const columns = [
//     { key: "percentile", label: "Percentile" },
//     { key: "products", label: "Products" },
//     { key: "sales", label: "Sales" },
//     { key: "salesPercent", label: "Sales %" },
//     { key: "margin", label: "Margin" },
//     { key: "marginPercent", label: "Margin %" },
//     { key: "classification", label: "Classification" },
//   ];

//   return (
//     <BaseSurface
//       containerStyle={{
//         borderRadius: 12,
//         boxShadow: "0 0 10px rgb(0 0 0 / 0.05)",
//       }}
//       bodyStyle={{ padding: 0 }}
//     >
//       <div style={{ maxHeight: "65vh", overflowY: "auto", overflowX: "auto" }}>
//         <Table
//           hover
//           className="mb-0"
//           style={{ minWidth: 900, backgroundColor: "#fff7f0" }}
//         >
//           <thead
//             style={{
//               backgroundColor: "#fff2e8",
//               position: "sticky",
//               top: 0,
//               zIndex: 2,
//             }}
//           >
//             <tr>
//               {columns.map((col) => (
//                 <th
//                   key={col.key}
//                   onClick={() => handleSort(col.key)}
//                   style={{ cursor: "pointer", fontWeight: 600 }}
//                 >
//                   {col.label}
//                   {renderSortArrow(col.key)}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {sortedData.map(
//               (
//                 {
//                   percentile,
//                   products,
//                   sales,
//                   salesPercent,
//                   margin,
//                   marginPercent,
//                   classification,
//                   barColor,
//                 },
//                 idx
//               ) => {
//                 const classColor = classificationColors[classification] || {
//                   bg: "#eee",
//                   color: "#444",
//                 };
//                 return (
//                   <tr
//                     key={idx}
//                     style={{
//                       backgroundColor: idx % 2 === 0 ? "#fff8f0" : "white",
//                     }}
//                   >
//                     <td
//                       className="d-flex align-items-center gap-2"
//                       style={{ fontWeight: 600 }}
//                     >
//                       <div
//                         style={{
//                           width: 8,
//                           height: 28,
//                           backgroundColor: barColors[barColor] || "#27ae60",
//                           borderRadius: 4,
//                         }}
//                       />
//                       {percentile}
//                     </td>
//                     <td style={{ fontWeight: "bold" }}>{products}</td>
//                     <td>{sales}</td>
//                     <td>{salesPercent}</td>
//                     <td>
//                       {margin}
//                     </td>
//                     <td >
//                       {marginPercent}
//                     </td>
//                     <td>
//                       <span
//                         style={{
//                           backgroundColor: classColor.bg,
//                           color: classColor.color,
//                           fontWeight: 600,
//                           padding: "4px 10px",
//                           borderRadius: "10px",
//                           display: "inline-block",
//                         }}
//                       >
//                         {classification}
//                       </span>

//                     </td>
//                   </tr>
//                 );
//               }
//             )}
//           </tbody>
//         </Table>
//       </div>
//     </BaseSurface>
//   );
// }
