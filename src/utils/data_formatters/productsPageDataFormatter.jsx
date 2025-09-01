// utils/productSummaryFormatter.js
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

export const productSummaryOverViewDataFormatter = (apiData) => {
  if (!apiData || !apiData.summary || !apiData.product) {
    return {
      expense: {
        title: "Expense",
        icon: <FaFileInvoice />,
        items: [],
        bg: "#FFF6ED",
      },
      payment: {
        title: "Payment",
        icon: <FaMoneyBillWave />,
        items: [],
        bg: "#EFFFF2",
      },
      dues: { title: "Dues", icon: <FaCreditCard />, items: [], bg: "#FFF0F0" },
      footer: [],
    };
  }

  const { summary, product } = apiData;

  return {
    expense: {
      title: "Expense",
      icon: <FaFileInvoice className="me-2 text-dark" />,
      items: [
        {
          label: "Purchase Amount",
          value: safeValue(product.makingCost * summary.itemsSold),
        },
        { label: "Tax Amount", value: safeValue(summary.tax) },
        { label: "Total Amount", value: safeValue(summary.totalMakingCost) },
      ],
      bg: "#FFF6ED",
    },
    payment: {
      title: "Payment",
      icon: <FaMoneyBillWave className="me-2 text-dark" />,
      items: [
        { label: "Payment Amount", value: safeValue(summary.netSales) },
        { label: "Tax Amount", value: safeValue(summary.tax) },
        { label: "Total Amount", value: safeValue(summary.totalSales) },
      ],
      bg: "#EFFFF2",
    },
    dues: {
      title: "Dues",
      icon: <FaCreditCard className="me-2 text-dark" />,
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
      bg: "#FFF0F0",
    },
    footer: [
      {
        label: "Margin",
        value: product.marginPercentage ? `${product.marginPercentage}%` : "--",
        icon: <FaChartPie />,
        bg: "#EFFFF2",
      },
      {
        label: "Total Sales",
        value: safeValue(summary.totalSales),
        icon: <FaMoneyBillWave />,
        bg: "#EFFFF2",
      },
      {
        label: "Making Cost",
        value: safeValue(summary.totalMakingCost),
        icon: <FaCalculator />,
        bg: "#FFF6ED",
      },
      {
        label: "Orders",
        value: summary.orders ?? "--",
        icon: <FaShoppingCart />,
        bg: "#F2F6FF",
      },
      {
        label: "Items Sold",
        value: summary.itemsSold ?? "--",
        icon: <FaBox />,
        bg: "#F7EDFF",
      },
    ],
  };
};

export const productsTrendAnalysisDataFormatter = (apiData) => {
    const formatTrendData =  apiData.list.map((item) => ({
        date: new Date(item.dt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        totalSales: item.totalSales,
        itemsSold: item.itemsSold,
      }));
  const formatTableData = apiData.list.map((item) => ({
    date: new Date(item.dt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      weekday: "long",
    }),
    totalSales: {
      value: `₹${item.totalSales}`,
      icon: <FaRupeeSign color="#6366f1" />,
      color: "#6366f1", // Indigo (blueish)
    },
    netSales: {
      value: `₹${item.netSales}`,
      icon: <FaReceipt color="#10b981" />,
      color: "#10b981", // Green
    },
    discount: {
      value: `₹${item.discount}`,
      icon: <FaTags color="#f97316" />,
      color: "#f97316", // Orange
    },
    tax: {
      value: `₹${item.tax}`,
      icon: <FaReceipt color="#06b6d4" />,
      color: "#06b6d4", // Cyan
    },
    itemsSold: {
      value: item.itemsSold,
      icon: <FaBox color="#8b5cf6" />,
      color: "#8b5cf6", // Violet
    },
    orders: {
      value: item.orders,
      icon: <FaShoppingCart color="#ef4444" />,
      color: "#ef4444", // Red
    },
  }));
  return { trendData:formatTrendData, tableData:formatTableData };
};

// utils/dataFormatter.js
export const productsIngredientAnalyticsDataFormatter = (apiData) => {
  if (!apiData || !apiData.list) return { tableData: [], chartData: [], totalCost: 0 };

  let totalCost = 0;

  const tableData = apiData.list.map((ingredient, index) => {
    const { item, unitQuantity, unitPrice, ingredientQuantity, ingredientPrice } = ingredient;

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
      recipe: `₹${ingredientPrice.toFixed(2)} • ${ingredientQuantity} ${item.unit}`,
      total: `₹${(ingredientPrice * 10).toFixed(2)} • ${ingredientQuantity * 10} ${item.unit}`,
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

  return {
    itemType: (
      <span className="d-flex align-items-center text-muted">
        <FaStore className="me-2 text-primary" /> {item?.itemType || "--"}
      </span>
    ),
    ingredient: (
      <span className="fw-semibold text-dark">
        <FaUtensils className="me-2 text-success" />
        {item?.alias || item?.name || "--"}
      </span>
    ),
    itemPrice: (
      <span className="text-dark">₹{unitPrice?.toFixed(2) || "--"}</span>
    ),
    quantity: (
      <span className="text-dark">
        {ingredientQuantity || 0}
      </span>
    ),
    totalPrice: (
      <span className="fw-semibold text-success">
        ₹{ingredientPrice?.toFixed(2) || "0.00"}
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
      value: 15, // Placeholder (replace with actual if available in API)
      bgColor: "#F3F6FF",
      textColor: "#2A55FF",
      icon: <FaShoppingCart size={20} color="#2A55FF" />,
    },
    {
      id: "ingredientsCount",
      label: "Number of Ingredients",
      value: apiData.list?.length || 0,
      bgColor: "#F2FBF5",
      textColor: "#1AAB4A",
      icon: <FaCube size={20} color="#1AAB4A" />,
    },
    {
      id: "totalCost",
      label: "Total Cost of Ingredients",
      value: `₹${apiData.list
        .reduce((sum, i) => sum + (i.ingredientPrice || 0), 0)
        .toFixed(1)}`,
      bgColor: "#FFF7F2",
      textColor: "#E85C0D",
      icon: <FaRupeeSign size={20} color="#E85C0D" />,
    },
  ];

  // --- Ingredients Table ---
  const totalCost = apiData.list.reduce(
    (sum, i) => sum + (i.ingredientPrice || 0),
    0
  );

  const ingredients = apiData.list.map((ing) => {
    const percentage = totalCost
      ? ((ing.ingredientPrice / totalCost) * 100).toFixed(1)
      : 0;

    return {
      name: ing.item.name,
      alias: ing.item.alias,
      recipe: {
        price: `₹${ing.ingredientPrice.toFixed(1)}`,
        qty: `${ing.ingredientQuantity} ${ing.item.unit}`,
      },
      totalCost: {
        price: `₹${(ing.ingredientPrice * 10).toFixed(1)}`, // sample multiplier for batch
        qty: `${ing.ingredientQuantity * 10} ${ing.item.unit}`,
      },
      distribution: `${percentage}%`,
    };
  });

  return { summaryCards, ingredients };
};

