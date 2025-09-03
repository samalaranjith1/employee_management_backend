"use client";

import React, { useMemo } from "react";
import { Table, Button } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import { salesDataFormatter } from "@/utils/data_formatters/productsPageDataFormatter";
import { useProductSummaryMonthly } from "@/services/product-service";
import ServiceRenderer from "@/components/common/ServiceRenderer/ServiceRenderer";
import { useProductsContext } from "@/contexts/ProductsContext";

const ProductsSales = () => {
  const { startDate, endDate } = useProductsContext();

  return (
    <ServiceRenderer
      queryHook={useProductSummaryMonthly}
      queryKey={[
        "productSummaryMonthly",
        { startdt: startDate, enddt: endDate },
      ]}
      queryArgs={[
        100,
        { startdt: startDate, enddt: endDate, outlet: 1, userId: 7 },
      ]}
      shimmerCount={1}
    >
      {(apiData) => {
        const rows = useMemo(
          () => salesDataFormatter(apiData?.list ?? []),
          [apiData?.etag, apiData?.list]
        );

        return (
          <div className="p-3 bg-white rounded shadow-sm">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold text-dark m-0">Product Sales Report</h5>
              <Button
                size="sm"
                className="d-flex align-items-center"
                style={{ background: "#FF6A00", borderColor: "#FF6A00" }}
              >
                <FaDownload className="me-2" /> Export
              </Button>
            </div>

            {/* Table */}
            <Table bordered hover responsive className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Date</th>
                  <th>Total Sales</th>
                  <th>Net Sales</th>
                  <th>Discount</th>
                  <th>Tax</th>
                  <th>Items Sold</th>
                  <th>Orders</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={idx}>
                    <td
                      className="text-muted"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {row.date}
                    </td>
                    <td className="fw-semibold text-dark">
                      {row.totalSales.icon}
                      {row.totalSales.value}
                    </td>
                    <td className="fw-semibold text-dark">
                      {row.netSales.icon}
                      {row.netSales.value}
                    </td>
                    <td className="fw-semibold text-dark">
                      {row.discount.icon}
                      {row.discount.value}
                    </td>
                    <td className="fw-semibold text-dark">
                      {row.tax.icon}
                      {row.tax.value}
                    </td>
                    <td className="fw-semibold text-dark">
                      {row.itemsSold.icon}
                      {row.itemsSold.value}
                    </td>
                    <td className="fw-semibold text-dark">
                      {row.orders.icon}
                      {row.orders.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        );
      }}
    </ServiceRenderer>
  );
};

export default ProductsSales;

// import React, { useEffect, useMemo, useState } from "react";
// import { Table, Button } from "react-bootstrap";
// import { FaDownload } from "react-icons/fa";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { salesDataFormatter } from "@/utils/data_formatters/productsPageDataFormatter";

// const ProductsSales = ({
//   apiData = {
//     etag: "-877820944",
//     list: [
//       {
//         dt: "2025-07-28",
//         startDate: "2025-07-28",
//         endDate: "2025-07-28",
//         orders: 2,
//         netSales: 621,
//         discount: 65,
//         tax: 29,
//         itemsSold: 2,
//         totalSales: 686,
//         totalMakingCost: 212,
//         efficiency: 65.86,
//         recipe: null,
//       },
//       {
//         dt: "2025-07-30",
//         startDate: "2025-07-30",
//         endDate: "2025-07-30",
//         orders: 1,
//         netSales: 345,
//         discount: 0,
//         tax: 16,
//         itemsSold: 1,
//         totalSales: 345,
//         totalMakingCost: 106,
//         efficiency: 69.28,
//         recipe: null,
//       },
//       {
//         dt: "2025-07-31",
//         startDate: "2025-07-31",
//         endDate: "2025-07-31",
//         orders: 1,
//         netSales: 345,
//         discount: 0,
//         tax: 16,
//         itemsSold: 1,
//         totalSales: 345,
//         totalMakingCost: 106,
//         efficiency: 69.28,
//         recipe: null,
//       },
//       {
//         dt: "2025-08-01",
//         startDate: "2025-08-01",
//         endDate: "2025-08-01",
//         orders: 1,
//         netSales: 345,
//         discount: 0,
//         tax: 16,
//         itemsSold: 1,
//         totalSales: 345,
//         totalMakingCost: 106,
//         efficiency: 69.28,
//         recipe: null,
//       },
//       {
//         dt: "2025-08-02",
//         startDate: "2025-08-02",
//         endDate: "2025-08-02",
//         orders: 1,
//         netSales: 345,
//         discount: 0,
//         tax: 16,
//         itemsSold: 1,
//         totalSales: 345,
//         totalMakingCost: 106,
//         efficiency: 69.28,
//         recipe: null,
//       },
//       {
//         dt: "2025-08-03",
//         startDate: "2025-08-03",
//         endDate: "2025-08-03",
//         orders: 1,
//         netSales: 345,
//         discount: 0,
//         tax: 16,
//         itemsSold: 1,
//         totalSales: 345,
//         totalMakingCost: 106,
//         efficiency: 69.28,
//         recipe: null,
//       },
//     ],
//   },
// }) => {
//   const shortDate = (iso) =>
//     new Date(iso).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//     });

//   const rows = useMemo(
//     () => salesDataFormatter(apiData?.list ?? []),
//     // using etag (if present) stabilizes memoization even if parent re-creates objects
//     [apiData?.etag, apiData?.list]
//   );

//   return (
//     <div className="p-3 bg-white rounded shadow-sm">
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5 className="fw-bold text-dark m-0">Product Sales Report</h5>
//         <Button
//           size="sm"
//           className="d-flex align-items-center"
//           style={{ background: "#FF6A00", borderColor: "#FF6A00" }} // figma orange
//         >
//           <FaDownload className="me-2" /> Export
//         </Button>
//       </div>

//       {/* Table */}
//       <Table bordered hover responsive className="align-middle">
//         <thead className="table-light">
//           <tr>
//             <th>Date</th>
//             <th>Total Sales</th>
//             <th>Net Sales</th>
//             <th>Discount</th>
//             <th>Tax</th>
//             <th>Items Sold</th>
//             <th>Orders</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, idx) => (
//             <tr key={idx}>
//               <td className="text-muted" style={{ whiteSpace: "pre-line" }}>
//                 {row.date}
//               </td>
//               <td className="fw-semibold text-dark">
//                 {row.totalSales.icon}
//                 {row.totalSales.value}
//               </td>
//               <td className="fw-semibold text-dark">
//                 {row.netSales.icon}
//                 {row.netSales.value}
//               </td>
//               <td className="fw-semibold text-dark">
//                 {row.discount.icon}
//                 {row.discount.value}
//               </td>
//               <td className="fw-semibold text-dark">
//                 {row.tax.icon}
//                 {row.tax.value}
//               </td>
//               <td className="fw-semibold text-dark">
//                 {row.itemsSold.icon}
//                 {row.itemsSold.value}
//               </td>
//               <td className="fw-semibold text-dark">
//                 {row.orders.icon}
//                 {row.orders.value}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default ProductsSales;
