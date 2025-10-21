"use client";

import React, { useEffect, useState } from "react";
import {
  useProductSummaryDaily,
  useProductSummarySameDay,
  useProductSummaryWeekly,
  useProductSummaryMonthly,
} from "@/services/product-service";
import { productsTrendAnalysisDataFormatter } from "@/utils/data_formatters/productsPageDataFormatter";
import { useDashboardContext } from "@/contexts/DashboardContext";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";

import ProductTrendAnalysisGraph from "@/components/common/products/GraphWrapper/ProductTrendAnalysisGraph";
import ProductTrendAnalysisTable from "@/components/common/products/TableSort/ProductTrendAnalysisTable";

import { subDays, subWeeks, subMonths, format } from "date-fns";
import { useProductsContext } from "@/contexts/ProductsContext";
import { IconArrowsMaximize, IconTrendingUp } from "@tabler/icons-react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

export default function ProductTrendAnalysis() {
  const { startDate, endDate ,isMobile} = useProductsContext();
  const [filter, setFilter] = useState("daily");
  const [startDateCS, setStartDateCS] = useState("");
  const [endDateCS, setEndDateCS] = useState("");

  // 🔹 Select hook dynamically
  const useDataFetchMethod = (view) => {
    switch (view) {
      case "daily":
        return useProductSummaryDaily;
      case "samedays":
        return useProductSummarySameDay;
      case "weekly":
        return useProductSummaryWeekly;
      case "monthly":
        return useProductSummaryMonthly;
      default:
        return useProductSummaryDaily;
    }
  };

  const SelectedHook = useDataFetchMethod(filter);

  // 🔹 Compute date range dynamically based on filter
  const getDateRange = (view) => {
    const today = new Date();
    let startDatetemp;

    switch (view) {
      case "daily":
        startDatetemp = subDays(today,7);
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
    <div className="p-0">
       <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap" style={{ backgroundColor: "#f1f6ff", padding: '10px' }}>
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            {/* Left Column: Icon Centered */}
            <div
              className="d-flex align-items-center justify-content-center me-3"
              style={{
                background: "linear-gradient(135deg, #924CFE 60%, #BC75FF 100%)",
                borderRadius: "12px",
                width: "40px",
                height: "40px",
              }}
            >
              <IconTrendingUp stroke={2} color="#fff" size={20} />
            </div>

            {/* Right Column: Title + Subtitle */}
            <div className="flex-grow-1">
              <div className=" mb-1" style={{fontWeight:700, fontSize:"18px", color:"#232425"}}>Trend Analysis</div>
              {/* <small className="text-muted">
                Daily tracking: Sales, Making Cost & Items Sold
              </small> */}
            </div>

          </div>

          <div>
            <ButtonGroup
              style={{
                backgroundColor: "#e5e1ef",
                borderRadius: "30px"
              }}>
              {["Daily", "Same Days", "Weekly", "Monthly"].map((label) => (
                <ToggleButton
                  key={label}
                  id={`graph-filter-${label}`}
                  type="radio"
                  variant="outline-secondary"
                  checked={filter === label.toLowerCase().replace(" ", "")}
                  value={label.toLowerCase().replace(" ", "")}
                  onChange={(e) => setFilter(e.currentTarget.value)}
                  className="rounded-pill px-3"
                  style={{
                    fontSize: "13px",
                    backgroundColor:
                      filter === label.toLowerCase().replace(" ", "")
                        ? "#fff"
                        : "transparent",
                    color:
                      filter === label.toLowerCase().replace(" ", "")
                        ? "#ff6000"
                        : "#908780",
                    border:
                      filter === label.toLowerCase().replace(" ", "")
                        ? "1px solid #dee2e6"
                        : "1px solid #dee2e6",
                  }}
                >
                  {label}
                </ToggleButton>
              ))}
            </ButtonGroup>
            {!isMobile && <span style={{marginLeft:'10px'}}>
              <IconArrowsMaximize size={20} color="#232425"/>
              </span>}
          </div>
          
        </div>
      <ServiceRenderer
        queryHook={SelectedHook}
        queryKey={["productTrendAnalysis", filter, startDateCS, endDateCS]}
        queryArgs={[
          100,
          { startdt: startDate, enddt: endDate, userId: 7, outlet: 1 },
        ]}
        formatter={productsTrendAnalysisDataFormatter}
        shimmerCount={2}
      >
        {({ trendData, tableData }) => (
          <>
            <ProductTrendAnalysisGraph
              trendData={trendData}
              filter={filter}
              setFilter={setFilter}
            />
            <ProductTrendAnalysisTable
              tableData={tableData}
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

// import React from "react";
// import { Card, Table, Button } from "react-bootstrap";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { productsTrendAnalysisDataFormatter } from "@/utils/data_formatters/productsPageDataFormatter";
// import { useProductSummaryDaily } from "@/services/product-service";
// import { useDashboardContext } from "@/contexts/DashboardContext";
// import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";

// export default function ProductTrendAnalysis() {
//   const { startDate, endDate } = useDashboardContext();

//   return (
//     <ServiceRenderer
//       queryHook={useProductSummaryDaily}
//       queryKey={["productSummaryDaily", { startdt: startDate, enddt: endDate }]}
//       queryFn={() =>
//         useProductSummaryDaily({ startdt: startDate, enddt: endDate }).queryFn
//       }
//       queryArgs={[100,{ startdt: startDate, enddt: endDate,userId:7,outlet:1 }]}
//       formatter={productsTrendAnalysisDataFormatter}
//       shimmerCount={2}
//     >
//       {({ trendData, tableData }) => (
//         <div className="p-3">
//           {/* Trend Analysis Section */}
//           <Card className="mb-4 shadow-sm border-0">
//             <Card.Body>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <div>
//                   <h6 className="fw-bold mb-1">Trend Analysis</h6>
//                   <small className="text-muted">
//                     Daily tracking: purchase amounts and payment amounts
//                   </small>
//                 </div>
//                 <div className="d-flex gap-2">
//                   <Button
//                     variant="light"
//                     size="sm"
//                     className="rounded-pill px-3 active"
//                   >
//                     Daily
//                   </Button>
//                   <Button
//                     variant="light"
//                     size="sm"
//                     className="rounded-pill px-3"
//                   >
//                     Same Days
//                   </Button>
//                   <Button
//                     variant="light"
//                     size="sm"
//                     className="rounded-pill px-3"
//                   >
//                     Weekly
//                   </Button>
//                   <Button
//                     variant="light"
//                     size="sm"
//                     className="rounded-pill px-3"
//                   >
//                     Monthly
//                   </Button>
//                 </div>
//               </div>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={trendData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
//                   <YAxis yAxisId="right" orientation="right" stroke="#f97316" />
//                   <Tooltip />
//                   <Legend />
//                   <Line
//                     yAxisId="left"
//                     type="monotone"
//                     dataKey="totalSales"
//                     stroke="#3b82f6"
//                     name="Total Sales"
//                     strokeWidth={3}
//                   />
//                   <Line
//                     yAxisId="right"
//                     type="monotone"
//                     dataKey="itemsSold"
//                     stroke="#f97316"
//                     name="Items Sold"
//                     strokeWidth={3}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </Card.Body>
//           </Card>

//           {/* Daily Sales Analytics */}
//           <Card className="shadow-sm border-0">
//             <Card.Body>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <div>
//                   <h6 className="fw-bold mb-1">Daily Sales Analytics</h6>
//                   <small className="text-muted">
//                     Complete breakdown of daily sales performance and revenue
//                     data
//                   </small>
//                 </div>
//                 <div className="d-flex gap-2">
//                   <Button
//                     variant="light"
//                     size="sm"
//                     className="rounded-pill px-3 active"
//                   >
//                     Daily
//                   </Button>
//                   <Button
//                     variant="light"
//                     size="sm"
//                     className="rounded-pill px-3"
//                   >
//                     Same Days
//                   </Button>
//                   <Button
//                     variant="light"
//                     size="sm"
//                     className="rounded-pill px-3"
//                   >
//                     Weekly
//                   </Button>
//                   <Button
//                     variant="light"
//                     size="sm"
//                     className="rounded-pill px-3"
//                   >
//                     Monthly
//                   </Button>
//                 </div>
//               </div>

//               <Table responsive bordered hover className="align-middle">
//                 <thead className="bg-light">
//                   <tr>
//                     <th>Date</th>
//                     <th>Total Sales</th>
//                     <th>Net Sales</th>
//                     <th>Discount</th>
//                     <th>Tax</th>
//                     <th>Items Sold</th>
//                     <th>Orders</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {tableData.map((row, index) => (
//                     <tr key={index}>
//                       <td className="fw-bold">{row.date}</td>
//                       <td style={{ color: row.totalSales.color }}>
//                         {row.totalSales.icon} {row.totalSales.value}
//                       </td>
//                       <td style={{ color: row.netSales.color }}>
//                         {row.netSales.icon} {row.netSales.value}
//                       </td>
//                       <td style={{ color: row.discount.color }}>
//                         {row.discount.icon} {row.discount.value}
//                       </td>
//                       <td style={{ color: row.tax.color }}>
//                         {row.tax.icon} {row.tax.value}
//                       </td>
//                       <td style={{ color: row.itemsSold.color }}>
//                         {row.itemsSold.icon} {row.itemsSold.value}
//                       </td>
//                       <td style={{ color: row.orders.color }}>
//                         {row.orders.icon} {row.orders.value}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </Card.Body>
//           </Card>
//         </div>
//       )}
//     </ServiceRenderer>
//   );
// }

// // import React from "react";
// // import { Card, Table, Button } from "react-bootstrap";
// // import {
// //   LineChart,
// //   Line,
// //   CartesianGrid,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// // } from "recharts";
// // import { productsTrendAnalysisDataFormatter } from "@/utils/data_formatters/productsPageDataFormatter";

// // const ProductTrendAnalysis = ({
// //   apiResponse = {
// //     etag: "-877820944",
// //     list: [
// //       {
// //         dt: "2025-07-28",
// //         startDate: "2025-07-28",
// //         endDate: "2025-07-28",
// //         orders: 2,
// //         netSales: 621,
// //         discount: 65,
// //         tax: 29,
// //         itemsSold: 2,
// //         totalSales: 686,
// //         totalMakingCost: 212,
// //         efficiency: 65.86,
// //         recipe: null,
// //       },
// //       {
// //         dt: "2025-07-30",
// //         startDate: "2025-07-30",
// //         endDate: "2025-07-30",
// //         orders: 1,
// //         netSales: 345,
// //         discount: 0,
// //         tax: 16,
// //         itemsSold: 1,
// //         totalSales: 345,
// //         totalMakingCost: 106,
// //         efficiency: 69.28,
// //         recipe: null,
// //       },
// //       {
// //         dt: "2025-07-31",
// //         startDate: "2025-07-31",
// //         endDate: "2025-07-31",
// //         orders: 1,
// //         netSales: 345,
// //         discount: 0,
// //         tax: 16,
// //         itemsSold: 1,
// //         totalSales: 345,
// //         totalMakingCost: 106,
// //         efficiency: 69.28,
// //         recipe: null,
// //       },
// //       {
// //         dt: "2025-08-01",
// //         startDate: "2025-08-01",
// //         endDate: "2025-08-01",
// //         orders: 1,
// //         netSales: 345,
// //         discount: 0,
// //         tax: 16,
// //         itemsSold: 1,
// //         totalSales: 345,
// //         totalMakingCost: 106,
// //         efficiency: 69.28,
// //         recipe: null,
// //       },
// //       {
// //         dt: "2025-08-02",
// //         startDate: "2025-08-02",
// //         endDate: "2025-08-02",
// //         orders: 1,
// //         netSales: 345,
// //         discount: 0,
// //         tax: 16,
// //         itemsSold: 1,
// //         totalSales: 345,
// //         totalMakingCost: 106,
// //         efficiency: 69.28,
// //         recipe: null,
// //       },
// //       {
// //         dt: "2025-08-03",
// //         startDate: "2025-08-03",
// //         endDate: "2025-08-03",
// //         orders: 1,
// //         netSales: 345,
// //         discount: 0,
// //         tax: 16,
// //         itemsSold: 1,
// //         totalSales: 345,
// //         totalMakingCost: 106,
// //         efficiency: 69.28,
// //         recipe: null,
// //       },
// //     ],
// //   },
// // }) => {
// //   const { trendData, tableData } =
// //     productsTrendAnalysisDataFormatter(apiResponse);

// // return (
// //     <div className="p-3">
// //       {/* Trend Analysis Section */}
// //       <Card className="mb-4 shadow-sm border-0">
// //         <Card.Body>
// //           <div className="d-flex justify-content-between align-items-center mb-3">
// //             <div>
// //               <h6 className="fw-bold mb-1">Trend Analysis</h6>
// //               <small className="text-muted">
// //                 Daily tracking: purchase amounts and payment amounts
// //               </small>
// //             </div>
// //             <div className="d-flex gap-2">
// //               <Button variant="light" size="sm" className="rounded-pill px-3 active">
// //                 Daily
// //               </Button>
// //               <Button variant="light" size="sm" className="rounded-pill px-3">
// //                 Same Days
// //               </Button>
// //               <Button variant="light" size="sm" className="rounded-pill px-3">
// //                 Weekly
// //               </Button>
// //               <Button variant="light" size="sm" className="rounded-pill px-3">
// //                 Monthly
// //               </Button>
// //             </div>
// //           </div>
// //           <ResponsiveContainer width="100%" height={300}>
// //             <LineChart data={trendData}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="date" />
// //               <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
// //               <YAxis yAxisId="right" orientation="right" stroke="#f97316" />
// //               <Tooltip />
// //               <Legend />
// //               <Line
// //                 yAxisId="left"
// //                 type="monotone"
// //                 dataKey="totalSales"
// //                 stroke="#3b82f6"
// //                 name="Total Sales"
// //                 strokeWidth={3}
// //               />
// //               <Line
// //                 yAxisId="right"
// //                 type="monotone"
// //                 dataKey="itemsSold"
// //                 stroke="#f97316"
// //                 name="Items Sold"
// //                 strokeWidth={3}
// //               />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </Card.Body>
// //       </Card>

// //       {/* Daily Sales Analytics */}
// //       <Card className="shadow-sm border-0">
// //         <Card.Body>
// //           <div className="d-flex justify-content-between align-items-center mb-3">
// //             <div>
// //               <h6 className="fw-bold mb-1">Daily Sales Analytics</h6>
// //               <small className="text-muted">
// //                 Complete breakdown of daily sales performance and revenue data
// //               </small>
// //             </div>
// //             <div className="d-flex gap-2">
// //               <Button variant="light" size="sm" className="rounded-pill px-3 active">
// //                 Daily
// //               </Button>
// //               <Button variant="light" size="sm" className="rounded-pill px-3">
// //                 Same Days
// //               </Button>
// //               <Button variant="light" size="sm" className="rounded-pill px-3">
// //                 Weekly
// //               </Button>
// //               <Button variant="light" size="sm" className="rounded-pill px-3">
// //                 Monthly
// //               </Button>
// //             </div>
// //           </div>

// //           <Table responsive bordered hover className="align-middle">
// //             <thead className="bg-light">
// //               <tr>
// //                 <th>Date</th>
// //                 <th>Total Sales</th>
// //                 <th>Net Sales</th>
// //                 <th>Discount</th>
// //                 <th>Tax</th>
// //                 <th>Items Sold</th>
// //                 <th>Orders</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {tableData.map((row, index) => (
// //                 <tr key={index}>
// //                   <td className="fw-bold">{row.date}</td>
// //                   <td style={{ color: row.totalSales.color }}>
// //                     {row.totalSales.icon} {row.totalSales.value}
// //                   </td>
// //                   <td style={{ color: row.netSales.color }}>
// //                     {row.netSales.icon} {row.netSales.value}
// //                   </td>
// //                   <td style={{ color: row.discount.color }}>
// //                     {row.discount.icon} {row.discount.value}
// //                   </td>
// //                   <td style={{ color: row.tax.color }}>
// //                     {row.tax.icon} {row.tax.value}
// //                   </td>
// //                   <td style={{ color: row.itemsSold.color }}>
// //                     {row.itemsSold.icon} {row.itemsSold.value}
// //                   </td>
// //                   <td style={{ color: row.orders.color }}>
// //                     {row.orders.icon} {row.orders.value}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </Table>
// //         </Card.Body>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default ProductTrendAnalysis;
