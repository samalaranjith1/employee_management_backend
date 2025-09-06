"use client";

import React, { useMemo } from "react";
import { Col, Card } from "react-bootstrap";
import { useTableSort } from "@/components/hooks/useTableSort";

export default function ItemsDepartmentDistributionChartTable({
  formatted,
  total,
  selectedKey,
}) {
  // 🔹 Prepare data for sorting
  const tableData = useMemo(() => {
    return formatted.map((d, idx) => ({
      ...d,
      valueNum: parseFloat(d.value) || 0,
      index: idx,
    }));
  }, [formatted]);

  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(tableData);

  const renderArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  const columns = [
    { key: "name", label: "Department" },
    {
      key: "valueNum",
      label:
        selectedKey === "consumptionValue"
          ? "Consumption Quantity (GM)"
          : "Net Sales",
    },
    { key: "percentage", label: "Percentage (%)" },
  ];

  return (
    <Col md={6}>
      <h6 className="fw-bold mb-3">
        {selectedKey === "consumptionValue"
          ? "Consumption Quantity (GM)"
          : "Net Sales"}
      </h6>

      <div
        style={{
          maxHeight: "65vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Sticky Header */}
        <div
          className="d-flex justify-content-between px-3 py-2 fw-bold border-bottom bg-white"
          style={{ position: "sticky", top: 0, zIndex: 5 }}
        >
          {columns.map((col) => (
            <div
              key={col.key}
              onClick={() => handleSort(col.key)}
              style={{
                cursor: "pointer",
                fontSize: "13px",
                flex: 1,
                textAlign: col.key === "name" ? "left" : "center",
              }}
            >
              {col.label} {renderArrow(col.key)}
            </div>
          ))}
        </div>

        {/* Cards for Each Row */}
        {sortedData?.length > 0 ? (
          sortedData.map((d) => (
            <Card
              key={d.id}
              className="mb-2 shadow-sm border-0"
              style={{ borderRadius: "12px" }}
            >
              <Card.Body className="d-flex justify-content-between align-items-center px-3 py-2">
                {/* Left Section with Icon */}
                <div
                  className="d-flex align-items-center"
                  style={{ flex: 1, minWidth: "120px" }}
                >
                  <span
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: d.color,
                      display: "inline-block",
                      marginRight: "8px",
                    }}
                  />
                  <d.Icon
                    style={{ color: d.color, marginRight: "6px" }}
                    size={14}
                  />
                  <span className="fw-bold">{d.name}</span>
                </div>

                {/* Value */}
                <div
                  className="fw-semibold"
                  style={{ flex: 1, textAlign: "center" }}
                >
                  {d.value}
                </div>

                {/* Percentage */}
                <div
                  className="text-muted"
                  style={{ flex: 1, textAlign: "center" }}
                >
                  {d.percentage}%
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div className="text-center py-3">No data available</div>
        )}

        {/* Sticky Total Row */}
        <div
          className="d-flex justify-content-between px-3 py-2 border-top fw-bold bg-light"
          style={{ position: "sticky", bottom: 0, zIndex: 5 }}
        >
          <span>Total</span>
          <span>{total}</span>
        </div>
      </div>
    </Col>
  );
}
