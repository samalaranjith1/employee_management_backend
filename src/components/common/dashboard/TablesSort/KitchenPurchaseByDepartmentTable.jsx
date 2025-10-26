"use client";
import React from "react";
import { Table } from "react-bootstrap";
import BaseSurface from "./BaseSurface";
import { useTableSort } from "@/components/hooks/useTableSort";
import { useTableControls } from "@/components/hooks/useTableControls";
import { TableControls } from "@/components/common/TableControls";
import { handleNavigation } from "@/utils";
import { useRouter } from "next/navigation";
import { useDashboardContext } from "@/contexts/DashboardContext";
import '@/app/globals.css';

function KitchenPurchaseByDepartmentTable({ data = [], badgeStyle }) {
  const { sortedData, sortKey, direction, handleSort } = useTableSort(data);
  const router = useRouter();
  const { startDate, endDate } = useDashboardContext();

  // 🔹 Column config
  const columns = [
    { key: "name", label: "Department" },
    { key: "consumptionPct", label: "Consumption%" },
    { key: "netConsumptionPct", label: "Net Consumption" },
    { key: "sales", label: "Sales" },
    { key: "opening", label: "Opening" },
    { key: "consumption", label: "Consumption" },
    { key: "closing", label: "Closing" },
    { key: "netConsumption", label: "Net Consumption" },
  ];

  // 🔹 Filters config
  const filtersConfig = {
    name: ["All", ...Array.from(new Set(data.map((d) => d.name)))],
  };

  // 🔹 Table Controls
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
    searchFields: ["name"],
    filtersConfig,
  });

  // 🔹 Sorting arrow
  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  const routes = {
    opening: { url: "sp/consumption_closing_analytics" },
    consumption: { url: "consumption_analytics" },
    closing: { url: "consumption_closing_analytics" },
  };

  const hexToRgba = (hex, alpha = 0.15) =>
    hex && hex.startsWith("#") && hex.length === 7
      ? `rgba(${parseInt(hex.slice(1, 3), 16)}, ${parseInt(
          hex.slice(3, 5),
          16
        )}, ${parseInt(hex.slice(5, 7), 16)}, ${alpha})`
      : hex;

  return (
    <div maxHeight="65vh">
      {/* 🔹 Table Controls */}
        {/* <TableControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          filtersConfig={filtersConfig}
          handleExport={handleExport}
          searchable={true}
          filterable={true}
          exportable={false}
        /> */}

      {/* 🔹 Scrollable Table Container */}
      <div style={{ maxHeight: "60vh", overflowY: "auto", overflowX: "auto" }}>
        <Table
          className="align-middle shadow-sm mb-2"
          style={{ minWidth: "900px" }}
        >
          <thead>
            <tr className="c_table_columns_semi_bold">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{
                    background: "#f5f7fa",
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                    cursor: "pointer",
                  }}
                  className="c_table_columns_semi_bold"
                >
                  {col.label}
                  {renderSortArrow(col.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((dept, idx) => (
                <tr key={idx}>
                  {columns.map((col) => {
                    switch (col.key) {
                      case "name":
                        return (
                          <td key={col.key}>
                            <div className="c_table_cells_regular"
                            style={{
                              cursor:'pointer'
                            }}
                             onClick={() =>
                              handleNavigation({
                                router,
                                url: "departments",
                                params: {
                                  startDate,
                                  endDate,
                                  departments: dept.departmentId,
                                },
                              })
                            }>{dept.name}</div>
                          </td>
                        );
                      case "consumptionPct":
                        return (
                          <td key={col.key}>
                            <span
                              style={{
                                ...badgeStyle,
                                backgroundColor: `${hexToRgba(dept.bg, 0.05)}`,
                                color: `${hexToRgba(dept.bg, 1)}`,
                              }}
                              className="c_table_columns_semi_bold"
                            >
                              {dept[col.key]}%
                            </span>
                          </td>
                        );
                      case "netConsumptionPct":
                        return (
                          <td key={col.key} className="c_table_cells_regular c_black_3">
                            <span>{dept[col.key]}%</span>
                          </td>
                        );
                      case "sales":
                        return (
                          <td
                            key={col.key}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleNavigation({
                                router,
                                url: "sp/sales_analytics",
                                params: {
                                  startDate,
                                  endDate,
                                },
                              })
                            }
                            className="c_table_columns_semi_bold c_black_3"
                          >
                            {dept.sales}
                          </td>
                        );
                      case "netConsumption":
                        return (
                          <td key={col.key} className="c_table_columns_semi_bold c_black_3">
                            {dept.netConsumption}
                          </td>
                        );
                      default:
                        return (
                          <td
                            key={col.key}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleNavigation({
                                router,
                                url: routes[col.key]?.url || "",
                                params: {
                                  startDate,
                                  endDate,
                                },
                              })
                            }
                            className="c_table_columns_semi_bold c_black_3"
                          >
                            {dept[col.key]}
                          </td>
                        );
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

export default KitchenPurchaseByDepartmentTable;
// "use client";
// import React from "react";
// import { Table } from "react-bootstrap";
// import BaseSurface from "./BaseSurface";
// import { useTableSort } from "@/components/hooks/useTableSort";
// import { handleNavigation } from "@/utils";
// import { useRouter } from "next/navigation";
// import { useDashboardContext } from "@/contexts/DashboardContext";

// function KitchenPurchaseByDepartmentTable({ data, badgeStyle }) {
//   const { sortedData, sortKey, direction, handleSort } = useTableSort(data);
//   const router = useRouter();
//   const {
//     dashboardFilter,
//     startDate: startDate,
//     endDate: endDate,
//   } = useDashboardContext();

//   const renderSortArrow = (key) =>
//     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

//   // ✅ Define column config for loop + sorting
//   const columns = [
//     { key: "name", label: "Department" },
//     { key: "consumptionPct", label: "Consumption%" },
//     { key: "netConsumptionPct", label: "Net Consumption" },
//     { key: "sales", label: "Sales" },
//     { key: "opening", label: "Opening" },
//     { key: "consumption", label: "Consumption" },
//     { key: "closing", label: "Closing" },
//     { key: "netConsumption", label: "Net Consumption" },
//     // { key: "budget", label: "Budget" },
//   ];

//   const routes = {
//     opening: { url: "sp/consumption_closing_analytics" },
//     consumption: { url: "consumption_analytics" },
//     closing: { url: "consumption_closing_analytics" },
//   };
//   const hexToRgba = (hex, alpha = 0.15) =>
//   hex && hex.startsWith('#') && hex.length === 7
//     ? `rgba(${parseInt(hex.slice(1, 3), 16)}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(hex.slice(5, 7), 16)}, ${alpha})`
//     : hex;

//   return (
//     <BaseSurface maxHeight="65vh">
//       {/* ✅ Add vertical scroll container */}
//       <div style={{ maxHeight: "60vh", overflowY: "auto", overflowX: "auto" }}>
//         <Table
//           className="align-middle shadow-sm mb-2"
//           style={{ minWidth: "900px" }}
//         >
//           <thead>
//             <tr>
//               {columns.map((col) => (
//                 <th
//                   key={col.key}
//                   onClick={() => handleSort(col.key)}
//                   style={{
//                     background: "#f5f7fa",
//                     position: "sticky",
//                     top: 0,
//                     zIndex: 2,
//                     cursor: "pointer",
//                   }}
//                 >
//                   {col.label}
//                   {renderSortArrow(col.key)}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {sortedData.map((dept, idx) => (
//               <tr key={idx}>
//                 {columns.map((col) => {
//                   switch (col.key) {
//                     case "name":
//                       return (
//                         <td key={col.key}>
//                           <div className="fw-bold">{dept.name}</div>
//                           {/* <small className="text-muted">Department</small> */}
//                         </td>
//                       );
//                     case "consumptionPct":
//                       return (
//                         <td key={col.key}>
//                           <span
//                             style={{
//                               ...badgeStyle,
//                               backgroundColor: `${hexToRgba(dept.bg, 1)}`, // light background
//                               color:"white", // original color for text
//                               fontWeight:"bold"
//                             }}
//                           >
//                             {dept[col.key]}%
//                           </span>
//                         </td>

//                       );
//                     case "netConsumptionPct":
//                       return (
//                         <td key={col.key}>
//                           <span>{dept[col.key]}%</span>
//                         </td>
//                       );
//                     case "sales":
//                       return (
//                         <td
//                           key={col.key}
//                           style={{
//                             cursor: "pointer",
//                           }}
//                           onClick={() =>
//                             handleNavigation({
//                               router,
//                               url: "sp/sales_analytics",
//                               params: {
//                                 startDate: startDate,
//                                 endDate: endDate,
//                               },
//                             })
//                           }
//                         >
//                           {dept.sales}
//                         </td>
//                       );
//                     case "netConsumption":
//                       return (
//                         <td
//                           key={col.key}
//                           className="fw-bold"
//                         >
//                           {dept.netConsumption}
//                         </td>
//                       );
//                     default:
//                       return (
//                         <td
//                           key={col.key}
//                           style={{
//                             cursor: "pointer",
//                           }}
//                           onClick={() =>
//                             handleNavigation({
//                               router,
//                               url: routes[col.key]?.url || "",
//                               params: {
//                                 startDate: startDate,
//                                 endDate: endDate,
//                               },
//                             })
//                           }
//                         >
//                           {dept[col.key]}
//                         </td>
//                       );
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

// export default KitchenPurchaseByDepartmentTable;
