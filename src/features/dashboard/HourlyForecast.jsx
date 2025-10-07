"use client";

import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

import HourlyForecastGraph from "@/components/common/dashboard/GraphWrapper/HourlyForecastGraph";
import HourlyForecastFilterCard from "@/components/common/FilterComponent/HourlyForecastFilterCard";
import ComponentHeader from "@/components/common/ComponentHeader";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";

import { useProductsAll } from "@/services/product-service";
import { useSalesHourly } from "@/services/sales-service";
import { useDepartmentContext } from "@/contexts/DepartmentContext";
import { FaCampground, FaChartLine, FaCircle, FaGolfBall, FaPaste } from "react-icons/fa";
import { IconCalendar, IconChartLine, IconClipboardData, IconTarget } from "@tabler/icons-react";

// ✅ Utility: format API hourly data into recharts friendly format
const formatHourlyData = (apiData, metric) => {
  if (!apiData?.list) return [];

  return apiData.list.map((item) => ({
    hour: `${item.hr}:00`,
    forecast:
      metric === "Sales"
        ? item.projectedSales?.netSales ?? 0
        : item.projectedSales?.orders ?? 0,
    actual:
      metric === "Sales" ? item.sales?.netSales ?? 0 : item.sales?.orders ?? 0,
  }));
};

// ✅ Formatter for SalesHourly response
const salesHourlyFormatter = (data, selectedMetric) => {
  if (!data) return null;

  return {
    dailyForecast:
      selectedMetric === "Sales"
        ? `₹${data.totalProjectedSales ?? 0}`
        : `${data.totalProjectedOrders ?? 0}`,
    dailyForecastIcon: <div style={{
      background: '#2575fb',
      borderRadius: '16px',
      padding: '12px',
      display: 'inline-block'
    }}>
      <IconChartLine stroke={2} color="#fff" size={24} />
    </div>,
    actualSoFar:
      selectedMetric === "Sales"
        ? `₹${data.totalSales ?? 0}`
        : `${data.totalOrders ?? 0}`,
    actualSoFarIcon: <div style={{
      background: 'linear-gradient(135deg, #37C088 60%, #239971 100%)',
      borderRadius: '16px',
      padding: '12px',
      display: 'inline-block'
    }}>
      <IconClipboardData stroke={2} color="#fff" size={24} />
    </div>,
    remainingTarget:
      selectedMetric === "Sales"
        ? `₹${data.remaningSales ?? 0}`
        : `${data.remaningOrders ?? 0}`,
    remainingTargetIcon: <div style={{
      background: 'linear-gradient(135deg, #924CFE 60%, #BC75FF 100%)',
      borderRadius: '16px',
      padding: '12px',
      display: 'inline-block'
    }}>
      <IconTarget stroke={2} color="#fff" size={24} />
    </div>,
    graphData: formatHourlyData(data, selectedMetric),
  };
};

export default function HourlyForecast() {
  const myScrollRef = useRef(null);
  const { startDate, endDate } = useDepartmentContext();

  const [metrics] = useState(["Sales", "Orders"]);
  const [selectedMetric, setSelectedMetric] = useState("Sales");

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ✅ Fetch products list
  const {
    data: productData,
    isLoading,
    error,
  } = useProductsAll({
    startdt: startDate,
    enddt: endDate,
    outlet: 1,
    userId: 7,
  });

  // ✅ Populate product list & default selection
  useEffect(() => {
    const flatList = productData?.list ? productData.list.flat() : [];
    if (flatList.length > 0) {
      setProducts(flatList);
      setSelectedProduct((prev) => prev || flatList[0]);
    }
  }, [productData]);

  return (
    <Container fluid className="mt-3">
      {/* Header */}
      <ComponentHeader
        title="Hourly Forecast"
        description="Real-time predictions for today's performance"
        isShowArrows={false}
        scrollRef={myScrollRef}
        isExpandable={true}
        text="Today's Forecast →"
        titleIcon={<div style={{
          background: '#4a70ff', // Blue gradient
          borderRadius: '12px',
          padding: '8px',
          display: 'inline-block'
        }}>
          <IconCalendar stroke={2} color="#fff" size={24} />
        </div>}
      />

      {/* Sales Hourly Data for Selected Product */}
      {selectedProduct && (
        <ServiceRenderer
          queryHook={useSalesHourly}
          queryKey={[
            "salesHourly",
            selectedProduct.id,
            { startdt: startDate, enddt: endDate },
          ]}
          queryFn={() =>
            useSalesHourly(selectedProduct.id, {
              startdt: startDate,
              enddt: endDate,
            }).queryFn
          }
          queryArgs={[
            {
              startdt: startDate,
              enddt: endDate,
              outlet: 1,
              userId: 7,
              products: selectedProduct.id,
            },
          ]}
          shimmerCount={1}
          formatter={(data) => salesHourlyFormatter(data, selectedMetric)}
        >
          {(currentData) => (
            <HourlyForecastFilterCard
              products={products.map((p) => p.name)}
              metrics={metrics}
              selectedProduct={selectedProduct?.name || ""}
              selectedMetric={selectedMetric}
              setSelectedMetric={setSelectedMetric}
              setSelectedProduct={(name) => {
                const productObj = products.find((p) => p.name === name);
                setSelectedProduct(productObj);
              }}
              currentData={currentData}
              renderGraph={() =>
                currentData?.graphData?.length > 0 ? (
                  <HourlyForecastGraph
                    currentData={currentData}
                    selectedMetric={selectedMetric}
                  />
                ) : (
                  <div className="text-center p-5 text-secondary">
                    No data available for this selection.
                  </div>
                )
              }
            />
          )}
        </ServiceRenderer>
      )}
    </Container>
  );
}
// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Container } from "react-bootstrap";

// import HourlyForecastGraph from "@/components/common/dashboard/GraphWrapper/HourlyForecastGraph";
// import HourlyForecastFilterCard from "@/components/common/FilterComponent/HourlyForecastFilterCard";
// import ComponentHeader from "@/components/common/ComponentHeader";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";

// import { useProductsAll } from "@/services/product-service";
// import { useSalesHourly } from "@/services/sales-service";
// import { useDepartmentContext } from "@/contexts/DepartmentContext";

// // Utility: format API hourly data into recharts friendly format
// const formatHourlyData = (apiData, metric) => {
//   if (!apiData?.list) return [];
//   return apiData.list.map((item) => ({
//     hour: `${item.hr}:00`,
//     forecast:
//       metric === "Sales"
//         ? item.projectedSales?.netSales ?? 0
//         : item.projectedSales?.orders ?? 0,
//     actual:
//       metric === "Sales" ? item.sales?.netSales ?? 0 : item.sales?.orders ?? 0,
//   }));
// };

// // 🔹 Formatter for SalesHourly response
// const salesHourlyFormatter = (data, selectedMetric) => {
//   if (!data) return null;

//   return {
//     dailyForecast: `₹${data.totalProjectedSales ?? 0}`,
//     actualSoFar: `₹${data.totalSales ?? 0}`,
//     remainingTarget: `₹${data.remaningSales ?? 0}`,
//     graphData: formatHourlyData(data, selectedMetric),
//   };
// };

// export default function HourlyForecast() {
//   const myScrollRef = useRef(null);
//   const { startDate, endDate } = useDepartmentContext();

//   const [metrics] = useState(["Sales", "Orders"]);
//   const [selectedMetric, setSelectedMetric] = useState("Sales");

//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   // ✅ Fetch products normally instead of through ServiceRenderer
//   const {
//     data: productData,
//     isLoading,
//     error,
//   } = useProductsAll({
//     startdt: startDate,
//     enddt: endDate,
//     outlet: 1,
//     userId: 7,
//   });
// useEffect(() => {
//   const flatList = productData?.list ? productData.list.flat() : [];

//   if (flatList.length > 0) {
//     setProducts(flatList);
//     setSelectedProduct((prev) => prev || flatList[0]);
//   }
// }, [productData]);

//   return (
//     <Container fluid className="mt-3">
//       <ComponentHeader
//         title="Hourly Forecast"
//         description="Real-time predictions for today's performance"
//         isShowArrows={false}
//         scrollRef={myScrollRef}
//         isExpandable={true}
//         text="Today's Forecast →"
//       />

//       {/* Step 2️⃣ : Fetch Sales Hourly for Selected Product */}
//       {selectedProduct && (
//         <ServiceRenderer
//           queryHook={useSalesHourly}
//           queryKey={[
//             "salesHourly",
//             selectedProduct.id,
//             { startdt: startDate, enddt: endDate },
//           ]}
//           queryFn={() =>
//             useSalesHourly(selectedProduct.id, {
//               startdt: startDate,
//               enddt: endDate,
//             }).queryFn
//           }
//           queryArgs={[
//             {
//               startdt: startDate,
//               enddt: endDate,
//               outlet: 1,
//               userId: 7,
//               products: selectedProduct.id,
//               // products: selectedProduct.id,
//             },
//           ]}
//           shimmerCount={1}
//           formatter={(data) => salesHourlyFormatter(data, selectedMetric)}
//         >
//           {(currentData) => (
//             <HourlyForecastFilterCard
//               products={products.map((p) => p.name)}
//               metrics={metrics}
//               selectedProduct={selectedProduct?.name || ""}
//               selectedMetric={selectedMetric}
//               setSelectedMetric={setSelectedMetric}
//               setSelectedProduct={(name) => {
//                 const productObj = products.find((p) => p.name === name);
//                 setSelectedProduct(productObj);
//               }}
//               currentData={currentData}
//               renderGraph={() =>
//                 currentData?.graphData?.length > 0 ? (
//                   <HourlyForecastGraph
//                     currentData={currentData}
//                     selectedMetric={selectedMetric}
//                   />
//                 ) : (
//                   <div className="text-center p-5 text-secondary">
//                     No data available for this selection.
//                   </div>
//                 )
//               }
//             />
//           )}
//         </ServiceRenderer>
//       )}
//     </Container>
//   );
// }

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Container } from "react-bootstrap";

// import HourlyForecastGraph from "@/components/common/dashboard/GraphWrapper/HourlyForecastGraph";
// import HourlyForecastFilterCard from "@/components/common/FilterComponent/HourlyForecastFilterCard";
// import ComponentHeader from "@/components/common/ComponentHeader";

// // Utility: format API hourly data into recharts friendly format
// const formatHourlyData = (apiData, metric) => {
//   if (!apiData?.list) return [];

//   return apiData.list.map((item) => ({
//     hour: `${item.hr}:00`,
//     forecast:
//       metric === "Sales"
//         ? item.projectedSales?.netSales ?? 0
//         : item.projectedSales?.orders ?? 0,
//     actual:
//       metric === "Sales" ? item.sales?.netSales ?? 0 : item.sales?.orders ?? 0,
//   }));
// };

// export default function HourlyForecast() {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const [metrics] = useState(["Sales", "Orders"]);
//   const [selectedMetric, setSelectedMetric] = useState("Sales");

//   const [currentData, setCurrentData] = useState({});
//   const myScrollRef = useRef(null);

//   // ✅ Fetch product list on mount
//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const res = await fetch("/api/productsList"); // 🔹 replace with actual API
//         const data = await res.json();

//         if (data.list?.length > 0) {
//           setProducts(data.list);
//           setSelectedProduct(data.list[0]); // pick first product
//         }
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       }
//     }

//     fetchProducts();
//   }, []);

//   // ✅ Fetch hourly forecast whenever product/metric changes
//   useEffect(() => {
//     async function fetchHourlyForecast(product) {
//       if (!product) return;

//       try {
//         const res = await fetch(`/api/hourlyForecast/${product.id}`); // 🔹 replace with actual API
//         const data = await res.json();

//         const formattedGraph = formatHourlyData(data, selectedMetric);

//         setCurrentData({
//           dailyForecast: `₹${data.totalProjectedSales ?? 0}`,
//           actualSoFar: `₹${data.totalSales ?? 0}`,
//           remainingTarget: `₹${data.remaningSales ?? 0}`,
//           graphData: formattedGraph,
//         });
//       } catch (err) {
//         console.error("Error fetching hourly forecast:", err);
//       }
//     }

//     if (selectedProduct) {
//       fetchHourlyForecast(selectedProduct);
//     }
//   }, [selectedProduct, selectedMetric]);

//   const renderGraph = () => {
//     if (!currentData.graphData || currentData.graphData.length === 0) {
//       return (
//         <div className="text-center p-5 text-secondary">
//           No data available for this selection.
//         </div>
//       );
//     }
//     return (
//       <HourlyForecastGraph
//         currentData={currentData}
//         selectedMetric={selectedMetric}
//       />
//     );
//   };

//   return (
//     <Container fluid className="mt-3">
//       {/* Header */}
//       <ComponentHeader
//         title="Hourly Forecast"
//         description="Real-time predictions for today's performance"
//         isShowArrows={false}
//         scrollRef={myScrollRef}
//         isExpandable={true}
//         text="Today's Forecast →"
//       />

//       {/* Main Content */}
//       <HourlyForecastFilterCard
//         products={products.map((p) => p.name)}
//         metrics={metrics}
//         selectedProduct={selectedProduct?.name || ""}
//         selectedMetric={selectedMetric}
//         setSelectedMetric={setSelectedMetric}
//         setSelectedProduct={(name) => {
//           const productObj = products.find((p) => p.name === name);
//           setSelectedProduct(productObj);
//         }}
//         currentData={currentData}
//         renderGraph={renderGraph}
//       />
//     </Container>
//   );
// }

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Container, Row, Col, Card, Dropdown } from "react-bootstrap";
// import { FaClock, FaArrowRight, FaChartLine } from "react-icons/fa";

// import HourlyForecastGraph from "@/components/common/dashboard/GraphWrapper/HourlyForecastGraph";
// import HourlyForecastFilterCard from "@/components/common/FilterComponent/HourlyForecastFilterCard";
// import ComponentHeader from "@/components/common/ComponentHeader";

// // Mock data for products, metrics, and data points
// const mockProductData = {
//   "All Products": {
//     Sales: {
//       dailyForecast: "₹33,110",
//       actualSoFar: "₹17,109",
//       remainingTarget: "₹16,001",
//       graphData: [
//         { hour: "12 AM", forecast: 500, actual: 480 },
//         { hour: "2 AM", forecast: 550, actual: 520 },
//         { hour: "4 AM", forecast: 650, actual: 610 },
//         { hour: "6 AM", forecast: 1000, actual: 950 },
//         { hour: "8 AM", forecast: 1500, actual: 1450 },
//         { hour: "10 AM", forecast: 2200, actual: 2100 },
//         { hour: "12 PM", forecast: 2500, actual: 2400 },
//         { hour: "2 PM", forecast: 2800, actual: 2700 },
//         { hour: "4 PM", forecast: 2400, actual: 2350 },
//         { hour: "6 PM", forecast: 1800, actual: 1750 },
//         { hour: "8 PM", forecast: 2000, actual: 2100 },
//         { hour: "10 PM", forecast: 2900, actual: 3200 },
//         { hour: "11 PM", forecast: 2200, actual: 2600 },
//       ],
//     },
//     Orders: {
//       dailyForecast: "1,250",
//       actualSoFar: "780",
//       remainingTarget: "470",
//       graphData: [
//         { hour: "12 AM", forecast: 20, actual: 18 },
//         { hour: "2 AM", forecast: 25, actual: 23 },
//         { hour: "4 AM", forecast: 30, actual: 28 },
//         { hour: "6 AM", forecast: 50, actual: 48 },
//         { hour: "8 AM", forecast: 70, actual: 65 },
//         { hour: "10 AM", forecast: 90, actual: 88 },
//         { hour: "12 PM", forecast: 100, actual: 95 },
//         { hour: "2 PM", forecast: 110, actual: 105 },
//         { hour: "4 PM", forecast: 95, actual: 92 },
//         { hour: "6 PM", forecast: 75, actual: 70 },
//         { hour: "8 PM", forecast: 80, actual: 85 },
//         { hour: "10 PM", forecast: 120, actual: 130 },
//         { hour: "11 PM", forecast: 100, actual: 110 },
//       ],
//     },
//   },
//   "Product A": {
//     Sales: {
//       dailyForecast: "₹15,000",
//       actualSoFar: "₹8,500",
//       remainingTarget: "₹6,500",
//       graphData: [
//         { hour: "12 AM", forecast: 200, actual: 190 },
//         { hour: "2 AM", forecast: 220, actual: 210 },
//         { hour: "4 AM", forecast: 300, actual: 280 },
//         { hour: "6 AM", forecast: 500, actual: 470 },
//         { hour: "8 AM", forecast: 800, actual: 750 },
//         { hour: "10 AM", forecast: 1100, actual: 1050 },
//         { hour: "12 PM", forecast: 1250, actual: 1200 },
//         { hour: "2 PM", forecast: 1400, actual: 1350 },
//         { hour: "4 PM", forecast: 1100, actual: 1080 },
//         { hour: "6 PM", forecast: 850, actual: 820 },
//         { hour: "8 PM", forecast: 900, actual: 950 },
//         { hour: "10 PM", forecast: 1300, actual: 1500 },
//         { hour: "11 PM", forecast: 1100, actual: 1250 },
//       ],
//     },
//   },
// };

// const products = Object.keys(mockProductData);
// const metrics = ["Sales", "Orders"]; // Hardcoded for simplicity, could be dynamic

// export default function HourlyForecast() {
//   const [selectedProduct, setSelectedProduct] = useState("All Products");
//   const [selectedMetric, setSelectedMetric] = useState("Sales");
//   const [currentData, setCurrentData] = useState({});

//   useEffect(() => {
//     const newData = mockProductData[selectedProduct]?.[selectedMetric];
//     setCurrentData(newData || {});
//   }, [selectedProduct, selectedMetric]);

//   const renderGraph = () => {
//     if (!currentData.graphData || currentData.graphData.length === 0) {
//       return (
//         <div className="text-center p-5 text-secondary">
//           No data available for this selection.
//         </div>
//       );
//     }

//     return (
//       <HourlyForecastGraph
//         currentData={currentData}
//         selectedMetric={selectedMetric}
//       />
//     );
//   };
// const myScrollRef = useRef(null);

//   return (
//     <Container fluid className="mt-3">
//       {/* Header */}
//       <ComponentHeader
//         title={"Hourly Forecast"}
//         description={"Real-time predictions for today's performance"}
//         isShowArrows={false}
//         scrollRef={myScrollRef}
//         isExpandable={true}
//         text={`Today's Forecast →`}
//       />
//       {/* Main Content */}
//       <HourlyForecastFilterCard
//         products={products}
//         metrics={metrics}
//         selectedProduct={selectedProduct}
//         selectedMetric={selectedMetric}
//         setSelectedMetric={setSelectedMetric}
//         setSelectedProduct={setSelectedProduct}
//         currentData={currentData}
//         renderGraph={renderGraph}
//       />
//     </Container>
//   );
// }
