import { FaUtensils, FaChartLine, FaCoffee } from "react-icons/fa";

export function consumptionSummaryFormatter(data) {
  return [
    {
      title: "CONSUMPTION %",
      percentage: `${(data.consumptionPercentage).toFixed(0)}%`,
      percentageChange: "+2.1%", // you can calculate if API gives trend data
      icon: <FaUtensils size={36} color="#bc4b00" />,
      textColor: "#bc4b00",
      bgColor: "rgb(255,247,237)",
      rows: [
        { label: "Sale", value: `₹${data.netSales.toLocaleString()}` },
        {
          label: "Consumption",
          value: `₹${data.consumptionValue.toLocaleString()}`,
        },
        {
          label: "Net Consumption",
          value: `₹${data.netConsumptionValue.toLocaleString()} (${(
            data.netConsumptionPercentage
          ).toFixed(0)}%)`,
        },
      ],
    },
    {
      title: "CONSUMPTION",
      percentage: `₹${data.consumptionValue.toLocaleString()}`,
      percentageChange: "-1.5%", // example
      icon: <FaChartLine size={36} color="#1d40af" />,
      textColor: "#1d40af",
      bgColor: "rgb(238,245,255)",
      rows: [
        {
          label: "Opening Stock",
          value: `₹${data.consumptionOpeningValue.toLocaleString()}`,
        },
        {
          label: "Closing Stock",
          value: `₹${data.consumptionClosingValue.toLocaleString()}`,
        },
        {
          label: "Net Consumption",
          value: `₹${data.netConsumptionValue.toLocaleString()}`,
        },
      ],
    },
    {
      title: "NET SALES",
      percentage: `₹${data.netSales.toLocaleString()}`,
      percentageChange: "+8.3%", // example
      icon: <FaCoffee size={36} color="#5b21b6" />,
      textColor: "#5b21b6",
      bgColor: "rgb(250,245,255)",
      rows: [
        { label: "Total Sales", value: `₹${data.totalSales.toLocaleString()}` },
        { label: "Discount", value: `₹${data.discount.toLocaleString()}` },
        { label: "Tax", value: `₹${data.tax.toLocaleString()}` },
        {
          label: "Dine in",
          value: `₹${data.dineInSales.toLocaleString()}`,
        },
        { label: "Online", value: `₹${data.onlineSales.toLocaleString()}` },
      ],
    },
  ];
}
