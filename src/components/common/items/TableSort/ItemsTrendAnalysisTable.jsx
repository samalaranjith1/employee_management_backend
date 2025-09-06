"use client";

import React from "react";
import { Table, Container, ButtonGroup, ToggleButton } from "react-bootstrap";

// 🔹 Define all table columns
const columns = [
  { key: "date", label: "Date", bgClass: "" },
  { key: "opening", label: "Opening", bgClass: "bg-soft-blue" },
  { key: "consumption", label: "Consumption", bgClass: "bg-soft-orange" },
  { key: "closing", label: "Closing", bgClass: "bg-soft-green" },
  { key: "netConsumption", label: "Net Consumption", bgClass: "bg-soft-red" },
  { key: "sale", label: "Sale", bgClass: "bg-soft-purple" },
  { key: "burn", label: "Burn & Utilization", bgClass: "bg-soft-gray" },
];

export default function ItemsDepartmentAnalyticsTable({
  tableData = [],
  filter,
  setFilter,
}) {
  return (
    <Container fluid className="p-4">
      {/* Header with filters */}
      <div className="d-flex justify-content-between align-items-center p-3 bg-gradient rounded-3 shadow-sm header-box flex-wrap">
        <div>
          <h5 className="fw-bold mb-1">Daily Analytics Table</h5>
          <p className="text-muted mb-0">
            Complete breakdown of daily inventory and consumption data
          </p>
        </div>
        <div>
          <ButtonGroup>
            {["Daily", "Same Days", "Weekly", "Monthly"].map((label) => (
              <ToggleButton
                key={label}
                id={`filter-${label}`}
                type="radio"
                value={label.toLowerCase().replace(" ", "")}
                checked={filter === label.toLowerCase().replace(" ", "")}
                onChange={(e) => setFilter(e.currentTarget.value)}
                className="rounded-pill px-3"
                style={{
                  fontSize: "13px",
                  backgroundColor:
                    filter === label.toLowerCase().replace(" ", "")
                      ? "#fff"
                      : "transparent",
                  color:
                    filter === label.toLowerCase().replace(" ", "")
                      ? "#FF5B22"
                      : "#6C757D",
                  border:
                    filter === label.toLowerCase().replace(" ", "")
                      ? "1px solid #FF5B22"
                      : "1px solid #dee2e6",
                }}
              >
                {label}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>
      </div>

      {/* Table */}
      <Table
        responsive
        bordered
        hover
        className="align-middle text-center mt-4 analytics-table"
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => {
                  const cell = row[col.key];

                  // 🔹 Date column (date + day)
                  if (col.key === "date") {
                    return (
                      <td key={col.key} className="text-start fw-semibold">
                        {row.date}
                        {row.day && (
                          <div className="text-muted small">{row.day}</div>
                        )}
                      </td>
                    );
                  }

                  // 🔹 Burn & Utilization (qty + percentage)
                  if (col.key === "burn") {
                    return (
                      <td
                        key={col.key}
                        className={`${col.bgClass} fw-semibold`}
                      >
                        {cell?.qty || ""}
                        {cell?.percentage && (
                          <div className="text-muted small">
                            {cell.percentage}
                          </div>
                        )}
                      </td>
                    );
                  }

                  // 🔹 Default cells (qty + price)
                  return (
                    <td key={col.key} className={`${col.bgClass} fw-semibold`}>
                      {cell?.qty || ""}
                      {cell?.price && (
                        <div className="text-muted small">{cell.price}</div>
                      )}
                    </td>
                  );
                })}
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
      </Table>

      {/* Styles */}
      <style jsx>{`
        .header-box {
          background: linear-gradient(90deg, #e6f8f1 0%, #f3faf8 100%);
        }
        .analytics-table thead {
          background: #fafafa;
          font-weight: 600;
        }
        .bg-soft-blue {
          background: #eaf3ff;
          color: #007bff;
        }
        .bg-soft-orange {
          background: #fff3e6;
          color: #ff6b00;
        }
        .bg-soft-green {
          background: #e9f9f1;
          color: #28a745;
        }
        .bg-soft-red {
          background: #fdeaea;
          color: #dc3545;
        }
        .bg-soft-purple {
          background: #f6eafc;
          color: #9c27b0;
        }
        .bg-soft-gray {
          background: #f5f5f5;
          color: #555;
        }
      `}</style>
    </Container>
  );
}
