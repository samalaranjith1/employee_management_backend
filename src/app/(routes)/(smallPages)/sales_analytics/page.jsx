"use client";
import React, { useState } from "react";
import { FaRupeeSign, FaChartLine, FaTag } from "react-icons/fa";
import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
import { useOrgFilters } from "@/components/hooks/useOrgFilters";

export default function SalesAnalytics() {
  const {
    isDeptLoading,
    isMasterProductsLoading,
    isProductsLoading,
    departmentOptions,
    masterProductOptions,
    productOptions,
  } = useOrgFilters();

  // ✅ keep selected values in state
  const [department, setDepartment] = useState("");
  const [masterProduct, setMasterProduct] = useState("");
  const [product, setProduct] = useState("");

  const styles = {
    pageHeading: {
      background: "linear-gradient(90deg, #4f2dab 0%, #274db6 100%)",
      padding: "25px 0 60px 0",
      marginTop: 60,
      borderBottomLeftRadius: "30px",
      borderBottomRightRadius: "30px",
      marginBottom: 48,
    },
    pageTitle: {
      fontSize: 38,
      fontWeight: 800,
      color: "#fff",
      marginBottom: 7,
      marginLeft: 10,
    },
    pageSubtitle: {
      fontSize: 18,
      color: "rgba(255,255,255,0.84)",
      fontWeight: 400,
      marginLeft: 10,
      marginBottom: 0,
    },
    pillRow: { fontWeight: 600 },
    datePill: (active) => ({
      background: active ? "#fff" : "transparent",
      border: active ? "2px solid #ff7800" : "2px solid #ececec",
      color: active ? "#ff7800" : "#1d2d35",
      borderRadius: 32,
      padding: "8px 26px",
      fontWeight: 600,
      fontSize: 16,
      marginRight: 15,
      boxShadow: active ? "0 2px 6px #ffe6d4" : "none",
    }),
    summaryCard: (bg) => ({
      background: bg,
      border: 0,
      borderRadius: 18,
      boxShadow: "0 8px 24px rgba(44,37,68,0.06)",
      minHeight: 78,
    }),
    iconCircle: (bg) => ({
      width: 46,
      height: 46,
      background: bg,
      borderRadius: 14,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 16,
    }),
    cardTitle: {
      color: "#657073",
      fontWeight: 700,
      fontSize: 16,
      marginBottom: 4,
    },
    cardValue: { color: "#151246", fontWeight: 800, fontSize: 24 },
    tableHeader: {
      background: "#f6f5fa",
      color: "#8a91b4",
      fontWeight: 700,
      fontSize: 15,
      border: "none",
    },
    analyser: {
      background: "#ff7800",
      color: "#fff",
      fontWeight: 700,
      borderRadius: 18,
      border: "none",
      padding: "10px 22px",
      marginRight: 8,
    },
    export: {
      background: "#ff7800",
      color: "#fff",
      fontWeight: 700,
      borderRadius: 18,
      border: "none",
      padding: "10px 22px",
      marginRight: 8,
    },
    filter: {
      background: "#ff7800",
      color: "#fff",
      fontWeight: 700,
      borderRadius: 18,
      border: "none",
      padding: "10px 22px",
    },
    search: {
      borderRadius: 16,
      background: "#f7f8fa",
      border: "1px solid #ececec",
      padding: "10px 18px",
      fontSize: 16,
      color: "#202244",
      fontWeight: 500,
      width: 260,
      outline: "none",
      marginBottom: 10,
      marginRight: 8,
    },
    analyticsBox: {
      background: "#fff",
      borderRadius: 22,
      boxShadow: "0 8px 36px rgba(44,37,68,0.07)",
      padding: "34px 40px",
      marginTop: "-60px",
      marginBottom: 46,
    },
  };

  return (
    <div style={{ background: "#f2f3fb", minHeight: "100vh" }}>
      <div style={styles.pageHeading}>
        <h1 style={styles.pageTitle}>Sales Analytics</h1>
        <p style={styles.pageSubtitle}>
          Real-time insights into your restaurant sales performance and revenue
          trends
        </p>
      </div>

      <div style={styles.analyticsBox}>
        <AnalyticsPage
          styles={styles}
          filters={[
            {
              label: "Departments",
              options: isDeptLoading ? [] : departmentOptions,
              value: department,
              onChange: setDepartment, // ✅ controlled
            },
            {
              label: "Master Products",
              options: isMasterProductsLoading ? [] : masterProductOptions,
              value: masterProduct,
              onChange: setMasterProduct, // ✅ controlled
            },
            {
              label: "Products",
              options: isProductsLoading ? [] : productOptions,
              value: product,
              onChange: setProduct, // ✅ controlled
            },
          ]}
          dateRangeOptions={[
            "Today",
            "Yesterday",
            "This Week",
            "This Month",
            "Custom",
          ]}
          activeDateRange="Today"
          summaryCards={[
            {
              id: "netSales",
              title: "Net Sales",
              value: "₹136,140",
              icon: <FaChartLine color="#fff" size={24} />,
              bgColor: "#F0F7FF",
              iconBg: "#165DFF",
            },
            {
              id: "discount",
              title: "Discount",
              value: "₹14,140",
              icon: <FaTag color="#fff" size={24} />,
              bgColor: "#F8F0FF",
              iconBg: "#8000FF",
            },
            {
              id: "totalSales",
              title: "Total Sales",
              value: "₹150,280",
              icon: <FaRupeeSign color="#fff" size={24} />,
              bgColor: "#F0FFF8",
              iconBg: "#16C784",
            },
          ]}
          table={{
            columns: [
              { key: "date", label: "DATE" },
              { key: "product", label: "PRODUCT" },
              { key: "netSales", label: "NET SALES" },
              { key: "discount", label: "DISCOUNT" },
              { key: "totalSales", label: "TOTAL SALES" },
              { key: "itemsSold", label: "ITEMS SOLD" },
              { key: "orders", label: "ORDERS" },
            ],
            rows: [
              {
                date: "1 Dec 2024, Sunday",
                product: "Butter Chicken (Full)",
                netSales: "₹16,800",
                discount: "₹1,680",
                totalSales: "₹18,480",
                itemsSold: "40",
                orders: "35",
              },
            ],
          }}
          pillRow={styles.pillRow}
          datePill={styles.datePill}
          summaryCard={styles.summaryCard}
          iconCircle={styles.iconCircle}
          cardTitle={styles.cardTitle}
          cardValue={styles.cardValue}
          tableHeader={styles.tableHeader}
          analyser={styles.analyser}
          exportBtn={styles.export}
          filterBtn={styles.filter}
          search={styles.search}
        />
      </div>
    </div>
  );
}

// "use client";
// import React from "react";
// import { FaRupeeSign, FaChartLine, FaTag } from "react-icons/fa";
// import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";

// export default function SalesAnalytics() {
//   // Figma branding colors and style objects
//   const styles = {
//     pageHeading: {
//       background: "linear-gradient(90deg, #4f2dab 0%, #274db6 100%)",
//       padding: "25px 0 60px 0",
//       marginTop: 60,
//       borderTopLeftRadius: 0,
//       borderTopRightRadius: 0,
//       borderBottomLeftRadius: "30px",
//       borderBottomRightRadius: "30px",
//       marginBottom: 48,
//     },
//     pageTitle: {
//       fontSize: 38,
//       fontWeight: 800,
//       color: "#fff",
//       letterSpacing: "-1px",
//       marginBottom: 7,
//       marginLeft: 10,
//     },
//     pageSubtitle: {
//       fontSize: 18,
//       color: "rgba(255,255,255,0.84)",
//       fontWeight: 400,
//       marginLeft: 10,
//       marginBottom: 0,
//     },
//     pillRow: { fontWeight: 600 },
//     datePill: (active) => ({
//       background: active ? "#fff" : "transparent",
//       border: active ? "2px solid #ff7800" : "2px solid #ececec",
//       color: active ? "#ff7800" : "#1d2d35",
//       borderRadius: 32,
//       padding: "8px 26px",
//       fontWeight: 600,
//       fontSize: 16,
//       marginRight: 15,
//       boxShadow: active ? "0 2px 6px #ffe6d4" : "none",
//       transition: "all 0.15s",
//     }),
//     summaryCard: (bg) => ({
//       background: bg,
//       border: 0,
//       borderRadius: 18,
//       boxShadow: "0 8px 24px rgba(44,37,68,0.06)",
//       padding: 0,
//       minHeight: 78,
//       display: "flex",
//       alignItems: "stretch",
//     }),
//     iconCircle: (bg) => ({
//       width: 46,
//       height: 46,
//       background: bg,
//       borderRadius: 14,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       marginRight: 16,
//     }),
//     cardTitle: {
//       color: "#657073",
//       fontWeight: 700,
//       fontSize: 16,
//       marginBottom: 4,
//     },
//     cardValue: { color: "#151246", fontWeight: 800, fontSize: 24 },
//     tableHeader: {
//       background: "#f6f5fa",
//       color: "#8a91b4",
//       fontWeight: 700,
//       letterSpacing: 1.2,
//       fontSize: 15,
//       border: "none",
//       boxShadow: "none",
//     },
//     analyser: {
//       background: "#ff7800",
//       color: "#fff",
//       fontWeight: 700,
//       borderRadius: 18,
//       border: "none",
//       padding: "10px 22px",
//       marginRight: 8,
//     },
//     export: {
//       background: "#ff7800",
//       color: "#fff",
//       fontWeight: 700,
//       borderRadius: 18,
//       border: "none",
//       padding: "10px 22px",
//       marginRight: 8,
//     },
//     filter: {
//       background: "#ff7800",
//       color: "#fff",
//       fontWeight: 700,
//       borderRadius: 18,
//       border: "none",
//       padding: "10px 22px",
//     },
//     search: {
//       borderRadius: 16,
//       background: "#f7f8fa",
//       border: "1px solid #ececec",
//       padding: "10px 18px",
//       fontSize: 16,
//       color: "#202244",
//       fontWeight: 500,
//       width: 260,
//       outline: "none",
//       marginBottom: 10,
//       marginRight: 8,
//     },
//     analyticsBox: {
//       background: "#fff",
//       borderRadius: 22,
//       boxShadow: "0 8px 36px rgba(44,37,68,0.07)",
//       padding: "34px 40px",
//       marginTop: "-60px",
//       marginBottom: 46,
//     },
//   };

//   return (
//     <div style={{ background: "#f2f3fb", minHeight: "100vh" }}>
//       {/* Gradient page heading */}
//       <div style={styles.pageHeading}>
//         <h1 style={styles.pageTitle}>Sales Analytics</h1>
//         <p style={styles.pageSubtitle}>
//           Real-time insights into your restaurant sales performance and revenue
//           trends
//         </p>
//       </div>
//       <div style={styles.analyticsBox}>
//         <AnalyticsPage
//           styles={styles} // Pass entire style object
//           filters={[
//             {
//               label: "Departments",
//               options: [{ value: "1", label: "Kitchen" }],
//               value: "",
//             },
//             {
//               label: "Master Products",
//               options: [{ value: "1", label: "Main Course" }],
//               value: "",
//             },
//             {
//               label: "Products",
//               options: [{ value: "1", label: "Butter Chicken" }],
//               value: "",
//             },
//           ]}
//           dateRangeOptions={[
//             "Today",
//             "Yesterday",
//             "This Week",
//             "This Month",
//             "Custom",
//           ]}
//           activeDateRange="Today"
//           summaryCards={[
//             {
//               id: "netSales",
//               title: "Net Sales",
//               value: "₹136,140",
//               icon: <FaChartLine color="#fff" size={24} />,
//               bgColor: "#F0F7FF",
//               iconBg: "#165DFF",
//             },
//             {
//               id: "discount",
//               title: "Discount",
//               value: "₹14,140",
//               icon: <FaTag color="#fff" size={24} />,
//               bgColor: "#F8F0FF",
//               iconBg: "#8000FF",
//             },
//             {
//               id: "totalSales",
//               title: "Total Sales",
//               value: "₹150,280",
//               icon: <FaRupeeSign color="#fff" size={24} />,
//               bgColor: "#F0FFF8",
//               iconBg: "#16C784",
//             },
//           ]}
//           table={{
//             columns: [
//               { key: "date", label: "DATE" },
//               { key: "product", label: "PRODUCT" },
//               { key: "netSales", label: "NET SALES" },
//               { key: "discount", label: "DISCOUNT" },
//               { key: "totalSales", label: "TOTAL SALES" },
//               { key: "itemsSold", label: "ITEMS SOLD" },
//               { key: "orders", label: "ORDERS" },
//             ],
//             rows: [
//               {
//                 date: "1 Dec 2024, Sunday",
//                 product: "Butter Chicken (Full)",
//                 netSales: "₹16,800",
//                 discount: "₹1,680",
//                 totalSales: "₹18,480",
//                 itemsSold: "40",
//                 orders: "35",
//               },
//             ],
//           }}
//           pillRow={styles.pillRow}
//           datePill={styles.datePill}
//           summaryCard={styles.summaryCard}
//           iconCircle={styles.iconCircle}
//           cardTitle={styles.cardTitle}
//           cardValue={styles.cardValue}
//           tableHeader={styles.tableHeader}
//           analyser={styles.analyser}
//           exportBtn={styles.export}
//           filterBtn={styles.filter}
//           search={styles.search}
//         />
//       </div>
//     </div>
//   );
// }
// "use client"
// import { FaRupeeSign, FaChartLine, FaTag } from "react-icons/fa";
// import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";

// export default function SalesAnalytics() {
//   return (
//     <AnalyticsPage
//       title="Sales Analytics"
//       subtitle="Real-time insights into your restaurant sales performance and revenue trends"
//       filters={[
//         {
//           label: "Departments",
//           options: [{ value: "1", label: "Kitchen" }],
//           value: "",
//         },
//         {
//           label: "Master Products",
//           options: [{ value: "1", label: "Main Course" }],
//           value: "",
//         },
//         {
//           label: "Products",
//           options: [{ value: "1", label: "Butter Chicken" }],
//           value: "",
//         },
//       ]}
//       summaryCards={[
//         {
//           id: "netSales",
//           title: "Net Sales",
//           value: "₹136,140",
//           icon: <FaChartLine color="#fff" />,
//           bgColor: "#F0F7FF",
//           iconBg: "#007BFF",
//         },
//         {
//           id: "discount",
//           title: "Discount",
//           value: "₹14,140",
//           icon: <FaTag color="#fff" />,
//           bgColor: "#F8F0FF",
//           iconBg: "#8000FF",
//         },
//         {
//           id: "totalSales",
//           title: "Total Sales",
//           value: "₹150,280",
//           icon: <FaRupeeSign color="#fff" />,
//           bgColor: "#F0FFF8",
//           iconBg: "#28A745",
//         },
//       ]}
//       table={{
//         columns: [
//           { key: "date", label: "DATE" },
//           { key: "product", label: "PRODUCT" },
//           { key: "netSales", label: "NET SALES" },
//           { key: "discount", label: "DISCOUNT" },
//           { key: "totalSales", label: "TOTAL SALES" },
//           { key: "itemsSold", label: "ITEMS SOLD" },
//           { key: "orders", label: "ORDERS" },
//         ],
//         rows: [
//           {
//             date: "1 Dec 2024, Sunday",
//             product: "Butter Chicken (Full)",
//             netSales: "₹16,800",
//             discount: "₹1,680",
//             totalSales: "₹18,480",
//             itemsSold: "40",
//             orders: "35",
//           },
//         ],
//       }}
//     />
//   );
// }
