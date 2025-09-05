"use client";

import React, { useMemo } from "react";
import { Table } from "react-bootstrap";
import { useTableSort } from "@/components/hooks/useTableSort";

export default function ProductCostTable({ ingredients = [] }) {
  // Prepare data for sorting
  const rows = useMemo(() => {
    return ingredients.map((ing, idx) => ({
      ...ing,
      nameRaw: ing.name || "",
      aliasRaw: ing.alias || "",
      recipePriceRaw:
        parseFloat(String(ing.recipe?.price || "").replace(/₹|,/g, "")) || 0,
      recipeQtyRaw:
        parseFloat(String(ing.recipe?.qty || "").replace(/₹|,/g, "")) || 0,
      totalCostPriceRaw:
        parseFloat(String(ing.totalCost?.price || "").replace(/₹|,/g, "")) || 0,
      totalCostQtyRaw:
        parseFloat(String(ing.totalCost?.qty || "").replace(/₹|,/g, "")) || 0,
      distributionRaw:
        parseFloat(String(ing.distribution || "").replace(/%|,/g, "")) || 0,
      index: idx,
    }));
  }, [ingredients]);

  const { sortedData, sortKey, direction, handleSort } = useTableSort(rows);

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  const columns = [
    {
      key: "nameRaw",
      label: "Item (Raw Material)",
      render: (row) => (
        <>
          <div className="fw-semibold">{row.name}</div>
          <div style={{ fontSize: "12px", color: "#6C757D" }}>{row.alias}</div>
        </>
      ),
    },
    {
      key: "recipePriceRaw",
      label: "Recipe (Price, Qty)",
      render: (row) => (
        <>
          <div className="fw-semibold">{row.recipe?.price}</div>
          <div style={{ fontSize: "12px", color: "#6C757D" }}>
            {row.recipe?.qty}
          </div>
        </>
      ),
    },
    {
      key: "totalCostPriceRaw",
      label: "Total Cost (Price, Qty)",
      render: (row) => (
        <>
          <div className="fw-semibold">{row.totalCost?.price}</div>
          <div style={{ fontSize: "12px", color: "#6C757D" }}>
            {row.totalCost?.qty}
          </div>
        </>
      ),
    },
    {
      key: "distributionRaw",
      label: "Total Cost Distribution",
      render: (row) => (
        <span className="fw-semibold" style={{ color: "#2A55FF" }}>
          {row.distribution}
        </span>
      ),
    },
  ];

  return (
    <div style={{ maxHeight: "65vh", overflowY: "auto" }}>
      <Table borderless hover className="align-middle mb-0">
        <thead
          className="bg-primary text-white"
          style={{
            position: "sticky",
            top: 0,
            background: "#0d6efd",
            zIndex: 10,
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
          {sortedData.length > 0 ? (
            sortedData.map((row, idx) => (
              <tr key={idx} style={{ fontSize: "14px", color: "#212529" }}>
                {columns.map((col) => (
                  <td key={col.key}>{col.render(row)}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center text-muted py-3"
              >
                No Ingredients Available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
