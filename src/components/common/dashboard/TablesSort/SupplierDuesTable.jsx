"use client";
import React from "react";
import { Table, Badge } from "react-bootstrap";
import BaseSurface from "./BaseSurface";
import { useTableSort } from "@/components/hooks/useTableSort";
import { useTableControls } from "@/components/hooks/useTableControls";
import { TableControls } from "@/components/common/TableControls";
import { handleNavigation } from "@/utils";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { useRouter } from "next/navigation";
import "@/app/globals.css";

function SupplierDuesTable({ styles, data = [] }) {
  const { dashboardFilter, startDate, endDate } = useDashboardContext();
  const router = useRouter();

  // ✅ Sorting hook
  const { sortedData, sortKey, direction, handleSort } = useTableSort(data);

  // ✅ Columns config
  const columns = [
    { key: "supplier", label: "Supplier" },
    { key: "total", label: "Total Due" },
    { key: "totalPurchase", label: "Total Purchases" },
    { key: "totalPayments", label: "Total Payments" },
    { key: "items", label: "Items" },
  ];

  // ✅ Filters config
  const filtersConfig = {
    supplier: ["All", ...Array.from(new Set(data.map((r) => r.supplier)))],
  };

  // ✅ Table controls
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
    searchFields: ["supplier", "location"],
    filtersConfig,
  });

  // ✅ Render sort arrow
  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  return (
    <BaseSurface>
      {/* Controls */}
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

      {/* ✅ Scroll wrapper for horizontal + vertical scroll */}
      <div
        style={{
          width: "100%",
          overflowX: "auto",
          overflowY: "auto",
          maxHeight: "65vh", // vertical scroll within height
          WebkitOverflowScrolling: "touch",
          position: "relative",
        }}
      >
        <Table
          hover
          className="mb-0"
          style={{
            borderCollapse: "separate",
            borderSpacing: 0,
            minWidth: "700px", // ensures scroll activates on smaller screens
          }}
        >
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    ...styles.tableHeader,
                    position: "sticky",
                    top: 0,
                    background: "#f4f7fc",
                    zIndex: 5,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    boxShadow: "0 2px 3px rgba(0, 0, 0, 0.05)",
                  }}
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                  {renderSortArrow(col.key)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, idx) => (
              <tr key={idx}>
                <td>
                  <div
                    style={styles.supplierName}
                    onClick={() =>
                      handleNavigation({
                        router,
                        url: "suppliers",
                        params: {
                          startDate: startDate,
                          endDate: endDate,
                          suppliers: row?.supplierId,
                        },
                      })
                    }
                  >
                    {row.supplier}
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <div style={styles.badge}>{row.category}</div>
                    <span style={styles.locationText}>{row.location}</span>
                  </div>
                </td>

                <td style={styles.redAmount}>
                  ₹{row.total.toLocaleString()}
                </td>

                <td style={styles.blackAmount}>
                  ₹{row.totalPurchase.toLocaleString()}
                </td>

                <td
                  style={{
                    color: "#464f60",
                    fontWeight: "700",
                    fontSize: "14px",
                  }}
                >
                  {row.totalPayments
                    ? `₹${row.totalPayments.toLocaleString()}`
                    : "—"}
                </td>

                <td
                  style={{
                    color: "#464f60",
                    fontWeight: "700",
                    fontSize: "14px",
                  }}
                >
                  {row.items}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </BaseSurface>
  );
}

export default SupplierDuesTable;
// "use client";
// import React from "react";
// import { Table, Badge } from "react-bootstrap";
// import BaseSurface from "./BaseSurface";
// import { useTableSort } from "@/components/hooks/useTableSort";
// import { useTableControls } from "@/components/hooks/useTableControls";
// import { TableControls } from "@/components/common/TableControls";
// import { handleNavigation } from "@/utils";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import { useRouter } from "next/navigation";
// import '@/app/globals.css'

// function SupplierDuesTable({ styles, data = [] }) {
//   const { dashboardFilter, startDate, endDate } = useDashboardContext();
//   const router = useRouter();

//   // ✅ Sorting hook
//   const { sortedData, sortKey, direction, handleSort } = useTableSort(data);

//   // ✅ Columns config
//   const columns = [
//     { key: "supplier", label: "Supplier" },
//     { key: "total", label: "Total Due" },
//     { key: "totalPurchase", label: "Total Purchases" },
//     { key: "totalPayments", label: "Total Payments" },
//     { key: "items", label: "Items" },
//   ];

//   // ✅ Filters config (for example, filter by supplier name)
//   const filtersConfig = {
//     supplier: ["All", ...Array.from(new Set(data.map((r) => r.supplier)))],
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
//     searchFields: ["supplier", "location"], // fields you want to allow search on
//     filtersConfig,
//   });

//   // ✅ Render sort arrow
//   const renderSortArrow = (key) =>
//     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

//   return (
//     <BaseSurface>
//       {/* Controls */}
//         <TableControls
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           filters={filters}
//           setFilters={setFilters}
//           filtersConfig={filtersConfig}
//           handleExport={handleExport}
//           searchable={true}
//           filterable={true}
//           exportable={false}
//         />

//       <Table
//         hover
//         className="mb-0"
//         style={{ borderCollapse: "separate", borderSpacing: 0 }}
//       >
//         <thead>
//           <tr>
//             {columns.map((col) => (
//               <th
//                 key={col.key}
//                 style={{
//                   ...styles.tableHeader,
//                   position: "sticky",
//                   top: 0,
//                   background: "#f4f7fc",
//                   zIndex: 2,
//                   cursor: "pointer",
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
//           {filteredData.map((row, idx) => (
//             <tr key={idx}>
//               <td>
//                 <div
//                   style={styles.supplierName}
//                   onClick={() =>
//                     handleNavigation({
//                       router,
//                       url: "suppliers",
//                       params: {
//                         startDate: startDate,
//                         endDate: endDate,
//                         suppliers: row?.supplierId,
//                       },
//                     })
//                   }
//                 >
//                   {row.supplier}
//                 </div>
//                 <div className="d-flex align-items-center gap-1">
//                   <div style={styles.badge}>{row.category}</div>
//                   <span style={styles.locationText}>{row.location}</span>
//                 </div>
//               </td>
//               <td style={styles.redAmount}>
//                 ₹{row.total.toLocaleString()}
//               </td>
//               <td style={styles.blackAmount}>
//                 ₹{row.totalPurchase.toLocaleString()}
//               </td>
//               <td style={{
//                 color:'#464f60',
//                 fontWeight:"700",
//                 fontSize:'14px'
//               }}>
//                 {row.totalPayments
//                   ? `₹${row.totalPayments.toLocaleString()}`
//                   : "—"}
//               </td>
//               <td style={{
//                 color:'#464f60',
//                 fontWeight:"700",
//                 fontSize:'14px'
//               }}>{row.items}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </BaseSurface>
//   );
// }

// export default SupplierDuesTable;
// "use client";
// import React from "react";
// import { Table, Badge } from "react-bootstrap";
// import BaseSurface from "./BaseSurface";
// import { useTableSort } from "@/components/hooks/useTableSort";
// import { handleNavigation } from "@/utils";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import { useRouter } from "next/navigation";

// function SupplierDuesTable({ styles, data }) {
//   const {
//     dashboardFilter,
//     startDate: startDate,
//     endDate: endDate,
//   } = useDashboardContext();
//   const router = useRouter()
//   // ✅ Sorting hook
//   const sort = useTableSort(data || []);

//   // ✅ Render sort arrow
//   const renderSortArrow = (key) =>
//     sort.sortKey === key ? (sort.direction === "asc" ? " ↑" : " ↓") : "";

//   // ✅ Define columns
//   const columns = [
//     { key: "supplier", label: "Supplier" },
//     { key: "total", label: "Total Due" },
//     { key: "totalPurchase", label: "Total Purchases" },
//     { key: "totalPayments", label: "Total Payments" },
//     { key: "items", label: "Items" },
//   ];

//   return (
//     <BaseSurface>
//       <Table
//         hover
//         className="mb-0"
//         style={{ borderCollapse: "separate", borderSpacing: 0 }}
//       >
//         <thead>
//           <tr>
//             {columns.map((col) => (
//               <th
//                 key={col.key}
//                 style={{
//                   ...styles.tableHeader,
//                   position: "sticky",
//                   top: 0,
//                   background: "#fff",
//                   zIndex: 2,
//                   cursor: "pointer",
//                 }}
//                 onClick={() => sort.handleSort(col.key)}
//               >
//                 {col.label}
//                 {renderSortArrow(col.key)}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {sort.sortedData.map((row, idx) => (
//             <tr key={idx}>
//               <td>
//                 <div
//                   style={styles.supplierName}
//                   onClick={() =>
//                     handleNavigation({
//                       router,
//                       url: "suppliers",
//                       params: {
//                         startDate: startDate,
//                         endDate: endDate,
//                         suppliers: row?.supplierId,
//                       },
//                     })
//                   }
//                 >
//                   {row.supplier}
//                 </div>
//                 <div className="d-flex align-items-center gap-1">
//                   <Badge style={styles.badge}>{row.category}</Badge>
//                   <span style={styles.locationText}>{row.location}</span>
//                 </div>
//               </td>
//               <td style={styles.redAmount}>₹{row.total.toLocaleString()}</td>

//               <td style={styles.redAmount}>
//                 ₹{row.totalPurchase.toLocaleString()}
//               </td>
//               <td>
//                 {row.totalPayments ? `₹${row.totalPayments.toLocaleString()}` : "—"}
//               </td>
//               <td>{row.items}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </BaseSurface>
//   );
// }

// export default SupplierDuesTable;
