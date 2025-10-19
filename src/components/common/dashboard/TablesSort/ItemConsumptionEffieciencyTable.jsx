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
import "@/app/globals.css";

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
        exportable={false}
      />

      <div style={{ maxHeight: "60vh", overflowY: "auto", overflowX: "auto" }}>
        <Table
          hover
          className="mb-0 align-middle"
          style={{ minWidth: "800px" }}
        >
          <thead
            // className="table-light"
            style={{ position: "sticky", top: 0, zIndex: 5 }}
          >
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{ cursor: "pointer",fontWeight: '600',color:'#464f60',backgroundColor:"#f4f7fc"  }}
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
                        style={{cursor: "pointer" }}
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
                        className="c_table_cells_regular c_gray_2"

                      >
                        {row.item}
                      </span>
                      <small className="c_gray_3 c_table_sub_cells_regular">
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
                    <div bg="#faf8ff" text="primary" style={{
                      backgroundColor:'#faf8ff',
                      border:"1px solid #8b5cf6",
                      color:'#8200da',
                      display:'flex',
                      justifyContent:'center',
                      alignItems:'center',
                      borderRadius:'12px',
                      fontSize:"10px",
                      fontWeight:'500',
                    }}>
                      {row.dept || row.department?.name || "-"}
                    </div>
                  </td>

                  <td
                    style={{ cursor: "pointer" ,
                      fontSize:'14px',
                      fontWeight:'700',
                      color:'#464f60',
                    }}
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
                    <div>{Number(row.consumed.split(' ')[0]).toLocaleString()}</div>
                    <span className="">{row.consumed.split(' ')[1].toLowerCase()}</span>
                  </td>

                  <td
                    style={{
                      cursor: "pointer",
                      color: "#288128",
                      fontWeight: "700",
                      fontSize:'14px',
                    }}
                    onClick={() =>
                      handleNavigation({
                        router,
                        url: "sp/sales_analytics",
                        params: {
                          startDate,
                          endDate,
                          departments: row?.departmentId,
                        },
                      })
                    }
                  >
                    <div>{Number(row.sales.split(' ')[0]).toLocaleString()}</div>
                    <span className="">{row.sales.split(' ')[1].toLowerCase()}</span>
                  </td>

                  <td
                    style={{
                      color: row.diff.startsWith("+") ? "#dc2620" : "green",
                      fontWeight: "bold",
                    }}
                  >
                     <div>{row.diff[0]}{Number(row.diff.split(' ')[0]).toLocaleString()}</div>
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
                            ? "#d33418"
                            : row.status === "green"
                            ? "#e2ffe2"
                            : row.status === "orange"
                            ? "#fe9900"
                            : "#f0f0f0",
                        color: "white",
                        fontWeight:'600',
                        fontSize:'14px',
                      }}
                    >
                      {row.waste}
                    </span>
                  </td>

                  <td style={{ color: "#dc2620", fontWeight: "bold" }}>
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
                            ? "#ffedec"
                            : row.status === "green"
                            ? "#d1fae5"
                            : row.status === "orange"
                            ? "#e2ffe2"
                            : "#f0f0f0",
                        color:
                          row.status === "red"
                            ? "#e0251b"
                            : row.status === "green"
                            ? "#059669"
                            : row.status === "orange"
                            ? "#5d9d4a"
                            : "#333",
                            fontWeight:'600',
                            fontSize:'14px',  
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
