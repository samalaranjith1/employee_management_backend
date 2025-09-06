"use client";

import React, { useMemo } from "react";
import { useTableSort } from "@/components/hooks/useTableSort";

export default function ItemsDepartmentAnalyticsTable({ tableData = [] }) {
  // 🔹 Normalize data for sorting (convert strings like ₹, commas to numbers)
  const normalizedData = useMemo(() => {
    return tableData.map((row) => ({
      ...row,
      openingSort:
        parseFloat(String(row?.opening?.value || "").replace(/₹|,/g, "")) || 0,
      consumptionSort:
        parseFloat(String(row?.consumption?.value || "").replace(/₹|,/g, "")) ||
        0,
      closingSort:
        parseFloat(String(row?.closing?.value || "").replace(/₹|,/g, "")) || 0,
      netConsumptionSort:
        parseFloat(
          String(row?.netConsumption?.value || "").replace(/₹|,/g, "")
        ) || 0,
      saleSort:
        parseFloat(String(row?.sale?.value || "").replace(/₹|,/g, "")) || 0,
      burnUtilizationSort:
        parseFloat(
          String(row?.burnUtilization?.value || "").replace(/₹|,/g, "")
        ) || 0,
    }));
  }, [tableData]);

  const {
    sortedData = [],
    sortKey,
    direction,
    handleSort,
  } = useTableSort(normalizedData);

  const renderArrow = (key) =>
    sortKey === key ? (direction === "asc" ? " ↑" : " ↓") : "";

  const columns = [
    { key: "department", label: "Department" },
    { key: "openingSort", label: "Opening" },
    { key: "consumptionSort", label: "Consumption" },
    { key: "closingSort", label: "Closing" },
    { key: "netConsumptionSort", label: "Net Consumption" },
    { key: "saleSort", label: "Sale" },
    { key: "burnUtilizationSort", label: "Burn & Utilization" },
    { key: "actions", label: "Actions" },
  ];

  return (
    <div
      style={{
        maxHeight: "65vh",
        overflowY: "auto",
        position: "relative",
      }}
    >
      <table
        className="table table-hover table-bordered align-middle text-center"
        style={{ marginBottom: 0, width: "100%" }}
      >
        <thead
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            zIndex: 5,
          }}
        >
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => col.key !== "actions" && handleSort(col.key)}
                style={{
                  cursor: col.key !== "actions" ? "pointer" : "default",
                  fontSize: "13px",
                  padding: "12px 16px",
                  backgroundColor: "#fff",
                }}
              >
                {col.label} {col.key !== "actions" && renderArrow(col.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((row) => (
              <tr key={row.id}>
                <td className="fw-bold">{row.department}</td>

                <td
                  style={{
                    backgroundColor: row.opening.bgColor,
                    color: row.opening.textColor,
                  }}
                >
                  {row.opening.label}
                  <div className="text-muted small">{row.opening.value}</div>
                </td>

                <td
                  style={{
                    backgroundColor: row.consumption.bgColor,
                    color: row.consumption.textColor,
                  }}
                >
                  {row.consumption.label}
                  <div className="text-muted small">
                    {row.consumption.value}
                  </div>
                </td>

                <td
                  style={{
                    backgroundColor: row.closing.bgColor,
                    color: row.closing.textColor,
                  }}
                >
                  {row.closing.label}
                  <div className="text-muted small">{row.closing.value}</div>
                </td>

                <td
                  style={{
                    backgroundColor: row.netConsumption.bgColor,
                    color: row.netConsumption.textColor,
                  }}
                >
                  {row.netConsumption.label}
                  <div className="text-muted small">
                    {row.netConsumption.value}
                  </div>
                </td>

                <td
                  style={{
                    backgroundColor: row.sale.bgColor,
                    color: row.sale.textColor,
                  }}
                >
                  {row.sale.label}
                  <div className="text-muted small">{row.sale.value}</div>
                </td>

                <td
                  style={{
                    backgroundColor: row.burnUtilization.bgColor,
                    color: row.burnUtilization.textColor,
                  }}
                >
                  {row.burnUtilization.label}
                  <div className="text-muted small">
                    {row.burnUtilization.value}
                  </div>
                </td>

                <td>
                  <a
                    href="#"
                    className="text-primary fw-semibold text-decoration-none"
                  >
                    View Trend ↗
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
