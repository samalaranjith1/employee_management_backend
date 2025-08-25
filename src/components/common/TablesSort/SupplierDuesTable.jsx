"use client";
import React from "react";
import { Table, Badge } from "react-bootstrap";
import BaseSurface from "./BaseSurface";
import { useTableSort } from "@/components/hooks/useTableSort";

function SupplierDuesTable({ styles, data }) {
  // ✅ Sorting hook
  const sort = useTableSort(data || []);

  // ✅ Render sort arrow
  const renderSortArrow = (key) =>
    sort.sortKey === key ? (sort.direction === "asc" ? " ↑" : " ↓") : "";

  // ✅ Define columns
  const columns = [
    { key: "supplier", label: "Supplier" },
    { key: "thisMonth", label: "This Month Due" },
    { key: "lastMonth", label: "Last Month Due" },
    { key: "total", label: "Total Due" },
    { key: "items", label: "Items" },
  ];

  return (
    <BaseSurface>
      <Table
        hover
        className="mb-0"
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  ...styles.tableHeader,
                  position: "sticky",
                  top: 0,
                  background: "#fff",
                  zIndex: 2,
                  cursor: "pointer",
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
                <div style={styles.supplierName}>{row.supplier}</div>
                <div className="d-flex align-items-center gap-1">
                  <Badge style={styles.badge}>{row.category}</Badge>
                  <span style={styles.locationText}>{row.location}</span>
                </div>
              </td>
              <td style={styles.redAmount}>
                ₹{row.thisMonth.toLocaleString()}
              </td>
              <td>
                {row.lastMonth ? `₹${row.lastMonth.toLocaleString()}` : "—"}
              </td>
              <td style={styles.redAmount}>₹{row.total.toLocaleString()}</td>
              <td>{row.items}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </BaseSurface>
  );
}

export default SupplierDuesTable;
