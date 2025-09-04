"use client";

import React from "react";
import { Table } from "react-bootstrap";
import { useTableSort } from "@/components/hooks/useTableSort";

const SuppliersItemsTable = ({ items = [] }) => {
  // 🔹 Prepare data for numeric sorting
  const dataForSort = items.map((row, idx) => {
    const purchaseValue =
      typeof row.value === "number"
        ? row.value
        : parseFloat(String(row.value || "").replace(/₹|,/g, "")) || 0;

    return {
      ...row,
      purchaseValueNum: purchaseValue,
      index: idx,
    };
  });

  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(dataForSort);

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  const columns = [
    { key: "name", label: "Item" },
    { key: "quantity", label: "Purchase Qty" },
    { key: "purchaseValueNum", label: "Purchase Value" },
  ];

  return (
    <div
      style={{
        maxHeight: "65vh",
        overflowY: "auto",
        overflowX: "auto",
      }}
    >
      <Table borderless style={{ marginBottom: 0, minWidth: "600px" }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                style={{
                  position: "sticky",
                  top: 0,
                  background: "#fff",
                  zIndex: 3,
                  fontSize: "13px",
                  color: "#6C757D",
                  cursor: "pointer",
                  padding: "12px 16px",
                }}
              >
                {col.label}
                {renderSortArrow(col.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.key} style={{ fontSize: "14px" }}>
              <td style={{ padding: "14px 16px" }}>
                <div className="d-flex align-items-center">
                  {item.icon}
                  <div>
                    <div className="fw-semibold" style={{ color: "#1A1A1A" }}>
                      {item.name}
                    </div>
                    <div style={{ color: "#6B7280", fontSize: "12px" }}>
                      {item.type}. {item.unitInfo}
                    </div>
                  </div>
                </div>
              </td>
              <td style={{ color: "#1A1A1A", padding: "14px 16px" }}>
                {item.quantity}
              </td>
              <td style={{ color: "#1A1A1A", padding: "14px 16px" }}>
                ₹{item.value.toLocaleString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SuppliersItemsTable;
