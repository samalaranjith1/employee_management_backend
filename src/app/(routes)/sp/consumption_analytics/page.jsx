"use client";
import React from "react";
import { useOrgFilters } from "@/components/hooks/useOrgFilters";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { formatDate } from "@/utils";
import { useSessionStorageAnalytics } from "@/components/hooks/useSessionStorageAnalytics";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import AnalyticsPage from "@/components/common/smallPages/AnalyticsPage";
import { useItemsConsumptionHistory } from "@/services/item-service";
import { consumptionHistoryFormatter } from "@/utils/data_formatters/smallPagesDataFormatter";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { IconCircleArrowLeft } from "@tabler/icons-react";

export default function ConsumptionHistoryAnalysis() {
  const { isDeptLoading, isItemsLoading, departmentOptions, itemOptions } =
    useOrgFilters();
  const { isMobile } = useDashboardContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { startDate: startDateCT, endDate: endDateCT } = useDashboardContext()
  const randomKey = Array.from(searchParams.keys())[0] || "ConsumptionHistory";
  const pathname = usePathname();
  const isDashboard = pathname === "/" || pathname === "/dashboard";

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
      background: "linear-gradient(90deg, #133448, #015858)",
      borderBottomLeftRadius: "30px",
      borderBottomRightRadius: "30px",
      padding: "25px 0 60px 0",
      // marginTop: 60,
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
      {!isDashboard ? <div style={styles.headerBar}><h1 style={styles.headerTitle}>
        {
          isMobile && <IconCircleArrowLeft
            size={40}
            style={{ cursor: "pointer" }}
            onClick={() => router.back()} // ⬅️ Go to previous page
          />} Consumption Analytics</h1>
        <p style={styles.headerSubtitle}>
          Real time insights into your restaurant consumption patterns and operational efficiency
        </p>
      </div> : <div className="mt-5 p-5"></div>
      }
      <div style={styles.analyticsBox}>
        <ServiceRenderer
          queryHook={useItemsConsumptionHistory}
          queryKey={[
            "itemsConsumptionHistory",
            {
              startdt: isDashboard ? startDateCT : formatDate(startDate),
              enddt: isDashboard ? endDateCT : formatDate(endDate),
              outlet: 1,
              userId: 7,
              departmentId: filters.department || null,
              itemId: filters.item || null,
            },
          ]}
          queryFn={() =>
            useItemsConsumptionHistory({
              startdt: isDashboard ? startDateCT : formatDate(startDate),
              enddt: isDashboard ? endDateCT : formatDate(endDate),
              outlet: 1,
              userId: 7,
              departmentId: filters.department || null,
              itemId: filters.item || null,
            }).queryFn
          }
          queryArgs={[
            {
              startdt: isDashboard ? startDateCT : formatDate(startDate),
              enddt: isDashboard ? endDateCT : formatDate(endDate),
              outlet: 1,
              userId: 7,
              departments: filters.department || null,
              items: filters.item || null,
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
                  value: filters.department,
                  onChange: (val) =>
                    setFilters((f) => ({ ...f, department: val })),
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
