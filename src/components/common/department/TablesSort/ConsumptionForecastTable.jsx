"use client";

import React from "react";
import { Table } from "react-bootstrap";
import { BaseSurface } from "../../dashboard/TablesSort";
import { useTableSort } from "@/components/hooks/useTableSort";

export default function ConsumptionForecastTable({ tableData }) {
  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(tableData);

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  const columns = [
    { key: "day", label: "DAY", minWidth: "120px" },
    { key: "name", label: "ITEM", minWidth: "150px" },
    { key: "quantity", label: "TOTAL QUANTITY", minWidth: "150px" },
    { key: "totalPrice", label: "TOTAL PRICE", minWidth: "150px" },
  ];

  return (
    <BaseSurface maxHeight="65vh">
      <div
        style={{
          maxHeight: "60vh",
          overflowY: "auto",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="hide-scrollbar"
      >
        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          th.sticky-header {
            position: sticky;
            top: 0;
            background: #fafafa;
            z-index: 3;
          }
        `}</style>

        <div style={{ minWidth: "700px" }}>
          <Table hover className="align-middle mb-0 text-nowrap">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="sticky-header"
                    style={{
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                      color: "#555",
                      cursor: "pointer",
                      padding: "12px 16px",
                      minWidth: col.minWidth,
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {col.label}
                    {typeof col.label === "string" && renderSortArrow(col.key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.length > 0 ? (
                sortedData.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "14px 16px" }}>{row.day}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <div className="d-flex flex-column">
                        <span>{row.name}</span>
                        <small className="text-muted">
                          {row.category} • {row.unitQuantity} {row.unit} • ₹
                          {row.unitPrice}
                        </small>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <strong>
                        {row.quantity} {row.unit.toLowerCase()}
                      </strong>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <strong>₹{row.totalPrice.toFixed(0)}</strong>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      color: "#888",
                      fontStyle: "italic",
                    }}
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </BaseSurface>
  );
}
