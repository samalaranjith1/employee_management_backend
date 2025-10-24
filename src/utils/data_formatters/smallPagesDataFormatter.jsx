import {
  FaRupeeSign,
  FaChartLine,
  FaTag,
  FaChartBar,
  FaPizzaSlice,
  FaStackExchange,
  FaRegChartBar,
  FaBox,
  FaBoxOpen,
  FaCube,
  FaCubes,
  FaCut,
  FaBoxTissue,
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
      icon: (
        <div
          style={{
            background: "#2473f9", // blue gradient similar to Figma
            borderRadius: "16px",
            padding: "12px",
            display: "inline-block",
          }}
        >
          <IconChartLine stroke={2} color="#fff" size={28} />
        </div>
      ),
      bgColor: "#fff",
      iconBg: "#165DFF",
    },
    {
      id: "discount",
      title: "Discount",
      value: `₹${apiData.discount ?? 0}`,
      icon: <FaTag color="#fff" size={24} />,
      bgColor: "#fff",
      iconBg: "#8000FF",
    },
    {
      id: "totalSales",
      title: "Total Sales",
      value: `₹${apiData.totalSales ?? 0}`,
      icon: (
        <div
          style={{
            background: "#229d64", // blue gradient similar to Figma
            borderRadius: "16px",
            padding: "12px",
            display: "inline-block",
          }}
        >
          <IconCurrencyRupee stroke={2} color="#fff" size={28} />
        </div>
      ),
      bgColor: "#fff",
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
    rows:
      apiData.list?.map((item) => ({
        date: new Date(item.dt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          weekday: "short",
        }),
        //departmentName price
        product: item.product?.name,
        // [item.product?.name ?? "-",
        // (
        //   <span style={{ display: "flex", flexDirection: "column" }}>
        //     <span>
        //        {item.product?.departmentName}. ₹{item.product?.price}
        //     </span>
        //   </span>
        // ),],
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
      icon: (
        <div
          style={{
            background: "#229d64", // blue gradient similar to Figma
            borderRadius: "16px",
            padding: "12px",
            display: "inline-block",
          }}
        >
          <IconCurrencyRupee stroke={2} color="#fff" size={28} />
        </div>
      ),
      title: "Total Consumption",
      value: `₹${apiData.totalPrice?.toLocaleString() ?? 0}`,
      bgColor: "#fff",
      iconBg: "#21A365",
    },
    {
      id: "totalItems",
      icon: (
        <div
          style={{
            background: "#1e68ec",
            borderRadius: "16px",
            padding: "12px",
            display: "inline-block",
          }}
        >
          <IconPackage stroke={2} color="#fff" size={28} />
        </div>
      ),

      title: "Total Items",
      value: apiData.totalItems ?? 0,
      bgColor: "#fff",
      iconBg: "#2471EB",
    },
    // {
    //   id: "totalQty",
    //   title: "Total Quantity",
    //   value: apiData.totalQuantity ?? 0,
    //   bgColor: "#FFF8E6",
    //   iconBg: "#F28118",
    // },
    // {
    //   id: "departments",
    //   title: "Departments",
    //   value: apiData.totalDepartments ?? 0,
    //   bgColor: "#FCEEFE",
    //   iconBg: "#9B51E0",
    // },
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
      icon: (
        <div
          style={{
            background: "#229d64", // blue gradient similar to Figma
            borderRadius: "16px",
            padding: "12px",
            display: "inline-block",
          }}
        >
          <IconCurrencyRupee stroke={2} color="#fff" size={28} />
        </div>
      ),
      bgColor: "#fff",
      iconBg: "#21A365",
    },
    {
      id: "totalItems",
      title: "Total Items",
      value: apiData.totalItems ?? 0,
      icon: (
        <div
          style={{
            background: "#1e68ec",
            borderRadius: "16px",
            padding: "12px",
            display: "inline-block",
          }}
        >
          <IconPackage stroke={2} color="#fff" size={28} />
        </div>
      ),
      bgColor: "#fff",
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
            {row.item?.categoryName} · {row.item?.unitQuantity} {row.item?.unit}{" "}
            · ₹{row.unitPrice}
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
      id: "totalPrice",
      title: "Total Purchases",
      value: `₹${apiData.totalPrice ?? 0}`,
      // subtitle: "Overall spend",
      icon: (
        <div
          style={{
            background: "#229d64", // blue gradient similar to Figma
            borderRadius: "16px",
            padding: "12px",
            display: "inline-block",
          }}
        >
          <IconCurrencyRupee stroke={2} color="#fff" size={28} />
        </div>
      ),
      bgColor: "#fff",
      iconBg: "#16A34A",
    },
    {
      id: "totalItems",
      title: "Total Items",
      value: apiData.totalItems ?? 0,
      // subtitle: "Units across suppliers",
      icon: (
        <div
          style={{
            background: "#1e68ec",
            borderRadius: "16px",
            padding: "12px",
            display: "inline-block",
          }}
        >
          <IconPackage stroke={2} color="#fff" size={28} />
        </div>
      ),
      bgColor: "#fff",
      iconBg: "#FF5722",
    },
  ];

  const tableData = {
    columns: [
      { key: "date", label: "DATE" },
      { key: "supplier", label: "SUPPLIER" },
      { key: "item", label: "ITEM DETAILS" },
      { key: "quantity", label: "QUANTITY" },
      // { key: "itemPrice", label: "UNIT PRICE" },
      { key: "totalPrice", label: "TOTAL PRICE" },
    ],
    rows:
      apiData.list?.map((row) => ({
        item: (
          <>
            {row.item?.name}
            <br />
            <span style={{ fontSize: 13, color: "#868DA6" }}>
              {row.item?.categoryName} · {row.item?.unitQuantity}{" "}
              {row.item?.unit} · ₹{row.item?.unitPrice}
            </span>
          </>
        ),
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
      id: "itemsWithPriceChange",
      icon: (
        <div
          style={{
            background: "#226ff4",
            borderRadius: "16px",
            padding: "12px",
            display: "inline-block",
          }}
        >
          <IconChartBar stroke={2} color="#fff" size={28} />
        </div>
      ),
      title: "Items with Price Change",
      value: (
        <div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: 1.2,
              marginTop: "2px",
            }}
          >
            {apiData.list.length ?? 0} out of {apiData.totalItemCount ?? 0}
          </div>

          <div
            style={{
              color: "#2566e5",
              fontSize: "12px",
              fontWeight: 400,
              marginTop: "2px",
            }}
          >
            ₹{apiData.netAmount ?? 0}{" "}
            <span style={{ fontSize: "12px" }}>Monthly</span>
          </div>
        </div>
      ),
      bgColor: "#fff",
      iconBg: "#2471EB",
    },
    {
      id: "priceUp",
      icon: (
        <div
          style={{
            background: "#f25207",
            borderRadius: "16px",
            padding: "12px",
            display: "inline-block",
          }}
        >
          <IconTrendingUp stroke={2} color="#fff" size={28} />
        </div>
      ),
      title: "Items with Price Increase",
      value: (
        <div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: 1.2,
              marginTop: "2px",
            }}
          >
            {apiData.priceUpItemCount ?? 0}
          </div>

          <div
            style={{
              color: "#2566e5",
              fontSize: "12px",
              fontWeight: 400,
              marginTop: "2px",
            }}
          >
            ₹{apiData.priceUpAmount ?? 0}{" "}
            <span style={{ fontSize: "12px" }}>Monthly</span>
          </div>
        </div>
      )
      ,
      bgColor: "#fff",
      iconBg: "#FF7800",
    },
    {
      id: "priceDown",
      icon: (
        <div
          style={{
            background: "#2fba72",
            borderRadius: "16px",
            padding: "12px",
            display: "inline-block",
          }}
        >
          <IconTrendingDown stroke={2} color="#fff" size={28} />
        </div>
      ),
      title: "Items with Price Decrease",
      value: apiData.priceDownItemCount ?? 0,
      value: (
        <div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: 1.2,
              marginTop: "2px",
            }}
          >
            {apiData.priceDownItemCount ?? 0}
          </div>

          <div
            style={{
              color: "#2566e5",
              fontSize: "12px",
              fontWeight: 400,
              marginTop: "2px",
            }}
          >
            ₹{apiData.priceDownItemAmount ?? 0}{" "}
            <span style={{ fontSize: "12px" }}>Monthly</span>
          </div>
        </div>
      )
      ,
      bgColor: "#fff",
      iconBg: "#21A365",
    },
  ];

  // ✅ Table Data
  const tableData = {
    columns: [
      { key: "itemName", label: "ITEM" },
      // { key: "category", label: "CATEGORY" },
      // { key: "oldPrice", label: "OLD PRICE" },
      // { key: "newPrice", label: "NEW PRICE" },
      { key: "priceChanges", label: "PRICE CHANGES" },
      { key: "dateOfChange", label: "DATE OF CHANGE" },
      { key: "priceDiffPercentage", label: "% DIFFERENCE" },
      { key: "projectedMonthlyCostDiff", label: "MONTHLY IMPACT" },
    ],

    rows: apiData.list.map((row) => ({
      itemName: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>{row.item?.name}</span>
          <span>
            {row.item?.categoryName}. {row.item?.unitQuantity} {row.item?.unit}.{" "}
            {row.item?.oldPrice}
          </span>
        </div>
      ),
      priceChanges: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>
            ₹{row.oldPrice} → ₹{row.newPrice}
          </span>
          <span
            style={{ color: row.oldPrice - row.newPrice > 0 ? "green" : "red" }}
          >
            {" "}
            ₹{(row.newPrice - row.oldPrice).toFixed(1)}
          </span>
        </div>
      ),
      dateOfChange: `${row.newPriceStartDate}`,
      priceDiffPercentage: (
        <span
          style={{ color: row.oldPrice - row.newPrice > 0 ? "green" : "red" }}
        >
          {row.priceDiffPercentage}%
        </span>
      ),
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
          <div>
            <div
              style={{
                color: "#00A650",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "18px",
                marginBottom: "2px",
              }}
            >
              High Margin
            </div>
            <div
              style={{
                color: "#1A1A1A",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "24px",
              }}
            >
              Profitable Products
            </div>
          </div>

          <div
            style={{
              background: "#02BA71",
              borderRadius: "12px",
              padding: "10px",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "+60px",
            }}
          >
            <IconTrendingUp stroke={2} color="#fff" size={24} />
          </div>
        </div>
      ),
      value: (
        <div
          style={{
            marginTop: "16px",
            borderTop: "1px solid rgba(0, 0, 0, 0.1)",
            paddingTop: "12px",
            fontSize: "14px",
            color: "#1A1A1A",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: "6px" }}>
            Products{" "}
            <span style={{ fontWeight: 400, float: "right" }}>
              {apiData.profitableProducts?.products ?? 0}
            </span>
          </div>

          <div style={{ fontWeight: 600, marginBottom: "6px" }}>
            Total Sales{" "}
            <span style={{ fontWeight: 400, float: "right" }}>
              ₹{apiData.profitableProducts?.sales ?? 0}
            </span>
          </div>

          <div style={{ fontWeight: 600, color: "#00A650" }}>
            Shares{" "}
            <span style={{ fontWeight: 600, float: "right", color: "#00A650" }}>
              {apiData.profitableProducts?.share ?? 0}%
            </span>
          </div>
        </div>
      ),
      // icon: (
      //   <div
      //     style={{
      //       background: "#02ba71",
      //       borderRadius: "16px",
      //       padding: "12px",
      //       display: "inline-block",
      //     }}
      //   >
      //     <IconTrendingUp stroke={2} color="#fff" size={28} />
      //   </div>
      // ),
      bgColor: "linear-gradient(135deg, #EAFEF4, #E6FFF2)",
      // iconBg: "#00A650",
    },
    {
      id: "mediumMargin",
      title: (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
          <div>
            <div
              style={{
                color: "#DF9C0E",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "18px",
                marginBottom: "2px",
              }}
            >
              Medium Margin
            </div>
            <div
              style={{
                color: "#1A1A1A",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "24px",
              }}
            >
              Moderate Products
            </div>
          </div>

          <div
            style={{
              background: "#DF9C0E",
              borderRadius: "12px",
              padding: "10px",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "+60px",
            }}
          >
            <IconTrendingUp stroke={2} color="#fff" size={24} />
          </div>
        </div>
      ),

      value: (
        <div
          style={{
            marginTop: "16px",
            borderTop: "1px solid rgba(0, 0, 0, 0.1)",
            paddingTop: "12px",
            fontSize: "14px",
            color: "#1A1A1A",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: "6px" }}>
            Products{" "}
            <span style={{ fontWeight: 400, float: "right" }}>
              {apiData.moderateProducts?.products ?? 0}
            </span>
          </div>

          <div style={{ fontWeight: 600, marginBottom: "6px" }}>
            Total Sales{" "}
            <span style={{ fontWeight: 400, float: "right" }}>
              ₹{apiData.moderateProducts?.sales ?? 0}
            </span>
          </div>

          <div style={{ fontWeight: 600, color: "#DF9C0E" }}>
            Shares{" "}
            <span style={{ fontWeight: 600, float: "right", color: "#DF9C0E" }}>
              {apiData.moderateProducts?.share ?? 0}%
            </span>
          </div>
        </div>
      ),
      // icon: (
      //   <div
      //     style={{
      //       background: "#df9c0e",
      //       borderRadius: "16px",
      //       padding: "12px",
      //       display: "inline-block",
      //     }}
      //   >
      //     <IconTrendingUp stroke={2} color="#fff" size={28} />
      //   </div>
      // ),
      bgColor: "linear-gradient(135deg, #FFFBEA, #FEFCE9)",
      // iconBg: "#00A650",
    },
    {
      id: "lowMargin",

      title: (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
          <div>
            <div
              style={{
                color: "#EE2840", // red accent
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "18px",
                marginBottom: "2px",
              }}
            >
              Low Margin
            </div>
            <div
              style={{
                color: "#1A1A1A",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "24px",
              }}
            >
              Low Making Products
            </div>
          </div>

          <div
            style={{
              background: "#EE2840",
              borderRadius: "12px",
              padding: "12px 12px",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "+60px",
            }}
          >
            <IconTrendingDown stroke={2} color="#fff" size={20} />
          </div>
        </div>
      ),

      value: (
        <div
          style={{
            marginTop: "16px",
            borderTop: "1px solid rgba(0, 0, 0, 0.1)",
            paddingTop: "12px",
            fontSize: "14px",
            color: "#1A1A1A",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: "6px" }}>
            Products{" "}
            <span style={{ fontWeight: 400, float: "right" }}>
              {apiData.lossMakingProducts?.products ?? 0}
            </span>
          </div>

          <div style={{ fontWeight: 600, marginBottom: "6px" }}>
            Total Sales{" "}
            <span style={{ fontWeight: 400, float: "right" }}>
              ₹{apiData.lossMakingProducts?.sales ?? 0}
            </span>
          </div>

          <div style={{ fontWeight: 600, color: "#EE2840" }}>
            Shares{" "}
            <span style={{ fontWeight: 600, float: "right", color: "#EE2840" }}>
              {apiData.lossMakingProducts?.share ?? 0}%
            </span>
          </div>
        </div>
      ),

      // icon: (
      //   <div
      //     style={{
      //       background: "#ee2840",
      //       borderRadius: "16px",
      //       padding: "12px",
      //       display: "inline-block",
      //     }}
      //   >
      //     <IconTrendingDown stroke={2} color="#fff" size={28} />
      //   </div>
      // ),
      bgColor: "linear-gradient(135deg, #FEF2F2, #FEF2F3)",
      // iconBg: "#00A650",
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
            {item.product.departmentName}. ₹{item.product.price}
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
import {
  IconBarbell,
  IconChartBar,
  IconChartLine,
  IconCheckbox,
  IconCurrencyRupee,
  IconGraph,
  IconInfoTriangle,
  IconPackage,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";

export const stockItemDataFormatter = (apiData) => {
  if (!apiData) {
    return {
      summaryCards: [],
      tableData: { columns: [], rows: [] },
    };
  }

  const summaryCards = [
    {
      id: "currentStockValue",
      title: "Current Stock Value",
      icon: (
        <div
          style={{
            background: "#1e68ec",
            borderRadius: "16px",
            padding: "12px",
            display: "inline-block",
          }}
        >
          <IconPackage stroke={2} color="#fff" size={28} />
        </div>
      ),
      value: (
        <div>
          <div>₹{apiData.totalItems}</div>
          <small
            style={{ color: "blue", fontSize: "16px", fontWeight: "normal" }}
          >
            Total inventory worth
          </small>
        </div>
      ),
      bgColor: "#ffffff",
      iconBg: "#165DFF",
    },
    {
      id: "zeroStockItems",
      title: "Out of Stock Items",
      value: (
        <div>
          <div>₹{apiData.zeroStockItems}</div>
          <small
            style={{
              color: "#e82754ff",
              fontSize: "16px",
              fontWeight: "normal",
            }}
          >
            Items requiring immediate
          </small>
        </div>
      ),
      icon: (
        <div
          style={{
            background: "#e9490c",
            borderRadius: "16px",
            padding: "12px",
            display: "inline-block",
          }}
        >
          <IconInfoTriangle stroke={2} color="#fff" size={28} />
        </div>
      ),
      bgColor: "#ffffff",
      iconBg: "#ED175B",
    },
    {
      id: "belowMoqItems",
      title: "Critical Items",
      value: (
        <div>
          <div>₹{apiData.belowMoqItems}</div>
          <small
            style={{ color: "blue", fontSize: "16px", fontWeight: "normal" }}
          >
            Items at critically low levels
          </small>
        </div>
      ),
      icon: (
        <div
          style={{
            background: "#d98e31",
            borderRadius: "16px",
            padding: "12px",
            display: "inline-block",
          }}
        >
          <IconCheckbox stroke={2} color="#fff" size={28} />
        </div>
      ),
      bgColor: "#ffffff",
      iconBg: "#FFB800",
    },
  ];

  const tableData = {
    columns: [
      { key: "itemName", label: "ITEM DETAILS" },
      { key: "moq", label: "MOQ" },
      { key: "currentStock", label: "CURRENT STOCK" },
      { key: "runway", label: "RUNWAY" },
      { key: "latestClosingStock", label: "LATEST CLOSING STOCK" },
      { key: "status", label: "STATUS" },
    ],
    rows: (apiData.list ?? []).map((row) => ({
      itemName: (
        <div>
          <div>{row.item.name}</div>
          <div style={{ color: "gray", fontWeight: "normal" }}>
            {row.item.categoryName}.{row.item.unitQuantity} {row.item.unit}. ₹
            {row.item.unitPrice}
          </div>
        </div>
      ),
      currentStock: (
        <div>
          <div>
            {row.leftOverStockQuantity} {row.item.unit}
          </div>
          <div style={{ color: "gray", fontWeight: "normal" }}>
            ₹{row.leftoverStockValue}
          </div>
        </div>
      ),
      runway: (
        <span
          style={{ color: "red", fontWeight: "bold" }}
        >{`${row.runwayDays} Days`}</span>
      ),
      moq: `${row.item.moq} ${row.item.unit}`,
      latestClosingStock: (
        <div>
          <div>
            {row.leftOverStockQuantity} {row.item.unit}
          </div>
          <div>{row.latestPurchaseClosingDate}</div>
        </div>
      ),
      status: (
        <div>
          <span
            style={{
              backgroundColor: "rgb(0,0,200)",
              color: "white",
              padding: "5px",
              borderRadius: "15px",
            }}
          >
            Analyse
          </span>
          <span>{row.statusText || "-"}</span>
        </div>
      ),
    })),
  };

  return { summaryCards, tableData };
};
