"use client";
import React from "react";
import { Table } from "react-bootstrap";
import BaseSurface from "./BaseSurface";
import { useTableSort } from "@/components/hooks/useTableSort";
import { useTableControls } from "@/components/hooks/useTableControls";
import { TableControls } from "@/components/common/TableControls";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { useRouter } from "next/navigation";
import { handleNavigation } from "@/utils";

export default function ProductDetailsTable({ rowsData, styles }) {
  const { dashboardFilter, startDate, endDate } = useDashboardContext();
  const router = useRouter();

  // ✅ Sorting hook
  const { sortedData, sortKey, direction, handleSort } = useTableSort(rowsData);

  // ✅ Columns
  const columns = [
    { key: "product", label: "Product" },
    { key: "items", label: "#Items" },
    { key: "netSales", label: "Net Sales" },
    { key: "discount", label: "Discount" },
    { key: "tax", label: "Tax" },
    { key: "makingCost", label: "Making Cost" },
    { key: "margin", label: "Margin" },
  ];

  // ✅ Filters config
  const filtersConfig = {
    product: ["All", ...Array.from(new Set(rowsData.map((r) => r.product)))],
  };

  // ✅ Table controls (search + filter + export)
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
    searchFields: ["product", "details"], // searchable fields
    filtersConfig,
  });

  // ✅ Sorting arrow
  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  return (
    <div style={styles?.tableContainer}>
      {/* 🔹 Table Controls */}
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

      {/* 🔹 Table Scroll Container */}
      <div style={styles?.tableScrollContainer}>
        <Table hover responsive className="align-middle mb-0">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={styles?.stickyTh}
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
                  <td>
                    <div
                      className="fw-bold"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleNavigation({
                          router,
                          url: "products",
                          params: { startDate: startDate, endDate: endDate },
                        })
                      }
                    >
                      {row.product}
                    </div>
                    <small className="text-muted">{row.details}</small>
                  </td>
                  <td className="fw-bold">{row.items}</td>
                  <td
                    className="text-success fw-bold"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleNavigation({
                        router,
                        url: "sp/sales_analytics",
                        params: {
                          startDate: startDate,
                          endDate: endDate,
                          products: row?.productId,
                        },
                      })
                    }
                  >
                    {row.netSales}
                  </td>
                  <td className="text-danger fw-bold">{row.discount}</td>
                  <td className="fw-bold">{row.tax}</td>
                  <td className="text-danger fw-bold">{row.makingCost}</td>
                  <td>
                    <div className="text-success fw-bold">{row.margin}</div>
                    <span
                      style={{
                        ...styles?.badge,
                        backgroundColor:
                          parseFloat(row.marginPercent) >= 60
                            ? "#d1fae5"
                            : "#fef3c7",
                        color:
                          parseFloat(row.marginPercent) >= 60
                            ? "#16a34a"
                            : "#d97706",
                      }}
                    >
                      {row.marginPercent}
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
// import React, { useContext } from "react";
// import { Table } from "react-bootstrap";
// import BaseSurface from "./BaseSurface";
// import { useTableSort } from "@/components/hooks/useTableSort";
// import { useTableControls } from "@/components/hooks/useTableControls";
// import { TableControls } from "@/components/common/TableControls";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import { useRouter } from "next/navigation";
// import { handleNavigation } from "@/utils";

// export default function ProductDetailsTable({ rowsData, styles }) {
//   const { dashboardFilter, startDate ,endDate} = useDashboardContext();
//   const router = useRouter()
//   // ✅ Sorting hook
//   const { sortedData, sortKey, direction, handleSort } = useTableSort(rowsData);

//   // ✅ Columns
//   const columns = [
//     { key: "product", label: "Product" },
//     { key: "items", label: "#Items" },
//     { key: "netSales", label: "Net Sales" },
//     { key: "discount", label: "Discount" },
//     { key: "tax", label: "Tax" },
//     { key: "makingCost", label: "Making Cost" },
//     { key: "margin", label: "Margin" },
//   ];

//   // ✅ Filters config
//   const filtersConfig = {
//     product: ["All", ...Array.from(new Set(rowsData.map((r) => r.product)))],
//   };

//   // ✅ Table controls (search + filter + export)
//   const {
//     searchTerm,
//     setSearchTerm,
//     filters,
//     setFilters,
//     filteredData,
//     handleExport,
//   } = useTableControls({
//     data: sortedData,
//     columns,
//     searchFields: ["product", "details"], // searchable fields
//     filtersConfig,
//   });

//   // ✅ Sorting arrow
//   const renderSortArrow = (key) =>
//     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

//   return (
//     <div bodyStyle={styles?.tableContainer}>
//       {/* 🔹 Table Controls */}
//       <TableControls
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//         filters={filters}
//         setFilters={setFilters}
//         filtersConfig={filtersConfig}
//         handleExport={handleExport}
//         searchable={true}
//         filterable={true}
//         exportable={true}
//       />

//       {/* 🔹 Table Scroll Container */}
//       <div style={styles?.tableScrollContainer}>
//         <Table hover responsive className="align-middle mb-0">
//           <thead>
//             <tr>
//               {columns.map((col) => (
//                 <th
//                   key={col.key}
//                   onClick={() => handleSort(col.key)}
//                   style={styles?.stickyTh}
//                 >
//                   {col.label}
//                   {renderSortArrow(col.key)}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.length > 0 ? (
//               filteredData.map((row, idx) => (
//                 <tr key={idx}>
//                   <td>
//                     <div
//                       className="fw-bold"
//                       style={{ cursor: "pointer" }}
//                       onClick={() =>
//                         handleNavigation({
//                           router,
//                           url: "products",
//                           params: {startDate:startDate,endDate:endDate},
//                         })
//                       }
//                     >
//                       {row.product}
//                     </div>
//                     <small className="text-muted">{row.details}</small>
//                   </td>
//                   <td className="fw-bold">{row.items}</td>
//                   <td
//                     className="text-success fw-bold"
//                     style={{ cursor: "pointer" }}
//                     onClick={() =>
//                       handleNavigation({
//                         router,
//                         url: "sp/sales_analytics",
//                         params: { startDate:startDate,endDate:endDate, products :row?.productId},
//                       })
//                     }
//                   >
//                     {row.netSales}
//                   </td>
//                   <td className="text-danger fw-bold">{row.discount}</td>
//                   <td className="fw-bold">{row.tax}</td>
//                   <td className="text-danger fw-bold">{row.makingCost}</td>
//                   <td>
//                     <div className="text-success fw-bold">{row.margin}</div>
//                     <span
//                       style={{
//                         ...styles?.badge,
//                         backgroundColor:
//                           parseFloat(row.marginPercent) >= 60
//                             ? "#d1fae5"
//                             : "#fef3c7",
//                         color:
//                           parseFloat(row.marginPercent) >= 60
//                             ? "#16a34a"
//                             : "#d97706",
//                       }}
//                     >
//                       {row.marginPercent}
//                     </span>
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
//     </div>
//   );
// }
// "use client";
// import React from "react";
// import { Table } from "react-bootstrap";
// import BaseSurface from "./BaseSurface";
// import { useTableSort } from "@/components/hooks/useTableSort";

// export default function ProductDetailsTable({ rowsData, styles }) {
//   // ✅ Sorting hook
//   const { sortedData, sortKey, direction, handleSort } = useTableSort(rowsData);

//   const renderSortArrow = (key) =>
//     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

//   // ✅ Column config
//   const columns = [
//     { key: "product", label: "Product" },
//     { key: "items", label: "#Items" },
//     { key: "netSales", label: "Net Sales" },
//     { key: "discount", label: "Discount" },
//     { key: "tax", label: "Tax" },
//     { key: "makingCost", label: "Making Cost" },
//     { key: "margin", label: "Margin" },
//   ];

//   return (
//     <BaseSurface bodyStyle={styles?.tableContainer}>
//       <div style={styles?.tableScrollContainer}>
//         <Table hover responsive className="align-middle mb-0">
//           <thead>
//             <tr>
//               {columns.map((col) => (
//                 <th
//                   key={col.key}
//                   onClick={() => handleSort(col.key)}
//                   style={styles?.stickyTh}
//                   className="text-primary"
//                 >
//                   {col.label}
//                   {renderSortArrow(col.key)}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {sortedData?.map((row, idx) => (
//               <tr key={idx}>
//                 <td>
//                   <div className="fw-bold">{row.product}</div>
//                   <small className="text-muted">{row.details}</small>
//                 </td>
//                 <td className="fw-bold">{row.items}</td>
//                 <td className="text-success fw-bold">{row.netSales}</td>
//                 <td className="text-danger fw-bold">{row.discount}</td>
//                 <td className="text-info fw-bold">{row.tax}</td>
//                 <td className="text-danger fw-bold">{row.makingCost}</td>
//                 <td>
//                   <div className="text-success fw-bold">{row.margin}</div>
//                   <span
//                     style={{
//                       ...styles?.badge,
//                       backgroundColor:
//                         parseFloat(row.marginPercent) >= 60
//                           ? "#d1fae5"
//                           : "#fef3c7",
//                       color:
//                         parseFloat(row.marginPercent) >= 60
//                           ? "#16a34a"
//                           : "#d97706",
//                     }}
//                   >
//                     {row.marginPercent}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </BaseSurface>
//   );
// }
