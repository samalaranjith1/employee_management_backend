// utils/data_formatters/dashboardFormatter.js
import {
  IconSoup,
  IconShoppingCart,
  IconChartBar,
  IconTrendingUp,
  IconTrendingDown,
} from "@tabler/icons-react";

export function consumptionSummaryFormatter(apiResponse) {
  const { current } = apiResponse;

  const getChangeInfo = (val) => ({
    icon:
      val >= 0 ? (
        <IconTrendingUp size={16} color="green" />
      ) : (
        <IconTrendingDown size={16} color="red" />
      ),
    text: val > 0 ? `+${val.toFixed(1)}%` : `${val.toFixed(1)}%`,
    color: val >= 0 ? "green" : "red",
  });

  return [
    {
      title: "Consumption %",
      value: `${current.consumptionPercentage.toFixed(0)}%`,
      change: getChangeInfo(apiResponse.consumptionPercentageChange),
      icon: <IconSoup size={22} color="white" />,
      iconBg: "#f28c28",
      bg: "#fff7f1",
      details: [
        {
          label: "Sale",
          value: `₹${current.netSales.toLocaleString()}`,
          color: "#000",
        },
        {
          label: "Consumption",
          value: `₹${current.consumptionValue.toLocaleString()}`,
          color: "#d97706",
        },
        {
          label: `Net Consumption (${current.netConsumptionPercentage.toFixed(
            0
          )}%)`,
          value: `₹${current.netConsumptionValue.toLocaleString()}`,
          color: "#d97706",
        },
      ],
    },
    {
      title: "Consumption",
      value: `₹${current.consumptionValue.toLocaleString()}`,
      change: getChangeInfo(apiResponse.consumptionValueChange),
      icon: <IconShoppingCart size={22} color="white" />,
      iconBg: "#2563eb",
      bg: "#f0f7ff",
      details: [
        {
          label: "Opening Stock",
          value: `₹${current.consumptionOpeningValue.toLocaleString()}`,
          color: "#000",
        },
        {
          label: "Closing Stock",
          value: `₹${current.consumptionClosingValue.toLocaleString()}`,
          color: "#000",
        },
        {
          label: "Net Consumption",
          value: `₹${current.netConsumptionValue.toLocaleString()}`,
          color: "#000",
        },
      ],
    },
    {
      title: "Net Sales",
      value: `₹${current.netSales.toLocaleString()}`,
      change: getChangeInfo(apiResponse.netSalesChange),
      icon: <IconChartBar size={22} color="white" />,
      iconBg: "#8b5cf6",
      bg: "#f8f5ff",
      details: [
        {
          label: "Total Sales",
          value: `₹${current.totalSales.toLocaleString()}`,
          color: "#6d28d9",
        },
        {
          label: "Discount",
          value: `₹${current.discount.toLocaleString()}`,
          color: "#6d28d9",
        },
        {
          label: "Tax",
          value: `₹${current.tax.toLocaleString()}`,
          color: "#6d28d9",
        },
        {
          label: "Dine In",
          value: `₹${current.dineInSales ?? 65000}`,
          color: "#6d28d9",
        }, // fallback
        {
          label: "Online",
          value: `₹${current.onlineSales ?? 10000}`,
          color: "#6d28d9",
        },
      ],
    },
  ];
}
