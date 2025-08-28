"use client";

import React from "react";
import { Table, Badge } from "react-bootstrap";
import { BaseSurface } from "../../dashboard/TablesSort";
import { useTableSort } from "@/components/hooks/useTableSort";

export default function ConsumptionTable({ tableData = [] }) {
  // 1️⃣ Ensure numeric fields exist
  const dataForSort = tableData.map((item) => ({
    ...item,
    salesQuantityNum: Number(item.salesQuantity) || 0,
    differenceNum: parseFloat(item.difference) || 0,
    wastePercentNum: parseFloat(item.wastePercent) || 0,
    costImpactNum: parseFloat(item.costImpact.replace(/₹|,/g, "")) || 0,
  }));

  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(dataForSort);

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  const columns = [
    { key: "itemDetails", label: "ITEM DETAILS" },
    { key: "department", label: "DEPARTMENT" },
    { key: "consumed", label: "CONSUMED" },
    { key: "salesQuantityNum", label: "SALES QUANTITY" },
    { key: "differenceNum", label: "DIFFERENCE" },
    { key: "wastePercentNum", label: "WASTE %" },
    { key: "costImpactNum", label: "COST IMPACT" },
    { key: "status", label: "STATUS" },
  ];

  return (
    <BaseSurface maxHeight="65vh">
      <div
        style={{ maxHeight: "60vh", overflow: "auto" }}
        className="hide-scrollbar"
      >
        <Table
          striped
          hover
          className="align-middle mb-0 text-nowrap"
          style={{ minWidth: "1100px" }}
        >
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{
                    background: "#fafafa",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    color: "#555",
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
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
            {sortedData.length > 0 ? (
              sortedData.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ fontWeight: 600 }}>{item.itemDetails}</div>
                    <div className="text-muted" style={{ fontSize: "12px" }}>
                      {item.subCategory}
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>{item.department}</td>
                  <td style={{ padding: "14px 16px" }}>{item.consumed}</td>
                  <td style={{ padding: "14px 16px", color: "green" }}>
                    {item.salesQuantity}
                  </td>
                  <td style={{ padding: "14px 16px", color: "red" }}>
                    {item.difference}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <Badge
                      bg={
                        item.wastePercentNum > 30
                          ? "danger"
                          : item.wastePercentNum > 10
                          ? "warning"
                          : "success"
                      }
                    >
                      {item.wastePercent}%
                    </Badge>
                  </td>
                  <td style={{ padding: "14px 16px", color: "red" }}>
                    {item.costImpact} loss incurred
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <Badge
                      bg={
                        item.status === "red"
                          ? "danger"
                          : item.status === "orange"
                          ? "warning"
                          : "success"
                      }
                    >
                      {item.status === "red"
                        ? "Critical"
                        : item.status === "orange"
                        ? "Monitor"
                        : "Safe"}
                    </Badge>
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
                  }}
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </BaseSurface>
  );
}
