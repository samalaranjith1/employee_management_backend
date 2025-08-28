"use client";

import ComponentHeader from "@/components/common/ComponentHeader";
import React, { useRef } from "react";
import { Card, Table } from "react-bootstrap";
import { FaCube } from "react-icons/fa";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { useProductsUsageList } from "@/services/product-service";
import { productPerformanceDetailsDataFormmatter } from "@/utils/data_formatters/dashboardFormatter";
import ProductDetailsTable from "@/components/common/dashboard/TablesSort/ProductDetailsTable";

const ProductPerformanceDetails = () => {
  const { startDate, endDate } = useDashboardContext();
  const myScrollRef = useRef(null);

  // Styles (kept as is)
  const styles = {
    iconCircle: {
      backgroundColor: "#eef2ff",
      borderRadius: "50%",
      padding: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    tableScrollContainer: {
      maxHeight: "65vh",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    stickyTh: {
      position: "sticky",
      top: 0,
      background: "#fff",
      zIndex: 10,
      boxShadow: "0 2px 2px -1px rgba(0, 0, 0, 0.1)",
    },
    badge: {
      fontSize: "0.75rem",
      borderRadius: "12px",
      padding: "4px 8px",
      display: "inline-block",
    },
  };

  return (
    <Card
      className="m-2 p-3 bg-white rounded shadow-sm d-flex flex-column"
      style={{ height: "100%" }}
    >
      {/* Header */}
      <ComponentHeader
        title={"Product Performance Details"}
        description={""}
        titleColor={"fw-bold mb-0 text-primary"}
        cardBgColor={"none"}
        isShowArrows={false}
        scrollRef={myScrollRef}
        isExpandable={true}
        titleIcon={<FaCube size={20} />}
        text={""}
      />

      {/* ✅ ServiceRenderer (same approach as first component) */}
      <ServiceRenderer
        queryHook={useProductsUsageList}
        queryKey={[
          "productsUsageList",
          1,
          { startdt: startDate, enddt: endDate },
        ]}
        queryFn={() =>
          useProductsUsageList(1, {
            startdt: startDate,
            enddt: endDate,
          }).queryFn
        }
        queryArgs={[{ startdt: startDate, enddt: endDate,outlet:1,userId:7 }]}
        formatter={productPerformanceDetailsDataFormmatter}
        shimmerCount={6}
      >
        {(rowsData, refetch) => (
          <div style={styles.tableScrollContainer} ref={myScrollRef}>
            <ProductDetailsTable 
              rowsData={rowsData}
               styles={styles}/>
          </div>
        )}
      </ServiceRenderer>
    </Card>
  );
};

export default ProductPerformanceDetails;

// "use client";

// import ComponentHeader from "@/components/common/ComponentHeader";
// import React, { useRef } from "react";
// import { Card, Table } from "react-bootstrap";
// import { FaCube } from "react-icons/fa";

// const ProductPerformanceDetails = () => {
//   // Styles
//   const styles = {
//     iconCircle: {
//       backgroundColor: "#eef2ff",
//       borderRadius: "50%",
//       padding: "8px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     // This style will now be applied to a *new* container div
//     // specifically for the table's scrollable content.
//     tableScrollContainer: {
//       maxHeight: "65vh", // Set a maximum height for the scrollable area
//       overflowY: "auto", // Enable vertical scrolling for this container
//       // Adding flexbox properties to ensure it behaves well in any parent flex context
//       display: "flex",
//       flexDirection: "column",
//       flexGrow: 1, // Allow it to grow if in a flex container
//     },
//     stickyTh: {
//       position: "sticky",
//       top: 0,
//       background: "#fff", // Crucial: ensure header has a background
//       zIndex: 10, // Ensure it stays on top of scrolling content
//       boxShadow: "0 2px 2px -1px rgba(0, 0, 0, 0.1)", // Optional: subtle shadow
//     },
//     badge: {
//       fontSize: "0.75rem",
//       borderRadius: "12px",
//       padding: "4px 8px",
//       display: "inline-block",
//     },
//   };

//   // Data
//   const data = [
//     {
//       product: "Butter Chicken",
//       details: "Non-Veg Curry. ₹450",
//       items: 485,
//       netSales: "₹218,250",
//       discount: "₹12,450",
//       tax: "₹21,825",
//       makingCost: "₹70,275",
//       margin: "₹135,700",
//       marginPercent: "62.2%",
//     },
//     {
//       product: "Chicken Biryani",
//       details: "Biryani. ₹240",
//       items: 420,
//       netSales: "₹176,400",
//       discount: "₹8,820",
//       tax: "₹17,640",
//       makingCost: "₹69,300",
//       margin: "₹98,640",
//       marginPercent: "55.9%",
//     },
//     {
//       product: "Dal Makhani",
//       details: "Veg Curry. ₹320",
//       items: 380,
//       netSales: "₹121,600",
//       discount: "₹7,600",
//       tax: "₹12,160",
//       makingCost: "₹36,100",
//       margin: "₹78,340",
//       marginPercent: "64.4%",
//     },
//     {
//       product: "Paneer Butter Masala",
//       details: "Veg Curry. ₹380",
//       items: 295,
//       netSales: "₹112,100",
//       discount: "₹5,605",
//       tax: "₹11,210",
//       makingCost: "₹45,725",
//       margin: "₹61,770",
//       marginPercent: "59.2%",
//     },
//     {
//       product: "Tandoori Chicken",
//       details: "Tandoori. ₹500",
//       items: 275,
//       netSales: "₹137,500",
//       discount: "₹6,875",
//       tax: "₹13,750",
//       makingCost: "₹57,750",
//       margin: "₹72,625",
//       marginPercent: "52.8%",
//     },
//     {
//       product: "Masala Chai",
//       details: "Beverages. ₹60",
//       items: 890,
//       netSales: "₹53,400",
//       discount: "₹2,670",
//       tax: "₹5,340",
//       makingCost: "₹16,020",
//       margin: "₹32,080",
//       marginPercent: "60.1%",
//     },
//     {
//       product: "Mutton Biryani",
//       details: "Biryani. ₹700",
//       items: 185,
//       netSales: "₹129,500",
//       discount: "₹6,475",
//       tax: "₹12,950",
//       makingCost: "₹59,150",
//       margin: "₹64,400",
//       marginPercent: "49.7%",
//     },
//     {
//       product: "Naan",
//       details: "Bread. ₹100",
//       items: 650,
//       netSales: "₹65,000",
//       discount: "₹3,250",
//       tax: "₹6,500",
//       makingCost: "₹19,500",
//       margin: "₹39,000",
//       marginPercent: "60.0%",
//     },
//   ];
// const myScrollRef = useRef(null)
//   return (
//     <Card
//       className="m-2 p-3 bg-white rounded shadow-sm d-flex flex-column"
//       style={{ height: "100%" }}
//     >
//       {/* Header */}
//       <ComponentHeader
//         title={"Product Performance Details"}
//         description={""}
//         titleColor={"fw-bold mb-0 text-primary"}
//         cardBgColor={"none"}
//         isShowArrows={false}
//         scrollRef={myScrollRef}
//         isExpandable={true}
//         titleIcon={<FaCube size={20}/>}
//         text={""}
//       />

//       <div style={styles.tableScrollContainer}>
//         <Table hover responsive className="align-middle mb-0">
//           <thead>
//             <tr>
//               <th style={styles.stickyTh} className="text-primary">
//                 Product
//               </th>
//               <th style={styles.stickyTh} className="text-primary">
//                 #Items
//               </th>
//               <th style={styles.stickyTh} className="text-primary">
//                 Net Sales
//               </th>
//               <th style={styles.stickyTh} className="text-primary">
//                 Discount
//               </th>
//               <th style={styles.stickyTh} className="text-primary">
//                 Tax
//               </th>
//               <th style={styles.stickyTh} className="text-primary">
//                 Making Cost
//               </th>
//               <th style={styles.stickyTh} className="text-primary">
//                 Margin
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, idx) => (
//               <tr key={idx}>
//                 <td>
//                   <div className="fw-bold">{row.product}</div>
//                   <small className="text-muted">{row.details}</small>
//                 </td>
//                 <td className="fw-bold">{row.items}</td>
//                 <td className="text-success fw-bold">{row.netSales}</td>
//                 <td className="text-danger fw-bold">{row.discount}</td>
//                 <td className="text-info fw-bold">{row.tax}</td>
//                 <td className="text-danger fw-bold">{row.makingCost}</td>
//                 <td>
//                   <div className="text-success fw-bold">{row.margin}</div>
//                   <span
//                     style={{
//                       ...styles.badge,
//                       backgroundColor:
//                         parseFloat(row.marginPercent) >= 60
//                           ? "#d1fae5"
//                           : "#fef3c7",
//                       color:
//                         parseFloat(row.marginPercent) >= 60
//                           ? "#16a34a"
//                           : "#d97706",
//                     }}
//                   >
//                     {row.marginPercent}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </Card>
//   );
// };

// export default ProductPerformanceDetails;
