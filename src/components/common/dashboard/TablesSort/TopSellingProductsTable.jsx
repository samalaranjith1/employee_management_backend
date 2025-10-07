"use client";
import React from "react";
import BaseSurface from "./BaseSurface";
import { useTableSort } from "@/components/hooks/useTableSort";
import { IconChartColumn } from "@tabler/icons-react";

function TopSellingProductsTable({ revenueSummary = [] }) {
  const cardStyle = {
    borderRadius: 10,
    border: "1px solid #F0E8FF",
    padding: 14,
  };

  // ✅ Sorting hook
  const sort = useTableSort(revenueSummary);

  // ✅ Render sort arrow
  const renderSortArrow = (key) =>
    sort.sortKey === key ? (sort.direction === "asc" ? " ↑" : " ↓") : "";

  return (
    <BaseSurface
      title={
        <span>
          <div
            style={{
              background: "#3a65f3",
              borderRadius: "12px",
              padding: "8px",
              display: "inline-block",
            }}
          >
            <IconChartColumn stroke={2} color="#fff" size={20} />
          </div>{" "}
          Revenue Summary
        </span>
      }
      containerStyle={{
        borderRadius: 12,
        padding: 18,
        height: "100%",
        boxShadow: "0 8px 20px rgba(20,30,60,0.04)",
      }}
    >
      {/* Sortable header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: 600,
          marginBottom: 12,
          cursor: "pointer",
        }}
        onClick={() => sort.handleSort("amount")}
      >
        {/* <span>Amount{renderSortArrow("amount")}</span> */}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {sort.sortedData.map((item, idx) => (
          <div
            key={idx}
            style={{ ...cardStyle, backgroundColor: `${item.bgColor}` }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#7b7b8a",
                    display: "flex",
                    justifyContent: item.title
                      .toLowerCase()
                      .includes("margin %")
                      ? "space-between"
                      : "flex-start",
                  }}
                >
                  <span>{item.title}</span>
                  {item.title.toLowerCase().includes("margin %") && (
                    <span>%</span>
                  )}
                </div>

                {/* Amount */}
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    marginTop: 6,
                  }}
                >
                  {item.amount}
                </div>

                {/* Subtitle */}
                <div style={{
                  fontSize: 12,
                  color: item.textColor,

                }}>{item.sub}</div>
              </div>

              <div style={{ fontSize: 24 }}>{item.icon}</div>
            </div>
          </div>
        ))}
      </div>
    </BaseSurface>
  );
}

export default TopSellingProductsTable;

// "use client";
// import React from "react";
// import BaseSurface from "./BaseSurface";
// import { useTableSort } from "@/components/hooks/useTableSort";
// import { IconChartColumn } from "@tabler/icons-react";

// function TopSellingProductsTable({ revenueSummary = [] }) {
//   const cardStyle = {
//     borderRadius: 10,
//     border: "1px solid #F0E8FF",
//     padding: 14,
//   };

//   // ✅ Sorting hook
//   const sort = useTableSort(revenueSummary);

//   // ✅ Render sort arrow
//   const renderSortArrow = (key) =>
//     sort.sortKey === key ? (sort.direction === "asc" ? " ↑" : " ↓") : "";

//   return (
//     <BaseSurface
//       title={
//         <span>
//           <div style={{
//             background: '#3a65f3', // blue gradient for Figma match
//             borderRadius: '12px',
//             padding: '8px',
//             display: 'inline-block'
//           }}>
//             <IconChartColumn stroke={2} color="#fff" size={20} />
//           </div> Revenue Summary
//         </span>
//       }
//       containerStyle={{
//         borderRadius: 12,
//         padding: 18,
//         height: "100%",
//         boxShadow: "0 8px 20px rgba(20,30,60,0.04)",
//       }}
//     >
//       {/* Sortable header */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           fontWeight: 600,
//           marginBottom: 12,
//           cursor: "pointer",
//         }}
//         onClick={() => sort.handleSort("amount")}
//       >
//         {/* <span>Amount{renderSortArrow("amount")}</span> */}
//       </div>

//       <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//         {sort.sortedData.map((item, idx) => (
//           <div
//             key={idx}
//             style={{ ...cardStyle, backgroundColor: `${item.bgColor}` }}
//           >
//             <div className="d-flex">
//               <div>
//                 <div
//                   style={{
//                     fontSize: 13,
//                     color: "#7b7b8a",
//                     display: "flex",
//                     justifyContent: item.title
//                       .toLowerCase()
//                       .includes("margin %")
//                       ? "space-between"
//                       : "flex-start",
//                   }}
//                 >
//                   <span>{item.title}</span>
//                   {item.title.toLowerCase().includes("margin %") && (
//                     <span>%</span>
//                   )}
//                 </div>

//                 {/* Amount */}
//                 <div
//                   style={{
//                     fontSize: 22,
//                     fontWeight: 800,
//                     color: "#5B2EEA",
//                     marginTop: 6,
//                   }}
//                 >
//                   {item.amount}
//                 </div>

//                 {/* Subtitle */}
//                 <div style={{ fontSize: 12, color: "#9aa0b0" }}>{item.sub}</div>
//               </div>

//               <div className="p-2 m-2 ps-5" style={{ fontSize: "24px", marginLeft: 'auto' }}>{item.icon}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </BaseSurface>
//   );
// }

// export default TopSellingProductsTable;
