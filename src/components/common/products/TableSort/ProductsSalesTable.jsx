"use client";

import React, { useMemo } from "react";
import { Table, Button } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import { useTableSort } from "@/components/hooks/useTableSort";

// 🔹 Helper: format YYYY-MM-DD into "Dec 1st, 2024 \n Sunday"
const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);

  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    date
  );
  const year = date.getFullYear();
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    date
  );

  return `${month} ${day}${suffix}, ${year}\n${weekday}`;
};

const ProductsSalesTable = ({ apiData }) => {
  // 🔹 Format rows directly from API
  const rows = useMemo(() => {
    if (!apiData?.list) return [];
    return apiData.list.map((item, idx) => ({
      date: formatDate(item.startDate), // formatted date
      totalSales: item.totalSales ?? 0,
      netSales: item.netSales ?? 0,
      discount: item.discount ?? 0,
      tax: item.tax ?? 0,
      itemsSold: item.itemsSold ?? 0,
      orders: item.orders ?? 0,
      index: idx,
    }));
  }, [apiData?.etag, apiData?.list]);

  // 🔹 Numeric keys for sorting
  const dataForSort = rows.map((row) => ({
    ...row,
    totalSalesNum: Number(row.totalSales) || 0,
    netSalesNum: Number(row.netSales) || 0,
    discountNum: Number(row.discount) || 0,
    taxNum: Number(row.tax) || 0,
    itemsSoldNum: Number(row.itemsSold) || 0,
    ordersNum: Number(row.orders) || 0,
  }));

  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(dataForSort);

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  const columns = [
    { key: "date", label: "Date" },
    { key: "totalSalesNum", label: "Total Sales (₹)" },
    { key: "netSalesNum", label: "Net Sales (₹)" },
    { key: "discountNum", label: "Discount (₹)" },
    { key: "taxNum", label: "Tax (₹)" },
    { key: "itemsSoldNum", label: "Items Sold" },
    { key: "ordersNum", label: "Orders" },
  ];

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

      {/* Scrollable Table */}
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        <Table bordered hover className="align-middle mb-0">
          <thead
            className="table-light"
            style={{
              position: "sticky",
              top: 0,
              background: "#fff",
              zIndex: 5,
            }}
          >
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{ cursor: "pointer", whiteSpace: "nowrap" }}
                >
                  {col.label}
                  {renderSortArrow(col.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, idx) => (
              <tr key={idx}>
                <td className="text-muted" style={{ whiteSpace: "pre-line" }}>
                  {row.date}
                </td>
                <td className="fw-semibold">₹{row.totalSales}</td>
                <td className="fw-semibold">₹{row.netSales}</td>
                <td className="fw-semibold text-danger">-₹{row.discount}</td>
                <td className="fw-semibold">₹{row.tax}</td>
                <td className="fw-semibold">{row.itemsSold}</td>
                <td className="fw-semibold">{row.orders}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ProductsSalesTable;

// "use client";

// import React, { useMemo } from "react";
// import { Table, Button } from "react-bootstrap";
// import { FaDownload } from "react-icons/fa";
// import { useTableSort } from "@/components/hooks/useTableSort";
// import { salesDataFormatter } from "@/utils/data_formatters/productsPageDataFormatter";

// const ProductsSalesTable = ({ apiData }) => {
//   // 🔹 Format data for table
//   const rows = useMemo(
//     () => salesDataFormatter(apiData?.list ?? []),
//     [apiData?.etag, apiData?.list]
//   );

//   // 🔹 Prepare numeric data for sorting
//   const dataForSort = rows.map((row, idx) => ({
//     ...row,
//     totalSalesNum:
//       parseFloat(String(row.totalSales?.value || "").replace(/₹|,/g, "")) || 0,
//     netSalesNum:
//       parseFloat(String(row.netSales?.value || "").replace(/₹|,/g, "")) || 0,
//     discountNum:
//       parseFloat(String(row.discount?.value || "").replace(/₹|,/g, "")) || 0,
//     taxNum: parseFloat(String(row.tax?.value || "").replace(/₹|,/g, "")) || 0,
//     itemsSoldNum:
//       parseFloat(String(row.itemsSold?.value || "").replace(/₹|,/g, "")) || 0,
//     ordersNum:
//       parseFloat(String(row.orders?.value || "").replace(/₹|,/g, "")) || 0,
//     index: idx,
//   }));

//   const { sortedData, sortKey, direction, handleSort } =
//     useTableSort(dataForSort);

//   const renderSortArrow = (key) =>
//     sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

//   const columns = [
//     { key: "date", label: "Date" },
//     { key: "totalSalesNum", label: "Total Sales" },
//     { key: "netSalesNum", label: "Net Sales" },
//     { key: "discountNum", label: "Discount" },
//     { key: "taxNum", label: "Tax" },
//     { key: "itemsSoldNum", label: "Items Sold" },
//     { key: "ordersNum", label: "Orders" },
//   ];

//   return (
//     <div className="p-3 bg-white rounded shadow-sm">
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5 className="fw-bold text-dark m-0">Product Sales Report</h5>
//         <Button
//           size="sm"
//           className="d-flex align-items-center"
//           style={{ background: "#FF6A00", borderColor: "#FF6A00" }}
//         >
//           <FaDownload className="me-2" /> Export
//         </Button>
//       </div>

//       {/* Scrollable Table (sticky header works here) */}
//       <div style={{ maxHeight: "400px", overflowY: "auto" }}>
//         <Table bordered hover className="align-middle mb-0">
//           <thead
//             className="table-light"
//             style={{
//               position: "sticky",
//               top: 0,
//               background: "#fff",
//               zIndex: 5,
//             }}
//           >
//             <tr>
//               {columns.map((col) => (
//                 <th
//                   key={col.key}
//                   onClick={() => handleSort(col.key)}
//                   style={{ cursor: "pointer", whiteSpace: "nowrap" }}
//                 >
//                   {col.label}
//                   {renderSortArrow(col.key)}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {sortedData.map((row, idx) => (
//               <tr key={idx}>
//                 <td className="text-muted" style={{ whiteSpace: "pre-line" }}>
//                   {row.date}
//                 </td>
//                 <td className="fw-semibold text-dark">
//                   {row.totalSales?.icon}
//                   {row.totalSales?.value}
//                 </td>
//                 <td className="fw-semibold text-dark">
//                   {row.netSales?.icon}
//                   {row.netSales?.value}
//                 </td>
//                 <td className="fw-semibold text-dark">
//                   {row.discount?.icon}
//                   {row.discount?.value}
//                 </td>
//                 <td className="fw-semibold text-dark">
//                   {row.tax?.icon}
//                   {row.tax?.value}
//                 </td>
//                 <td className="fw-semibold text-dark">
//                   {row.itemsSold?.icon}
//                   {row.itemsSold?.value}
//                 </td>
//                 <td className="fw-semibold text-dark">
//                   {row.orders?.icon}
//                   {row.orders?.value}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default ProductsSalesTable;
