"use client";
import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
import React, { useState, useEffect } from "react";
import { useOrgFilters } from "@/components/hooks/useOrgFilters";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useProductsRecipesSummary } from "@/services/product-service";
import { receipesDataFormatter } from "@/utils/data_formatters/smallPagesDataFormatter";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { formatDate } from "@/utils";

export default function RecipeInsights() {
  const { startDate: ctxStartDate, endDate: ctxEndDate } =
    useDashboardContext();

  const {
    isDeptLoading,
    isMasterProductsLoading,
    isProductsLoading,
    departmentOptions,
    masterProductOptions,
    productOptions,
  } = useOrgFilters();

  const [department, setDepartment] = useState("");
  const [masterProduct, setMasterProduct] = useState("");
  const [product, setProduct] = useState("");
  const [activeDateRange, setActiveDateRange] = useState("Today");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(ctxStartDate || null);
  const [endDate, setEndDate] = useState(ctxEndDate || null);

  // Sync context dates
  useEffect(() => {
    if (ctxStartDate) setStartDate(ctxStartDate);
    if (ctxEndDate) setEndDate(ctxEndDate);
  }, [ctxStartDate, ctxEndDate]);

  const styles = {
    headerBar: {
      background: "linear-gradient(90deg, #983fd1 0%, #621390 100%)",
      borderBottomLeftRadius: "30px",
      borderBottomRightRadius: "30px",
      padding: "25px 0 60px 0",
      marginTop: 60,
      marginBottom: 42,
    },
    headerTitle: {
      color: "#fff",
      fontSize: 38,
      fontWeight: 800,
      letterSpacing: "-1px",
      marginLeft: 12,
      marginBottom: 7,
    },
    headerSubtitle: {
      fontSize: 18,
      color: "rgba(255,255,255,0.84)",
      fontWeight: 400,
      marginLeft: 12,
    },
    analyticsBox: {
      background: "#fff",
      borderRadius: 22,
      boxShadow: "0 8px 36px rgba(44,37,68,0.07)",
      padding: "34px 40px",
      marginTop: "-60px",
      marginBottom: 46,
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
      transition: "all 0.15s",
    }),
    summaryCard: (bg) => ({
      background: bg,
      border: 0,
      borderRadius: 18,
      boxShadow: "0 8px 24px rgba(44,37,68,0.065)",
      padding: 0,
      minHeight: 78,
      display: "flex",
      alignItems: "stretch",
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
      letterSpacing: 1.2,
      fontSize: 15,
      border: "none",
      boxShadow: "none",
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
    exportBtn: {
      background: "#ff7800",
      color: "#fff",
      fontWeight: 700,
      borderRadius: 18,
      border: "none",
      padding: "10px 22px",
      marginRight: 8,
    },
    filterBtn: {
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
  };

  return (
    <div style={{ background: "#f2f3fb", minHeight: "100vh" }}>
      <div style={styles.headerBar}>
        <h1 style={styles.headerTitle}>Recipe Insights</h1>
        <p style={styles.headerSubtitle}>
          Deep analysis of recipe profitability, cost efficiency, and
          performance metrics
        </p>
      </div>
      <div style={styles.analyticsBox}>
        <ServiceRenderer
          queryHook={useProductsRecipesSummary}
          queryKey={[
            "productsRecipesHistory",
            {
              startdt: formatDate(startDate),
              enddt: formatDate(endDate),
              outlet: 1,
              userId: 7,
              departments: department,
              masterproducts: masterProduct,
              products: product,
            },
          ]}
          queryFn={() =>
            useProductsRecipesSummary({
              startdt: formatDate(startDate),
              enddt: formatDate(endDate),
              outlet: 1,
              userId: 7,
              departments: department,
              masterproducts: masterProduct,
              products: product,
            }).queryFn
          }
          queryArgs={[
            {
              startdt: formatDate(startDate),
              enddt: formatDate(endDate),
              outlet: 1,
              userId: 7,
              departments: department,
              masterproducts: masterProduct,
              products: product,
            },
          ]}
          formatter={receipesDataFormatter}
          shimmerCount={3}
        >
          {({ summaryCards, tableData }) => (
            <AnalyticsPage
              styles={styles}
              filters={[
                {
                  label: "Departments",
                  options: isDeptLoading ? [] : departmentOptions,
                  value: department,
                  onChange: setDepartment,
                },
                {
                  label: "Master Products",
                  options: isMasterProductsLoading ? [] : masterProductOptions,
                  value: masterProduct,
                  onChange: setMasterProduct,
                },
                {
                  label: "Products",
                  options: isProductsLoading ? [] : productOptions,
                  value: product,
                  onChange: setProduct,
                },
              ]}
              dateRangeOptions={[
                "Today",
                "Yesterday",
                "This Week",
                "This Month",
                "Custom",
              ]}
              activeDateRange={activeDateRange}
              onDateRangeChange={(range, start, end) => {
                setActiveDateRange(range);
                setStartDate(start);
                setEndDate(end);
              }}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              summaryCards={summaryCards}
              table={tableData}
              pillRow={styles.pillRow}
              datePill={styles.datePill}
              summaryCard={styles.summaryCard}
              iconCircle={styles.iconCircle}
              cardTitle={styles.cardTitle}
              cardValue={styles.cardValue}
              tableHeader={styles.tableHeader}
              analyser={styles.analyser}
              exportBtn={styles.exportBtn}
              filterBtn={styles.filterBtn}
              search={styles.search}
            />
          )}
        </ServiceRenderer>
      </div>
    </div>
  );
}
// "use client";
// import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
// import React, { useState } from "react";
// import { useOrgFilters } from "@/components/hooks/useOrgFilters";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import { useProductsRecipesSummary } from "@/services/product-service";
// import { receipesDataFormatter } from "@/utils/data_formatters/smallPagesDataFormatter";
// import { useDashboardContext } from "@/contexts/DashboardContext";

// export default function RecipeInsights() {
//     const { startDate, endDate } = useDashboardContext();

//   const {
//     isDeptLoading,
//     isMasterProductsLoading,
//     isProductsLoading,
//     departmentOptions,
//     masterProductOptions,
//     productOptions,
//   } = useOrgFilters();

//   const [department, setDepartment] = useState("");
//   const [masterProduct, setMasterProduct] = useState("");
//   const [product, setProduct] = useState("");
//   const [activeDateRange, setActiveDateRange] = useState("Today");
//   const [searchQuery, setSearchQuery] = useState("");

//   const styles = {
//     headerBar: {
//       background: "linear-gradient(90deg, #983fd1 0%, #621390 100%)",
//       borderBottomLeftRadius: "30px",
//       borderBottomRightRadius: "30px",
//       padding: "25px 0 60px 0",
//       marginTop: 60,
//       marginBottom: 42,
//     },
//     headerTitle: {
//       color: "#fff",
//       fontSize: 38,
//       fontWeight: 800,
//       letterSpacing: "-1px",
//       marginLeft: 12,
//       marginBottom: 7,
//     },
//     headerSubtitle: {
//       fontSize: 18,
//       color: "rgba(255,255,255,0.84)",
//       fontWeight: 400,
//       marginLeft: 12,
//     },
//     analyticsBox: {
//       background: "#fff",
//       borderRadius: 22,
//       boxShadow: "0 8px 36px rgba(44,37,68,0.07)",
//       padding: "34px 40px",
//       marginTop: "-60px",
//       marginBottom: 46,
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
//       boxShadow: "0 8px 24px rgba(44,37,68,0.065)",
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
//     exportBtn: {
//       background: "#ff7800",
//       color: "#fff",
//       fontWeight: 700,
//       borderRadius: 18,
//       border: "none",
//       padding: "10px 22px",
//       marginRight: 8,
//     },
//     filterBtn: {
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
//   };

//   return (
//     <div style={{ background: "#f2f3fb", minHeight: "100vh" }}>
//       <div style={styles.headerBar}>
//         <h1 style={styles.headerTitle}>Recipe Insights</h1>
//         <p style={styles.headerSubtitle}>
//           Deep analysis of recipe profitability, cost efficiency, and
//           performance metrics
//         </p>
//       </div>
//       <div style={styles.analyticsBox}>
//         <ServiceRenderer
//           queryHook={useProductsRecipesSummary}
//           queryKey={[
//             "productsRecipesHistory",
//             { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
//           ]}
//           queryFn={() =>
//             useProductsRecipesSummary({
//               startdt: startDate,
//               enddt: endDate,
//               outlet: 1,
//               userId: 7,
//             }).queryFn
//           }
//           queryArgs={[
//             { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
//           ]}
//           formatter={receipesDataFormatter}
//           shimmerCount={3}
//         >
//           {({ summaryCards, tableData }) => (
//             <AnalyticsPage
//               styles={styles}
//               filters={[
//                 {
//                   label: "Departments",
//                   options: isDeptLoading ? [] : departmentOptions,
//                   value: department,
//                   onChange: setDepartment,
//                 },
//                 {
//                   label: "Master Products",
//                   options: isMasterProductsLoading ? [] : masterProductOptions,
//                   value: masterProduct,
//                   onChange: setMasterProduct,
//                 },
//                 {
//                   label: "Products",
//                   options: isProductsLoading ? [] : productOptions,
//                   value: product,
//                   onChange: setProduct,
//                 },
//               ]}
//               dateRangeOptions={[
//                 "Today",
//                 "Yesterday",
//                 "This Week",
//                 "This Month",
//                 "Custom",
//               ]}
//               activeDateRange={activeDateRange}
//               onDateRangeChange={setActiveDateRange}
//               searchQuery={searchQuery}
//               onSearchChange={setSearchQuery}
//               summaryCards={summaryCards}
//               table={tableData}
//               pillRow={styles.pillRow}
//               datePill={styles.datePill}
//               summaryCard={styles.summaryCard}
//               iconCircle={styles.iconCircle}
//               cardTitle={styles.cardTitle}
//               cardValue={styles.cardValue}
//               tableHeader={styles.tableHeader}
//               analyser={styles.analyser}
//               exportBtn={styles.exportBtn}
//               filterBtn={styles.filterBtn}
//               search={styles.search}
//             />
//           )}
//         </ServiceRenderer>
//       </div>
//     </div>
//   );
// }
// "use client";
// import { FaPizzaSlice, FaBalanceScale, FaRupeeSign } from "react-icons/fa";
// import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
// import React, { useState } from "react";
// import { useOrgFilters } from "@/components/hooks/useOrgFilters";

// export default function RecipeInsights() {
//   // ✅ Get filters dynamically
//   const {
//     isDeptLoading,
//     isMasterProductsLoading,
//     isProductsLoading,
//     departmentOptions,
//     masterProductOptions,
//     productOptions,
//   } = useOrgFilters();

//   // ✅ Local state for controlled dropdowns
//   const [department, setDepartment] = useState("");
//   const [masterProduct, setMasterProduct] = useState("");
//   const [product, setProduct] = useState("");

// const styles = {
//   headerBar: {
//     background: "linear-gradient(90deg, #983fd1 0%, #621390 100%)",
//     borderBottomLeftRadius: "30px",
//     borderBottomRightRadius: "30px",
//     padding: "25px 0 60px 0",
//     marginTop: 60,
//     marginBottom: 42,
//   },
//   headerTitle: {
//     color: "#fff",
//     fontSize: 38,
//     fontWeight: 800,
//     letterSpacing: "-1px",
//     marginLeft: 12,
//     marginBottom: 7,
//   },
//   headerSubtitle: {
//     fontSize: 18,
//     color: "rgba(255,255,255,0.84)",
//     fontWeight: 400,
//     marginLeft: 12,
//   },
//   analyticsBox: {
//     background: "#fff",
//     borderRadius: 22,
//     boxShadow: "0 8px 36px rgba(44,37,68,0.07)",
//     padding: "34px 40px",
//     marginTop: "-60px",
//     marginBottom: 46,
//   },
//   pillRow: { fontWeight: 600 },
//   datePill: (active) => ({
//     background: active ? "#fff" : "transparent",
//     border: active ? "2px solid #ff7800" : "2px solid #ececec",
//     color: active ? "#ff7800" : "#1d2d35",
//     borderRadius: 32,
//     padding: "8px 26px",
//     fontWeight: 600,
//     fontSize: 16,
//     marginRight: 15,
//     boxShadow: active ? "0 2px 6px #ffe6d4" : "none",
//     transition: "all 0.15s",
//   }),
//   summaryCard: (bg) => ({
//     background: bg,
//     border: 0,
//     borderRadius: 18,
//     boxShadow: "0 8px 24px rgba(44,37,68,0.065)",
//     padding: 0,
//     minHeight: 78,
//     display: "flex",
//     alignItems: "stretch",
//   }),
//   iconCircle: (bg) => ({
//     width: 46,
//     height: 46,
//     background: bg,
//     borderRadius: 14,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 16,
//   }),
//   cardTitle: {
//     color: "#657073",
//     fontWeight: 700,
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   cardValue: { color: "#151246", fontWeight: 800, fontSize: 24 },
//   tableHeader: {
//     background: "#f6f5fa",
//     color: "#8a91b4",
//     fontWeight: 700,
//     letterSpacing: 1.2,
//     fontSize: 15,
//     border: "none",
//     boxShadow: "none",
//   },
//   analyser: {
//     background: "#ff7800",
//     color: "#fff",
//     fontWeight: 700,
//     borderRadius: 18,
//     border: "none",
//     padding: "10px 22px",
//     marginRight: 8,
//   },
//   exportBtn: {
//     background: "#ff7800",
//     color: "#fff",
//     fontWeight: 700,
//     borderRadius: 18,
//     border: "none",
//     padding: "10px 22px",
//     marginRight: 8,
//   },
//   filterBtn: {
//     background: "#ff7800",
//     color: "#fff",
//     fontWeight: 700,
//     borderRadius: 18,
//     border: "none",
//     padding: "10px 22px",
//   },
//   search: {
//     borderRadius: 16,
//     background: "#f7f8fa",
//     border: "1px solid #ececec",
//     padding: "10px 18px",
//     fontSize: 16,
//     color: "#202244",
//     fontWeight: 500,
//     width: 260,
//     outline: "none",
//     marginBottom: 10,
//     marginRight: 8,
//   },
// };

//   return (
//     <div style={{ background: "#f2f3fb", minHeight: "100vh" }}>
//       <div style={styles.headerBar}>
//         <h1 style={styles.headerTitle}>Recipe Insights</h1>
//         <p style={styles.headerSubtitle}>
//           Deep analysis of recipe profitability, cost efficiency, and
//           performance metrics
//         </p>
//       </div>
//       <div style={styles.analyticsBox}>
//         <AnalyticsPage
//           styles={styles}
//           filters={[
//             {
//               label: "Departments",
//               options: isDeptLoading ? [] : departmentOptions,
//               value: department,
//               onChange: setDepartment,
//             },
//             {
//               label: "Master Products",
//               options: isMasterProductsLoading ? [] : masterProductOptions,
//               value: masterProduct,
//               onChange: setMasterProduct,
//             },
//             {
//               label: "Products",
//               options: isProductsLoading ? [] : productOptions,
//               value: product,
//               onChange: setProduct,
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
//               id: "highMargin",
//               title: (
//                 <>
//                   <div
//                     style={{ color: "#00A650", fontWeight: 700, fontSize: 15 }}
//                   >
//                     High Margin
//                   </div>
//                   Profitable Products
//                 </>
//               ),
//               value: (
//                 <div>
//                   <div style={{ fontWeight: 600 }}>
//                     Products{" "}
//                     <span style={{ fontWeight: 400, float: "right" }}>1</span>
//                   </div>
//                   <div style={{ fontWeight: 600 }}>
//                     Total Sales{" "}
//                     <span style={{ fontWeight: 400, float: "right" }}>8K</span>
//                   </div>
//                   <div style={{ fontWeight: 600, color: "#00A650" }}>
//                     Shares{" "}
//                     <span
//                       style={{
//                         fontWeight: 400,
//                         float: "right",
//                         color: "#00A650",
//                       }}
//                     >
//                       5.1%
//                     </span>
//                   </div>
//                 </div>
//               ),
//               icon: "",
//               bgColor: "#E1FAEE",
//               iconBg: "#00A650",
//             },
//             {
//               id: "mediumMargin",
//               title: (
//                 <>
//                   <div
//                     style={{ color: "#FFB800", fontWeight: 700, fontSize: 15 }}
//                   >
//                     Medium Margin
//                   </div>
//                   Moderate Products
//                 </>
//               ),
//               value: (
//                 <div>
//                   <div style={{ fontWeight: 600 }}>
//                     Products{" "}
//                     <span style={{ fontWeight: 400, float: "right" }}>12</span>
//                   </div>
//                   <div style={{ fontWeight: 600 }}>
//                     Total Sales{" "}
//                     <span style={{ fontWeight: 400, float: "right" }}>
//                       ₹142K
//                     </span>
//                   </div>
//                   <div style={{ fontWeight: 600, color: "#FFB800" }}>
//                     Shares{" "}
//                     <span
//                       style={{
//                         fontWeight: 400,
//                         float: "right",
//                         color: "#FFB800",
//                       }}
//                     >
//                       94.6%
//                     </span>
//                   </div>
//                 </div>
//               ),
//               icon: "",
//               bgColor: "#FFF4DB",
//               iconBg: "#FFB800",
//             },
//             {
//               id: "lowMargin",
//               title: (
//                 <>
//                   <div
//                     style={{ color: "#ED175B", fontWeight: 700, fontSize: 15 }}
//                   >
//                     Low Margin
//                   </div>
//                   Low Making Products
//                 </>
//               ),
//               value: (
//                 <div>
//                   <div style={{ fontWeight: 600 }}>
//                     Products{" "}
//                     <span style={{ fontWeight: 400, float: "right" }}>0</span>
//                   </div>
//                   <div style={{ fontWeight: 600 }}>
//                     Total Sales{" "}
//                     <span style={{ fontWeight: 400, float: "right" }}>0K</span>
//                   </div>
//                   <div style={{ fontWeight: 600, color: "#ED175B" }}>
//                     Shares{" "}
//                     <span
//                       style={{
//                         fontWeight: 400,
//                         float: "right",
//                         color: "#ED175B",
//                       }}
//                     >
//                       0.0%
//                     </span>
//                   </div>
//                 </div>
//               ),
//               icon: "",
//               bgColor: "#FEE5EB",
//               iconBg: "#ED175B",
//             },
//           ]}
//           table={{
//             columns: [
//               { key: "product", label: "PRODUCT" },
//               { key: "itemsSold", label: "ITEMS SOLD" },
//               { key: "totalSales", label: "TOTAL SALES" },
//               { key: "makingCost", label: "MAKING COST" },
//               { key: "costPercent", label: "COST %" },
//             ],
//             rows: [
//               {
//                 product: (
//                   <>
//                     Butter Chicken (Full)
//                     <br />
//                     <span style={{ fontSize: 13, color: "#868DA6" }}>
//                       North Indian
//                     </span>
//                   </>
//                 ),
//                 itemsSold: 40,
//                 totalSales: (
//                   <>
//                     ₹18,480 <br />
//                     <span style={{ fontSize: 13, color: "#868DA6" }}>
//                       ₹420/item
//                     </span>
//                   </>
//                 ),
//                 makingCost: (
//                   <>
//                     ₹18,480 <br />
//                     <span style={{ fontSize: 13, color: "#868DA6" }}>
//                       ₹420/item
//                     </span>
//                   </>
//                 ),
//                 costPercent: "40.0%",
//               },
//               {
//                 product: (
//                   <>
//                     Chicken Biryani (Regular)
//                     <br />
//                     <span style={{ fontSize: 13, color: "#868DA6" }}>
//                       Hyderabadi
//                     </span>
//                   </>
//                 ),
//                 itemsSold: 38,
//                 totalSales: (
//                   <>
//                     ₹15,200 <br />
//                     <span style={{ fontSize: 13, color: "#868DA6" }}>
//                       ₹380/item
//                     </span>
//                   </>
//                 ),
//                 makingCost: (
//                   <>
//                     ₹6,080 <br />
//                     <span style={{ fontSize: 13, color: "#868DA6" }}>
//                       ₹160/item
//                     </span>
//                   </>
//                 ),
//                 costPercent: "40.0%",
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
//           exportBtn={styles.exportBtn}
//           filterBtn={styles.filterBtn}
//           search={styles.search}
//         />
//       </div>
//     </div>
//   );
// }

// // "use client";
// // import { FaPizzaSlice, FaBalanceScale, FaRupeeSign } from "react-icons/fa";
// // import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
// // import React from "react";

// // export default function RecipeInsights() {
// //   const styles = {
// //     headerBar: {
// //       background: "linear-gradient(90deg, #983fd1 0%, #621390 100%)",
// //       borderBottomLeftRadius: "30px",
// //       borderBottomRightRadius: "30px",
// //       padding: "25px 0 60px 0",
// //       marginTop: 60,
// //       marginBottom: 42,
// //     },
// //     headerTitle: {
// //       color: "#fff",
// //       fontSize: 38,
// //       fontWeight: 800,
// //       letterSpacing: "-1px",
// //       marginLeft: 12,
// //       marginBottom: 7,
// //     },
// //     headerSubtitle: {
// //       fontSize: 18,
// //       color: "rgba(255,255,255,0.84)",
// //       fontWeight: 400,
// //       marginLeft: 12,
// //     },
// //     analyticsBox: {
// //       background: "#fff",
// //       borderRadius: 22,
// //       boxShadow: "0 8px 36px rgba(44,37,68,0.07)",
// //       padding: "34px 40px",
// //       marginTop: "-60px",
// //       marginBottom: 46,
// //     },
// //     pillRow: { fontWeight: 600 },
// //     datePill: (active) => ({
// //       background: active ? "#fff" : "transparent",
// //       border: active ? "2px solid #ff7800" : "2px solid #ececec",
// //       color: active ? "#ff7800" : "#1d2d35",
// //       borderRadius: 32,
// //       padding: "8px 26px",
// //       fontWeight: 600,
// //       fontSize: 16,
// //       marginRight: 15,
// //       boxShadow: active ? "0 2px 6px #ffe6d4" : "none",
// //       transition: "all 0.15s",
// //     }),
// //     summaryCard: (bg) => ({
// //       background: bg,
// //       border: 0,
// //       borderRadius: 18,
// //       boxShadow: "0 8px 24px rgba(44,37,68,0.065)",
// //       padding: 0,
// //       minHeight: 78,
// //       display: "flex",
// //       alignItems: "stretch",
// //     }),
// //     iconCircle: (bg) => ({
// //       width: 46,
// //       height: 46,
// //       background: bg,
// //       borderRadius: 14,
// //       display: "flex",
// //       alignItems: "center",
// //       justifyContent: "center",
// //       marginRight: 16,
// //     }),
// //     cardTitle: {
// //       color: "#657073",
// //       fontWeight: 700,
// //       fontSize: 16,
// //       marginBottom: 4,
// //     },
// //     cardValue: { color: "#151246", fontWeight: 800, fontSize: 24 },
// //     tableHeader: {
// //       background: "#f6f5fa",
// //       color: "#8a91b4",
// //       fontWeight: 700,
// //       letterSpacing: 1.2,
// //       fontSize: 15,
// //       border: "none",
// //       boxShadow: "none",
// //     },
// //     analyser: {
// //       background: "#ff7800",
// //       color: "#fff",
// //       fontWeight: 700,
// //       borderRadius: 18,
// //       border: "none",
// //       padding: "10px 22px",
// //       marginRight: 8,
// //     },
// //     exportBtn: {
// //       background: "#ff7800",
// //       color: "#fff",
// //       fontWeight: 700,
// //       borderRadius: 18,
// //       border: "none",
// //       padding: "10px 22px",
// //       marginRight: 8,
// //     },
// //     filterBtn: {
// //       background: "#ff7800",
// //       color: "#fff",
// //       fontWeight: 700,
// //       borderRadius: 18,
// //       border: "none",
// //       padding: "10px 22px",
// //     },
// //     search: {
// //       borderRadius: 16,
// //       background: "#f7f8fa",
// //       border: "1px solid #ececec",
// //       padding: "10px 18px",
// //       fontSize: 16,
// //       color: "#202244",
// //       fontWeight: 500,
// //       width: 260,
// //       outline: "none",
// //       marginBottom: 10,
// //       marginRight: 8,
// //     },
// //   };

// //   return (
// //     <div style={{ background: "#f2f3fb", minHeight: "100vh" }}>
// //       <div style={styles.headerBar}>
// //         <h1 style={styles.headerTitle}>Recipe Insights</h1>
// //         <p style={styles.headerSubtitle}>
// //           Deep analysis of recipe profitability, cost efficiency, and
// //           performance metrics
// //         </p>
// //       </div>
// //       <div style={styles.analyticsBox}>
// //         <AnalyticsPage
// //           styles={styles}
// //           filters={[
// //             {
// //               label: "Departments",
// //               options: [{ value: "1", label: "Kitchen" }],
// //               value: "",
// //             },
// //             {
// //               label: "Master Products",
// //               options: [{ value: "1", label: "Main Course" }],
// //               value: "",
// //             },
// //             {
// //               label: "Products",
// //               options: [{ value: "1", label: "Butter Chicken" }],
// //               value: "",
// //             },
// //           ]}
// //           dateRangeOptions={[
// //             "Today",
// //             "Yesterday",
// //             "This Week",
// //             "This Month",
// //             "Custom",
// //           ]}
// //           activeDateRange="Today"
// //           summaryCards={[
// //             {
// //               id: "highMargin",
// //               title: (
// //                 <>
// //                   <div
// //                     style={{ color: "#00A650", fontWeight: 700, fontSize: 15 }}
// //                   >
// //                     High Margin
// //                   </div>
// //                   Profitable Products
// //                 </>
// //               ),
// //               value: (
// //                 <div>
// //                   <div style={{ fontWeight: 600 }}>
// //                     Products{" "}
// //                     <span style={{ fontWeight: 400, float: "right" }}>1</span>
// //                   </div>
// //                   <div style={{ fontWeight: 600 }}>
// //                     Total Sales{" "}
// //                     <span style={{ fontWeight: 400, float: "right" }}>8K</span>
// //                   </div>
// //                   <div style={{ fontWeight: 600, color: "#00A650" }}>
// //                     Shares{" "}
// //                     <span
// //                       style={{
// //                         fontWeight: 400,
// //                         float: "right",
// //                         color: "#00A650",
// //                       }}
// //                     >
// //                       5.1%
// //                     </span>
// //                   </div>
// //                 </div>
// //               ),
// //               icon: "",
// //               bgColor: "#E1FAEE",
// //               iconBg: "#00A650",
// //             },
// //             {
// //               id: "mediumMargin",
// //               title: (
// //                 <>
// //                   <div
// //                     style={{ color: "#FFB800", fontWeight: 700, fontSize: 15 }}
// //                   >
// //                     Medium Margin
// //                   </div>
// //                   Moderate Products
// //                 </>
// //               ),
// //               value: (
// //                 <div>
// //                   <div style={{ fontWeight: 600 }}>
// //                     Products{" "}
// //                     <span style={{ fontWeight: 400, float: "right" }}>12</span>
// //                   </div>
// //                   <div style={{ fontWeight: 600 }}>
// //                     Total Sales{" "}
// //                     <span style={{ fontWeight: 400, float: "right" }}>
// //                       ₹142K
// //                     </span>
// //                   </div>
// //                   <div style={{ fontWeight: 600, color: "#FFB800" }}>
// //                     Shares{" "}
// //                     <span
// //                       style={{
// //                         fontWeight: 400,
// //                         float: "right",
// //                         color: "#FFB800",
// //                       }}
// //                     >
// //                       94.6%
// //                     </span>
// //                   </div>
// //                 </div>
// //               ),
// //               icon: "",
// //               bgColor: "#FFF4DB",
// //               iconBg: "#FFB800",
// //             },
// //             {
// //               id: "lowMargin",
// //               title: (
// //                 <>
// //                   <div
// //                     style={{ color: "#ED175B", fontWeight: 700, fontSize: 15 }}
// //                   >
// //                     Low Margin
// //                   </div>
// //                   Low Making Products
// //                 </>
// //               ),
// //               value: (
// //                 <div>
// //                   <div style={{ fontWeight: 600 }}>
// //                     Products{" "}
// //                     <span style={{ fontWeight: 400, float: "right" }}>0</span>
// //                   </div>
// //                   <div style={{ fontWeight: 600 }}>
// //                     Total Sales{" "}
// //                     <span style={{ fontWeight: 400, float: "right" }}>0K</span>
// //                   </div>
// //                   <div style={{ fontWeight: 600, color: "#ED175B" }}>
// //                     Shares{" "}
// //                     <span
// //                       style={{
// //                         fontWeight: 400,
// //                         float: "right",
// //                         color: "#ED175B",
// //                       }}
// //                     >
// //                       0.0%
// //                     </span>
// //                   </div>
// //                 </div>
// //               ),
// //               icon: "",
// //               bgColor: "#FEE5EB",
// //               iconBg: "#ED175B",
// //             },
// //           ]}
// //           table={{
// //             columns: [
// //               { key: "product", label: "PRODUCT" },
// //               { key: "itemsSold", label: "ITEMS SOLD" },
// //               { key: "totalSales", label: "TOTAL SALES" },
// //               { key: "makingCost", label: "MAKING COST" },
// //               { key: "costPercent", label: "COST %" },
// //             ],
// //             rows: [
// //               {
// //                 product: (
// //                   <>
// //                     Butter Chicken (Full)
// //                     <br />
// //                     <span style={{ fontSize: 13, color: "#868DA6" }}>
// //                       North Indian
// //                     </span>
// //                   </>
// //                 ),
// //                 itemsSold: 40,
// //                 totalSales: (
// //                   <>
// //                     ₹18,480 <br />
// //                     <span style={{ fontSize: 13, color: "#868DA6" }}>
// //                       ₹420/item
// //                     </span>
// //                   </>
// //                 ),
// //                 makingCost: (
// //                   <>
// //                     ₹18,480 <br />
// //                     <span style={{ fontSize: 13, color: "#868DA6" }}>
// //                       ₹420/item
// //                     </span>
// //                   </>
// //                 ),
// //                 costPercent: "40.0%",
// //               },
// //               {
// //                 product: (
// //                   <>
// //                     Chicken Biryani (Regular)
// //                     <br />
// //                     <span style={{ fontSize: 13, color: "#868DA6" }}>
// //                       Hyderabadi
// //                     </span>
// //                   </>
// //                 ),
// //                 itemsSold: 38,
// //                 totalSales: (
// //                   <>
// //                     ₹15,200 <br />
// //                     <span style={{ fontSize: 13, color: "#868DA6" }}>
// //                       ₹380/item
// //                     </span>
// //                   </>
// //                 ),
// //                 makingCost: (
// //                   <>
// //                     ₹6,080 <br />
// //                     <span style={{ fontSize: 13, color: "#868DA6" }}>
// //                       ₹160/item
// //                     </span>
// //                   </>
// //                 ),
// //                 costPercent: "40.0%",
// //               },
// //             ],
// //           }}
// //           pillRow={styles.pillRow}
// //           datePill={styles.datePill}
// //           summaryCard={styles.summaryCard}
// //           iconCircle={styles.iconCircle}
// //           cardTitle={styles.cardTitle}
// //           cardValue={styles.cardValue}
// //           tableHeader={styles.tableHeader}
// //           analyser={styles.analyser}
// //           exportBtn={styles.exportBtn}
// //           filterBtn={styles.filterBtn}
// //           search={styles.search}
// //         />
// //       </div>
// //     </div>
// //   );
// // }
// // import { FaPizzaSlice, FaBalanceScale, FaRupeeSign } from "react-icons/fa";
// // import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";

// // export default function RecipeInsights() {
// //   return (
// //     <AnalyticsPage
// //       title="Recipe Insights"
// //       subtitle="Understand recipe costs and profitability"
// //       filters={[
// //         { label: "Recipes", options: [{ value: "1", label: "Veg Biryani" }] },
// //         { label: "Departments", options: [{ value: "1", label: "Kitchen" }] },
// //       ]}
// //       summaryCards={[
// //         {
// //           id: "totalCost",
// //           title: "Total Recipe Cost",
// //           value: "₹12,400",
// //           icon: <FaBalanceScale color="#fff" />,
// //           bgColor: "#FFF7F2",
// //           iconBg: "#FF5B22",
// //         },
// //         {
// //           id: "avgCost",
// //           title: "Avg Cost per Serving",
// //           value: "₹250",
// //           icon: <FaPizzaSlice color="#fff" />,
// //           bgColor: "#F0F7FF",
// //           iconBg: "#007BFF",
// //         },
// //         {
// //           id: "profit",
// //           title: "Profit Margin",
// //           value: "30%",
// //           icon: <FaRupeeSign color="#fff" />,
// //           bgColor: "#F2FBF5",
// //           iconBg: "#1AAB4A",
// //         },
// //       ]}
// //       table={{
// //         columns: [
// //           { key: "date", label: "DATE" },
// //           { key: "recipe", label: "RECIPE" },
// //           { key: "cost", label: "COST" },
// //           { key: "sellingPrice", label: "SELLING PRICE" },
// //           { key: "margin", label: "MARGIN" },
// //         ],
// //         rows: [
// //           {
// //             date: "1 Dec 2024, Sunday",
// //             recipe: "Veg Biryani",
// //             cost: "₹250",
// //             sellingPrice: "₹350",
// //             margin: "28%",
// //           },
// //         ],
// //       }}
// //     />
// //   );
// // }
