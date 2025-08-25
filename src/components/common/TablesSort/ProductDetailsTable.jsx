"use client";
import React from "react";
import { Table } from "react-bootstrap";
import BaseSurface from "./BaseSurface";
import { useTableSort } from "@/components/hooks/useTableSort";

export default function ProductDetailsTable({ rowsData, styles }) {
  // ✅ Sorting hook
  const { sortedData, sortKey, direction, handleSort } = useTableSort(rowsData);

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  // ✅ Column config
  const columns = [
    { key: "product", label: "Product" },
    { key: "items", label: "#Items" },
    { key: "netSales", label: "Net Sales" },
    { key: "discount", label: "Discount" },
    { key: "tax", label: "Tax" },
    { key: "makingCost", label: "Making Cost" },
    { key: "margin", label: "Margin" },
  ];

  return (
    <BaseSurface bodyStyle={styles?.tableContainer}>
      <div style={styles?.tableScrollContainer}>
        <Table hover responsive className="align-middle mb-0">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={styles?.stickyTh}
                  className="text-primary"
                >
                  {col.label}
                  {renderSortArrow(col.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData?.map((row, idx) => (
              <tr key={idx}>
                <td>
                  <div className="fw-bold">{row.product}</div>
                  <small className="text-muted">{row.details}</small>
                </td>
                <td className="fw-bold">{row.items}</td>
                <td className="text-success fw-bold">{row.netSales}</td>
                <td className="text-danger fw-bold">{row.discount}</td>
                <td className="text-info fw-bold">{row.tax}</td>
                <td className="text-danger fw-bold">{row.makingCost}</td>
                <td>
                  <div className="text-success fw-bold">{row.margin}</div>
                  <span
                    style={{
                      ...styles?.badge,
                      backgroundColor:
                        parseFloat(row.marginPercent) >= 60
                          ? "#d1fae5"
                          : "#fef3c7",
                      color:
                        parseFloat(row.marginPercent) >= 60
                          ? "#16a34a"
                          : "#d97706",
                    }}
                  >
                    {row.marginPercent}
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
