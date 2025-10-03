import {
  FaUtensils,
  FaTimesCircle,
  FaChartLine,
  FaCoffee,
  FaRupeeSign,
  FaPercentage,
  FaBullseye,
  FaExclamationTriangle,
  FaBoxOpen,
  FaPercent,
  FaBox,
  FaCalendarAlt,
  FaShoppingBag,
  FaDrumstickBite,
  FaLeaf,
  FaFish,
  FaAppleAlt,
  FaArrowUp,
  FaMinus,
  FaArrowDown,
  FaStar,
  FaShoppingCart,
  FaWallet,
  FaTrashAlt,
  FaCartPlus,
  FaArrowRight,
} from "react-icons/fa";
import {
  format,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  differenceInWeeks,
  startOfWeek,
  endOfWeek,
  parseISO,
} from "date-fns";

import { formatCurrency } from "@/constants";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

// export function consumptionSummaryFormatter(data) {
//   return [
//     {
//       title: "CONSUMPTION %",
//       percentage: `${data.current?.consumptionPercentage?.toFixed(0)}%`,
//       percentageChange: "+2.1%", // you can calculate if API gives trend data
//       icon: <FaUtensils size={36} color="#bc4b00" />,
//       textColor: "#bc4b00",
//       bgColor: "rgb(255,247,237)",
//       rows: [
//         { label: "Sale", value: `₹${data?.current?.netSales?.toLocaleString()}` },
//         {
//           label: "Consumption",
//           value: `₹${data.current?.consumptionValue?.toLocaleString()}`,
//         },
//         {
//           label: "Net Consumption",
//           value: `₹${data.current?.netConsumptionValue?.toLocaleString()} (${data.current?.netConsumptionPercentage?.toFixed(
//             0
//           )}%)`,
//         },
//       ],
//     },
//     {
//       title: "CONSUMPTION",
//       percentage: `₹${data.current?.consumptionValue?.toLocaleString()}`,
//       percentageChange: "-1.5%", // example
//       icon: <FaChartLine size={36} color="#1d40af" />,
//       textColor: "#1d40af",
//       bgColor: "rgb(238,245,255)",
//       rows: [
//         {
//           label: "Opening Stock",
//           value: `₹${data.current?.consumptionOpeningValue?.toLocaleString()}`,
//         },
//         {
//           label: "Closing Stock",
//           value: `₹${data.current?.consumptionClosingValue?.toLocaleString()}`,
//         },
//         {
//           label: "Net Consumption",
//           value: `₹${data.current?.netConsumptionValue?.toLocaleString()}`,
//         },
//       ],
//     },
//     {
//       title: "NET SALES",
//       percentage: `₹${data.current?.netSales.toLocaleString()}`,
//       percentageChange: "+8.3%", // example
//       icon: <FaCoffee size={36} color="#5b21b6" />,
//       textColor: "#5b21b6",
//       bgColor: "rgb(250,245,255)",
//       rows: [
//         {
//           label: "Total Sales",
//           value: `₹${data.current?.totalSales.toLocaleString()}`,
//         },
//         {
//           label: "Discount",
//           value: `₹${data.current?.discount.toLocaleString()}`,
//         },
//         { label: "Tax", value: `₹${data?.current?.tax.toLocaleString()}` },
//         // {
//         //   label: "Dine in",
//         //   value: `₹${data.current?.dineInSales?.toLocaleString()}`,
//         // },
//         // {
//         //   label: "Online",
//         //   value: `₹${data.current?.onlineSales?.toLocaleString()}`,
//         // },
//       ],
//     },
//   ];
// }

// monthSummaryFormatter.js

export function consumptionSummaryFormatter(data) {
  return [
    {
      title: "CONSUMPTION %",
      percentage: `${data.current?.consumptionPercentage?.toFixed(0)}%`,
      percentageChange: "+2.1%",
      icon: <FaUtensils size={36} color="#bc4b00" />,
      textColor: "#bc4b00",
      bgColor: "rgb(255,247,237)",
      routeUrl: "/consumption_analytics", // 🔹 direct
      rows: [
        {
          label: "Sale",
          value: `₹${data?.current?.netSales?.toLocaleString()}`,
        },
        {
          label: "Consumption",
          value: `₹${data.current?.consumptionValue?.toLocaleString()}`,
        },
        {
          label: "Net Consumption",
          value: `₹${data.current?.netConsumptionValue?.toLocaleString()} (${data.current?.netConsumptionPercentage?.toFixed(
            0
          )}%)`,
        },
      ],
    },
    {
      title: "CONSUMPTION",
      percentage: `₹${data.current?.consumptionValue?.toLocaleString()}`,
      percentageChange: "-1.5%",
      icon: <FaChartLine size={36} color="#1d40af" />,
      textColor: "#1d40af",
      bgColor: "rgb(238,245,255)",
      routeUrl: "/consumption_analytics", // 🔹 direct
      rows: [
        {
          label: "Opening Stock",
          value: `₹${data.current?.consumptionOpeningValue?.toLocaleString()}`,
        },
        {
          label: "Closing Stock",
          value: `₹${data.current?.consumptionClosingValue?.toLocaleString()}`,
        },
        {
          label: "Net Consumption",
          value: `₹${data.current?.netConsumptionValue?.toLocaleString()}`,
        },
      ],
    },
    {
      title: "NET SALES",
      percentage: `₹${data.current?.netSales.toLocaleString()}`,
      percentageChange: "+8.3%",
      icon: <FaCoffee size={36} color="#5b21b6" />,
      textColor: "#5b21b6",
      bgColor: "rgb(250,245,255)",
      routeUrl: "/sales_analytics", // 🔹 direct
      rows: [
        {
          label: "Total Sales",
          value: `₹${data.current?.totalSales.toLocaleString()}`,
        },
        {
          label: "Discount",
          value: `₹${data.current?.discount.toLocaleString()}`,
        },
        { label: "Tax", value: `₹${data?.current?.tax.toLocaleString()}` },
      ],
    },
  ];
}
export function monthSummaryFormatter(data) {
  if (!data?.current) return [];

  return [
    {
      title: "PROFIT",
      percentageChange: "+15.2%", // replace with actual calc if API gives
      value: formatCurrency(data.current.margin),
      trend: "up",
      trendColor: "success",
      rows: [
        {
          label: "Sales",
          value: formatCurrency(data.current.netSales),
          variant: "success",
        },
        {
          label: "Expenses",
          value: formatCurrency(data.current.totalPaymentAmount),
          variant: "secondary",
        },
      ],
      routeUrl: "",
    },
    {
      title: "EXPENSES",
      percentageChange: "+5.8%",
      value: formatCurrency(data.current.totalPaymentAmount),
      trend: "up",
      trendColor: "danger", // expenses up = danger
      rows: [
        {
          label: "COGS",
          value: formatCurrency(data.current?.purchaseValue),
          variant: "danger",
        },
        {
          label: "Fixed Cost",
          value: formatCurrency(data.current?.fixedCost),
          variant: "secondary",
        },
      ],
      routeUrl: "purchase_analytics",
    },
    {
      title: "SALES",
      percentageChange: "+12.4%",
      value: formatCurrency(data.current?.netSales),
      trend: "up",
      trendColor: "primary",
      routeUrl: "sales_analytics",
      rows: [
        {
          label: "Dine in",
          value: formatCurrency(data.current?.dineInSales),
          variant: "success",
        },
        {
          label: "Online",
          value: formatCurrency(data.current?.onlineSales),
          variant: "secondary",
        },
      ],
    },
    {
      title: "NET CONSUMPTION",
      percentageChange: "-3.2%",
      value: formatCurrency(data.current?.netConsumptionValue),
      trend: "down",
      trendColor: "primary",
      routeUrl: "consumption_analytics",
      rows: [
        {
          label: "Opening",
          value: formatCurrency(data.current?.consumptionOpeningValue),
          variant: "success",
        },
        {
          label: "Consumption",
          value: formatCurrency(data.current?.consumptionValue),
          variant: "danger",
        },
        {
          label: "Closing",
          value: formatCurrency(data.current?.consumptionClosingValue),
          variant: "secondary",
        },
      ],
    },
    {
      title: "CREDIT",
      percentageChange: "-3.2%",
      value: formatCurrency(data.current.creditAmount),
      trend: "down",
      trendColor: "primary",
      rows: [
        {
          label: "Zomato",
          value: formatCurrency(data.current.zomatoCreditAmount),
          variant: "success",
        },
        {
          label: "Swiggy",
          value: formatCurrency(data.current.swiggyCreditAmount),
          variant: "danger",
        },
        {
          label: "Others",
          value: formatCurrency(data.current.otherThanSwiggyZomatoCreditAmount),
          variant: "secondary",
        },
      ],
    },
    {
      title: "DEBIT",
      percentageChange: "-3.2%",
      value: formatCurrency(data.current.debitAmount),
      trend: "down",
      trendColor: "primary",
      rows: [
        {
          label: "Debit",
          value: formatCurrency(data.current.debitAmount),
          variant: "success",
        },
        {
          label: "Payments",
          value: formatCurrency(data.current.totalPaymentAmount),
          variant: "danger",
        },
      ],
    },
  ];
}

export function trendAnalysisFormatter(data, view) {
  if (!data || !data.list) return [];

  const list = data.list;
  const today = new Date();

  // Helper: Get tableLabel & Desc
  const getLabels = (view, itemStart, itemEnd) => {
    const dStart = parseISO(itemStart);
    const dEnd = itemEnd ? parseISO(itemEnd) : dStart;

    if (view === "Daily") {
      if (isSameDay(dStart, today)) {
        return {
          tableLabel: `${format(dStart, "MMM d")} (Today)`,
          tableLabelDesc: format(dStart, "EEEE"),
        };
      }
      return {
        tableLabel: format(dStart, "MMM d"),
        tableLabelDesc: format(dStart, "EEEE"),
      };
    }

    if (view === "Monthly") {
      if (isSameMonth(dStart, today)) {
        return {
          tableLabel: `${format(dStart, "MMM-yyyy")} (Current Month)`,
          tableLabelDesc: "",
        };
      }
      return {
        tableLabel: format(dStart, "MMM-yyyy"),
        tableLabelDesc: "",
      };
    }

    if (view === "Weekly") {
      const label = `Week of ${format(dStart, "MMM d")} - ${format(
        dEnd,
        "MMM d"
      )}`;
      if (isWithinInterval(today, { start: dStart, end: dEnd })) {
        return {
          tableLabel: label + " (Current Week)",
          tableLabelDesc: "",
        };
      }
      return {
        tableLabel: label,
        tableLabelDesc: "",
      };
    }

    if (view === "SameDay") {
      if (isSameDay(dStart, today)) {
        return {
          tableLabel: `${format(dStart, "d MMM")} (Today)`,
          tableLabelDesc: format(dStart, "EEEE"),
        };
      } else {
        const weeksAgo = differenceInWeeks(today, dStart);
        return {
          tableLabel: `${format(dStart, "d MMM")} (${weeksAgo} weeks ago)`,
          tableLabelDesc: format(dStart, "EEEE"),
        };
      }
    }

    return { tableLabel: "", tableLabelDesc: "" };
  };

  // Map API list directly
  return list.map((item, idx) => {
    const { tableLabel, tableLabelDesc } = getLabels(
      view,
      item.startDate,
      item.endDate
    );

    return {
      name:
        view === "Weekly"
          ? `Week ${idx + 1}`
          : view === "Monthly"
            ? format(parseISO(item.startDate), "MMM")
            : format(parseISO(item.startDate), "MMM d"),

      Sales: item.netSales ?? 0,
      Consumption: item?.consumptionValue ?? 0,
      Opening: item.consumptionOpeningValue ?? 0,
      Closing: item.consumptionClosingValue ?? 0,
      consumptionPercentage: item.consumptionPercentage ?? 0,

      tableLabel,
      tableLabelDesc,
    };
  });
}

export function periodDataBreakdownFormatter(raw, view) {
  if (!raw) return { cards: [], table: [] };

  const current = raw.current || {};
  const list = raw.list || [];
  const today = new Date();

  // 🔹 Same getLabels logic as trendAnalysisFormatter
  const getLabels = (view, itemStart, itemEnd) => {
    const dStart = parseISO(itemStart);
    const dEnd = itemEnd ? parseISO(itemEnd) : dStart;

    if (view === "Daily") {
      if (isSameDay(dStart, today)) {
        return {
          tableLabel: `${format(dStart, "MMM d")} (Today)`,
          tableLabelDesc: format(dStart, "EEEE"),
        };
      }
      return {
        tableLabel: format(dStart, "MMM d"),
        tableLabelDesc: format(dStart, "EEEE"),
      };
    }

    if (view === "Monthly") {
      if (isSameMonth(dStart, today)) {
        return {
          tableLabel: `${format(dStart, "MMM-yyyy")} (Current Month)`,
          tableLabelDesc: "",
        };
      }
      return {
        tableLabel: format(dStart, "MMM-yyyy"),
        tableLabelDesc: "",
      };
    }

    if (view === "Weekly") {
      const label = `Week of ${format(dStart, "MMM d")} - ${format(
        dEnd,
        "MMM d"
      )}`;
      if (isWithinInterval(today, { start: dStart, end: dEnd })) {
        return {
          tableLabel: label + " (Current Week)",
          tableLabelDesc: "",
        };
      }
      return {
        tableLabel: label,
        tableLabelDesc: "",
      };
    }

    if (view === "SameDay") {
      if (isSameDay(dStart, today)) {
        return {
          tableLabel: `${format(dStart, "d MMM")} (Today)`,
          tableLabelDesc: format(dStart, "EEEE"),
        };
      } else {
        const weeksAgo = differenceInWeeks(today, dStart);
        return {
          tableLabel: `${format(dStart, "d MMM")} (${weeksAgo} weeks ago)`,
          tableLabelDesc: format(dStart, "EEEE"),
        };
      }
    }

    return { tableLabel: "", tableLabelDesc: "" };
  };

  // 🔹 Cards (from current summary)
  const cards = [
    {
      title: "COST RATIO",
      value: `${(current.consumptionPercentage || 0).toFixed(1)}%`,
      change: "-2.1%", // placeholder until API provides delta
      color: current.consumptionPercentage > 60 ? "danger" : "success",
      bg: "white"
    },
    {
      title: `AVERAGE ${view.toUpperCase()} SALES`,
      value: formatCurrency(current.netSales),
      change: "+8.3%",
      color: "success",
      bg: "white"

    },
    {
      title: `AVERAGE ${view.toUpperCase()} CONSUMPTION`,
      value: formatCurrency(current.consumptionValue),
      change: "+5.7%",
      color: "success",
      bg: "white"
    },
    {
      title: `AVERAGE ${view.toUpperCase()} WASTE`,
      value: formatCurrency(current.wasteAmount),
      change: "-12.4%",
      color: "danger",
    },
  ];

  // 🔹 Table (from list)
  const table = list.map((d) => {
    const { tableLabel, tableLabelDesc } = getLabels(
      view,
      d.startDate,
      d.endDate
    );

    return {
      date: tableLabel,
      startDate: d.startDate,
      endDate: d.endDate,
      day: tableLabelDesc,
      sales: formatCurrency(d.netSales),
      consumption: formatCurrency(d.consumptionValue),
      waste: formatCurrency(d.wasteAmount),
      ratio: `${(d.consumptionPercentage || 0).toFixed(1)}%`,
      status: d.status,
    };
  });

  return { cards, table };
}

function getBackgroundColor(status) {
  switch (status?.toLowerCase()) {
    case "danger":
      return "#ffe8e8"; // Red
    case "warning":
      return "#fff6da"; // Yellow
    case "success":
      return "#e8f9e8"; // Green
    default:
      return "#ffffff"; // Fallback
  }
}

export function departmentConsumptionFormatter(data) {
  if (!data?.list || !Array.isArray(data.list)) return [];

  return data.list.map((item) => ({
    name: item.department?.name ?? "Unknown",
    consumptionPct: item.consumptionPercentage ?? "0%",
    netConsumptionPct: item.netConsumptionPercentage ?? "0%",
    sales: formatCurrency(item.netSales),
    opening: formatCurrency(item.consumptionOpeningValue),
    consumption: formatCurrency(item.consumptionValue),
    closing: formatCurrency(item.consumptionClosingValue),
    netConsumption: formatCurrency(item.netConsumptionValue),
    budget: formatCurrency(item.budget),
    bg: getBackgroundColor(item.status || "success"), //needs to check as it is coming null from service
  }));
}

// utils/data_formatters/departmentPerformanceFormatter.ts

export function departmentPerformanceFormatter(apiData) {
  if (!apiData || !apiData.list) return { cards: [], graph: [] };

  const cards = [
    {
      title: "Total Sales",
      value: `₹${Number(apiData.totalSales).toLocaleString()}`,
      icon: FaRupeeSign,
      iconColorClass: "text-primary",
      borderColor: "#3b82f6",
    },
    {
      title: "Total Consumption",
      value: `₹${Number(apiData.netConsumptionValue).toLocaleString()}`,
      icon: FaUtensils,
      iconColorClass: "text-success",
      borderColor: "#10b981",
    },
    {
      title: "Overall Cost %",
      value: `${apiData.consumptionPercentage}%`,
      icon: FaPercentage,
      iconColorClass: "text-warning",
      borderColor: "#f97316",
    },
    {
      title: "Target Cost %",
      value: `${apiData.targetConsumptionPercentage}%`,
      icon: FaBullseye,
      iconColorClass: "text-purple", // make sure you define this class
      borderColor: "#a855f7",
    },
  ];

  const graph = apiData.list.map((item) => ({
    title: item?.department?.name || "Unknown",
    sales: Number(item?.netSales || 0),
    consumption: Number(item?.consumptionValue || 0),
    cost: Number(item?.consumptionPercentage || 0),
    status: item?.status || "N/A",
  }));
  return { cards, graph };
}

const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

// Data formatter
export const departmentConsumptionPieChartFormatter = (apiData) => {
  if (!apiData || !apiData.list) return [];

  const chartData = apiData.list
    .filter((item) => Number(item?.netSales) > 0) // keep only items with sales > 0
    .map((item, index) => ({
      name: item?.department?.name || `Dept ${index + 1}`,
      value: Number(item?.netSales || 0),
      percentage: Number(item?.netSales / apiData.netSales || 0),
      totalSales: Number(apiData?.totalSales || 0),
      color: getRandomColor(),
      departmentId: item?.department?.id,
    }));

  return { chartData, total: apiData?.netSales };
};

const formatNumber = (value, unit = "", fraction = 1) => {
  if (value === null || value === undefined) return "-";
  if (unit) {
    return `${parseFloat(value).toFixed(fraction)} ${unit}`;
  }
  return parseFloat(value).toFixed(fraction);
};

const formatPercentage = (value) => {
  if (value === null || value === undefined) return "-";
  return `${parseFloat(value).toFixed(1)}%`;
};

export function itemConsumptionEfficiencyDataFormatter(data) {
  if (!data) {
    return { summaryCards: [], tableData: [] };
  }

  const summaryCards = [
    {
      icon: <FaBoxOpen size={24} color="#ff9800" />,
      label: "Total Items",
      value:
        (data.redItems ?? 0) + (data.greenItems ?? 0) + (data.orangeItems ?? 0),
      bg: "#ddf0f5ff",

    },
    {
      icon: <FaExclamationTriangle size={24} color="#ff4d4f" />,
      label: "Critical Items",
      value: data.redItems ?? 0,
      bg: "#d1f0cfff",

    },

    {
      icon: <FaRupeeSign size={24} color="#f44336" />,
      label: "Total Waste",
      value: formatCurrency(data.burn),
      bg: "#fff3e0",

    },
    {
      icon: <FaPercent size={24} color="#ff9800" />,
      label: "Avg Waste",
      value: formatPercentage(data.avgBurn),
      bg: "#f9e5f9ff",
    },
  ];

  const tableData = (data.list || []).map((row) => {
    const item = row.item || {};
    const diffValue = parseFloat(row.quantityDifference || 0);
    return {
      item: item.name,
      itemId: item?.id,
      dept: row.department?.name,
      departmentId: row.department?.id,
      unitQuantity: item.unitQuantity,
      unit: item.unit,
      unitPrice: item.unitPrice,
      department: row.department,
      consumed: formatNumber(row.consumptionValue, item.unit),
      sales: formatNumber(row.saleQuantity, item.unit),
      diff: `${diffValue >= 0 ? "+" : ""}${formatNumber(diffValue)}`,
      waste: formatPercentage(row.burn),
      cost: formatCurrency(row.utilization),
      status: row.status,
      wasteType:
        row.status === "Critical"
          ? "Critical"
          : row.burn >= 25
            ? "Medium"
            : "Low",
    };
  });

  return { summaryCards, tableData };
}
export function topConsumedItemsDataFormatter(apiData) {
  if (!apiData || !apiData.list) return { data: [], total: 0 };
  const filteredData = apiData.list.filter(
    (item) => item?.consumptionValue > 0
  );
  const totalValue = filteredData.reduce(
    (sum, item) => sum + item.consumptionValue,
    0
  );

  const data = filteredData.map((item) => ({
    name: item.item?.name || "Unknown",
    category: item.item?.categoryName || "Uncategorized",
    value: Math.round(item.consumptionValue),
    departmentId: item?.departmentId,
  }));

  return {
    data,
    total: totalValue,
  };
}
// export function topConsumedItemsDataFormatter(apiData) {
//   if (!apiData || !apiData.list) return [];
//   return apiData.list
//     .filter((item) => item?.consumptionValue > 0) // keep only positive values
//     .map((item) => ({
//       name: item.item?.name || "Unknown",
//       category: item.item?.categoryName || "Uncategorized",
//       value: item.consumptionValue ?? 0,
//       percent: null, // not available in API
//       color: getRandomColor(),
//       change: null, // not available in API
//     }));
// }

// export const consumptionDistributionDataFormatter = (apiData) => {
//   if (!apiData) {
//     return {
//       summaryCards: [],
//       tableData: [],
//     };
//   }

//   // ✅ Top Summary Cards
//   const summaryCards = [
//     {
//       label: "Total Items",
//       value: apiData.totalProducts ?? 0,
//       amount: "₹90,417", // not available in API
//       color: "#E8F0FF",
//     },
//     {
//       label: "High Consumption",
//       value: apiData.highMarginProducts ?? 0,
//       amount: "₹62,498", // not available in API
//       color: "#E8F8F0",
//     },
//     {
//       label: "Medium Consumption",
//       value: apiData.mediumMarginProducts ?? 0,
//       amount: "₹18,317", // not available in API
//       color: "#FFF8E1",
//     },
//     {
//       label: "Low Consumption",
//       value: apiData.lowMarginProducts ?? 0,
//       amount: "₹9,601", // not available in API
//       color: "#FFEAEA",
//     },
//     // Optional extra category if available
//     ...(apiData.extraCategory
//       ? [
//           {
//             label: "Extra Category",
//             value: apiData.extraCategory.count ?? 0,
//             amount: "₹4,210", // not available in API
//             color: "#E8F0FF",
//           },
//         ]
//       : []),
//   ];

//   // ✅ Table Data
//   const tableData =
//     apiData.list?.map((item) => ({
//       percentile: `${item.percentileLabel || item.marginPercentage || "N/A"}`,
//       items: item.sales?.itemsSold ?? 0,
//       percentItems: item.sales?.percentItems ?? "N/A", // not available in API
//       value: item.sales?.netSales ?? 0,
//       percentValue: item?.efficiency ?? "N/A",
//       classification: item.status || "Unclassified",
//       color: item.status,
//     })) ?? [];

//   return {
//     summaryCards,
//     tableData,
//   };
// };
export const consumptionDistributionDataFormatter = (apiData) => {
  if (!apiData) {
    return {
      summaryCards: [],
      tableData: [],
    };
  }

  // ✅ Top Summary Cards
  const summaryCards = [
    {
      label: "Total Items",
      value: apiData.itemCount ?? 0,
      amount: apiData.consumptionValue
        ? `₹${apiData.consumptionValue.toLocaleString()}`
        : "₹0",
      color: "#E8F0FF",
      icon: <FaCartPlus color="white" size={24} />
    },
    {
      label: "High Consumption",
      value: apiData.high?.count ?? 0,
      amount: apiData.high?.value
        ? `₹${apiData.high.value.toLocaleString()}`
        : "₹0",
      color: "#E8F8F0",
      icon: <FaArrowUp color="white" size={24} />

    },
    {
      label: "Medium Consumption",
      value: apiData.medium?.count ?? 0,
      amount: apiData.medium?.value
        ? `₹${apiData.medium.value.toLocaleString()}`
        : "₹0",
      color: "#FFF8E1",
      icon: <FaArrowDown color="white" size={24} />

    },
    {
      label: "Low Consumption",
      value: apiData.low?.count ?? 0,
      amount: apiData.low?.value
        ? `₹${apiData.low.value.toLocaleString()}`
        : "₹0",
      color: "#FFEAEA",
      icon: <FaArrowDown color="white" size={24} />
    },
  ];

  // ✅ Table Data
  const tableData =
    apiData.list?.map((item) => ({
      percentile: item.bucketName || `${item.bucket} Percentile`,
      items: item.items ?? 0,
      percentItems:
        item.itemsPercentage !== undefined
          ? `${item.itemsPercentage.toFixed(2)}%`
          : "N/A",
      value: item.consumptionValue ?? 0,
      percentValue:
        item.consumptionPercentage !== undefined
          ? `${item.consumptionPercentage.toFixed(2)}%`
          : "N/A",
      classification: item.classification || "Unclassified",
      color:
        item.classification === "High Consumption"
          ? "#4CAF50"
          : item.classification === "Medium Consumption"
            ? "#FFC107"
            : item.classification === "Low Consumption"
              ? "#F44336"
              : "#9E9E9E",
    })) ?? [];

  return {
    summaryCards,
    tableData,
  };
};

export function wastageAnalysisDataFormatter(data) {
  // ✅ Cards Data
  const cardsData = [
    {
      title: data.totalWastage?.label ?? "Total Wastage",
      value: data.totalWastage?.amount ?? 0,
      sub: "",
      bgLight: "#e8f9f3",
      bgSolid: "#1abc9c",
      icon: <FaTrashAlt />,
    },
    {
      title: data.rawMaterial?.label ?? "Raw Material",
      value: data.rawMaterial?.amount ?? 0,
      sub: `(${data.rawMaterial?.count ?? 0} Items)`,
      bgLight: "#e8f5e9",
      bgSolid: "#2ecc71",
      icon: <FaBoxOpen />,
    },
    {
      title: data.expiredItems?.label ?? "Expired Items",
      value: data.expiredItems?.amount ?? 0,
      sub: `(${data.expiredItems?.count ?? 0} Items)`,
      bgLight: "#fff3e0",
      bgSolid: "#e67e22",
      icon: <FaExclamationTriangle />,
    },
    {
      title: data.expiredProducts?.label ?? "Expired Products",
      value: data.expiredProducts?.amount ?? 0,
      sub: `(${data.expiredProducts?.count ?? 0} Items)`,
      bgLight: "#f3e5f5",
      bgSolid: "#9b59b6",
      icon: <FaTimesCircle />,
    },
  ];

  // ✅ Raw Material Wastage
  const rawMaterialWastage =
    data.rawMaterialWastage?.list?.map((rm) => ({
      name: rm.item?.name ?? "N/A",
      category: rm.item?.categoryName ?? "-",
      qty: `${rm.totalQuntity ?? 0}${rm.item?.unit ?? ""}`,
      price: rm.item?.unitPrice ?? 0,
      total: rm.totalPrice ?? 0,
      icon: <FaShoppingBag />,
    })) ?? [];

  // ✅ Expired Items
  const expiredItems =
    data.expiredItems?.list?.map((it) => ({
      name: it.item?.name ?? "N/A",
      category: it.item?.categoryName ?? "-",
      qty: `${it.totalQuntity ?? 0}${it.item?.unit ?? ""}`,
      price: it.item?.unitPrice ?? 0,
      total: it.totalPrice ?? 0,
      date: it.expiredDate ?? "",
    })) ?? [];

  // ✅ Expired Products
  const expiredProducts =
    data.expiredProducts?.list?.map((p) => ({
      name: p.product?.name ?? "N/A",
      category: p.product?.categoryName ?? "-",
      qty: `${p.totalQuntity ?? 0}${p.product?.unit ?? ""}`,
      price: p.product?.unitPrice ?? 0,
      total: p.totalPrice ?? 0,
      date: p.expiredDate ?? "",
    })) ?? [];

  return {
    cardsData,
    rawMaterialWastage,
    expiredItems,
    expiredProducts,
  };
}

// utils/priceChangeFormatter.js
export function priceChangeDataFormatter(data) {
  if (!data) return { recentChanges: [], futureHikes: [], topCard: {} };

  const recentChanges = data?.recent?.map((item) => ({
    name: item.item?.name || "",
    category: `${item.item?.categoryName || ""} • ${item.projectedMonthlyQty || ""
      }`,
    oldPrice: item.oldPrice,
    newPrice: item.newPrice,
    quantity: item.projectedMonthlyQty, // 👈 frontend needs to handle this
    date: item.newPriceStartDate,
    change: item.projectedMonthlyCostDiff,
    percent: item.priceDiffPercentage,
    up: item.newPrice > item.oldPrice,
    itemId: item?.item?.id
  }));

  const futureHikes = data?.future?.map((item) => ({
    name: item.item?.name || "",
    category: `${item.item?.categoryName || ""} • ${item.projectedMonthlyQty || ""
      }`,
    oldPrice: item.oldPrice,
    newPrice: item.newPrice,
    date: item.newPriceStartDate,
    change: item.projectedMonthlyCostDiff,
    percent: item.priceDiffPercentage,
    up: item.newPrice > item.oldPrice,
    quantity: item.projectedMonthlyQty,
    itemId: item?.item?.id,
  }));

  const topCard = {
    recent: data?.recentPriceChangeImpact || [],
    expected: data?.futurePriceChangeImpact || [],
    total: data?.totalPriceChangeImpact || {},
  };

  return { recentChanges, futureHikes, topCard };
}

export function outOfOfficeDataFormatter(data) {
  // 1️⃣ Cards Data
  const cardsData = [
    {
      title: "Out of Stock",
      count: data.zeroStockItems,
      sub: "Zero inventory remaining",
    },
    {
      title: "Critical Items",
      count: data.belowMoqItems,
      sub: "Require immediate attention",
    },
    {
      title: "Total Items",
      count: data.totalItems,
      sub: "Tracking inventory levels",
    },
  ];

  // 2️⃣ Items Table
  const items = (data.storeItems || []).map((storeItem) => {
    const { item, leftOverStockQuantity, status, latestPurchaseClosingDate } =
      storeItem;

    // Format status properly
    let statusLabel = "";
    if (status === "RED") statusLabel = "RED";
    else if (status === "ORANGE") statusLabel = "ORANGE";
    else statusLabel = "GREEN";

    return {
      name: item.name,
      moq: `${item.moq} ${item.unit}`,
      stock: `${leftOverStockQuantity} ${item.unit}`,
      status: statusLabel,
      category: item.categoryName,
      size: `1 ${item.unit}`,
      code: `#${item.unitPrice}`, // Assuming this is unique code
      closing: latestPurchaseClosingDate,
      itemId: item?.id
    };
  });

  // 3️⃣ Base Items
  const baseItems = (data.baseItems || []).map((baseItem) => {
    return {
      name: baseItem.item.name,
      moq: `${baseItem.item.moq} ${baseItem.item.unit}`,
      stock: `${baseItem.leftOverStockQuantity} ${baseItem.item.unit}`,
      status:
        baseItem.status === "CRITICAL"
          ? "Critical"
          : baseItem.status === "OUT_OF_STOCK"
            ? "Out of Stock"
            : "Available",
      category: baseItem.item.categoryName,
      size: `1 ${baseItem.item.unit}`,
      code: `#${baseItem.item.unitPrice}`,
      closing: baseItem.latestPurchaseClosingDate,
    };
  });

  return {
    cardsData,
    items,
    baseItems,
  };
}

export function recipesDataFormatter(data) {
  if (!data) return { topCards: [], lossProducts: [], profitProducts: [] };

  // ---- Top Cards ----
  const topCards = [
    {
      title: data.profitableProducts?.name ?? "Profitable Products",
      products: data.profitableProducts?.products ?? 0,
      sales: data.profitableProducts?.sales ?? 0,
      share: data.profitableProducts?.share ?? "0%",
      label: "High Margin",
      icon: <FaArrowTrendUp />,
      bg: "#E6F8EE",
      labelColor: "#28A745",
      textColor: "#1E4620",
    },
    {
      title: data.moderateProducts?.name ?? "Moderate Products",
      products: data.moderateProducts?.products ?? 0,
      sales: data.moderateProducts?.sales ?? 0,
      share: data.moderateProducts?.share ?? "0%",
      label: "Medium Margin",
      icon: <FaArrowTrendUp />,
      bg: "#FFF8E1",
      labelColor: "#F4B400",
      textColor: "#4E3B00",
    },
    {
      title: data.lossMakingProducts?.name ?? "Loss Making Products",
      products: data.lossMakingProducts?.products ?? 0,
      sales: data.lossMakingProducts?.sales ?? 0,
      share: data.lossMakingProducts?.share ?? "0%",
      label: "Low Margin",
      icon: <FaArrowTrendDown />,
      bg: "#FFE6E6",
      labelColor: "#D32F2F",
      textColor: "#5C0000",
    },
  ];

  // ---- Loss Products ----
  const lossProducts =
    data.lossMakingProducts?.list?.map((item) => ({
      product: item.product?.name ?? "N/A",
      productId: item.product?.id,
      subtitle: `${item.product?.categoryName ?? ""} • ₹${item.product?.price ?? 0
        }`,
      items: item.sales?.itemsSold ?? 0,
      stock: item.stock ?? "In Stock", // fallback
      cost: item.totalMakingCost ? `₹${item.totalMakingCost}` : "N/A",
      sales: item.sales?.totalSales ? `₹${item.sales.totalSales}` : "N/A",
      costPct: item.product?.costPercentage
        ? `${item.product.costPercentage}%`
        : "0%",
      costPctColor: "#F87171",
      price: `₹${item.product?.price ?? 0}`,
      status: item.status ?? "Unknown",
    })) ?? [];

  // ---- Profit Products ----
  const profitProducts =
    data.profitableProducts?.list?.map((item) => ({
      product: item.product?.name ?? "N/A",
      productId: item.product?.id,
      subtitle: `${item.product?.categoryName ?? ""} • ₹${item.product?.price ?? 0
        }`,
      items: item.sales?.itemsSold ?? 0,
      stock: item.stock ?? "In Stock", // fallback
      cost: item.totalMakingCost ? `₹${item.totalMakingCost}` : "N/A",
      sales: item.sales?.totalSales ? `₹${item.sales.totalSales}` : "N/A",
      costPct: item.product?.costPercentage
        ? `${item.product.costPercentage}%`
        : "0%",
      costPctColor: "#4ADE80",
      price: `₹${item.product?.price ?? 0}`,
      status: item.status ?? "Unknown",
    })) ?? [];

  return { topCards, lossProducts, profitProducts };
}

export function topSellingProductsDataFormatter(data) {
  if (!data) return { topCards: [], chartData: [], revenueSummary: [] };

  // --- Top Cards ---
  const topCards = [
    {
      id: 1,
      title: "Total Products",
      value: data.totalProducts,
      subtitle: "Menu items analyzed",
      icon: <FaBoxOpen />,
      bg: "#EEF2FF",
      iconBg: "#7C5CFF",
      color: "#2E2EA8",
    },
    {
      id: 2,
      title: "Top Performers",
      value: data.highMarginProducts,
      subtitle: "Top 50% products",
      icon: <FaStar />,
      bg: "#cefbeeff",
      iconBg: "#6C7A86",
      color: "#222831",
    },
    {
      id: 3,
      title: "Moderate Performers",
      value: data.mediumMarginProducts,
      subtitle: "Next 40% products",
      icon: <FaChartLine />,
      bg: "#f7fad4ff",
      iconBg: "#07A875",
      color: "#0F6A43",
    },
    {
      id: 4,
      title: "Low Performers",
      value: data.lowMarginProducts,
      subtitle: "Bottom 10% products",
      icon: <FaShoppingCart />,
      bg: "#fae0e2ff",
      iconBg: "#F29F05",
      color: "#8a0007ff",
    },
  ];

  // --- Chart Data (Top Products by Sales/Margin) ---
  const chartData = (data.list || []).map((item) => ({
    name: item.product?.name || "Unknown",
    sales: item.sales?.netSales || 0,
    margin: item.marginPercentage || 0,
  }));

  // --- Revenue Summary ---
  // if margin values exist in `data`, replace nulls
  const revenueSummary = [
    {
      title: "Total Revenue",
      amount: data.totalSales || 0,
      sub: "From top selling items",
      icon: <FaRupeeSign color="#03b678" />,
      bgColor: "#f0fff0",
    },
    {
      title: "Total Margin",
      amount: data.totalMargin ?? "N/A", // not available
      sub: "Net profit generated",
      icon: <FaWallet color="#2370f6" />,
      bgColor: "#eef5fe",
    },
    {
      title: "Avg Margin %",
      amount: data.marginPercentage ?? "N/A", // not available
      sub: "Overall profitability",
      icon: <FaPercent color="#9936e9" />,
      bgColor: "#faf6ff",
    },
  ];

  return { topCards, chartData, revenueSummary };
}

export function productPerformanceDetailsDataFormmatter(data) {
  if (!data || !Array.isArray(data.list)) return [];

  return data.list.map((item) => ({
    product: item.product?.name ?? "N/A",
    productId: item.product?.id,
    details: `${item.product?.departmentName ?? item.product?.categoryName ?? "N/A"
      }. ₹${item.product?.price ?? 0}`,
    items: item.sales?.itemsSold ?? 0,
    netSales: formatCurrency(item.sales?.netSales),
    discount: formatCurrency(item.sales?.discount),
    tax: formatCurrency(item.sales?.tax),
    makingCost: formatCurrency(item.totalMakingCost),
    margin: formatCurrency(item.margin),
    marginPercent: `${item.marginPercentage ?? 0}%`,
  }));
}

export function productPerformanceSummaryFormatter(data) {
  if (!data) return [];

  return [
    {
      label: "Total Products",
      value: data.productCount ?? 0,
      amount: formatCurrency(data.totalSales),
      bgColor: "#dbe9ff",
      textColor: "#2a4cfa",
    },
    {
      label: data.high?.definition?.split(":")[0] ?? "Top Performers",
      value: data.high?.count ?? 0,
      amount: formatCurrency(data.high?.value),
      bgColor: "#dbffea",
      textColor: "#23864b",
    },
    {
      label: data.medium?.definition?.split(":")[0] ?? "Moderate Performers",
      value: data.medium?.count ?? 0,
      amount: formatCurrency(data.medium?.value),
      bgColor: "#fff6d4",
      textColor: "#d08e00",
    },
    {
      label: data.low?.definition?.split(":")[0] ?? "Low Performers",
      value: data.low?.count ?? 0,
      amount: formatCurrency(data.low?.value),
      bgColor: "#ffeaea",
      textColor: "#d93939",
    },
  ];
}

export function productPerformancePercentileTableFormatter(data) {
  if (!data) return { summary: [], tableData: [] };

  // --- Top cards summary ---
  const summary = [
    {
      label: "Total Products",
      value: data.productCount ?? 0,
      amount: formatCurrency(data.totalSales),
      bgColor: "#dbe9ff",
      textColor: "#2a4cfa",
      description: 'Menu Item analyzed',
      icon: <FaCartPlus />
    },
    {
      label: data.high?.definition?.split(":")[0] ?? "High",
      value: data.high?.count ?? 0,
      amount: formatCurrency(data.high?.value),
      bgColor: "#dbffea",
      textColor: "#23864b",
      description: 'Top 50% products',
      icon: <FaArrowTrendUp />
    },
    {
      label: data.medium?.definition?.split(":")[0] ?? "Medium",
      value: data.medium?.count ?? 0,
      amount: formatCurrency(data.medium?.value),
      bgColor: "#fff6d4",
      textColor: "#d08e00",
      description: 'Next 40% products',
      icon: <FaArrowRight />
    },
    {
      label: data.low?.definition?.split(":")[0] ?? "Low",
      value: data.low?.count ?? 0,
      amount: formatCurrency(data.low?.value),
      bgColor: "#ffeaea",
      textColor: "#d93939",
      description: 'Bottom 10% products',
      icon: <FaArrowTrendDown />
    },
  ];

  // --- Table rows ---
  const getBarColor = (classification) => {
    switch (classification) {
      case "Top Performers":
        return "green";
      case "Moderate Performers":
        return "orange";
      case "Low Performers":
        return "red";
      default:
        return "gray";
    }
  };
  const tableData = data.list.map((item) => ({
    percentile: item.bucketName ?? "N/A",
    products: item.products ?? 0,
    sales: formatCurrency(item.sales ?? 0),
    salesPercent: `${item.salesPercentage?.toFixed(2) ?? 0}%`,
    margin: formatCurrency(item.margin ?? 0),
    marginPercent: `${item.marginPercentage?.toFixed(1) ?? 0}%`,
    classification: item.classification ?? "N/A",
    barColor: getBarColor(item.classification),
  }));

  return { summary, tableData };
}

export function supplierManagementDataFormatter(data) {
  if (!data || !Array.isArray(data.list) || data.list.length === 0) {
    return {
      cardData: [],
      pieData: [],
      supplierData: [],
    };
  }
  // Top Card
  const cardData = [
    {
      label: "Total Purchase",
      value: formatCurrency(data.totalAmount ?? 0),
      suppliers: data.suppliers,
    },
  ];

  // Pie Chart Data
  const pieData = data.list.map((item, index) => ({
    name: item.supplier?.name ?? "Unknown Supplier",
    value: item.purchase?.totalPrice ?? 0,
    color: getRandomColor(),
  }));

  // Supplier Details Table
  const supplierData = data.list.map((item) => ({
    supplier: item.supplier?.name ?? "Unknown Supplier",
    category: item.supplier?.supplierType ?? "N/A",
    location: item.supplier?.city ?? "N/A",
    purchase: formatCurrency(item.purchase?.totalPrice ?? 0),
    items: item.purchase?.itemCount ?? 0,
    supplierId: item.supplier?.id,
  }));
  return {
    cardData,
    pieData,
    supplierData,
  };
}

export const revenueContributionFromProductsDataFormatter = (data) => {
  if (!data) return { topCards: [], tableData: [] };

  const { high, medium, low, list = [], totalSales } = data;

  // 🟢 Top card data
  const topCards = [
    {
      title: "Top Performers",
      value: high?.count || 0,
      description: "Products driving 60%+ revenue",
      icon: <FaChartLine />,
      bg: "#ecfdf5",
      color: "#059669",
    },
    {
      title: "Review Needed",
      value: medium?.count || 0,
      description: "Products contributing 20-50%",
      icon: <FaExclamationTriangle />,
      bg: "#fffbeb",
      color: "#d97706",
    },
    {
      title: "Removal Candidates",
      value: low?.count || 0,
      description: "Products contributing <20%",
      icon: <FaTimesCircle />,
      bg: "#fef2f2",
      color: "#dc2626",
    },
  ];

  // 🔵 Table data
  const tableData = list.map((item) => {
    let tag = "";
    let tagColor = "";
    let tagText = "";

    if (item.classification === "Top Performers") {
      tag = "Top Performers";
      tagColor = "#dcfce7";
      tagText = "#16a34a";
    } else if (item.classification === "Moderate Performers") {
      tag = "Review";
      tagColor = "#fef3c7";
      tagText = "#d97706";
    } else if (item.classification === "Low Performers") {
      tag = "Consider Removal";
      tagColor = "#fee2e2";
      tagText = "#dc2626";
    }

    return {
      bucket:
        item.bucket === 0 ? "Below 10% of Sale" : `${item.bucket}% Of Sale`,
      products: item.products,
      sales: `₹${item.sales.toLocaleString()}`,
      totalSales: `₹${item.totalSales.toLocaleString()}`,
      tag,
      tagColor,
      tagText,
    };
  });

  return { topCards, tableData };
};

// ✅ Utility function to format API response into recommendations
export function recommendationsDatFormmatter(data) {
  if (!data || !Array.isArray(data.list)) return [];

  return data.list.map((item) => ({
    title: item.title,
    desc: item.description,
  }));
}

export const supplierDuesDataFormatter = (apiResponse) => {
  if (!apiResponse) return { summary: null, list: [] };

  const { suppliers, totalDueAmount, list } = apiResponse;

  const formattedList = list.map((item) => ({
    supplier: item.supplier?.name || "Unknown Supplier",
    category: item.supplier?.supplierType || "N/A",
    location: item.supplier?.city || "",
    thisMonth: item.purchase?.totalPrice || 0,
    lastMonth: null, // API doesn’t provide
    total: item.expense?.totalAmount || 0,
    items: item.purchase?.itemCount || 0,
    supplierId: item.supplier?.id,
    dueAmount: item.dues?.totalAmount || 0,
  }));

  return {
    summary: {
      totalDueAmount,
      suppliers,
    },
    list: formattedList,
  };
};
