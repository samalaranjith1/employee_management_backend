"use client";

import React from "react";
import { Table } from "react-bootstrap";
import { useTableSort } from "@/components/hooks/useTableSort";

const RawMaterialPurchaseAnalysisTable = ({ items = [] }) => {
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
      <Table  style={{ marginBottom: 0, minWidth: "600px" }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 3,
                  cursor: "pointer",
                  fontSize: '14px',
                  fontWeight: '600',
                  color: "#232425",
                  textAlign: "left",
                  background: '#f4f7fc'
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
              <td>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: "#232425",
                  textAlign: "left",
                }}>
                  {item.name}
                </div>
                <div clasName='text-muted' style={{
                  fontSize: '12px',
                  fontWeight: '500',
                  textAlign: "left",
                }}>
                  {item.type} • {item.unitInfo}
                </div>
              </td>
              <td style={{
                fontSize: '14px',
                fontWeight: '500',
                textAlign: "left",
              }}>
                {item.quantity}
              </td>
              <td style={{
                fontSize: '14px',
                fontWeight: '500',
                textAlign: "left",
              }}>
                ₹{item.value.toLocaleString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RawMaterialPurchaseAnalysisTable;
