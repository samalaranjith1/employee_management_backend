// src/utils/dataFormatter.js
import { format, parseISO } from "date-fns";
import {
  FaGlassMartiniAlt,
  FaCoffee,
  FaPizzaSlice,
  FaWineGlassAlt,
  FaIceCream,
  FaBreadSlice,
  FaChartPie,
  FaDollarSign,
  FaPercent,
  FaUsers,
  FaCube,
  FaMoneyBillWave,
  FaCreditCard,
  FaFileInvoiceDollar,
  FaBalanceScale,
  FaShoppingCart,
  FaChartLine,
  FaBoxes,
  FaRupeeSign,
  FaPercentage,
  FaArrowRight,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaCalendarAlt,
  FaBoxOpen,
  FaFireAlt,
  FaBurn,
  FaCalendarWeek,
  FaChartBar,
  FaFire,
  FaUtensils,
  FaGlassCheers,
  FaConciergeBell,
  FaHamburger,
  FaFish,
  FaDrumstickBite,
  FaLeaf,
  FaCheese,
  FaUtensilSpoon,
  FaCalendar,
  FaFolderOpen,
} from "react-icons/fa";

export const summeryOverviewDataFormatter = (apiData) => {
  const { summary, item } = apiData;

  return {
    header: {
      title: "Summary Overview",
      subtitle: "Real-time consumption metrics and performance indicators",
    },
    cards: [
      {
        id: "purchase",
        title: "Purchase",
        icon: <FaShoppingCart className="me-2" />,
        bg: "#E9F3FF",
        rows: [
          {
            label: "Qty",
            value: `${summary.purchaseQuantity} ${item.unit}`,
          },
          {
            label: "Amount",
            value: `₹${summary.purchaseValue}`,
          },
        ],
      },
      {
        id: "opening",
        title: "Opening",
        icon: <FaFolderOpen className="me-2" />,
        bg: "#FFF3E9",
        rows: [
          {
            label: "Qty",
            value: `${summary.consumptionOpeningQuantity} ${item.unit}`,
          },
          {
            label: "Amount",
            value: `₹${summary.consumptionOpeningValue}`,
          },
        ],
      },
      {
        id: "consumption",
        title: "Consumption",
        icon: <FaBalanceScale className="me-2" />,
        bg: "#FFE9E9",
        rows: [
          {
            label: "Qty",
            value: `${summary.consumptionQuantity} ${item.unit}`,
          },
          {
            label: "Amount",
            value: `₹${summary.consumptionValue}`,
          },
        ],
      },
      {
        id: "closing",
        title: "Closing",
        icon: <FaFileInvoiceDollar className="me-2" />,
        bg: "#E9FFF3",
        rows: [
          {
            label: "Qty",
            value: `${summary.consumptionClosingQuantity} ${item.unit}`,
          },
          {
            label: "Amount",
            value: `₹${summary.consumptionClosingValue}`,
          },
        ],
      },
      {
        id: "netConsumption",
        title: "Net Consumption",
        icon: <FaBalanceScale className="me-2" />,
        bg: "#FFF0F6",
        rows: [
          {
            label: "Qty",
            value: `${summary.netConsumptionQuantity} ${item.unit}`,
          },
          {
            label: "Amount",
            value: `₹${summary.netConsumptionValue}`,
          },
        ],
      },
      {
        id: "sales",
        title: "Sales",
        icon: <FaChartLine className="me-2" />,
        bg: "#F3E9FF",
        rows: [
          {
            label: "Qty",
            value: `${summary.saleQuantity} ${item.unit}`,
          },
          {
            label: "Price",
            value: `₹${summary.salePrice}`,
          },
        ],
      },
    ],
    footer: [
    {
      id: "currentStock",
      label: "Current Stock",
      value: `${summary?.leftOverStockQuantity ?? 0} ${item?.unit ?? ''}`,
      icon: <FaBoxes />,
      bg: "#F3FFF8"
    },
    {
      id: "stockValue",
      label: "Stock Value",
      value: `₹${summary?.leftOverStockValue ?? 0}`,
      icon: <FaRupeeSign />,
      bg: "#F3FFF8"
    },
    {
      id: "margin",
      label: "Margin %",
      value: `${summary?.saleToConsumptionMarginPercentage ?? 0}%`,
      icon: <FaPercentage />,
      bg: "#F3FFF8"
    },
    {
      id: "saleConsumptionGM",
      label: "Sale - Consumption",
      value: `${summary?.saleToConsumptionQuantityDifference ?? 0} ${item?.unit ?? ''}`,
      icon: <FaArrowRight />,
      bg: "#F3FFF8"
    },
    {
      id: "saleConsumptionRs",
      label: "Sale - Consumption",
      value: `₹${summary?.saleToConsumptionMargin ?? 0}`,
      icon: <FaArrowRight />,
      bg: "#F3FFF8"
    }]
  };
};

export function trendAnalysisDataFormatter(apiData) {
  const chartData = apiData.list.map((item) => ({
    date: new Date(item.dt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    opening: item.consumptionOpeningValue || 0,
    consumption: item.consumptionValue || 0,
    closing: item.consumptionClosingValue || 0,
    consumptionValue: item.netConsumptionValue || 0,
  }));
  // const tableData = apiData?.list.map((item) => ({
  //   ...item,
  //   dateIcon: <FaCalendarAlt className="me-2 text-success" />,
  //   openingIcon: <FaBoxOpen className="me-1 text-primary" />,
  //   consumptionIcon: <FaFireAlt className="me-1 text-warning" />,
  //   closingIcon: <FaChartLine className="me-1 text-success" />,
  //   netConsumptionIcon: <FaBurn className="me-1 text-danger" />,
  //   saleIcon: <FaShoppingCart className="me-1 text-purple" />,
  // }));
  const unit ="GM"
  const tableData = apiData?.list.map((item) => {
    const d = parseISO(item.dt);
    return {
      date: format(d, "dd MMM yyyy"),
      day: format(d, "EEEE"),

      opening: {
        qty: `${item.consumptionOpeningQuantity} ${unit}`,
        price: `₹${item.consumptionOpeningValue}`,
      },
      consumption: {
        qty: `${item.consumptionQuantity} ${unit}`,
        price: `₹${item.consumptionValue}`,
      },
      closing: {
        qty: `${item.consumptionClosingQuantity} ${unit}`,
        price: `₹${item.consumptionClosingValue}`,
      },
      netConsumption: {
        qty: `${item.netConsumptionQuantity} ${unit}`,
        price: `₹${item.netConsumptionValue}`,
      },
      sale: {
        qty: `${item.saleQuantity} ${unit}`,
        price: `₹${item.salePrice}`,
      },
      burn: {
        qty: `${item.saleToConsumptionQuantityDifference} ${unit}`,
        percentage: `${item.saleToConsumptionMarginPercentage}%`,
      },
    };
  });

  return { chartData, tableData }; // ✅ important!
}

export function getTrendIcon(value) {
  if (value > 0) return <FaArrowUp color="green" />;
  if (value < 0) return <FaArrowDown color="red" />;
  return <FaMinus color="gray" />;
}

// dataFormatter.js

export const departmentAnalyticsTableDataFornatter = (data) => {
  return data.map((item) => ({
    ...item,
    dateIcon: <FaCalendarAlt className="me-2 text-success" />,
    openingIcon: <FaBoxOpen className="me-1 text-primary" />,
    consumptionIcon: <FaFireAlt className="me-1 text-warning" />,
    closingIcon: <FaChartLine className="me-1 text-success" />,
    netConsumptionIcon: <FaBurn className="me-1 text-danger" />,
    saleIcon: <FaShoppingCart className="me-1 text-purple" />,
  }));
};

// utils/departmentDataFormatter.js

export const departmentAnalyticsDataFormatter = (apiData) => {
  return apiData?.list?.map((item) => {
    const departmentName = item?.department?.name || "N/A";

    return {
      id: item.id,
      department: departmentName,
      opening: {
        label: `${item.consumptionOpeningQuantity} GM`,
        value: `₹${(item.consumptionOpeningValue)?.toFixed(2)}`,
        textColor: "#2F80ED",
        bgColor: "rgba(47, 128, 237, 0.08)", // light blue tint
      },
      consumption: {
        label: `${item.consumptionQuantity} GM`,
        value: `₹${(item.consumptionValue * 0.72)?.toFixed(2)}`,
        textColor: "#EB5757",
        bgColor: "rgba(235, 87, 87, 0.08)", // light red tint
      },
      closing: {
        label: `${item.consumptionClosingQuantity} GM`,
        value: `₹${(item.consumptionClosingValue * 1.38)?.toFixed(2)}`,
        textColor: "#27AE60",
        bgColor: "rgba(39, 174, 96, 0.08)", // light green tint
      },
      netConsumption: {
        label: `${item.netConsumptionQuantity} GM`,
        value: `₹${item.netConsumptionValue?.toFixed(2)}`,
        textColor: "#EB5757",
        bgColor: "rgba(235, 87, 87, 0.08)",
      },
      sale: {
        label: `${item.saleQuantity || 0} GM`,
        value: `₹${item.salePrice}`,
        textColor: "#9B51E0",
        bgColor: "rgba(155, 81, 224, 0.08)", // light purple tint
      },
      burnUtilization: {
        label: `${item.quantityDifference || 0} GM`,
        value: `${item.utilization?.toFixed(1) || 0}%`,
        textColor: "#333333",
        bgColor: "rgba(242, 153, 74, 0.08)", // slight orange tint
      },
    };
  });
};

// src/utils/dataFormatter.js

export const departmentDistributionChartDataFormatter = (
  apiResponse,
  selectedKey
) => {
  const colors = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]; // Figma color palette
  const iconList = [
    FaUtensils,
    FaGlassCheers,
    FaConciergeBell,
    FaHamburger,
    FaFish,
  ];

  const total = apiResponse?.list?.reduce((acc, d) => acc + d[selectedKey], 0);
  const formatted = apiResponse?.list?.map((item, idx) => {
    const Icon = iconList[idx % iconList.length];
    return {
      id: item.id,
      name: item.department?.name,
      value: item[selectedKey],
      percentage: ((item[selectedKey] / total) * 100).toFixed(1),
      color: colors[idx % colors.length],
      Icon,
    };
  });

  return { formatted, total };
};

export const menuItemConsumptionAnalysisDataFormatter = (apiData) => {
  return apiData.list.map((item, index) => {
    const product = item.product;
    const recipe = item.recipe;
    const sales = item.sales;

    // Assign icons based on product name keywords
    let Icon = FaUtensilSpoon;
    if (product?.name.toLowerCase().includes("chicken")) Icon = FaDrumstickBite;
    else if (product?.name.toLowerCase().includes("fish")) Icon = FaFish;
    else if (product?.name.toLowerCase().includes("paneer")) Icon = FaCheese;
    else if (product?.name.toLowerCase().includes("dal")) Icon = FaLeaf;

    return {
      id: product?.id,
      name: product?.masterProductName || product?.name,
      recipeQty: `${
        recipe?.unitQuantity
      } gm`,
      recipePrice: `₹${recipe?.unitPrice}`,
      totalConsumption: `${recipe?.totalQuantity || 0} gm`,
      totalConsumptionPrice: `₹${recipe?.totalPrice}`,
      itemsSold: sales?.itemsSold,
      icon: <Icon size={18} color="#666" />,
    };
  });
};

export const itemHealthDataFormatter = (apiData) => {
  return [
    {
      id: "thisWeek",
      title: "This Week",
      icon: <FaCalendarWeek className="me-2 text-primary" />,
      bgClass: "bg-light-blue",
      data: apiData.thisWeek,
      utilizationRate: "92.9%",
    },
    {
      id: "lastWeek",
      title: "Last Week",
      icon: <FaChartLine className="me-2 text-success" />,
      bgClass: "bg-light-green",
      data: apiData.lastWeek,
      utilizationRate: "93.7%",
    },
    {
      id: "thisMonth",
      title: "This Month",
      icon: <FaCalendarAlt className="me-2 text-purple" />,
      bgClass: "bg-light-purple",
      data: apiData.thisMonth,
      utilizationRate: "92.9%",
    },
    {
      id: "lastMonth",
      title: "Last Month",
      icon: <FaChartBar className="me-2 text-warning" />,
      bgClass: "bg-light-orange",
      data: apiData.lastMonth || {}, // fallback if API doesn’t provide
      utilizationRate: "92.5%",
    },
  ];
};

//purchases tab

export const purchaseSuppplierDetailsDataFormatter = (data) => {
  return {
    topCards: [
      {
        title: "Total Suppliers",
        value: data?.suppliers,
        subText: "Active suppliers",
        icon: <FaUsers className="fs-3 text-primary" />,
        bg: "#EEF4FF",
        textColor: "#2563EB",
      },
      {
        title: "Total Quantity",
        value: `${data?.totalQuantity.toLocaleString()} GM`,
        subText: "Purchased YTD",
        icon: <FaBoxOpen className="fs-3 text-success" />,
        bg: "#ECFDF5",
        textColor: "#047857",
      },
      {
        title: "Total Value",
        value: `₹${data?.totalAmount.toLocaleString()}`,
        subText: "Total spend",
        icon: <FaRupeeSign className="fs-3 text-purple" />,
        bg: "#F5F3FF",
        textColor: "#6D28D9",
      },
    ],
    tableMeta: {
      title: "Supplier Purchase Details",
      subtitle: "Real-time consumption metrics and performance indicators",
      icon: <FaChartBar className="text-warning fs-5 me-2" />,
    },
    tableData: data?.list.map((item) => ({
      supplierName: item.supplier?.name || "-",
      totalQuantity: `${item.purchase?.totalQuantity?.toLocaleString()} GM`,
      totalPrice: `₹${item.purchase?.totalPrice?.toLocaleString()}`,
      avgPrice: `₹${item.purchase?.unitPrice?.toFixed(2)}`,
      startDate: new Date(item.purchase?.purchaseStartDate).toLocaleDateString(
        "en-GB",
        { month: "short", day: "2-digit", year: "numeric" }
      ),
      endDate: new Date(item.purchase?.latestPurchaseDate).toLocaleDateString(
        "en-GB",
        { month: "short", day: "2-digit", year: "numeric" }
      ),
    })),
  };
};

export const purchaseTrendAnalysisDataFormatter = (data) => {
  const chartData = data.map((item) => ({
    date: new Date(item.dt).toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
    }),
    purchaseAmount: Number(item.purchaseValue || 0),
    avgPrice:Number(item.unitPrice || 0),
      // item.purchaseValue > 0
      //   ? Number((item.purchaseValue / item.consumptionQuantity) * 100).toFixed(
      //       2
      //     )
      //   : 0,
  }));

  const tableData = data.map((item) => ({
    date: {
      label: new Date(item.dt).toLocaleDateString("en-GB", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      icon: <FaCalendarAlt className="text-primary me-2" />,
    },
    quantity: {
      label: `${item.purchaseQuantity?.toLocaleString() || 0} GM`,
      icon: <FaBoxOpen className="text-info me-2" />,
    },
    totalPrice: {
      label: `₹${item.purchaseValue?.toLocaleString() || 0}`,
      icon: <FaRupeeSign className="text-success me-2" />,
    },
    avgPrice: {
      label:
        item.purchaseValue > 0
          ? `₹${((item.purchaseValue / item.consumptionQuantity) * 100).toFixed(
              2
            )}`
          : "₹0.00",
    },
  }));

  return { chartData, tableData };
};

export const purchaseAnalyticsOverviewDataFormatter = (apiData) => {
  if (!apiData) return [];
  console.log(apiData.thisWeek,"ramarama")

  return [
    {
      key: "thisWeek",
      label: "This Week",
      quantity: apiData?.thisWeek?.purchaseQuantity || 0,
      price: apiData?.thisWeek?.purchaseValue || 0,
      avgPrice: apiData?.thisWeek?.unitPrice
        ? apiData.thisWeek.purchaseValue / apiData.thisWeek.purchaseQuantity
        : 0,
      icon: <FaCalendarAlt size={20} />,
      bgColor: "#E8F0FF", // light blue
      borderColor: "#4285F4",
      textColor: "#4285F4",
    },
    {
      key: "lastWeek",
      label: "Last Week",
      quantity: apiData?.lastWeek?.purchaseQuantity || 0,
      price: apiData?.lastWeek?.purchaseValue || 0,
      avgPrice: apiData?.lastWeek?.purchaseQuantity
        ? apiData.lastWeek.purchaseValue / apiData.lastWeek.purchaseQuantity
        : 0,
      icon: <FaCalendarWeek size={20} />,
      bgColor: "#E7FAEF", // light green
      borderColor: "#34A853",
      textColor: "#34A853",
    },
    {
      key: "thisMonth",
      label: "This Month",
      quantity: apiData?.thisMonth?.purchaseQuantity || 0,
      price: apiData?.thisMonth?.purchaseValue || 0,
      avgPrice: apiData?.thisMonth?.purchaseQuantity
        ? apiData.thisMonth.purchaseValue / apiData.thisMonth.purchaseQuantity
        : 0,
      icon: <FaCalendar size={20} />,
      bgColor: "#F3E8FF", // light purple
      borderColor: "#A142F4",
      textColor: "#A142F4",
    },
    {
      key: "lastMonth",
      label: "Last Month",
      quantity: apiData?.lastMonth?.purchaseQuantity || 0,
      price: apiData?.lastMonth?.purchaseValue || 0,
      avgPrice: apiData?.lastMonth?.purchaseQuantity
        ? apiData.lastMonth.purchaseValue / apiData.lastMonth.purchaseQuantity
        : 0,
      icon: <FaChartLine size={20} />,
      bgColor: "#FFF4E5", // light orange
      borderColor: "#FB8C00",
      textColor: "#FB8C00",
    },
  ];
};

//consumption tab

// export const consumptionSummaryOverViewDataFormatter = (data) => {
//   if (!data?.summary) return [];

//   const { summary, item } = data;

//   return [
//     {
//       key: "openingStock",
//       label: "Opening Stock",
//       quantity: summary?.consumptionOpeningQuantity || 0,
//       value: summary?.consumptionOpeningValue || 0,
//       departments: summary?.consumedDepartmentCount || 0,
//       unit: item?.unit || "",
//       icon: <FaBoxOpen size={20} />,
//       bgColor: "#E7FAEF", // Light green
//     },
//     {
//       key: "consumptionData",
//       label: "Consumption Data",
//       quantity: summary?.consumptionQuantity || 0,
//       value: summary?.consumptionValue || 0,
//       departments: summary?.consumedDepartmentCount || 0,
//       unit: item?.unit || "",
//       icon: <FaChartLine size={20} />,
//       bgColor: "#FFF4E5", // Light orange
//     },
//     {
//       key: "closingStock",
//       label: "Closing Stock",
//       quantity: summary?.consumptionClosingQuantity || 0,
//       value: summary?.consumptionClosingValue || 0,
//       departments: summary?.consumedClosingDepartmentCount || 0,
//       unit: item?.unit || "",
//       icon: <FaCube size={20} />,
//       bgColor: "#EEF2FF", // Light blue
//     },
//   ];
// };
export const consumptionSummaryOverViewDataFormatter = (data) => {
  if (!data?.summary) return [];

  const { summary, item } = data;

  return [
    {
      key: "openingStock",
      label: "Opening Stock",
      quantity: summary?.consumptionOpeningQuantity || 0,
      value: summary?.consumptionOpeningValue || 0,
      departments: summary?.consumedDepartmentCount || 0,
      unit: item?.unit || "",
      icon: <FaBoxOpen />,
      bgColor: "#E7FAEF", // Light green pastel
    },
    {
      key: "consumptionData",
      label: "Consumption Data",
      quantity: summary?.consumptionQuantity || 0,
      value: summary?.consumptionValue || 0,
      departments: summary?.consumedItemCount || 0,
      unit: item?.unit || "",
      icon: <FaChartLine />,
      bgColor: "#FFF4E5", // Light orange pastel
    },
    {
      key: "closingStock",
      label: "Closing Stock",
      quantity: summary?.consumptionClosingQuantity || 0,
      value: summary?.consumptionClosingValue || 0,
      departments: summary?.consumedClosingDepartmentCount || 0,
      unit: item?.unit || "",
      icon: <FaCube />,
      bgColor: "#EEF2FF", // Light blue pastel
    },
  ];
};
export function consumptionTrendAnalysisDataFormatter(apiData) {
  return apiData?.list.map((item) => {
    const date = new Date(item.dt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return {
      date,
      weekday: new Date(item.dt).toLocaleDateString("en-US", {
        weekday: "long",
      }),
      opening: {
        value: `${item.consumptionOpeningQuantity || 0} GM`,
        amount: `₹${item.consumptionOpeningValue?.toFixed(2) || 0}`,
        icon: <FaBoxOpen className="text-primary me-2" />,
      },
      consumption: {
        value: `${item.consumptionQuantity || 0} GM`,
        amount: `₹${item.consumptionValue?.toFixed(2) || 0}`,
        icon: <FaShoppingCart className="text-warning me-2" />,
      },
      closing: {
        value: `${item.consumptionClosingQuantity || 0} GM`,
        amount: `₹${item.consumptionClosingValue?.toFixed(2) || 0}`,
        icon: <FaBoxOpen className="text-success me-2" />,
      },
      netConsumption: {
        value: `${item.netConsumptionQuantity || 0} GM`,
        amount: `₹${item.netConsumptionValue?.toFixed(2) || 0}`,
        icon:
          item.netConsumptionQuantity >= 0 ? (
            <FaArrowUp className="text-danger me-2" />
          ) : (
            <FaArrowDown className="text-success me-2" />
          ),
      },
      sale: {
        value: `${item.saleQuantity || 0} GM`,
        amount: `₹${item.salePrice?.toFixed(2) || 0}`,
        icon: <FaChartLine className="text-purple me-2" />,
      },
      burnUtilization: {
        value: `${item.saleToConsumptionQuantityDifference || 0} GM`,
        percent: `${item.saleToConsumptionMarginPercentage?.toFixed(2) || 0}%`,
      },
    };
  });
}

export function consumptionDepartmentAnalyticsDataFormatter(apiData) {
  if (!apiData || !apiData.list) return [];

  return apiData?.list?.map((item) => {
    const departmentName = item?.department?.name || "N/A";
    return {
      id: item.id,
      department: departmentName,
      opening: {
        value: item.consumptionOpeningValue,
        icon: <FaShoppingCart className="text-primary" />,
      },
      consumption: {
        value: item.consumptionValue,
        icon: <FaChartPie className="text-danger" />,
      },
      closing: {
        value: item.consumptionClosingValue,
        icon: <FaShoppingCart className="text-success" />,
      },
      netConsumption: {
        value: item.netConsumptionValue,
        icon: <FaBalanceScale className="text-warning" />,
      },
      sales: {
        value: item.totalSales,
        icon: <FaDollarSign className="text-purple" />,
      },
      utilization: {
        value: item.consumptionPercentage,
        icon: <FaPercent className="text-info" />,
      },
    };
  });
}

export const getDepartmentIcon = (name) => {
  const iconMap = {
    BIRYANI: <FaUtensils color="#4E79FF" />,
    CHINESE: <FaGlassMartiniAlt color="#F97316" />,
    "ARADHANA MEALS": <FaConciergeBell color="#A855F7" />,
    "SOUTH INDIAN": <FaCoffee color="#10B981" />,
    "NORTH INDIAN": <FaPizzaSlice color="#EF4444" />,
    TANDOOR: <FaWineGlassAlt color="#EAB308" />,
    "EXOTIC SHAKES": <FaIceCream color="#06B6D4" />,
    BEVERAGES: <FaGlassMartiniAlt color="#2563EB" />,
    BREAKFAST: <FaBreadSlice color="#F59E0B" />,
    "GALA DINNER": <FaDrumstickBite color="#D946EF" />,
    DISPATCH: <FaHamburger color="#3B82F6" />,
    "GALA BREAKFAST": <FaCoffee color="#22C55E" />,
    "GALA LUNCH": <FaFish color="#F43F5E" />,
    STAFF: <FaConciergeBell color="#6B7280" />,
  };
  return iconMap[name] || <FaUtensils color="#6B7280" />;
};

export const consumptionDepartmentDistributionChartDataFormatter = (
  apiData
) => {
  if (!apiData?.list) return { chartData: [], total: 0 };

  const totalConsumption = apiData.list.reduce(
    (sum, item) => sum + (item.netConsumptionValue || 0),
    0
  );

  const chartData = apiData.list
    .map((item) => ({
      id: item.id,
      name: item.department?.name || "Unknown",
      value: item.netConsumptionValue || 0,
      percentage: totalConsumption
        ? ((item.netConsumptionValue / totalConsumption) * 100).toFixed(1)
        : "0",
      icon: getDepartmentIcon(item.department?.name),
    }))
    .sort((a, b) => b.value - a.value);

  return { chartData, total: totalConsumption.toFixed(2) };
};

// utils/dataFormatter.js
export const consumptionMenuItemDataAnalyticsDataFormatter = () => {
  const rawData = [
    {
      id: 1,
      name: "Butter Chicken",
      recipeQty: "250 gm",
      recipePrice: 320,
      totalQty: 1200,
      totalPrice: 1536,
      items: 2,
      icon: <FaDrumstickBite color="#3b82f6" />,
    },
    {
      id: 2,
      name: "Paneer Butter Masala",
      recipeQty: "200 gm",
      recipePrice: 280,
      totalQty: 800,
      totalPrice: 1120,
      items: 3,
      icon: <FaCheese color="#22c55e" />,
    },
    {
      id: 3,
      name: "Dal Makhani",
      recipeQty: "300 gm",
      recipePrice: 180,
      totalQty: 960,
      totalPrice: 576,
      items: 4,
      icon: <FaUtensilSpoon color="#f97316" />,
    },
    {
      id: 4,
      name: "Chicken Biryani",
      recipeQty: "350 gm",
      recipePrice: 400,
      totalQty: 700,
      totalPrice: 800,
      items: 1,
      icon: <FaDrumstickBite color="#ef4444" />,
    },
    {
      id: 5,
      name: "Paneer Tikka",
      recipeQty: "150 gm",
      recipePrice: 240,
      totalQty: 600,
      totalPrice: 960,
      items: 5,
      icon: <FaCheese color="#6366f1" />,
    },
    {
      id: 6,
      name: "Fish Curry",
      recipeQty: "200 gm",
      recipePrice: 350,
      totalQty: 400,
      totalPrice: 700,
      items: 2,
      icon: <FaFish color="#10b981" />,
    },
    {
      id: 7,
      name: "Mutton Rogan Josh",
      recipeQty: "180 gm",
      recipePrice: 450,
      totalQty: 360,
      totalPrice: 900,
      items: 3,
      icon: <FaDrumstickBite color="#eab308" />,
    },
    {
      id: 8,
      name: "Palak Paneer",
      recipeQty: "220 gm",
      recipePrice: 200,
      totalQty: 550,
      totalPrice: 500,
      items: 4,
      icon: <FaLeaf color="#22c55e" />,
    },
  ];

  const formatted = rawData.map((item) => ({
    ...item,
    chartValue: item.totalQty,
  }));

  const totalConsumption = formatted.reduce(
    (sum, item) => sum + item.totalQty,
    0
  );

  return { formatted, totalConsumption };
};

//products tab

export const productsMenuItemListConsumptionDistributionDataFormatter = (
  apiResponse
) => {
  if (!apiResponse || !apiResponse.list)
    return { menuItems: [], chartData: [] };

  const menuItems = apiResponse.list.map((entry, index) => {
    const { product, sales, recipe } = entry;

    // Pick icon based on product name
    let icon = <FaUtensils className="text-secondary me-2" />;
    if (product?.name.toLowerCase().includes("chicken"))
      icon = <FaDrumstickBite className="text-danger me-2" />;
    else if (product?.name.toLowerCase().includes("paneer"))
      icon = <FaCheese className="text-warning me-2" />;
    else if (product?.name.toLowerCase().includes("fish"))
      icon = <FaFish className="text-info me-2" />;
    else if (
      product?.name.toLowerCase().includes("veg") ||
      product?.name.toLowerCase().includes("aloo") ||
      product?.name.toLowerCase().includes("palak")
    ) {
      icon = <FaLeaf className="text-success me-2" />;
    }

    return {
      id: product?.id,
      name: product?.masterProductName,
      items: sales.itemsSold,
      recipeQty: `${recipe.totalQuantity} gm`,
      recipePrice: `₹${recipe.totalPrice}`,
      consumptionQty: `${sales.itemsSold * recipe.totalQuantity} gm`,
      consumptionPrice: `₹${sales.netSales}`,
      icon,
    };
  });

  // Prepare chart data
  const chartData = menuItems.map((item) => ({
    name: item.name,
    value: parseInt(item.consumptionQty),
  }));

  return { menuItems, chartData };
};

//price trends tab
export const priceTrendsDataFormatter = (apiResponse) => {
  if (!apiResponse || !apiResponse.list) return [];
  const cardsData = {
    currentPrice: apiResponse?.currentPrice?.item?.unitPrice,
    curentPriceSub: apiResponse?.currentPrice
      ? `per ${apiResponse?.currentPrice?.item?.unitQuantity} ${apiResponse?.currentPrice?.item?.unit}`
      : "",
    lowestPrice: apiResponse?.lowestPrice?.item?.unitPrice,
    lowestPriceSub: apiResponse?.lowestPrice
      ? `Low in ${apiResponse?.lowestPrice?.startDate}`
      : "",
    highestPrice: apiResponse?.highestPrice?.item?.unitPrice,
    highestPriceSub: apiResponse?.lowestPrice
      ? `Peak in ${apiResponse?.lowestPrice?.startDate}`
      : "",
    percentageOfChange:
      apiResponse?.highestPrice?.item?.unitPrice -
      apiResponse?.lowestPrice?.item?.unitPrice,
    percentageOfChangeSub: apiResponse?.lowestPrice
      ? `per ${apiResponse?.percentageOfChange}% change`
      : "",
  };

  const data = apiResponse.list.map((entry, index) => {
    // const prevPrice =
    //   index > 0 ? apiResponse.list[index - 1].price : entry.price;
    // const priceDiff = entry.price - prevPrice;
    // const changePercent = prevPrice
    //   ? ((priceDiff / prevPrice) * 100).toFixed(2)
    //   : 0;

    let trendIcon = <FaMinus color="#6c757d" />;
    let trendText = "Stable";
    if (entry.priceChange > 0) {
      trendIcon = <FaArrowUp color="green" />;
      trendText = "Up";
    } else if (entry.priceChange < 0) {
      trendIcon = <FaArrowDown color="red" />;
      trendText = "Down";
    }

    return {
      startDate: entry.startDate,
      endDate: entry.endDate,
      price: entry.price,
      // priceDiff: priceDiff.toFixed(2),
      priceDiff: entry.priceChange.toFixed(2),
      changePercent: entry.perecentChange,
      trendIcon,
      trendText,
    };
  });
  return { cardsData, data };
};

//stock trends tab
export const stockTrendsDataFormatter = (apiResponse) => {
  if (!apiResponse || !apiResponse.list) return [];
  const cardsData = {
    currentStock: apiResponse?.currentStock,
    currentStockSub: `Lowest Inventory`,
    currentPrice: apiResponse?.currentPrice,
    currentPriceSub: apiResponse?.currentPrice
      ? `per ${apiResponse?.item?.unitQuantity} ${apiResponse?.item?.unit}`
      : "",
    totalPurchase: apiResponse?.totalPurchase,
    totalPurchaseSub: `Period total`,
    totalConsumption: apiResponse?.totalConsumption,
    totalConsumptionSub: `Period total`,
    unit: apiResponse?.item?.unit,
  };
  const data = apiResponse?.list.map((entry, index) => {
    let trendIcon = <FaMinus className="text-secondary" />;
    let trendColor = "text-muted";
    if (entry.status==="GREEN") {
      trendIcon = <FaArrowUp className="text-success" />;
      trendColor = "text-success";
    } else  {
      trendIcon = <FaArrowDown className="text-danger" />;
      trendColor = "text-danger";
    }

    return {
      date: entry.dt,
      price: entry.unitPrice,
      purchaseQty: entry.purchaseQuantity,
      consumptionQty: entry.consumptionQuantity,
      closingQty: entry.purchaseClosingQuantity,
      closingDate: entry.latestPurchaseClosingDate,
      leftoverStock: entry.leftOverStockQuantity,
      leftoverStockValue: entry.leftoverStockValue,
      trendIcon,
      trendColor,
    };
  });
  return { cardsData, data };
};
