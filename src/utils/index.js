import { startOfWeek, startOfMonth, subDays, format } from "date-fns";

//dashboard filters
export const formatDate = (date) => format(date, "yyyy-MM-dd");

export const handlePreset = (type, stateChanges) => {
  const { setActive, setShowCalendar, setStartDate, setEndDate } =
    stateChanges;
  setActive(type);
  setShowCalendar(false);

  const today = new Date();
  let start, end;

  switch (type.replace(' ','').toLowerCase()) {
    case "yesterday":
      start = subDays(today, 1);
      end = subDays(today, 1);
      break;
    case "thisweek":
      start = startOfWeek(today, { weekStartsOn: 1 });
      end = today;
      break;
    case "thismonth":
      start = startOfMonth(today);
      end = today;
      break;
    case "this_week":
      // get first day of current week (Monday)
      const firstDay = new Date(today);
      const day = firstDay.getDay(); // Sunday = 0
      const diff = day === 0 ? -6 : 1 - day; // adjust Sunday to Monday start
      firstDay.setDate(today.getDate() + diff);
      start = firstDay;
      end = today;
      setShowCalendar(false);
      break;
    case "this_month":
      const firstDayMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      start = firstDayMonth;
      end = today;
      setShowCalendar(false);
      break;
    case "custom":
      setShowCalendar(true);
      return;
    default: // today
      start = today;
      end = today;
  }

  setStartDate(formatDate(start));
  setEndDate(formatDate(end));
};

export const handleCustomChange = (dates, stateChanges) => {
  const { setShowCalendar, setEndDate, setStartDate } = stateChanges;
  let [start, end] = dates;

  if (start && !end) {
    setStartDate(formatDate(start));
    setEndDate(null);
    return;
  }

  if (start && end) {
    if (start > end) {
      [start, end] = [end, start];
    }
    setStartDate(formatDate(start));
    setEndDate(formatDate(end));
    setShowCalendar(false);
  }
};

// utils/sortUtils.js

// ✅ Helper: detect and normalize different value types
// utils/sortData.js
export function sortData(data, key, direction = "asc") {
  if (!Array.isArray(data)) return [];

  return [...data].sort((a, b) => {
    const aVal = parseValue(a[key]);
    const bVal = parseValue(b[key]);

    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });
}

// ✅ Place parseValue inside same file or import it
function parseValue(val) {
  if (val === null || val === undefined) return "";

  // Handle numbers with locale/currency
  if (typeof val === "string") {
    const cleaned = val.replace(/[^0-9.,-]/g, ""); // keep digits, comma, dot, minus

    if (/^\d{1,3}([,. ]\d{3})+([,.]\d+)?$/.test(cleaned)) {
      const normalized = cleaned
        .replace(/\s/g, "")
        .replace(/\.(?=\d{3}(\D|$))/g, "")
        .replace(/,(?=\d{3}(\D|$))/g, "")
        .replace(",", ".");
      const num = parseFloat(normalized);
      if (!isNaN(num)) return num;
    }

    const num = parseFloat(cleaned.replace(/,/g, ""));
    if (!isNaN(num)) return num;
  }

  // Handle Dates
  const date = new Date(val);
  if (!isNaN(date.getTime()) && typeof val !== "boolean") {
    return date.getTime();
  }

  // Handle Numbers (raw)
  const num = parseFloat(val);
  if (!isNaN(num) && isFinite(num)) {
    return num;
  }

  // Fallback String
  return String(val).toLowerCase();
}

// function parseValue(val) {
//   if (val === null || val === undefined) return "";

//   // ✅ Handle numbers with locale formatting (e.g. "12,345.67", "12.345,67", "₹12,345")
//   if (typeof val === "string") {
//     const cleaned = val.replace(/[^0-9.,-]/g, ""); // keep digits, comma, dot, minus

//     // Check for thousand separators style (e.g. 12,345.67 or 12.345,67)
//     if (/^\d{1,3}([,. ]\d{3})+([,.]\d+)?$/.test(cleaned)) {
//       // normalize: remove thousand separators, unify decimal point
//       const normalized = cleaned
//         .replace(/\s/g, "") // remove spaces
//         .replace(/\.(?=\d{3}(\D|$))/g, "") // remove dots as thousands sep
//         .replace(/,(?=\d{3}(\D|$))/g, "") // remove commas as thousands sep
//         .replace(",", "."); // final decimal point
//       const num = parseFloat(normalized);
//       if (!isNaN(num)) return num;
//     }

//     // If simpler case: "12,345" → "12345"
//     const num = parseFloat(cleaned.replace(/,/g, ""));
//     if (!isNaN(num)) return num;
//   }

//   // ✅ Try Date
//   const date = new Date(val);
//   if (!isNaN(date.getTime()) && typeof val !== "boolean") {
//     return date.getTime();
//   }

//   // ✅ Try Number (raw)
//   const num = parseFloat(val);
//   if (!isNaN(num) && isFinite(num)) {
//     return num;
//   }

//   // ✅ Fallback String
//   return String(val).toLowerCase();
// }

// ✅ Sort function
// export function sortData(data, key, direction = "asc") {
//   if (!Array.isArray(data)) return [];

//   return [...data].sort((a, b) => {
//     const aVal = parseValue(a[key]);
//     const bVal = parseValue(b[key]);

//     if (aVal < bVal) return direction === "asc" ? -1 : 1;
//     if (aVal > bVal) return direction === "asc" ? 1 : -1;
//     return 0;
//   });
// }

// utils/dateUtils.js
export const applyDateRange = (range) => {
  const today = formatDate(new Date());
  let start = null,
    end = null;

  switch (range) {
    case "Today":
      start = end = today;
      break;
    case "Yesterday": {
      const yesterday = new Date(); // clone today
      yesterday.setDate(yesterday.getDate() - 1);
      start = end = formatDate(yesterday);
      break;
    }
    case "This Week": {
      const curr = new Date();
      const first = curr.getDate() - curr.getDay();
      start = formatDate(new Date(curr.setDate(first)));
      end = formatDate(new Date());
      break;
    }
    case "This Month": {
      const curr = new Date();
      start = formatDate(new Date(curr.getFullYear(), curr.getMonth(), 1));
      end = formatDate(new Date());
      break;
    }
    case "Custom":
      start = null;
      end = null;
      break;
    default:
      break;
  }

  return { start, end };
};
