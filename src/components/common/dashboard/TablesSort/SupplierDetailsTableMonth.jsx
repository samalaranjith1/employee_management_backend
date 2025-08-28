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
    <BaseSurface title="Top Suppliers" maxHeight="50vh">
      {/* Scroll container */}
      <div style={{ maxHeight: "45vh", overflowY: "auto" }}>
        <Table hover>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    position: "sticky",
                    top: 0,
                    background: "#fff",
                    zIndex: 2,
                    cursor: "pointer",
                    fontWeight: 600,
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
                  <div className="fw-semibold">{row.supplier}</div>
                  <div className="d-flex gap-1">
                    <Badge bg="light" text="dark">
                      {row.category}
                    </Badge>
                    <span style={{ color: "#64748b", fontSize: "0.85rem" }}>
                      {row.location}
                    </span>
                  </div>
                </td>
                <td style={{ color: "#16a34a", fontWeight: "600" }}>
                  ₹{row.purchase.toLocaleString()}
                </td>
                <td>{row.items}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </BaseSurface>
  );
}
