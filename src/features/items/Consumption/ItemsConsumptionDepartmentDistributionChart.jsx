"use client";

import React, { useState, useMemo } from "react";
import { Card, Row, Col, Dropdown } from "react-bootstrap";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { consumptionDepartmentDistributionChartDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
import { useDepartmentsUsageList } from "@/services/department-service";
import { useItemsContext } from "@/contexts/ItemsContext";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";

export default function ItemsConsumptionDepartmentDistributionChart() {
  const { startDate, endDate } = useItemsContext();
  const [metric, setMetric] = useState("Consumption Quantity (GM)");

  // 🎨 Color palette
  const COLOR_PALETTE = [
    "#4E79FF",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#A855F7",
    "#06B6D4",
    "#EAB308",
    "#3B82F6",
    "#F97316",
    "#D946EF",
    "#F43F5E",
    "#22C55E",
    "#6B7280",
  ];

  return (
    <ServiceRenderer
      queryHook={useDepartmentsUsageList}
      queryKey={[
        "departmentsUsageList",
        { startdt: startDate, enddt: endDate },
      ]}
      queryFn={() =>
        useDepartmentsUsageList({
          startdt: startDate,
          enddt: endDate,
        }).queryFn
      }
      queryArgs={[{ startdt: startDate, enddt: endDate ,outlet:1,userId:7}]}
      formatter={consumptionDepartmentDistributionChartDataFormatter}
      shimmerCount={1}
    >
      {(formattedData) => {
        const { chartData, total } = formattedData;

        // ✅ This useMemo is fine because it's INSIDE a single render (no new hook call order changes)
        const COLORS = useMemo(() => {
          const shuffled = [...COLOR_PALETTE].sort(() => 0.5 - Math.random());
          return chartData.map((_, index) => shuffled[index % shuffled.length]);
        }, [chartData]);

        return (
          <Card
            style={{
              borderRadius: "16px",
              backgroundColor: "#fff",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              padding: "20px",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "linear-gradient(90deg, #fce7f3, #fbcfe8)",
                borderRadius: "12px",
                padding: "12px 16px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    backgroundColor: "#EC4899",
                    padding: "8px",
                    borderRadius: "8px",
                  }}
                >
                  {chartData[0]?.icon}
                </div>
                <div>
                  <h5
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    Department Distribution Chart
                  </h5>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      color: "#6B7280",
                    }}
                  >
                    Visual breakdown of departmental metrics
                  </p>
                </div>
              </div>

              {/* 🔽 Dropdown */}
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  style={{
                    border: "1px solid #E5E7EB",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#111827",
                  }}
                >
                  {metric}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => setMetric("Consumption Quantity (GM)")}
                  >
                    Consumption Quantity (GM)
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setMetric("Consumption Value (₹)")}
                  >
                    Consumption Value (₹)
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setMetric("Consumption Units")}>
                    Consumption Units
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <Row>
              {/* Pie Chart */}
              <Col md={7}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={3}
                    >
                      {chartData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Col>

              {/* List */}
              <Col md={5}>
                <div style={{ marginBottom: "10px", fontWeight: 600 }}>
                  {metric}
                </div>
                {chartData.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 12px",
                      borderRadius: "12px",
                      marginBottom: "8px",
                      background: "#F9FAFB",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div style={{ fontSize: "18px" }}>{item.icon}</div>
                      <div style={{ fontSize: "14px", fontWeight: 500 }}>
                        {item.name}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 600, fontSize: "14px" }}>
                        {item.value.toFixed(1)} GM
                      </div>
                      <div style={{ fontSize: "12px", color: "#6B7280" }}>
                        {item.percentage}%
                      </div>
                    </div>
                  </div>
                ))}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px",
                    borderRadius: "12px",
                    marginTop: "12px",
                    background: "#F3F4F6",
                    fontWeight: 700,
                  }}
                >
                  <span>Total</span>
                  <span>{total} GM</span>
                </div>
              </Col>
            </Row>
          </Card>
        );
      }}
    </ServiceRenderer>
  );
}

// "use client";

// import React, { useMemo, useState } from "react";
// import { Card, Row, Col,Dropdown } from "react-bootstrap";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
// import { consumptionDepartmentDistributionChartDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";

// export default function ItemsConsumptionDepartmentDistributionChart({
//   apiData = {
//     etag: "-2095218115",
//     consumptionValue: 23782.5,
//     netConsumptionValue: 23782.5,
//     netSales: 53800.1,
//     totalSales: 58962.5,
//     consumptionPercentage: 44.21,
//     netConsumptionPercentage: 44.21,
//     budget: 16140.03,
//     targetConsumptionPercentage: 30,
//     list: [
//       {
//         id: "4",
//         department: {
//           id: "4",
//           outletId: "1",
//           name: "BIRYANI",
//           type: "PURCHASE AND SALE",
//           costToSalePercentageGoal: 30,
//           costPerDayGoal: 1000,
//           disabled: false,
//           createdBy: null,
//           updatedBy: null,
//         },
//         consumptionValue: 3756.3,
//         consumptionOpeningValue: 2805.4,
//         consumptionClosingValue: 2805.4,
//         netSales: 13358.2,
//         discount: 2839.8,
//         totalSales: 16198,
//         tax: null,
//         itemsSold: null,
//         orders: 43,
//         latestSaleTimestamp: null,
//         avgDiscount: 1433,
//         avgNetSales: 9527,
//         avgTotalSales: 10960,
//         avgOrders: 28,
//         sdDiscount: 954,
//         sdNetSales: 2276,
//         sdTotalSales: 3143,
//         sdOrders: 9,
//         zOrders: 1.67,
//         zNetSales: 1.68,
//         zTotalSales: 1.67,
//         consumptionPercentage: 28.12,
//         netConsumptionPercentage: 28.12,
//         netConsumptionQuantity: null,
//         netConsumptionValue: 3756.3,
//         projectedNetSales: 9527,
//         projectedTotalSales: 10960,
//         budget: 4007.46,
//         salesForBudgetAllocation: 13358.2,
//         overConsumption: 0,
//         status: null,
//       },
//       {
//         id: "6",
//         department: {
//           id: "6",
//           outletId: "1",
//           name: "CHINESE",
//           type: "PURCHASE AND SALE",
//           costToSalePercentageGoal: 30,
//           costPerDayGoal: 1000,
//           disabled: false,
//           createdBy: null,
//           updatedBy: null,
//         },
//         consumptionValue: 1914.3,
//         consumptionOpeningValue: 2773.11,
//         consumptionClosingValue: 2773.11,
//         netSales: 9772.3,
//         discount: 425.6,
//         totalSales: 10197.9,
//         tax: null,
//         itemsSold: null,
//         orders: 25,
//         latestSaleTimestamp: null,
//         avgDiscount: 330,
//         avgNetSales: 7314,
//         avgTotalSales: 7645,
//         avgOrders: 19,
//         sdDiscount: 59,
//         sdNetSales: 2333,
//         sdTotalSales: 2381,
//         sdOrders: 4,
//         zOrders: 1.5,
//         zNetSales: 1.05,
//         zTotalSales: 1.07,
//         consumptionPercentage: 19.59,
//         netConsumptionPercentage: 19.59,
//         netConsumptionQuantity: null,
//         netConsumptionValue: 1914.3,
//         projectedNetSales: 7314,
//         projectedTotalSales: 7645,
//         budget: 2931.69,
//         salesForBudgetAllocation: 9772.3,
//         overConsumption: 0,
//         status: null,
//       },
//       {
//         id: "12",
//         department: {
//           id: "12",
//           outletId: "1",
//           name: "ARADHANA MEALS",
//           type: "PURCHASE AND SALE",
//           costToSalePercentageGoal: 30,
//           costPerDayGoal: 1000,
//           disabled: false,
//           createdBy: null,
//           updatedBy: null,
//         },
//         consumptionValue: 3229.9,
//         consumptionOpeningValue: 654,
//         consumptionClosingValue: 654,
//         netSales: 8315.3,
//         discount: 190,
//         totalSales: 8505.3,
//         tax: null,
//         itemsSold: null,
//         orders: 8,
//         latestSaleTimestamp: null,
//         avgDiscount: 262,
//         avgNetSales: 9170,
//         avgTotalSales: 9432,
//         avgOrders: 11,
//         sdDiscount: 188,
//         sdNetSales: 1190,
//         sdTotalSales: 1374,
//         sdOrders: 2,
//         zOrders: -1.5,
//         zNetSales: -0.72,
//         zTotalSales: -0.67,
//         consumptionPercentage: 38.84,
//         netConsumptionPercentage: 38.84,
//         netConsumptionQuantity: null,
//         netConsumptionValue: 3229.9,
//         projectedNetSales: 9170,
//         projectedTotalSales: 9432,
//         budget: 2494.59,
//         salesForBudgetAllocation: 8315.3,
//         overConsumption: 735,
//         status: null,
//       },
//       {
//         id: "1",
//         department: {
//           id: "1",
//           outletId: "1",
//           name: "SOUTH INDIAN",
//           type: "PURCHASE AND SALE",
//           costToSalePercentageGoal: 30,
//           costPerDayGoal: 1000,
//           disabled: false,
//           createdBy: null,
//           updatedBy: null,
//         },
//         consumptionValue: 2220.7,
//         consumptionOpeningValue: 1427.26,
//         consumptionClosingValue: 1427.26,
//         netSales: 7302.8,
//         discount: 877.4,
//         totalSales: 8180.2,
//         tax: null,
//         itemsSold: null,
//         orders: 26,
//         latestSaleTimestamp: null,
//         avgDiscount: 565,
//         avgNetSales: 6410,
//         avgTotalSales: 6975,
//         avgOrders: 22,
//         sdDiscount: 195,
//         sdNetSales: 1388,
//         sdTotalSales: 1495,
//         sdOrders: 4,
//         zOrders: 1,
//         zNetSales: 0.64,
//         zTotalSales: 0.81,
//         consumptionPercentage: 30.41,
//         netConsumptionPercentage: 30.41,
//         netConsumptionQuantity: null,
//         netConsumptionValue: 2220.7,
//         projectedNetSales: 6410,
//         projectedTotalSales: 6975,
//         budget: 2190.84,
//         salesForBudgetAllocation: 7302.8,
//         overConsumption: 29,
//         status: null,
//       },
//       {
//         id: "2",
//         department: {
//           id: "2",
//           outletId: "1",
//           name: "NORTH INDIAN",
//           type: "PURCHASE AND SALE",
//           costToSalePercentageGoal: 30,
//           costPerDayGoal: 1000,
//           disabled: false,
//           createdBy: null,
//           updatedBy: null,
//         },
//         consumptionValue: 1308.1,
//         consumptionOpeningValue: 4718.92,
//         consumptionClosingValue: 4718.92,
//         netSales: 6840.3,
//         discount: 300,
//         totalSales: 7140.3,
//         tax: null,
//         itemsSold: null,
//         orders: 23,
//         latestSaleTimestamp: null,
//         avgDiscount: 415,
//         avgNetSales: 6499,
//         avgTotalSales: 6914,
//         avgOrders: 20,
//         sdDiscount: 236,
//         sdNetSales: 1428,
//         sdTotalSales: 1644,
//         sdOrders: 5,
//         zOrders: 0.6,
//         zNetSales: 0.24,
//         zTotalSales: 0.14,
//         consumptionPercentage: 19.12,
//         netConsumptionPercentage: 19.12,
//         netConsumptionQuantity: null,
//         netConsumptionValue: 1308.1,
//         projectedNetSales: 6499,
//         projectedTotalSales: 6914,
//         budget: 2052.09,
//         salesForBudgetAllocation: 6840.3,
//         overConsumption: 0,
//         status: null,
//       },
//       {
//         id: "3",
//         department: {
//           id: "3",
//           outletId: "1",
//           name: "TANDOOR",
//           type: "PURCHASE AND SALE",
//           costToSalePercentageGoal: 30,
//           costPerDayGoal: 1000,
//           disabled: false,
//           createdBy: null,
//           updatedBy: null,
//         },
//         consumptionValue: 2340.6,
//         consumptionOpeningValue: 1854.26,
//         consumptionClosingValue: 1854.26,
//         netSales: 4166.9,
//         discount: 427.6,
//         totalSales: 4594.5,
//         tax: null,
//         itemsSold: null,
//         orders: 25,
//         latestSaleTimestamp: null,
//         avgDiscount: 441,
//         avgNetSales: 4175,
//         avgTotalSales: 4616,
//         avgOrders: 23,
//         sdDiscount: 38,
//         sdNetSales: 968,
//         sdTotalSales: 972,
//         sdOrders: 4,
//         zOrders: 0.5,
//         zNetSales: -0.01,
//         zTotalSales: -0.02,
//         consumptionPercentage: 56.17,
//         netConsumptionPercentage: 56.17,
//         netConsumptionQuantity: null,
//         netConsumptionValue: 2340.6,
//         projectedNetSales: 4175,
//         projectedTotalSales: 4616,
//         budget: 1250.07,
//         salesForBudgetAllocation: 4166.9,
//         overConsumption: 1090,
//         status: null,
//       },
//       {
//         id: "7",
//         department: {
//           id: "7",
//           outletId: "1",
//           name: "EXOTIC SHAKES",
//           type: "PURCHASE AND SALE",
//           costToSalePercentageGoal: 30,
//           costPerDayGoal: 1000,
//           disabled: false,
//           createdBy: null,
//           updatedBy: null,
//         },
//         consumptionValue: 266.2,
//         consumptionOpeningValue: 3169.27,
//         consumptionClosingValue: 3169.27,
//         netSales: 2242.3,
//         discount: 100,
//         totalSales: 2342.3,
//         tax: null,
//         itemsSold: null,
//         orders: 8,
//         latestSaleTimestamp: null,
//         avgDiscount: 125,
//         avgNetSales: 2180,
//         avgTotalSales: 2305,
//         avgOrders: 10,
//         sdDiscount: 164,
//         sdNetSales: 757,
//         sdTotalSales: 918,
//         sdOrders: 4,
//         zOrders: -0.5,
//         zNetSales: 0.08,
//         zTotalSales: 0.04,
//         consumptionPercentage: 11.87,
//         netConsumptionPercentage: 11.87,
//         netConsumptionQuantity: null,
//         netConsumptionValue: 266.2,
//         projectedNetSales: 2180,
//         projectedTotalSales: 2305,
//         budget: 672.69,
//         salesForBudgetAllocation: 2242.3,
//         overConsumption: 0,
//         status: null,
//       },
//       {
//         id: "8",
//         department: {
//           id: "8",
//           outletId: "1",
//           name: "BEVERAGES",
//           type: "PURCHASE AND SALE",
//           costToSalePercentageGoal: 30,
//           costPerDayGoal: 1000,
//           disabled: false,
//           createdBy: null,
//           updatedBy: null,
//         },
//         consumptionValue: 3561.7,
//         consumptionOpeningValue: 2384.3,
//         consumptionClosingValue: 2384.3,
//         netSales: 1232,
//         discount: 2,
//         totalSales: 1234,
//         tax: null,
//         itemsSold: null,
//         orders: 43,
//         latestSaleTimestamp: null,
//         avgDiscount: 8,
//         avgNetSales: 960,
//         avgTotalSales: 969,
//         avgOrders: 38,
//         sdDiscount: 10,
//         sdNetSales: 224,
//         sdTotalSales: 226,
//         sdOrders: 4,
//         zOrders: 1.25,
//         zNetSales: 1.21,
//         zTotalSales: 1.17,
//         consumptionPercentage: 289.1,
//         netConsumptionPercentage: 289.1,
//         netConsumptionQuantity: null,
//         netConsumptionValue: 3561.7,
//         projectedNetSales: 960,
//         projectedTotalSales: 969,
//         budget: 369.6,
//         salesForBudgetAllocation: 1232,
//         overConsumption: 3192,
//         status: null,
//       },
//       {
//         id: "5",
//         department: {
//           id: "5",
//           outletId: "1",
//           name: "BREAKFAST",
//           type: "PURCHASE AND SALE",
//           costToSalePercentageGoal: 30,
//           costPerDayGoal: 1000,
//           disabled: false,
//           createdBy: null,
//           updatedBy: null,
//         },
//         consumptionValue: 95.3,
//         consumptionOpeningValue: 0,
//         consumptionClosingValue: 0,
//         netSales: 570,
//         discount: 0,
//         totalSales: 570,
//         tax: null,
//         itemsSold: null,
//         orders: 8,
//         latestSaleTimestamp: null,
//         avgDiscount: 0,
//         avgNetSales: 473,
//         avgTotalSales: 473,
//         avgOrders: 6,
//         sdDiscount: 0,
//         sdNetSales: 129,
//         sdTotalSales: 129,
//         sdOrders: 2,
//         zOrders: 1,
//         zNetSales: 0.75,
//         zTotalSales: 0.75,
//         consumptionPercentage: 16.72,
//         netConsumptionPercentage: 16.72,
//         netConsumptionQuantity: null,
//         netConsumptionValue: 95.3,
//         projectedNetSales: 473,
//         projectedTotalSales: 473,
//         budget: 171,
//         salesForBudgetAllocation: 570,
//         overConsumption: 0,
//         status: null,
//       },
//       {
//         id: "25",
//         department: {
//           id: "25",
//           outletId: "1",
//           name: "GALA DINNER",
//           type: "PURCHASE AND SALE",
//           costToSalePercentageGoal: 30,
//           costPerDayGoal: 1000,
//           disabled: false,
//           createdBy: null,
//           updatedBy: null,
//         },
//         consumptionValue: 1137.8,
//         consumptionOpeningValue: 0,
//         consumptionClosingValue: 0,
//         netSales: 0,
//         discount: 0,
//         totalSales: 0,
//         tax: null,
//         itemsSold: null,
//         orders: 0,
//         latestSaleTimestamp: null,
//         avgDiscount: 0,
//         avgNetSales: 0,
//         avgTotalSales: 0,
//         avgOrders: 0,
//         sdDiscount: 0,
//         sdNetSales: 0,
//         sdTotalSales: 0,
//         sdOrders: 0,
//         zOrders: 0,
//         zNetSales: 0,
//         zTotalSales: 0,
//         consumptionPercentage: 0,
//         netConsumptionPercentage: 0,
//         netConsumptionQuantity: null,
//         netConsumptionValue: 1137.8,
//         projectedNetSales: 0,
//         projectedTotalSales: 0,
//         budget: 0,
//         salesForBudgetAllocation: 0,
//         overConsumption: 1137,
//         status: null,
//       },
//       {
//         id: "9",
//         department: {
//           id: "9",
//           outletId: "1",
//           name: "DISPATCH",
//           type: "PURCHASE AND SALE",
//           costToSalePercentageGoal: 30,
//           costPerDayGoal: 1000,
//           disabled: false,
//           createdBy: null,
//           updatedBy: null,
//         },
//         consumptionValue: 1123.1,
//         consumptionOpeningValue: 2308.7,
//         consumptionClosingValue: 2308.7,
//         netSales: 0,
//         discount: 0,
//         totalSales: 0,
//         tax: null,
//         itemsSold: null,
//         orders: 0,
//         latestSaleTimestamp: null,
//         avgDiscount: 0,
//         avgNetSales: 0,
//         avgTotalSales: 0,
//         avgOrders: 0,
//         sdDiscount: 0,
//         sdNetSales: 0,
//         sdTotalSales: 0,
//         sdOrders: 0,
//         zOrders: 0,
//         zNetSales: 0,
//         zTotalSales: 0,
//         consumptionPercentage: 0,
//         netConsumptionPercentage: 0,
//         netConsumptionQuantity: null,
//         netConsumptionValue: 1123.1,
//         projectedNetSales: 0,
//         projectedTotalSales: 0,
//         budget: 0,
//         salesForBudgetAllocation: 0,
//         overConsumption: 1123,
//         status: null,
//       },
//       {
//         id: "24",
//         department: {
//           id: "24",
//           outletId: "1",
//           name: "GALA BREAKFAST",
//           type: "PURCHASE AND SALE",
//           costToSalePercentageGoal: 30,
//           costPerDayGoal: 1000,
//           disabled: false,
//           createdBy: null,
//           updatedBy: null,
//         },
//         consumptionValue: 1053.6,
//         consumptionOpeningValue: 0,
//         consumptionClosingValue: 0,
//         netSales: 0,
//         discount: 0,
//         totalSales: 0,
//         tax: null,
//         itemsSold: null,
//         orders: 0,
//         latestSaleTimestamp: null,
//         avgDiscount: 0,
//         avgNetSales: 0,
//         avgTotalSales: 0,
//         avgOrders: 0,
//         sdDiscount: 0,
//         sdNetSales: 0,
//         sdTotalSales: 0,
//         sdOrders: 0,
//         zOrders: 0,
//         zNetSales: 0,
//         zTotalSales: 0,
//         consumptionPercentage: 0,
//         netConsumptionPercentage: 0,
//         netConsumptionQuantity: null,
//         netConsumptionValue: 1053.6,
//         projectedNetSales: 0,
//         projectedTotalSales: 0,
//         budget: 0,
//         salesForBudgetAllocation: 0,
//         overConsumption: 1053,
//         status: null,
//       },
//       {
//         id: "22",
//         department: {
//           id: "22",
//           outletId: "1",
//           name: "GALA LUNCH",
//           type: "PURCHASE AND SALE",
//           costToSalePercentageGoal: 30,
//           costPerDayGoal: 1000,
//           disabled: false,
//           createdBy: null,
//           updatedBy: null,
//         },
//         consumptionValue: 914.7,
//         consumptionOpeningValue: 0,
//         consumptionClosingValue: 0,
//         netSales: 0,
//         discount: 0,
//         totalSales: 0,
//         tax: null,
//         itemsSold: null,
//         orders: 0,
//         latestSaleTimestamp: null,
//         avgDiscount: 0,
//         avgNetSales: 0,
//         avgTotalSales: 0,
//         avgOrders: 0,
//         sdDiscount: 0,
//         sdNetSales: 0,
//         sdTotalSales: 0,
//         sdOrders: 0,
//         zOrders: 0,
//         zNetSales: 0,
//         zTotalSales: 0,
//         consumptionPercentage: 0,
//         netConsumptionPercentage: 0,
//         netConsumptionQuantity: null,
//         netConsumptionValue: 914.7,
//         projectedNetSales: 0,
//         projectedTotalSales: 0,
//         budget: 0,
//         salesForBudgetAllocation: 0,
//         overConsumption: 914,
//         status: null,
//       },
//       {
//         id: "13",
//         department: {
//           id: "13",
//           outletId: "1",
//           name: "STAFF",
//           type: "PURCHASE AND SALE",
//           costToSalePercentageGoal: 30,
//           costPerDayGoal: 1000,
//           disabled: false,
//           createdBy: null,
//           updatedBy: null,
//         },
//         consumptionValue: 860.2,
//         consumptionOpeningValue: 0,
//         consumptionClosingValue: 0,
//         netSales: 0,
//         discount: 0,
//         totalSales: 0,
//         tax: null,
//         itemsSold: null,
//         orders: 0,
//         latestSaleTimestamp: null,
//         avgDiscount: 0,
//         avgNetSales: 0,
//         avgTotalSales: 0,
//         avgOrders: 0,
//         sdDiscount: 0,
//         sdNetSales: 0,
//         sdTotalSales: 0,
//         sdOrders: 0,
//         zOrders: 0,
//         zNetSales: 0,
//         zTotalSales: 0,
//         consumptionPercentage: 0,
//         netConsumptionPercentage: 0,
//         netConsumptionQuantity: null,
//         netConsumptionValue: 860.2,
//         projectedNetSales: 0,
//         projectedTotalSales: 0,
//         budget: 0,
//         salesForBudgetAllocation: 0,
//         overConsumption: 860,
//         status: null,
//       },
//     ],
//   },
// }) {
//   const { chartData, total } =
//     consumptionDepartmentDistributionChartDataFormatter(apiData);

//   // 🎨 Color palette
//   const [metric, setMetric] = useState("Consumption Quantity (GM)");

//   // 🎨 Color palette
//   const COLOR_PALETTE = [
//     "#4E79FF",
//     "#10B981",
//     "#F59E0B",
//     "#EF4444",
//     "#A855F7",
//     "#06B6D4",
//     "#EAB308",
//     "#3B82F6",
//     "#F97316",
//     "#D946EF",
//     "#F43F5E",
//     "#22C55E",
//     "#6B7280",
//   ];

//   // Shuffle colors randomly but consistently
//   const COLORS = useMemo(() => {
//     const shuffled = [...COLOR_PALETTE].sort(() => 0.5 - Math.random());
//     return chartData.map((_, index) => shuffled[index % shuffled.length]);
//   }, [chartData]);

//   return (
//     <Card
//       style={{
//         borderRadius: "16px",
//         backgroundColor: "#fff",
//         border: "none",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//         padding: "20px",
//       }}
//     >
//       {/* Header */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           background: "linear-gradient(90deg, #fce7f3, #fbcfe8)",
//           borderRadius: "12px",
//           padding: "12px 16px",
//           marginBottom: "20px",
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <div
//             style={{
//               backgroundColor: "#EC4899",
//               padding: "8px",
//               borderRadius: "8px",
//             }}
//           >
//             {chartData[0]?.icon}
//           </div>
//           <div>
//             <h5
//               style={{
//                 margin: 0,
//                 fontSize: "16px",
//                 fontWeight: 600,
//                 color: "#111827",
//               }}
//             >
//               Department Distribution Chart
//             </h5>
//             <p
//               style={{
//                 margin: 0,
//                 fontSize: "13px",
//                 color: "#6B7280",
//               }}
//             >
//               Visual breakdown of departmental metrics
//             </p>
//           </div>
//         </div>

//         {/* 🔽 Dropdown */}
//         <Dropdown>
//           <Dropdown.Toggle
//             variant="light"
//             style={{
//               border: "1px solid #E5E7EB",
//               padding: "6px 12px",
//               borderRadius: "8px",
//               backgroundColor: "#fff",
//               fontSize: "13px",
//               fontWeight: 500,
//               color: "#111827",
//             }}
//           >
//             {metric}
//           </Dropdown.Toggle>
//           <Dropdown.Menu>
//             <Dropdown.Item
//               onClick={() => setMetric("Consumption Quantity (GM)")}
//             >
//               Consumption Quantity (GM)
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setMetric("Consumption Value (₹)")}>
//               Consumption Value (₹)
//             </Dropdown.Item>
//             <Dropdown.Item onClick={() => setMetric("Consumption Units")}>
//               Consumption Units
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>

//       <Row>
//         {/* Pie Chart */}
//         <Col md={7}>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={chartData}
//                 dataKey="value"
//                 innerRadius={70}
//                 outerRadius={100}
//                 paddingAngle={3}
//               >
//                 {chartData.map((_, index) => (
//                   <Cell key={index} fill={COLORS[index]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </Col>

//         {/* List */}
//         <Col md={5}>
//           <div style={{ marginBottom: "10px", fontWeight: 600 }}>{metric}</div>
//           {chartData.map((item, index) => (
//             <div
//               key={item.id}
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 padding: "10px 12px",
//                 borderRadius: "12px",
//                 marginBottom: "8px",
//                 background: "#F9FAFB",
//               }}
//             >
//               <div
//                 style={{ display: "flex", alignItems: "center", gap: "8px" }}
//               >
//                 <div style={{ fontSize: "18px" }}>{item.icon}</div>
//                 <div style={{ fontSize: "14px", fontWeight: 500 }}>
//                   {item.name}
//                 </div>
//               </div>
//               <div style={{ textAlign: "right" }}>
//                 <div style={{ fontWeight: 600, fontSize: "14px" }}>
//                   {item.value.toFixed(1)} GM
//                 </div>
//                 <div style={{ fontSize: "12px", color: "#6B7280" }}>
//                   {item.percentage}%
//                 </div>
//               </div>
//             </div>
//           ))}

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               padding: "12px",
//               borderRadius: "12px",
//               marginTop: "12px",
//               background: "#F3F4F6",
//               fontWeight: 700,
//             }}
//           >
//             <span>Total</span>
//             <span>{total} GM</span>
//           </div>
//         </Col>
//       </Row>
//     </Card>
//   );
// }
