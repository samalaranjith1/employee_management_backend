"use client";

import React, { useMemo } from "react";
import { Col, Table, Badge } from "react-bootstrap";
import { useTableSort } from "@/components/hooks/useTableSort";

export default function ItemsMenuItemConsumptionAnalysisTable({
  formattedData,
}) {
  // 🔹 Prepare sorting
  const tableData = useMemo(() => {
    return formattedData.map((item) => ({
      ...item,
      totalConsumptionNum: parseFloat(item.totalConsumption) || 0,
    }));
  }, [formattedData]);

  const { sortedData, sortKey, direction, handleSort } = useTableSort(tableData);

  const renderArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  const columns = [
    { key: "name", label: "Menu Item" },
    { key: "recipeQty", label: "Recipe" },
    { key: "totalConsumptionNum", label: "Total Consumption" },
  ];

  return (
    <Col md={7}>
      <div
        style={{
          maxHeight: "65vh",
          overflowY: "auto",
          borderRadius: "12px",
          border: "1px solid #dee2e6",
        }}
      >
        <Table
          hover
          className="align-middle mb-0"
          style={{ tableLayout: "fixed", width: "100%" }}
        >
          {/* Sticky Header */}
          <thead
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              backgroundColor: "#f8f9fa",
            }}
          >
            <tr>
              {columns.map((col,index) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{
                    cursor: "pointer",
                    fontSize: "13px",
                    backgroundColor: "#eee",
                    color: "#000",
                    textAlign: index===0?'left':'center'
                  }}
                >
                  {col.label} {renderArrow(col.key)}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={item.id ?? `row-${index}`}>
                {/* Column 1: Menu Item */}
                <td>
                  <div className="d-flex flex-column align-items-start">
                    <span className="mt-1">{item.name}</span>
                    <Badge bg="light" text="secondary" className="mt-1">
                      {item.itemsSold} items
                    </Badge>
                  </div>
                </td>

                {/* Column 2: Recipe */}
                <td className="position-relative text-center" style={{ verticalAlign: "middle" }}>
                  {/* Background block */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "70%",
                      height: "70%",
                      backgroundColor: "rgba(0, 123, 255, 0.15)",
                      borderRadius: "8px",
                      zIndex: 1,
                    }}
                  ></div>

                  {/* Foreground content */}
                  <div
                    style={{
                      position: "relative",
                      zIndex: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span className="fw-bold text-primary">{item.recipeQty}</span>
                    <div className="text-muted small">{item.recipePrice}</div>
                  </div>
                </td>

                {/* Column 3: Total Consumption */}
                <td className="position-relative text-center" style={{ verticalAlign: "middle" }}>
                  {/* Background block */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "70%",
                      height: "70%",
                      backgroundColor: "rgba(40, 167, 69, 0.15)",
                      borderRadius: "8px",
                      zIndex: 1,
                    }}
                  ></div>

                  {/* Foreground content */}
                  <div
                    style={{
                      position: "relative",
                      zIndex: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span className="fw-bold text-success">{item.totalConsumption}</span>
                    <div className="text-muted small">{item.totalConsumptionPrice}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Col>
  );
}
// "use client";

// import React, { useMemo } from "react";
// import { Col, Table, Badge } from "react-bootstrap";
// import { useTableSort } from "@/components/hooks/useTableSort";

// export default function ItemsMenuItemConsumptionAnalysisTable({
//   formattedData,
// }) {
//   // 🔹 Prepare sorting
//   const tableData = useMemo(() => {
//     return formattedData.map((item) => ({
//       ...item,
//       totalConsumptionNum: parseFloat(item.totalConsumption) || 0,
//     }));
//   }, [formattedData]);

//   const { sortedData, sortKey, direction, handleSort } =
//     useTableSort(tableData);

//   const renderArrow = (key) =>
//     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

//   const columns = [
//     { key: "name", label: "Menu Item" },
//     { key: "recipeQty", label: "Recipe" },
//     { key: "totalConsumptionNum", label: "Total Consumption" },
//   ];

//   return (
//     <Col md={7}>
//       <div
//         style={{
//           maxHeight: "65vh",
//           overflowY: "auto",
//           borderRadius: "12px",
//           border: "1px solid #dee2e6",
//         }}
//       >
//         <Table
//           hover
//           className="align-middle mb-0"
//           style={{ tableLayout: "fixed", width: "100%" }}
//         >
//           {/* Sticky Header */}
//           <thead
//             style={{
//               position: "sticky",
//               top: 0,
//               zIndex: 10,
//               backgroundColor: "#f8f9fa", // Ensure background covers cells
//             }}
//           >
//             <tr>
//               {columns.map((col) => (
//                 <th
//                   key={col.key}
//                   onClick={() => handleSort(col.key)}
//                   style={{
//                     cursor: "pointer",
//                     fontSize: "13px",
//                     backgroundColor: "#eee",
//                     color: '#000'
//                   }}
//                 >
//                   {col.label} {renderArrow(col.key)}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           {/* Table Body */}
//           <tbody>
//             {sortedData.map((item, index) => (
//               <tr key={item.id ?? `row-${index}`}>
//                 <td>
//                   <div className="d-flex flex-column align-items-left">
//                     {/* <div>
//                       {item.icon && <span>{item.icon}</span>}
//                     </div> */}

//                     <div>
//                       <span className="mt-2">{item.name}</span>
//                     </div>

//                     <div>
//                       <Badge bg="light" text="secondary" className="mt-1">
//                         {item.itemsSold} items
//                       </Badge>
//                     </div>
//                   </div>

//                 </td>
//                 {/* <td>
//                   <div>
//                     <span className="fw-bold text-primary">
//                       {item.recipeQty}
//                     </span>
//                     <div className="text-muted small">{item.recipePrice}</div>
//                   </div>
//                 </td>
//                 <td>
//                   <div>
//                     <span className="fw-bold text-success">
//                       {item.totalConsumption}
//                     </span>
//                     <div className="text-muted small">
//                       {item.totalConsumptionPrice}
//                     </div>
//                   </div>
//                 </td> */}
//                 <td className="position-relative text-center" style={{ verticalAlign: "middle" }}>
//                   {/* ✅ 70% background block */}
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: "50%",
//                       left: "50%",
//                       transform: "translate(-50%, -50%)",
//                       width: "70%",
//                       height: "70%",
//                       backgroundColor: "rgba(0, 123, 255, 0.15)", // example blue
//                       borderRadius: "8px",
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       zIndex: 1,
//                       padding: "4px",
//                       boxSizing: "border-box",
//                     }}
//                   ></div>

//                   {/* ✅ Cell content */}
//                   <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
//                     <span className="fw-bold text-primary">{item.recipeQty}</span>
//                     <div className="text-muted small">{item.recipePrice}</div>
//                   </div>
//                 </td>

//                 <td className="position-relative text-center" style={{ verticalAlign: "middle" }}>
//                   {/* ✅ 70% background block */}
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: "50%",
//                       left: "50%",
//                       transform: "translate(-50%, -50%)",
//                       width: "70%",
//                       height: "70%",
//                       backgroundColor: "rgba(40, 167, 69, 0.15)", // example green
//                       borderRadius: "8px",
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       zIndex: 1,
//                       padding: "4px",
//                       boxSizing: "border-box",
//                     }}
//                   ></div>

//                   {/* ✅ Cell content */}
//                   <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
//                     <span className="fw-bold text-success">{item.totalConsumption}</span>
//                     <div className="text-muted small">{item.totalConsumptionPrice}</div>
//                   </div>
//                 </td>

//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </Col>
//   );
// }
