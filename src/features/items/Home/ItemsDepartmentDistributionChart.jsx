"use client";

import React, { useState } from "react";
import { Card, Row, Col, Dropdown } from "react-bootstrap";
import { departmentDistributionChartDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
import { useDepartmentsUsageList } from "@/services/department-service";
import { useItemsContext } from "@/contexts/ItemsContext";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import ItemsDepartmentDistributionChartGraph from "@/components/common/items/GraphWrapper/ItemsDepartmentDistributionChartGraph";
import ItemsDepartmentDistributionChartTable from "@/components/common/items/TableSort/ItemsDepartmentDistributionChartTable";

export default function ItemsDepartmentDistributionChart() {
  const { startDate, endDate } = useItemsContext();
  const [selectedKey, setSelectedKey] = useState("consumptionValue");

  return (
    <ServiceRenderer
      queryHook={useDepartmentsUsageList}
      queryKey={[
        "departmentsUsageListChart",
        { startdt: startDate, enddt: endDate },
      ]}
      queryFn={() =>
        useDepartmentsUsageList({
          startdt: startDate,
          enddt: endDate,
        }).queryFn
      }
      queryArgs={[{ startdt: startDate, enddt: endDate, outlet: 1, userId: 7 }]}
      formatter={(data) =>
        departmentDistributionChartDataFormatter(data, selectedKey)
      }
      shimmerCount={1}
    >
      {({ formatted, total }) => (
        <Card className="p-2 pt-0 shadow-sm" style={{ borderRadius: "16px" }}>
          {/* Header */}
          <Row
            className="mb-3 p-3 align-items-center"
            style={{
              backgroundColor: "rgb(251,244,252)",
            }}
          >
            <Col>
              <h5 className="fw-bold mb-0">Department Distribution Chart</h5>
              <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
                Visual breakdown of departmental metrics
              </p>
            </Col>
            <Col xs="auto">
              <Dropdown onSelect={(k) => setSelectedKey(k)}>
                <Dropdown.Toggle
                  variant="light"
                  className="border rounded-pill px-3"
                >
                  {selectedKey === "consumptionValue"
                    ? "Consumption Quantity (GM)"
                    : "Net Sales"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="consumptionValue">
                    Consumption Quantity (GM)
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="netSales">Net Sales</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          {/* Graph + Table */}
          <Row>
            <ItemsDepartmentDistributionChartGraph formatted={formatted} />
            <ItemsDepartmentDistributionChartTable
              formatted={formatted}
              total={total}
              selectedKey={selectedKey}
            />
          </Row>
        </Card>
      )}
    </ServiceRenderer>
  );
}
// "use client";

// import React, { useState } from "react";
// import { Card, Row, Col, Dropdown } from "react-bootstrap";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
// import { departmentDistributionChartDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";
// import { useDepartmentsUsageList } from "@/services/department-service";
// import { useItemsContext } from "@/contexts/ItemsContext";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";

// export default function ItemsDepartmentDistributionChart() {
//   const { startDate, endDate } = useItemsContext();
//   const [selectedKey, setSelectedKey] = useState("consumptionValue");

//   return (
//     <ServiceRenderer
//       queryHook={useDepartmentsUsageList}
//       queryKey={[
//         "departmentsUsageListChart",
//         { startdt: startDate, enddt: endDate },
//       ]}
//       queryFn={() =>
//         useDepartmentsUsageList({
//           startdt: startDate,
//           enddt: endDate,
//         }).queryFn
//       }
//       queryArgs={[{ startdt: startDate, enddt: endDate,outlet:1,userId:7 }]}
//       formatter={(data) =>
//         departmentDistributionChartDataFormatter(data, selectedKey)
//       }
//       shimmerCount={1}
//     >
//       {({ formatted, total }) => (
//         <Card className="p-4 shadow-sm" style={{ borderRadius: "16px" }}>
//           {/* Header */}
//           <Row className="mb-3 align-items-center">
//             <Col>
//               <h5 className="fw-bold mb-0">Department Distribution Chart</h5>
//               <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
//                 Visual breakdown of departmental metrics
//               </p>
//             </Col>
//             <Col xs="auto">
//               <Dropdown onSelect={(k) => setSelectedKey(k)}>
//                 <Dropdown.Toggle
//                   variant="light"
//                   className="border rounded-pill px-3"
//                 >
//                   {selectedKey === "consumptionValue"
//                     ? "Consumption Quantity (GM)"
//                     : "Net Sales"}
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu>
//                   <Dropdown.Item eventKey="consumptionValue">
//                     Consumption Quantity (GM)
//                   </Dropdown.Item>
//                   <Dropdown.Item eventKey="netSales">Net Sales</Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown>
//             </Col>
//           </Row>

//           {/* Chart + Legend */}
//           <Row>
//             {/* Donut Chart */}
//             <Col md={6} className="d-flex justify-content-center">
//               <div style={{ width: "260px", height: "260px" }}>
//                 <ResponsiveContainer>
//                   <PieChart>
//                     <Pie
//                       data={formatted}
//                       dataKey="value"
//                       nameKey="name"
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={70}
//                       outerRadius={100}
//                       paddingAngle={3}
//                     >
//                       {formatted?.map((entry, index) => (
//                         <Cell
//                           key={`cell-${index}`}
//                           fill={entry.color}
//                           stroke="#fff"
//                           strokeWidth={2}
//                         />
//                       ))}
//                     </Pie>
//                     <Tooltip
//                       formatter={(value, name) => [`${value}`, name]}
//                       contentStyle={{ borderRadius: "12px" }}
//                     />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </Col>

//             {/* Right Legend */}
//             <Col md={6}>
//               <h6 className="fw-bold mb-3">
//                 {selectedKey === "consumptionValue"
//                   ? "Consumption Quantity (GM)"
//                   : "Net Sales"}
//               </h6>
//               {formatted?.map((d) => (
//                 <div
//                   key={d.id}
//                   className="d-flex justify-content-between align-items-center mb-3"
//                 >
//                   <div className="d-flex align-items-center">
//                     <span
//                       style={{
//                         width: "12px",
//                         height: "12px",
//                         borderRadius: "50%",
//                         backgroundColor: d.color,
//                         display: "inline-block",
//                         marginRight: "8px",
//                       }}
//                     />
//                     <d.Icon style={{ color: d.color, marginRight: "6px" }} />
//                     <span>{d.name}</span>
//                   </div>
//                   <div className="text-end">
//                     <strong>{d.value}</strong>{" "}
//                     <span className="text-muted">{d.percentage}%</span>
//                   </div>
//                 </div>
//               ))}

//               <div className="d-flex justify-content-between border-top pt-3 mt-3">
//                 <span className="fw-bold">Total</span>
//                 <span className="fw-bold">{total}</span>
//               </div>
//             </Col>
//           </Row>
//         </Card>
//       )}
//     </ServiceRenderer>
//   );
// }

// // "use client";

// // import React, { useState } from "react";
// // import { Card, Row, Col, Dropdown } from "react-bootstrap";
// // import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
// // import { departmentDistributionChartDataFormatter } from "@/utils/data_formatters/itemsPageDataFormatter";

// // export default function ItemsDepartmentDistributionChart({
// //   apiResponse = {
// //     etag: "452307565",
// //     consumptionValue: 22157.5,
// //     netConsumptionValue: 22157.5,
// //     netSales: 53800.1,
// //     totalSales: 58962.5,
// //     consumptionPercentage: 41.18,
// //     netConsumptionPercentage: 41.18,
// //     budget: 16140.03,
// //     targetConsumptionPercentage: 30,
// //     list: [
// //       {
// //         id: "4",
// //         department: {
// //           id: "4",
// //           outletId: "1",
// //           name: "BIRYANI",
// //           type: "PURCHASE AND SALE",
// //           costToSalePercentageGoal: 30,
// //           costPerDayGoal: 1000,
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         consumptionValue: 2516.3,
// //         consumptionOpeningValue: 2805.4,
// //         consumptionClosingValue: 2805.4,
// //         netSales: 13358.2,
// //         discount: 2839.8,
// //         totalSales: 16198,
// //         tax: null,
// //         itemsSold: null,
// //         orders: 43,
// //         latestSaleTimestamp: null,
// //         avgDiscount: 1433,
// //         avgNetSales: 9527,
// //         avgTotalSales: 10960,
// //         avgOrders: 28,
// //         sdDiscount: 954,
// //         sdNetSales: 2276,
// //         sdTotalSales: 3143,
// //         sdOrders: 9,
// //         zOrders: 1.67,
// //         zNetSales: 1.68,
// //         zTotalSales: 1.67,
// //         consumptionPercentage: 18.84,
// //         netConsumptionPercentage: 18.84,
// //         netConsumptionQuantity: null,
// //         netConsumptionValue: 2516.3,
// //         projectedNetSales: 9527,
// //         projectedTotalSales: 10960,
// //         budget: 4007.46,
// //         salesForBudgetAllocation: 13358.2,
// //         overConsumption: 0,
// //         status: null,
// //       },
// //       {
// //         id: "6",
// //         department: {
// //           id: "6",
// //           outletId: "1",
// //           name: "CHINESE",
// //           type: "PURCHASE AND SALE",
// //           costToSalePercentageGoal: 30,
// //           costPerDayGoal: 1000,
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         consumptionValue: 1914.3,
// //         consumptionOpeningValue: 2773.11,
// //         consumptionClosingValue: 2773.11,
// //         netSales: 9772.3,
// //         discount: 425.6,
// //         totalSales: 10197.9,
// //         tax: null,
// //         itemsSold: null,
// //         orders: 25,
// //         latestSaleTimestamp: null,
// //         avgDiscount: 330,
// //         avgNetSales: 7314,
// //         avgTotalSales: 7645,
// //         avgOrders: 19,
// //         sdDiscount: 59,
// //         sdNetSales: 2333,
// //         sdTotalSales: 2381,
// //         sdOrders: 4,
// //         zOrders: 1.5,
// //         zNetSales: 1.05,
// //         zTotalSales: 1.07,
// //         consumptionPercentage: 19.59,
// //         netConsumptionPercentage: 19.59,
// //         netConsumptionQuantity: null,
// //         netConsumptionValue: 1914.3,
// //         projectedNetSales: 7314,
// //         projectedTotalSales: 7645,
// //         budget: 2931.69,
// //         salesForBudgetAllocation: 9772.3,
// //         overConsumption: 0,
// //         status: null,
// //       },
// //       {
// //         id: "12",
// //         department: {
// //           id: "12",
// //           outletId: "1",
// //           name: "ARADHANA MEALS",
// //           type: "PURCHASE AND SALE",
// //           costToSalePercentageGoal: 30,
// //           costPerDayGoal: 1000,
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         consumptionValue: 3229.9,
// //         consumptionOpeningValue: 654,
// //         consumptionClosingValue: 654,
// //         netSales: 8315.3,
// //         discount: 190,
// //         totalSales: 8505.3,
// //         tax: null,
// //         itemsSold: null,
// //         orders: 8,
// //         latestSaleTimestamp: null,
// //         avgDiscount: 262,
// //         avgNetSales: 9170,
// //         avgTotalSales: 9432,
// //         avgOrders: 11,
// //         sdDiscount: 188,
// //         sdNetSales: 1190,
// //         sdTotalSales: 1374,
// //         sdOrders: 2,
// //         zOrders: -1.5,
// //         zNetSales: -0.72,
// //         zTotalSales: -0.67,
// //         consumptionPercentage: 38.84,
// //         netConsumptionPercentage: 38.84,
// //         netConsumptionQuantity: null,
// //         netConsumptionValue: 3229.9,
// //         projectedNetSales: 9170,
// //         projectedTotalSales: 9432,
// //         budget: 2494.59,
// //         salesForBudgetAllocation: 8315.3,
// //         overConsumption: 735,
// //         status: null,
// //       },
// //       {
// //         id: "1",
// //         department: {
// //           id: "1",
// //           outletId: "1",
// //           name: "SOUTH INDIAN",
// //           type: "PURCHASE AND SALE",
// //           costToSalePercentageGoal: 30,
// //           costPerDayGoal: 1000,
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         consumptionValue: 1835.7,
// //         consumptionOpeningValue: 1427.26,
// //         consumptionClosingValue: 1427.26,
// //         netSales: 7302.8,
// //         discount: 877.4,
// //         totalSales: 8180.2,
// //         tax: null,
// //         itemsSold: null,
// //         orders: 26,
// //         latestSaleTimestamp: null,
// //         avgDiscount: 565,
// //         avgNetSales: 6410,
// //         avgTotalSales: 6975,
// //         avgOrders: 22,
// //         sdDiscount: 195,
// //         sdNetSales: 1388,
// //         sdTotalSales: 1495,
// //         sdOrders: 4,
// //         zOrders: 1,
// //         zNetSales: 0.64,
// //         zTotalSales: 0.81,
// //         consumptionPercentage: 25.14,
// //         netConsumptionPercentage: 25.14,
// //         netConsumptionQuantity: null,
// //         netConsumptionValue: 1835.7,
// //         projectedNetSales: 6410,
// //         projectedTotalSales: 6975,
// //         budget: 2190.84,
// //         salesForBudgetAllocation: 7302.8,
// //         overConsumption: 0,
// //         status: null,
// //       },
// //       {
// //         id: "2",
// //         department: {
// //           id: "2",
// //           outletId: "1",
// //           name: "NORTH INDIAN",
// //           type: "PURCHASE AND SALE",
// //           costToSalePercentageGoal: 30,
// //           costPerDayGoal: 1000,
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         consumptionValue: 1308.1,
// //         consumptionOpeningValue: 4718.92,
// //         consumptionClosingValue: 4718.92,
// //         netSales: 6840.3,
// //         discount: 300,
// //         totalSales: 7140.3,
// //         tax: null,
// //         itemsSold: null,
// //         orders: 23,
// //         latestSaleTimestamp: null,
// //         avgDiscount: 415,
// //         avgNetSales: 6499,
// //         avgTotalSales: 6914,
// //         avgOrders: 20,
// //         sdDiscount: 236,
// //         sdNetSales: 1428,
// //         sdTotalSales: 1644,
// //         sdOrders: 5,
// //         zOrders: 0.6,
// //         zNetSales: 0.24,
// //         zTotalSales: 0.14,
// //         consumptionPercentage: 19.12,
// //         netConsumptionPercentage: 19.12,
// //         netConsumptionQuantity: null,
// //         netConsumptionValue: 1308.1,
// //         projectedNetSales: 6499,
// //         projectedTotalSales: 6914,
// //         budget: 2052.09,
// //         salesForBudgetAllocation: 6840.3,
// //         overConsumption: 0,
// //         status: null,
// //       },
// //       {
// //         id: "3",
// //         department: {
// //           id: "3",
// //           outletId: "1",
// //           name: "TANDOOR",
// //           type: "PURCHASE AND SALE",
// //           costToSalePercentageGoal: 30,
// //           costPerDayGoal: 1000,
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         consumptionValue: 2340.6,
// //         consumptionOpeningValue: 1854.26,
// //         consumptionClosingValue: 1854.26,
// //         netSales: 4166.9,
// //         discount: 427.6,
// //         totalSales: 4594.5,
// //         tax: null,
// //         itemsSold: null,
// //         orders: 25,
// //         latestSaleTimestamp: null,
// //         avgDiscount: 441,
// //         avgNetSales: 4175,
// //         avgTotalSales: 4616,
// //         avgOrders: 23,
// //         sdDiscount: 38,
// //         sdNetSales: 968,
// //         sdTotalSales: 972,
// //         sdOrders: 4,
// //         zOrders: 0.5,
// //         zNetSales: -0.01,
// //         zTotalSales: -0.02,
// //         consumptionPercentage: 56.17,
// //         netConsumptionPercentage: 56.17,
// //         netConsumptionQuantity: null,
// //         netConsumptionValue: 2340.6,
// //         projectedNetSales: 4175,
// //         projectedTotalSales: 4616,
// //         budget: 1250.07,
// //         salesForBudgetAllocation: 4166.9,
// //         overConsumption: 1090,
// //         status: null,
// //       },
// //       {
// //         id: "7",
// //         department: {
// //           id: "7",
// //           outletId: "1",
// //           name: "EXOTIC SHAKES",
// //           type: "PURCHASE AND SALE",
// //           costToSalePercentageGoal: 30,
// //           costPerDayGoal: 1000,
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         consumptionValue: 266.2,
// //         consumptionOpeningValue: 3169.27,
// //         consumptionClosingValue: 3169.27,
// //         netSales: 2242.3,
// //         discount: 100,
// //         totalSales: 2342.3,
// //         tax: null,
// //         itemsSold: null,
// //         orders: 8,
// //         latestSaleTimestamp: null,
// //         avgDiscount: 125,
// //         avgNetSales: 1867,
// //         avgTotalSales: 1992,
// //         avgOrders: 8,
// //         sdDiscount: 164,
// //         sdNetSales: 1033,
// //         sdTotalSales: 1189,
// //         sdOrders: 5,
// //         zOrders: 0,
// //         zNetSales: 0.36,
// //         zTotalSales: 0.29,
// //         consumptionPercentage: 11.87,
// //         netConsumptionPercentage: 11.87,
// //         netConsumptionQuantity: null,
// //         netConsumptionValue: 266.2,
// //         projectedNetSales: 1867,
// //         projectedTotalSales: 1992,
// //         budget: 672.69,
// //         salesForBudgetAllocation: 2242.3,
// //         overConsumption: 0,
// //         status: null,
// //       },
// //       {
// //         id: "8",
// //         department: {
// //           id: "8",
// //           outletId: "1",
// //           name: "BEVERAGES",
// //           type: "PURCHASE AND SALE",
// //           costToSalePercentageGoal: 30,
// //           costPerDayGoal: 1000,
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         consumptionValue: 3561.7,
// //         consumptionOpeningValue: 2384.3,
// //         consumptionClosingValue: 2384.3,
// //         netSales: 1232,
// //         discount: 2,
// //         totalSales: 1234,
// //         tax: null,
// //         itemsSold: null,
// //         orders: 43,
// //         latestSaleTimestamp: null,
// //         avgDiscount: 8,
// //         avgNetSales: 960,
// //         avgTotalSales: 969,
// //         avgOrders: 38,
// //         sdDiscount: 10,
// //         sdNetSales: 224,
// //         sdTotalSales: 226,
// //         sdOrders: 4,
// //         zOrders: 1.25,
// //         zNetSales: 1.21,
// //         zTotalSales: 1.17,
// //         consumptionPercentage: 289.1,
// //         netConsumptionPercentage: 289.1,
// //         netConsumptionQuantity: null,
// //         netConsumptionValue: 3561.7,
// //         projectedNetSales: 960,
// //         projectedTotalSales: 969,
// //         budget: 369.6,
// //         salesForBudgetAllocation: 1232,
// //         overConsumption: 3192,
// //         status: null,
// //       },
// //       {
// //         id: "5",
// //         department: {
// //           id: "5",
// //           outletId: "1",
// //           name: "BREAKFAST",
// //           type: "PURCHASE AND SALE",
// //           costToSalePercentageGoal: 30,
// //           costPerDayGoal: 1000,
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         consumptionValue: 95.3,
// //         consumptionOpeningValue: 0,
// //         consumptionClosingValue: 0,
// //         netSales: 570,
// //         discount: 0,
// //         totalSales: 570,
// //         tax: null,
// //         itemsSold: null,
// //         orders: 8,
// //         latestSaleTimestamp: null,
// //         avgDiscount: 0,
// //         avgNetSales: 473,
// //         avgTotalSales: 473,
// //         avgOrders: 6,
// //         sdDiscount: 0,
// //         sdNetSales: 129,
// //         sdTotalSales: 129,
// //         sdOrders: 2,
// //         zOrders: 1,
// //         zNetSales: 0.75,
// //         zTotalSales: 0.75,
// //         consumptionPercentage: 16.72,
// //         netConsumptionPercentage: 16.72,
// //         netConsumptionQuantity: null,
// //         netConsumptionValue: 95.3,
// //         projectedNetSales: 473,
// //         projectedTotalSales: 473,
// //         budget: 171,
// //         salesForBudgetAllocation: 570,
// //         overConsumption: 0,
// //         status: null,
// //       },
// //       {
// //         id: "25",
// //         department: {
// //           id: "25",
// //           outletId: "1",
// //           name: "GALA DINNER",
// //           type: "PURCHASE AND SALE",
// //           costToSalePercentageGoal: 30,
// //           costPerDayGoal: 1000,
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         consumptionValue: 1137.8,
// //         consumptionOpeningValue: 0,
// //         consumptionClosingValue: 0,
// //         netSales: 0,
// //         discount: 0,
// //         totalSales: 0,
// //         tax: null,
// //         itemsSold: null,
// //         orders: 0,
// //         latestSaleTimestamp: null,
// //         avgDiscount: 0,
// //         avgNetSales: 0,
// //         avgTotalSales: 0,
// //         avgOrders: 0,
// //         sdDiscount: 0,
// //         sdNetSales: 0,
// //         sdTotalSales: 0,
// //         sdOrders: 0,
// //         zOrders: 0,
// //         zNetSales: 0,
// //         zTotalSales: 0,
// //         consumptionPercentage: 0,
// //         netConsumptionPercentage: 0,
// //         netConsumptionQuantity: null,
// //         netConsumptionValue: 1137.8,
// //         projectedNetSales: 0,
// //         projectedTotalSales: 0,
// //         budget: 0,
// //         salesForBudgetAllocation: 0,
// //         overConsumption: 1137,
// //         status: null,
// //       },
// //       {
// //         id: "9",
// //         department: {
// //           id: "9",
// //           outletId: "1",
// //           name: "DISPATCH",
// //           type: "PURCHASE AND SALE",
// //           costToSalePercentageGoal: 30,
// //           costPerDayGoal: 1000,
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         consumptionValue: 1123.1,
// //         consumptionOpeningValue: 2308.7,
// //         consumptionClosingValue: 2308.7,
// //         netSales: 0,
// //         discount: 0,
// //         totalSales: 0,
// //         tax: null,
// //         itemsSold: null,
// //         orders: 0,
// //         latestSaleTimestamp: null,
// //         avgDiscount: 0,
// //         avgNetSales: 0,
// //         avgTotalSales: 0,
// //         avgOrders: 0,
// //         sdDiscount: 0,
// //         sdNetSales: 0,
// //         sdTotalSales: 0,
// //         sdOrders: 0,
// //         zOrders: 0,
// //         zNetSales: 0,
// //         zTotalSales: 0,
// //         consumptionPercentage: 0,
// //         netConsumptionPercentage: 0,
// //         netConsumptionQuantity: null,
// //         netConsumptionValue: 1123.1,
// //         projectedNetSales: 0,
// //         projectedTotalSales: 0,
// //         budget: 0,
// //         salesForBudgetAllocation: 0,
// //         overConsumption: 1123,
// //         status: null,
// //       },
// //       {
// //         id: "24",
// //         department: {
// //           id: "24",
// //           outletId: "1",
// //           name: "GALA BREAKFAST",
// //           type: "PURCHASE AND SALE",
// //           costToSalePercentageGoal: 30,
// //           costPerDayGoal: 1000,
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         consumptionValue: 1053.6,
// //         consumptionOpeningValue: 0,
// //         consumptionClosingValue: 0,
// //         netSales: 0,
// //         discount: 0,
// //         totalSales: 0,
// //         tax: null,
// //         itemsSold: null,
// //         orders: 0,
// //         latestSaleTimestamp: null,
// //         avgDiscount: 0,
// //         avgNetSales: 0,
// //         avgTotalSales: 0,
// //         avgOrders: 0,
// //         sdDiscount: 0,
// //         sdNetSales: 0,
// //         sdTotalSales: 0,
// //         sdOrders: 0,
// //         zOrders: 0,
// //         zNetSales: 0,
// //         zTotalSales: 0,
// //         consumptionPercentage: 0,
// //         netConsumptionPercentage: 0,
// //         netConsumptionQuantity: null,
// //         netConsumptionValue: 1053.6,
// //         projectedNetSales: 0,
// //         projectedTotalSales: 0,
// //         budget: 0,
// //         salesForBudgetAllocation: 0,
// //         overConsumption: 1053,
// //         status: null,
// //       },
// //       {
// //         id: "22",
// //         department: {
// //           id: "22",
// //           outletId: "1",
// //           name: "GALA LUNCH",
// //           type: "PURCHASE AND SALE",
// //           costToSalePercentageGoal: 30,
// //           costPerDayGoal: 1000,
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         consumptionValue: 914.7,
// //         consumptionOpeningValue: 0,
// //         consumptionClosingValue: 0,
// //         netSales: 0,
// //         discount: 0,
// //         totalSales: 0,
// //         tax: null,
// //         itemsSold: null,
// //         orders: 0,
// //         latestSaleTimestamp: null,
// //         avgDiscount: 0,
// //         avgNetSales: 0,
// //         avgTotalSales: 0,
// //         avgOrders: 0,
// //         sdDiscount: 0,
// //         sdNetSales: 0,
// //         sdTotalSales: 0,
// //         sdOrders: 0,
// //         zOrders: 0,
// //         zNetSales: 0,
// //         zTotalSales: 0,
// //         consumptionPercentage: 0,
// //         netConsumptionPercentage: 0,
// //         netConsumptionQuantity: null,
// //         netConsumptionValue: 914.7,
// //         projectedNetSales: 0,
// //         projectedTotalSales: 0,
// //         budget: 0,
// //         salesForBudgetAllocation: 0,
// //         overConsumption: 914,
// //         status: null,
// //       },
// //       {
// //         id: "13",
// //         department: {
// //           id: "13",
// //           outletId: "1",
// //           name: "STAFF",
// //           type: "PURCHASE AND SALE",
// //           costToSalePercentageGoal: 30,
// //           costPerDayGoal: 1000,
// //           disabled: false,
// //           createdBy: null,
// //           updatedBy: null,
// //         },
// //         consumptionValue: 860.2,
// //         consumptionOpeningValue: 0,
// //         consumptionClosingValue: 0,
// //         netSales: 0,
// //         discount: 0,
// //         totalSales: 0,
// //         tax: null,
// //         itemsSold: null,
// //         orders: 0,
// //         latestSaleTimestamp: null,
// //         avgDiscount: 0,
// //         avgNetSales: 0,
// //         avgTotalSales: 0,
// //         avgOrders: 0,
// //         sdDiscount: 0,
// //         sdNetSales: 0,
// //         sdTotalSales: 0,
// //         sdOrders: 0,
// //         zOrders: 0,
// //         zNetSales: 0,
// //         zTotalSales: 0,
// //         consumptionPercentage: 0,
// //         netConsumptionPercentage: 0,
// //         netConsumptionQuantity: null,
// //         netConsumptionValue: 860.2,
// //         projectedNetSales: 0,
// //         projectedTotalSales: 0,
// //         budget: 0,
// //         salesForBudgetAllocation: 0,
// //         overConsumption: 860,
// //         status: null,
// //       },
// //     ],
// //   },
// // }) {
// //   const [selectedKey, setSelectedKey] = useState("consumptionValue");

// //   const { formatted, total } = departmentDistributionChartDataFormatter(
// //     apiResponse,
// //     selectedKey
// //   );

// //   return (
// //     <Card className="p-4 shadow-sm" style={{ borderRadius: "16px" }}>
// //       {/* Header */}
// //       <Row className="mb-3 align-items-center">
// //         <Col>
// //           <h5 className="fw-bold mb-0">Department Distribution Chart</h5>
// //           <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
// //             Visual breakdown of departmental metrics
// //           </p>
// //         </Col>
// //         <Col xs="auto">
// //           <Dropdown onSelect={(k) => setSelectedKey(k)}>
// //             <Dropdown.Toggle
// //               variant="light"
// //               className="border rounded-pill px-3"
// //             >
// //               {selectedKey === "consumptionValue"
// //                 ? "Consumption Quantity (GM)"
// //                 : "Net Sales"}
// //             </Dropdown.Toggle>
// //             <Dropdown.Menu>
// //               <Dropdown.Item eventKey="consumptionValue">
// //                 Consumption Quantity (GM)
// //               </Dropdown.Item>
// //               <Dropdown.Item eventKey="netSales">Net Sales</Dropdown.Item>
// //             </Dropdown.Menu>
// //           </Dropdown>
// //         </Col>
// //       </Row>

// //       {/* Chart + Legend */}
// //       <Row>
// //         {/* Donut Chart */}
// //         <Col md={6} className="d-flex justify-content-center">
// //           <div style={{ width: "260px", height: "260px" }}>
// //             <ResponsiveContainer>
// //               <PieChart>
// //                 <Pie
// //                   data={formatted}
// //                   dataKey="value"
// //                   nameKey="name"
// //                   cx="50%"
// //                   cy="50%"
// //                   innerRadius={70}
// //                   outerRadius={100}
// //                   paddingAngle={3}
// //                 >
// //                   {formatted.map((entry, index) => (
// //                     <Cell
// //                       key={`cell-${index}`}
// //                       fill={entry.color}
// //                       stroke="#fff"
// //                       strokeWidth={2}
// //                     />
// //                   ))}
// //                 </Pie>
// //                 <Tooltip
// //                   formatter={(value, name) => [`${value}`, name]}
// //                   contentStyle={{ borderRadius: "12px" }}
// //                 />
// //               </PieChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </Col>

// //         {/* Right Legend */}
// //         <Col md={6}>
// //           <h6 className="fw-bold mb-3">
// //             {selectedKey === "consumptionValue"
// //               ? "Consumption Quantity (GM)"
// //               : "Net Sales"}
// //           </h6>
// //           {formatted.map((d) => (
// //             <div
// //               key={d.id}
// //               className="d-flex justify-content-between align-items-center mb-3"
// //             >
// //               <div className="d-flex align-items-center">
// //                 <span
// //                   style={{
// //                     width: "12px",
// //                     height: "12px",
// //                     borderRadius: "50%",
// //                     backgroundColor: d.color,
// //                     display: "inline-block",
// //                     marginRight: "8px",
// //                   }}
// //                 />
// //                 <d.Icon style={{ color: d.color, marginRight: "6px" }} />
// //                 <span>{d.name}</span>
// //               </div>
// //               <div className="text-end">
// //                 <strong>{d.value}</strong>{" "}
// //                 <span className="text-muted">{d.percentage}%</span>
// //               </div>
// //             </div>
// //           ))}

// //           <div className="d-flex justify-content-between border-top pt-3 mt-3">
// //             <span className="fw-bold">Total</span>
// //             <span className="fw-bold">{total}</span>
// //           </div>
// //         </Col>
// //       </Row>
// //     </Card>
// //   );
// // }
