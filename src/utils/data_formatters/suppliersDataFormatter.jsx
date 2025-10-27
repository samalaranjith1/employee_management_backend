import { IconCalculator, IconCurrencyRupee, IconPackage, IconTrendingUp } from "@tabler/icons-react";
import {
  FaFileInvoice,
  FaBoxOpen,
  FaRupeeSign,
  FaReceipt,
  FaChartLine,
  FaTable,
} from "react-icons/fa";

export const suppliersSummaryOverViewDataFormatter = (apiData) => {
  if (!apiData || !apiData.summary) return { summaryCards: [] };

  const { expense, payment, dues } = apiData.summary;

  // derive dues
  const duesTotal = (expense?.totalAmount || 0) - (payment?.totalAmount || 0);

  return {
    summaryCards: [
      {
        id: "expense",
        title: "Expense",
        bgColor: "#FFF7ED",
        iconBg: "#FF5B22",
        icon: <div style={{
          background: '#fff7ed', // beige gradient for Figma style
          borderRadius: '12px',
          padding: '8px',
          display: 'inline-block'
        }}>
          <IconCalculator stroke={2} color="#000" size={20} />
        </div>,
        fields: [
          {
            label: "Purchase Amount",
            value: `₹${expense?.purchaseAmount || 0}`,
          },
          { label: "Tax Amount", value: `₹${expense?.taxAmount || 0}` },
          {
            label: "Total Amount",
            value: `₹${expense?.totalAmount || 0}`,
            bold: true,
          },
        ],
      },
      {
        id: "payment",
        title: "Payment",
        bgColor: "#f0fdf4",
        iconBg: "#1AAB4A",
        icon:  <div style={{
      background: '#f0fdf4', // blue gradient similar to Figma
      borderRadius: '16px',
      padding: '12px',
      display: 'inline-block'
    }}>
      <IconCurrencyRupee stroke={2} color="#000" size={24} />
    </div>,
        fields: [
          { label: "Payment Amount", value: `₹${payment?.paymentAmount || 0}` },
          { label: "Tax Amount", value: `₹${payment?.taxAmount || 0}` },
          {
            label: "Total Amount",
            value: `₹${payment?.totalAmount || 0}`,
            bold: true,
          },
        ],
      },
      {
        id: "dues",
        title: "Dues",
        bgColor: "#fef2f2",
        iconBg: "#fef2f2",
        icon: <FaReceipt size={18} color="#000" />,
        fields: [
          { label: "Total Dues", value: `₹${dues?.totalAmount}` },
          { label: "This month", value: `₹${dues?.thisMonthAmount}` },
          { label: "Previous", value: `₹${dues?.previousAmount}`, bold: true },
        ],
      },
    ],
  };
};

// Helper to format date like "Dec 1st, 2024 - Sunday"
const formatDate = (dt) => {
  const date = new Date(dt);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  // Add suffix (st, nd, rd, th)
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  return {
    dateLabel: `${formattedDate.replace(/\d+/, day + suffix)}`,
    weekday,
  };
};

export const supplierFinancialAnalysisDataFormatter = (apiData) => {
  if (!apiData?.list) return { chart: [], table: [], cards: [] };

  // Prepare chart data
  const chartData = apiData.list.map((item) => ({
    date: item.dt,
    purchaseAmount: item.expense?.purchaseAmount || 0,
    paymentAmount: item.payment?.paymentAmount || 0,
  }));

  // Prepare table data
  const tableData = apiData.list.map((item) => {
    const { dateLabel, weekday } = formatDate(item.dt);
    return {
      date: dateLabel,
      day: weekday,
      purchaseAmount: item.expense?.purchaseAmount || 0,
      paymentAmount: item.payment?.paymentAmount || 0,
    };
  });

  // Section metadata (icons, bg, etc)
  const cards = [
    {
      id: "financial",
      title: "Supplier Financial Analysis",
      subtitle: "Daily tracking: purchase amounts and payment amounts",
      iconBg: "#6C63FF",
      icon: <div style={{
      background: '#7831fc', // bold purple
      borderRadius: '12px',
      padding: '8px',
      display: 'inline-block'
    }}>
      <IconTrendingUp stroke={2} color="#fff" size={20} />
    </div>,
      bgColor: "#fff",
    },
    {
      id: "analytics",
      title: "Supplier Payment Analytics",
      subtitle:
        "Daily breakdown of supplier purchases and payment transactions",
      iconBg: "#28A745",
      icon: <FaTable size={16} color="#fff" />,
      bgColor: "#F2FBF5",
    },
  ];
  return { chart: chartData, table: tableData, cards };
};

export const rawMaterialPurchaseAnalysisDataFormatter = (apiData) => {
  if (!apiData?.list || !Array.isArray(apiData.list)) {
    return { items: [], totalPurchaseValue: 0, cardMeta: {} };
  }

  // Format table items
  const items = apiData.list.map((entry, idx) => {
    const item = entry.item || {};
    const qty = `${entry.quantity} ${item.unit || ""}`;
    return {
      key: idx,
      name: item.name || "-",
      type: item.itemType || "-",
      unitInfo: `${item.unitQuantity}${item.unit || ""} • ₹${item.unitPrice || 0
        }`,
      quantity: qty,
      value: entry.totalPrice || 0,
    };
  });

  // Calculate total purchase value
  const totalPurchaseValue = items.reduce((sum, i) => sum + (i.value || 0), 0);

  // Metadata card (for top header)
  const cardMeta = {
    icon: <div style={{
      background: '#f16d01', // vivid green gradient
      borderRadius: '12px',
      padding: '8px',
      display: 'inline-block'
    }}>
      <IconPackage stroke={2} color="#fff" size={20} />
    </div>,
    iconBg: "#FF6B00",
    title: "Raw Material Purchase Analysis",
    subtitle:
      "Purchase breakdown showing quantities and values for raw materials",
    headerBg: "#FFF8F0",
  };

  return { items, totalPurchaseValue, cardMeta };
};

//items tab
export const suppliersItemsDataFormatter = (apiData) => {
  if (!apiData?.list || !Array.isArray(apiData.list)) {
    return { items: [] };
  }

  return {
    items: apiData.list.map((entry, idx) => {
      const item = entry.item || {};
      return {
        key: idx,
        icon: <FaBoxOpen size={14} color="#6B7280" className="me-2" />,
        name: item.name || "-",
        type: item.itemType || "-",
        unitInfo: `${item.unitQuantity}${item.unit || ""} . ₹${item.unitPrice || 0
          }`,
        quantity: `${entry.quantity} ${item.unit || ""}`,
        value: entry.totalPrice || 0,
      };
    }),
  };
};


