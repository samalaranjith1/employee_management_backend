"use client";
import React from "react";
import { Table, Badge } from "react-bootstrap";
import BaseSurface from "./BaseSurface";
import { useTableSort } from "@/components/hooks/useTableSort";
import { useTableControls } from "@/components/hooks/useTableControls";
import { TableControls } from "@/components/common/TableControls";
import { handleNavigation } from "@/utils";
import { useRouter } from "next/navigation";
import { useDashboardContext } from "@/contexts/DashboardContext";

function ItemConsumptionEffieciencyTable({ tableData }) {
  const { startDate, endDate } = useDashboardContext();
  const { sortedData, sortKey, direction, handleSort } = useTableSort(tableData);
  const router = useRouter();

  const columns = [
    { key: "item", label: "Item Details" },
    { key: "dept", label: "Department" },
    { key: "consumed", label: "Consumed" },
    { key: "sales", label: "Sales Qty" },
    { key: "diff", label: "Difference" },
    { key: "waste", label: "Waste %" },
    { key: "cost", label: "Cost Impact" },
    { key: "status", label: "Status" },
  ];

  // Filters by department
  const filtersConfig = {
    dept: ["All", ...Array.from(new Set(tableData.map((d) => d.dept)))],
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
    searchFields: ["name", "item"],
    filtersConfig,
  });

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  return (
    <div
      title="Detailed Item Consumption Analysis"
      subtitle="Comprehensive consumption vs sales comparison with efficiency metrics"
      maxHeight="65vh"
    >
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

      <div style={{ maxHeight: "60vh", overflowY: "auto", overflowX: "auto" }}>
        <Table
          hover
          className="mb-0 align-middle"
          style={{ minWidth: "800px" }}
        >
          <thead
            className="table-light"
            style={{ position: "sticky", top: 0, zIndex: 5 }}
          >
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{ cursor: "pointer" }}
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
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span
                        style={{ fontWeight: "500", cursor: "pointer" }}
                        onClick={() =>
                          handleNavigation({
                            router,
                            url: "items",
                            params: {
                              startDate: startDate,
                              endDate: endDate,
                              items: row?.itemId,
                            },
                          })
                        }
                      >
                        {row.item}
                      </span>
                      <small style={{ color: "#6c757d" }}>
                        {row.dept} • {row.unitQuantity}
                        {row.unit} • ₹{row.unitPrice}
                      </small>
                    </div>
                  </td>

                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleNavigation({
                        router,
                        url: "departments",
                        params: {
                          startDate: startDate,
                          endDate: endDate,
                          departments: row?.departmentId,
                        },
                      })
                    }
                  >
                    <Badge bg="white" text="primary">
                      {row.dept || row.department?.name || "-"}
                    </Badge>
                  </td>

                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleNavigation({
                        router,
                        url: "sp/consumption_analytics",
                        params: {
                          startDate,
                          endDate,
                          departments: row?.departmentId,
                        },
                      })
                    }
                  >
                    {row.consumed}
                  </td>

                  <td
                    style={{
                      cursor: "pointer",
                      color: "green",
                      fontWeight: "bold",
                    }}
                    onClick={() =>
                      handleNavigation({
                        router,
                        url: "items",
                        params: {
                          startDate,
                          endDate,
                          departments: row?.departmentId,
                        },
                      })
                    }
                  >
                    {row.sales}
                  </td>

                  <td
                    style={{
                      color: row.diff.startsWith("+") ? "red" : "green",
                      fontWeight: "bold",
                    }}
                  >
                    {row.diff}
                  </td>

                  <td>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 10px",
                        borderRadius: "12px",
                        fontWeight: "500",
                        fontSize: "0.85rem",
                        backgroundColor:
                          row.status === "red"
                            ? "#ff0000"
                            : row.status === "green"
                            ? "#00ff00"
                            : row.status === "orange"
                            ? "#fff7e6"
                            : "#f0f0f0",
                        color: "white",
                      }}
                    >
                      {row.waste}
                    </span>
                  </td>

                  <td style={{ color: "red", fontWeight: "bold" }}>
                    {row.cost}
                  </td>

                  <td>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 10px",
                        borderRadius: "12px",
                        fontWeight: "500",
                        fontSize: "0.85rem",
                        backgroundColor:
                          row.status === "red"
                            ? "#fddede"
                            : row.status === "green"
                            ? "#d1fae5"
                            : row.status === "orange"
                            ? "#fff7e6"
                            : "#f0f0f0",
                        color:
                          row.status === "red"
                            ? "#dc2626"
                            : row.status === "green"
                            ? "#059669"
                            : row.status === "orange"
                            ? "#f97316"
                            : "#333",
                      }}
                    >
                      {row.wasteType}
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

export default ItemConsumptionEffieciencyTable;
// "use client";
// import React from "react";
// import { Table, Badge } from "react-bootstrap";
// import BaseSurface from "./BaseSurface";
// import { useTableSort } from "@/components/hooks/useTableSort";
// import { handleNavigation } from "@/utils";
// import { useRouter } from "next/navigation";
// import { useDashboardContext } from "@/contexts/DashboardContext";

// function ItemConsumptionEffieciencyTable({ tableData, wasteBadge }) {
//   const { startDate, endDate } = useDashboardContext();
//   const { sortedData, sortKey, direction, handleSort } =
//     useTableSort(tableData);
//   const router = useRouter();

//   const renderSortArrow = (key) =>
//     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

//   // ✅ Define columns with key + label mapping
//   const columns = [
//     { key: "itemDetails", label: "Item Details" },
//     { key: "dept", label: "Department" },
//     { key: "consumed", label: "Consumed" },
//     { key: "sales", label: "Sales Qty" },
//     { key: "diff", label: "Difference" },
//     { key: "waste", label: "Waste %" },
//     { key: "cost", label: "Cost Impact" },
//     { key: "status", label: "Status" },
//   ];

//   return (
//     <BaseSurface
//       title="Detailed Item Consumption Analysis"
//       subtitle="Comprehensive consumption vs sales comparison with efficiency metrics"
//       maxHeight="65vh"
//     >
//       <div style={{ maxHeight: "60vh", overflowY: "auto", overflowX: "auto" }}>
//         <Table
//           striped
//           hover
//           className="mb-0 align-middle"
//           style={{ minWidth: "800px" }}
//         >
//           <thead
//             className="table-light"
//             style={{ position: "sticky", top: 0, zIndex: 5 }}
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
//                 {/* Item Details */}
//                 <td>
//                   <div style={{ display: "flex", flexDirection: "column" }}>
//                     <span
//                       style={{ fontWeight: "500", cursor: "pointer" }}
//                       onClick={() =>
//                         handleNavigation({
//                           router,
//                           url: "items",
//                           params: {
//                             startDate: startDate,
//                             endDate: endDate,
//                             items: row?.itemId,
//                             // departments: item?.departmentId,
//                           },
//                         })
//                       }
//                     >
//                       {row.item}
//                     </span>
//                     <small style={{ color: "#6c757d" }}>
//                       {row.dept} • {row.unitQuantity}
//                       {row.unit} • ₹{row.unitPrice}
//                     </small>
//                   </div>
//                 </td>

//                 {/* Department */}
//                 <td
//                   style={{ cursor: "pointer" }}
//                   onClick={() =>
//                     handleNavigation({
//                       router,
//                       url: "departments",
//                       params: {
//                         startDate: startDate,
//                         endDate: endDate,
//                         departments: row?.departmentId,
//                       },
//                     })
//                   }
//                 >
//                   <Badge bg="white" text="primary">
//                     {row.dept || (row.department?.name ?? "-")}
//                   </Badge>
//                 </td>

//                 {/* Consumed */}
//                 <td
//                   style={{ cursor: "pointer" }}
//                   onClick={() =>
//                     handleNavigation({
//                       router,
//                       url: "sp/consumption_analytics",
//                       params: {
//                         startDate: startDate,
//                         endDate: endDate,
//                         departments: row?.departmentId,
//                       },
//                     })
//                   }
//                 >
//                   {row.consumed}
//                 </td>

//                 {/* Sales */}
//                 <td
//                   style={{ cursor: "pointer", color: 'green', fontWeight: 'bold' }}
//                   onClick={() =>
//                     handleNavigation({
//                       router,
//                       url: "items",
//                       params: {
//                         startDate: startDate,
//                         endDate: endDate,
//                         departments: row?.departmentId,
//                       },
//                     })
//                   }
//                 >
//                   {row.sales}
//                 </td>

//                 {/* Difference */}
//                 <td
//                   style={{
//                     color: row.diff.startsWith("+") ? "red" : "green",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {row.diff}
//                 </td>

//                 {/* Waste */}
//                 <td>
//                   <span
//                     style={{
//                       display: "inline-block",
//                       padding: "4px 10px",
//                       borderRadius: "12px",
//                       fontWeight: "500",
//                       fontSize: "0.85rem",
//                       backgroundColor:
//                         row.status === "red"
//                           ? "#ff0000"
//                           : row.status === "green"
//                             ? "#00ff00"
//                             : row.status === "orange"
//                               ? "#fff7e6"
//                               : "#f0f0f0",
//                       color: 'white',
//                     }}
//                   >
//                     {row.waste}
//                   </span>
//                 </td>


//                 {/* Cost */}
//                 <td style={{ color: 'red', fontWeight: 'bold' }}>{row.cost}</td>

//                 {/* Status */}
//                 <td>
//                   <span
//                     style={{
//                       display: "inline-block",
//                       padding: "4px 10px",
//                       borderRadius: "12px",
//                       fontWeight: "500",
//                       fontSize: "0.85rem",
//                       backgroundColor:
//                         row.status === "red"
//                           ? "#fddede"
//                           : row.status === "green"
//                             ? "#d1fae5"
//                             : row.status === "orange"
//                               ? "#fff7e6"
//                               : "#f0f0f0",
//                       color:
//                         row.status === "red"
//                           ? "#dc2626"
//                           : row.status === "green"
//                             ? "#059669"
//                             : row.status === "orange"
//                               ? "#f97316"
//                               : "#333",
//                     }}
//                   >
//                     {row.wasteType}
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

// export default ItemConsumptionEffieciencyTable;
