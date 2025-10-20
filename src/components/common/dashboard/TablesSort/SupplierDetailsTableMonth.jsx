"use client";

import React from "react";
import { Table, Badge } from "react-bootstrap";
import BaseSurface from "./BaseSurface";
import { useTableSort } from "@/components/hooks/useTableSort";

export default function SupplierDetailsTableMonth({ supplierData }) {
  // ✅ Sorting hook
  const sort = useTableSort(supplierData || []);

  // ✅ Render sort arrow
  const renderSortArrow = (key) =>
    sort.sortKey === key ? (sort.direction === "asc" ? " ↑" : " ↓") : "";

  // ✅ Define columns
  const columns = [
    { key: "supplier", label: "Supplier" },
    { key: "purchase", label: "Purchase" },
    { key: "items", label: "Items" },
  ];

  return (
    <BaseSurface title="Supplier Details" maxHeight="65vh">
      {/* Scroll container */}
      <div style={{ maxHeight: "65vh", overflowY: "auto" }}>
        <Table hover>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    position: "sticky",
                    top: 0,
                    background: "#f4f7fc",
                    zIndex: 2,
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: '14px'
                  }}
                  onClick={() => sort.handleSort(col.key)}
                >
                  {col.label}
                  {renderSortArrow(col.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sort.sortedData.map((row, idx) => (
              <tr key={idx}>
                <td>
                  <div style={{
                    color: "#171c26",
                    fontWeight: "600",
                    fontSize: "14px"
                  }}>{row.supplier}</div>
                  <div className="d-flex gap-1">
                    <div style={{
                      color: "#687182",
                      fontWeight: "400",
                      fontSize: "12px"
                    }}>
                      {row.category}
                    </div>
                    <span style={{
                      color: "#687182",
                      fontWeight: "400",
                      fontSize: "12px"
                    }}>
                      {row.location}
                    </span>
                  </div>
                </td>
                <td style={{ fontWeight: "700", fontSize: '14px', color: "#464f60" }}>
                  {row.purchase.toLocaleString()}
                </td>
                <td style={{
                  fontWeight: "700", fontSize: '14px', color: "#464f60"
                }}>{row.items}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </BaseSurface>
  );
}
