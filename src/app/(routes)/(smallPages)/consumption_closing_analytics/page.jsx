"use client";
import React, { useState, useEffect } from "react";
import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useOrgFilters } from "@/components/hooks/useOrgFilters";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { useItemsConsumptionClosingHistory } from "@/services/item-service";
import { consumptionClosingFormatter } from "@/utils/data_formatters/smallPagesDataFormatter";
import { formatDate } from "@/utils";

export default function ConsumptionClosingAnalysis() {
  const { startDate: ctxStartDate, endDate: ctxEndDate } =
    useDashboardContext();
  const { isDeptLoading, isItemsLoading, departmentOptions, itemOptions } =
    useOrgFilters();

  // ✅ Local state for filters & dates
  const [department, setDepartment] = useState("");
  const [item, setItem] = useState("");
  const [activeDateRange, setActiveDateRange] = useState("Today");
  const [searchQuery, setSearchQuery] = useState("");

  const [startDate, setStartDate] = useState(ctxStartDate || null);
  const [endDate, setEndDate] = useState(ctxEndDate || null);

  // ✅ Sync with context when it updates
  useEffect(() => {
    if (ctxStartDate) setStartDate(ctxStartDate);
    if (ctxEndDate) setEndDate(ctxEndDate);
  }, [ctxStartDate, ctxEndDate]);

  // ✅ Styles
  const styles = {
    headerBar: {
      background: "linear-gradient(90deg, #11514b, #0f313a)",
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
      {/* Header gradient and title */}
      <div style={styles.headerBar}>
        <h1 style={styles.headerTitle}>Consumption Closing Analysis</h1>
        <p style={styles.headerSubtitle}>
          End-of-day review and analysis of restaurant consumption data for
          operational closure
        </p>
      </div>

      {/* Analytics Section */}
      <div style={styles.analyticsBox}>
        <ServiceRenderer
          queryHook={useItemsConsumptionClosingHistory}
          queryKey={[
            "itemsConsumptionClosingHistory",
            {
              startdt: formatDate(startDate),
              enddt: formatDate(endDate),
              outlet: 1,
              userId: 7,
              departmentId: department || null,
              itemId: item || null,
            },
          ]}
          queryFn={() =>
            useItemsConsumptionClosingHistory({
              startdt: formatDate(startDate),
              enddt: formatDate(endDate),
              outlet: 1,
              userId: 7,
              departments: department || null,
              items: item || null,
            }).queryFn
          }
          queryArgs={[
            {
              startdt: formatDate(startDate),
              enddt: formatDate(endDate),
              outlet: 1,
              userId: 7,
              departments: department || null,
              items: item || null,
            },
          ]}
          formatter={consumptionClosingFormatter}
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
              // ✅ Use AnalyticsPage to handle date pill click
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
                  department,
                  item,
                  activeDateRange,
                  searchQuery,
                  startDate: formatDate(startDate),
                  endDate: formatDate(endDate),
                })
              }
              onExport={() =>
                console.log("Export clicked with:", {
                  department,
                  item,
                  activeDateRange,
                  searchQuery,
                  startDate: formatDate(startDate),
                  endDate: formatDate(endDate),
                })
              }
              onFilter={() =>
                console.log("Filter clicked with:", {
                  department,
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
// import { FaDoorClosed, FaCheckCircle } from "react-icons/fa";
// import { useOrgFilters } from "@/components/hooks/useOrgFilters";
// import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import { useItemsConsumptionClosingHistory } from "@/services/item-service";
// import { consumptionClosingFormatter } from "@/utils/data_formatters/smallPagesDataFormatter";

// export default function ConsumptionClosingAnalysis() {
//   const { startDate, endDate } = useDashboardContext();
//   const { isDeptLoading, isItemsLoading, departmentOptions, itemOptions } =
//     useOrgFilters();

//   const [department, setDepartment] = useState("");
//   const [item, setItem] = useState("");
//   const [activeDateRange, setActiveDateRange] = useState("Today");
//   const [searchQuery, setSearchQuery] = useState("");

//   // ✅ styles from your first component (kept 100% intact)
//   const styles = {
//     headerBar: {
//       background: "linear-gradient(90deg, #11514b, #0f313a)",
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
//       {/* Header gradient and title */}
//       <div style={styles.headerBar}>
//         <h1 style={styles.headerTitle}>Consumption Closing Analysis</h1>
//         <p style={styles.headerSubtitle}>
//           End-of-day review and analysis of restaurant consumption data for
//           operational closure
//         </p>
//       </div>

//       {/* Analytics Section */}
//       <div style={styles.analyticsBox}>
//         <ServiceRenderer
//           queryHook={useItemsConsumptionClosingHistory}
//           queryKey={[
//             "itemsConsumptionClosingHistory",
//             { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
//           ]}
//           queryFn={() =>
//             useItemsConsumptionClosingHistory({
//               startdt: startDate,
//               enddt: endDate,
//               outlet: 1,
//               userId: 7,
//             }).queryFn
//           }
//           queryArgs={[{ startdt: startDate, enddt: endDate, outlet: 1, userId: 7 }]}
//           formatter={consumptionClosingFormatter}
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
//                   department,
//                   item,
//                   activeDateRange,
//                   searchQuery,
//                 })
//               }
//               onExport={() =>
//                 console.log("Export clicked with:", {
//                   department,
//                   item,
//                   activeDateRange,
//                   searchQuery,
//                 })
//               }
//               onFilter={() =>
//                 console.log("Filter clicked with:", {
//                   department,
//                   item,
//                   activeDateRange,
//                   searchQuery,
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
// import { FaDoorClosed, FaCheckCircle } from "react-icons/fa";
// import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
// import React, { useState } from "react";
// import { useOrgFilters } from "@/components/hooks/useOrgFilters";

// export default function ConsumptionClosingAnalysis() {
//   // 🔹 Get filters from custom hook (same as ConsumptionAnalytics)
//   const { isDeptLoading, isItemsLoading, departmentOptions, itemOptions } =
//     useOrgFilters();

//   // ✅ keep selected values in state
//   const [department, setDepartment] = useState("");
//   const [item, setItem] = useState("");
//   const [activeDateRange, setActiveDateRange] = useState("Today"); // ✅ added
//   const [searchQuery, setSearchQuery] = useState(""); // ✅ added

//   // --- Handlers (same as first component) ---
//   const handleAnalyse = () => {
//     console.log("Analyser clicked with:", {
//       department,
//       item,
//       activeDateRange,
//       searchQuery,
//     });
//   };

//   const handleExport = () => {
//     console.log("Export clicked with:", {
//       department,
//       item,
//       activeDateRange,
//       searchQuery,
//     });
//   };

//   const handleFilter = () => {
//     console.log("Filter clicked with:", {
//       department,
//       item,
//       activeDateRange,
//       searchQuery,
//     });
//   };

//   // Centralized, Figma-accurate style definitions
//   const styles = {
//     headerBar: {
//       background: "linear-gradient(90deg, #11514b, #0f313a)",
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
//       {/* Header gradient and title */}
//       <div style={styles.headerBar}>
//         <h1 style={styles.headerTitle}>Consumption Closing Analysis</h1>
//         <p style={styles.headerSubtitle}>
//           End-of-day review and analysis of restaurant consumption data for
//           operational closure
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
//           activeDateRange={activeDateRange} // ✅ controlled
//           onDateRangeChange={setActiveDateRange} // ✅ handler
//           searchQuery={searchQuery} // ✅ controlled
//           onSearchChange={setSearchQuery} // ✅ handler
//           summaryCards={[
//             {
//               id: "closingStock",
//               title: "Total Closing Stock",
//               value: "₹68,150",
//               icon: <FaDoorClosed color="#fff" size={24} />,
//               bgColor: "#F2FBF5",
//               iconBg: "#21A365",
//             },
//             {
//               id: "totalItems",
//               title: "Total Items",
//               value: "229",
//               icon: <FaCheckCircle color="#fff" size={24} />,
//               bgColor: "#F5F8FF",
//               iconBg: "#2471EB",
//             },
//           ]}
//           table={{
//             columns: [
//               { key: "date", label: "DATE" },
//               { key: "department", label: "DEPARTMENT" },
//               { key: "item", label: "ITEM DETAILS" },
//               { key: "qty", label: "QUANTITY" },
//               { key: "totalPrice", label: "TOTAL PRICE" },
//             ],
//             rows: [
//               {
//                 date: "18 Aug 2025",
//                 department: "Kitchen",
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
//                 department: "Kitchen",
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
//           onAnalyse={handleAnalyse} // ✅ wired
//           onExport={handleExport} // ✅ wired
//           onFilter={handleFilter} // ✅ wired
//         />
//       </div>
//     </div>
//   );
// }
// "use client";
// import { FaDoorClosed, FaCheckCircle } from "react-icons/fa";
// import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
// import React, { useState } from "react";
// import { useOrgFilters } from "@/components/hooks/useOrgFilters";

// export default function ConsumptionClosingAnalysis() {
//   // 🔹 Get filters from custom hook (same as ConsumptionAnalytics)
//   const { isDeptLoading, isItemsLoading, departmentOptions, itemOptions } =
//     useOrgFilters();

//   // ✅ keep selected values in state
//   const [department, setDepartment] = useState("");
//   const [item, setItem] = useState("");

//   // Centralized, Figma-accurate style definitions
//   const styles = {
//     headerBar: {
//       background: "linear-gradient(90deg, #11514b, #0f313a)",
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
//       {/* Header gradient and title */}
//       <div style={styles.headerBar}>
//         <h1 style={styles.headerTitle}>Consumption Closing Analysis</h1>
//         <p style={styles.headerSubtitle}>
//           End-of-day review and analysis of restaurant consumption data for
//           operational closure
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
//               onChange: setDepartment, // ✅ controlled
//             },
//             {
//               label: "Items",
//               options: isItemsLoading ? [] : itemOptions,
//               value: item,
//               onChange: setItem, // ✅ controlled
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
//               id: "closingStock",
//               title: "Total Closing Stock",
//               value: "₹68,150",
//               icon: <FaDoorClosed color="#fff" size={24} />,
//               bgColor: "#F2FBF5",
//               iconBg: "#21A365",
//             },
//             {
//               id: "totalItems",
//               title: "Total Items",
//               value: "229",
//               icon: <FaCheckCircle color="#fff" size={24} />,
//               bgColor: "#F5F8FF",
//               iconBg: "#2471EB",
//             },
//           ]}
//           table={{
//             columns: [
//               { key: "date", label: "DATE" },
//               { key: "department", label: "DEPARTMENT" },
//               { key: "item", label: "ITEM DETAILS" },
//               { key: "qty", label: "QUANTITY" },
//               { key: "totalPrice", label: "TOTAL PRICE" },
//             ],
//             rows: [
//               {
//                 date: "18 Aug 2025",
//                 department: "Kitchen",
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
//                 department: "Kitchen",
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
// import { FaDoorClosed, FaRupeeSign, FaCheckCircle } from "react-icons/fa";
// import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
// import React from "react";

// export default function ConsumptionClosingAnalysis() {
//   // Centralized, Figma-accurate style definitions
//   const styles = {
//     // Header (set at page level)
//     headerBar: {
//       background: "linear-gradient(90deg, #11514b, #0f313a)",
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
//       {/* Header gradient and title */}
//       <div style={styles.headerBar}>
//         <h1 style={styles.headerTitle}>Consumption Closing Analysis</h1>
//         <p style={styles.headerSubtitle}>
//           End-of-day review and analysis of restaurant consumption data for
//           operational closure
//         </p>
//       </div>
//       <div style={styles.analyticsBox}>
//         <AnalyticsPage
//           styles={styles}
//           filters={[
//             {
//               label: "Departments",
//               options: [{ value: "1", label: "Kitchen" }],
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
//               id: "closingStock",
//               title: "Total Closing Stock",
//               value: "₹68,150",
//               icon: <FaDoorClosed color="#fff" size={24} />,
//               bgColor: "#F2FBF5",
//               iconBg: "#21A365",
//             },
//             {
//               id: "totalItems",
//               title: "Total Items",
//               value: "229",
//               icon: <FaCheckCircle color="#fff" size={24} />,
//               bgColor: "#F5F8FF",
//               iconBg: "#2471EB",
//             },
//           ]}
//           table={{
//             columns: [
//               { key: "date", label: "DATE" },
//               { key: "department", label: "DEPARTMENT" },
//               { key: "item", label: "ITEM DETAILS" },
//               { key: "qty", label: "QUANTITY" },
//               { key: "totalPrice", label: "TOTAL PRICE" },
//             ],
//             rows: [
//               {
//                 date: "18 Aug 2025",
//                 department: "Kitchen",
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
//                 department: "Kitchen",
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
// import { FaDoorClosed, FaRupeeSign, FaCheckCircle } from "react-icons/fa";
// import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";

// export default function ConsumptionClosingAnalysis() {
//   return (
//     <AnalyticsPage
//       title="Consumption Closing Analysis"
//       subtitle="Daily closing report of consumption and cost"
//       filters={[
//         { label: "Departments", options: [{ value: "1", label: "Kitchen" }] },
//         { label: "Products", options: [{ value: "1", label: "Oil" }] },
//       ]}
//       summaryCards={[
//         {
//           id: "closingStock",
//           title: "Closing Stock Value",
//           value: "₹78,000",
//           icon: <FaDoorClosed color="#fff" />,
//           bgColor: "#F0F7FF",
//           iconBg: "#007BFF",
//         },
//         {
//           id: "consumptionCost",
//           title: "Consumption Cost",
//           value: "₹24,500",
//           icon: <FaRupeeSign color="#fff" />,
//           bgColor: "#FFF7F2",
//           iconBg: "#FF5B22",
//         },
//         {
//           id: "verified",
//           title: "Verified Entries",
//           value: "95%",
//           icon: <FaCheckCircle color="#fff" />,
//           bgColor: "#F2FBF5",
//           iconBg: "#1AAB4A",
//         },
//       ]}
//       table={{
//         columns: [
//           { key: "date", label: "DATE" },
//           { key: "product", label: "PRODUCT" },
//           { key: "opening", label: "OPENING" },
//           { key: "consumption", label: "CONSUMPTION" },
//           { key: "closing", label: "CLOSING" },
//           { key: "value", label: "VALUE" },
//         ],
//         rows: [
//           {
//             date: "1 Dec 2024, Sunday",
//             product: "Sunflower Oil",
//             opening: "200 L",
//             consumption: "50 L",
//             closing: "150 L",
//             value: "₹9,000",
//           },
//         ],
//       }}
//     />
//   );
// }
