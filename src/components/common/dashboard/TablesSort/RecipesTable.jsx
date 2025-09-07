"use client";
import React from "react";
import BaseSurface from "./BaseSurface";
import { useTableSort } from "@/components/hooks/useTableSort";

function RecipesTable({ title, data, bgColor }) {
  // ✅ Sorting hook
  const sort = useTableSort(data || []);

  // ✅ Render sort arrow
  const renderSortArrow = (key) =>
    sort.sortKey === key ? (sort.direction === "asc" ? " ↑" : " ↓") : "";

  // ✅ Columns definition
  const columns = [
    { key: "product", label: "Product", spanKey: "subtitle" },
    { key: "items", label: "Items", spanKey: "stock" },
    { key: "cost", label: "Cost" },
    { key: "costPct", label: "Cost %" },
    { key: "sales", label: "Sales" },
  ];

  return (
    <div
      title={title}
      containerStyle={{
        border: "none",
        background: bgColor,
        borderRadius: "12px",
        padding: "1rem",
        height: "65vh",
        display: "flex",
        flexDirection: "column",
        width: "110%",
        marginLeft: "-20px",
      }}
      bodyStyle={{
        flexGrow: 1,
        overflow: "auto", // prevent double scrollbars
      }}
    >
      {/* ✅ Scrollable wrapper */}
      <div
        style={{
          flexGrow: 1,
          overflowX: "auto",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            width: "100%",
            maxHeight: "400px", // fixed height needed for vertical scroll
            overflow: "auto", // vertical scroll
            border: "1px solid #ccc",
          }}
        >
          {/* Sticky Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
              fontWeight: 600,
              padding: "0.5rem 1rem",
              background: "#fff",
              position: "sticky",
              top: 0,
              zIndex: 1000,
              borderBottom: "1px solid #ddd",
            }}
          >
            {columns.map((col) => (
              <div
                key={col.key}
                style={{
                  textAlign:
                    col.key === "product"
                      ? "left"
                      : col.key === "items"
                      ? "center"
                      : "right",
                  cursor: "pointer",
                }}
                onClick={() => sort.handleSort(col.key)}
              >
                {col.label}
                {renderSortArrow(col.key)}
              </div>
            ))}
          </div>

          {/* ✅ Table body rows */}
          {sort.sortedData?.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", // match header
                padding: "0.75rem 1rem",
                alignItems: "center",
                background: idx % 2 === 0 ? "#fafafa" : "#fff",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <div>
                <div style={{ fontWeight: 500 }}>{item.product}</div>
                {item.subtitle && (
                  <div style={{ fontSize: "0.85rem", color: "#666" }}>
                    {item.subtitle}
                  </div>
                )}
              </div>
              <div style={{ textAlign: "center" }}>
                <div>{item.items}</div>
                {item.stock && (
                  <div style={{ fontSize: "0.8rem", color: "#999" }}>
                    {item.stock}
                  </div>
                )}
              </div>
              <div style={{ textAlign: "right" }}>{item.cost}</div>
              <div style={{ textAlign: "right" }}>
                <span
                  style={{
                    background: `${item.costPctColor}20`,
                    color: item.costPctColor,
                    padding: "4px 8px",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                  }}
                >
                  {item.costPct}
                </span>
              </div>
              <div style={{ textAlign: "right" }}>{item.sales}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecipesTable;

// "use client";
// import React from "react";
// import BaseSurface from "./BaseSurface";
// import { useTableSort } from "@/components/hooks/useTableSort";

// function RecipesTable({ title, data, bgColor }) {
//   // ✅ Sorting hook
//   const sort = useTableSort(data || []);

//   // ✅ Render sort arrow
//   const renderSortArrow = (key) =>
//     sort.sortKey === key ? (sort.direction === "asc" ? " ↑" : " ↓") : "";

//   // ✅ Columns definition
//   const columns = [
//     { key: "product", label: "Product", spanKey: "subtitle" },
//     { key: "items", label: "Items", spanKey: "stock" },
//     { key: "cost", label: "Cost" },
//     { key: "costPct", label: "Cost %" },
//     { key: "sales", label: "Sales" },
//   ];

//   return (
//     <BaseSurface
//       title={title}
//       containerStyle={{
//         border: "none",
//         background: bgColor,
//         borderRadius: "12px",
//         padding: "1rem",
//         height: "65vh",
//         display: "flex",
//         flexDirection: "column",
//         width: "110%",
//         marginLeft: "-20px",
//       }}
//       bodyStyle={{ flexGrow: 1, overflowY: "auto" }}
//     >
//       {/* Fixed header */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "2fr 1fr 1fr 1fr",
//           fontWeight: 600,
//           padding: "0.5rem 1rem",
//           background: "#fff",
//           position: "sticky",
//           top: 0,
//           zIndex: 2,
//           borderBottom: "1px solid #ddd",
//         }}
//       >
//         {columns.map((col) => (
//           <div
//             key={col.key}
//             style={{
//               textAlign:
//                 col.key === "product"
//                   ? "left"
//                   : col.key === "items"
//                   ? "center"
//                   : "right",
//               cursor: "pointer",
//             }}
//             onClick={() => sort.handleSort(col.key)}
//           >
//             {col.label}
//             {renderSortArrow(col.key)}
//           </div>
//         ))}
//       </div>

//       {/* Table body rows */}
//       {sort.sortedData?.map((item, idx) => (
//         <div
//           key={idx}
//           style={{
//             display: "grid",
//             gridTemplateColumns: "2fr 1fr 1fr 1fr",
//             padding: "0.75rem 1rem",
//             alignItems: "center",
//             background: idx % 2 === 0 ? "#fafafa" : "#fff",
//             borderBottom: "1px solid #f0f0f0",
//           }}
//         >
//           <div>
//             <div style={{ fontWeight: 500 }}>{item.product}</div>
//             {item.subtitle && (
//               <div style={{ fontSize: "0.85rem", color: "#666" }}>
//                 {item.subtitle}
//               </div>
//             )}
//           </div>
//           <div style={{ textAlign: "center" }}>
//             <div>{item.items}</div>
//             {item.stock && (
//               <div style={{ fontSize: "0.8rem", color: "#999" }}>
//                 {item.stock}
//               </div>
//             )}
//           </div>
//           <div style={{ textAlign: "right" }}>{item.cost}</div>
//           <div style={{ textAlign: "right" }}>
//             <span
//               style={{
//                 background: `${item.costPctColor}20`,
//                 color: item.costPctColor,
//                 padding: "4px 8px",
//                 borderRadius: "6px",
//                 fontSize: "0.85rem",
//                 fontWeight: 500,
//               }}
//             >
//               {item.costPct}
//             </span>
//           </div>
//         </div>
//       ))}
//     </BaseSurface>
//   );
// }

// export default RecipesTable;
