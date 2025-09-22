"use client";
import React, { useState, useEffect } from "react";
import { useOrgFilters } from "@/components/hooks/useOrgFilters";
import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { useItemsPriceChangeRecentList } from "@/services/item-service";
import { itemPriceChangeFormatter } from "@/utils/data_formatters/smallPagesDataFormatter";
import { formatDate } from "@/utils";

export default function ItemPriceChangeAnalytics() {
  const { startDate: ctxStartDate, endDate: ctxEndDate } =
    useDashboardContext();
  const { isSuppliersLoading, isItemsLoading, supplierOptions, itemOptions } =
    useOrgFilters();

  // ✅ Local state for filters & dates
  const [supplier, setSupplier] = useState("");
  const [item, setItem] = useState("");
  const [activeDateRange, setActiveDateRange] = useState("Today");
  const [searchQuery, setSearchQuery] = useState("");

  const [startDate, setStartDate] = useState(ctxStartDate || null);
  const [endDate, setEndDate] = useState(ctxEndDate || null);

  // ✅ Sync with context on load
  useEffect(() => {
    if (ctxStartDate) setStartDate(ctxStartDate);
    if (ctxEndDate) setEndDate(ctxEndDate);
  }, [ctxStartDate, ctxEndDate]);

  const styles = {
    headerBar: {
      background: "linear-gradient(90deg, #4f2dab, #8240c0)",
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
      boxShadow: "0 8px 24px rgba(44,37,68,0.06)",
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
      {/* Header */}
      <div style={styles.headerBar}>
        <h1 style={styles.headerTitle}>Item Price Change Analytics</h1>
        <p style={styles.headerSubtitle}>
          Track item price fluctuations and their financial impact
        </p>
      </div>

      {/* Analytics Section */}
      <div style={styles.analyticsBox}>
        <ServiceRenderer
          queryHook={useItemsPriceChangeRecentList}
          queryKey={[
            "itemsPriceChangeRecentList",
            {
              startdt: formatDate(startDate),
              enddt: formatDate(endDate),
              outlet: 1,
              userId: 7,
              supplierId: supplier?.id || null,
              itemId: item?.id || null,
            },
          ]}
          queryFn={() =>
            useItemsPriceChangeRecentList({
              startdt: formatDate(startDate),
              enddt: formatDate(endDate),
              outlet: 1,
              userId: 7,
              suppliers: supplier || null,
              items: item || null,
            }).queryFn
          }
          queryArgs={[
            {
              startdt: formatDate(startDate),
              enddt: formatDate(endDate),
              outlet: 1,
              userId: 7,
              suppliers: supplier || null,
              items: item || null,
            },
          ]}
          formatter={itemPriceChangeFormatter}
          shimmerCount={3}
        >
          {({ summaryCards, tableData }) => (
            <AnalyticsPage
              styles={styles}
              filters={[
                {
                  label: "Supplier",
                  options: isSuppliersLoading ? [] : supplierOptions,
                  value: supplier,
                  onChange: setSupplier,
                },
                {
                  label: "Items",
                  options: isItemsLoading ? [] : itemOptions,
                  value: item,
                  onChange: setItem,
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
              onAnalyse={() =>
                console.log("Analyse clicked with:", {
                  supplier,
                  item,
                  activeDateRange,
                  searchQuery,
                  startDate: formatDate(startDate),
                  endDate: formatDate(endDate),
                })
              }
              onExport={() =>
                console.log("Export clicked with:", {
                  supplier,
                  item,
                  activeDateRange,
                  searchQuery,
                  startDate: formatDate(startDate),
                  endDate: formatDate(endDate),
                })
              }
              onFilter={() =>
                console.log("Filter clicked with:", {
                  supplier,
                  item,
                  activeDateRange,
                  searchQuery,
                  startDate: formatDate(startDate),
                  endDate: formatDate(endDate),
                })
              }
            />
          )}
        </ServiceRenderer>
      </div>
    </div>
  );
}
// "use client";
// import React, { useState } from "react";
// import { useOrgFilters } from "@/components/hooks/useOrgFilters";
// import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import { useItemsPriceChangeRecentList } from "@/services/item-service";
// import { itemPriceChangeFormatter } from "@/utils/data_formatters/smallPagesDataFormatter";

// export default function ItemPriceChangeAnalytics() {
//   const { startDate, endDate } = useDashboardContext();
//   const { isSuppliersLoading, isItemsLoading, supplierOptions, itemOptions } =
//     useOrgFilters();

//   const [supplier, setSupplier] = useState("");
//   const [item, setItem] = useState("");
//   const [activeDateRange, setActiveDateRange] = useState("Today");
//   const [searchQuery, setSearchQuery] = useState("");

//   const styles = {
//     // ✅ your existing styles untouched
//     headerBar: {
//       background: "linear-gradient(90deg, #4f2dab, #8240c0)",
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
//       {/* Header */}
//       <div style={styles.headerBar}>
//         <h1 style={styles.headerTitle}>Item Price Change Analytics</h1>
//         <p style={styles.headerSubtitle}>
//           Track item price fluctuations and their financial impact
//         </p>
//       </div>

//       {/* Analytics Section */}
//       <div style={styles.analyticsBox}>
//         <ServiceRenderer
//           queryHook={useItemsPriceChangeRecentList}
//           queryKey={[
//             "itemsPriceChangeRecentList",
//             { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
//           ]}
//           queryFn={() =>
//             useItemsPriceChangeRecentList({
//               startdt: startDate,
//               enddt: endDate,
//               outlet: 1,
//               userId: 7,
//             }).queryFn
//           }
//           queryArgs={[
//             { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
//           ]}
//           formatter={itemPriceChangeFormatter}
//           shimmerCount={3}
//         >
//           {({ summaryCards, tableData }) => (
//             <AnalyticsPage
//               styles={styles}
//               filters={[
//                 {
//                   label: "Supplier",
//                   options: isSuppliersLoading ? [] : supplierOptions,
//                   value: supplier,
//                   onChange: setSupplier,
//                 },
//                 {
//                   label: "Items",
//                   options: isItemsLoading ? [] : itemOptions,
//                   value: item,
//                   onChange: setItem,
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
// import { FaShoppingCart, FaRupeeSign } from "react-icons/fa";
// import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
// import React, { useState } from "react";
// import { useOrgFilters } from "@/components/hooks/useOrgFilters";

// export default function ItemPriceChangeAnalytics() {
//   // ✅ Get supplier + item filters dynamically
//   const { isSuppliersLoading, isItemsLoading, supplierOptions, itemOptions } =
//     useOrgFilters();

//   // ✅ Local state for controlled dropdowns
//   const [supplier, setSupplier] = useState("");
//   const [item, setItem] = useState("");

//   // Figma-specific style definitions centralized in the page:
//   const styles = {
//     headerBar: {
//       background: "linear-gradient(90deg, #4f2dab, #8240c0)",
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
//       {/* Gradient header */}
//       <div style={styles.headerBar}>
//         <h1 style={styles.headerTitle}>Purchase Analytics</h1>
//         <p style={styles.headerSubtitle}>
//           Real-time insights into your restaurant purchase patterns and supplier
//           performance
//         </p>
//       </div>
//       <div style={styles.analyticsBox}>
//         <AnalyticsPage
//           styles={styles}
//           filters={[
//             {
//               label: "Supplier",
//               options: isSuppliersLoading ? [] : supplierOptions,
//               value: supplier, // ✅ controlled
//               onChange: setSupplier,
//             },
//             {
//               label: "Items",
//               options: isItemsLoading ? [] : itemOptions,
//               value: item, // ✅ controlled
//               onChange: setItem,
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
//               id: "purchases",
//               title: "Total Purchases",
//               value: "₹68,150",
//               icon: <FaRupeeSign color="#fff" size={24} />,
//               bgColor: "#F2FBF5",
//               iconBg: "#21A365",
//             },
//             {
//               id: "totalItems",
//               title: "Total Items",
//               value: "229",
//               icon: <FaShoppingCart color="#fff" size={24} />,
//               bgColor: "#F5F8FF",
//               iconBg: "#2471EB",
//             },
//           ]}
//           table={{
//             columns: [
//               { key: "date", label: "DATE" },
//               { key: "supplier", label: "SUPPLIERS" },
//               { key: "item", label: "ITEM DETAILS" },
//               { key: "qty", label: "QUANTITY" },
//               { key: "totalPrice", label: "TOTAL PRICE" },
//             ],
//             rows: [
//               {
//                 date: "18 Aug 2025",
//                 supplier: "Meat Masters",
//                 item: (
//                   <>
//                     Chicken Breast{" "}
//                     <span
//                       style={{
//                         background: "#FFE3C6",
//                         color: "#F28118",
//                         borderRadius: 12,
//                         fontWeight: 700,
//                         fontSize: 13,
//                         padding: "2px 12px",
//                         marginLeft: 8,
//                       }}
//                     >
//                       High Value
//                     </span>
//                     <br />
//                     <span style={{ fontSize: 13, color: "#868DA6" }}>
//                       Meat & Poultry · 1 Kg · ₹450
//                     </span>
//                   </>
//                 ),
//                 qty: "25 Kg",
//                 totalPrice: "₹11,250",
//               },
//               {
//                 date: "18 Aug 2025",
//                 supplier: "Organic Produce Co",
//                 item: (
//                   <>
//                     Olive Oil
//                     <br />
//                     <span style={{ fontSize: 13, color: "#868DA6" }}>
//                       Cooking Ingredients · 1 Liter · ₹850
//                     </span>
//                   </>
//                 ),
//                 qty: "8 Liter",
//                 totalPrice: "₹6,800",
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

// "use client";
// import { FaShoppingCart, FaFileInvoice, FaRupeeSign } from "react-icons/fa";
// import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
// import React from "react";

// export default function PurchaseAnalytics() {
//   // Figma-specific style definitions centralized in the page:
//   const styles = {
//     headerBar: {
//       background: "linear-gradient(90deg, #4f2dab, #8240c0)",
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
//       {/* Gradient header */}
//       <div style={styles.headerBar}>
//         <h1 style={styles.headerTitle}>Purchase Analytics</h1>
//         <p style={styles.headerSubtitle}>
//           Real-time insights into your restaurant purchase patterns and supplier
//           performance
//         </p>
//       </div>
//       <div style={styles.analyticsBox}>
//         <AnalyticsPage
//           styles={styles}
//           filters={[
//             {
//               label: "Supplier",
//               options: [{ value: "1", label: "FreshMart" }],
//               value: "",
//             },
//             {
//               label: "Items",
//               options: [{ value: "1", label: "Oil" }],
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
//               id: "purchases",
//               title: "Total Purchases",
//               value: "₹68,150",
//               icon: <FaRupeeSign color="#fff" size={24} />,
//               bgColor: "#F2FBF5",
//               iconBg: "#21A365",
//             },
//             {
//               id: "totalItems",
//               title: "Total Items",
//               value: "229",
//               icon: <FaShoppingCart color="#fff" size={24} />,
//               bgColor: "#F5F8FF",
//               iconBg: "#2471EB",
//             },
//           ]}
//           table={{
//             columns: [
//               { key: "date", label: "DATE" },
//               { key: "supplier", label: "SUPPLIERS" },
//               { key: "item", label: "ITEM DETAILS" },
//               { key: "qty", label: "QUANTITY" },
//               { key: "totalPrice", label: "TOTAL PRICE" },
//             ],
//             rows: [
//               {
//                 date: "18 Aug 2025",
//                 supplier: "Meat Masters",
//                 item: (
//                   <>
//                     Chicken Breast{" "}
//                     <span
//                       style={{
//                         background: "#FFE3C6",
//                         color: "#F28118",
//                         borderRadius: 12,
//                         fontWeight: 700,
//                         fontSize: 13,
//                         padding: "2px 12px",
//                         marginLeft: 8,
//                       }}
//                     >
//                       High Value
//                     </span>
//                     <br />
//                     <span style={{ fontSize: 13, color: "#868DA6" }}>
//                       Meat & Poultry · 1 Kg · ₹450
//                     </span>
//                   </>
//                 ),
//                 qty: "25 Kg",
//                 totalPrice: "₹11,250",
//               },
//               {
//                 date: "18 Aug 2025",
//                 supplier: "Organic Produce Co",
//                 item: (
//                   <>
//                     Olive Oil
//                     <br />
//                     <span style={{ fontSize: 13, color: "#868DA6" }}>
//                       Cooking Ingredients · 1 Liter · ₹850
//                     </span>
//                   </>
//                 ),
//                 qty: "8 Liter",
//                 totalPrice: "₹6,800",
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
// import { FaShoppingCart, FaFileInvoice, FaRupeeSign } from "react-icons/fa";
// import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";

// export default function PurchaseAnalytics() {
//   return (
//     <AnalyticsPage
//       title="Purchase Analytics"
//       subtitle="Analyze purchase expenses, supplier payments, and dues"
//       filters={[
//         { label: "Suppliers", options: [{ value: "1", label: "FreshMart" }] },
//         { label: "Departments", options: [{ value: "1", label: "Kitchen" }] },
//       ]}
//       summaryCards={[
//         {
//           id: "purchaseAmount",
//           title: "Purchase Amount",
//           value: "₹45,000",
//           icon: <FaFileInvoice color="#fff" />,
//           bgColor: "#FFF7F2",
//           iconBg: "#FF5B22",
//         },
//         {
//           id: "payment",
//           title: "Payments",
//           value: "₹32,000",
//           icon: <FaRupeeSign color="#fff" />,
//           bgColor: "#F2FBF5",
//           iconBg: "#1AAB4A",
//         },
//         {
//           id: "dues",
//           title: "Dues",
//           value: "₹13,000",
//           icon: <FaShoppingCart color="#fff" />,
//           bgColor: "#FFF2F3",
//           iconBg: "#E85C0D",
//         },
//       ]}
//       table={{
//         columns: [
//           { key: "date", label: "DATE" },
//           { key: "supplier", label: "SUPPLIER" },
//           { key: "purchaseAmount", label: "PURCHASE AMOUNT" },
//           { key: "payment", label: "PAYMENT" },
//           { key: "dues", label: "DUES" },
//         ],
//         rows: [
//           {
//             date: "1 Dec 2024, Sunday",
//             supplier: "FreshMart",
//             purchaseAmount: "₹15,000",
//             payment: "₹10,000",
//             dues: "₹5,000",
//           },
//         ],
//       }}
//     />
//   );
// }
