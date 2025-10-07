"use client";

import React, { useState, useMemo } from "react";
import { Table, Container, ButtonGroup, ToggleButton } from "react-bootstrap";
import { FaTable } from "react-icons/fa";

// 🔹 Define all table columns
const columns = [
  { key: "date", label: "Date", bgClass: "" },
  { key: "opening", label: "Opening", bgClass: "bg-soft-blue" },
  { key: "consumption", label: "Consumption", bgClass: "bg-soft-orange" },
  { key: "closing", label: "Closing", bgClass: "bg-soft-green" },
  { key: "netConsumption", label: "Net Consumption", bgClass: "bg-soft-red" },
  { key: "sale", label: "Sale", bgClass: "bg-soft-purple" },
  { key: "burn", label: "Burn & Utilization", bgClass: "bg-soft-gray" },
];

export default function ItemsDepartmentAnalyticsTable({
  tableData = [],
  filter,
  setFilter,
}) {
  const [sortKey, setSortKey] = useState(null);
  const [direction, setDirection] = useState("asc");

  const handleSort = (key) => {
    if (sortKey === key) {
      setDirection(direction === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setDirection("asc");
    }
  };

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  const sortedData = useMemo(() => {
    if (!sortKey) return tableData;
    return [...tableData].sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];
      if (typeof valA === "object" && valA !== null) {
        valA = valA.qty || valA.price || valA.percentage || "";
      }
      if (typeof valB === "object" && valB !== null) {
        valB = valB.qty || valB.price || valB.percentage || "";
      }
      const numA = parseFloat(valA.toString().replace(/[^0-9.-]+/g, ""));
      const numB = parseFloat(valB.toString().replace(/[^0-9.-]+/g, ""));
      if (!isNaN(numA) && !isNaN(numB)) {
        return direction === "asc" ? numA - numB : numB - numA;
      }
      return direction === "asc"
        ? valA.toString().localeCompare(valB.toString())
        : valB.toString().localeCompare(valA.toString());
    });
  }, [tableData, sortKey, direction]);

  return (
    <Container fluid className="p-0 mt-0">
      {/* Header with filters */}
      <div
        className="d-flex justify-content-between align-items-center p-3 rounded-3 shadow-sm header-box flex-wrap"
        style={{
          background: "linear-gradient(90deg, #e6f8f1 0%, #f3faf8 100%)",
        }}
      >
        <div
          className="d-flex align-items-center gap-2 mb-3"
          style={{
            fontFamily: "Inter, sans-serif",
          }}
        >
          {/* ✅ Icon Column */}
          <div
            style={{
              background: "linear-gradient(135deg, #36C194 60%, #239B63 100%)",
              borderRadius: "12px",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              minWidth: "48px",
              minHeight: "48px",
            }}
          >
            <FaTable size={20} color="#fff" />
          </div>

          {/* ✅ Text Column */}
          <div style={{ flex: 1 }}>
            <h5
              className="fw-bold mb-1"
              style={{
                fontSize: "16px",
                color: "#1A1A1A",
              }}
            >
              Daily Analytics Table
            </h5>
            <p
              className="text-muted mb-0"
              style={{
                fontSize: "13px",
                color: "#6C757D",
              }}
            >
              Complete breakdown of daily inventory and consumption data
            </p>
          </div>
        </div>

        <div>
          <ButtonGroup
            style={{
              backgroundColor: "#eee",
              borderRadius: 20,
              padding: 4,
              userSelect: "none",
            }}
          >
            {["Daily", "Same Days", "Weekly", "Monthly"].map((label) => (
              <ToggleButton
                key={label}
                id={`filter-${label}`}
                type="radio"
                value={label.toLowerCase().replace(" ", "")}
                checked={filter === label.toLowerCase().replace(" ", "")}
                onChange={(e) => setFilter(e.currentTarget.value)}
                className="rounded-pill px-3"
                style={{
                  fontSize: "13px",
                  backgroundColor:
                    filter === label.toLowerCase().replace(" ", "")
                      ? "#fff"
                      : "transparent",
                  color:
                    filter === label.toLowerCase().replace(" ", "")
                      ? "#FF5B22"
                      : "#6C757D",
                  border:
                    filter === label.toLowerCase().replace(" ", "")
                      ? "1px solid #FF5B22"
                      : "1px solid #dee2e6",
                }}
              >
                {label}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>
      </div>

      {/* Table wrapper with scroll */}
      <div
        className="scroll-container"
        style={{
          maxHeight: "65vh",
          overflowY: "auto",
          overflowX: "auto",
        }}
      >
        <Table
          hover
          bordered
          className="align-middle text-center analytics-table"
          responsive={false}
        >
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{
                    cursor: "pointer",
                    background: "#eee",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    color: "#000",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
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
                  {columns.map((col) => {
                    const cell = row[col.key];
                    const isColored = col.bgClass !== "";

                    if (col.key === "date") {
                      return (
                        <td key={col.key} className="text-start fw-semibold">
                          {row.date}
                          {row.day && (
                            <div className="text-muted small">{row.day}</div>
                          )}
                        </td>
                      );
                    }

                    if (col.key === "burn") {
                      return (
                        <td key={col.key} className="fw-semibold position-relative">
                          {isColored ? (
                            <div className={`cell-bg ${col.bgClass}`}></div>
                          ) : null}
                          <div className="position-relative" style={{ zIndex: 2 }}>
                            {cell?.qty || ""}
                            {cell?.percentage && (
                              <div className="text-muted small">
                                {cell.percentage}
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    }

                    return (
                      <td key={col.key} className="fw-semibold position-relative">
                        {isColored ? (
                          <div className={`cell-bg ${col.bgClass}`}></div>
                        ) : null}
                        <div className="position-relative" style={{ zIndex: 2 }}>
                          {cell?.qty || ""}
                          {cell?.price && (
                            <div className="text-muted small">{cell.price}</div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Styles */}
      <style jsx>{`
        .analytics-table thead {
          background: #fafafa;
          font-weight: 600;
        }

        /* ✅ Centered partial background (70%) */
        .cell-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70%;
          height: 70%;
          border-radius: 8px;
          opacity: 0.25;
          z-index: 1;
        }

        .bg-soft-blue {
          background-color: #007bff;
        }
        .bg-soft-orange {
          background-color: #ff6b00;
        }
        .bg-soft-green {
          background-color: #28a745;
        }
        .bg-soft-red {
          background-color: #dc3545;
        }
        .bg-soft-purple {
          background-color: #9c27b0;
        }
        .bg-soft-gray {
          background-color: #555;
        }

        .scroll-container {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </Container>
  );
}
// "use client";

// import React, { useState, useMemo } from "react";
// import { Table, Container, ButtonGroup, ToggleButton } from "react-bootstrap";
// import { FaTable } from "react-icons/fa";

// // 🔹 Define all table columns
// const columns = [
//   { key: "date", label: "Date", bgClass: "" },
//   { key: "opening", label: "Opening", bgClass: "bg-soft-blue" },
//   { key: "consumption", label: "Consumption", bgClass: "bg-soft-orange" },
//   { key: "closing", label: "Closing", bgClass: "bg-soft-green" },
//   { key: "netConsumption", label: "Net Consumption", bgClass: "bg-soft-red" },
//   { key: "sale", label: "Sale", bgClass: "bg-soft-purple" },
//   { key: "burn", label: "Burn & Utilization", bgClass: "bg-soft-gray" },
// ];

// export default function ItemsDepartmentAnalyticsTable({
//   tableData = [],
//   filter,
//   setFilter,
// }) {
//   const [sortKey, setSortKey] = useState(null);
//   const [direction, setDirection] = useState("asc");

//   const handleSort = (key) => {
//     if (sortKey === key) {
//       setDirection(direction === "asc" ? "desc" : "asc");
//     } else {
//       setSortKey(key);
//       setDirection("asc");
//     }
//   };

//   const renderSortArrow = (key) =>
//     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

//   const sortedData = useMemo(() => {
//     if (!sortKey) return tableData;
//     return [...tableData].sort((a, b) => {
//       let valA = a[sortKey];
//       let valB = b[sortKey];
//       if (typeof valA === "object" && valA !== null) {
//         valA = valA.qty || valA.price || valA.percentage || "";
//       }
//       if (typeof valB === "object" && valB !== null) {
//         valB = valB.qty || valB.price || valB.percentage || "";
//       }
//       const numA = parseFloat(valA.toString().replace(/[^0-9.-]+/g, ""));
//       const numB = parseFloat(valB.toString().replace(/[^0-9.-]+/g, ""));
//       if (!isNaN(numA) && !isNaN(numB)) {
//         return direction === "asc" ? numA - numB : numB - numA;
//       }
//       return direction === "asc"
//         ? valA.toString().localeCompare(valB.toString())
//         : valB.toString().localeCompare(valA.toString());
//     });
//   }, [tableData, sortKey, direction]);

//   return (
//     <Container fluid className="p-0 mt-0">
//       {/* Header with filters */}
//       <div
//         className="d-flex justify-content-between align-items-center p-3 rounded-3 shadow-sm header-box flex-wrap"
//         style={{
//           background: "linear-gradient(90deg, #e6f8f1 0%, #f3faf8 100%)",
//         }}
//       >
//         <div
//           className="d-flex align-items-center gap-2 mb-3"
//           style={{
//             fontFamily: "Inter, sans-serif",
//           }}
//         >
//           {/* ✅ Icon Column */}
//           <div
//             style={{
//               background: "linear-gradient(135deg, #36C194 60%, #239B63 100%)",
//               borderRadius: "12px",
//               padding: "8px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
//               minWidth: "48px",
//               minHeight: "48px",
//             }}
//           >
//             <FaTable size={20} color="#fff" />
//           </div>

//           {/* ✅ Text Column */}
//           <div style={{ flex: 1 }}>
//             <h5
//               className="fw-bold mb-1"
//               style={{
//                 fontSize: "16px",
//                 color: "#1A1A1A",
//               }}
//             >
//               Daily Analytics Table
//             </h5>
//             <p
//               className="text-muted mb-0"
//               style={{
//                 fontSize: "13px",
//                 color: "#6C757D",
//               }}
//             >
//               Complete breakdown of daily inventory and consumption data
//             </p>
//           </div>
//         </div>

//         <div>
//           <ButtonGroup
//             style={{
//               backgroundColor: "#eee",
//               borderRadius: 20,
//               padding: 4,
//               userSelect: "none",
//             }}>
//             {["Daily", "Same Days", "Weekly", "Monthly"].map((label) => (
//               <ToggleButton
//                 key={label}
//                 id={`filter-${label}`}
//                 type="radio"
//                 value={label.toLowerCase().replace(" ", "")}
//                 checked={filter === label.toLowerCase().replace(" ", "")}
//                 onChange={(e) => setFilter(e.currentTarget.value)}
//                 className="rounded-pill px-3"
//                 style={{
//                   fontSize: "13px",
//                   backgroundColor:
//                     filter === label.toLowerCase().replace(" ", "")
//                       ? "#fff"
//                       : "transparent",
//                   color:
//                     filter === label.toLowerCase().replace(" ", "")
//                       ? "#FF5B22"
//                       : "#6C757D",
//                   border:
//                     filter === label.toLowerCase().replace(" ", "")
//                       ? "1px solid #FF5B22"
//                       : "1px solid #dee2e6",
//                 }}
//               >
//                 {label}
//               </ToggleButton>
//             ))}
//           </ButtonGroup>
//         </div>
//       </div>

//       {/* Table wrapper with scroll */}
//       <div
//         className="scroll-container"
//         style={{
//           maxHeight: "65vh",
//           overflowY: "auto",
//           overflowX: "auto",
//           // position: "relative",
//         }}
//       >
//         <Table
//           hover
//           bordered
//           className="align-middle text-center analytics-table"
//           responsive={false} // ✅ disable bootstrap wrapper
//         >
//           <thead>
//             <tr>
//               {columns.map((col) => (
//                 <th
//                   key={col.key}
//                   onClick={() => handleSort(col.key)}
//                   style={{
//                     cursor: "pointer",
//                     background: "#fafafa",
//                     fontWeight: 600,
//                     fontSize: "0.85rem",
//                     textTransform: "uppercase",
//                     color: "#555",
//                     position: "sticky",
//                     top: 0,
//                     zIndex: 10, // ✅ ensures it stays above body rows
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
//             {sortedData.length > 0 ? (
//               sortedData.map((row, idx) => (
//                 <tr key={idx}>
//                   {columns.map((col) => {
//                     const cell = row[col.key];
//                     if (col.key === "date") {
//                       return (
//                         <td key={col.key} className="text-start fw-semibold">
//                           {row.date}
//                           {row.day && (
//                             <div className="text-muted small">{row.day}</div>
//                           )}
//                         </td>
//                       );
//                     }
//                     if (col.key === "burn") {
//                       return (
//                         <td
//                           key={col.key}
//                           className={`${col.bgClass} fw-semibold`}
//                         >
//                           {cell?.qty || ""}
//                           {cell?.percentage && (
//                             <div className="text-muted small">
//                               {cell.percentage}
//                             </div>
//                           )}
//                         </td>
//                       );
//                     }
//                     return (
//                       <td
//                         key={col.key}
//                         className={`${col.bgClass} fw-semibold`}
//                       >
//                         {cell?.qty || ""}
//                         {cell?.price && (
//                           <div className="text-muted small">{cell.price}</div>
//                         )}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={columns.length} className="text-center">
//                   No data available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       </div>

//       {/* Styles */}
//       <style jsx>{`
//         .analytics-table thead {
//           background: #fafafa;
//           font-weight: 600;
//         }
//         .bg-soft-blue {
//           background: #eaf3ff;
//           color: #007bff;
//         }
//         .scroll-container {
//           scrollbar-width: none; /* Firefox */
//           -ms-overflow-style: none; /* IE/Edge */
//         }

//         .scroll-container::-webkit-scrollbar {
//           display: none; /* Chrome/Safari/Edge */
//         }
//         .bg-soft-orange {
//           background: #fff3e6;
//           color: #ff6b00;
//         }
//         .bg-soft-green {
//           background: #e9f9f1;
//           color: #28a745;
//         }
//         .bg-soft-red {
//           background: #fdeaea;
//           color: #dc3545;
//         }
//         .bg-soft-purple {
//           background: #f6eafc;
//           color: #9c27b0;
//         }
//         .bg-soft-gray {
//           background: #f5f5f5;
//           color: #555;
//         }
//       `}</style>
//     </Container>
//   );
// }

// "use client";

// import React from "react";
// import { Table, Container, ButtonGroup, ToggleButton } from "react-bootstrap";

// // 🔹 Define all table columns
// const columns = [
//   { key: "date", label: "Date", bgClass: "" },
//   { key: "opening", label: "Opening", bgClass: "bg-soft-blue" },
//   { key: "consumption", label: "Consumption", bgClass: "bg-soft-orange" },
//   { key: "closing", label: "Closing", bgClass: "bg-soft-green" },
//   { key: "netConsumption", label: "Net Consumption", bgClass: "bg-soft-red" },
//   { key: "sale", label: "Sale", bgClass: "bg-soft-purple" },
//   { key: "burn", label: "Burn & Utilization", bgClass: "bg-soft-gray" },
// ];

// export default function ItemsDepartmentAnalyticsTable({
//   tableData = [],
//   filter,
//   setFilter,
// }) {
//   return (
//     <Container fluid className="p-0">
//       {/* Header with filters */}
//       <div
//         className="d-flex justify-content-between align-items-center p-3 rounded-3 shadow-sm header-box flex-wrap"
//         style={{
//           background: "linear-gradient(90deg, #e6f8f1 0%, #f3faf8 100%)",
//         }}
//       >
//         <div>
//           <h5 className="fw-bold mb-1">Daily Analytics Table</h5>
//           <p className="text-muted mb-0">
//             Complete breakdown of daily inventory and consumption data
//           </p>
//         </div>
//         <div>
//           <ButtonGroup>
//             {["Daily", "Same Days", "Weekly", "Monthly"].map((label) => (
//               <ToggleButton
//                 key={label}
//                 id={`filter-${label}`}
//                 type="radio"
//                 value={label.toLowerCase().replace(" ", "")}
//                 checked={filter === label.toLowerCase().replace(" ", "")}
//                 onChange={(e) => setFilter(e.currentTarget.value)}
//                 className="rounded-pill px-3"
//                 style={{
//                   fontSize: "13px",
//                   backgroundColor:
//                     filter === label.toLowerCase().replace(" ", "")
//                       ? "#fff"
//                       : "transparent",
//                   color:
//                     filter === label.toLowerCase().replace(" ", "")
//                       ? "#FF5B22"
//                       : "#6C757D",
//                   border:
//                     filter === label.toLowerCase().replace(" ", "")
//                       ? "1px solid #FF5B22"
//                       : "1px solid #dee2e6",
//                 }}
//               >
//                 {label}
//               </ToggleButton>
//             ))}
//           </ButtonGroup>
//         </div>
//       </div>

//       {/* Table */}
//       <Table
//         responsive
//         bordered
//         hover
//         className="align-middle text-center mt-1 analytics-table"
//       >
//         <thead>
//           <tr>
//             {columns.map((col) => (
//               <th key={col.key}>{col.label}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.length > 0 ? (
//             tableData.map((row, idx) => (
//               <tr key={idx}>
//                 {columns.map((col) => {
//                   const cell = row[col.key];

//                   // 🔹 Date column (date + day)
//                   if (col.key === "date") {
//                     return (
//                       <td key={col.key} className="text-start fw-semibold">
//                         {row.date}
//                         {row.day && (
//                           <div className="text-muted small">{row.day}</div>
//                         )}
//                       </td>
//                     );
//                   }

//                   // 🔹 Burn & Utilization (qty + percentage)
//                   if (col.key === "burn") {
//                     return (
//                       <td
//                         key={col.key}
//                         className={`${col.bgClass} fw-semibold`}
//                       >
//                         {cell?.qty || ""}
//                         {cell?.percentage && (
//                           <div className="text-muted small">
//                             {cell.percentage}
//                           </div>
//                         )}
//                       </td>
//                     );
//                   }

//                   // 🔹 Default cells (qty + price)
//                   return (
//                     <td key={col.key} className={`${col.bgClass} fw-semibold`}>
//                       {cell?.qty || ""}
//                       {cell?.price && (
//                         <div className="text-muted small">{cell.price}</div>
//                       )}
//                     </td>
//                   );
//                 })}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={columns.length} className="text-center">
//                 No data available
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>

//       {/* Styles */}
//       <style jsx>{`
//         .header-box {
//           background: linear-gradient(90deg, #e6f8f1 0%, #f3faf8 100%);
//         }
//         .analytics-table thead {
//           background: #fafafa;
//           font-weight: 600;
//         }
//         .bg-soft-blue {
//           background: #eaf3ff;
//           color: #007bff;
//         }
//         .bg-soft-orange {
//           background: #fff3e6;
//           color: #ff6b00;
//         }
//         .bg-soft-green {
//           background: #e9f9f1;
//           color: #28a745;
//         }
//         .bg-soft-red {
//           background: #fdeaea;
//           color: #dc3545;
//         }
//         .bg-soft-purple {
//           background: #f6eafc;
//           color: #9c27b0;
//         }
//         .bg-soft-gray {
//           background: #f5f5f5;
//           color: #555;
//         }
//       `}</style>
//     </Container>
//   );
// }
