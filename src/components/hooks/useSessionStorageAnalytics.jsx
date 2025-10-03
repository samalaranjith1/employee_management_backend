import { useState, useEffect } from "react";
import { applyDateRange } from "@/utils";

// Helper function remains unchanged
function detectDateRange(startDate, endDate) {
  if (!startDate || !endDate) return "Custom";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  const isSameDay = (d1, d2) =>
    d1?.getFullYear() === d2?.getFullYear() &&
    d1?.getMonth() === d2?.getMonth() &&
    d1?.getDate() === d2?.getDate();

  const day = today.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() + diff);
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  if (isSameDay(start, today) && isSameDay(end, today)) return "Today";
  if (isSameDay(start, yesterday) && isSameDay(end, yesterday))
    return "Yesterday";
  if (isSameDay(start, startOfWeek) && isSameDay(end, today))
    return "This Week";
  if (isSameDay(start, startOfMonth) && isSameDay(end, today))
    return "This Month";
  return "Custom";
}

export function useSessionStorageAnalytics(
  keyName,
  initialState = {},
  externalParams = {}
) {
  const [filters, setFilters] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeDateRange, setActiveDateRange] = useState("Today");
  const [searchQuery, setSearchQuery] = useState("");
  const [initStateLoaded, setInitStateLoaded] = useState(false);

  useEffect(() => {
    let stored = null;
    try {
      const raw = sessionStorage.getItem(keyName);
      if (raw) stored = JSON.parse(raw);
    } catch (e) {
      console.warn("Failed to parse sessionStorage", e);
    }

    let initialFilters = {};
    let initialStartDate = null;
    let initialEndDate = null;
    let initialSearchQuery = "";
    let initialActiveRange = null;

    if (stored) {
      initialFilters = {
        ...stored.filters,
        department: stored.departments ?? stored.filters?.department ?? "",
        item: stored.items ?? stored.filters?.item ?? "",
        product: stored.products ?? stored.filters?.product ?? "",
        masterproduct:
          stored.masterproducts ?? stored.filters?.masterproduct ?? "",
        category: stored.categories ?? stored.filters?.category ?? "",
        supplier: stored.suppliers ?? stored.filters?.supplier ?? "",
      };
      initialStartDate = stored.startDate ? new Date(stored.startDate) : null;
      initialEndDate = stored.endDate ? new Date(stored.endDate) : null;
      initialSearchQuery = stored.searchQuery || "";
      initialActiveRange = stored.activeDateRange || null;
    } else {
      initialFilters = externalParams.filters || initialState.filters || {};
      initialStartDate = externalParams.startDate
        ? new Date(externalParams.startDate)
        : initialState.startDate
        ? new Date(initialState.startDate)
        : null;
      initialEndDate = externalParams.endDate
        ? new Date(externalParams.endDate)
        : initialState.endDate
        ? new Date(initialState.endDate)
        : null;
      initialSearchQuery =
        externalParams.searchQuery || initialState.searchQuery || "";
      initialActiveRange = null; // No active range specified; detect below
    }

    // If no activeDateRange came from storage, auto detect from dates
    const detectedRange = initialActiveRange
      ? initialActiveRange
      : detectDateRange(initialStartDate, initialEndDate);

    // Set initial states in a batch - avoid multiple renders
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
    setFilters(initialFilters);
    setSearchQuery(initialSearchQuery);
    setActiveDateRange(detectedRange);

    setInitStateLoaded(true);
  }, [keyName]);

  // Save all state to sessionStorage on changes
  useEffect(() => {
    if (!initStateLoaded) return;
    const data = {
      filters,
      startDate,
      endDate,
      activeDateRange,
      searchQuery,
      departments: filters.department,
      items: filters.item,
      products: filters.product,
      suppliers: filters.supplier,
      masterproducts: filters.masterproduct,
      categories: filters.category,
    };
    try {
      sessionStorage.setItem(keyName, JSON.stringify(data));
    } catch (e) {
      console.warn("Failed to save to sessionStorage", e);
    }
  }, [
    filters,
    startDate,
    endDate,
    activeDateRange,
    searchQuery,
    keyName,
    initStateLoaded,
  ]);

  // Handler for when user explicitly selects date range
  const handleDateRangeChange = (range) => {
    const { start, end } = applyDateRange(range);
    setActiveDateRange(range);
    setStartDate(start);
    setEndDate(end);
  };

  return {
    filters,
    setFilters,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    activeDateRange,
    setActiveDateRange,
    handleDateRangeChange,
    searchQuery,
    setSearchQuery,
    initialized: initStateLoaded,
  };
}
// import { useState, useEffect } from "react";
// import { applyDateRange } from "@/utils";

// // Helper function remains the same
// function detectDateRange(startDate, endDate) {
//   if (!startDate || !endDate) return "Custom";
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);
//   const yesterday = new Date(today);
//   yesterday.setDate(today.getDate() - 1);
//   const start = new Date(startDate);
//   start.setHours(0, 0, 0, 0);
//   const end = new Date(endDate);
//   end.setHours(0, 0, 0, 0);

//   const isSameDay = (d1, d2) =>
//     d1.getFullYear() === d2.getFullYear() &&
//     d1.getMonth() === d2.getMonth() &&
//     d1.getDate() === d2.getDate();

//   const day = today.getDay();
//   const diff = day === 0 ? -6 : 1 - day;
//   const startOfWeek = new Date(today);
//   startOfWeek.setDate(today.getDate() + diff);
//   const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

//   if (isSameDay(start, today) && isSameDay(end, today)) return "Today";
//   if (isSameDay(start, yesterday) && isSameDay(end, yesterday))
//     return "Yesterday";
//   if (isSameDay(start, startOfWeek) && isSameDay(end, today))
//     return "This Week";
//   if (isSameDay(start, startOfMonth) && isSameDay(end, today))
//     return "This Month";
//   return "Custom";
// }

// export function useSessionStorageAnalytics(
//   keyName,
//   initialState = {},
//   externalParams = {}
// ) {
//   const [filters, setFilters] = useState({});
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [activeDateRange, setActiveDateRange] = useState("Today");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [initStateLoaded, setInitStateLoaded] = useState(false);

//   // Consolidated initialization from sessionStorage or defaults
//   useEffect(() => {
//     let stored = null;
//     try {
//       const raw = sessionStorage.getItem(keyName);
//       if (raw) stored = JSON.parse(raw);
//     } catch (e) {
//       console.warn("Failed to parse sessionStorage", e);
//     }

//     let initialFilters = {};
//     let initialStartDate = null;
//     let initialEndDate = null;
//     let initialSearchQuery = "";

//     if (stored) {
//       // If there's stored data, build everything from it
//       initialFilters = {
//         ...stored.filters,
//         department: stored.departments ?? stored.filters?.department ?? "",
//         item: stored.items ?? stored.filters?.item ?? "",
//       };
//       initialStartDate = stored.startDate ? new Date(stored.startDate) : null;
//       initialEndDate = stored.endDate ? new Date(stored.endDate) : null;
//       initialSearchQuery = stored.searchQuery || "";
//     } else {
//       // Otherwise, use external/initial state as a fallback
//       initialFilters = externalParams.filters || initialState.filters || {};
//       initialStartDate = externalParams.startDate
//         ? new Date(externalParams.startDate)
//         : initialState.startDate
//         ? new Date(initialState.startDate)
//         : null;
//       initialEndDate = externalParams.endDate
//         ? new Date(externalParams.endDate)
//         : initialState.endDate
//         ? new Date(initialState.endDate)
//         : null;
//       initialSearchQuery =
//         externalParams.searchQuery || initialState.searchQuery || "";
//     }

//     // Detect the range *before* setting state
//     const detectedRange = detectDateRange(initialStartDate, initialEndDate);

//     // Set all initial state in one batch
//     setStartDate(initialStartDate);
//     setEndDate(initialEndDate);
//     setFilters(initialFilters);
//     setSearchQuery(initialSearchQuery);
//     setActiveDateRange(detectedRange);

//     setInitStateLoaded(true);
//   }, [keyName]);

//   // Save to sessionStorage whenever state changes
//   useEffect(() => {
//     if (!initStateLoaded) return;
//     const data = {
//       filters,
//       startDate,
//       endDate,
//       activeDateRange,
//       searchQuery,
//       // For backward compatibility
//       departments: filters.department,
//       items: filters.item,
//     };
//     try {
//       sessionStorage.setItem(keyName, JSON.stringify(data));
//     } catch (e) {
//       console.warn("Failed to save to sessionStorage", e);
//     }
//   }, [
//     filters,
//     startDate,
//     endDate,
//     activeDateRange,
//     searchQuery,
//     keyName,
//     initStateLoaded,
//   ]);

//   // Handler for when a user explicitly clicks a date range pill
//   const handleDateRangeChange = (range) => {
//     const { start, end } = applyDateRange(range);
//     setActiveDateRange(range);
//     setStartDate(start);
//     setEndDate(end);
//   };

//   return {
//     filters,
//     setFilters,
//     startDate,
//     setStartDate,
//     endDate,
//     setEndDate,
//     activeDateRange,
//     setActiveDateRange,
//     handleDateRangeChange,
//     searchQuery,
//     setSearchQuery,
//     initialized: initStateLoaded,
//   };
// }
