"use client";

import React, { useEffect, useState } from "react";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import {
  useItemSummaryDaily,
  useItemSummarySameDay,
  useItemSummaryWeekly,
  useItemSummaryMonthly,
} from "@/services/item-service";
import { useItemsContext } from "@/contexts/ItemsContext";
import { purchaseTrendAnalysisDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
import { subDays, subWeeks, subMonths, format } from "date-fns";
import ItemsPurchaseTrendAnalysisGraph from "@/components/common/items/GraphWrapper/ItemsPurchaseTrendAnalysisGraph";
import ItemsPurchaseTrendAnalysisTable from "@/components/common/items/TableSort/ItemsPurchaseTrendAnalysisTable";
import { ButtonGroup, Card, Col, Row, ToggleButton } from "react-bootstrap";
import { IconTrendingUp } from "@tabler/icons-react";

export default function ItemsPurchaseTrendAnalysis() {
  const { startDate, endDate, isMobile } = useItemsContext();
  const [filter, setFilter] = useState("daily");
  const [startDateCS, setStartDateCS] = useState("");
  const [endDateCS, setEndDateCS] = useState("");
  const tabs = ["Daily", "Same Days", "Weekly", "Monthly"];

  // 🔹 Select hook dynamically
  const useDataFetchMethod = (view) => {
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

  const SelectedHook = useDataFetchMethod(filter);

  // 🔹 Compute date range dynamically
  const getDateRange = (view) => {
    const today = new Date();
    let startDatetemp;

    switch (view) {
      case "daily":
        startDatetemp = subDays(today, 7);
        break;
      case "weekly":
        startDatetemp = subWeeks(today, 5);
        break;
      case "monthly":
        startDatetemp = subMonths(today, 5);
        break;
      case "samedays":
        startDatetemp = subWeeks(today, 5);
        break;
      default:
        startDatetemp = today;
    }

    setStartDateCS(format(startDatetemp, "yyyy-MM-dd"));
    setEndDateCS(format(today, "yyyy-MM-dd"));
  };

  useEffect(() => {
    getDateRange(filter);
  }, [filter]);

  return (
    <Card className="p-3 pt-0 border-0 shadow-sm">
      <div
        className="mb-3 p-3 pl-0 pr-0"
        style={{ backgroundColor: "rgb(243,246,255)" }}
      >
        <Row className="align-items-center">
          {/* Icon (Col 1) */}
          <Col xs="auto">
            <div
              style={{
                background: "linear-gradient(135deg, #924CFE 60%, #BC75FF 100%)",
                borderRadius: "12px",
                padding: "8px",
                display: "inline-block",
              }}
            >
              <IconTrendingUp stroke={2} color="#fff" size={24} />
            </div>
          </Col>

          {/* Title + Subtitle (Col 2) */}
          <Col className="flex-grow-1">
            <h5 className="fw-bold mb-0">Purchase Trend Analysis</h5>
            {/* <small className="text-muted">
                Purchase amounts and average pricing trends over time
              </small> */}
          </Col>

          {/* Button Group (Col 3) */}
          {!isMobile && <Col xs="auto">
            <ButtonGroup
              className="rounded-pill"
              style={{
                backgroundColor: "#eee",
                borderRadius: '10px'
              }}
            >
              {tabs.map((label) => {
                const value = label.toLowerCase().replace(" ", "");
                const selected = filter === value;
                return (
                  <ToggleButton
                    key={label}
                    id={`dept-graph-${label}`}
                    type="radio"
                    variant="none"
                    checked={selected}
                    value={value}
                    onChange={(e) => setFilter(e.currentTarget.value)}
                    className="rounded-pill"
                    style={{
                      fontSize: "13px",
                      padding: "6px 16px",
                      backgroundColor: selected ? "white" : "transparent",
                      color: selected ? "#FF6600" : "#888",
                      border: "none",
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
        </Row>
        {isMobile &&
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Col xs="auto">
              <ButtonGroup
                className="rounded-pill"
                style={{
                  backgroundColor: "#eee",
                  borderRadius: '10px'
                }}
              >
                {tabs.map((label) => {
                  const value = label.toLowerCase().replace(" ", "");
                  const selected = filter === value;
                  return (
                    <ToggleButton
                      key={label}
                      id={`dept-graph-${label}`}
                      type="radio"
                      variant="none"
                      checked={selected}
                      value={value}
                      onChange={(e) => setFilter(e.currentTarget.value)}
                      className="rounded-pill"
                      style={{
                        fontSize: "13px",
                        padding: "6px 16px",
                        backgroundColor: selected ? "white" : "transparent",
                        color: selected ? "#FF6600" : "#888",
                        border: "none",
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                    >
                      {label}
                    </ToggleButton>
                  );
                })}
              </ButtonGroup>
            </Col>
          </div>}

      </div>
      <ServiceRenderer
        queryHook={SelectedHook}
        queryKey={["itemTrendAnalysis", filter, startDate, endDate]}
        queryArgs={[
          75,
          { startdt: startDate, enddt: endDate, userId: 7, outlet: 1 },
        ]}
        formatter={(data) =>
          purchaseTrendAnalysisDataFormatter(data?.list || [])
        }
        shimmerCount={2}
      >
        {({ chartData, tableData }) => (
          <>
            {/* Graph Part */}
            <ItemsPurchaseTrendAnalysisGraph
              chartData={chartData}
              filter={filter}
              setFilter={setFilter}
            />

            {/* Table Part */}
            <ItemsPurchaseTrendAnalysisTable
              tableData={tableData}
              filter={filter}
            />

            {/* Inline Styles */}
            <style jsx>{`
              .trend-analysis .tab-btn {
                border: none;
                background: #f9fafb;
                color: #6b7280;
                font-weight: 500;
                padding: 6px 14px;
                border-radius: 9999px;
                transition: all 0.2s ease-in-out;
                margin-left: 4px;
              }
              .trend-analysis .tab-btn.active {
                background: linear-gradient(90deg, #ff7e5f, #feb47b);
                color: #fff;
              }
              .trend-analysis .text-purple {
                color: #8b5cf6 !important;
              }
              .trend-analysis .text-blue {
                color: #3b82f6 !important;
              }
              .trend-analysis .text-green {
                color: #22c55e !important;
              }
            `}</style>
          </>
        )}
      </ServiceRenderer>
    </Card>
  );
}

// "use client";

// import React, { useMemo } from "react";
// import { Card, Table, ButtonGroup, Button } from "react-bootstrap";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   Label,
// } from "recharts";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
// import { purchaseTrendAnalysisDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
// import { useItemSummaryDaily } from "@/services/item-service";
// import { useItemsContext } from "@/contexts/ItemsContext";

// export default function ItemsPurchaseTrendAnalysis() {
//   const { startDate, endDate } = useItemsContext();

//   return (
//     <ServiceRenderer
//       queryHook={useItemSummaryDaily}
//       queryKey={["itemSummaryDaily", { startdt: startDate, enddt: endDate }]}
//       queryFn={() =>
//         useItemSummaryDaily({ startdt: startDate, enddt: endDate }).queryFn
//       }
//       queryArgs={[75,{ startdt: startDate, enddt: endDate }]}
//       formatter={(data) => purchaseTrendAnalysisDataFormatter(data?.list || [])}
//       shimmerCount={2}
//     >
//       {({ chartData, tableData }) => (
//         <div className="p-3 trend-analysis">
//           {/* Chart Card */}
//           <Card className="shadow-sm border-0 mb-4 rounded-4">
//             <Card.Body>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <div>
//                   <h5 className="fw-bold mb-0">Purchase Trend Analysis</h5>
//                   <small className="text-muted">
//                     Purchase amounts and average pricing trends over time
//                   </small>
//                 </div>
//                 <ButtonGroup>
//                   <Button className="tab-btn active">Daily</Button>
//                   <Button className="tab-btn">Same Days</Button>
//                   <Button className="tab-btn">Weekly</Button>
//                   <Button className="tab-btn">Monthly</Button>
//                 </ButtonGroup>
//               </div>

//               <div style={{ width: "100%", height: 280 }}>
//                 <ResponsiveContainer>
//                   <LineChart data={chartData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
//                     <XAxis dataKey="date" stroke="#888" />
//                     <YAxis
//                       yAxisId="left"
//                       orientation="left"
//                       stroke="#3b82f6"
//                       tickFormatter={(v) => `₹${v}`}
//                     >
//                       <Label
//                         value="Purchase Amount"
//                         angle={-90}
//                         position="insideLeft"
//                         style={{
//                           textAnchor: "middle",
//                           fill: "#3b82f6",
//                           fontSize: 12,
//                         }}
//                       />
//                     </YAxis>
//                     <YAxis
//                       yAxisId="right"
//                       orientation="right"
//                       stroke="#8b5cf6"
//                       tickFormatter={(v) => `₹${v}`}
//                     >
//                       <Label
//                         value="Average Price"
//                         angle={90}
//                         position="insideRight"
//                         style={{
//                           textAnchor: "middle",
//                           fill: "#8b5cf6",
//                           fontSize: 12,
//                         }}
//                       />
//                     </YAxis>
//                     <Tooltip />
//                     <Line
//                       yAxisId="left"
//                       type="monotone"
//                       dataKey="purchaseAmount"
//                       stroke="#3b82f6"
//                       name="Purchase Amount"
//                       strokeWidth={2}
//                       dot={{ r: 5, fill: "#3b82f6" }}
//                       label={{ position: "top", fill: "#3b82f6", fontSize: 12 }}
//                     />
//                     <Line
//                       yAxisId="right"
//                       type="monotone"
//                       dataKey="avgPrice"
//                       stroke="#8b5cf6"
//                       name="Average Price"
//                       strokeWidth={2}
//                       dot={{ r: 5, fill: "#8b5cf6" }}
//                       label={{ position: "top", fill: "#8b5cf6", fontSize: 12 }}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </Card.Body>
//           </Card>

//           {/* Table Card */}
//           <Card className="shadow-sm border-0 rounded-4">
//             <Card.Body>
//               <h5 className="fw-bold mb-3">Daily Purchase Data</h5>
//               <small className="text-muted d-block mb-3">
//                 Detailed breakdown of purchase metrics by date
//               </small>
//               <Table hover responsive className="align-middle">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Date</th>
//                     <th>Total Quantity</th>
//                     <th>Total Price</th>
//                     <th>Avg Price</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {tableData.map((row, idx) => (
//                     <tr key={idx}>
//                       <td className="text-dark fw-semibold">
//                         {row.date.icon}
//                         {row.date.label}
//                       </td>
//                       <td className="text-blue fw-semibold">
//                         {row.quantity.icon}
//                         {row.quantity.label}
//                       </td>
//                       <td className="text-green fw-semibold">
//                         {row.totalPrice.icon}
//                         {row.totalPrice.label}
//                       </td>
//                       <td className="text-purple fw-semibold">
//                         {row.avgPrice.label}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </Card.Body>
//           </Card>

//           {/* Inline Styles */}
//           <style jsx>{`
//             .trend-analysis .tab-btn {
//               border: none;
//               background: #f9fafb;
//               color: #6b7280;
//               font-weight: 500;
//               padding: 6px 14px;
//               border-radius: 9999px;
//               transition: all 0.2s ease-in-out;
//               margin-left: 4px;
//             }
//             .trend-analysis .tab-btn.active {
//               background: linear-gradient(90deg, #ff7e5f, #feb47b);
//               color: #fff;
//             }
//             .trend-analysis .text-purple {
//               color: #8b5cf6 !important;
//             }
//             .trend-analysis .text-blue {
//               color: #3b82f6 !important;
//             }
//             .trend-analysis .text-green {
//               color: #22c55e !important;
//             }
//           `}</style>
//         </div>
//       )}
//     </ServiceRenderer>
//   );
// }

// "use client";

// import React, { useMemo } from "react";
// import { Card, Table, Row, Col, ButtonGroup, Button } from "react-bootstrap";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   Label,
// } from "recharts";
// import { purchaseTrendAnalysisDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";

// export default function ItemsPurchaseTrendAnalysis({
//   apiData = {
//     list: [
//       {
//         dt: "2025-07-28",
//         startDate: "2025-07-28",
//         endDate: "2025-07-28",
//         purchaseQuantity: 0,
//         purchaseValue: 0,
//         purchaseItemCount: 0,
//         supplierCount: 0,
//         consumptionQuantity: 40,
//         consumptionValue: 10.8,
//         consumedItemCount: 75,
//         consumedDepartmentCount: 3,
//         consumptionOpeningQuantity: 0,
//         consumptionOpeningValue: 0,
//         purchaseClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseClosingItemCount: 0,
//         consumptionClosingQuantity: 0,
//         consumptionClosingValue: 0,
//         consumedClosingItemCount: 0,
//         consumedClosingDepartmentCount: 0,
//         leftOverStockValue: 51.2,
//         startingStockValue: 0,
//         saleQuantity: 173.4,
//         salePrice: 46.82,
//         netConsumptionQuantity: 40,
//         netConsumptionValue: 10.8,
//         saleToConsumptionQuantityDifference: 133.4,
//         saleToConsumptionMargin: 36.02,
//         saleToConsumptionMarginPercentage: 333.52,
//       },
//       {
//         dt: "2025-07-29",
//         startDate: "2025-07-29",
//         endDate: "2025-07-29",
//         purchaseQuantity: 0,
//         purchaseValue: 0,
//         purchaseItemCount: 0,
//         supplierCount: 0,
//         consumptionQuantity: 500,
//         consumptionValue: 135,
//         consumedItemCount: 75,
//         consumedDepartmentCount: 3,
//         consumptionOpeningQuantity: 0,
//         consumptionOpeningValue: 0,
//         purchaseClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseClosingItemCount: 0,
//         consumptionClosingQuantity: 0,
//         consumptionClosingValue: 0,
//         consumedClosingItemCount: 0,
//         consumedClosingDepartmentCount: 0,
//         leftOverStockValue: -83.8,
//         startingStockValue: 0,
//         saleQuantity: 180.18,
//         salePrice: 48.65,
//         netConsumptionQuantity: 500,
//         netConsumptionValue: 135,
//         saleToConsumptionQuantityDifference: -319.82,
//         saleToConsumptionMargin: -86.35,
//         saleToConsumptionMarginPercentage: -63.96,
//       },
//       {
//         dt: "2025-07-30",
//         startDate: "2025-07-30",
//         endDate: "2025-07-30",
//         purchaseQuantity: 0,
//         purchaseValue: 0,
//         purchaseItemCount: 0,
//         supplierCount: 0,
//         consumptionQuantity: 10,
//         consumptionValue: 2.7,
//         consumedItemCount: 75,
//         consumedDepartmentCount: 1,
//         consumptionOpeningQuantity: 0,
//         consumptionOpeningValue: 0,
//         purchaseClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseClosingItemCount: 0,
//         consumptionClosingQuantity: 0,
//         consumptionClosingValue: 0,
//         consumedClosingItemCount: 0,
//         consumedClosingDepartmentCount: 0,
//         leftOverStockValue: -86.5,
//         startingStockValue: 0,
//         saleQuantity: 264.6,
//         salePrice: 71.44,
//         netConsumptionQuantity: 10,
//         netConsumptionValue: 2.7,
//         saleToConsumptionQuantityDifference: 254.6,
//         saleToConsumptionMargin: 68.74,
//         saleToConsumptionMarginPercentage: 2545.93,
//       },
//       {
//         dt: "2025-07-31",
//         startDate: "2025-07-31",
//         endDate: "2025-07-31",
//         purchaseQuantity: 0,
//         purchaseValue: 0,
//         purchaseItemCount: 0,
//         supplierCount: 0,
//         consumptionQuantity: 10,
//         consumptionValue: 2.7,
//         consumedItemCount: 75,
//         consumedDepartmentCount: 2,
//         consumptionOpeningQuantity: 0,
//         consumptionOpeningValue: 0,
//         purchaseClosingQuantity: 4500,
//         purchaseClosingValue: 1215,
//         purchaseClosingItemCount: 75,
//         consumptionClosingQuantity: 0,
//         consumptionClosingValue: 0,
//         consumedClosingItemCount: 0,
//         consumedClosingDepartmentCount: 0,
//         leftOverStockValue: 1215,
//         startingStockValue: 0,
//         saleQuantity: 363.53,
//         salePrice: 98.15,
//         netConsumptionQuantity: 10,
//         netConsumptionValue: 2.7,
//         saleToConsumptionQuantityDifference: 353.53,
//         saleToConsumptionMargin: 95.45,
//         saleToConsumptionMarginPercentage: 3535.19,
//       },
//       {
//         dt: "2025-08-01",
//         startDate: "2025-08-01",
//         endDate: "2025-08-01",
//         purchaseQuantity: 0,
//         purchaseValue: 0,
//         purchaseItemCount: 0,
//         supplierCount: 0,
//         consumptionQuantity: 510,
//         consumptionValue: 137.7,
//         consumedItemCount: 75,
//         consumedDepartmentCount: 3,
//         consumptionOpeningQuantity: 0,
//         consumptionOpeningValue: 0,
//         purchaseClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseClosingItemCount: 0,
//         consumptionClosingQuantity: 0,
//         consumptionClosingValue: 0,
//         consumedClosingItemCount: 0,
//         consumedClosingDepartmentCount: 0,
//         leftOverStockValue: 1077.3,
//         startingStockValue: 0,
//         saleQuantity: 445.22,
//         salePrice: 120.21,
//         netConsumptionQuantity: 510,
//         netConsumptionValue: 137.7,
//         saleToConsumptionQuantityDifference: -64.78,
//         saleToConsumptionMargin: -17.49,
//         saleToConsumptionMarginPercentage: -12.7,
//       },
//       {
//         dt: "2025-08-02",
//         startDate: "2025-08-02",
//         endDate: "2025-08-02",
//         purchaseQuantity: 0,
//         purchaseValue: 0,
//         purchaseItemCount: 0,
//         supplierCount: 0,
//         consumptionQuantity: 220,
//         consumptionValue: 59.4,
//         consumedItemCount: 75,
//         consumedDepartmentCount: 4,
//         consumptionOpeningQuantity: 0,
//         consumptionOpeningValue: 0,
//         purchaseClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseClosingItemCount: 0,
//         consumptionClosingQuantity: 0,
//         consumptionClosingValue: 0,
//         consumedClosingItemCount: 0,
//         consumedClosingDepartmentCount: 0,
//         leftOverStockValue: 1017.9,
//         startingStockValue: 0,
//         saleQuantity: 318.33,
//         salePrice: 85.95,
//         netConsumptionQuantity: 220,
//         netConsumptionValue: 59.4,
//         saleToConsumptionQuantityDifference: 98.33,
//         saleToConsumptionMargin: 26.55,
//         saleToConsumptionMarginPercentage: 44.7,
//       },
//       {
//         dt: "2025-08-03",
//         startDate: "2025-08-03",
//         endDate: "2025-08-03",
//         purchaseQuantity: 0,
//         purchaseValue: 0,
//         purchaseItemCount: 0,
//         supplierCount: 0,
//         consumptionQuantity: 10,
//         consumptionValue: 2.7,
//         consumedItemCount: 75,
//         consumedDepartmentCount: 1,
//         consumptionOpeningQuantity: 0,
//         consumptionOpeningValue: 0,
//         purchaseClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseClosingItemCount: 0,
//         consumptionClosingQuantity: 0,
//         consumptionClosingValue: 0,
//         consumedClosingItemCount: 0,
//         consumedClosingDepartmentCount: 0,
//         leftOverStockValue: 1015.2,
//         startingStockValue: 0,
//         saleQuantity: 218.92,
//         salePrice: 59.11,
//         netConsumptionQuantity: 10,
//         netConsumptionValue: 2.7,
//         saleToConsumptionQuantityDifference: 208.92,
//         saleToConsumptionMargin: 56.41,
//         saleToConsumptionMarginPercentage: 2089.26,
//       },
//       {
//         dt: "2025-08-04",
//         startDate: "2025-08-04",
//         endDate: "2025-08-04",
//         purchaseQuantity: 0,
//         purchaseValue: 0,
//         purchaseItemCount: 0,
//         supplierCount: 0,
//         consumptionQuantity: 750,
//         consumptionValue: 202.5,
//         consumedItemCount: 75,
//         consumedDepartmentCount: 3,
//         consumptionOpeningQuantity: 0,
//         consumptionOpeningValue: 0,
//         purchaseClosingQuantity: 0,
//         purchaseClosingValue: 0,
//         purchaseClosingItemCount: 0,
//         consumptionClosingQuantity: 0,
//         consumptionClosingValue: 0,
//         consumedClosingItemCount: 0,
//         consumedClosingDepartmentCount: 0,
//         leftOverStockValue: 812.7,
//         startingStockValue: 0,
//         saleQuantity: 224.66,
//         salePrice: 60.66,
//         netConsumptionQuantity: 750,
//         netConsumptionValue: 202.5,
//         saleToConsumptionQuantityDifference: -525.34,
//         saleToConsumptionMargin: -141.84,
//         saleToConsumptionMarginPercentage: -70.04,
//       },
//     ],
//   },
// }) {
//   const { chartData, tableData } = useMemo(
//     () => purchaseTrendAnalysisDataFormatter(apiData?.list || []),
//     [apiData]
//   );

//   return (
//     <div className="p-3 trend-analysis">
//       {/* Chart Card */}
//       <Card className="shadow-sm border-0 mb-4 rounded-4">
//         <Card.Body>
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <div>
//               <h5 className="fw-bold mb-0">Purchase Trend Analysis</h5>
//               <small className="text-muted">
//                 Purchase amounts and average pricing trends over time
//               </small>
//             </div>
//             <ButtonGroup>
//               <Button className="tab-btn active">Daily</Button>
//               <Button className="tab-btn">Same Days</Button>
//               <Button className="tab-btn">Weekly</Button>
//               <Button className="tab-btn">Monthly</Button>
//             </ButtonGroup>
//           </div>

//           <div style={{ width: "100%", height: 280 }}>
//             <ResponsiveContainer>
//               <LineChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
//                 <XAxis dataKey="date" stroke="#888" />
//                 <YAxis
//                   yAxisId="left"
//                   orientation="left"
//                   stroke="#3b82f6"
//                   tickFormatter={(v) => `₹${v}`}
//                 >
//                   <Label
//                     value="Purchase Amount"
//                     angle={-90}
//                     position="insideLeft"
//                     style={{
//                       textAnchor: "middle",
//                       fill: "#3b82f6",
//                       fontSize: 12,
//                     }}
//                   />
//                 </YAxis>
//                 <YAxis
//                   yAxisId="right"
//                   orientation="right"
//                   stroke="#8b5cf6"
//                   tickFormatter={(v) => `₹${v}`}
//                 >
//                   <Label
//                     value="Average Price"
//                     angle={90}
//                     position="insideRight"
//                     style={{
//                       textAnchor: "middle",
//                       fill: "#8b5cf6",
//                       fontSize: 12,
//                     }}
//                   />
//                 </YAxis>
//                 <Tooltip />
//                 <Line
//                   yAxisId="left"
//                   type="monotone"
//                   dataKey="purchaseAmount"
//                   stroke="#3b82f6"
//                   name="Purchase Amount"
//                   strokeWidth={2}
//                   dot={{ r: 5, fill: "#3b82f6" }}
//                   label={{ position: "top", fill: "#3b82f6", fontSize: 12 }}
//                 />
//                 <Line
//                   yAxisId="right"
//                   type="monotone"
//                   dataKey="avgPrice"
//                   stroke="#8b5cf6"
//                   name="Average Price"
//                   strokeWidth={2}
//                   dot={{ r: 5, fill: "#8b5cf6" }}
//                   label={{ position: "top", fill: "#8b5cf6", fontSize: 12 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </Card.Body>
//       </Card>

//       {/* Table Card */}
//       <Card className="shadow-sm border-0 rounded-4">
//         <Card.Body>
//           <h5 className="fw-bold mb-3">Daily Purchase Data</h5>
//           <small className="text-muted d-block mb-3">
//             Detailed breakdown of purchase metrics by date
//           </small>
//           <Table hover responsive className="align-middle">
//             <thead className="table-light">
//               <tr>
//                 <th>Date</th>
//                 <th>Total Quantity</th>
//                 <th>Total Price</th>
//                 <th>Avg Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.map((row, idx) => (
//                 <tr key={idx}>
//                   <td className="text-dark fw-semibold">
//                     {row.date.icon}
//                     {row.date.label}
//                   </td>
//                   <td className="text-blue fw-semibold">
//                     {row.quantity.icon}
//                     {row.quantity.label}
//                   </td>
//                   <td className="text-green fw-semibold">
//                     {row.totalPrice.icon}
//                     {row.totalPrice.label}
//                   </td>
//                   <td className="text-purple fw-semibold">
//                     {row.avgPrice.label}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>

//       {/* Inline Styles */}
//       <style jsx>{`
//         .trend-analysis .tab-btn {
//           border: none;
//           background: #f9fafb;
//           color: #6b7280;
//           font-weight: 500;
//           padding: 6px 14px;
//           border-radius: 9999px;
//           transition: all 0.2s ease-in-out;
//           margin-left: 4px;
//         }
//         .trend-analysis .tab-btn.active {
//           background: linear-gradient(90deg, #ff7e5f, #feb47b);
//           color: #fff;
//         }
//         .trend-analysis .text-purple {
//           color: #8b5cf6 !important;
//         }
//         .trend-analysis .text-blue {
//           color: #3b82f6 !important;
//         }
//         .trend-analysis .text-green {
//           color: #22c55e !important;
//         }
//       `}</style>
//     </div>
//   );
// }
