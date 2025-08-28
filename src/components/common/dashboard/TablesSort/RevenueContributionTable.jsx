"use client";
import React from "react";
import { Table } from "react-bootstrap";
import BaseSurface from "./BaseSurface";
import { useTableSort } from "@/components/hooks/useTableSort";

function RevenueContributionTable({ styles, tableData }) {
  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(tableData);

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  const columns = [
    { key: "bucket", label: "Bucket" },
    { key: "products", label: "Products" },
    { key: "sales", label: "Sales" },
    { key: "totalSales", label: "Total Sales" },
    { key: "tag", label: "Recommendation" },
  ];

  return (
    <BaseSurface
      bodyStyle={{
        padding: 0,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Scrollable wrapper */}
      <div style={{ maxHeight: "60vh", overflowY: "auto", overflowX: "auto" }}>
        <Table hover style={{ minWidth: "700px", backgroundColor: "#fff" }}>
          <thead
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "#f8f8f8",
              zIndex: 5,
              borderBottom: "1px solid #ddd",
            }}
          >
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{
                    cursor: "pointer",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
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
              <tr
                key={idx}
                style={{ backgroundColor: idx % 2 === 0 ? "#fafafa" : "#fff" }}
              >
                <td>{row.bucket}</td>
                <td>{row.products}</td>
                <td>₹{row.sales}</td>
                <td>₹{row.totalSales}</td>
                <td>
                  <span
                    style={{
                      ...styles?.tag,
                      background: row.tagColor,
                      color: row.tagText,
                      padding: "4px 10px",
                      borderRadius: "8px",
                      fontWeight: 500,
                    }}
                  >
                    {row.tag}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </BaseSurface>
  );
}

export default RevenueContributionTable;
