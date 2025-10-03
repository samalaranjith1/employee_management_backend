"use client";
import React from "react";
import { Table, Badge } from "react-bootstrap";
import { useTableSort } from "@/components/hooks/useTableSort";
import { useTableControls } from "@/components/hooks/useTableControls";
import { TableControls } from "@/components/common/TableControls";
import { handleNavigation } from "@/utils";
import { useRouter } from "next/navigation";

export default function PeriodDataBreakDownTable({ data = {}, filters = {} }) {
  const router = useRouter();

  // ✅ Sorting
  const { sortedData, sortKey, direction, handleSort } = useTableSort(
    data.table || []
  );

  // ✅ Columns
  const columns = [
    { key: "date", label: "Date" },
    { key: "sales", label: "Sales" },
    { key: "consumption", label: "Consumption" },
    { key: "waste", label: "Waste" },
    { key: "ratio", label: "Cost Ratio" },
  ];

  // ✅ Filters (by day if exists)
  const filtersConfig = {
    day: ["All", ...Array.from(new Set((data.table || []).map((t) => t.day)))],
  };

  // ✅ Table controls (search + filters + export)
  const {
    searchTerm,
    setSearchTerm,
    filters: tableFilters,
    setFilters,
    filteredData,
    handleExport,
  } = useTableControls({
    data: sortedData,
    columns,
    searchFields: ["day"], // searchable fields
    filtersConfig,
  });

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  return (
    <div>
      {/* 🔹 Controls */}
      <TableControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={tableFilters}
        setFilters={setFilters}
        filtersConfig={filtersConfig}
        handleExport={handleExport}
        searchable={true}
        filterable={true}
        // exportable={true}
      />

      {/* 🔹 Table with sticky header & max-height */}
      <div
        style={{
          maxHeight: "65vh",
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
        `}</style>

        <Table
          hover
          className="align-middle mb-0 text-nowrap"
          style={{ minWidth: "700px" }}
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
                    minWidth: col.key === "date" ? "150px" : "120px",
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
            {filteredData.length > 0 ? (
              filteredData.map((row, idx) => {
                const today = new Date();
                const rowDate = new Date(row.rawDate || row.date);
                const isToday =
                  rowDate.getDate() === today.getDate() &&
                  rowDate.getMonth() === today.getMonth() &&
                  rowDate.getFullYear() === today.getFullYear();

                const formattedDate = rowDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
                const formattedDay = rowDate.toLocaleDateString("en-US", {
                  weekday: "short",
                });

                return (
                  <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "14px 16px" }}>
                      <div className="fw-semibold" style={{ fontSize: 14 }}>
                        {formattedDate}{" "}
                        {isToday && (
                          <span className="text-muted" style={{ fontSize: 12 }}>
                            (Today)
                          </span>
                        )}
                      </div>
                      <div
                        className="text-muted"
                        style={{ fontSize: 12, marginTop: 2 }}
                      >
                        {formattedDay}
                      </div>
                    </td>

                    <td
                      style={{ fontSize: 13, cursor: "pointer" }}
                      onClick={() =>
                        handleNavigation({
                          router,
                          url: "sp/sales_analytics",
                          params: filters,
                        })
                      }
                    >
                      {row.sales?.toLocaleString()}
                    </td>

                    <td
                      style={{ fontSize: 13, cursor: "pointer" }}
                      onClick={() =>
                        handleNavigation({
                          router,
                          url: "sp/consumption_analytics",
                          params: filters,
                        })
                      }
                    >
                      {row.consumption?.toLocaleString()}
                    </td>

                    <td
                      style={{ fontSize: 13, cursor: "pointer" }}
                      onClick={() =>
                        handleNavigation({
                          router,
                          url: "sp/wastage_analytics",
                          params: filters,
                        })
                      }
                    >
                      {row.waste?.toLocaleString()}
                    </td>

                    <td>
                      <Badge
                        bg=""
                        style={{
                          backgroundColor: row.costColor || "#f97316",
                          fontSize: 12,
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontWeight: 500,
                          color: "#fff",
                        }}
                      >
                        {parseFloat(row.ratio).toFixed(1)}%
                      </Badge>
                    </td>
                  </tr>
                );
              })
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
// import BaseSurface from "./BaseSurface";
// import { useTableSort } from "@/components/hooks/useTableSort";
// import { handleNavigation } from "@/utils";
// import { useRouter } from "next/navigation";

// function PeriodDataBreakDownTable({ data, filters }) {
//   const router = useRouter();

//   // ✅ use sorting hook
//   const { sortedData, sortKey, direction, handleSort } = useTableSort(
//     data.table || []
//   );

//   const renderSortArrow = (key) =>
//     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

//   // ✅ Define columns
//   const columns = [
//     { key: "date", label: "DATE" },
//     { key: "sales", label: "SALES" },
//     { key: "consumption", label: "CONSUMPTION" },
//     { key: "waste", label: "WASTE" },
//     { key: "ratio", label: "COST RATIO" },
//   ];

//   return (
//     <BaseSurface>
//       <Table bordered hover className="m-0">
//         <thead
//           style={{ position: "sticky", top: 0, background: "#fff", zIndex: 1 }}
//         >
//           <tr>
//             {columns.map((col) => (
//               <th
//                 key={col.key}
//                 className="fw-bold"
//                 style={{
//                   cursor: "pointer",
//                   backgroundColor: "rgb(250,250,150",
//                 }}
//                 onClick={() => handleSort(col.key)}
//               >
//                 {col.label}
//                 {renderSortArrow(col.key)}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {sortedData.map((row, idx) => (
//             <tr key={idx}>
//               <td>
//                 {row.date}
//                 {row.day && (
//                   <>
//                     <br />
//                     <small>{row.day}</small>
//                   </>
//                 )}
//               </td>
//               <td
//                 onClick={() =>
//                   handleNavigation({
//                     router,
//                     url: "sp/sales_analytics",
//                     params: filters,
//                   })
//                 }
//                 style={{ cursor: "pointer" }}
//               >
//                 {row.sales}
//               </td>
//               <td
//                 onClick={() =>
//                   handleNavigation({
//                     router,
//                     url: "sp/consumption_analytics",
//                     params: filters,
//                   })
//                 }
//                 style={{ cursor: "pointer" }}
//               >
//                 {row.consumption}
//               </td>
//               <td
//                 onClick={() =>
//                   handleNavigation({
//                     router,
//                     url: "sp/wastage_analytics",
//                     params: filters,
//                   })
//                 }
//                 style={{ cursor: "pointer" }}
//               >
//                 {row.waste}
//               </td>
//               <td>
//                 <Badge bg="warning" text="dark">
//                   {row.ratio}
//                 </Badge>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </BaseSurface>
//   );
// }

// export default PeriodDataBreakDownTable;
