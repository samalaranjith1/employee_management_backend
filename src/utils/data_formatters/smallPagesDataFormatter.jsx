import {
  FaRupeeSign,
  FaChartLine,
  FaTag,
  FaChartBar,
  FaPizzaSlice,
} from "react-icons/fa";

// ✅ Data formatter for Sales Analytics
export const salesAnalyticsFormatter = (apiData) => {
  if (!apiData) {
    return {
      summaryCards: [],
      tableData: { columns: [], rows: [] },
    };
  }

  // 🔹 Top Summary Cards
  const summaryCards = [
    {
      id: "netSales",
      title: "Net Sales",
      value: `₹${apiData.netSales ?? 0}`,
      icon: <FaChartLine color="#fff" size={24} />,
      bgColor: "#F0F7FF",
      iconBg: "#165DFF",
    },
    {
      id: "discount",
      title: "Discount",
      value: `₹${apiData.discount ?? 0}`,
      icon: <FaTag color="#fff" size={24} />,
      bgColor: "#F8F0FF",
      iconBg: "#8000FF",
    },
    {
      id: "totalSales",
      title: "Total Sales",
      value: `₹${apiData.totalSales ?? 0}`,
      icon: <FaRupeeSign color="#fff" size={24} />,
      bgColor: "#F0FFF8",
      iconBg: "#16C784",
    },
  ];

  // 🔹 Table
  const tableData = {
    columns: [
      { key: "date", label: "DATE" },
      { key: "product", label: "PRODUCT" },
      { key: "netSales", label: "NET SALES" },
      { key: "discount", label: "DISCOUNT" },
      { key: "totalSales", label: "TOTAL SALES" },
      { key: "itemsSold", label: "ITEMS SOLD" },
      { key: "orders", label: "ORDERS" },
    ],
    rows: apiData.list?.map((item) => ({
      date: new Date(item.dt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        weekday: "short",
      }),
      product: item.product?.name ?? "-",
      netSales: `₹${item.sales?.netSales ?? 0}`,
      discount: `₹${item.sales?.discount ?? 0}`,
      totalSales: `₹${item.sales?.totalSales ?? 0}`,
      itemsSold: item.sales?.itemsSold ?? 0,
      orders: item.sales?.orders ?? 0,
    })) ?? [],
  };

  return { summaryCards, tableData };
};

// ✅ Formatter for Items Consumption History
// ✅ Formatter (similar to salesAnalyticsFormatter)
export const consumptionHistoryFormatter = (apiData) => {
  if (!apiData) {
    return { summaryCards: [], tableData: { columns: [], rows: [] } };
  }

  // --- Summary Cards ---
  const summaryCards = [
    {
      id: "closingStock",
      title: "Total Closing Stock Value",
      value: `₹${apiData.totalPrice?.toLocaleString() ?? 0}`,
      bgColor: "#F2FBF5",
      iconBg: "#21A365",
    },
    {
      id: "totalItems",
      title: "Total Items",
      value: apiData.totalItems ?? 0,
      bgColor: "#F5F8FF",
      iconBg: "#2471EB",
    },
    {
      id: "totalQty",
      title: "Total Quantity",
      value: apiData.totalQuantity ?? 0,
      bgColor: "#FFF8E6",
      iconBg: "#F28118",
    },
    {
      id: "departments",
      title: "Departments",
      value: apiData.totalDepartments ?? 0,
      bgColor: "#FCEEFE",
      iconBg: "#9B51E0",
    },
  ];

  // --- Table Data ---
  const tableData = {
    columns: [
      { key: "date", label: "DATE" },
      { key: "department", label: "DEPARTMENT" },
      { key: "item", label: "ITEM DETAILS" },
      { key: "qty", label: "QUANTITY" },
      { key: "totalPrice", label: "TOTAL PRICE" },
    ],
    rows: apiData.list?.map((entry) => ({
      date: new Date(entry.dt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      department: entry.department?.name ?? "-",
      item: (
        <>
          {entry.item?.name}
          <br />
          <span style={{ fontSize: 13, color: "#868DA6" }}>
            {entry.item?.categoryName} · {entry.item?.unitQuantity}{" "}
            {entry.item?.unit} · ₹{entry.item?.unitPrice}
          </span>
        </>
      ),
      qty: `${entry.quantity} ${entry.item?.unit ?? ""}`,
      totalPrice: `₹${entry.totalPrice?.toLocaleString() ?? 0}`,
    })),
  };

  return { summaryCards, tableData };
};

// src/utils/data_formatters/consumptionClosingFormatter.js
import { FaDoorClosed, FaCheckCircle } from "react-icons/fa";
import React from "react";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

export const consumptionClosingFormatter = (apiData) => {
  if (!apiData) {
    return { summaryCards: [], tableData: { columns: [], rows: [] } };
  }

  // ✅ Summary cards
  const summaryCards = [
    {
      id: "closingStock",
      title: "Total Closing Stock",
      value: `₹${apiData.totalPrice?.toLocaleString() ?? 0}`,
      icon: <FaDoorClosed color="#fff" size={24} />,
      bgColor: "#F2FBF5",
      iconBg: "#21A365",
    },
    {
      id: "totalItems",
      title: "Total Items",
      value: apiData.totalItems ?? 0,
      icon: <FaCheckCircle color="#fff" size={24} />,
      bgColor: "#F5F8FF",
      iconBg: "#2471EB",
    },
  ];

  // ✅ Table columns
  const tableData = {
    columns: [
      { key: "date", label: "DATE" },
      { key: "department", label: "DEPARTMENT" },
      { key: "item", label: "ITEM DETAILS" },
      { key: "qty", label: "QUANTITY" },
      { key: "totalPrice", label: "TOTAL PRICE" },
    ],
    rows: apiData.list?.map((row) => ({
      date: new Date(row.dt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      department: row.department?.name ?? "-",
      item: (
        <>
          {row.item?.name}
          <br />
          <span style={{ fontSize: 13, color: "#868DA6" }}>
            {row.item?.categoryName} · {row.item?.unitQuantity}{" "}
            {row.item?.unit} · ₹{row.unitPrice}
          </span>
        </>
      ),
      qty: `${row.quantity} ${row.item?.unit ?? ""}`,
      totalPrice: `₹${row.totalPrice?.toLocaleString() ?? 0}`,
    })),
  };

  return { summaryCards, tableData };
};

/* ✅ Formatter */
export const purchaseHistoryFormatter = (apiData) => {
  if (!apiData) {
    return { summaryCards: [], tableData: { columns: [], rows: [] } };
  }

  const summaryCards = [
    {
      id: "totalItems",
      title: "Total Items Purchased",
      value: apiData.totalItems ?? 0,
      subtitle: `${apiData.totalQuantity ?? 0} Units`,
      icon: <FaChartBar color="#fff" size={24} />,
      bgColor: "#F0F7FF",
      iconBg: "#165DFF",
    },
    {
      id: "totalQuantity",
      title: "Total Quantity",
      value: apiData.totalQuantity ?? 0,
      subtitle: "Units across suppliers",
      icon: <FaArrowTrendUp color="#fff" size={24} />,
      bgColor: "#FFF5F0",
      iconBg: "#FF5722",
    },
    {
      id: "totalPrice",
      title: "Total Purchase Value",
      value: `₹${apiData.totalPrice ?? 0}`,
      subtitle: "Overall spend",
      icon: <FaArrowTrendDown color="#fff" size={24} />,
      bgColor: "#F0FFF5",
      iconBg: "#16A34A",
    },
  ];

  const tableData = {
    columns: [
      { key: "item", label: "ITEM DETAILS" },
      { key: "supplier", label: "SUPPLIER" },
      { key: "quantity", label: "QUANTITY" },
      { key: "itemPrice", label: "UNIT PRICE" },
      { key: "totalPrice", label: "TOTAL PRICE" },
      { key: "date", label: "DATE" },
    ],
    rows: apiData.list?.map((row) => ({
      item: `${row.item?.name}\n${row.item?.categoryName} • ${row.item?.unitQuantity}${row.item?.unit}`,
      supplier: row.supplier?.name ?? "-",
      quantity: row.quantity ?? 0,
      itemPrice: `₹${row.itemPrice ?? 0}`,
      totalPrice: `₹${row.totalPrice ?? 0}`,
      date: row.dt ?? "-",
    })) ?? [],
  };

  return { summaryCards, tableData };
};

// utils/data_formatters/smallPagesDataFormatter.js

export const itemPriceChangeFormatter = (apiData) => {
  if (!apiData) {
    return {
      summaryCards: [],
      tableData: { columns: [], rows: [] },
    };
  }

  // ✅ Summary Cards
  const summaryCards = [
    {
      id: "priceUp",
      title: "Items Price Up",
      value: apiData.priceUpItemCount ?? 0,
      bgColor: "#F5F8FF",
      iconBg: "#2471EB",
    },
    {
      id: "priceDown",
      title: "Items Price Down",
      value: apiData.priceDownItemCount ?? 0,
      bgColor: "#F2FBF5",
      iconBg: "#21A365",
    },
    {
      id: "netImpact",
      title: "Net Impact",
      value: `₹${apiData.netAmount ?? 0}`,
      bgColor: "#FFF5F0",
      iconBg: "#FF7800",
    },
  ];

  // ✅ Table Data
  const tableData = {
    columns: [
      { key: "itemName", label: "ITEM" },
      { key: "category", label: "CATEGORY" },
      { key: "oldPrice", label: "OLD PRICE" },
      { key: "newPrice", label: "NEW PRICE" },
      { key: "priceDiff", label: "DIFFERENCE" },
      { key: "priceDiffPercentage", label: "% CHANGE" },
      { key: "projectedMonthlyCostDiff", label: "MONTHLY IMPACT" },
    ],
    rows: apiData.list.map((row) => ({
      itemName: row.item?.name ?? "-",
      category: row.item?.categoryName ?? "-",
      oldPrice: `₹${row.oldPrice}`,
      newPrice: `₹${row.newPrice}`,
      priceDiff: `₹${row.priceDiff}`,
      priceDiffPercentage: `${row.priceDiffPercentage}%`,
      projectedMonthlyCostDiff: `₹${row.projectedMonthlyCostDiff}`,
    })),
  };

  return { summaryCards, tableData };
};

export const receipesDataFormatter = (apiData) => {
  if (!apiData) {
    return {
      summaryCards: [],
      tableData: { columns: [], rows: [] },
    };
  }

  const summaryCards = [
    {
      id: "highMargin",
      title: (
        <>
          <div style={{ color: "#00A650", fontWeight: 700, fontSize: 15 }}>
            High Margin
          </div>
          Profitable Products
        </>
      ),
      value: (
        <div>
          <div style={{ fontWeight: 600 }}>
            Products{" "}
            <span style={{ fontWeight: 400, float: "right" }}>
              {apiData.profitableProducts?.products ?? 0}
            </span>
          </div>
          <div style={{ fontWeight: 600 }}>
            Total Sales{" "}
            <span style={{ fontWeight: 400, float: "right" }}>
              ₹{apiData.profitableProducts?.sales ?? 0}
            </span>
          </div>
          <div style={{ fontWeight: 600, color: "#00A650" }}>
            Shares{" "}
            <span
              style={{
                fontWeight: 400,
                float: "right",
                color: "#00A650",
              }}
            >
              {apiData.profitableProducts?.share ?? 0}%
            </span>
          </div>
        </div>
      ),
      icon: <FaPizzaSlice />,
      bgColor: "#E1FAEE",
      iconBg: "#00A650",
    },
    // Additional cards can be added similarly if needed
  ];

  const tableData = {
    columns: [
      { key: "product", label: "PRODUCT" },
      { key: "itemsSold", label: "ITEMS SOLD" },
      { key: "totalSales", label: "TOTAL SALES" },
      { key: "makingCost", label: "MAKING COST" },
      { key: "costPercent", label: "COST %" },
    ],
    rows: (apiData.profitableProducts?.list ?? []).map((item) => ({
      product: (
        <>
          {item.product.name} ({item.product.variation})
          <br />
          <span style={{ fontSize: 13, color: "#868DA6" }}>
            {item.product.departmentName}
          </span>
        </>
      ),
      itemsSold: item.sales.itemsSold,
      totalSales: (
        <>
          ₹{item.sales.totalSales}
          <br />
          <span style={{ fontSize: 13, color: "#868DA6" }}>
            ₹{Math.round(item.sales.totalSales / item.sales.itemsSold)}/item
          </span>
        </>
      ),
      makingCost: (
        <>
          ₹{item.totalMakingCost}
          <br />
          <span style={{ fontSize: 13, color: "#868DA6" }}>
            ₹{Math.round(item.totalMakingCost / item.sales.itemsSold)}/item
          </span>
        </>
      ),
      costPercent: `${item.marginPercentage.toFixed(2)}%`,
    })),
  };

  return { summaryCards, tableData };
};

import { FaBoxes, FaExclamationTriangle } from "react-icons/fa";

export const stockItemDataFormatter = (apiData) => {
  if (!apiData) {
    return {
      summaryCards: [],
      tableData: { columns: [], rows: [] },
    };
  }

  const summaryCards = [
    {
      id: "totalItems",
      title: "Total Items",
      value: apiData.totalItems ?? 0,
      icon: <FaBoxes color="#fff" size={24} />,
      bgColor: "#F0F7FF",
      iconBg: "#165DFF",
    },
    {
      id: "belowMoqItems",
      title: "Items Below MOQ",
      value: apiData.belowMoqItems ?? 0,
      icon: <FaExclamationTriangle color="#fff" size={24} />,
      bgColor: "#FFF4DB",
      iconBg: "#FFB800",
    },
    {
      id: "zeroStockItems",
      title: "Zero Stock Items",
      value: apiData.zeroStockItems ?? 0,
      icon: <FaExclamationTriangle color="#fff" size={24} />,
      bgColor: "#FEE5EB",
      iconBg: "#ED175B",
    },
  ];

  const tableData = {
    columns: [
      { key: "itemName", label: "ITEM NAME" },
      { key: "category", label: "ITEM CATEGORY" },
      { key: "moq", label: "MOQ" },
      { key: "availableQty", label: "AVAILABLE QUANTITY" },
      { key: "leftOverStockValue", label: "STOCK VALUE" },
    ],
    rows: (apiData.list ?? []).map((row) => ({
      itemName: row.item.alias,
      category: row.item.categoryName,
      moq: row.item.moq,
      availableQty: row.leftOverStockQuantity,
      leftOverStockValue: `₹${row.leftoverStockValue}`,
    })),
  };

  return { summaryCards, tableData };
};






