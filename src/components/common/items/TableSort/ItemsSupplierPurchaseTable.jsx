"use client";

import React from "react";
import { Card, Table } from "react-bootstrap";
import { useTableSort } from "@/components/hooks/useTableSort";
import { IconChartHistogram } from "@tabler/icons-react";

export default function ItemsSupplierPurchaseTable({ tableMeta, tableData }) {
  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(tableData);

  const columns = [
    { key: "supplierName", label: "Supplier Name" },
    { key: "totalQuantity", label: "Total Quantity" },
    { key: "totalPrice", label: "Total Price" },
    { key: "avgPrice", label: "Avg Price" },
    { key: "startDate", label: "Start Date" },
    { key: "endDate", label: "End Date" },
  ];

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  return (
    <Card
      className="border-0 shadow-sm"
      style={{ borderRadius: "16px", overflow: "hidden" }}
    >
      <Card.Header
        className="d-flex align-items-center"
        style={{
          backgroundColor: "#FFF",
          border: "none",
          borderRadius: "16px 16px 0 0",
          padding: "16px",
        }}
      >
        <div style={{
          background: 'linear-gradient(135deg, #F86F2D 60%, #F63E1D 100%)', // orange gradient for Figma match
          borderRadius: '12px',
          padding: '8px',
          display: 'inline-block'
        }}>
          <IconChartHistogram stroke={2} color="#fff" size={20} />
        </div>
        <div style={{marginLeft:"5px"}}>
          <h6 className="mb-0 fw-bold">{tableMeta.title}</h6>
          <small className="text-muted">{tableMeta.subtitle}</small>
        </div>
      </Card.Header>

      <Card.Body className="p-0">
        {/* Scroll wrapper outside the table body */}
        <div
          className="hide-scrollbar"
          style={{
            maxHeight: "65vh",
            overflowY: "auto",
            overflowX: "auto",

            // Hide scrollbar but keep scroll effect
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE/Edge
          }}
        >
          <Table
            hover
            bordered={false}
            className="align-middle mb-0 text-nowrap"
          >
            <thead style={{ backgroundColor: "#F9FAFB" }}>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    style={{
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                      color: "#000",
                      background: "#eee",
                      position: "sticky",
                      top: 0,
                      zIndex: 2,
                      cursor: "pointer",
                      padding: "12px 16px",
                    }}
                  >
                    {col.label}
                    {renderSortArrow(col.key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.length > 0 ? (
                sortedData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-3">{row.supplierName}</td>
                    <td className="text-primary">{row.totalQuantity}</td>
                    <td className="text-success">{row.totalPrice}</td>
                    <td style={{ color: "#6D28D9" }}>{row.avgPrice}</td>
                    <td>{row.startDate}</td>
                    <td>{row.endDate}</td>
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
      </Card.Body>

      {/* styled-jsx for hiding scrollbar (Chrome, Safari, Edge) */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </Card>
  );
}
// "use client";

// import React from "react";
// import { Card, Table } from "react-bootstrap";
// import { useTableSort } from "@/components/hooks/useTableSort";

// export default function ItemsSupplierPurchaseTable({ tableMeta, tableData }) {
//   const { sortedData, sortKey, direction, handleSort } =
//     useTableSort(tableData);

//   const columns = [
//     { key: "supplierName", label: "Supplier Name" },
//     { key: "totalQuantity", label: "Total Quantity" },
//     { key: "totalPrice", label: "Total Price" },
//     { key: "avgPrice", label: "Avg Price" },
//     { key: "startDate", label: "Start Date" },
//     { key: "endDate", label: "End Date" },
//   ];

//   const renderSortArrow = (key) =>
//     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

//   return (
//     <Card
//       className="border-0 shadow-sm"
//       style={{ borderRadius: "16px", overflow: "hidden" }}
//     >
//       <Card.Header
//         className="d-flex align-items-center"
//         style={{
//           backgroundColor: "#FFF7ED",
//           border: "none",
//           borderRadius: "16px 16px 0 0",
//           padding: "16px",
//         }}
//       >
//         {tableMeta.icon}
//         <div>
//           <h6 className="mb-0 fw-bold">{tableMeta.title}</h6>
//           <small className="text-muted">{tableMeta.subtitle}</small>
//         </div>
//       </Card.Header>

//       <Card.Body className="p-0">
//         {/* Scroll wrapper outside the table body */}
//         <div
//           className="hide-scrollbar"
//           style={{
//             maxHeight: "65vh",
//             overflowY: "auto",
//             overflowX: "auto",
//           }}
//         >
//           <Table
//             hover
//             bordered={false}
//             className="align-middle mb-0 text-nowrap"
//           >
//             <thead style={{ backgroundColor: "#F9FAFB" }}>
//               <tr>
//                 {columns.map((col) => (
//                   <th
//                     key={col.key}
//                     onClick={() => handleSort(col.key)}
//                     style={{
//                       fontWeight: 600,
//                       fontSize: "0.85rem",
//                       textTransform: "uppercase",
//                       color: "#555",
//                       background: "#F9FAFB",
//                       position: "sticky",
//                       top: 0,
//                       zIndex: 2,
//                       cursor: "pointer",
//                       padding: "12px 16px",
//                     }}
//                   >
//                     {col.label}
//                     {renderSortArrow(col.key)}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {sortedData.length > 0 ? (
//                 sortedData.map((row, idx) => (
//                   <tr key={idx}>
//                     <td className="py-3 px-3">{row.supplierName}</td>
//                     <td className="text-primary">{row.totalQuantity}</td>
//                     <td className="text-success">{row.totalPrice}</td>
//                     <td style={{ color: "#6D28D9" }}>{row.avgPrice}</td>
//                     <td>{row.startDate}</td>
//                     <td>{row.endDate}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={columns.length}
//                     style={{
//                       textAlign: "center",
//                       padding: "20px",
//                       color: "#888",
//                       fontStyle: "italic",
//                     }}
//                   >
//                     No data available
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// }
