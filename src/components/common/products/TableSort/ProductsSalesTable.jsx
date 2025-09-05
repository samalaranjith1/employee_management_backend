"use client";

import React, { useMemo } from "react";
import { Table, Button } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import { useTableSort } from "@/components/hooks/useTableSort";
import { salesDataFormatter } from "@/utils/data_formatters/productsPageDataFormatter";

const ProductsSalesTable = ({ apiData }) => {
  // 🔹 Format data for table
  const rows = useMemo(
    () => salesDataFormatter(apiData?.list ?? []),
    [apiData?.etag, apiData?.list]
  );

  // 🔹 Prepare numeric data for sorting
  const dataForSort = rows.map((row, idx) => ({
    ...row,
    totalSalesNum:
      parseFloat(String(row.totalSales?.value || "").replace(/₹|,/g, "")) || 0,
    netSalesNum:
      parseFloat(String(row.netSales?.value || "").replace(/₹|,/g, "")) || 0,
    discountNum:
      parseFloat(String(row.discount?.value || "").replace(/₹|,/g, "")) || 0,
    taxNum: parseFloat(String(row.tax?.value || "").replace(/₹|,/g, "")) || 0,
    itemsSoldNum:
      parseFloat(String(row.itemsSold?.value || "").replace(/₹|,/g, "")) || 0,
    ordersNum:
      parseFloat(String(row.orders?.value || "").replace(/₹|,/g, "")) || 0,
    index: idx,
  }));

  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(dataForSort);

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  const columns = [
    { key: "date", label: "Date" },
    { key: "totalSalesNum", label: "Total Sales" },
    { key: "netSalesNum", label: "Net Sales" },
    { key: "discountNum", label: "Discount" },
    { key: "taxNum", label: "Tax" },
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

      {/* Scrollable Table (sticky header works here) */}
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
                <td className="fw-semibold text-dark">
                  {row.totalSales?.icon}
                  {row.totalSales?.value}
                </td>
                <td className="fw-semibold text-dark">
                  {row.netSales?.icon}
                  {row.netSales?.value}
                </td>
                <td className="fw-semibold text-dark">
                  {row.discount?.icon}
                  {row.discount?.value}
                </td>
                <td className="fw-semibold text-dark">
                  {row.tax?.icon}
                  {row.tax?.value}
                </td>
                <td className="fw-semibold text-dark">
                  {row.itemsSold?.icon}
                  {row.itemsSold?.value}
                </td>
                <td className="fw-semibold text-dark">
                  {row.orders?.icon}
                  {row.orders?.value}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ProductsSalesTable;
