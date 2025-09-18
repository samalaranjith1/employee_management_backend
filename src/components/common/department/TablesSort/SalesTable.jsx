"use client";
import React from "react";
import { Table, Badge } from "react-bootstrap";
import { BaseSurface } from "../../dashboard/TablesSort";
import { useTableSort } from "@/components/hooks/useTableSort";
import { useTableControls } from "@/components/hooks/useTableControls";
import { TableControls } from "@/components/common/TableControls";

function SalesTable({ products }) {
  // 🔹 Sorting
  const { sortedData, sortKey, direction, handleSort } = useTableSort(products);

  // 🔹 Column config
  const columns = [
    // { key: "srNo", label: "#" },
    { key: "name", label: "PRODUCT" },
    { key: "items", label: "#ITEMS" },
    { key: "netSales", label: "NET SALES" },
    { key: "discount", label: "DISCOUNT" },
    { key: "tax", label: "TAX" },
    { key: "makingCost", label: "MAKING COST" },
    { key: "margin", label: "MARGIN" },
  ];

  // 🔹 Filters (by product name)
  const filtersConfig = {
    name: ["All", ...Array.from(new Set(products.map((p) => p.name)))],
  };

  // 🔹 Table controls (search + filters + export)
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
    searchFields: ["name", "department"], // searchable fields
    filtersConfig,
  });

  // 🔹 Sorting arrows
  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  return (
    <div>
      {/* 🔹 Controls (search + filter + export) */}
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

      <div
        style={{
          maxHeight: "60vh",
          overflowY: "auto",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="hide-scrollbar"
      >
        <Table
          bordered={false}
          hover
          className="align-middle mb-0 text-nowrap"
          style={{
            minWidth: "1100px", // force horizontal scroll if needed
          }}
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
                    minWidth: col.key === "name" ? "250px" : "120px",
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
              filteredData.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
                  {/* # */}
                  {/* <td style={{ padding: "14px 16px" }}>{item.srNo}</td> */}

                  {/* Product */}
                  <td style={{ padding: "14px 16px", minWidth: "250px" }}>
                    <div className="fw-semibold">{item.name}</div>
                    <div className="text-muted small">
                      {item.department} • {item.price}
                    </div>
                  </td>

                  {/* Items */}
                  <td style={{ padding: "14px 16px" }}>{item.items}</td>

                  {/* Net Sales */}
                  <td
                    className="fw-semibold"
                    style={{ color: "green", padding: "14px 16px" }}
                  >
                    {item.netSales}
                  </td>

                  {/* Discount */}
                  <td style={{ color: "red", padding: "14px 16px" }}>
                    {item.discount}
                  </td>

                  {/* Tax */}
                  <td style={{ padding: "14px 16px" }}>{item.tax}</td>

                  {/* Making Cost */}
                  <td style={{ color: "red", padding: "14px 16px" }}>
                    {item.makingCost}
                  </td>

                  {/* Margin */}
                  <td style={{ padding: "14px 16px" }}>
                    <div className="fw-semibold text-success">
                      {item.margin}
                    </div>
                    <Badge
                      bg={item.marginColor}
                      style={{
                        borderRadius: "16px",
                        padding: "6px 14px",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                      }}
                    >
                      {item.marginPercentage}
                    </Badge>
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

export default SalesTable;
// "use client";
// import React from "react";
// import { Table, Badge } from "react-bootstrap";
// import { BaseSurface } from "../../dashboard/TablesSort";
// import { useTableSort } from "@/components/hooks/useTableSort";

// function SalesTable({ products }) {
//   const { sortedData, sortKey, direction, handleSort } = useTableSort(products);

//   const renderSortArrow = (key) =>
//     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

//   const columns = [
//     { key: "srNo", label: "#" },
//     { key: "name", label: "PRODUCT" },
//     { key: "items", label: "#ITEMS" },
//     { key: "netSales", label: "NET SALES" },
//     { key: "discount", label: "DISCOUNT" },
//     { key: "tax", label: "TAX" },
//     { key: "makingCost", label: "MAKING COST" },
//     { key: "margin", label: "MARGIN" },
//   ];

//   return (
//     <BaseSurface maxHeight="65vh">
//       <div
//         style={{
//           maxHeight: "60vh",
//           overflowY: "auto",
//           overflowX: "auto",
//           scrollbarWidth: "none", // Firefox
//           msOverflowStyle: "none", // IE/Edge
//         }}
//         className="hide-scrollbar"
//       >
//         <Table
//           bordered={false}
//           hover
//           className="align-middle mb-0 text-nowrap"
//           style={{
//             minWidth: "1100px", // force horizontal scroll if needed
//           }}
//         >
//           <thead>
//             <tr>
//               {columns.map((col) => (
//                 <th
//                   key={col.key}
//                   onClick={() => handleSort(col.key)}
//                   style={{
//                     background: "#fafafa",
//                     fontWeight: 600,
//                     fontSize: "0.85rem",
//                     textTransform: "uppercase",
//                     color: "#555",
//                     position: "sticky",
//                     top: 0,
//                     zIndex: 2,
//                     cursor: "pointer",
//                     padding: "12px 16px",
//                     minWidth: col.key === "name" ? "250px" : "120px", // 👈 product column wider
//                   }}
//                 >
//                   {col.label}
//                   {renderSortArrow(col.key)}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {sortedData.length > 0 ? (
//               sortedData.map((item) => (
//                 <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
//                   {/* # */}
//                   <td style={{ padding: "14px 16px" }}>{item.srNo}</td>

//                   {/* Product */}
//                   <td style={{ padding: "14px 16px", minWidth: "250px" }}>
//                     <div className="fw-semibold">{item.name}</div>
//                     <div className="text-muted small">
//                       {item.department} • {item.price}
//                     </div>
//                   </td>

//                   {/* Items */}
//                   <td style={{ padding: "14px 16px" }}>{item.items}</td>

//                   {/* Net Sales */}
//                   <td
//                     className="fw-semibold"
//                     style={{ color: "green", padding: "14px 16px" }}
//                   >
//                     {item.netSales}
//                   </td>

//                   {/* Discount */}
//                   <td style={{ color: "red", padding: "14px 16px" }}>
//                     {item.discount}
//                   </td>

//                   {/* Tax */}
//                   <td style={{ padding: "14px 16px" }}>{item.tax}</td>

//                   {/* Making Cost */}
//                   <td style={{ color: "red", padding: "14px 16px" }}>
//                     {item.makingCost}
//                   </td>

//                   {/* Margin */}
//                   <td style={{ padding: "14px 16px" }}>
//                     <div className="fw-semibold text-success">
//                       {item.margin}
//                     </div>
//                     <Badge
//                       bg={item.marginColor}
//                       style={{
//                         borderRadius: "16px",
//                         padding: "6px 14px",
//                         fontWeight: 600,
//                         fontSize: "0.8rem",
//                       }}
//                     >
//                       {item.marginPercentage}
//                     </Badge>
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
//     </BaseSurface>
//   );
// }

// export default SalesTable;
