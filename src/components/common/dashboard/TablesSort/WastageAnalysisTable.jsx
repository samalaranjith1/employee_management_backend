"use client";

import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { FaBoxOpen, FaClock, FaUtensils } from "react-icons/fa";
import { useTableSort } from "@/components/hooks/useTableSort";

export default function WastageAnalysisTable({
  expiredItems,
  expiredProducts,
  rawMaterialWastage,
  tableCardStyle,
  scrollBodyStyle,
}) {
  const rawSort = useTableSort(rawMaterialWastage || []);
  const expiredItemsSort = useTableSort(expiredItems || []);
  const expiredProductsSort = useTableSort(expiredProducts || []);

  const renderSortArrow = (sort, key) =>
    sort.sortKey === key ? (sort.direction === "asc" ? " ↑" : " ↓") : "";

  const rowCardStyle = {
    background: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <Row className="g-3 mt-3">
      {/* Raw Material Wastage */}
      <Col md={4}>
        <div style={tableCardStyle}>
          <div
            style={{
              fontWeight: 600,
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <FaBoxOpen style={{ color: "#00bcd4" }} />
            Raw Material Wastage
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 600,
              marginBottom: 8,
              cursor: "pointer",
            }}
            onClick={() => rawSort.handleSort("total")}
          >
            <span>Name / Category</span>
            <span>Total{renderSortArrow(rawSort, "total")}</span>
          </div>

          <div style={scrollBodyStyle}>
            {rawSort.sortedData.map((item, idx) => (
              <div key={idx} style={rowCardStyle}>
                <div className="d-flex align-items-center gap-3">
                  <div style={{ fontSize: 20, color: "#00bcd4" }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 500 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "#666" }}>
                      {item.category} • {item.qty} • ₹{item.price}
                    </div>
                  </div>
                </div>
                <div style={{ fontWeight: 600 }}>₹{item.total}</div>
              </div>
            ))}
          </div>
        </div>
      </Col>

      {/* Expired Items */}
      <Col md={4}>
        <div style={tableCardStyle}>
          <div
            style={{
              fontWeight: 600,
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <FaClock style={{ color: "#3f51b5" }} />
            Expired Items
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 600,
              marginBottom: 8,
              cursor: "pointer",
            }}
            onClick={() => expiredItemsSort.handleSort("total")}
          >
            <span>Name / Category</span>
            <span>Total{renderSortArrow(expiredItemsSort, "total")}</span>
          </div>

          <div style={scrollBodyStyle}>
            {expiredItemsSort.sortedData.map((item, idx) => (
              <div key={idx} style={rowCardStyle}>
                <div>
                  <div style={{ fontWeight: 500 }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>
                    {item.category} • {item.qty} • ₹{item.price}
                  </div>
                  <div style={{ fontSize: 12, color: "#3f51b5" }}>
                    Expired: {item.date}
                  </div>
                </div>
                <div style={{ fontWeight: 600 }}>₹{item.total}</div>
              </div>
            ))}
          </div>
        </div>
      </Col>

      {/* Expired Products */}
      <Col md={4}>
        <div style={tableCardStyle}>
          <div
            style={{
              fontWeight: 600,
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <FaUtensils style={{ color: "#7b1fa2" }} />
            Expired Products
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 600,
              marginBottom: 8,
              cursor: "pointer",
            }}
            onClick={() => expiredProductsSort.handleSort("total")}
          >
            <span>Name / Category</span>
            <span>Total{renderSortArrow(expiredProductsSort, "total")}</span>
          </div>

          <div style={scrollBodyStyle}>
            {expiredProductsSort.sortedData.map((item, idx) => (
              <div key={idx} style={rowCardStyle}>
                <div>
                  <div style={{ fontWeight: 500 }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>
                    {item.category} • ₹{item.price}
                  </div>
                  <div style={{ fontSize: 12, color: "#7b1fa2" }}>
                    Prepared: {item.date}
                  </div>
                </div>
                <div style={{ fontWeight: 600 }}>₹{item.total}</div>
              </div>
            ))}
          </div>
        </div>
      </Col>
    </Row>
  );
}
// "use client";
// import React from "react";
// import { Row, Col } from "react-bootstrap";
// import { FaBox, FaClock, FaUtensils } from "react-icons/fa";
// import { useTableSort } from "@/components/hooks/useTableSort";

// function WastageAnalysisTable({
//   expiredItems,
//   expiredProducts,
//   rawMaterialWastage,
//   tableCardStyle,
//   scrollBodyStyle,
// }) {
//   // ✅ Sorting hooks
//   const rawSort = useTableSort(rawMaterialWastage || []);
//   const expiredItemsSort = useTableSort(expiredItems || []);
//   const expiredProductsSort = useTableSort(expiredProducts || []);

//   const renderSortArrow = (sort, key) =>
//     sort.sortKey === key ? (sort.direction === "asc" ? " ↑" : " ↓") : "";

//   // ✅ Common card style for rows
//   const rowCardStyle = {
//     background: "#fff",
//     borderRadius: "12px",
//     padding: "12px",
//     marginBottom: "10px",
//     boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   };

//   return (
//     <Row className="g-3 mt-3">
//       {/* Raw Material Wastage */}
//       <Col md={4}>
//         <div style={tableCardStyle}>
//           <div
//             style={{
//               fontWeight: "600",
//               fontSize: "16px",
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               marginBottom: "12px",
//             }}
//           >
//             <FaBox style={{ color: "#00bcd4" }} />
//             Raw Material Wastage
//           </div>

//           {/* Sortable Header */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               fontWeight: 600,
//               marginBottom: 8,
//               cursor: "pointer",
//             }}
//             onClick={() => rawSort.handleSort("total")}
//           >
//             <span>Name / Category</span>
//             <span>Total{renderSortArrow(rawSort, "total")}</span>
//           </div>

//           <div style={scrollBodyStyle}>
//             {rawSort.sortedData.map((item, idx) => (
//               <div key={idx} style={rowCardStyle}>
//                 <div className="d-flex align-items-center gap-3">
//                   <div style={{ fontSize: "20px", color: "#00bcd4" }}>
//                     {item.icon}
//                   </div>
//                   <div>
//                     <div style={{ fontWeight: "500" }}>{item.name}</div>
//                     <div style={{ fontSize: "12px", color: "#666" }}>
//                       {item.category} • {item.qty} • ₹{item.price}
//                     </div>
//                   </div>
//                 </div>
//                 <div style={{ fontWeight: "600" }}>₹{item.total}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </Col>

//       {/* Expired Items */}
//       <Col md={4}>
//         <div style={tableCardStyle}>
//           <div
//             style={{
//               fontWeight: "600",
//               fontSize: "16px",
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               marginBottom: "12px",
//             }}
//           >
//             <FaClock style={{ color: "#3f51b5" }} />
//             Expired Items
//           </div>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               fontWeight: 600,
//               marginBottom: 8,
//               cursor: "pointer",
//             }}
//             onClick={() => expiredItemsSort.handleSort("total")}
//           >
//             <span>Name / Category</span>
//             <span>Total{renderSortArrow(expiredItemsSort, "total")}</span>
//           </div>

//           <div style={scrollBodyStyle}>
//             {expiredItemsSort.sortedData.map((item, idx) => (
//               <div key={idx} style={rowCardStyle}>
//                 <div>
//                   <div style={{ fontWeight: "500" }}>{item.name}</div>
//                   <div style={{ fontSize: "12px", color: "#666" }}>
//                     {item.category} • {item.qty} • ₹{item.price}
//                   </div>
//                   <div style={{ fontSize: "12px", color: "#3f51b5" }}>
//                     Expired: {item.date}
//                   </div>
//                 </div>
//                 <div style={{ fontWeight: "600" }}>₹{item.total}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </Col>

//       {/* Expired Products */}
//       <Col md={4}>
//         <div style={tableCardStyle}>
//           <div
//             style={{
//               fontWeight: "600",
//               fontSize: "16px",
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               marginBottom: "12px",
//             }}
//           >
//             <FaUtensils style={{ color: "#7b1fa2" }} />
//             Expired Products
//           </div>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               fontWeight: 600,
//               marginBottom: 8,
//               cursor: "pointer",
//             }}
//             onClick={() => expiredProductsSort.handleSort("total")}
//           >
//             <span>Name / Category</span>
//             <span>Total{renderSortArrow(expiredProductsSort, "total")}</span>
//           </div>

//           <div style={scrollBodyStyle}>
//             {expiredProductsSort.sortedData.map((item, idx) => (
//               <div key={idx} style={rowCardStyle}>
//                 <div>
//                   <div style={{ fontWeight: "500" }}>{item.name}</div>
//                   <div style={{ fontSize: "12px", color: "#666" }}>
//                     {item.category} • ₹{item.price}
//                   </div>
//                   <div style={{ fontSize: "12px", color: "#7b1fa2" }}>
//                     Prepared: {item.date}
//                   </div>
//                 </div>
//                 <div style={{ fontWeight: "600" }}>₹{item.total}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </Col>
//     </Row>
//   );
// }

// export default WastageAnalysisTable;

// "use client";
// import React from "react";
// import { Row, Col } from "react-bootstrap";
// import { FaBox, FaClock, FaUtensils } from "react-icons/fa";
// // import div from "./div";
// import { useTableSort } from "@/components/hooks/useTableSort";

// function WastageAnalysisTable({
//   expiredItems,
//   expiredProducts,
//   rawMaterialWastage,
//   tableCardStyle,
//   scrollBodyStyle,
// }) {
//   // ✅ Sorting hooks for each dataset
//   const rawSort = useTableSort(rawMaterialWastage || []);
//   const expiredItemsSort = useTableSort(expiredItems || []);
//   const expiredProductsSort = useTableSort(expiredProducts || []);

//   const renderSortArrow = (sort, key) =>
//     sort.sortKey === key ? (sort.direction === "asc" ? " ↑" : " ↓") : "";

//   return (
//     <Row className="g-3 mt-3">
//       <Col md={4}>
//         <div
//           title={
//             <span className="d-flex align-items-center gap-2">
//               <FaBox style={{ color: "#00bcd4" }} /> Raw Material Wastage
//             </span>
//           }
//           containerStyle={tableCardStyle}
//           bodyStyle={scrollBodyStyle}
//         >
//           {/* Sortable header */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               fontWeight: 600,
//               marginBottom: 8,
//               cursor: "pointer",
//             }}
//             onClick={() => rawSort.handleSort("total")}
//           >
//             <span>Name / Category</span>
//             <span>Total{renderSortArrow(rawSort, "total")}</span>
//           </div>

//           {rawSort.sortedData.map((item, idx) => (
//             <div
//               key={idx}
//               className="d-flex align-items-center justify-content-between py-2 border-bottom"
//             >
//               <div className="d-flex align-items-center gap-3">
//                 <div style={{ fontSize: "20px", color: "#00bcd4" }}>
//                   {item.icon}
//                 </div>
//                 <div>
//                   <div style={{ fontWeight: "500" }}>{item.name}</div>
//                   <div style={{ fontSize: "12px", color: "#666" }}>
//                     {item.category} • {item.qty} • ₹{item.price}
//                   </div>
//                 </div>
//               </div>
//               <div style={{ fontWeight: "600" }}>₹{item.total}</div>
//             </div>
//           ))}
//         </div>
//       </Col>

//       <Col md={4}>
//         <div
//           title={
//             <span className="d-flex align-items-center gap-2">
//               <FaClock style={{ color: "#3f51b5" }} /> Expired Items
//             </span>
//           }
//           containerStyle={tableCardStyle}
//           bodyStyle={scrollBodyStyle}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               fontWeight: 600,
//               marginBottom: 8,
//               cursor: "pointer",
//             }}
//             onClick={() => expiredItemsSort.handleSort("total")}
//           >
//             <span>Name / Category</span>
//             <span>Total{renderSortArrow(expiredItemsSort, "total")}</span>
//           </div>

//           {expiredItemsSort.sortedData.map((item, idx) => (
//             <div
//               key={idx}
//               className="d-flex align-items-center justify-content-between py-2 border-bottom"
//             >
//               <div>
//                 <div style={{ fontWeight: "500" }}>{item.name}</div>
//                 <div style={{ fontSize: "12px", color: "#666" }}>
//                   {item.category} • {item.qty} • ₹{item.price}
//                 </div>
//                 <div style={{ fontSize: "12px", color: "#3f51b5" }}>
//                   Expired: {item.date}
//                 </div>
//               </div>
//               <div style={{ fontWeight: "600" }}>₹{item.total}</div>
//             </div>
//           ))}
//         </div>
//       </Col>

//       <Col md={4}>
//         <div
//           title={
//             <span className="d-flex align-items-center gap-2">
//               <FaUtensils style={{ color: "#7b1fa2" }} /> Expired Products
//             </span>
//           }
//           containerStyle={tableCardStyle}
//           bodyStyle={scrollBodyStyle}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               fontWeight: 600,
//               marginBottom: 8,
//               cursor: "pointer",
//             }}
//             onClick={() => expiredProductsSort.handleSort("total")}
//           >
//             <span>Name / Category</span>
//             <span>Total{renderSortArrow(expiredProductsSort, "total")}</span>
//           </div>

//           {expiredProductsSort.sortedData.map((item, idx) => (
//             <div
//               key={idx}
//               className="d-flex align-items-center justify-content-between py-2 border-bottom"
//             >
//               <div>
//                 <div style={{ fontWeight: "500" }}>{item.name}</div>
//                 <div style={{ fontSize: "12px", color: "#666" }}>
//                   {item.category} • ₹{item.price}
//                 </div>
//                 <div style={{ fontSize: "12px", color: "#7b1fa2" }}>
//                   Prepared: {item.date}
//                 </div>
//               </div>
//               <div style={{ fontWeight: "600" }}>₹{item.total}</div>
//             </div>
//           ))}
//         </div>
//       </Col>
//     </Row>
//   );
// }

// export default WastageAnalysisTable;
