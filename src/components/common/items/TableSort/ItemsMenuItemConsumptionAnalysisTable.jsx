"use client";

import React, { useMemo } from "react";
import { Col, Table, Badge } from "react-bootstrap";
import { useTableSort } from "@/components/hooks/useTableSort";

export default function ItemsMenuItemConsumptionAnalysisTable({
  formattedData,
}) {
  // 🔹 Prepare sorting
  const tableData = useMemo(() => {
    return formattedData.map((item) => ({
      ...item,
      totalConsumptionNum: parseFloat(item.totalConsumption) || 0,
    }));
  }, [formattedData]);

  const { sortedData, sortKey, direction, handleSort } =
    useTableSort(tableData);

  const renderArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  const columns = [
    { key: "name", label: "Menu Item" },
    { key: "recipeQty", label: "Recipe" },
    { key: "totalConsumptionNum", label: "Total Consumption" },
  ];

  return (
    <Col md={7}>
      <div
        style={{
          maxHeight: "65vh",
          overflowY: "auto",
          borderRadius: "12px",
          border: "1px solid #dee2e6",
        }}
      >
        <Table
          hover
          className="align-middle mb-0"
          style={{ tableLayout: "fixed", width: "100%" }}
        >
          {/* Sticky Header */}
          <thead
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              backgroundColor: "#f8f9fa", // Ensure background covers cells
            }}
          >
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{
                    cursor: "pointer",
                    fontSize: "13px",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  {col.label} {renderArrow(col.key)}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {sortedData.map((item,index) => (
              <tr key={item.id ?? `row-${index}`}>
                <td>
                  <div className="d-flex align-items-center">
                    {item.icon}
                    <span className="ms-2">{item.name}</span>
                    <Badge bg="light" text="secondary" className="ms-2">
                      {item.itemsSold} items
                    </Badge>
                  </div>
                </td>
                <td>
                  <div>
                    <span className="fw-bold text-primary">
                      {item.recipeQty}
                    </span>
                    <div className="text-muted small">{item.recipePrice}</div>
                  </div>
                </td>
                <td>
                  <div>
                    <span className="fw-bold text-success">
                      {item.totalConsumption}
                    </span>
                    <div className="text-muted small">
                      {item.totalConsumptionPrice}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Col>
  );
}
