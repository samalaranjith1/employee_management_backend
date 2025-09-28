"use client";
import { FaDoorClosed, FaCheckCircle } from "react-icons/fa";
import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
import React, { useState, useEffect } from "react";
import { useOrgFilters } from "@/components/hooks/useOrgFilters";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useItemsConsumptionHistory } from "@/services/item-service";
import { consumptionHistoryFormatter } from "@/utils/data_formatters/smallPagesDataFormatter";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { formatDate } from "@/utils";
import { useSearchParams } from "next/navigation";

export default function ConsumptionHistoryAnalysis() {
  // const { startDate: ctxStartDate, endDate: ctxEndDate } =
  //   useDashboardContext();
  const { isDeptLoading, isItemsLoading, departmentOptions, itemOptions } =
    useOrgFilters();

  const searchParams = useSearchParams();
  const randomKey = Array.from(searchParams.keys())[0]; // e.g. "879609129"

  const [department, setDepartment] = useState("");
  const [item, setItem] = useState("");
  const [activeDateRange, setActiveDateRange] = useState("Today");
  const [searchQuery, setSearchQuery] = useState("");

  // const [startDate, setStartDate] = useState(ctxStartDate || null);
  // const [endDate, setEndDate] = useState(ctxEndDate || null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  console.log(randomKey, "ramarama");
  // ✅ Load from sessionStorage if available
  useEffect(() => {
    if (!randomKey) return;

    const saved = sessionStorage.getItem(randomKey);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.startDate) setStartDate(new Date(parsed.startDate));
        if (parsed.endDate) setEndDate(new Date(parsed.endDate));
        if (parsed.departments) setDepartment(parsed.departments);
        if (parsed.items) setItem(parsed.items);
        if (parsed.activeDateRange) {
          setActiveDateRange(parsed.activeDateRange); // ✅ respect saved filter
        }
        if (parsed.searchQuery) setSearchQuery(parsed.searchQuery);
      } catch (err) {
        console.error("Failed to parse session storage:", err);
      }
    }
  }, [randomKey]);

  // ✅ Save to sessionStorage whenever state changes
  useEffect(() => {
    if (!randomKey) return;

    const data = {
      startDate,
      endDate,
      departments:department,
      items:item,
      activeDateRange,
      searchQuery,
    };

    sessionStorage.setItem(randomKey, JSON.stringify(data));
  }, [
    randomKey,
    startDate,
    endDate,
    department,
    item,
    activeDateRange,
    searchQuery,
  ]);

  // ✅ Auto-set activeDateRange only if not restored from storage
  useEffect(() => {
    if (!startDate || !endDate) return;

    // Only auto-calc if activeDateRange is still default
    if (activeDateRange && activeDateRange !== "Today") return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const isSameDay = (d1, d2) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    // Monday as start of week
    const day = today.getDay(); // 0 = Sunday, 1 = Monday ...
    const diff = day === 0 ? -6 : 1 - day;
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + diff);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    if (isSameDay(start, today) && isSameDay(end, today)) {
      setActiveDateRange("Today");
    } else if (isSameDay(start, yesterday) && isSameDay(end, yesterday)) {
      setActiveDateRange("Yesterday");
    } else if (isSameDay(start, startOfWeek) && isSameDay(end, today)) {
      setActiveDateRange("This Week");
    } else if (isSameDay(start, startOfMonth) && isSameDay(end, today)) {
      setActiveDateRange("This Month");
    } else {
      setActiveDateRange("Custom");
    }
  }, [startDate, endDate]);

  // Sync with context
  // useEffect(() => {
  //   if (ctxStartDate) setStartDate(ctxStartDate);
  //   if (ctxEndDate) setEndDate(ctxEndDate);
  // }, [ctxStartDate, ctxEndDate]);

  const handleAnalyse = () => {
    console.log("Analyser clicked with:", {
      department,
      item,
      activeDateRange,
      searchQuery,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  };

  const handleExport = () => {
    console.log("Export clicked with:", {
      department,
      item,
      activeDateRange,
      searchQuery,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  };

  const handleFilter = () => {
    console.log("Filter clicked with:", {
      department,
      item,
      activeDateRange,
      searchQuery,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  };

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
    datePickerWrapper: {
      display: "flex",
      gap: 12,
      marginTop: 10,
      alignItems: "center",
    },
    datePickerLabel: { fontWeight: 600 },
  };

  return (
    <div style={{ background: "#f2f3fb", minHeight: "100vh" }}>
      <div style={styles.headerBar}>
        <h1 style={styles.headerTitle}>Consumption Closing Analysis</h1>
        <p style={styles.headerSubtitle}>
          End-of-day review and analysis of restaurant consumption data for
          operational closure
        </p>
      </div>

      <div style={styles.analyticsBox}>
        <ServiceRenderer
          queryHook={useItemsConsumptionHistory}
          queryKey={[
            "itemsConsumptionHistory",
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
            useItemsConsumptionHistory({
              startdt: formatDate(startDate),
              enddt: formatDate(endDate),
              outlet: 1,
              userId: 7,
              departmentId: department || null,
              itemId: item || null,
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
          formatter={consumptionHistoryFormatter}
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
              onDateRangeChange={(range, start, end) => {
                setActiveDateRange(range);
                setStartDate(start);
                setEndDate(end);
              }}
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
///perfectly working code
// "use client";
// import { FaDoorClosed, FaCheckCircle } from "react-icons/fa";
// import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
// import React, { useState, useEffect } from "react";
// import { useOrgFilters } from "@/components/hooks/useOrgFilters";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import { useItemsConsumptionHistory } from "@/services/item-service";
// import { consumptionHistoryFormatter } from "@/utils/data_formatters/smallPagesDataFormatter";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import { formatDate } from "@/utils";

// export default function ConsumptionHistoryAnalysis() {
//   const { startDate: ctxStartDate, endDate: ctxEndDate } =
//     useDashboardContext();
//   const { isDeptLoading, isItemsLoading, departmentOptions, itemOptions } =
//     useOrgFilters();

//   const [department, setDepartment] = useState("");
//   const [item, setItem] = useState("");
//   const [activeDateRange, setActiveDateRange] = useState("Today");
//   const [searchQuery, setSearchQuery] = useState("");

//   const [startDate, setStartDate] = useState(ctxStartDate || null);
//   const [endDate, setEndDate] = useState(ctxEndDate || null);

//   // Sync with context
//   useEffect(() => {
//     if (ctxStartDate) setStartDate(ctxStartDate);
//     if (ctxEndDate) setEndDate(ctxEndDate);
//   }, [ctxStartDate, ctxEndDate]);

//   const handleAnalyse = () => {
//     console.log("Analyser clicked with:", {
//       department,
//       item,
//       activeDateRange,
//       searchQuery,
//       startDate: formatDate(startDate),
//       endDate: formatDate(endDate),
//     });
//   };

//   const handleExport = () => {
//     console.log("Export clicked with:", {
//       department,
//       item,
//       activeDateRange,
//       searchQuery,
//       startDate: formatDate(startDate),
//       endDate: formatDate(endDate),
//     });
//   };

//   const handleFilter = () => {
//     console.log("Filter clicked with:", {
//       department,
//       item,
//       activeDateRange,
//       searchQuery,
//       startDate: formatDate(startDate),
//       endDate: formatDate(endDate),
//     });
//   };

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
//     datePickerWrapper: {
//       display: "flex",
//       gap: 12,
//       marginTop: 10,
//       alignItems: "center",
//     },
//     datePickerLabel: { fontWeight: 600 },
//   };

//   return (
//     <div style={{ background: "#f2f3fb", minHeight: "100vh" }}>
//       <div style={styles.headerBar}>
//         <h1 style={styles.headerTitle}>Consumption Closing Analysis</h1>
//         <p style={styles.headerSubtitle}>
//           End-of-day review and analysis of restaurant consumption data for
//           operational closure
//         </p>
//       </div>

//       <div style={styles.analyticsBox}>
//         <ServiceRenderer
//           queryHook={useItemsConsumptionHistory}
//           queryKey={[
//             "itemsConsumptionHistory",
//             {
//               startdt: formatDate(startDate),
//               enddt: formatDate(endDate),
//               outlet: 1,
//               userId: 7,
//               departmentId: department || null,
//               itemId: item || null,
//             },
//           ]}
//           queryFn={() =>
//             useItemsConsumptionHistory({
//               startdt: formatDate(startDate),
//               enddt: formatDate(endDate),
//               outlet: 1,
//               userId: 7,
//               departmentId: department || null,
//               itemId: item || null,
//             }).queryFn
//           }
//           queryArgs={[
//             {
//               startdt: formatDate(startDate),
//               enddt: formatDate(endDate),
//               outlet: 1,
//               userId: 7,
//               departments: department || null,
//               items: item || null,
//             },
//           ]}
//           formatter={consumptionHistoryFormatter}
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
//               // ✅ Adjusted DatePill handler
//               onDateRangeChange={(range, start, end) => {
//                 setActiveDateRange(range);
//                 setStartDate(start);
//                 setEndDate(end);
//               }}
//               startDate={startDate}
//               endDate={endDate}
//               onStartDateChange={setStartDate}
//               onEndDateChange={setEndDate}
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
//               onAnalyse={handleAnalyse}
//               onExport={handleExport}
//               onFilter={handleFilter}
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
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import { useItemsConsumptionHistory } from "@/services/item-service";
// import { consumptionHistoryFormatter } from "@/utils/data_formatters/smallPagesDataFormatter";
// export default function ConsumptionHistoryAnalysis() {
//   const { isDeptLoading, isItemsLoading, departmentOptions, itemOptions } =
//     useOrgFilters();

//   const [department, setDepartment] = useState("");
//   const [item, setItem] = useState("");
//   const [activeDateRange, setActiveDateRange] = useState("Today");
//   const [searchQuery, setSearchQuery] = useState("");

//   // ✅ DatePicker state
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   const handleAnalyse = () => {
//     console.log("Analyser clicked with:", {
//       department,
//       item,
//       activeDateRange,
//       searchQuery,
//       startDate,
//       endDate,
//     });
//   };

//   const handleExport = () => {
//     console.log("Export clicked with:", {
//       department,
//       item,
//       activeDateRange,
//       searchQuery,
//       startDate,
//       endDate,
//     });
//   };

//   const handleFilter = () => {
//     console.log("Filter clicked with:", {
//       department,
//       item,
//       activeDateRange,
//       searchQuery,
//       startDate,
//       endDate,
//     });
//   };

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
//     datePickerWrapper: {
//       display: "flex",
//       gap: 12,
//       marginTop: 10,
//       alignItems: "center",
//     },
//     datePickerLabel: { fontWeight: 600 },
//   };

//   return (
//     <div style={{ background: "#f2f3fb", minHeight: "100vh" }}>
//       <div style={styles.headerBar}>
//         <h1 style={styles.headerTitle}>Consumption Closing Analysis</h1>
//         <p style={styles.headerSubtitle}>
//           End-of-day review and analysis of restaurant consumption data for
//           operational closure
//         </p>
//       </div>

//       <div style={styles.analyticsBox}>
//         <ServiceRenderer
//           queryHook={useItemsConsumptionHistory}
//           queryKey={[
//             "itemsConsumptionHistory",
//             { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
//           ]}
//           queryFn={() =>
//             useItemsConsumptionHistory({
//               startdt: startDate,
//               enddt: endDate,
//               outlet: 1,
//               userId: 7,
//             }).queryFn
//           }
//           queryArgs={[
//             { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
//           ]}
//           formatter={consumptionHistoryFormatter}
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
//               onDateRangeChange={(range) => {
//                 setActiveDateRange(range);
//                 if (range !== "Custom") {
//                   setStartDate(null);
//                   setEndDate(null);
//                 }
//               }}
//               startDate={startDate}
//               endDate={endDate}
//               onStartDateChange={setStartDate}
//               onEndDateChange={setEndDate}
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
//               onAnalyse={handleAnalyse}
//               onExport={handleExport}
//               onFilter={handleFilter}
//             />
//           )}
//         </ServiceRenderer>

//         {/* --- Show Custom Date Picker below filters if Custom is selected --- */}
//         {activeDateRange === "Custom" && (
//           <div style={styles.datePickerWrapper}>
//             <div>
//               <div style={styles.datePickerLabel}>Start Date:</div>
//               <DatePicker
//                 selected={startDate}
//                 onChange={setStartDate}
//                 dateFormat="dd MMM yyyy"
//                 placeholderText="Select start date"
//               />
//             </div>
//             <div>
//               <div style={styles.datePickerLabel}>End Date:</div>
//               <DatePicker
//                 selected={endDate}
//                 onChange={setEndDate}
//                 dateFormat="dd MMM yyyy"
//                 placeholderText="Select end date"
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// // "use client";
// // import { FaDoorClosed, FaCheckCircle } from "react-icons/fa";
// // import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
// // import React, { useState } from "react";
// // import { useOrgFilters } from "@/components/hooks/useOrgFilters";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";

// // export default function ConsumptionClosingAnalysis() {
// //   const { isDeptLoading, isItemsLoading, departmentOptions, itemOptions } =
// //     useOrgFilters();

// //   const [department, setDepartment] = useState("");
// //   const [item, setItem] = useState("");
// //   const [activeDateRange, setActiveDateRange] = useState("Today");
// //   const [searchQuery, setSearchQuery] = useState("");

// //   // ✅ DatePicker state
// //   const [startDate, setStartDate] = useState(null);
// //   const [endDate, setEndDate] = useState(null);

// //   const handleAnalyse = () => {
// //     console.log("Analyser clicked with:", {
// //       department,
// //       item,
// //       activeDateRange,
// //       searchQuery,
// //       startDate,
// //       endDate,
// //     });
// //   };

// //   const handleExport = () => {
// //     console.log("Export clicked with:", {
// //       department,
// //       item,
// //       activeDateRange,
// //       searchQuery,
// //       startDate,
// //       endDate,
// //     });
// //   };

// //   const handleFilter = () => {
// //     console.log("Filter clicked with:", {
// //       department,
// //       item,
// //       activeDateRange,
// //       searchQuery,
// //       startDate,
// //       endDate,
// //     });
// //   };

// //   const styles = {
// //     headerBar: {
// //       background: "linear-gradient(90deg, #11514b, #0f313a)",
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
// //       boxShadow: "0 8px 24px rgba(44,37,68,0.06)",
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
// //     datePickerWrapper: {
// //       display: "flex",
// //       gap: 12,
// //       marginTop: 10,
// //       alignItems: "center",
// //     },
// //     datePickerLabel: { fontWeight: 600 },
// //   };

// //   return (
// //     <div style={{ background: "#f2f3fb", minHeight: "100vh" }}>
// //       <div style={styles.headerBar}>
// //         <h1 style={styles.headerTitle}>Consumption Closing Analysis</h1>
// //         <p style={styles.headerSubtitle}>
// //           End-of-day review and analysis of restaurant consumption data for
// //           operational closure
// //         </p>
// //       </div>

// //       <div style={styles.analyticsBox}>
// //         <AnalyticsPage
// //           styles={styles}
// //           filters={[
// //             {
// //               label: "Departments",
// //               options: isDeptLoading ? [] : departmentOptions,
// //               value: department,
// //               onChange: setDepartment,
// //             },
// //             {
// //               label: "Items",
// //               options: isItemsLoading ? [] : itemOptions,
// //               value: item,
// //               onChange: setItem,
// //             },
// //           ]}
// //           dateRangeOptions={[
// //             "Today",
// //             "Yesterday",
// //             "This Week",
// //             "This Month",
// //             "Custom",
// //           ]}
// //           activeDateRange={activeDateRange}
// //           onDateRangeChange={(range) => {
// //             setActiveDateRange(range);
// //             if (range !== "Custom") {
// //               setStartDate(null);
// //               setEndDate(null);
// //             }
// //           }}
// //           startDate={startDate}
// //           endDate={endDate}
// //           onStartDateChange={setStartDate}
// //           onEndDateChange={setEndDate}
// //           searchQuery={searchQuery}
// //           onSearchChange={setSearchQuery}
// //           summaryCards={[
// //             {
// //               id: "closingStock",
// //               title: "Total Closing Stock",
// //               value: "₹68,150",
// //               icon: <FaDoorClosed color="#fff" size={24} />,
// //               bgColor: "#F2FBF5",
// //               iconBg: "#21A365",
// //             },
// //             {
// //               id: "totalItems",
// //               title: "Total Items",
// //               value: "229",
// //               icon: <FaCheckCircle color="#fff" size={24} />,
// //               bgColor: "#F5F8FF",
// //               iconBg: "#2471EB",
// //             },
// //           ]}
// //           table={{
// //             columns: [
// //               { key: "date", label: "DATE" },
// //               { key: "department", label: "DEPARTMENT" },
// //               { key: "item", label: "ITEM DETAILS" },
// //               { key: "qty", label: "QUANTITY" },
// //               { key: "totalPrice", label: "TOTAL PRICE" },
// //             ],
// //             rows: [
// //               {
// //                 date: "18 Aug 2025",
// //                 department: "Kitchen",
// //                 item: (
// //                   <>
// //                     Chicken Breast{" "}
// //                     <span
// //                       style={{
// //                         background: "#FFE3C6",
// //                         color: "#F28118",
// //                         borderRadius: 12,
// //                         fontWeight: 700,
// //                         fontSize: 13,
// //                         padding: "2px 12px",
// //                         marginLeft: 8,
// //                       }}
// //                     >
// //                       High Value
// //                     </span>
// //                     <br />
// //                     <span style={{ fontSize: 13, color: "#868DA6" }}>
// //                       Meat & Poultry · 1 Kg · ₹450
// //                     </span>
// //                   </>
// //                 ),
// //                 qty: "25 Kg",
// //                 totalPrice: "₹11,250",
// //               },
// //               {
// //                 date: "18 Aug 2025",
// //                 department: "Kitchen",
// //                 item: (
// //                   <>
// //                     Olive Oil
// //                     <br />
// //                     <span style={{ fontSize: 13, color: "#868DA6" }}>
// //                       Cooking Ingredients · 1 Liter · ₹850
// //                     </span>
// //                   </>
// //                 ),
// //                 qty: "8 Liter",
// //                 totalPrice: "₹6,800",
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
// //           onAnalyse={handleAnalyse}
// //           onExport={handleExport}
// //           onFilter={handleFilter}
// //         />

// //         {/* --- Show Custom Date Picker below filters if Custom is selected --- */}
// //         {activeDateRange === "Custom" && (
// //           <div style={styles.datePickerWrapper}>
// //             <div>
// //               <div style={styles.datePickerLabel}>Start Date:</div>
// //               <DatePicker
// //                 selected={startDate}
// //                 onChange={setStartDate}
// //                 dateFormat="dd MMM yyyy"
// //                 placeholderText="Select start date"
// //               />
// //             </div>
// //             <div>
// //               <div style={styles.datePickerLabel}>End Date:</div>
// //               <DatePicker
// //                 selected={endDate}
// //                 onChange={setEndDate}
// //                 dateFormat="dd MMM yyyy"
// //                 placeholderText="Select end date"
// //               />
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // "use client";
// // import { FaUtensils, FaRupeeSign } from "react-icons/fa";
// // import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
// // import React, { useState } from "react";
// // import { useOrgFilters } from "@/components/hooks/useOrgFilters";

// // export default function ConsumptionAnalytics() {
// //   // 🔹 Get filters from custom hook
// //   const { isDeptLoading, isItemsLoading, departmentOptions, itemOptions } =
// //     useOrgFilters();

// //   // ✅ keep selected values in state
// //   const [department, setDepartment] = useState("");
// //   const [item, setItem] = useState("");

// //   const styles = {
// //     headerBar: {
// //       background: "linear-gradient(90deg, #103c46, #1c775e)",
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
// //       boxShadow: "0 8px 24px rgba(44,37,68,0.06)",
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
// //         <h1 style={styles.headerTitle}>Consumption Analytics</h1>
// //         <p style={styles.headerSubtitle}>
// //           Real-time insights into your restaurant consumption patterns and
// //           operational efficiency
// //         </p>
// //       </div>
// //       <div style={styles.analyticsBox}>
// //         <AnalyticsPage
// //           styles={styles}
// //           filters={[
// //             {
// //               label: "Departments",
// //               options: isDeptLoading ? [] : departmentOptions,
// //               value: department,
// //               onChange: setDepartment, // ✅ controlled
// //             },
// //             {
// //               label: "Items",
// //               options: isItemsLoading ? [] : itemOptions,
// //               value: item,
// //               onChange: setItem, // ✅ controlled
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
// //               id: "cost",
// //               title: "Total Consumption",
// //               value: "₹68,150",
// //               icon: <FaRupeeSign color="#fff" size={24} />,
// //               bgColor: "#F2FBF5",
// //               iconBg: "#21A365",
// //             },
// //             {
// //               id: "totalItems",
// //               title: "Total Items",
// //               value: "229",
// //               icon: <FaUtensils color="#fff" size={24} />,
// //               bgColor: "#F5F8FF",
// //               iconBg: "#2471EB",
// //             },
// //           ]}
// //           table={{
// //             columns: [
// //               { key: "date", label: "DATE" },
// //               { key: "department", label: "DEPARTMENT" },
// //               { key: "item", label: "ITEM DETAILS" },
// //               { key: "qty", label: "QUANTITY" },
// //               { key: "totalPrice", label: "TOTAL PRICE" },
// //             ],
// //             rows: [
// //               {
// //                 date: "18 Aug 2025",
// //                 department: "Kitchen",
// //                 item: (
// //                   <>
// //                     Chicken Breast{" "}
// //                     <span
// //                       style={{
// //                         background: "#FFE3C6",
// //                         color: "#F28118",
// //                         borderRadius: 12,
// //                         fontWeight: 700,
// //                         fontSize: 13,
// //                         padding: "2px 12px",
// //                         marginLeft: 8,
// //                       }}
// //                     >
// //                       High Value
// //                     </span>
// //                     <br />
// //                     <span style={{ fontSize: 13, color: "#868DA6" }}>
// //                       Meat & Poultry · 1 Kg · ₹450
// //                     </span>
// //                   </>
// //                 ),
// //                 qty: "25 Kg",
// //                 totalPrice: "₹11,250",
// //               },
// //               {
// //                 date: "18 Aug 2025",
// //                 department: "Kitchen",
// //                 item: (
// //                   <>
// //                     Olive Oil
// //                     <br />
// //                     <span style={{ fontSize: 13, color: "#868DA6" }}>
// //                       Cooking Ingredients · 1 Liter · ₹850
// //                     </span>
// //                   </>
// //                 ),
// //                 qty: "8 Liter",
// //                 totalPrice: "₹6,800",
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

// // "use client";
// // import { FaUtensils, FaChartPie, FaRupeeSign } from "react-icons/fa";
// // import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
// // import React from "react";

// // export default function ConsumptionAnalytics() {
// //   const styles = {
// //     // Gradient header bar
// //     headerBar: {
// //       background: "linear-gradient(90deg, #103c46, #1c775e)",
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
// //       boxShadow: "0 8px 24px rgba(44,37,68,0.06)",
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
// //         <h1 style={styles.headerTitle}>Consumption Analytics</h1>
// //         <p style={styles.headerSubtitle}>
// //           Real-time insights into your restaurant consumption patterns and
// //           operational efficiency
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
// //               label: "Items",
// //               options: [{ value: "1", label: "Rice" }],
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
// //               id: "cost",
// //               title: "Total Consumption",
// //               value: "₹68,150",
// //               icon: <FaRupeeSign color="#fff" size={24} />,
// //               bgColor: "#F2FBF5",
// //               iconBg: "#21A365",
// //             },
// //             {
// //               id: "totalItems",
// //               title: "Total Items",
// //               value: "229",
// //               icon: <FaUtensils color="#fff" size={24} />,
// //               bgColor: "#F5F8FF",
// //               iconBg: "#2471EB",
// //             },
// //           ]}
// //           table={{
// //             columns: [
// //               { key: "date", label: "DATE" },
// //               { key: "department", label: "DEPARTMENT" },
// //               { key: "item", label: "ITEM DETAILS" },
// //               { key: "qty", label: "QUANTITY" },
// //               { key: "totalPrice", label: "TOTAL PRICE" },
// //             ],
// //             rows: [
// //               {
// //                 date: "18 Aug 2025",
// //                 department: "Kitchen",
// //                 item: (
// //                   <>
// //                     Chicken Breast{" "}
// //                     <span
// //                       style={{
// //                         background: "#FFE3C6",
// //                         color: "#F28118",
// //                         borderRadius: 12,
// //                         fontWeight: 700,
// //                         fontSize: 13,
// //                         padding: "2px 12px",
// //                         marginLeft: 8,
// //                       }}
// //                     >
// //                       High Value
// //                     </span>
// //                     <br />
// //                     <span style={{ fontSize: 13, color: "#868DA6" }}>
// //                       Meat & Poultry · 1 Kg · ₹450
// //                     </span>
// //                   </>
// //                 ),
// //                 qty: "25 Kg",
// //                 totalPrice: "₹11,250",
// //               },
// //               {
// //                 date: "18 Aug 2025",
// //                 department: "Kitchen",
// //                 item: (
// //                   <>
// //                     Olive Oil
// //                     <br />
// //                     <span style={{ fontSize: 13, color: "#868DA6" }}>
// //                       Cooking Ingredients · 1 Liter · ₹850
// //                     </span>
// //                   </>
// //                 ),
// //                 qty: "8 Liter",
// //                 totalPrice: "₹6,800",
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

// // import { FaUtensils, FaChartPie, FaRupeeSign } from "react-icons/fa";
// // import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
// // export default function ConsumptionAnalytics() {
// //   return (
// //     <AnalyticsPage
// //       title="Consumption Analytics"
// //       subtitle="Track consumption of raw materials and finished products"
// //       filters={[
// //         { label: "Departments", options: [{ value: "1", label: "Kitchen" }] },
// //         { label: "Products", options: [{ value: "1", label: "Rice" }] },
// //       ]}
// //       summaryCards={[
// //         {
// //           id: "totalItems",
// //           title: "Total Items",
// //           value: "420",
// //           icon: <FaUtensils color="#fff" />,
// //           bgColor: "#FFF7F2",
// //           iconBg: "#FF5B22",
// //         },
// //         {
// //           id: "cost",
// //           title: "Total Cost",
// //           value: "₹56,800",
// //           icon: <FaRupeeSign color="#fff" />,
// //           bgColor: "#F0F7FF",
// //           iconBg: "#007BFF",
// //         },
// //         {
// //           id: "distribution",
// //           title: "Distribution",
// //           value: "80%",
// //           icon: <FaChartPie color="#fff" />,
// //           bgColor: "#F2FBF5",
// //           iconBg: "#1AAB4A",
// //         },
// //       ]}
// //       table={{
// //         columns: [
// //           { key: "date", label: "DATE" },
// //           { key: "item", label: "ITEM" },
// //           { key: "qty", label: "QTY USED" },
// //           { key: "unitCost", label: "UNIT COST" },
// //           { key: "totalCost", label: "TOTAL COST" },
// //         ],
// //         rows: [
// //           {
// //             date: "1 Dec 2024, Sunday",
// //             item: "Basmati Rice",
// //             qty: "25 Kg",
// //             unitCost: "₹90",
// //             totalCost: "₹2,250",
// //           },
// //         ],
// //       }}
// //     />
// //   );
// // }
