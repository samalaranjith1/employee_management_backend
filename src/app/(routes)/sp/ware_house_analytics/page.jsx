"use client";
import React from "react";
import { useOrgFilters } from "@/components/hooks/useOrgFilters";
import { useSearchParams } from "next/navigation";
import { formatDate } from "@/utils";
import { useSessionStorageAnalytics } from "@/components/hooks/useSessionStorageAnalytics";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
import { useItemsBelowMOQList } from "@/services/item-service";
import { stockItemDataFormatter } from "@/utils/data_formatters/smallPagesDataFormatter";

export default function WarehouseStockAnalytics() {
  const { isCategoriesLoading, isItemsLoading, categoryOptions, itemOptions } =
    useOrgFilters();
  const searchParams = useSearchParams();
  const randomKey = Array.from(searchParams.keys())[0] || "WarehouseStock";

  const {
    filters,
    setFilters,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    activeDateRange,
    handleDateRangeChange,
    searchQuery,
    setSearchQuery,
  } = useSessionStorageAnalytics(randomKey, {
    filters: { category: "", item: "" },
    startDate: null,
    endDate: null,
    activeDateRange: "Today",
    searchQuery: "",
  });

  const handleAnalyse = () => {
    console.log("Analyse clicked with:", {
      category: filters.category,
      item: filters.item,
      activeDateRange,
      searchQuery,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  };

  const handleExport = () => {
    console.log("Export clicked with:", {
      category: filters.category,
      item: filters.item,
      activeDateRange,
      searchQuery,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  };

  const handleFilter = () => {
    console.log("Filter clicked with:", {
      category: filters.category,
      item: filters.item,
      activeDateRange,
      searchQuery,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  };

  const styles = {
    headerBar: {
      background: "linear-gradient(90deg, #0a2740, #2a5c9a)",
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
      <div style={styles.headerBar}>
        <h1 style={styles.headerTitle}>Warehouse Stock Analytics</h1>
        <p style={styles.headerSubtitle}>
          Monitor stock availability, categories, and warehouse-level inventory
        </p>
      </div>

      <div style={styles.analyticsBox}>
        <ServiceRenderer
          queryHook={useItemsBelowMOQList}
          queryKey={[
            "itemsBelowMOQList",
            {
              startdt: formatDate(startDate),
              enddt: formatDate(endDate),
              outlet: 1,
              userId: 7,
              categoryId: filters.category || null,
              itemId: filters.item || null,
            },
          ]}
          queryFn={() =>
            useItemsBelowMOQList({
              startdt: formatDate(startDate),
              enddt: formatDate(endDate),
              outlet: 1,
              userId: 7,
              categoryId: filters.category || null,
              itemId: filters.item || null,
            }).queryFn
          }
          queryArgs={[
            {
              startdt: formatDate(startDate),
              enddt: formatDate(endDate),
              outlet: 1,
              userId: 7,
              categories: filters.category || null,
              items: filters.item || null,
            },
          ]}
          formatter={stockItemDataFormatter}
          shimmerCount={3}
        >
          {({ summaryCards, tableData }) => (
            <AnalyticsPage
              styles={styles}
              filters={[
                {
                  label: "Item Categories",
                  options: isCategoriesLoading ? [] : categoryOptions,
                  value: filters.category,
                  onChange: (val) =>
                    setFilters((f) => ({ ...f, category: val })),
                },
                {
                  label: "Items",
                  options: isItemsLoading ? [] : itemOptions,
                  value: filters.item,
                  onChange: (val) => setFilters((f) => ({ ...f, item: val })),
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
              onDateRangeChange={(range) => handleDateRangeChange(range)}
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
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
              onAnalyse={handleAnalyse}
              onExport={handleExport}
              onFilter={handleFilter}
            />
          )}
        </ServiceRenderer>
      </div>
    </div>
  );
}
// "use client";
// import { FaBoxes, FaUtensils } from "react-icons/fa";
// import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
// import React, { useState, useEffect } from "react";
// import { useOrgFilters } from "@/components/hooks/useOrgFilters";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import { useItemsBelowMOQList } from "@/services/item-service";
// import { stockItemDataFormatter } from "@/utils/data_formatters/smallPagesDataFormatter";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import { formatDate } from "@/utils";

// export default function WarehouseStockAnalytics() {
//   const { startDate: ctxStartDate, endDate: ctxEndDate } = useDashboardContext();
//   const { isCategoriesLoading, isItemsLoading, categoryOptions, itemOptions } = useOrgFilters();

//   const [category, setCategory] = useState("");
//   const [item, setItem] = useState("");
//   const [activeDateRange, setActiveDateRange] = useState("Today");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [startDate, setStartDate] = useState(ctxStartDate || null);
//   const [endDate, setEndDate] = useState(ctxEndDate || null);

//   // ✅ Sync with context when it updates
//   useEffect(() => {
//     if (ctxStartDate) setStartDate(ctxStartDate);
//     if (ctxEndDate) setEndDate(ctxEndDate);
//   }, [ctxStartDate, ctxEndDate]);

//   const styles = {
//     headerBar: {
//       background: "linear-gradient(90deg, #0a2740, #2a5c9a)",
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
//         <h1 style={styles.headerTitle}>Warehouse Stock Analytics</h1>
//         <p style={styles.headerSubtitle}>
//           Monitor stock availability, categories, and warehouse-level inventory
//         </p>
//       </div>

//       <div style={styles.analyticsBox}>
//         <ServiceRenderer
//           queryHook={useItemsBelowMOQList}
//           queryKey={[
//             "itemsBelowMOQList",
//             { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
//           ]}
//           queryFn={() =>
//             useItemsBelowMOQList({
//               startdt: startDate,
//               enddt: endDate,
//               outlet: 1,
//               userId: 7,
//             }).queryFn
//           }
//           queryArgs={[{ startdt: startDate, enddt: endDate, outlet: 1, userId: 7,
//             categories:category,
//             items:item
//            }]}
//           formatter={stockItemDataFormatter}
//           shimmerCount={3}
//         >
//           {({ summaryCards, tableData }) => (
//             <AnalyticsPage
//               styles={styles}
//               filters={[
//                 {
//                   label: "Item Categories",
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
//               dateRangeOptions={["Today", "Yesterday", "This Week", "This Month", "Custom"]}
//               activeDateRange={activeDateRange}
//               // ✅ Updated date pill handler
//               onDateRangeChange={(range, start, end) => {
//                 setActiveDateRange(range);
//                 setStartDate(start);
//                 setEndDate(end);
//               }}
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
//               onAnalyse={() =>
//                 console.log("Analyse clicked with:", {
//                   categories: category,
//                   items: item,
//                   activeDateRange,
//                   startDate: formatDate(startDate),
//                   endDate: formatDate(endDate),
//                 })
//               }
//               onExport={() =>
//                 console.log("Export clicked with:", {
//                   categories: category,
//                   items: item,
//                   activeDateRange,
//                   startDate: formatDate(startDate),
//                   endDate: formatDate(endDate),
//                 })
//               }
//               onFilter={() =>
//                 console.log("Filter clicked with:", {
//                   categories: category,
//                   items: item,
//                   activeDateRange,
//                   startDate: formatDate(startDate),
//                   endDate: formatDate(endDate),
//                 })
//               }
//             />
//           )}
//         </ServiceRenderer>
//       </div>
//     </div>
//   );
// }
// "use client";
// import { FaBoxes, FaUtensils } from "react-icons/fa";
// import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
// import React, { useState } from "react";
// import { useOrgFilters } from "@/components/hooks/useOrgFilters";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import { useItemsBelowMOQList } from "@/services/item-service";
// import { stockItemDataFormatter } from "@/utils/data_formatters/smallPagesDataFormatter";
// import { useDashboardContext } from "@/contexts/DashboardContext";

// export default function WarehouseStockAnalytics() {
//   const { startDate, endDate } = useDashboardContext();

//   const { isCategoriesLoading, isItemsLoading, categoryOptions, itemOptions } =
//     useOrgFilters();

//   const [category, setCategory] = useState("");
//   const [item, setItem] = useState("");
//   const [activeDateRange, setActiveDateRange] = useState("Today");
//   const [searchQuery, setSearchQuery] = useState("");

//   const styles = {
//     headerBar: {
//       background: "linear-gradient(90deg, #0a2740, #2a5c9a)",
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
//         <h1 style={styles.headerTitle}>Warehouse Stock Analytics</h1>
//         <p style={styles.headerSubtitle}>
//           Monitor stock availability, categories, and warehouse-level inventory
//         </p>
//       </div>

//       <div style={styles.analyticsBox}>
//         <ServiceRenderer
//           queryHook={useItemsBelowMOQList}
//           queryKey={[
//             "itemsBelowMOQList",
//             { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
//           ]}
//           queryFn={() =>
//             useItemsBelowMOQList({
//               startdt: startDate,
//               enddt: endDate,
//               outlet: 1,
//               userId: 7,
//             }).queryFn
//           }
//           queryArgs={[
//             { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
//           ]}
//           formatter={stockItemDataFormatter}
//           shimmerCount={3}
//         >
//           {({ summaryCards, tableData }) => (
//             <AnalyticsPage
//               styles={styles}
//               filters={[
//                 {
//                   label: "Item Categories",
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
//               onAnalyse={() =>
//                 console.log("Analyse clicked with:", {
//                   category,
//                   item,
//                   activeDateRange,
//                 })
//               }
//               onExport={() =>
//                 console.log("Export clicked with:", {
//                   category,
//                   item,
//                   activeDateRange,
//                 })
//               }
//               onFilter={() =>
//                 console.log("Filter clicked with:", {
//                   category,
//                   item,
//                   activeDateRange,
//                 })
//               }
//             />
//           )}
//         </ServiceRenderer>
//       </div>
//     </div>
//   );
// }
// "use client";
// import { FaBoxes, FaUtensils } from "react-icons/fa";
// import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
// import React, { useState } from "react";
// import { useOrgFilters } from "@/components/hooks/useOrgFilters";

// export default function WarehouseStockAnalytics() {
//   // 🔹 Get filters from custom hook
//   const { isCategoriesLoading, isItemsLoading, categoryOptions, itemOptions } =
//     useOrgFilters();

//   // ✅ Local state for controlled dropdowns
//   const [category, setCategory] = useState("");
//   const [item, setItem] = useState("");

//   const styles = {
//     headerBar: {
//       background: "linear-gradient(90deg, #0a2740, #2a5c9a)",
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
//         <h1 style={styles.headerTitle}>Warehouse Stock Analytics</h1>
//         <p style={styles.headerSubtitle}>
//           Monitor stock availability, categories, and warehouse-level inventory
//         </p>
//       </div>
//       <div style={styles.analyticsBox}>
//         <AnalyticsPage
//           styles={styles}
//           filters={[
//             {
//               label: "Item Categories",
//               options: isCategoriesLoading ? [] : categoryOptions,
//               value: category,
//               onChange: setCategory,
//             },
//             {
//               label: "Items",
//               options: isItemsLoading ? [] : itemOptions,
//               value: item,
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
//               id: "totalStock",
//               title: "Total Stock",
//               value: "12,450 Units",
//               icon: <FaBoxes color="#fff" size={24} />,
//               bgColor: "#F0F7FF",
//               iconBg: "#165DFF",
//             },
//             {
//               id: "totalItems",
//               title: "Total Items",
//               value: "842",
//               icon: <FaUtensils color="#fff" size={24} />,
//               bgColor: "#F5F8FF",
//               iconBg: "#2471EB",
//             },
//           ]}
//           table={{
//             columns: [
//               { key: "date", label: "DATE" },
//               { key: "category", label: "ITEM CATEGORY" },
//               { key: "item", label: "ITEM NAME" },
//               { key: "qty", label: "QUANTITY AVAILABLE" },
//               { key: "location", label: "WAREHOUSE LOCATION" },
//             ],
//             rows: [
//               {
//                 date: "18 Aug 2025",
//                 category: "Meat & Poultry",
//                 item: "Chicken Breast",
//                 qty: "250 Kg",
//                 location: "Cold Storage A",
//               },
//               {
//                 date: "18 Aug 2025",
//                 category: "Cooking Ingredients",
//                 item: "Olive Oil",
//                 qty: "120 Liters",
//                 location: "Dry Storage B",
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
// import { FaWarehouse, FaBoxes, FaExclamationTriangle } from "react-icons/fa";
// import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
// import React from "react";

// export default function WarehouseStockAnalytics() {
//   // All design-specific style definitions in the page
//   const styles = {
//     headerBar: {
//       background: "linear-gradient(90deg, #1a286d 0%, #043151 100%)",
//       borderBottomLeftRadius: "30px",
//       borderBottomRightRadius: "30px",
//       padding: "25px 0 60px 0",
//       marginTop:60,
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
//         <h1 style={styles.headerTitle}>Warehouse Stock Analytics</h1>
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
//               label: "Items Category",
//               options: [{ value: "1", label: "Grains & Pulses" }],
//               value: "",
//             },
//             {
//               label: "Items",
//               options: [{ value: "1", label: "Wheat Flour" }],
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
//               id: "currentStock",
//               title: (
//                 <>
//                   Current Stock Value
//                   <br />
//                   <span
//                     style={{ fontWeight: 400, color: "#8a91b4", fontSize: 13 }}
//                   >
//                     Total inventory worth
//                   </span>
//                 </>
//               ),
//               value: "₹3,35,000",
//               icon: <FaBoxes color="#fff" size={24} />,
//               bgColor: "#F0F7FF",
//               iconBg: "#007BFF",
//             },
//             {
//               id: "outOfStock",
//               title: (
//                 <>
//                   Out of Stock Items
//                   <br />
//                   <span
//                     style={{ fontWeight: 400, color: "#ff784f", fontSize: 13 }}
//                   >
//                     Items requiring immediate restocking
//                   </span>
//                 </>
//               ),
//               value: "5",
//               icon: <FaWarehouse color="#fff" size={24} />,
//               bgColor: "#FFF7F2",
//               iconBg: "#FF5B22",
//             },
//             {
//               id: "critical",
//               title: (
//                 <>
//                   Critical Items
//                   <br />
//                   <span
//                     style={{ fontWeight: 400, color: "#ffaa31", fontSize: 13 }}
//                   >
//                     Items at critically low levels
//                   </span>
//                 </>
//               ),
//               value: "3",
//               icon: <FaExclamationTriangle color="#fff" size={24} />,
//               bgColor: "#FEF7EF",
//               iconBg: "#FFB800",
//             },
//           ]}
//           table={{
//             columns: [
//               { key: "item", label: "ITEM DETAILS" },
//               { key: "moq", label: "MOQ" },
//               { key: "currentStock", label: "CURRENT STOCK" },
//               { key: "runway", label: "RUNWAY" },
//               { key: "latestClosing", label: "LATEST CLOSING STOCK" },
//               { key: "status", label: "STATUS" },
//             ],
//             rows: [
//               {
//                 item: (
//                   <>
//                     Whole Chicken Bird (800 Grm)
//                     <br />
//                     <span style={{ fontSize: 13, color: "#868DA6" }}>
//                       Meat & Poultry • 1kg • ₹450
//                     </span>
//                   </>
//                 ),
//                 moq: "5.5 Kg",
//                 currentStock: (
//                   <>
//                     2.3 kg <br />
//                     <span style={{ color: "#888", fontSize: 13 }}>₹1,035</span>
//                   </>
//                 ),
//                 runway: (
//                   <span style={{ color: "#F13B2F", fontWeight: 700 }}>
//                     2 Days
//                   </span>
//                 ),
//                 latestClosing: (
//                   <>
//                     6.5 kg <br />
//                     <span style={{ fontSize: 13, color: "#868DA6" }}>
//                       18 Aug 2024
//                     </span>
//                   </>
//                 ),
//                 status: (
//                   <>
//                     <span
//                       style={{
//                         background: "#EEE8FF",
//                         color: "#917DFB",
//                         borderRadius: 9,
//                         padding: "4px 12px",
//                         fontWeight: 600,
//                         fontSize: 13,
//                         marginRight: 6,
//                       }}
//                     >
//                       Analyze
//                     </span>
//                     <span
//                       style={{
//                         background: "#FFEAE5",
//                         color: "#EE7353",
//                         borderRadius: 9,
//                         padding: "4px 12px",
//                         fontWeight: 600,
//                         fontSize: 13,
//                       }}
//                     >
//                       Critical
//                     </span>
//                   </>
//                 ),
//               },
//               {
//                 item: (
//                   <>
//                     Olive Oil
//                     <br />
//                     <span style={{ fontSize: 13, color: "#868DA6" }}>
//                       Cooking Ingredients • 1L • ₹800
//                     </span>
//                   </>
//                 ),
//                 moq: "10L",
//                 currentStock: (
//                   <>
//                     0L <br />
//                     <span style={{ color: "#888", fontSize: 13 }}>₹0</span>
//                   </>
//                 ),
//                 runway: "-",
//                 latestClosing: (
//                   <>
//                     8.2L <br />
//                     <span style={{ fontSize: 13, color: "#868DA6" }}>
//                       18 Aug 2024
//                     </span>
//                   </>
//                 ),
//                 status: (
//                   <>
//                     <span
//                       style={{
//                         background: "#EEE8FF",
//                         color: "#917DFB",
//                         borderRadius: 9,
//                         padding: "4px 12px",
//                         fontWeight: 600,
//                         fontSize: 13,
//                         marginRight: 6,
//                       }}
//                     >
//                       Analyze
//                     </span>
//                     <span
//                       style={{
//                         background: "#FFEAF2",
//                         color: "#ED2B59",
//                         borderRadius: 9,
//                         padding: "4px 12px",
//                         fontWeight: 600,
//                         fontSize: 13,
//                       }}
//                     >
//                       Out of Stock
//                     </span>
//                   </>
//                 ),
//               },
//               {
//                 item: (
//                   <>
//                     Tomatoes
//                     <br />
//                     <span style={{ fontSize: 13, color: "#868DA6" }}>
//                       Fresh Produce • 1kg • ₹90
//                     </span>
//                   </>
//                 ),
//                 moq: "25 Kg",
//                 currentStock: (
//                   <>
//                     45.5kg <br />
//                     <span style={{ color: "#888", fontSize: 13 }}>₹4,095</span>
//                   </>
//                 ),
//                 runway: (
//                   <span style={{ color: "#22C55E", fontWeight: 700 }}>
//                     8 Days
//                   </span>
//                 ),
//                 latestClosing: (
//                   <>
//                     30.2kg <br />
//                     <span style={{ fontSize: 13, color: "#868DA6" }}>
//                       18 Aug 2024
//                     </span>
//                   </>
//                 ),
//                 status: (
//                   <>
//                     <span
//                       style={{
//                         background: "#EEE8FF",
//                         color: "#917DFB",
//                         borderRadius: 9,
//                         padding: "4px 12px",
//                         fontWeight: 600,
//                         fontSize: 13,
//                         marginRight: 6,
//                       }}
//                     >
//                       Analyze
//                     </span>
//                     <span
//                       style={{
//                         background: "#F0FBF1",
//                         color: "#00B75A",
//                         borderRadius: 9,
//                         padding: "4px 12px",
//                         fontWeight: 600,
//                         fontSize: 13,
//                       }}
//                     >
//                       No Actions
//                     </span>
//                   </>
//                 ),
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
// import { FaWarehouse, FaBoxes, FaExclamationTriangle } from "react-icons/fa";
// import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";

// export default function WarehouseStockAnalytics() {
//   return (
//     <AnalyticsPage
//       title="Warehouse Stock Analytics"
//       subtitle="Monitor stock availability and shortages in warehouse"
//       filters={[
//         { label: "Warehouse", options: [{ value: "1", label: "Main Store" }] },
//         { label: "Products", options: [{ value: "1", label: "Wheat Flour" }] },
//       ]}
//       summaryCards={[
//         {
//           id: "inStock",
//           title: "In Stock",
//           value: "850 Kg",
//           icon: <FaBoxes color="#fff" />,
//           bgColor: "#F0F7FF",
//           iconBg: "#007BFF",
//         },
//         {
//           id: "lowStock",
//           title: "Low Stock",
//           value: "120 Kg",
//           icon: <FaExclamationTriangle color="#fff" />,
//           bgColor: "#FFF7F2",
//           iconBg: "#FF5B22",
//         },
//         {
//           id: "outOfStock",
//           title: "Out of Stock",
//           value: "25 Items",
//           icon: <FaWarehouse color="#fff" />,
//           bgColor: "#FFF2F3",
//           iconBg: "#E85C0D",
//         },
//       ]}
//       table={{
//         columns: [
//           { key: "date", label: "DATE" },
//           { key: "product", label: "PRODUCT" },
//           { key: "stock", label: "STOCK" },
//           { key: "status", label: "STATUS" },
//         ],
//         rows: [
//           {
//             date: "1 Dec 2024, Sunday",
//             product: "Wheat Flour",
//             stock: "50 Kg",
//             status: "Low",
//           },
//         ],
//       }}
//     />
//   );
// }
