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
                    fontSize: '14px',
                    fontWeight: '600',
                    color: "#232425",
                    textAlign: "left",
                    backgroundColor: '#f4f7fc'
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
                    fontSize: '14px',
                    fontWeight: '600',
                    color: "#232425",
                    textAlign: "left",
                  }}>{row.supplier}</div>
                  <div className="d-flex gap-1">
                    <div style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      textAlign: "left",
                    }} className="text-muted">
                      {row.category}
                    </div>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      textAlign: "left",
                    }} className="text-muted">
                     • {row.location}
                    </span>
                  </div>
                </td>
                <td style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  textAlign: "left",
                }}>
                  {row.purchase.toLocaleString()}
                </td>
                <td style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  textAlign: "left",
                }}>{row.items}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </BaseSurface>
  );
}
