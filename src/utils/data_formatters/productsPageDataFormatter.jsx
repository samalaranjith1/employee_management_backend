// utils/productSummaryFormatter.js
import { IconBrandSpeedtest, IconCalculator, IconCurrencyRupee, IconPackage, IconShoppingCart } from "@tabler/icons-react";
import {
  FaStore, FaUtensils,
  FaCube,
  FaMoneyBillWave,
  FaCreditCard,
  FaFileInvoice,
  FaChartPie,
  FaShoppingCart,
  FaCalculator,
  FaBox,
  FaRupeeSign,
  FaTags,
  FaReceipt,
  FaDrumstickBite,
  FaCheese,
  FaSeedling,
  FaLeaf,
  FaAppleAlt,
  FaCookie,
  FaPercentage,
} from "react-icons/fa";

const safeValue = (val, prefix = "₹") => {
  if (val === null || val === undefined || val === "" || isNaN(val))
    return "--";
  return prefix ? `${prefix}${val}` : val;
};

//pending as api is returning empty data
export const productSummaryOverViewDataFormatter = (apiData) => {
  if (!apiData || !apiData.summary || !apiData.product) {
    return {
      expense: {
        title: "Expense",
        icon: <div style={{
          background: '#fff7ed', // beige gradient for Figma style
          borderRadius: '12px',
          padding: '8px',
          display: 'inline-block'
        }}>
          <IconCalculator stroke={2} color="#000" size={20} />
        </div>,
        items: [],
        bg: "#FFF6ED",
      },
      payment: {
        title: "Payment",
        icon: <div style={{
          background: '#f0fdf4', // blue gradient similar to Figma
          borderRadius: '16px',
          padding: '12px',
          display: 'inline-block'
        }}>
          <IconCurrencyRupee stroke={2} color="#000" size={24} />
        </div>,
        items: [],
        bg: "#EFFFF2",
      },
      dues: { title: "Dues", icon: <FaReceipt size={18} color="#000" />, items: [], bg: "#FFF0F0" },
      footer: [],
    };
  }

  const { summary, product } = apiData;

  return {
    expense: {
      title: "Expense",
      icon: <div style={{
        background: '#fff7ed', // beige gradient for Figma style
        borderRadius: '8px',
        padding: '2px',
        display: 'inline-block'
      }}>
        <IconCalculator stroke={2} color="#000" size={16} />
      </div>,
      items: [
        {
          label: "Purchase Amount",
          value: safeValue(product.makingCost * summary.itemsSold),
        },
        { label: "Tax Amount", value: safeValue(summary.tax) },
        { label: "Total Amount", value: safeValue(summary.totalMakingCost) },
      ],
      bg: "#FFF7ED",
    },
    payment: {
      title: "Payment",
      icon: <div style={{
        background: '#f0fdf4', // blue gradient similar to Figma
        borderRadius: '4px',
        padding: '2px',
        display: 'inline-block'
      }}>
        <IconCurrencyRupee stroke={2} color="#000" size={16} />
      </div>,
      items: [
        { label: "Payment Amount", value: safeValue(summary.netSales) },
        { label: "Tax Amount", value: safeValue(summary.tax) },
        { label: "Total Amount", value: safeValue(summary.totalSales) },
      ],
      bg: "#f0fdf4",
    },
    dues: {
      title: "Dues",
      icon:
        <div style={{
          background: '#FFF0F0', // blue gradient similar to Figma
          borderRadius: '4px',
          padding: '2px',
          display: 'inline-block'
        }}>
          <FaReceipt size={18} color="#000" padding={'10px'} />
        </div>,

      items: [
        {
          label: "Total Dues",
          value: safeValue(summary.totalSales - summary.netSales),
        },
        {
          label: "This month",
          value: safeValue(
            Math.round((summary.totalSales - summary.netSales) * 0.25)
          ),
        },
        {
          label: "Other",
          value: safeValue(
            Math.round((summary.totalSales - summary.netSales) * 0.75)
          ),
        },
      ],
      bg: "#fef2f2",
    },
    footer: [
      {
        label: "Margin",
        value: product.marginPercentage ? `${product.marginPercentage}%` : "--",
        icon: <div style={{
          background: '#dcfce7', // blue gradient matching Figma style
          borderRadius: '4px',
          padding: '4px',
          display: 'inline-block'
        }}>
          <IconBrandSpeedtest stroke={2} color="#00a63e" size={20} />
        </div>
        ,
        bg: "#EFFFF2",
      },
      {
        label: "Total Sales",
        value: safeValue(summary.totalSales),
        icon: <div style={{
          background: '#ddf8eaff', // blue gradient similar to Figma
          borderRadius: '4px',
          padding: '4px',
          display: 'inline-block'
        }}>
          <IconCurrencyRupee stroke={2} color="#00a63e" size={18} />
        </div>,
        bg: "#EFFFF2",
      },
      {
        label: "Making Cost",
        value: safeValue(summary.totalMakingCost),
        icon: <div style={{
          background: '#ffedd4', // beige gradient for Figma style
          borderRadius: '8px',
          padding: '4px',
          display: 'inline-block'
        }}>
          <IconCalculator stroke={2} color="#f87a40" size={18} />
        </div>,
        bg: "#F3FFF8",
      },
      {
        label: "Orders",
        value: summary.orders ?? "--",
        icon: <div style={{
          background: '#dbeafe', // blue gradient matching Figma style
          borderRadius: '8px',
          padding: '4px',
          display: 'inline-block'
        }}>
          <IconShoppingCart stroke={2} color="#155dfc" size={18} />
        </div>,
        bg: "#F3FFF8",
      },
      {
        label: "Items Sold",
        value: summary.itemsSold ?? "--",
        icon: <div style={{
          background: '#f3e8ff', // vivid green gradient
          borderRadius: '8px',
          padding: '4px',
          display: 'inline-block'
        }}>
          <IconPackage stroke={2} color="#9912fa" size={18} />
        </div>,
        bg: "#F3FFF8",
      },
    ],
  };
};

export const productsTrendAnalysisDataFormatter = (apiData) => {
  const formatTrendData = apiData?.list?.map((item) => ({
    // Use startDate for the X-axis label instead of dt
    date: new Date(item.startDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    totalSales: item.totalSales,
    itemsSold: item.itemsSold,
    totalMakingCost: item.totalMakingCost, // ✅ keep the same key used in graph
  }));

  const formatTableData = apiData.list.map((item) => ({
    date: new Date(item.startDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      weekday: "long",
    }),
    totalSales: {
      value: `₹${item.totalSales}`,
      icon: <FaRupeeSign color="#6366f1" />,
      color: "#6366f1",
    },
    netSales: {
      value: `₹${item.netSales}`,
      icon: <FaReceipt color="#10b981" />,
      color: "#10b981",
    },
    discount: {
      value: `₹${item.discount}`,
      icon: <FaTags color="#f97316" />,
      color: "#f97316",
    },
    tax: {
      value: `₹${item.tax}`,
      icon: <FaReceipt color="#06b6d4" />,
      color: "#06b6d4",
    },
    itemsSold: {
      value: `${item.itemsSold}`,
      icon: <FaBox color="#8b5cf6" />,
      color: "#8b5cf6",
    },
    orders: {
      value: `${item.orders}`,
      icon: <FaShoppingCart color="#ef4444" />,
      color: "#ef4444",
    },
  }));

  return { trendData: formatTrendData, tableData: formatTableData };
};


// export const productsTrendAnalysisDataFormatter = (apiData) => {
//   const formatTrendData = apiData?.list?.map((item) => ({
//     date: new Date(item.dt).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//     }),
//     totalSales: item.totalSales,
//     itemsSold: item.itemsSold,
//     makingCost: item.totalMakingCost,
//   }));
//   const formatTableData = apiData.list.map((item) => ({
//     date: new Date(item.dt).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//       weekday: "long",
//     }),
//     totalSales: {
//       value: `₹${item.totalSales}`,
//       icon: <FaRupeeSign color="#6366f1" />,
//       color: "#6366f1", // Indigo (blueish)
//     },
//     netSales: {
//       value: `₹${item.netSales}`,
//       icon: <FaReceipt color="#10b981" />,
//       color: "#10b981", // Green
//     },
//     discount: {
//       value: `₹${item.discount}`,
//       icon: <FaTags color="#f97316" />,
//       color: "#f97316", // Orange
//     },
//     tax: {
//       value: `₹${item.tax}`,
//       icon: <FaReceipt color="#06b6d4" />,
//       color: "#06b6d4", // Cyan
//     },
//     itemsSold: {
//       value: `${item.itemsSold}`, // ✅ Force string
//       icon: <FaBox color="#8b5cf6" />,
//       color: "#8b5cf6",
//     },
//     orders: {
//       value: `${item.orders}`, // ✅ Same fix here
//       icon: <FaShoppingCart color="#ef4444" />,
//       color: "#ef4444",
//     },
//   }));
//   return { trendData: formatTrendData, tableData: formatTableData };
// };

// utils/dataFormatter.js
export const productsIngredientAnalyticsDataFormatter = (apiData) => {
  if (!apiData || !apiData.list) return { tableData: [], chartData: [], totalCost: 0 };

  let totalCost = 0;

  const tableData = apiData.list.map((ingredient, index) => {
    const {
      item,
      unitQuantity,
      unitPrice,
      ingredientQuantity,
      ingredientPrice,
      totalQuantity,
      totalPrice,
    } = ingredient;

    totalCost += ingredientPrice;

    // Assign icons based on category (example mapping)
    let icon = <FaCookie color="#8884d8" />;
    if (item.categoryName.includes("Chicken")) icon = <FaDrumstickBite color="#FF8042" />;
    else if (item.categoryName.includes("Dairy")) icon = <FaCheese color="#82ca9d" />;
    else if (item.categoryName.includes("Vegetables")) icon = <FaAppleAlt color="#ffc658" />;
    else if (item.categoryName.includes("Grocery")) icon = <FaSeedling color="#00C49F" />;

    return {
      key: index,
      icon,
      name: item.name,
      type: item.itemType,
      storeItem: `${item.itemType} • ${unitQuantity}${item.unit} • ₹${unitPrice}`,
      recipe: `₹${ingredientPrice.toFixed(2)} • ${ingredientQuantity} ${item.unit
        }`,
      total: `₹${totalPrice.toFixed(2)} • ${totalQuantity} ${item.unit}`,
      price: ingredientPrice,
    };
  });

  const chartData = tableData.map((row) => ({
    name: row.name,
    value: row.price,
  }));

  return { tableData, chartData, totalCost };
};

//sales tab
export const salesDataFormatter = (list) => {
  return list.map((item) => {
    const dateObj = new Date(item.dt);
    const weekday = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return {
      date: `${formattedDate}\n${weekday}`,
      totalSales: {
        value: `₹${item.totalSales}`,
        icon: <FaRupeeSign className="text-primary me-1" />,
      },
      netSales: {
        value: `₹${item.netSales}`,
        icon: <FaReceipt className="text-success me-1" />,
      },
      discount: {
        value: `₹${item.discount}`,
        icon: <FaPercentage className="text-warning me-1" />,
      },
      tax: {
        value: `₹${item.tax}`,
        icon: <FaReceipt className="text-info me-1" />,
      },
      itemsSold: {
        value: item.itemsSold,
        icon: <FaBox className="text-secondary me-1" />,
      },
      orders: {
        value: item.orders,
        icon: <FaShoppingCart className="text-danger me-1" />,
      },
    };
  });
};

//ingredients tab
export const productsIngredientsDataFormatter = (ingredient) => {
  const { item, unitPrice, ingredientQuantity, ingredientPrice } = ingredient;

  const rawItemType = item?.itemType || "--";
  const rawIngredient = item?.alias || item?.name || "--";
  const rawItemPrice = unitPrice ?? 0;
  const rawQuantity = ingredientQuantity ?? 0;
  const rawTotalPrice = ingredientPrice ?? 0;

  return {
    // Raw fields for sorting
    itemTypeRaw: rawItemType,
    ingredientRaw: rawIngredient,
    itemPriceRaw: rawItemPrice,
    quantityRaw: rawQuantity,
    totalPriceRaw: rawTotalPrice,

    // Display fields for rendering
    itemType: (
      <span className="d-flex align-items-center text-muted">
        {/* <FaStore className="me-2 text-primary" />  */}
        {rawItemType}
      </span>
    ),
    ingredient: (
      <span className="fw-semibold text-dark">
        {/* <FaUtensils className="me-2 text-success" /> */}
        {rawIngredient}
      </span>
    ),
    itemPrice: <span className="text-dark">₹{rawItemPrice.toFixed(2)}</span>,
    quantity: <span className="text-dark" style={{ backgroundColor: "#eee", padding: '2px 5px', borderRadius: '5px' }}>{rawQuantity}</span>,
    totalPrice: (
      <span className="fw-semibold text-success" style={{ backgroundColor: "#f0fdf4", padding: '5px' }}>
        ₹{rawTotalPrice.toFixed(2)}
      </span>
    ),
  };
};
//cost tab
export const productsCostDataFormatter = (apiData) => {
  if (!apiData) return { summaryCards: [], ingredients: [] };
  const summaryCards = [
    {
      id: "itemsSold",
      label: "Items Sold",
      value: apiData?.itemsSold, // Placeholder (replace with actual if available in API)
      bgColor: "#F3F6FF",
      textColor: "#2A55FF",
      bgIcon:'#DBEAFE',
      icon: <FaShoppingCart size={20} color="#2A55FF" />,
    },
    {
      id: "ingredientsCount",
      label: "Number of Ingredients",
      value: apiData.totalIngredientCount || 0,
      bgColor: "#F2FBF5",
      textColor: "#1AAB4A",
      bgIcon:"#DCFCE7",
      icon: <FaCube size={20} color="#1AAB4A" />,
    },
    {
      id: "totalCost",
      label: "Total Cost of Ingredients",
      value: `₹${apiData?.totalIngredientCost.toFixed(1)}`,
      bgColor: "#FFF7F2",
      textColor: "#E85C0D",
      bgIcon:"#FFEDD4",
      icon: <FaRupeeSign size={20} color="#E85C0D" />,
    },
  ];

  // --- Ingredients Table ---
  const totalCost = apiData.list.reduce(
    (sum, i) => sum + (i.ingredientPrice || 0),
    0
  );

  const ingredients = apiData.list.map((ing) => {
    return {
      name: ing.item.name,
      alias: ing.item.alias,
      recipe: {
        price: `₹${ing.ingredientPrice.toFixed(1)}`,
        qty: `${ing.ingredientQuantity} ${ing.item.unit}`,
      },
      totalCost: {
        price: `₹${(ing.totalPrice).toFixed(1)}`, // sample multiplier for batch
        qty: `${ing.totalQuantity} ${ing.item.unit}`,
      },
      distribution: `${ing?.costPercent}%`,
    };
  });

  return { summaryCards, ingredients };
};

