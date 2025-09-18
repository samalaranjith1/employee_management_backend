"use client";

import React, { useState, useEffect } from "react";
import { Card, Table, ButtonGroup, Button } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useItemsContext } from "@/contexts/ItemsContext";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";

import {
  useItemSummaryDaily,
  useItemSummarySameDay,
  useItemSummaryWeekly,
  useItemSummaryMonthly,
} from "@/services/item-service";
import { consumptionTrendAnalysisDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
import { subDays, subWeeks, subMonths, format } from "date-fns";

export default function ItemsConsumptionTrendAnalysis() {
  const { startDate, endDate } = useItemsContext();
  const [filter, setFilter] = useState("daily");
  const [startDateCS, setStartDateCS] = useState("");
  const [endDateCS, setEndDateCS] = useState("");

  // 🔹 Choose hook dynamically based on filter
  const getHook = (view) => {
    switch (view) {
      case "daily":
        return useItemSummaryDaily;
      case "sameday":
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
      case "sameday":
        start = subWeeks(today, 5);
        break;
      case "weekly":
        start = subWeeks(today, 5);
        break;
      case "monthly":
        start = subMonths(today, 5);
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

  const toggleOptions = [
    { key: "daily", label: "Daily" },
    { key: "sameday", label: "Same Days" },
    { key: "weekly", label: "Weekly" },
    { key: "monthly", label: "Monthly" },
  ];

  return (
    <ServiceRenderer
      queryHook={SelectedHook}
      queryKey={["itemSummaryDynamic", filter, startDateCS, endDateCS]}
      queryArgs={[75, { startdt: startDateCS, enddt: endDateCS, outlet: 1 }]}
      queryFn={() =>
        SelectedHook({ startdt: startDateCS, enddt: endDateCS }).queryFn
      }
      formatter={consumptionTrendAnalysisDataFormatter}
      shimmerCount={3}
    >
      {(formattedData) => {
        const chartData = formattedData.map((item) => ({
          date: item.date,
          Opening: parseFloat(item.opening.value),
          Consumption: parseFloat(item.consumption.value),
          Closing: parseFloat(item.closing.value),
          ConsumptionValue: parseFloat(
            item.consumption.amount.replace("₹", "")
          ),
        }));

        const styles = {
          card: {
            border: "none",
            borderRadius: "16px",
            background: "#ffffff",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            marginBottom: "1rem",
          },
          cardHeader: {
            background: "#f9fafb",
            borderBottom: "none",
            padding: "1rem 1.5rem",
            fontWeight: 600,
            fontSize: "1rem",
            color: "#111827",
          },
          toggleBtn: {
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            color: "#374151",
            fontWeight: 500,
            borderRadius: "8px",
            marginLeft: "4px",
          },
          toggleBtnActive: {
            background: "#2563eb",
            color: "#ffffff",
            border: "1px solid #2563eb",
          },
          tableHead: {
            background: "#f9fafb",
            textTransform: "uppercase",
            fontSize: "0.75rem",
            color: "#6b7280",
          },
          oddRow: { background: "#ffffff" },
          evenRow: { background: "#fafafa" },
          cell: {
            fontWeight: 600,
            verticalAlign: "middle",
          },
          primary: { color: "#3b82f6" },
          warning: { color: "#f59e0b" },
          success: { color: "#10b981" },
          danger: { color: "#ef4444" },
          purple: { color: "#8b5cf6" },
          muted: { color: "#6b7280", fontSize: "0.8rem" },
        };

        return (
          <div className="p-3">
            {/* Trend Analysis Card */}
            <Card style={styles.card}>
              <Card.Header
                style={styles.cardHeader}
                className="d-flex justify-content-between align-items-center"
              >
                <div>📈 Trend Analysis</div>
                <ButtonGroup size="sm">
                  {toggleOptions.map((opt) => (
                    <Button
                      key={opt.key}
                      style={
                        filter === opt.key
                          ? { ...styles.toggleBtn, ...styles.toggleBtnActive }
                          : styles.toggleBtn
                      }
                      onClick={() => setFilter(opt.key)}
                    >
                      {opt.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="date" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="Opening"
                      stroke="#3B82F6"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="Consumption"
                      stroke="#F59E0B"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="Closing"
                      stroke="#10B981"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="ConsumptionValue"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>

            {/* Table Card */}
            <Card style={styles.card}>
              <Card.Header
                style={styles.cardHeader}
                className="d-flex justify-content-between align-items-center"
              >
                <div>📊 Analytics Table</div>
                <ButtonGroup size="sm">
                  {toggleOptions.map((opt) => (
                    <Button
                      key={opt.key}
                      style={
                        filter === opt.key
                          ? { ...styles.toggleBtn, ...styles.toggleBtnActive }
                          : styles.toggleBtn
                      }
                      onClick={() => setFilter(opt.key)}
                    >
                      {opt.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive hover className="mb-0">
                  <thead>
                    <tr style={styles.tableHead}>
                      <th>Date</th>
                      <th>Opening</th>
                      <th>Consumption</th>
                      <th>Closing</th>
                      <th>Net Consumption</th>
                      <th>Sale</th>
                      <th>Burn & Utilization</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formattedData.map((row, idx) => (
                      <tr
                        key={idx}
                        style={idx % 2 === 0 ? styles.oddRow : styles.evenRow}
                      >
                        <td>
                          <div style={{ fontWeight: 600, color: "#111827" }}>
                            {row.date}
                          </div>
                          <div style={styles.muted}>{row.weekday}</div>
                        </td>
                        <td style={{ ...styles.cell, ...styles.primary }}>
                          {row.opening.icon} {row.opening.value}
                          <div style={styles.muted}>{row.opening.amount}</div>
                        </td>
                        <td style={{ ...styles.cell, ...styles.warning }}>
                          {row.consumption.icon} {row.consumption.value}
                          <div style={styles.muted}>
                            {row.consumption.amount}
                          </div>
                        </td>
                        <td style={{ ...styles.cell, ...styles.success }}>
                          {row.closing.icon} {row.closing.value}
                          <div style={styles.muted}>{row.closing.amount}</div>
                        </td>
                        <td style={{ ...styles.cell, ...styles.danger }}>
                          {row.netConsumption.icon} {row.netConsumption.value}
                          <div style={styles.muted}>
                            {row.netConsumption.amount}
                          </div>
                        </td>
                        <td style={{ ...styles.cell, ...styles.purple }}>
                          {row.sale.icon} {row.sale.value}
                          <div style={styles.muted}>{row.sale.amount}</div>
                        </td>
                        <td style={styles.cell}>
                          {row.burnUtilization.value}
                          <div style={styles.muted}>
                            {row.burnUtilization.percent}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        );
      }}
    </ServiceRenderer>
  );
}
// "use client";

// import React from "react";
// import { Card, Table, ButtonGroup, Button } from "react-bootstrap";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";
// import { consumptionTrendAnalysisDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
// import { useItemSummaryDaily } from "@/services/item-service";
// import { useItemsContext } from "@/contexts/ItemsContext";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";

// export default function ItemsConsumptionTrendAnalysis() {
//   const { startDate, endDate } = useItemsContext();

//   const styles = {
//     card: {
//       border: "none",
//       borderRadius: "16px",
//       background: "#ffffff",
//       boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
//       marginBottom: "1rem",
//     },
//     cardHeader: {
//       background: "#f9fafb",
//       borderBottom: "none",
//       padding: "1rem 1.5rem",
//       fontWeight: "600",
//       fontSize: "1rem",
//       color: "#111827",
//     },
//     toggleBtn: {
//       background: "#ffffff",
//       border: "1px solid #e5e7eb",
//       color: "#374151",
//       fontWeight: 500,
//       borderRadius: "8px",
//       marginLeft: "4px",
//     },
//     toggleBtnActive: {
//       background: "#2563eb",
//       color: "#ffffff",
//       border: "1px solid #2563eb",
//     },
//     tableHead: {
//       background: "#f9fafb",
//       textTransform: "uppercase",
//       fontSize: "0.75rem",
//       color: "#6b7280",
//     },
//     oddRow: { background: "#ffffff" },
//     evenRow: { background: "#fafafa" },
//     cell: {
//       fontWeight: 600,
//       verticalAlign: "middle",
//     },
//     primary: { color: "#3b82f6" },
//     warning: { color: "#f59e0b" },
//     success: { color: "#10b981" },
//     danger: { color: "#ef4444" },
//     purple: { color: "#8b5cf6" },
//     muted: { color: "#6b7280", fontSize: "0.8rem" },
//   };

//   return (
//     <ServiceRenderer
//       queryHook={useItemSummaryDaily}
//       queryKey={["itemSummaryDaily", { startdt: startDate, enddt: endDate }]}
//       queryFn={() =>
//         useItemSummaryDaily({ startdt: startDate, enddt: endDate }).queryFn
//       }
//       queryArgs={[75,{ startdt: startDate, enddt: endDate }]}
//       formatter={consumptionTrendAnalysisDataFormatter}
//       shimmerCount={3}
//     >
//       {(formattedData) => {
//         const chartData = formattedData.map((item) => ({
//           date: item.date,
//           Opening: parseFloat(item.opening.value),
//           Consumption: parseFloat(item.consumption.value),
//           Closing: parseFloat(item.closing.value),
//           ConsumptionValue: parseFloat(
//             item.consumption.amount.replace("₹", "")
//           ),
//         }));

//         return (
//           <div className="p-3">
//             {/* Trend Analysis Card */}
//             <Card style={styles.card}>
//               <Card.Header
//                 style={styles.cardHeader}
//                 className="d-flex justify-content-between align-items-center"
//               >
//                 <div>📈 Trend Analysis</div>
//                 <ButtonGroup size="sm">
//                   <Button
//                     style={{ ...styles.toggleBtn, ...styles.toggleBtnActive }}
//                   >
//                     Daily
//                   </Button>
//                   <Button style={styles.toggleBtn}>Same Days</Button>
//                   <Button style={styles.toggleBtn}>Weekly</Button>
//                   <Button style={styles.toggleBtn}>Monthly</Button>
//                 </ButtonGroup>
//               </Card.Header>
//               <Card.Body>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <LineChart data={chartData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//                     <XAxis dataKey="date" stroke="#6B7280" />
//                     <YAxis stroke="#6B7280" />
//                     <Tooltip />
//                     <Line
//                       type="monotone"
//                       dataKey="Opening"
//                       stroke="#3B82F6"
//                       strokeWidth={2}
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="Consumption"
//                       stroke="#F59E0B"
//                       strokeWidth={2}
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="Closing"
//                       stroke="#10B981"
//                       strokeWidth={2}
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="ConsumptionValue"
//                       stroke="#8B5CF6"
//                       strokeWidth={2}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </Card.Body>
//             </Card>

//             {/* Table Card */}
//             <Card style={styles.card}>
//               <Card.Header
//                 style={styles.cardHeader}
//                 className="d-flex justify-content-between align-items-center"
//               >
//                 <div>📊 Daily Analytics Table</div>
//                 <ButtonGroup size="sm">
//                   <Button
//                     style={{ ...styles.toggleBtn, ...styles.toggleBtnActive }}
//                   >
//                     Daily
//                   </Button>
//                   <Button style={styles.toggleBtn}>Same Days</Button>
//                   <Button style={styles.toggleBtn}>Weekly</Button>
//                   <Button style={styles.toggleBtn}>Monthly</Button>
//                 </ButtonGroup>
//               </Card.Header>
//               <Card.Body className="p-0">
//                 <Table responsive hover className="mb-0">
//                   <thead>
//                     <tr style={styles.tableHead}>
//                       <th>Date</th>
//                       <th>Opening</th>
//                       <th>Consumption</th>
//                       <th>Closing</th>
//                       <th>Net Consumption</th>
//                       <th>Sale</th>
//                       <th>Burn & Utilization</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {formattedData.map((row, idx) => (
//                       <tr
//                         key={idx}
//                         style={idx % 2 === 0 ? styles.oddRow : styles.evenRow}
//                       >
//                         <td>
//                           <div style={{ fontWeight: 600, color: "#111827" }}>
//                             {row.date}
//                           </div>
//                           <div style={styles.muted}>{row.weekday}</div>
//                         </td>
//                         <td style={{ ...styles.cell, ...styles.primary }}>
//                           {row.opening.icon} {row.opening.value}
//                           <div style={styles.muted}>{row.opening.amount}</div>
//                         </td>
//                         <td style={{ ...styles.cell, ...styles.warning }}>
//                           {row.consumption.icon} {row.consumption.value}
//                           <div style={styles.muted}>
//                             {row.consumption.amount}
//                           </div>
//                         </td>
//                         <td style={{ ...styles.cell, ...styles.success }}>
//                           {row.closing.icon} {row.closing.value}
//                           <div style={styles.muted}>{row.closing.amount}</div>
//                         </td>
//                         <td style={{ ...styles.cell, ...styles.danger }}>
//                           {row.netConsumption.icon} {row.netConsumption.value}
//                           <div style={styles.muted}>
//                             {row.netConsumption.amount}
//                           </div>
//                         </td>
//                         <td style={{ ...styles.cell, ...styles.purple }}>
//                           {row.sale.icon} {row.sale.value}
//                           <div style={styles.muted}>{row.sale.amount}</div>
//                         </td>
//                         <td style={styles.cell}>
//                           {row.burnUtilization.value}
//                           <div style={styles.muted}>
//                             {row.burnUtilization.percent}
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </Card.Body>
//             </Card>
//           </div>
//         );
//       }}
//     </ServiceRenderer>
//   );
// }

// "use client";

// import React from "react";
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
// import { consumptionTrendAnalysisDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";

// export default function ItemsConsumptionTrendAnalysis({
//   apiData = [
//     {
//       dt: "2025-07-28",
//       startDate: "2025-07-28",
//       endDate: "2025-07-28",
//       purchaseQuantity: 0,
//       purchaseValue: 0,
//       purchaseItemCount: 0,
//       supplierCount: 0,
//       consumptionQuantity: 40,
//       consumptionValue: 10.8,
//       consumedItemCount: 75,
//       consumedDepartmentCount: 3,
//       consumptionOpeningQuantity: 0,
//       consumptionOpeningValue: 0,
//       purchaseClosingQuantity: 0,
//       purchaseClosingValue: 0,
//       purchaseClosingItemCount: 0,
//       consumptionClosingQuantity: 0,
//       consumptionClosingValue: 0,
//       consumedClosingItemCount: 0,
//       consumedClosingDepartmentCount: 0,
//       leftOverStockValue: 51.2,
//       startingStockValue: 0,
//       saleQuantity: 173.4,
//       salePrice: 46.82,
//       netConsumptionQuantity: 40,
//       netConsumptionValue: 10.8,
//       saleToConsumptionQuantityDifference: 133.4,
//       saleToConsumptionMargin: 36.02,
//       saleToConsumptionMarginPercentage: 333.52,
//     },
//     {
//       dt: "2025-07-29",
//       startDate: "2025-07-29",
//       endDate: "2025-07-29",
//       purchaseQuantity: 0,
//       purchaseValue: 0,
//       purchaseItemCount: 0,
//       supplierCount: 0,
//       consumptionQuantity: 500,
//       consumptionValue: 135,
//       consumedItemCount: 75,
//       consumedDepartmentCount: 3,
//       consumptionOpeningQuantity: 0,
//       consumptionOpeningValue: 0,
//       purchaseClosingQuantity: 0,
//       purchaseClosingValue: 0,
//       purchaseClosingItemCount: 0,
//       consumptionClosingQuantity: 0,
//       consumptionClosingValue: 0,
//       consumedClosingItemCount: 0,
//       consumedClosingDepartmentCount: 0,
//       leftOverStockValue: -83.8,
//       startingStockValue: 0,
//       saleQuantity: 180.18,
//       salePrice: 48.65,
//       netConsumptionQuantity: 500,
//       netConsumptionValue: 135,
//       saleToConsumptionQuantityDifference: -319.82,
//       saleToConsumptionMargin: -86.35,
//       saleToConsumptionMarginPercentage: -63.96,
//     },
//     {
//       dt: "2025-07-30",
//       startDate: "2025-07-30",
//       endDate: "2025-07-30",
//       purchaseQuantity: 0,
//       purchaseValue: 0,
//       purchaseItemCount: 0,
//       supplierCount: 0,
//       consumptionQuantity: 10,
//       consumptionValue: 2.7,
//       consumedItemCount: 75,
//       consumedDepartmentCount: 1,
//       consumptionOpeningQuantity: 0,
//       consumptionOpeningValue: 0,
//       purchaseClosingQuantity: 0,
//       purchaseClosingValue: 0,
//       purchaseClosingItemCount: 0,
//       consumptionClosingQuantity: 0,
//       consumptionClosingValue: 0,
//       consumedClosingItemCount: 0,
//       consumedClosingDepartmentCount: 0,
//       leftOverStockValue: -86.5,
//       startingStockValue: 0,
//       saleQuantity: 264.6,
//       salePrice: 71.44,
//       netConsumptionQuantity: 10,
//       netConsumptionValue: 2.7,
//       saleToConsumptionQuantityDifference: 254.6,
//       saleToConsumptionMargin: 68.74,
//       saleToConsumptionMarginPercentage: 2545.93,
//     },
//     {
//       dt: "2025-07-31",
//       startDate: "2025-07-31",
//       endDate: "2025-07-31",
//       purchaseQuantity: 0,
//       purchaseValue: 0,
//       purchaseItemCount: 0,
//       supplierCount: 0,
//       consumptionQuantity: 10,
//       consumptionValue: 2.7,
//       consumedItemCount: 75,
//       consumedDepartmentCount: 2,
//       consumptionOpeningQuantity: 0,
//       consumptionOpeningValue: 0,
//       purchaseClosingQuantity: 4500,
//       purchaseClosingValue: 1215,
//       purchaseClosingItemCount: 75,
//       consumptionClosingQuantity: 0,
//       consumptionClosingValue: 0,
//       consumedClosingItemCount: 0,
//       consumedClosingDepartmentCount: 0,
//       leftOverStockValue: 1215,
//       startingStockValue: 0,
//       saleQuantity: 363.53,
//       salePrice: 98.15,
//       netConsumptionQuantity: 10,
//       netConsumptionValue: 2.7,
//       saleToConsumptionQuantityDifference: 353.53,
//       saleToConsumptionMargin: 95.45,
//       saleToConsumptionMarginPercentage: 3535.19,
//     },
//     {
//       dt: "2025-08-01",
//       startDate: "2025-08-01",
//       endDate: "2025-08-01",
//       purchaseQuantity: 0,
//       purchaseValue: 0,
//       purchaseItemCount: 0,
//       supplierCount: 0,
//       consumptionQuantity: 510,
//       consumptionValue: 137.7,
//       consumedItemCount: 75,
//       consumedDepartmentCount: 3,
//       consumptionOpeningQuantity: 0,
//       consumptionOpeningValue: 0,
//       purchaseClosingQuantity: 0,
//       purchaseClosingValue: 0,
//       purchaseClosingItemCount: 0,
//       consumptionClosingQuantity: 0,
//       consumptionClosingValue: 0,
//       consumedClosingItemCount: 0,
//       consumedClosingDepartmentCount: 0,
//       leftOverStockValue: 1077.3,
//       startingStockValue: 0,
//       saleQuantity: 445.22,
//       salePrice: 120.21,
//       netConsumptionQuantity: 510,
//       netConsumptionValue: 137.7,
//       saleToConsumptionQuantityDifference: -64.78,
//       saleToConsumptionMargin: -17.49,
//       saleToConsumptionMarginPercentage: -12.7,
//     },
//     {
//       dt: "2025-08-02",
//       startDate: "2025-08-02",
//       endDate: "2025-08-02",
//       purchaseQuantity: 0,
//       purchaseValue: 0,
//       purchaseItemCount: 0,
//       supplierCount: 0,
//       consumptionQuantity: 220,
//       consumptionValue: 59.4,
//       consumedItemCount: 75,
//       consumedDepartmentCount: 4,
//       consumptionOpeningQuantity: 0,
//       consumptionOpeningValue: 0,
//       purchaseClosingQuantity: 0,
//       purchaseClosingValue: 0,
//       purchaseClosingItemCount: 0,
//       consumptionClosingQuantity: 0,
//       consumptionClosingValue: 0,
//       consumedClosingItemCount: 0,
//       consumedClosingDepartmentCount: 0,
//       leftOverStockValue: 1017.9,
//       startingStockValue: 0,
//       saleQuantity: 318.33,
//       salePrice: 85.95,
//       netConsumptionQuantity: 220,
//       netConsumptionValue: 59.4,
//       saleToConsumptionQuantityDifference: 98.33,
//       saleToConsumptionMargin: 26.55,
//       saleToConsumptionMarginPercentage: 44.7,
//     },
//     {
//       dt: "2025-08-03",
//       startDate: "2025-08-03",
//       endDate: "2025-08-03",
//       purchaseQuantity: 0,
//       purchaseValue: 0,
//       purchaseItemCount: 0,
//       supplierCount: 0,
//       consumptionQuantity: 10,
//       consumptionValue: 2.7,
//       consumedItemCount: 75,
//       consumedDepartmentCount: 1,
//       consumptionOpeningQuantity: 0,
//       consumptionOpeningValue: 0,
//       purchaseClosingQuantity: 0,
//       purchaseClosingValue: 0,
//       purchaseClosingItemCount: 0,
//       consumptionClosingQuantity: 0,
//       consumptionClosingValue: 0,
//       consumedClosingItemCount: 0,
//       consumedClosingDepartmentCount: 0,
//       leftOverStockValue: 1015.2,
//       startingStockValue: 0,
//       saleQuantity: 218.92,
//       salePrice: 59.11,
//       netConsumptionQuantity: 10,
//       netConsumptionValue: 2.7,
//       saleToConsumptionQuantityDifference: 208.92,
//       saleToConsumptionMargin: 56.41,
//       saleToConsumptionMarginPercentage: 2089.26,
//     },
//     {
//       dt: "2025-08-04",
//       startDate: "2025-08-04",
//       endDate: "2025-08-04",
//       purchaseQuantity: 0,
//       purchaseValue: 0,
//       purchaseItemCount: 0,
//       supplierCount: 0,
//       consumptionQuantity: 750,
//       consumptionValue: 202.5,
//       consumedItemCount: 75,
//       consumedDepartmentCount: 3,
//       consumptionOpeningQuantity: 0,
//       consumptionOpeningValue: 0,
//       purchaseClosingQuantity: 0,
//       purchaseClosingValue: 0,
//       purchaseClosingItemCount: 0,
//       consumptionClosingQuantity: 0,
//       consumptionClosingValue: 0,
//       consumedClosingItemCount: 0,
//       consumedClosingDepartmentCount: 0,
//       leftOverStockValue: 812.7,
//       startingStockValue: 0,
//       saleQuantity: 224.66,
//       salePrice: 60.66,
//       netConsumptionQuantity: 750,
//       netConsumptionValue: 202.5,
//       saleToConsumptionQuantityDifference: -525.34,
//       saleToConsumptionMargin: -141.84,
//       saleToConsumptionMarginPercentage: -70.04,
//     },
//   ],
// }) {
//   const formattedData = consumptionTrendAnalysisDataFormatter(apiData);

//   const chartData = formattedData.map((item) => ({
//     date: item.date,
//     Opening: parseFloat(item.opening.value),
//     Consumption: parseFloat(item.consumption.value),
//     Closing: parseFloat(item.closing.value),
//     ConsumptionValue: parseFloat(item.consumption.amount.replace("₹", "")),
//   }));

//  const styles = {
//     card: {
//       border: "none",
//       borderRadius: "16px",
//       background: "#ffffff",
//       boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
//       marginBottom: "1rem",
//     },
//     cardHeader: {
//       background: "#f9fafb",
//       borderBottom: "none",
//       padding: "1rem 1.5rem",
//       fontWeight: "600",
//       fontSize: "1rem",
//       color: "#111827",
//     },
//     toggleBtn: {
//       background: "#ffffff",
//       border: "1px solid #e5e7eb",
//       color: "#374151",
//       fontWeight: 500,
//       borderRadius: "8px",
//       marginLeft: "4px",
//     },
//     toggleBtnActive: {
//       background: "#2563eb",
//       color: "#ffffff",
//       border: "1px solid #2563eb",
//     },
//     tableHead: {
//       background: "#f9fafb",
//       textTransform: "uppercase",
//       fontSize: "0.75rem",
//       color: "#6b7280",
//     },
//     oddRow: { background: "#ffffff" },
//     evenRow: { background: "#fafafa" },
//     cell: {
//       fontWeight: 600,
//       verticalAlign: "middle",
//     },
//     primary: { color: "#3b82f6" },
//     warning: { color: "#f59e0b" },
//     success: { color: "#10b981" },
//     danger: { color: "#ef4444" },
//     purple: { color: "#8b5cf6" },
//     muted: { color: "#6b7280", fontSize: "0.8rem" },
//   };

//   return (
//     <div className="p-3">
//       {/* Trend Analysis Card */}
//       <Card style={styles.card}>
//         <Card.Header
//           style={styles.cardHeader}
//           className="d-flex justify-content-between align-items-center"
//         >
//           <div>📈 Trend Analysis</div>
//           <ButtonGroup size="sm">
//             <Button style={{ ...styles.toggleBtn, ...styles.toggleBtnActive }}>
//               Daily
//             </Button>
//             <Button style={styles.toggleBtn}>Same Days</Button>
//             <Button style={styles.toggleBtn}>Weekly</Button>
//             <Button style={styles.toggleBtn}>Monthly</Button>
//           </ButtonGroup>
//         </Card.Header>
//         <Card.Body>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//               <XAxis dataKey="date" stroke="#6B7280" />
//               <YAxis stroke="#6B7280" />
//               <Tooltip />
//               <Line type="monotone" dataKey="Opening" stroke="#3B82F6" strokeWidth={2} />
//               <Line type="monotone" dataKey="Consumption" stroke="#F59E0B" strokeWidth={2} />
//               <Line type="monotone" dataKey="Closing" stroke="#10B981" strokeWidth={2} />
//               <Line type="monotone" dataKey="ConsumptionValue" stroke="#8B5CF6" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </Card.Body>
//       </Card>

//       {/* Table Card */}
//       <Card style={styles.card}>
//         <Card.Header
//           style={styles.cardHeader}
//           className="d-flex justify-content-between align-items-center"
//         >
//           <div>📊 Daily Analytics Table</div>
//           <ButtonGroup size="sm">
//             <Button style={{ ...styles.toggleBtn, ...styles.toggleBtnActive }}>
//               Daily
//             </Button>
//             <Button style={styles.toggleBtn}>Same Days</Button>
//             <Button style={styles.toggleBtn}>Weekly</Button>
//             <Button style={styles.toggleBtn}>Monthly</Button>
//           </ButtonGroup>
//         </Card.Header>
//         <Card.Body className="p-0">
//           <Table responsive hover className="mb-0">
//             <thead>
//               <tr style={styles.tableHead}>
//                 <th>Date</th>
//                 <th>Opening</th>
//                 <th>Consumption</th>
//                 <th>Closing</th>
//                 <th>Net Consumption</th>
//                 <th>Sale</th>
//                 <th>Burn & Utilization</th>
//               </tr>
//             </thead>
//             <tbody>
//               {formattedData.map((row, idx) => (
//                 <tr key={idx} style={idx % 2 === 0 ? styles.oddRow : styles.evenRow}>
//                   <td>
//                     <div style={{ fontWeight: 600, color: "#111827" }}>{row.date}</div>
//                     <div style={styles.muted}>{row.weekday}</div>
//                   </td>
//                   <td style={{ ...styles.cell, ...styles.primary }}>
//                     {row.opening.icon} {row.opening.value}
//                     <div style={styles.muted}>{row.opening.amount}</div>
//                   </td>
//                   <td style={{ ...styles.cell, ...styles.warning }}>
//                     {row.consumption.icon} {row.consumption.value}
//                     <div style={styles.muted}>{row.consumption.amount}</div>
//                   </td>
//                   <td style={{ ...styles.cell, ...styles.success }}>
//                     {row.closing.icon} {row.closing.value}
//                     <div style={styles.muted}>{row.closing.amount}</div>
//                   </td>
//                   <td style={{ ...styles.cell, ...styles.danger }}>
//                     {row.netConsumption.icon} {row.netConsumption.value}
//                     <div style={styles.muted}>{row.netConsumption.amount}</div>
//                   </td>
//                   <td style={{ ...styles.cell, ...styles.purple }}>
//                     {row.sale.icon} {row.sale.value}
//                     <div style={styles.muted}>{row.sale.amount}</div>
//                   </td>
//                   <td style={styles.cell}>
//                     {row.burnUtilization.value}
//                     <div style={styles.muted}>{row.burnUtilization.percent}</div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }
