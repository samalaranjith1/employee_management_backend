import { FaBox, FaBoxOpen, FaClipboardList, FaCube, FaExclamationTriangle, FaFileAlt, FaPercent, FaShoppingCart, FaTags, FaTrash } from "react-icons/fa";
import {
  FaUtensils,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaPercentage,
  FaChartBar,
  FaRupeeSign,
  FaTrashAlt,
} from "react-icons/fa";
import { formatDate } from "..";

// utils/formatMenuItems.js
export function productsDataFormatter(rawData) {
    const data = rawData?.list?.flat();

  return data?.map((item) => {
    const margin = item.price - item.makingCost;
    const marginPercentage = ((margin / item.price) * 100).toFixed(0);

    return {
      id: item.id,
      name: item.name,
      variation: item.variation,
      veg: item.veg,
      price: `₹${item.price}`, // formatted for UI
      makingCost: `₹${item.makingCost}`, // formatted for UI
      margin: `₹${margin}`,
      marginPercentage: `${marginPercentage}%`,
      pieces: {
        count: item.pieceCount,
        label: `${item.pieceQuantity}${item.pieceUnit.toLowerCase()} each`,
      },
    };
  });
}

// utils/dataFormatters.js

// 📌 INR Currency Formatter
const formatCurrency = (val) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);

// 📌 Margin Color Helper
const marginColor = (percentage) => {
  if (percentage >= 60) return "success";
  if (percentage >= 50) return "warning";
  return "danger";
};

// 📌 Transform raw API → UI data
export function salesDataFormatter(rawData) {
  if (!rawData || !rawData.list) return { summary: [], products: [] };

  // 🔹 Summary cards
  const summary = [
    {
      label: "Products",
      value: rawData.totalProducts,
      icon: <FaBoxOpen />
    },
    {
      label: "Net Sales",
      value: formatCurrency(
        rawData.list?.reduce((acc, item) => acc + item.sales.netSales, 0)
      ),
      icon: <FaShoppingCart />
    },
    {
      label: "Discount",
      value: formatCurrency(
        rawData.list?.reduce((acc, item) => acc + item.sales.discount, 0)
      ),
      icon: <FaTags />
    },
    {
      label: "Items Sold",
      value: rawData.list.reduce((acc, item) => acc + item.sales.itemsSold, 0),
      icon: <FaClipboardList />
    },
    {
      label: "Orders",
      value: rawData.list.reduce((acc, item) => acc + item.sales.orders, 0),
      icon: <FaFileAlt />
    },
  ];

  // 🔹 Table data
  const products = rawData.list.map((item, idx) => ({
    id: item.productId,
    srNo: idx + 1,
    name: item.product.name,
    department: item.product.departmentName,
    price: `₹${item.product.price}`,
    items: item.sales.itemsSold,
    netSales: formatCurrency(item.sales.netSales),
    discount: formatCurrency(item.sales.discount),
    tax: formatCurrency(item.sales.tax),
    makingCost: formatCurrency(item.totalMakingCost),
    margin: formatCurrency(item.margin),
    marginPercentage: `${item.marginPercentage.toFixed(1)}%`,
    marginColor: marginColor(item.marginPercentage),
  }));

  return { summary, products };
}

//needs to adjust method titles
// utils/departmentConsumptionFormatter.js
export function departmentConcumptionDataFormatter(apiResponse) {
  const topCardsData = [
    {
      title: "Critical Items",
      value: apiResponse.redItems?.toString().padStart(2, "0"),
      icon: <FaExclamationTriangle />,
      color: "danger",
    },
    {
      title: "Total Items",
      value: apiResponse.list?.length,
      icon: <FaBox />,
      color: "primary",
    },
    {
      title: "Total Waste",
      value: `₹${apiResponse.burn?.toFixed(1)}`,
      icon: <FaTrash />,
      color: "warning",
    },
    {
      title: "Avg Waste Percentage",
      value: `${apiResponse.avgBurn?.toFixed(1)}%`,
      icon: <FaPercent />,
      color: "purple",
    },
  ];

  const tableData = apiResponse.list?.map((item) => {
    let wastePercent =
      (item.quantityDifference / item.netConsumptionQuantity) * 100;
    if (!isFinite(wastePercent)) wastePercent = 0;

    const difference = item.netConsumptionQuantity - item.saleQuantity;

    return {
      id: item.id,

      // display values
      itemDetails: `${item.item.name} (${item.item.unitQuantity} ${item.item.unit})`,
      subCategory: item.item.categoryName,
      department: item.department.name,
      consumed: `${
        item.netConsumptionQuantity
      } ${item.item.unit.toLowerCase()}`,
      salesQuantity: item.saleQuantity,
      difference: `${difference.toFixed(1)} ${item.item.unit.toLowerCase()}`,
      wastePercent: `${wastePercent.toFixed(1)}%`,
      costImpact: `₹${item.burn.toFixed(2)}`,
      status: item.status, // red, orange, green

      // raw numeric values for sorting
      consumedNum: item.netConsumptionQuantity,
      salesQuantityNum: item.saleQuantity,
      differenceNum: difference,
      wastePercentNum: wastePercent,
      costImpactNum: item.burn,
    };
  });

  return { topCardsData, tableData };
}

// utils/departmentClosingFormatter.js
export const departmentClosingDataFormatter = (apiData) => {
  if (!apiData?.list) return { topCardsData: [], tableData: [] };

  const tableData = apiData.list.map((entry) => ({
    item: entry.item.name,
    category: entry.item.categoryName,
    quantity: formatQuantity(entry.quantity, entry.item.unit),
    totalPrice: Math.round(entry.totalPrice),
  }));

  const totalClosing = tableData.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalItems = tableData.length;

  const topCardsData = [
    {
      title: "Total Closing",
      value: `₹${totalClosing}`,
      icon: <FaExclamationTriangle color="#f44336" />,
    },
    {
      title: "Total Items",
      value: totalItems.toString().padStart(2, "0"),
      icon: <FaCube color="#3f51b5" />,
    },
  ];

  return { topCardsData, tableData };
};

const formatQuantity = (qty, unit) => {
  if (unit === "GM" || unit === "ML") {
    return qty >= 1000 ? `${qty / 1000} ${unit === "GM" ? "Kg" : "Liter"}` : `${qty} ${unit}`;
  }
  return `${qty} ${unit}`;
};

// utils/departmentSalesFormatter.js

export function departmentSalesForeCastBudgetDataFormatter(apiResponse) {
  const list = apiResponse?.list || [];

  // Format top cards data (example: total budget, total sales, total orders, total items)
  const totalBudget = list.reduce((sum, item) => sum + item.budgetAgainstTotalSales, 0);
  const totalSales = list.reduce((sum, item) => sum + item.avgTotalSales, 0);
  const totalOrders = list.reduce((sum, item) => sum + item.avgOrders, 0);
  const totalItems = list.reduce((sum, item) => sum + Math.round(item.avgTotalSales / 100), 0); // approximate

  const topCardsData = [
    { title: "Budget", value: totalBudget },
    { title: "Sales", value: totalSales },
    { title: "Orders", value: totalOrders },
    { title: "Items", value: totalItems },
  ];

  // Format table data
  const tableData = list.map((item) => ({
    day: item.day,
    budget: item.budgetAgainstTotalSales,
    sales: item.avgNetSales,
    orders: item.avgOrders,
    items: Math.round(item.avgTotalSales / 100), // approximate
  }));

  // Add totals row
  tableData.push({
    day: "Total",
    budget: totalBudget,
    sales: totalSales,
    orders: totalOrders,
    items: Math.round(totalSales / 100),
  });

  return { topCardsData, tableData };
}

// utils/departmentSalesFormatter.js
export const departmentSalesForeCastByItemDataFormatter = (apiResponse) => {
  const list = apiResponse.list || [];

  // Top Cards Data
  const totalOrders = list.reduce((sum, item) => sum + (item.avgOrders || 0), 0);
  const totalItemsSold = list.reduce((sum, item) => sum + (item.avgItemsSold || 0), 0);
  const totalNetSales = list.reduce((sum, item) => sum + (item.avgNetSales || 0), 0);
  const totalDiscount = list.reduce((sum, item) => sum + (item.avgDiscount || 0), 0);

  const topCardsData = [
    { title: "Orders", value: totalOrders },
    { title: "Items Sold", value: totalItemsSold },
    { title: "Net Sales", value: `₹${totalNetSales}` },
    { title: "Discount", value: `₹${totalDiscount}` },
  ];

  // Table Data
  const tableData = list.map(item => ({
    day: item.day,
    item: item.product.name,
    orders: item.avgOrders,
    itemsSold: item.avgItemsSold,
    netSales: `₹${item.avgNetSales}`,
    discount: `₹${item.avgDiscount}`,
  }));

  return { topCardsData, tableData };
};

// export const departmentConsumptionForecastDataFormatter = (apiResponse) => {
//   const list = apiResponse.list || [];

//   // Top cards data (example: total avgNetSales, avgTotalSales, avgOrders)
//   const totalQuantity = list.reduce(
//     (acc, curr) => acc + (curr.avgItemsSold || 0),
//     0
//   );
//   const totalSales = list.reduce(
//     (acc, curr) => acc + (curr.avgTotalSales || 0),
//     0
//   );
//   const totalOrders = list.reduce(
//     (acc, curr) => acc + (curr.avgOrders || 0),
//     0
//   );

//   const topCardsData = [
//     { title: "Total Items Sold", value: totalQuantity },
//     { title: "Total Sales", value: totalSales },
//     { title: "Total Orders", value: totalOrders },
//   ];

//   // Table data
//   const tableData = list.flat().map((item) => ({
//     day: item.day,
//     name: item.product.name,
//     category: item.product.categoryName || "-",
//     unit: item.product.pieceUnit || "-",
//     unitQuantity: item.product.pieceQuantity || 1,
//     unitPrice: item.product.price || 0,
//     quantity: item.quantity || 0,
//     totalPrice: item.totalPrice || 0,
//   }));

//   return { topCardsData, tableData };
// };

// home tab
// ✅ Data formatter for Department Consumption Summary
// export const departmentConsumptionSummarryDataFormmatter = (data) => {
//   if (!data || !data.summary) return [];

//   const { summary } = data;

//   const safeNumber = (num, fraction = 0) =>
//     typeof num === "number" && !isNaN(num) ? num.toFixed(fraction) : "0";

//   const safeCurrency = (num) =>
//     typeof num === "number" && !isNaN(num) ? `₹${num.toLocaleString()}` : "₹0";

//   return [
//     {
//       id: "consumptionPercentage",
//       title: "Consumption %",
//       value: `${safeNumber(summary.consumptionPercentage, 0)}%`,
//       change: +15.2, // placeholder – replace with API field if available
//       icon: <FaUtensils size={28} />,
//       bg: "#FFF6ED",
//       textColor: "#FF6A00",
//       stats: [
//         { label: "Sale", value: safeCurrency(summary.netSales) },
//         { label: "Consumption", value: safeCurrency(summary.consumptionValue) },
//         {
//           label: `Net Consumption (${safeNumber(
//             summary.netConsumptionPercentage,
//             0
//           )}%)`,
//           value: safeCurrency(summary.netConsumptionValue),
//         },
//       ],
//     },
//     {
//       id: "consumption",
//       title: "Consumption",
//       value: safeCurrency(summary.consumptionValue),
//       change: -2.1,
//       icon: <FaShoppingCart size={28} />,
//       bg: "#F0F7FF",
//       textColor: "#007BFF",
//       stats: [
//         {
//           label: "Opening Stock",
//           value: safeCurrency(summary.consumptionOpeningValue),
//         },
//         {
//           label: "Closing Stock",
//           value: safeCurrency(summary.consumptionClosingValue),
//         },
//         {
//           label: "Net Consumption",
//           value: safeCurrency(summary.netConsumptionValue),
//         },
//       ],
//     },
//     {
//       id: "netSales",
//       title: "Net Sales",
//       value: safeCurrency(summary.netSales),
//       change: +15.2,
//       icon: <FaChartLine size={28} />,
//       bg: "#FAF5FF",
//       textColor: "#9C27B0",
//       stats: [
//         { label: "Total Sales", value: safeCurrency(summary.totalSales) },
//         { label: "Discount", value: safeCurrency(summary.discount) },
//         { label: "Tax", value: safeCurrency(summary.tax) },
//       ],
//     },
//   ];
// };

export const departmentConsumptionForecastDataFormatter = (apiResponse) => {
  const list = apiResponse.list || [];

  // 🔹 Top cards data
  const totalQuantity = list.reduce(
    (acc, curr) => acc + (curr.quantity || 0),
    0
  );
  const totalSales = list.reduce(
    (acc, curr) => acc + (curr.totalPrice || 0),
    0
  );
  const totalOrders = list.length; // since no avgOrders, we consider number of items as orders

  const topCardsData = [
    { title: "Total Quantity", value: totalQuantity },
    { title: "Total Sales", value: totalSales },
    { title: "Total Items", value: totalOrders },
  ];

  // 🔹 Table data
  const tableData = list.map((item) => ({
    day: item.dayName,
    name: item.item?.name || "-",
    category: item.item?.categoryName || "-",
    unit: item.item?.unit || "-",
    unitQuantity: item.item?.unitQuantity || 1,
    unitPrice: item.unitPrice || item.item?.unitPrice || 0,
    quantity: item.quantity || 0,
    totalPrice: item.totalPrice || 0,
    department: item.department?.name || "-",
  }));

  return { topCardsData, tableData };
};

export const departmentConsumptionSummaryDataFormatter = (data) => {
  if (!data || !data.summary) return [];

  const { summary } = data;

  const safeNumber = (num, fraction = 0) =>
    typeof num === "number" && !isNaN(num) ? num.toFixed(fraction) : "0";

  const safeCurrency = (num) =>
    typeof num === "number" && !isNaN(num) ? `₹${num.toLocaleString()}` : "₹0";

  return [
    {
      id: "consumptionPercentage",
      title: "Consumption %",
      value: `${safeNumber(summary.consumptionPercentage, 0)}%`,
      change: +15.2, // Placeholder for demo
      icon: <FaUtensils size={28} />,
      bg: "#FFF6ED",
      textColor: "#FF6A00",
      stats: [
        { label: "Sale", value: safeCurrency(summary.netSales) },
        { label: "Consumption", value: safeCurrency(summary.consumptionValue) },
        {
          label: `Net Consumption (${safeNumber(
            summary.netConsumptionPercentage,
            0
          )}%)`,
          value: safeCurrency(summary.netConsumptionValue),
        },
      ],
    },
    {
      id: "consumption",
      title: "Consumption",
      value: safeCurrency(summary.consumptionValue),
      change: -2.1,
      icon: <FaShoppingCart size={28} />,
      bg: "#F0F7FF",
      textColor: "#007BFF",
      stats: [
        {
          label: "Opening Stock",
          value: safeCurrency(summary.consumptionOpeningValue),
        },
        {
          label: "Closing Stock",
          value: safeCurrency(summary.consumptionClosingValue),
        },
        {
          label: "Net Consumption",
          value: safeCurrency(summary.netConsumptionValue),
        },
      ],
    },
    {
      id: "netSales",
      title: "Net Sales",
      value: safeCurrency(summary.netSales),
      change: +15.2,
      icon: <FaChartLine size={28} />,
      bg: "#FAF5FF",
      textColor: "#9C27B0",
      stats: [
        { label: "Total Sales", value: safeCurrency(summary.totalSales) },
        { label: "Discount", value: safeCurrency(summary.discount) },
        { label: "Tax", value: safeCurrency(summary.tax) },
      ],
    },
  ];
};

// export const departmentHealthDataFormatter = (data) => {
//   if (!data) return [];

//   const formatCurrency = (val) =>
//     `₹${val?.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

//   const getCard = (label, dataset, color) => {
//     const isPositive = dataset?.consumptionPercentage < 100;
//     return {
//       title: label,
//       percentage: `${dataset?.consumptionPercentage?.toFixed(0) || 0}%`,
//       percentageColor: color,
//       icon: isPositive ? (
//         <FaArrowUp color={color} />
//       ) : (
//         <FaArrowDown color="red" />
//       ),
//       sale: formatCurrency(dataset?.netSales || 0),
//       consumption: formatCurrency(dataset?.consumptionValue || 0),
//       netConsumption: `${dataset?.netConsumptionPercentage?.toFixed(0) || 0}%`,
//       color,
//     };
//   };

//   return [
//     getCard("Today", data.today, "#FF5C00"),
//     getCard("Yesterday", data.yesterday, "#FF0000"),
//     getCard("This Week", data.thisWeek, "#007BFF"),
//     getCard("Last Week", data.lastWeek, "#9C27B0"),
//     getCard("This Month", data.thisMonth, "#388E3C"),
//   ];
// };

// utils/trendDataFormatter.js

export const departmentHealthDataFormatter = (data) => {
  if (!data) return [];

  const formatCurrency = (val) =>
    `₹${val?.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

  const getCard = (label, dataset, color) => {
    const isPositive = dataset?.consumptionPercentage < 100;
    return {
      title: label,
      percentage: `${dataset?.consumptionPercentage?.toFixed(0) || 0}%`,
      icon: isPositive ? <FaArrowUp /> : <FaArrowDown color="#FF0000" />,
      sale: formatCurrency(dataset?.netSales || 0),
      consumption: formatCurrency(dataset?.consumptionValue || 0),
      netConsumption: `${dataset?.netConsumptionPercentage?.toFixed(0) || 0}%`,
      color,
    };
  };

  return [
    getCard("Today", data.today, "#FF5C00"),
    getCard("Yesterday", data.yesterday, "#FF0000"),
    getCard("This Week", data.thisWeek, "#007BFF"),
    getCard("Last Week", data.lastWeek, "#9C27B0"),
    getCard("This Month", data.thisMonth, "#388E3C"),
  ];
};

export const departmentTrendAnalysisDataFormatter = (apiResponse) => {
  if (!apiResponse || !apiResponse.list) return [];
  const trendData = apiResponse.list.map((item) => ({
    date: item.dt, // X-axis
    sales: item.netSales || 0,
    consumption: item.consumptionValue || 0,
    opening: item.consumptionOpeningValue || 0,
    closing: item.consumptionClosingValue || 0,
    consumptionPercentage: item.consumptionPercentage,
  }));

  return trendData
};

// departmentPeriodFormatter.js
export function departmentPeriodDropDownDataFormatter(data) {
  if (!data) return { cards: [], table: [] };

  const totalSales = data?.list?.reduce((sum, d) => sum + (d.totalSales || 0), 0);
  const totalConsumption = data?.list?.reduce((sum, d) => sum + (d.consumptionValue || 0), 0);
  const totalWaste = 1245; // mock from screenshot, adjust once real field is available
  const avgSales = totalSales / data.length;

  const cards = [
    {
      title: "Cost Ratio",
      value: `${((totalConsumption / totalSales) * 100).toFixed(1)}%`,
      icon: <FaPercentage size={20} color="#fff" />,
      iconBg: "#16a34a",
      bg: "#f0fdf4"
    },
    {
      title: "Average Daily Sales",
      value: `₹${Math.round(avgSales).toLocaleString()}`,
      icon: <FaChartBar size={20} color="#fff" />,
      iconBg: "#7c3aed",
      bg: "#f5f3ff"
    },
    {
      title: "Avg. Daily Consumption",
      value: `₹${Math.round(totalConsumption / data.length).toLocaleString()}`,
      icon: <FaRupeeSign size={20} color="#fff" />,
      iconBg: "#2563eb",
      bg: "#eff6ff"
    },
    {
      title: "Average Daily Waste",
      value: `₹${totalWaste.toLocaleString()}`,
      icon: <FaTrashAlt size={20} color="#fff" />,
      iconBg: "#f97316",
      bg: "#fff7ed"
    }
  ];

  const table = data.list.map((item, idx) => {
    const costRatio = ((item.consumptionValue / item.totalSales) * 100) || 0;
    const costColor = costRatio > 50 ? "#16a34a" : costRatio > 30 ? "#f97316" : "#dc2626";

    return {
      index: idx + 1,
      date: formatDate(item.dt),
      day: formatDate(item.dt),
      sales: item.totalSales,
      consumption: item.consumptionValue,
      waste: 0, // Add actual waste field if available
      costRatio,
      costColor,
      isToday: formatDate(item.dt),
    };
  });

  return { cards, table };
}

// export const itemConsumptionEfficiencyDataFormatter = (data) => {
//   return {
// summaryCards: [
//   {
//     label: "Total ITEMS",
//     value: data.list.length,
//     bgLight: "#f0f7ff", // light blue background
//     bgSolid: "#1976d2", // solid blue for icon
//     icon: <FaShoppingCart />,
//   },
//   {
//     label: "Critical Items",
//     value: data.redItems,
//     bgLight: "#e8f5e9", // light green
//     bgSolid: "#388e3c", // solid green
//     icon: <FaExclamationTriangle />,
//   },
//   {
//     label: "Total Waste",
//     value: `₹${data.burn}`,
//     bgLight: "#fff3e0", // light orange
//     bgSolid: "#f4511e", // solid orange
//     icon: <FaTrashAlt />,
//   },
//   {
//     label: "Avg Waste Percentage",
//     value: `${data.avgBurn}%`,
//     bgLight: "#f3e5f5", // light purple
//     bgSolid: "#8e24aa", // solid purple
//     icon: <FaChartLine />,
//   },
// ],
//     tableData: data?.list.map((item, idx) => ({
//     id: item.id || idx,
//     name: item.item?.name || "-",
//     department: item.department?.name || "-",
//     consumed: item.consumptionQuantity || 0,
//     consumedUnit: item.item?.unit || "",
//     sales: item.saleQuantity || 0,
//     salesUnit: item.item?.unit || "",
//     difference: item.quantityDifference || 0,
//     differenceUnit: item.item?.unit || "",
//     waste: Number(
//       ((item.quantityDifference / (item.saleQuantity || 1)) * 100).toFixed(1)
//     ),
//     costImpact: item.burn || 0,
//     status: item.status || "green",
//     price: item.item?.price || 0,
//   }))
//   };
// };
export const itemConsumptionEfficiencyDataFormatter = (data) => {
  return {
    summaryCards: [
      {
        label: "Total ITEMS",
        value: data.list.length,
        bgLight: "#eaf3fd", // pastel blue
        bgSolid: "#228be6", // solid blue
        icon: <FaShoppingCart />,
      },
      {
        label: "Critical Items",
        value: data.redItems,
        bgLight: "#e7f6ea", // light mint green
        bgSolid: "#34c988", // solid green
        icon: <FaExclamationTriangle />,
      },
      {
        label: "Total Waste",
        value: `₹${parseFloat(data.burn).toLocaleString()}`,
        bgLight: "#fff5e5", // pastel orange
        bgSolid: "#ff944d", // solid orange
        icon: <FaTrashAlt />,
      },
      {
        label: "Avg Waste Percentage",
        value: `${data.avgBurn}%`,
        bgLight: "#f5eefc", // pastel purple
        bgSolid: "#b197fc", // solid purple
        icon: <FaChartLine />,
      },
    ],
    tableData: data?.list.map((item, idx) => ({
      id: item.id || idx,
      name: item.item?.name || "-",
      department: item.department?.name || "-",
      consumed: item.consumptionQuantity || 0,
      consumedUnit: item.item?.unit || "",
      sales: item.saleQuantity || 0,
      salesUnit: item.item?.unit || "",
      difference: item.quantityDifference || 0,
      differenceUnit: item.item?.unit || "",
      waste: Number(
        ((item.quantityDifference / (item.saleQuantity || 1))).toFixed(1)
      ),
      costImpact: Number(item.burn || 0).toLocaleString(),
      status: item.status || "green",
      price: item.item?.price || 0,
    })),
  };
};

