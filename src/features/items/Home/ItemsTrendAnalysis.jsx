"use client";

import React, { useState, useEffect } from "react";
import {
  useItemSummaryDaily,
  useItemSummarySameDay,
  useItemSummaryWeekly,
  useItemSummaryMonthly,
} from "@/services/item-service";
import { trendAnalysisDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
import { useItemsContext } from "@/contexts/ItemsContext";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";

import { subDays, subWeeks, subMonths, format } from "date-fns";
import ItemsTrendAnalysisGraph from "@/components/common/items/GraphWrapper/ItemsTrendAnalysisGraph";
import ItemsTrendAnalysisTable from "@/components/common/items/TableSort/ItemsTrendAnalysisTable";
import { ButtonGroup, Col, Row, ToggleButton } from "react-bootstrap";
import { IconArrowsMaximize, IconTrendingUp } from "@tabler/icons-react";

export default function ItemsTrendAnalysis() {
  const { startDate, endDate, isMobile } = useItemsContext();
  const [filter, setFilter] = useState("daily");
  const [startDateCS, setStartDateCS] = useState("");
  const [endDateCS, setEndDateCS] = useState("");
  const tabs = ["Daily", "Same Days", "Weekly", "Monthly"];

  // 🔹 Choose hook dynamically
  const getHook = (view) => {
    switch (view) {
      case "daily":
        return useItemSummaryDaily;
      case "samedays":
        return useItemSummarySameDay;
      case "weekly":
        return useItemSummaryWeekly;
      case "monthly":
        return useItemSummaryMonthly;
      default:
        return useItemSummaryDaily;
    }
  };
  const SelectedHook = getHook(filter);

  // 🔹 Compute date range dynamically
  const setDateRange = (view) => {
    const today = new Date();
    let start;
    switch (view) {
      case "daily":
        start = subDays(today, 7);
        break;
      case "weekly":
        start = subWeeks(today, 5);
        break;
      case "monthly":
        start = subMonths(today, 5);
        break;
      case "samedays":
        start = subWeeks(today, 5);
        break;
      default:
        start = today;
    }
    setStartDateCS(format(start, "yyyy-MM-dd"));
    setEndDateCS(format(today, "yyyy-MM-dd"));
  };

  useEffect(() => {
    setDateRange(filter);
  }, [filter]);

  return (
    <div className="p-1 mt-0">
      <Row
        className="align-items-center mb-3 p-2"
        style={{
          backgroundColor: "rgb(243,246,255)",
        }}
      >
        <Col xs="auto">
          <div style={{
            background: 'linear-gradient(135deg, #924CFE 60%, #BC75FF 100%)', // bold purple
            borderRadius: '16px',
            padding: '12px',
            display: 'inline-block'
          }}>
            <IconTrendingUp stroke={2} color="#fff" size={24} />
          </div>
        </Col>
        <Col>
          <h4 className="fw-bold mb-0" style={{ color: "#111" }}>
            Trend Analysis
          </h4>
          {/* <small style={{ color: "#6b7280" }}>
              Sales, consumption, and inventory trends over time
            </small> */}
        </Col>
        {!isMobile && <Col xs="auto">
          <ButtonGroup
            style={{
              backgroundColor: "#e4e4e7",
              borderRadius: 20,
              userSelect: "none",
            }}
          >
            {tabs.map((label) => {
              const value = label.toLowerCase().replace(/\s+/g, "");
              const isChecked = filter === value;

              return (
                <ToggleButton
                  key={value}
                  id={`toggle-${value}`}
                  type="radio"
                  name="trend-filter" // <-- Important: same name for all radios
                  variant="light"
                  value={value}
                  checked={isChecked}
                  onChange={(e) => setFilter(e.currentTarget.value)}
                  className="rounded-pill"
                  style={{
                    fontSize: 13,
                    backgroundColor: isChecked ? "#ffffff" : "transparent",
                    color: isChecked ? "#FF5B22" : "#6C757D",
                    border: isChecked
                      ? "1px solid #dee2e6"
                      : "1px solid #dee2e6",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  {label}
                </ToggleButton>
              );
            })}
          </ButtonGroup>
        </Col>}
        <Col xs="auto">
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#999",
              fontSize: 18,
              padding: 0,
            }}
            title="Expand"
          >
            <IconArrowsMaximize />
          </button>
        </Col>
         {isMobile &&
        <div style={{ display: "flex", justifyContent: "center"}}>
          <ButtonGroup
            style={{
              backgroundColor: "#e4e4e7",
              borderRadius: 20,
              userSelect: "none",
            }}
          >
            {tabs.map((label) => {
              const value = label.toLowerCase().replace(/\s+/g, "");
              const isChecked = filter === value;

              return (
                <ToggleButton
                  key={value}
                  id={`toggle-${value}`}
                  type="radio"
                  name="trend-filter" // <-- Important: same name for all radios
                  variant="light"
                  value={value}
                  checked={isChecked}
                  onChange={(e) => setFilter(e.currentTarget.value)}
                  className="rounded-pill"
                  style={{
                    fontSize: 13,
                    backgroundColor: isChecked ? "#ffffff" : "transparent",
                    color: isChecked ? "#FF5B22" : "#6C757D",
                    border: isChecked
                      ? "1px solid #dee2e6"
                      : "1px solid #dee2e6",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  {label}
                </ToggleButton>
              );
            })}
          </ButtonGroup>
        </div>}
      </Row>
     

      <ServiceRenderer
        queryHook={SelectedHook}
        queryKey={["itemsTrendAnalysis", filter, startDate, endDate]}
        queryArgs={[75, { startdt: startDate, enddt: endDate, outlet: 1 }]}
        formatter={trendAnalysisDataFormatter}
        shimmerCount={2}
      >
        {(data) => (
          <>
            <ItemsTrendAnalysisGraph
              chartData={data?.chartData}
              filter={filter}
              setFilter={setFilter}
            />
            <ItemsTrendAnalysisTable
              tableData={data?.tableData}
              filter={filter}
              setFilter={setFilter}
            />
          </>
        )}
      </ServiceRenderer>
    </div>
  );
}
// "use client";

// import React, { useMemo } from "react";
// import {
//   Card,
//   Row,
//   Col,
//   ToggleButtonGroup,
//   ToggleButton,
// } from "react-bootstrap";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import { trendAnalysisDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
// import { useItemSummaryDaily } from "@/services/item-service";
// import { useItemsContext } from "@/contexts/ItemsContext";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";

// export default function ItemsTrendAnalysis() {
//   const { startDate, endDate } = useItemsContext();

//   return (
//     <ServiceRenderer
//       queryHook={useItemSummaryDaily}
//       queryKey={["itemSummaryDaily", { startdt: startDate, enddt: endDate }]}
//       queryFn={() =>
//         useItemSummaryDaily({ startdt: startDate, enddt: endDate }).queryFn
//       }
//       queryArgs={[75,{ startdt: startDate, enddt: endDate }]}
//       formatter={trendAnalysisDataFormatter}
//       shimmerCount={1}
//     >
//       {(chartData) => (
//         <Card
//           style={{
//             borderRadius: "16px",
//             padding: "20px",
//             background: "#fff",
//             boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
//           }}
//         >
//           <Row className="align-items-center mb-3">
//             <Col>
//               <h5 style={{ fontWeight: "600", color: "#1E1E1E", margin: 0 }}>
//                 Trend Analysis
//               </h5>
//               <p style={{ color: "#6B7280", fontSize: "14px", margin: 0 }}>
//                 Sales, consumption, and inventory trends over time
//               </p>
//             </Col>
//             <Col xs="auto">
//               <ToggleButtonGroup
//                 type="radio"
//                 name="timeframe"
//                 defaultValue="daily"
//               >
//                 <ToggleButton
//                   id="daily"
//                   value="daily"
//                   variant="light"
//                   style={{ borderRadius: "20px", padding: "5px 15px" }}
//                 >
//                   Daily
//                 </ToggleButton>
//                 <ToggleButton
//                   id="sameDays"
//                   value="sameDays"
//                   variant="light"
//                   style={{ borderRadius: "20px", padding: "5px 15px" }}
//                 >
//                   Same Days
//                 </ToggleButton>
//                 <ToggleButton
//                   id="weekly"
//                   value="weekly"
//                   variant="light"
//                   style={{ borderRadius: "20px", padding: "5px 15px" }}
//                 >
//                   Weekly
//                 </ToggleButton>
//                 <ToggleButton
//                   id="monthly"
//                   value="monthly"
//                   variant="light"
//                   style={{ borderRadius: "20px", padding: "5px 15px" }}
//                 >
//                   Monthly
//                 </ToggleButton>
//               </ToggleButtonGroup>
//             </Col>
//           </Row>

//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//               <XAxis dataKey="date" stroke="#6B7280" />
//               <YAxis stroke="#6B7280" />
//               <Tooltip />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="opening"
//                 stroke="#3B82F6"
//                 strokeWidth={2}
//                 dot={false}
//                 name="Opening"
//               />
//               <Line
//                 type="monotone"
//                 dataKey="consumption"
//                 stroke="#F97316"
//                 strokeWidth={2}
//                 dot={false}
//                 name="Consumption"
//               />
//               <Line
//                 type="monotone"
//                 dataKey="closing"
//                 stroke="#10B981"
//                 strokeWidth={2}
//                 dot={false}
//                 name="Closing"
//               />
//               <Line
//                 type="monotone"
//                 dataKey="consumptionValue"
//                 stroke="#8B5CF6"
//                 strokeWidth={2}
//                 dot={false}
//                 name="Consumption Value"
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </Card>
//       )}
//     </ServiceRenderer>
//   );
// }

// // "use client";
// // import React, { useEffect, useMemo, useState } from "react";
// // import {
// //   Card,
// //   Row,
// //   Col,
// //   Button,
// //   ToggleButtonGroup,
// //   ToggleButton,
// // } from "react-bootstrap";
// // import {
// //   LineChart,
// //   Line,
// //   CartesianGrid,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   ResponsiveContainer,
// //   Legend,
// // } from "recharts";
// // import { trendAnalysisDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";

// // export default function ItemsTrendAnalysis({
// //   apiResponse = {
// //     list: [
// //       {
// //         dt: "2025-07-28",
// //         startDate: "2025-07-28",
// //         endDate: "2025-07-28",
// //         purchaseQuantity: 0,
// //         purchaseValue: 0,
// //         purchaseItemCount: 0,
// //         supplierCount: 0,
// //         consumptionQuantity: 40,
// //         consumptionValue: 10.8,
// //         consumedItemCount: 75,
// //         consumedDepartmentCount: 3,
// //         consumptionOpeningQuantity: 0,
// //         consumptionOpeningValue: 0,
// //         purchaseClosingQuantity: 0,
// //         purchaseClosingValue: 0,
// //         purchaseClosingItemCount: 0,
// //         consumptionClosingQuantity: 0,
// //         consumptionClosingValue: 0,
// //         consumedClosingItemCount: 0,
// //         consumedClosingDepartmentCount: 0,
// //         leftOverStockValue: 51.2,
// //         startingStockValue: 0,
// //         saleQuantity: 173.4,
// //         salePrice: 46.82,
// //         netConsumptionQuantity: 40,
// //         netConsumptionValue: 10.8,
// //         saleToConsumptionQuantityDifference: 133.4,
// //         saleToConsumptionMargin: 36.02,
// //         saleToConsumptionMarginPercentage: 333.52,
// //       },
// //       {
// //         dt: "2025-07-29",
// //         startDate: "2025-07-29",
// //         endDate: "2025-07-29",
// //         purchaseQuantity: 0,
// //         purchaseValue: 0,
// //         purchaseItemCount: 0,
// //         supplierCount: 0,
// //         consumptionQuantity: 500,
// //         consumptionValue: 135,
// //         consumedItemCount: 75,
// //         consumedDepartmentCount: 3,
// //         consumptionOpeningQuantity: 0,
// //         consumptionOpeningValue: 0,
// //         purchaseClosingQuantity: 0,
// //         purchaseClosingValue: 0,
// //         purchaseClosingItemCount: 0,
// //         consumptionClosingQuantity: 0,
// //         consumptionClosingValue: 0,
// //         consumedClosingItemCount: 0,
// //         consumedClosingDepartmentCount: 0,
// //         leftOverStockValue: -83.8,
// //         startingStockValue: 0,
// //         saleQuantity: 180.18,
// //         salePrice: 48.65,
// //         netConsumptionQuantity: 500,
// //         netConsumptionValue: 135,
// //         saleToConsumptionQuantityDifference: -319.82,
// //         saleToConsumptionMargin: -86.35,
// //         saleToConsumptionMarginPercentage: -63.96,
// //       },
// //       {
// //         dt: "2025-07-30",
// //         startDate: "2025-07-30",
// //         endDate: "2025-07-30",
// //         purchaseQuantity: 0,
// //         purchaseValue: 0,
// //         purchaseItemCount: 0,
// //         supplierCount: 0,
// //         consumptionQuantity: 10,
// //         consumptionValue: 2.7,
// //         consumedItemCount: 75,
// //         consumedDepartmentCount: 1,
// //         consumptionOpeningQuantity: 0,
// //         consumptionOpeningValue: 0,
// //         purchaseClosingQuantity: 0,
// //         purchaseClosingValue: 0,
// //         purchaseClosingItemCount: 0,
// //         consumptionClosingQuantity: 0,
// //         consumptionClosingValue: 0,
// //         consumedClosingItemCount: 0,
// //         consumedClosingDepartmentCount: 0,
// //         leftOverStockValue: -86.5,
// //         startingStockValue: 0,
// //         saleQuantity: 264.6,
// //         salePrice: 71.44,
// //         netConsumptionQuantity: 10,
// //         netConsumptionValue: 2.7,
// //         saleToConsumptionQuantityDifference: 254.6,
// //         saleToConsumptionMargin: 68.74,
// //         saleToConsumptionMarginPercentage: 2545.93,
// //       },
// //       {
// //         dt: "2025-07-31",
// //         startDate: "2025-07-31",
// //         endDate: "2025-07-31",
// //         purchaseQuantity: 0,
// //         purchaseValue: 0,
// //         purchaseItemCount: 0,
// //         supplierCount: 0,
// //         consumptionQuantity: 10,
// //         consumptionValue: 2.7,
// //         consumedItemCount: 75,
// //         consumedDepartmentCount: 2,
// //         consumptionOpeningQuantity: 0,
// //         consumptionOpeningValue: 0,
// //         purchaseClosingQuantity: 4500,
// //         purchaseClosingValue: 1215,
// //         purchaseClosingItemCount: 75,
// //         consumptionClosingQuantity: 0,
// //         consumptionClosingValue: 0,
// //         consumedClosingItemCount: 0,
// //         consumedClosingDepartmentCount: 0,
// //         leftOverStockValue: 1215,
// //         startingStockValue: 0,
// //         saleQuantity: 363.53,
// //         salePrice: 98.15,
// //         netConsumptionQuantity: 10,
// //         netConsumptionValue: 2.7,
// //         saleToConsumptionQuantityDifference: 353.53,
// //         saleToConsumptionMargin: 95.45,
// //         saleToConsumptionMarginPercentage: 3535.19,
// //       },
// //       {
// //         dt: "2025-08-01",
// //         startDate: "2025-08-01",
// //         endDate: "2025-08-01",
// //         purchaseQuantity: 0,
// //         purchaseValue: 0,
// //         purchaseItemCount: 0,
// //         supplierCount: 0,
// //         consumptionQuantity: 510,
// //         consumptionValue: 137.7,
// //         consumedItemCount: 75,
// //         consumedDepartmentCount: 3,
// //         consumptionOpeningQuantity: 0,
// //         consumptionOpeningValue: 0,
// //         purchaseClosingQuantity: 0,
// //         purchaseClosingValue: 0,
// //         purchaseClosingItemCount: 0,
// //         consumptionClosingQuantity: 0,
// //         consumptionClosingValue: 0,
// //         consumedClosingItemCount: 0,
// //         consumedClosingDepartmentCount: 0,
// //         leftOverStockValue: 1077.3,
// //         startingStockValue: 0,
// //         saleQuantity: 445.22,
// //         salePrice: 120.21,
// //         netConsumptionQuantity: 510,
// //         netConsumptionValue: 137.7,
// //         saleToConsumptionQuantityDifference: -64.78,
// //         saleToConsumptionMargin: -17.49,
// //         saleToConsumptionMarginPercentage: -12.7,
// //       },
// //       {
// //         dt: "2025-08-02",
// //         startDate: "2025-08-02",
// //         endDate: "2025-08-02",
// //         purchaseQuantity: 0,
// //         purchaseValue: 0,
// //         purchaseItemCount: 0,
// //         supplierCount: 0,
// //         consumptionQuantity: 220,
// //         consumptionValue: 59.4,
// //         consumedItemCount: 75,
// //         consumedDepartmentCount: 4,
// //         consumptionOpeningQuantity: 0,
// //         consumptionOpeningValue: 0,
// //         purchaseClosingQuantity: 0,
// //         purchaseClosingValue: 0,
// //         purchaseClosingItemCount: 0,
// //         consumptionClosingQuantity: 0,
// //         consumptionClosingValue: 0,
// //         consumedClosingItemCount: 0,
// //         consumedClosingDepartmentCount: 0,
// //         leftOverStockValue: 1017.9,
// //         startingStockValue: 0,
// //         saleQuantity: 318.33,
// //         salePrice: 85.95,
// //         netConsumptionQuantity: 220,
// //         netConsumptionValue: 59.4,
// //         saleToConsumptionQuantityDifference: 98.33,
// //         saleToConsumptionMargin: 26.55,
// //         saleToConsumptionMarginPercentage: 44.7,
// //       },
// //       {
// //         dt: "2025-08-03",
// //         startDate: "2025-08-03",
// //         endDate: "2025-08-03",
// //         purchaseQuantity: 0,
// //         purchaseValue: 0,
// //         purchaseItemCount: 0,
// //         supplierCount: 0,
// //         consumptionQuantity: 10,
// //         consumptionValue: 2.7,
// //         consumedItemCount: 75,
// //         consumedDepartmentCount: 1,
// //         consumptionOpeningQuantity: 0,
// //         consumptionOpeningValue: 0,
// //         purchaseClosingQuantity: 0,
// //         purchaseClosingValue: 0,
// //         purchaseClosingItemCount: 0,
// //         consumptionClosingQuantity: 0,
// //         consumptionClosingValue: 0,
// //         consumedClosingItemCount: 0,
// //         consumedClosingDepartmentCount: 0,
// //         leftOverStockValue: 1015.2,
// //         startingStockValue: 0,
// //         saleQuantity: 218.92,
// //         salePrice: 59.11,
// //         netConsumptionQuantity: 10,
// //         netConsumptionValue: 2.7,
// //         saleToConsumptionQuantityDifference: 208.92,
// //         saleToConsumptionMargin: 56.41,
// //         saleToConsumptionMarginPercentage: 2089.26,
// //       },
// //       {
// //         dt: "2025-08-04",
// //         startDate: "2025-08-04",
// //         endDate: "2025-08-04",
// //         purchaseQuantity: 0,
// //         purchaseValue: 0,
// //         purchaseItemCount: 0,
// //         supplierCount: 0,
// //         consumptionQuantity: 750,
// //         consumptionValue: 202.5,
// //         consumedItemCount: 75,
// //         consumedDepartmentCount: 3,
// //         consumptionOpeningQuantity: 0,
// //         consumptionOpeningValue: 0,
// //         purchaseClosingQuantity: 0,
// //         purchaseClosingValue: 0,
// //         purchaseClosingItemCount: 0,
// //         consumptionClosingQuantity: 0,
// //         consumptionClosingValue: 0,
// //         consumedClosingItemCount: 0,
// //         consumedClosingDepartmentCount: 0,
// //         leftOverStockValue: 812.7,
// //         startingStockValue: 0,
// //         saleQuantity: 224.66,
// //         salePrice: 60.66,
// //         netConsumptionQuantity: 750,
// //         netConsumptionValue: 202.5,
// //         saleToConsumptionQuantityDifference: -525.34,
// //         saleToConsumptionMargin: -141.84,
// //         saleToConsumptionMarginPercentage: -70.04,
// //       },
// //     ],
// //   },
// // }) {
// //   const chartData = useMemo(() => {
// //     if (apiResponse?.list) {
// //       return trendAnalysisDataFormatter(apiResponse);
// //     }
// //     return [];
// //   }, [apiResponse]);

// //   return (
// //     <Card
// //       style={{
// //         borderRadius: "16px",
// //         padding: "20px",
// //         background: "#fff",
// //         boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
// //       }}
// //     >
// //       <Row className="align-items-center mb-3">
// //         <Col>
// //           <h5 style={{ fontWeight: "600", color: "#1E1E1E", margin: 0 }}>
// //             Trend Analysis
// //           </h5>
// //           <p style={{ color: "#6B7280", fontSize: "14px", margin: 0 }}>
// //             Sales, consumption, and inventory trends over time
// //           </p>
// //         </Col>
// //         <Col xs="auto">
// //           <ToggleButtonGroup type="radio" name="timeframe" defaultValue="daily">
// //             <ToggleButton
// //               id="daily"
// //               value="daily"
// //               variant="light"
// //               style={{ borderRadius: "20px", padding: "5px 15px" }}
// //             >
// //               Daily
// //             </ToggleButton>
// //             <ToggleButton
// //               id="sameDays"
// //               value="sameDays"
// //               variant="light"
// //               style={{ borderRadius: "20px", padding: "5px 15px" }}
// //             >
// //               Same Days
// //             </ToggleButton>
// //             <ToggleButton
// //               id="weekly"
// //               value="weekly"
// //               variant="light"
// //               style={{ borderRadius: "20px", padding: "5px 15px" }}
// //             >
// //               Weekly
// //             </ToggleButton>
// //             <ToggleButton
// //               id="monthly"
// //               value="monthly"
// //               variant="light"
// //               style={{ borderRadius: "20px", padding: "5px 15px" }}
// //             >
// //               Monthly
// //             </ToggleButton>
// //           </ToggleButtonGroup>
// //         </Col>
// //       </Row>

// //       <ResponsiveContainer width="100%" height={300}>
// //         <LineChart data={chartData}>
// //           <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
// //           <XAxis dataKey="date" stroke="#6B7280" />
// //           <YAxis stroke="#6B7280" />
// //           <Tooltip />
// //           <Legend />
// //           <Line
// //             type="monotone"
// //             dataKey="opening"
// //             stroke="#3B82F6"
// //             strokeWidth={2}
// //             dot={false}
// //             name="Opening"
// //           />
// //           <Line
// //             type="monotone"
// //             dataKey="consumption"
// //             stroke="#F97316"
// //             strokeWidth={2}
// //             dot={false}
// //             name="Consumption"
// //           />
// //           <Line
// //             type="monotone"
// //             dataKey="closing"
// //             stroke="#10B981"
// //             strokeWidth={2}
// //             dot={false}
// //             name="Closing"
// //           />
// //           <Line
// //             type="monotone"
// //             dataKey="consumptionValue"
// //             stroke="#8B5CF6"
// //             strokeWidth={2}
// //             dot={false}
// //             name="Consumption Value"
// //           />
// //         </LineChart>
// //       </ResponsiveContainer>
// //     </Card>
// //   );
// // }
