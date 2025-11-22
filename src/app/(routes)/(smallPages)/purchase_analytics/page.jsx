"use client";
import { FaArrowTrendUp, FaArrowTrendDown, FaChartBar } from "react-icons/fa6";
import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
import React, { useState, useEffect } from "react";
import { useOrgFilters } from "@/components/hooks/useOrgFilters";
import { useItemsPurchaseHistory } from "@/services/item-service";
import { purchaseHistoryFormatter } from "@/utils/data_formatters/smallPagesDataFormatter";
import { useDashboardContext } from "@/contexts/DashboardContext";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { formatDate } from "@/utils";

export default function PurchaseAnalytics() {
  const { startDate: ctxStartDate, endDate: ctxEndDate } =
    useDashboardContext();
  const { isCategoriesLoading, isItemsLoading, categoryOptions, itemOptions } =
    useOrgFilters();

  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [activeDateRange, setActiveDateRange] = useState("Today");
  const [startDate, setStartDate] = useState(ctxStartDate || null);
  const [endDate, setEndDate] = useState(ctxEndDate || null);
  const [searchQuery, setSearchQuery] = useState("");

  // Sync with context on load or when context updates
  useEffect(() => {
    if (ctxStartDate) setStartDate(ctxStartDate);
    if (ctxEndDate) setEndDate(ctxEndDate);
  }, [ctxStartDate, ctxEndDate]);

  const styles = {
    headerBar: {
      background: "linear-gradient(90deg, #121d35, #192959, #1c3171)",
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
        <h1 style={styles.headerTitle}>Purchase Analytics</h1>
        <p style={styles.headerSubtitle}>
          Monitor inventory levels, track stock runway, and manage warehouse
          operations with real-time analytics
        </p>
      </div>

      {/* Analytics Section */}
      <div style={styles.analyticsBox}>
        <ServiceRenderer
          queryHook={useItemsPurchaseHistory}
          queryKey={[
            "itemsPurchaseHistory",
            {
              startdt: formatDate(startDate),
              enddt: formatDate(endDate),
              outlet: 1,
              userId: 7,
              categoryId: category || null,
              itemId: item || null,
            },
          ]}
          queryFn={() =>
            useItemsPurchaseHistory({
              startdt: formatDate(startDate),
              enddt: formatDate(endDate),
              outlet: 1,
              userId: 7,
              categories: category || null,
              items: item || null,
            }).queryFn
          }
          queryArgs={[
            {
              startdt: formatDate(startDate),
              enddt: formatDate(endDate),
              outlet: 1,
              userId: 7,
              categories: category || null,
              items: item || null,
            },
          ]}
          formatter={purchaseHistoryFormatter}
          shimmerCount={3}
        >
          {({ summaryCards, tableData }) => (
            <AnalyticsPage
              styles={styles}
              filters={[
                {
                  label: "Item Category",
                  options: isCategoriesLoading ? [] : categoryOptions,
                  value: category,
                  onChange: setCategory,
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
                  category,
                  item,
                  activeDateRange,
                  searchQuery,
                  startDate: formatDate(startDate),
                  endDate: formatDate(endDate),
                })
              }
              onExport={() =>
                console.log("Export clicked with:", {
                  category,
                  item,
                  activeDateRange,
                  searchQuery,
                  startDate: formatDate(startDate),
                  endDate: formatDate(endDate),
                })
              }
              onFilter={() =>
                console.log("Filter clicked with:", {
                  category,
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
// import { FaArrowTrendUp, FaArrowTrendDown, FaChartBar } from "react-icons/fa6";
// import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
// import React, { useState } from "react";
// import { useOrgFilters } from "@/components/hooks/useOrgFilters";
// import { useItemsPurchaseHistory } from "@/services/item-service";
// import { purchaseHistoryFormatter } from "@/utils/data_formatters/smallPagesDataFormatter";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";

// export default function PurchaseAnalytics() {
//   const { startDate, endDate } = useDashboardContext();
//   const { isCategoriesLoading, isItemsLoading, categoryOptions, itemOptions } =
//     useOrgFilters();

//   const [category, setCategory] = useState("");
//   const [item, setItem] = useState("");

//   const styles = {
//     headerBar: {
//       background: "linear-gradient(90deg, #121d35, #192959, #1c3171)",
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
//           Monitor inventory levels, track stock runway, and manage warehouse
//           operations with real-time analytics
//         </p>
//       </div>

//       {/* Analytics Section */}
//       <div style={styles.analyticsBox}>
//         <ServiceRenderer
//           queryHook={useItemsPurchaseHistory}
//           queryKey={[
//             "itemsPurchaseHistory",
//             { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
//           ]}
//           queryFn={() =>
//             useItemsPurchaseHistory({
//               startdt: startDate,
//               enddt: endDate,
//               outlet: 1,
//               userId: 7,
//             }).queryFn
//           }
//           queryArgs={[
//             { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
//           ]}
//           formatter={purchaseHistoryFormatter}
//           shimmerCount={3}
//         >
//           {({ summaryCards, tableData }) => (
//             <AnalyticsPage
//               styles={styles}
//               filters={[
//                 {
//                   label: "Item Category",
//                   options: isCategoriesLoading ? [] : categoryOptions,
//                   value: category,
//                   onChange: setCategory,
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
//               activeDateRange="Today"
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
//               onAnalyse={() => console.log("Analyse clicked")}
//               onExport={() => console.log("Export clicked")}
//               onFilter={() => console.log("Filter clicked")}
//             />
//           )}
//         </ServiceRenderer>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { FaArrowTrendUp, FaArrowTrendDown, FaChartBar } from "react-icons/fa6";
// import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
// import React, { useState } from "react";
// import { useOrgFilters } from "@/components/hooks/useOrgFilters";

// export default function ItemPriceChangeAnalytics() {
//   // 🔹 Get filters from custom hook
//   const { isCategoriesLoading, isItemsLoading, categoryOptions, itemOptions } =
//     useOrgFilters();

//   // ✅ local state for dropdowns
//   const [category, setCategory] = useState("");
//   const [item, setItem] = useState("");

//   const styles = {
//     headerBar: {
//       background: "linear-gradient(90deg, #121d35, #192959, #1c3171)",
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
//       <div style={styles.headerBar}>
//         <h1 style={styles.headerTitle}>Item Price Change Analytics</h1>
//         <p style={styles.headerSubtitle}>
//           Monitor inventory levels, track stock runway, and manage warehouse
//           operations with real-time analytics
//         </p>
//       </div>
//       <div style={styles.analyticsBox}>
//         <AnalyticsPage
//           styles={styles}
//           filters={[
//             {
//               label: "Item Category",
//               options: isCategoriesLoading ? [] : categoryOptions,
//               value: category, // ✅ controlled
//               onChange: setCategory,
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
//               id: "priceChange",
//               title: "Items with Price Change",
//               value: "10 out of 340",
//               subtitle: "+₹4,600 (Monthly)",
//               icon: <FaChartBar color="#fff" size={24} />,
//               bgColor: "#F0F7FF",
//               iconBg: "#165DFF",
//             },
//             {
//               id: "priceIncrease",
//               title: "Items with Price Increase",
//               value: "6",
//               subtitle: "₹14,750 (Monthly)",
//               icon: <FaArrowTrendUp color="#fff" size={24} />,
//               bgColor: "#FFF5F0",
//               iconBg: "#FF5722",
//             },
//             {
//               id: "priceDecrease",
//               title: "Items with Price Decrease",
//               value: "4",
//               subtitle: "₹10,150 (Monthly)",
//               icon: <FaArrowTrendDown color="#fff" size={24} />,
//               bgColor: "#F0FFF5",
//               iconBg: "#16A34A",
//             },
//           ]}
//           table={{
//             columns: [
//               { key: "item", label: "ITEM DETAILS" },
//               { key: "priceChanges", label: "PRICE CHANGES" },
//               { key: "date", label: "DATE OF CHANGE" },
//               { key: "difference", label: "% DIFFERENCE" },
//               { key: "impact", label: "MONTHLY IMPACT" },
//             ],
//             rows: [
//               {
//                 item: "Chicken Breast\nMeat & Poultry • 1 Kg • ₹450",
//                 priceChanges: "₹450 → ₹455 (+5)",
//                 date: "18 Aug 2025",
//                 difference: "+1.1%",
//                 impact: "+₹1,250 (250 Kg)",
//               },
//               {
//                 item: "Olive Oil\nCooking Ingredients • 1 Liter • ₹850",
//                 priceChanges: "₹850 → ₹820 (–30)",
//                 date: "17 Aug 2025",
//                 difference: "–3.5%",
//                 impact: "₹2,400 (80 Liters)",
//               },
//               {
//                 item: "Wine Bottles\nBeverages • 1 Bottle • ₹1,200",
//                 priceChanges: "₹80 → ₹95 (+15)",
//                 date: "16 Aug 2025",
//                 difference: "+18.8% (High Increase)",
//                 impact: "+₹4,500 (300 Kg)",
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
