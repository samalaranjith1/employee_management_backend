"use client";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useOrgFilters } from "@/components/hooks/useOrgFilters";
import { useRouter, useSearchParams } from "next/navigation";
import { useSessionStorageAnalytics } from "@/components/hooks/useSessionStorageAnalytics";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import WastageAnalysisTopCards from "@/components/common/dashboard/card/WastageAnalysisTopCards";
import { WastageAnalysisTable } from "@/components/common/dashboard/TablesSort";
import { useWasteSummary } from "@/services/waste-management-service";
import { wastageAnalysisDataFormatter } from "@/utils/data_formatters/dashboardFormatter";
import { formatDate } from "@/utils";
import { Tabs, Tab } from "react-bootstrap";
import { usePathname } from "next/navigation";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { IconCircleArrowLeft } from "@tabler/icons-react";

export default function WastageAnalytics() {
  const { isDeptLoading, isItemsLoading, departmentOptions, itemOptions } =
    useOrgFilters();

  const searchParams = useSearchParams();
  const { startDate: startDateCT, endDate: endDateCT ,isMobile} = useDashboardContext()
  const pathname = usePathname();
  const router = useRouter();
  const isDashboard = pathname === "/" || pathname === "/dashboard";
  const randomKey = Array.from(searchParams.keys())[0] || "WastageAnalytics";

  // ✅ Use session storage hook like first component
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
    filters: { department: "", item: "" },
    startDate: null,
    endDate: null,
    activeDateRange: "Today",
    searchQuery: "",
  });

  const [activeTab, setActiveTab] = React.useState("expiredItems");

  const handleAnalyse = () => {
    console.log("Analyser clicked with:", {
      department: filters.department,
      item: filters.item,
      activeDateRange,
      searchQuery,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  };

  const handleExport = () => {
    console.log("Export clicked with:", {
      department: filters.department,
      item: filters.item,
      activeDateRange,
      searchQuery,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  };

  const handleFilter = () => {
    console.log("Filter clicked with:", {
      department: filters.department,
      item: filters.item,
      activeDateRange,
      searchQuery,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  };

  const styles = {
    headerBar: {
      background: "linear-gradient(90deg, #b31217, #e52d27)",
      borderBottomLeftRadius: "30px",
      borderBottomRightRadius: "30px",
      padding: "25px 0 60px 0",
      //marginTop: 60,
      marginBottom: 42,
    },
    headerTitle: {
      color: "#fff",
      fontSize: 32,
      fontWeight: 700,
      letterSpacing: "-1px",
      marginLeft: 12,
      marginBottom: 7,
    },
    headerSubtitle: {
      color: "#EDEDEDBA",
      fontSize: 15,
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
    pillRow: {
      fontWeight: 600,
      display: "flex",
      flexWrap: "wrap",
      marginBottom: 20,
    },
    datePill: (active) => ({
      background: active ? "#fff" : "transparent",
      border: active ? "2px solid #e52d27" : "2px solid #ececec",
      color: active ? "#e52d27" : "#1d2d35",
      borderRadius: 32,
      padding: "8px 22px",
      fontWeight: 600,
      fontSize: 15,
      marginRight: 12,
      marginBottom: 10,
      boxShadow: active ? "0 2px 6px #ffd6d6" : "none",
      cursor: "pointer",
      transition: "all 0.15s",
    }),
    analyser: {
      background: "#e52d27",
      color: "#fff",
      fontWeight: 700,
      borderRadius: 18,
      border: "none",
      padding: "10px 22px",
      marginRight: 8,
    },
    exportBtn: {
      background: "#e52d27",
      color: "#fff",
      fontWeight: 700,
      borderRadius: 18,
      border: "none",
      padding: "10px 22px",
      marginRight: 8,
    },
    filterBtn: {
      background: "#e52d27",
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
      {!isDashboard ? <div style={styles.headerBar}>
        <h1 style={styles.headerTitle}>
          {
            isMobile && <IconCircleArrowLeft
              size={40}
              style={{ cursor: "pointer" }}
              onClick={() => router.back()} // ⬅️ Go to previous page
            />}
          Wastage Analysis
        </h1>
        <p style={styles.headerSubtitle}>
          Track and minimize food waste across all categories
        </p>
      </div> : <div className="mt-5 p-2"></div>}
      <div style={styles.analyticsBox}>
        {/* ✅ Date Filters */}
        {!isDashboard && <div style={styles.pillRow}>
          {["Today", "Yesterday", "This Week", "This Month", "Custom"].map(
            (range) => (
              <div
                key={range}
                style={styles.datePill(activeDateRange === range)}
                onClick={() => handleDateRangeChange(range)}
              >
                {range}
              </div>
            )
          )}
        </div>}

        <ServiceRenderer
          queryHook={useWasteSummary}
          queryKey={[
            "wasteSummary",
            {
              startdt: isDashboard ? startDateCT : formatDate(startDate),
              enddt: isDashboard ? endDateCT : formatDate(endDate),
              departmentId: filters.department || null,
              itemId: filters.item || null,
              range: activeDateRange,
            },
          ]}
          queryFn={() =>
            useWasteSummary({
              startdt: isDashboard ? startDateCT : formatDate(startDate),
              enddt: isDashboard ? endDateCT : formatDate(endDate),
              departmentId: filters.department || null,
              itemId: filters.item || null,
              range: activeDateRange,
            }).queryFn
          }
          queryArgs={[
            {
              startdt: isDashboard ? startDateCT : formatDate(startDate),
              enddt: isDashboard ? endDateCT : formatDate(endDate),
              outlet: 1,
              userid: 7
            },
          ]}
          formatter={wastageAnalysisDataFormatter}
          shimmerCount={3}
        >
          {(formattedData) => (
            <>
              {/* ✅ Top summary cards */}
              <WastageAnalysisTopCards
                cardsData={formattedData?.cardsData}
                statCard={{
                  background: "#fff",
                  minWidth: "23vw",
                  flex: "0 0 auto",
                }}
              />

              {/* ✅ Tabs for tables */}
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mt-4"
              >
                <Tab eventKey="expiredItems" title="Expired Items">
                  <WastageAnalysisTable
                    expiredItems={formattedData?.expiredItems}
                    expiredProducts={[]}
                    rawMaterialWastage={[]}
                    tableCardStyle={{
                      borderRadius: 20,
                      padding: 10,
                      background: "#fff",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      display: "flex",
                      flexDirection: "column",
                      marginTop: 20,
                    }}
                    scrollBodyStyle={{ flex: 1, overflowY: "auto" }}
                  />
                </Tab>

                <Tab eventKey="rawMaterials" title="Raw Materials">
                  <WastageAnalysisTable
                    rawMaterialWastage={formattedData?.rawMaterialWastage}
                    expiredItems={[]}
                    expiredProducts={[]}
                    tableCardStyle={{
                      borderRadius: 20,
                      padding: 10,
                      background: "#fff",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      display: "flex",
                      flexDirection: "column",
                      marginTop: 20,
                    }}
                    scrollBodyStyle={{ flex: 1, overflowY: "auto" }}
                  />
                </Tab>

                <Tab eventKey="expiredProducts" title="Expired Products">
                  <WastageAnalysisTable
                    expiredProducts={formattedData?.expiredProducts}
                    expiredItems={[]}
                    rawMaterialWastage={[]}
                    tableCardStyle={{
                      borderRadius: 20,
                      padding: 10,
                      background: "#fff",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      display: "flex",
                      flexDirection: "column",
                      marginTop: 20,
                    }}
                    scrollBodyStyle={{ flex: 1, overflowY: "auto" }}
                  />
                </Tab>
              </Tabs>
            </>
          )}
        </ServiceRenderer>
      </div>
    </div>
  );
}
// "use client";

// import React, { useState, useEffect } from "react";
// import { Tabs, Tab } from "react-bootstrap";
// import { FaTrashAlt } from "react-icons/fa";

// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import { useWasteSummary } from "@/services/waste-management-service";
// import { wastageAnalysisDataFormatter } from "@/utils/data_formatters/dashboardFormatter";
// import WastageAnalysisTopCards from "@/components/common/dashboard/card/WastageAnalysisTopCards";
// import { WastageAnalysisTable } from "@/components/common/dashboard/TablesSort";
// import { applyDateRange } from "@/utils"; // ✅ Use the provided utility
// import { formatDate } from "@/utils";

// export default function WastageAnalytics() {
//   const { startDate: ctxStartDate, endDate: ctxEndDate } =
//     useDashboardContext();
//   const [activeTab, setActiveTab] = useState("expiredItems");

//   // ✅ Date filter state
//   const [activeDateRange, setActiveDateRange] = useState("Today");
//   const [startDate, setStartDate] = useState(ctxStartDate || null);
//   const [endDate, setEndDate] = useState(ctxEndDate || null);

//   // ✅ Sync with context when it updates
//   useEffect(() => {
//     if (ctxStartDate) setStartDate(ctxStartDate);
//     if (ctxEndDate) setEndDate(ctxEndDate);
//   }, [ctxStartDate, ctxEndDate]);

//   // ✅ styles
//   const styles = {
//     headerBar: {
//       background: "linear-gradient(90deg, #b31217, #e52d27)",
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
//     pillRow: {
//       display: "flex",
//       alignItems: "center",
//       marginBottom: 20,
//       flexWrap: "wrap",
//     },
//     datePill: (active) => ({
//       background: active ? "#fff" : "transparent",
//       border: active ? "2px solid #e52d27" : "2px solid #ececec",
//       color: active ? "#e52d27" : "#1d2d35",
//       borderRadius: 32,
//       padding: "8px 22px",
//       fontWeight: 600,
//       fontSize: 15,
//       marginRight: 12,
//       marginBottom: 10,
//       boxShadow: active ? "0 2px 6px #ffd6d6" : "none",
//       cursor: "pointer",
//       transition: "all 0.15s",
//     }),
//   };

//   // ✅ Handle Date Pill click using utility function
//   const handleDateRangeChange = (range) => {
//     const { start, end } = applyDateRange(range);
//     setActiveDateRange(range);
//     setStartDate(start);
//     setEndDate(end);
//   };

//   return (
//     <div style={{ background: "#f2f3fb", minHeight: "100vh" }}>
//       {/* 🔹 Header */}
//       <div style={styles.headerBar}>
//         <h1 style={styles.headerTitle}>
//           <FaTrashAlt size={34} style={{ marginRight: 10 }} />
//           Wastage Analysis
//         </h1>
//         <p style={styles.headerSubtitle}>
//           Track and minimize food waste across all categories
//         </p>
//       </div>

//       {/* 🔹 Analytics Section */}
//       <div style={styles.analyticsBox}>
//         {/* ✅ Date Filters */}
//         <div style={styles.pillRow}>
//           {["Today", "Yesterday", "This Week", "This Month", "Custom"].map(
//             (range) => (
//               <div
//                 key={range}
//                 style={styles.datePill(activeDateRange === range)}
//                 onClick={() => handleDateRangeChange(range)}
//               >
//                 {range}
//               </div>
//             )
//           )}
//         </div>

//         <ServiceRenderer
//           queryHook={useWasteSummary}
//           queryKey={[
//             "wasteSummary",
//             { startdt: startDate, enddt: endDate, range: activeDateRange },
//           ]}
//           queryFn={() =>
//             useWasteSummary({
//               startdt: startDate,
//               enddt: endDate,
//               range: activeDateRange,
//             }).queryFn
//           }
//           queryArgs={[
//             {
//               startdt: startDate,
//               enddt: endDate,
//             },
//           ]}
//           formatter={wastageAnalysisDataFormatter}
//           shimmerCount={3}
//         >
//           {(formattedData) => (
//             <>
//               {/* ✅ Top summary cards */}
//               <WastageAnalysisTopCards
//                 cardsData={formattedData?.cardsData}
//                 statCard={{
//                   background: "#fff",
//                   minWidth: "23vw",
//                   flex: "0 0 auto",
//                 }}
//               />

//               {/* ✅ Tabs for tables */}
//               <Tabs
//                 activeKey={activeTab}
//                 onSelect={(k) => setActiveTab(k)}
//                 className="mt-4"
//               >
//                 <Tab eventKey="expiredItems" title="Expired Items">
//                   <WastageAnalysisTable
//                     expiredItems={formattedData?.expiredItems}
//                     expiredProducts={[]}
//                     rawMaterialWastage={[]}
//                     tableCardStyle={{
//                       borderRadius: 20,
//                       padding: 10,
//                       background: "#fff",
//                       boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                       display: "flex",
//                       flexDirection: "column",
//                       marginTop: 20,
//                     }}
//                     scrollBodyStyle={{ flex: 1, overflowY: "auto" }}
//                   />
//                 </Tab>

//                 <Tab eventKey="rawMaterials" title="Raw Materials">
//                   <WastageAnalysisTable
//                     rawMaterialWastage={formattedData?.rawMaterialWastage}
//                     expiredItems={[]}
//                     expiredProducts={[]}
//                     tableCardStyle={{
//                       borderRadius: 20,
//                       padding: 10,
//                       background: "#fff",
//                       boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                       display: "flex",
//                       flexDirection: "column",
//                       marginTop: 20,
//                     }}
//                     scrollBodyStyle={{ flex: 1, overflowY: "auto" }}
//                   />
//                 </Tab>

//                 <Tab eventKey="expiredProducts" title="Expired Products">
//                   <WastageAnalysisTable
//                     expiredProducts={formattedData?.expiredProducts}
//                     expiredItems={[]}
//                     rawMaterialWastage={[]}
//                     tableCardStyle={{
//                       borderRadius: 20,
//                       padding: 10,
//                       background: "#fff",
//                       boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                       display: "flex",
//                       flexDirection: "column",
//                       marginTop: 20,
//                     }}
//                     scrollBodyStyle={{ flex: 1, overflowY: "auto" }}
//                   />
//                 </Tab>
//               </Tabs>
//             </>
//           )}
//         </ServiceRenderer>
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useState } from "react";
// import { Tabs, Tab } from "react-bootstrap";
// import { FaTrashAlt } from "react-icons/fa";

// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import { useWasteSummary } from "@/services/waste-management-service";
// import { wastageAnalysisDataFormatter } from "@/utils/data_formatters/dashboardFormatter";
// import WastageAnalysisTopCards from "@/components/common/dashboard/card/WastageAnalysisTopCards";
// import { WastageAnalysisTable } from "@/components/common/dashboard/TablesSort";

// export default function WastageAnalytics() {
//   const { startDate, endDate } = useDashboardContext();
//   const [activeTab, setActiveTab] = useState("expiredItems");

//   // ✅ Date filter state
//   const [activeDateRange, setActiveDateRange] = useState("Today");

//   // ✅ styles
//   const styles = {
//     headerBar: {
//       background: "linear-gradient(90deg, #b31217, #e52d27)",
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
//     pillRow: {
//       display: "flex",
//       alignItems: "center",
//       marginBottom: 20,
//       flexWrap: "wrap",
//     },
//     datePill: (active) => ({
//       background: active ? "#fff" : "transparent",
//       border: active ? "2px solid #e52d27" : "2px solid #ececec",
//       color: active ? "#e52d27" : "#1d2d35",
//       borderRadius: 32,
//       padding: "8px 22px",
//       fontWeight: 600,
//       fontSize: 15,
//       marginRight: 12,
//       marginBottom: 10,
//       boxShadow: active ? "0 2px 6px #ffd6d6" : "none",
//       cursor: "pointer",
//       transition: "all 0.15s",
//     }),
//   };

//   return (
//     <div style={{ background: "#f2f3fb", minHeight: "100vh" }}>
//       {/* 🔹 Header */}
//       <div style={styles.headerBar}>
//         <h1 style={styles.headerTitle}>
//           <FaTrashAlt size={34} style={{ marginRight: 10 }} />
//           Wastage Analysis
//         </h1>
//         <p style={styles.headerSubtitle}>
//           Track and minimize food waste across all categories
//         </p>
//       </div>

//       {/* 🔹 Analytics Section */}
//       <div style={styles.analyticsBox}>
//         {/* ✅ Date Filters */}
//         <div style={styles.pillRow}>
//           {["Today", "Yesterday", "This Week", "This Month", "Custom"].map(
//             (range) => (
//               <div
//                 key={range}
//                 style={styles.datePill(activeDateRange === range)}
//                 onClick={() => setActiveDateRange(range)}
//               >
//                 {range}
//               </div>
//             )
//           )}
//         </div>

//         <ServiceRenderer
//           queryHook={useWasteSummary}
//           queryKey={[
//             "wasteSummary",
//             { startdt: startDate, enddt: endDate, range: activeDateRange },
//           ]}
//           queryFn={() =>
//             useWasteSummary({
//               startdt: startDate,
//               enddt: endDate,
//               range: activeDateRange,
//             }).queryFn
//           }
//           queryArgs={[
//             { startdt: startDate, enddt: endDate, range: activeDateRange },
//           ]}
//           formatter={wastageAnalysisDataFormatter}
//           shimmerCount={3}
//         >
//           {(formattedData) => (
//             <>
//               {/* ✅ Top summary cards */}
//               <WastageAnalysisTopCards
//                 cardsData={formattedData?.cardsData}
//                 statCard={{
//                   background: "#fff",
//                   minWidth: "23vw",
//                   flex: "0 0 auto",
//                 }}
//               />

//               {/* ✅ Tabs for tables */}
//               <Tabs
//                 activeKey={activeTab}
//                 onSelect={(k) => setActiveTab(k)}
//                 className="mt-4"
//               >
//                 <Tab eventKey="expiredItems" title="Expired Items">
//                   <WastageAnalysisTable
//                     expiredItems={formattedData?.expiredItems}
//                     expiredProducts={[]}
//                     rawMaterialWastage={[]}
//                     tableCardStyle={{
//                       borderRadius: 20,
//                       padding: 10,
//                       background: "#fff",
//                       boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                       display: "flex",
//                       flexDirection: "column",
//                       marginTop: 20,
//                     }}
//                     scrollBodyStyle={{ flex: 1, overflowY: "auto" }}
//                   />
//                 </Tab>

//                 <Tab eventKey="rawMaterials" title="Raw Materials">
//                   <WastageAnalysisTable
//                     rawMaterialWastage={formattedData?.rawMaterialWastage}
//                     expiredItems={[]}
//                     expiredProducts={[]}
//                     tableCardStyle={{
//                       borderRadius: 20,
//                       padding: 10,
//                       background: "#fff",
//                       boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                       display: "flex",
//                       flexDirection: "column",
//                       marginTop: 20,
//                     }}
//                     scrollBodyStyle={{ flex: 1, overflowY: "auto" }}
//                   />
//                 </Tab>

//                 <Tab eventKey="expiredProducts" title="Expired Products">
//                   <WastageAnalysisTable
//                     expiredProducts={formattedData?.expiredProducts}
//                     expiredItems={[]}
//                     rawMaterialWastage={[]}
//                     tableCardStyle={{
//                       borderRadius: 20,
//                       padding: 10,
//                       background: "#fff",
//                       boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                       display: "flex",
//                       flexDirection: "column",
//                       marginTop: 20,
//                     }}
//                     scrollBodyStyle={{ flex: 1, overflowY: "auto" }}
//                   />
//                 </Tab>
//               </Tabs>
//             </>
//           )}
//         </ServiceRenderer>
//       </div>
//     </div>
//   );
// }
// "use client";

// import React, { useState } from "react";
// import { Tabs, Tab } from "react-bootstrap";
// import { FaTrashAlt } from "react-icons/fa";

// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import { useWasteSummary } from "@/services/waste-management-service";
// import { wastageAnalysisDataFormatter } from "@/utils/data_formatters/dashboardFormatter";
// import WastageAnalysisTopCards from "@/components/common/dashboard/card/WastageAnalysisTopCards";
// import { WastageAnalysisTable } from "@/components/common/dashboard/TablesSort";
// export default function WastageAnalytics() {
//   const { startDate, endDate } = useDashboardContext();
//   const [activeTab, setActiveTab] = useState("expiredItems");

//   // ✅ styles similar to ConsumptionClosingAnalysis
//   const styles = {
//     headerBar: {
//       background: "linear-gradient(90deg, #b31217, #e52d27)",
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
//   };

//   return (
//     <div style={{ background: "#f2f3fb", minHeight: "100vh" }}>
//       {/* 🔹 Header */}
//       <div style={styles.headerBar}>
//         <h1 style={styles.headerTitle}>
//           <FaTrashAlt size={34} style={{ marginRight: 10 }} />
//           Wastage Analysis
//         </h1>
//         <p style={styles.headerSubtitle}>
//           Track and minimize food waste across all categories
//         </p>
//       </div>

//       {/* 🔹 Analytics Section */}
//       <div style={styles.analyticsBox}>
//         <ServiceRenderer
//           queryHook={useWasteSummary}
//           queryKey={["wasteSummary", { startdt: startDate, enddt: endDate }]}
//           queryFn={() =>
//             useWasteSummary({ startdt: startDate, enddt: endDate }).queryFn
//           }
//           queryArgs={[{ startdt: startDate, enddt: endDate }]}
//           formatter={wastageAnalysisDataFormatter}
//           shimmerCount={3}
//         >
//           {(formattedData) => (
//             <>
//               {/* ✅ Top summary cards */}
//               <WastageAnalysisTopCards
//                 cardsData={formattedData?.cardsData}
//                 statCard={{
//                   background: "#fff",
//                   minWidth: "23vw",
//                   flex: "0 0 auto",
//                 }}
//               />

//               {/* ✅ Tabs for tables */}
//               <Tabs
//                 activeKey={activeTab}
//                 onSelect={(k) => setActiveTab(k)}
//                 className="mt-4"
//               >
//                 <Tab eventKey="expiredItems" title="Expired Items">
//                   <WastageAnalysisTable
//                     expiredItems={formattedData?.expiredItems}
//                     expiredProducts={[]}
//                     rawMaterialWastage={[]}
//                     tableCardStyle={{
//                       borderRadius: 20,
//                       padding: 10,
//                       background: "#fff",
//                       boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                       display: "flex",
//                       flexDirection: "column",
//                       marginTop: 20,
//                     }}
//                     scrollBodyStyle={{ flex: 1, overflowY: "auto" }}
//                   />
//                 </Tab>

//                 <Tab eventKey="rawMaterials" title="Raw Materials">
//                   <WastageAnalysisTable
//                     rawMaterialWastage={formattedData?.rawMaterialWastage}
//                     expiredItems={[]}
//                     expiredProducts={[]}
//                     tableCardStyle={{
//                       borderRadius: 20,
//                       padding: 10,
//                       background: "#fff",
//                       boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                       display: "flex",
//                       flexDirection: "column",
//                       marginTop: 20,
//                     }}
//                     scrollBodyStyle={{ flex: 1, overflowY: "auto" }}
//                   />
//                 </Tab>

//                 <Tab eventKey="expiredProducts" title="Expired Products">
//                   <WastageAnalysisTable
//                     expiredProducts={formattedData?.expiredProducts}
//                     expiredItems={[]}
//                     rawMaterialWastage={[]}
//                     tableCardStyle={{
//                       borderRadius: 20,
//                       padding: 10,
//                       background: "#fff",
//                       boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                       display: "flex",
//                       flexDirection: "column",
//                       marginTop: 20,
//                     }}
//                     scrollBodyStyle={{ flex: 1, overflowY: "auto" }}
//                   />
//                 </Tab>
//               </Tabs>
//             </>
//           )}
//         </ServiceRenderer>
//       </div>
//     </div>
//   );
// }
