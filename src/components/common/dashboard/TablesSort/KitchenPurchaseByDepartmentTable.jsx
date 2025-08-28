"use client";
import React from "react";
import { Table } from "react-bootstrap";
import BaseSurface from "./BaseSurface";
import { useTableSort } from "@/components/hooks/useTableSort";

function KitchenPurchaseByDepartmentTable({ data, badgeStyle }) {
  const { sortedData, sortKey, direction, handleSort } = useTableSort(data);

  const renderSortArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  // ✅ Define column config for loop + sorting
  const columns = [
    { key: "name", label: "Department" },
    { key: "consumptionPct", label: "Consumption%" },
    { key: "netConsumptionPct", label: "Net Consumption%" },
    { key: "sales", label: "Sales" },
    { key: "opening", label: "Opening" },
    { key: "consumption", label: "Consumption" },
    { key: "closing", label: "Closing" },
    { key: "netConsumption", label: "Net Consumption" },
    { key: "budget", label: "Budget" },
  ];

  return (
    <BaseSurface maxHeight="65vh">
      {/* ✅ Add vertical scroll container */}
      <div style={{ maxHeight: "60vh", overflowY: "auto", overflowX: "auto" }}>
        <Table
          bordered
          className="align-middle shadow-sm mb-2"
          style={{ minWidth: "900px" }}
        >
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{
                    background: "#f5f7fa",
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                    cursor: "pointer",
                  }}
                >
                  {col.label}
                  {renderSortArrow(col.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((dept, idx) => (
              <tr key={idx}>
                {columns.map((col) => {
                  switch (col.key) {
                    case "name":
                      return (
                        <td key={col.key} style={{ backgroundColor: dept.bg }}>
                          <div className="fw-bold">{dept.name}</div>
                          <small className="text-muted">Department</small>
                        </td>
                      );
                    case "consumptionPct":
                    case "netConsumptionPct":
                      return (
                        <td key={col.key} style={{ backgroundColor: dept.bg }}>
                          <span style={badgeStyle}>{dept[col.key]}</span>
                        </td>
                      );
                    case "sales":
                      return (
                        <td
                          key={col.key}
                          className="fw-bold text-success"
                          style={{ backgroundColor: dept.bg }}
                        >
                          {dept.sales}
                        </td>
                      );
                    case "netConsumption":
                      return (
                        <td
                          key={col.key}
                          className="fw-bold"
                          style={{ backgroundColor: dept.bg }}
                        >
                          {dept.netConsumption}
                        </td>
                      );
                    default:
                      return (
                        <td key={col.key} style={{ backgroundColor: dept.bg }}>
                          {dept[col.key]}
                        </td>
                      );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </BaseSurface>
  );
}

export default KitchenPurchaseByDepartmentTable;
