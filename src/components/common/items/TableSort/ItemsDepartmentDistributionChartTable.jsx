"use client";

import React, { useMemo } from "react";
import { Col, Card, Table } from "react-bootstrap";
import { useTableSort } from "@/components/hooks/useTableSort";

export default function ItemsDepartmentDistributionChartTable({
  formatted,
  total,
  selectedKey,
}) {
  // ✅ Ensure formatted is always an array
  const tableData = useMemo(() => {
    if (!Array.isArray(formatted)) return [];
    return formatted.map((d) => ({
      name: d.name || "-",
      value: d.value || 0,
      percent: total > 0 ? ((d.value / total) * 100).toFixed(1) : 0,
      color: d.color || "#ccc",
    }));
  }, [formatted, total]);

  // Table sorting
  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(tableData);
  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  const columns = [
    { key: "name", label: "Department" },
    {
      key: "value",
      label: selectedKey === "consumptionValue" ? "Quantity (GM)" : "Net Sales",
    },
    { key: "percent", label: "Percentage (%)" },
  ];

  return (
    <Col md={6}>
      <Card
        className="border-0 shadow-sm"
        style={{ borderRadius: "16px", overflow: "hidden" }}
      >
        {/* Scroll wrapper */}
        <div
          style={{
            maxHeight: "65vh",
            overflowY: "auto",
            overflowX: "auto",
          }}
        >
          <Table
            hover
            bordered={false}
            className="align-middle mb-0 text-nowrap"
          >
            <thead style={{ backgroundColor: "#F9FAFB" }}>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    style={{
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                      color: "#555",
                      background: "#F9FAFB",
                      position: "sticky",
                      top: 0,
                      zIndex: 2,
                      cursor: "pointer",
                      padding: "12px 16px",
                      textAlign: col.key === "name" ? "left" : "center",
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
                sortedData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-3 fw-semibold">
                      <span
                        style={{
                          display: "inline-block",
                          width: "12px",
                          height: "12px",
                          borderRadius: "3px",
                          backgroundColor: row.color,
                          marginRight: "6px",
                        }}
                      ></span>
                      {row.name}
                    </td>
                    <td className="text-center">
                      {row.value.toLocaleString()}
                    </td>
                    <td className="text-center">{row.percent}%</td>
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

            {/* Optional footer row for total */}
            {total ? (
              <tfoot style={{ backgroundColor: "#F9FAFB", fontWeight: "bold" }}>
                <tr>
                  <td>Total</td>
                  <td className="text-center">{total.toLocaleString()}</td>
                  <td className="text-center">100%</td>
                </tr>
              </tfoot>
            ) : null}
          </Table>
        </div>
      </Card>
    </Col>
  );
}
