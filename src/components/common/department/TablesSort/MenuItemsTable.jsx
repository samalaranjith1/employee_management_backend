"use client";

import React from "react";
import { Table, Badge } from "react-bootstrap";
import { BaseSurface } from "../../dashboard/TablesSort";
import { useTableSort } from "@/components/hooks/useTableSort";
import { useTableControls } from "@/components/hooks/useTableControls";
import { TableControls } from "@/components/common/TableControls";

function MenuItemsTable({ data }) {
  // 🔹 Columns definition
  const columns = [
    { key: "item", label: "Item" },
    { key: "price", label: "Selling Price" },
    { key: "makingCost", label: "Making Cost" },
    { key: "margin", label: "Margin" },
    { key: "marginPercentage", label: "Margin %" },
    { key: "pieces", label: "Pieces" },
  ];

  // 🔹 Sorting hook
  const { sortedData, sortKey, direction, handleSort } = useTableSort(data);

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  // 🔹 Filters config: filter by item
  const filtersConfig = {
    name: ["All", ...Array.from(new Set(data.map((d) => d.name)))],
  };


  // 🔹 Table controls: search, filter, export
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

  return (
    <div>
      {/* 🔹 Search + Filter + Export Controls */}
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

      {/* 🔹 Table */}
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
          bordered={false}
          hover
          className="align-middle mb-0"
          style={{ minWidth: "950px", tableLayout: "fixed" }}
        >
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: "#232425",
                    textAlign: "left",
                    background: '#f4f7fc',
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
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
                  {/* Item */}
                  <td>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: "#232425",
                      textAlign: "left",
                    }}>
                      {item.name}
                    </div>
                    <div className="d-flex gap-2 mt-2">
                      <div
                        bg="light"
                        text="dark"
                        style={{
                          border: "1px solid #ddd",
                          fontSize: '12px',
                          fontWeight: '500',
                          textAlign: "left",
                        }}
                      >
                        {item.variation}
                      </div>
                      <div
                        bg={item.veg ? "success" : "warning"}
                        text="dark"
                        style={{
                          backgroundColor: item.veg ? "#eaffea" : '#f9f0e2',
                          color: item.veg ? "#5d9d4a" : '#cd861b',
                          fontSize: '12px',
                          fontWeight: '500',
                          textAlign: "left",
                          padding: "2px 4px",
                          borderRadius: "6px",
                        }}
                      >
                        {item.veg ? "Veg" : "Non-Veg"}
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td
                    style={{
                      fontWeight: 700,
                      fontSize: '14px',
                      fontWeight: '500',
                      textAlign: "left",
                    }}
                  >
                    {item.price}
                  </td>

                  {/* Making Cost */}
                  <td style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: "left",
                  }}>
                    {item.makingCost}
                  </td>

                  {/* Margin */}
                  <td style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    textAlign: "left",
                  }}>
                    {item.margin}
                  </td>

                  {/* Margin % */}
                  <td style={{ padding: "14px 16px" }}>
                    <Badge
                      bg="danger"
                      style={{
                        borderRadius: "16px",
                        padding: "6px 14px",
                        fontWeight: 500,
                        fontSize: "14px",
                      }}
                    >
                      {item.marginPercentage}
                    </Badge>
                  </td>

                  {/* Pieces */}
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      textAlign: "left",
                    }}>{item.pieces.count}</div>
                    <div className="text-muted" style={{ fontSize: "12px", fontWeight: 400 }}>
                      {item.pieces.label}
                    </div>
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
                  No items available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default MenuItemsTable;

// "use client";
// import React from "react";
// import { Table, Badge } from "react-bootstrap";
// import { BaseSurface } from "../../dashboard/TablesSort";
// import { useTableSort } from "@/components/hooks/useTableSort";

// function MenuItemsTable({ data }) {
//   const { sortedData, sortKey, direction, handleSort } = useTableSort(data);

//   const renderSortArrow = (key) =>
//     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

//   const columns = [
//     { key: "item", label: "ITEM" },
//     { key: "price", label: "SELLING PRICE" },
//     { key: "makingCost", label: "MAKING COST" },
//     { key: "margin", label: "MARGIN" },
//     { key: "marginPercentage", label: "MARGIN %" },
//     { key: "pieces", label: "PIECES" },
//   ];

//   return (
//     <BaseSurface maxHeight="65vh">
//       <div
//         style={{
//           maxHeight: "60vh",
//           overflowY: "auto",
//           overflowX: "auto",

//           /* 🔑 Hide scrollbar cross-browser */
//           scrollbarWidth: "none", // Firefox
//           msOverflowStyle: "none", // IE/Edge
//         }}
//         className="hide-scrollbar"
//       >
//         <Table
//           bordered={false}
//           hover
//           className="align-middle mb-0"
//           style={{ minWidth: "950px", tableLayout: "fixed" }}
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
//                   }}
//                 >
//                   {col.label}
//                   {renderSortArrow(col.key)}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {sortedData.map((item) => (
//               <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
//                 {/* Item Column */}
//                 <td style={{ padding: "14px 16px" }}>
//                   <div style={{ fontWeight: 600, color: "#222" }}>
//                     {item.name}
//                   </div>
//                   <div className="d-flex gap-2 mt-2">
//                     <Badge
//                       bg="light"
//                       text="dark"
//                       style={{
//                         border: "1px solid #ddd",
//                         fontSize: "0.75rem",
//                         padding: "4px 8px",
//                         borderRadius: "6px",
//                       }}
//                     >
//                       {item.variation}
//                     </Badge>
//                     <Badge
//                       bg={item.veg ? "success" : "warning"}
//                       text="dark"
//                       style={{
//                         fontSize: "0.75rem",
//                         padding: "4px 8px",
//                         borderRadius: "6px",
//                       }}
//                     >
//                       {item.veg ? "Veg" : "Non-Veg"}
//                     </Badge>
//                   </div>
//                 </td>

//                 {/* Price */}
//                 <td
//                   style={{
//                     fontWeight: 600,
//                     color: "#2d2d2d",
//                     fontSize: "0.95rem",
//                     padding: "14px 16px",
//                   }}
//                 >
//                   {item.price}
//                 </td>

//                 {/* Making Cost */}
//                 <td style={{ color: "#444", padding: "14px 16px" }}>
//                   {item.makingCost}
//                 </td>

//                 {/* Margin */}
//                 <td style={{ color: "#444", padding: "14px 16px" }}>
//                   {item.margin}
//                 </td>

//                 {/* Margin % */}
//                 <td style={{ padding: "14px 16px" }}>
//                   <Badge
//                     bg="danger"
//                     style={{
//                       borderRadius: "16px",
//                       padding: "6px 14px",
//                       fontWeight: 600,
//                       fontSize: "0.8rem",
//                     }}
//                   >
//                     {item.marginPercentage}
//                   </Badge>
//                 </td>

//                 {/* Pieces */}
//                 <td style={{ padding: "14px 16px" }}>
//                   <div style={{ fontWeight: 600 }}>{item.pieces.count}</div>
//                   <div style={{ fontSize: "12px", color: "#666" }}>
//                     {item.pieces.label}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </BaseSurface>
//   );
// }

// export default MenuItemsTable;

// "use client";
// import React from "react";
// import { Table, Badge } from "react-bootstrap";
// import { BaseSurface } from "../../dashboard/TablesSort";
// import { useTableSort } from "@/components/hooks/useTableSort";

// function MenuItemsTable() {
//   // ✅ Raw data inside the component
//   const rawData = [
//     {
//       id: "8",
//       name: "Ajwain Gobi Pakoda",
//       price: 149,
//       makingCost: 109,
//       veg: false,
//       variation: "FULL",
//       pieceCount: 1,
//       pieceQuantity: 1,
//       pieceUnit: "GM",
//     },
//     {
//       id: "41",
//       name: "Dal Fry",
//       price: 249,
//       makingCost: 45,
//       veg: false,
//       variation: "FULL",
//       pieceCount: 1,
//       pieceQuantity: 1,
//       pieceUnit: "GM",
//     },
//   ];

//   const { sortedData, sortKey, direction, handleSort } = useTableSort(rawData);

//   const renderSortArrow = (key) =>
//     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

//   // ✅ Utility to calculate margin & margin %
//   const getMarginData = (price, cost) => {
//     const margin = price - cost;
//     const marginPercentage = ((margin / price) * 100).toFixed(0);
//     return { margin, marginPercentage };
//   };

//   // ✅ Define columns config
//   const columns = [
//     { key: "item", label: "ITEM" },
//     { key: "price", label: "SELLING PRICE" },
//     { key: "makingCost", label: "MAKING COST" },
//     { key: "margin", label: "MARGIN" },
//     { key: "marginPercentage", label: "MARGIN %" },
//     { key: "pieces", label: "PIECES" },
//   ];

//   return (
//     <BaseSurface maxHeight="65vh">
//       {/* ✅ Add vertical scroll container */}
//       <div style={{ maxHeight: "60vh", overflowY: "auto", overflowX: "auto" }}>
//         <Table
//           bordered
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
//             {sortedData.map((item) => {
//               const { margin, marginPercentage } = getMarginData(
//                 item.price,
//                 item.makingCost
//               );

//               return (
//                 <tr key={item.id}>
//                   {columns.map((col) => {
//                     switch (col.key) {
//                       case "item":
//                         return (
//                           <td key={col.key}>
//                             <div style={{ fontWeight: 500 }}>{item.name}</div>
//                             <div className="d-flex gap-2 mt-1">
//                               <Badge
//                                 bg="light"
//                                 text="dark"
//                                 style={{ border: "1px solid #ddd" }}
//                               >
//                                 {item.variation}
//                               </Badge>
//                               <Badge
//                                 bg={item.veg ? "success" : "warning"}
//                                 text="dark"
//                               >
//                                 {item.veg ? "Veg" : "Non-Veg"}
//                               </Badge>
//                             </div>
//                           </td>
//                         );

//                       case "price":
//                         return (
//                           <td key={col.key} style={{ fontWeight: 600 }}>
//                             ₹{item.price}
//                           </td>
//                         );

//                       case "makingCost":
//                         return <td key={col.key}>₹{item.makingCost}</td>;

//                       case "margin":
//                         return <td key={col.key}>₹{margin}</td>;

//                       case "marginPercentage":
//                         return (
//                           <td key={col.key}>
//                             <Badge
//                               bg="danger"
//                               style={{
//                                 borderRadius: "20px",
//                                 padding: "6px 12px",
//                                 fontWeight: 500,
//                                 fontSize: "0.9rem",
//                               }}
//                             >
//                               {marginPercentage}%
//                             </Badge>
//                           </td>
//                         );

//                       case "pieces":
//                         return (
//                           <td key={col.key}>
//                             {item.pieceCount}
//                             <div style={{ fontSize: "12px", color: "#666" }}>
//                               {item.pieceQuantity}
//                               {item.pieceUnit.toLowerCase()} each
//                             </div>
//                           </td>
//                         );

//                       default:
//                         return <td key={col.key}></td>;
//                     }
//                   })}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </Table>
//       </div>
//     </BaseSurface>
//   );
// }

// export default MenuItemsTable;

// // "use client";
// // import React from "react";
// // import { Table, Badge } from "react-bootstrap";

// // function MenuItemsTable() {
// //   // ✅ Raw data from your API
// //   const rawData = [
// //     {
// //       id: "8",
// //       outletId: "1",
// //       name: "Ajwain Gobi Pakoda",
// //       departmentId: 2,
// //       departmentName: "NORTH INDIAN",
// //       masterProductId: 8,
// //       masterProductName: "Ajwain Gobi Pakoda",
// //       categoryId: 0,
// //       categoryName: null,
// //       price: 149,
// //       makingCost: 109,
// //       costPercentage: 73.15,
// //       marginPercentage: null,
// //       veg: false,
// //       variation: "FULL",
// //       pieceCount: 1,
// //       pieceQuantity: 1,
// //       pieceUnit: "GM",
// //     },
// //     {
// //       id: "41",
// //       outletId: "1",
// //       name: "Dal Fry",
// //       departmentId: 2,
// //       departmentName: "NORTH INDIAN",
// //       masterProductId: 40,
// //       masterProductName: "Dal Fry",
// //       categoryId: 0,
// //       categoryName: null,
// //       price: 249,
// //       makingCost: 45,
// //       costPercentage: 18.07,
// //       marginPercentage: null,
// //       veg: false,
// //       variation: "FULL",
// //       pieceCount: 1,
// //       pieceQuantity: 1,
// //       pieceUnit: "GM",
// //     },
// //   ];

// //   // ✅ Utility to calculate margin & margin %
// //   const getMarginData = (price, cost) => {
// //     const margin = price - cost;
// //     const marginPercentage = ((margin / price) * 100).toFixed(0);
// //     return { margin, marginPercentage };
// //   };

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <Table responsive hover className="align-middle">
// //         <thead>
// //           <tr>
// //             <th>ITEM</th>
// //             <th>SELLING PRICE</th>
// //             <th>MAKING COST</th>
// //             <th>MARGIN</th>
// //             <th>MARGIN %</th>
// //             <th>PIECES</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {rawData.map((item) => {
// //             const { margin, marginPercentage } = getMarginData(
// //               item.price,
// //               item.makingCost
// //             );

// //             return (
// //               <tr key={item.id}>
// //                 {/* ITEM */}
// //                 <td>
// //                   <div style={{ fontWeight: 500 }}>{item.name}</div>
// //                   <div className="d-flex gap-2 mt-1">
// //                     <Badge
// //                       bg="light"
// //                       text="dark"
// //                       style={{ border: "1px solid #ddd" }}
// //                     >
// //                       {item.variation}
// //                     </Badge>
// //                     <Badge bg={item.veg ? "success" : "warning"} text="dark">
// //                       {item.veg ? "Veg" : "Non-Veg"}
// //                     </Badge>
// //                   </div>
// //                 </td>

// //                 {/* SELLING PRICE */}
// //                 <td style={{ fontWeight: 600 }}>₹{item.price}</td>

// //                 {/* MAKING COST */}
// //                 <td>₹{item.makingCost}</td>

// //                 {/* MARGIN */}
// //                 <td>₹{margin}</td>

// //                 {/* MARGIN % */}
// //                 <td>
// //                   <Badge
// //                     bg="danger"
// //                     style={{
// //                       borderRadius: "20px",
// //                       padding: "6px 12px",
// //                       fontWeight: 500,
// //                       fontSize: "0.9rem",
// //                     }}
// //                   >
// //                     {marginPercentage}%
// //                   </Badge>
// //                 </td>

// //                 {/* PIECES */}
// //                 <td>
// //                   {item.pieceCount}
// //                   <div style={{ fontSize: "12px", color: "#666" }}>
// //                     {item.pieceQuantity}
// //                     {item.pieceUnit.toLowerCase()} each
// //                   </div>
// //                 </td>
// //               </tr>
// //             );
// //           })}
// //         </tbody>
// //       </Table>
// //     </div>
// //   );
// // }

// // export default MenuItemsTable;
