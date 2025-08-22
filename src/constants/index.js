export const presetOptions = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "thisweek", label: "This Week" },
  { key: "thismonth", label: "This Month" },
  { key: "custom", label: "Custom" },
];

// utils/formatters.js
export const formatCurrency = (value) => {
  if (value === null || value === undefined) return "₹0";
  return `₹${Number(value).toLocaleString()}`;
};

export const formatPercentage = (value) => {
  if (value === null || value === undefined) return "0%";
  return `${Number(value).toFixed(1)}%`;
};

