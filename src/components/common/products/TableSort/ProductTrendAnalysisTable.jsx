"use client";

import React from "react";
import { Card, Table, ButtonGroup, ToggleButton } from "react-bootstrap";
import { useTableSort } from "@/components/hooks/useTableSort";

const ProductTrendAnalysisTable = ({ tableData, filter, setFilter }) => {
  // 🔹 Prepare data for sorting
  const dataForSort = tableData.map((row, idx) => ({
    ...row,
    totalSalesNum: parseFloat(row.totalSales.value?.replace(/₹|,/g, "")) || 0,
    netSalesNum: parseFloat(row.netSales.value?.replace(/₹|,/g, "")) || 0,
    discountNum: parseFloat(row.discount.value?.replace(/₹|,/g, "")) || 0,
    taxNum: parseFloat(row.tax.value?.replace(/₹|,/g, "")) || 0,
    itemsSoldNum: Number(row?.itemsSold?.value) || 0,
    ordersNum: parseFloat(row.orders.value?.replace(/₹|,/g, "")) || 0,
    index: idx,
  }));

  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(dataForSort);

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  const columns = [
    { key: "date", label: "DATE" },
    { key: "totalSalesNum", label: "TOTAL SALES" },
    { key: "netSalesNum", label: "NET SALES" },
    { key: "discountNum", label: "DISCOUNT" },
    { key: "taxNum", label: "TAX" },
    { key: "itemsSoldNum", label: "ITEMS SOLD" },
    { key: "ordersNum", label: "ORDERS" },
  ];

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <div>
            <h6 className="fw-bold mb-1">Daily Sales Analytics</h6>
            <small className="text-muted">
              Complete breakdown of daily sales performance and revenue data
            </small>
          </div>

          {/* Filters */}
          <div>
            <ButtonGroup>
              {["Daily", "Same Days", "Weekly", "Monthly"].map((label) => (
                <ToggleButton
                  key={label}
                  id={`table-filter-${label}`}
                  type="radio"
                  variant="outline-secondary"
                  checked={filter === label.toLowerCase()?.replace(" ", "")}
                  value={label.toLowerCase()?.replace(" ", "")}
                  onChange={(e) => setFilter(e.currentTarget.value)}
                  className="rounded-pill px-3"
                  style={{
                    fontSize: "13px",
                    backgroundColor:
                      filter === label.toLowerCase()?.replace(" ", "")
                        ? "#fff"
                        : "transparent",
                    color:
                      filter === label.toLowerCase()?.replace(" ", "")
                        ? "#FF5B22"
                        : "#6C757D",
                    border:
                      filter === label.toLowerCase()?.replace(" ", "")
                        ? "1px solid #FF5B22"
                        : "1px solid #dee2e6",
                  }}
                >
                  {label}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>
        </div>

        {/* Sticky + Scrollable Table */}
        <div style={{ maxHeight: "65vh", overflowY: "auto" }}>
          <Table
            bordered
            hover
            className="align-middle"
            style={{ minWidth: "900px" }}
          >
            <thead
              style={{
                position: "sticky",
                top: 0,
                background: "#fff",
                zIndex: 3,
              }}
            >
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    style={{
                      fontSize: "13px",
                      color: "#6C757D",
                      cursor: "pointer",
                      padding: "12px 16px",
                      backgroundColor: "#fff", // ensures rows don’t bleed through
                    }}
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
                  <td className="fw-bold">{row.date}</td>
                  <td style={{ color: row.totalSales.color }}>
                    {row.totalSales.icon} {row.totalSales.value}
                  </td>
                  <td style={{ color: row.netSales.color }}>
                    {row.netSales.icon} {row.netSales.value}
                  </td>
                  <td style={{ color: row.discount.color }}>
                    {row.discount.icon} {row.discount.value}
                  </td>
                  <td style={{ color: row.tax.color }}>
                    {row.tax.icon} {row.tax.value}
                  </td>
                  <td style={{ color: row.itemsSold.color }}>
                    {row.itemsSold.icon} {row.itemsSold.value}
                  </td>
                  <td style={{ color: row.orders.color }}>
                    {row.orders.icon} {row.orders.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductTrendAnalysisTable;
