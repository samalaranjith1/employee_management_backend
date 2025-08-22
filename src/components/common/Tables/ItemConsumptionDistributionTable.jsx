
"use client";
import React from "react";
import { Table, Badge } from "react-bootstrap";
import { FaCircle, FaArrowUp } from "react-icons/fa";
import BaseSurface from "./BaseSurface";

export default function ItemConsumptionDistributionTable({ data }) {
  const getBadgeVariant = (classification) => {
    if (classification === "High Consumption")
      return { bg: "#FFEAEA", color: "#E53935" };
    if (classification === "Medium Consumption")
      return { bg: "#FFF8E1", color: "#FBC02D" };
    if (classification === "Low Consumption")
      return { bg: "#E8F8F0", color: "#43A047" };
    return { bg: "#EEE", color: "#000" };
  };

  return (
    <BaseSurface maxHeight="65vh" containerStyle={{ borderRadius: "12px" }}>
      <div style={{ overflowX: "auto" }}>
        <Table borderless className="align-middle mb-0" style={{ minWidth: "700px" }}>
          <thead
            style={{
              backgroundColor: "#F9FAFB",
              position: "sticky",
              top: 0,
              zIndex: 5,
            }}
          >
            <tr>
              <th>Percentile Bucket</th>
              <th>Items</th>
              <th>Consumption Value</th>
              <th>% of Total</th>
              <th>Classification</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => {
              const badge = getBadgeVariant(row.classification);
              return (
                <tr key={idx}>
                  <td className="fw-medium">
                    <FaCircle size={10} className="me-2" style={{ color: row.color }} />
                    {row.percentile}
                  </td>
                  <td>
                    <div className="fw-bold">{row.items}</div>
                    <small className="text-muted">{row.percentItems} of items</small>
                  </td>
                  <td className="text-success fw-bold">
                    ₹{row.value.toLocaleString()}{" "}
                    <small className="text-success">
                      <FaArrowUp size={10} className="me-1" />
                      consumption
                    </small>
                  </td>
                  <td className="text-primary fw-bold">
                    {row.percentValue}{" "}
                    <small className="text-muted">of total value</small>
                  </td>
                  <td>
                    <Badge
                      style={{
                        backgroundColor: badge.bg,
                        color: badge.color,
                        fontWeight: 500,
                        padding: "6px 12px",
                        borderRadius: "8px",
                      }}
                    >
                      {row.classification}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </BaseSurface>
  );
}

// "use client";
// import React from "react";
// import { Table, Badge } from "react-bootstrap";
// import BaseSurface from "./BaseSurface";

// export default function ItemConsumptionDistributionTable({ data }) {
//   const classificationColors = {
//     GREEN: { bg: "#d4f6e7", color: "#2a9d8f" },
//     ORANGE: { bg: "#fff3d4", color: "#f4a261" },
//     RED: { bg: "#fceaea", color: "#e76f51" },
//     Unclassified: { bg: "#eee", color: "#444" },
//   };

//   const barColors = {
//     GREEN: "#27ae60",
//     ORANGE: "#f4a261",
//     RED: "#e76f51",
//     Unclassified: "#95a5a6",
//   };

//   return (
//     <BaseSurface
//       containerStyle={{
//         borderRadius: 12,
//         boxShadow: "0 0 10px rgb(0 0 0 / 0.05)",
//       }}
//       bodyStyle={{
//         padding: 0,
//       }}
//     >
//       <div
//         style={{
//           maxHeight: "65vh",
//           overflowY: "auto",
//           overflowX: "auto",
//         }}
//       >
//         <Table
//           hover
//           className="mb-0"
//           style={{ minWidth: 900, backgroundColor: "#fff7f0" }}
//         >
//           <thead
//             style={{
//               backgroundColor: "#fff2e8",
//               position: "sticky",
//               top: 0,
//               zIndex: 2,
//             }}
//           >
//             <tr>
//               <th style={{ color: "#d85e00", fontWeight: 600 }}>Percentile</th>
//               <th style={{ fontWeight: 600 }}>Items Sold</th>
//               <th style={{ fontWeight: 600 }}>Items %</th>
//               <th style={{ fontWeight: 600 }}>Net Sales</th>
//               <th style={{ fontWeight: 600 }}>Efficiency %</th>
//               <th style={{ fontWeight: 600 }}>Classification</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map(
//               (
//                 {
//                   percentile,
//                   items,
//                   percentItems,
//                   value,
//                   percentValue,
//                   classification,
//                   color,
//                 },
//                 idx
//               ) => {
//                 const classColor = classificationColors[classification] || {
//                   bg: "#eee",
//                   color: "#444",
//                 };

//                 return (
//                   <tr
//                     key={idx}
//                     style={{
//                       backgroundColor: idx % 2 === 0 ? "#fff8f0" : "white",
//                     }}
//                   >
//                     <td
//                       className="d-flex align-items-center gap-2"
//                       style={{ fontWeight: 600 }}
//                     >
//                       <div
//                         style={{
//                           width: 8,
//                           height: 28,
//                           backgroundColor:
//                             barColors[classification] || "#27ae60",
//                           borderRadius: 4,
//                         }}
//                       />
//                       {percentile}
//                     </td>
//                     <td style={{ fontWeight: "bold" }}>{items}</td>
//                     <td>{percentItems}</td>
//                     <td>₹{value}</td>
//                     <td style={{ color: "#7f3fff", fontWeight: 600 }}>
//                       {percentValue}
//                     </td>
//                     <td>
//                       <Badge
//                         style={{
//                           backgroundColor: classColor.bg,
//                           color: classColor.color,
//                           fontWeight: 600,
//                           padding: "4px 10px",
//                           borderRadius: "10px",
//                         }}
//                       >
//                         {classification}
//                       </Badge>
//                     </td>
//                   </tr>
//                 );
//               }
//             )}
//           </tbody>
//         </Table>
//       </div>
//     </BaseSurface>
//   );
// } 