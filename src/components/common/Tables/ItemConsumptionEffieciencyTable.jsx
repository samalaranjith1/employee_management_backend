
"use client";
import React from "react";
import { Table, Badge } from "react-bootstrap";
import BaseSurface from "./BaseSurface";

function ItemConsumptionEffieciencyTable({ tableData, wasteBadge }) {
  return (
    <BaseSurface
      title="Detailed Item Consumption Analysis"
      subtitle="Comprehensive consumption vs sales comparison with efficiency metrics"
      maxHeight="65vh"
    >
      <div style={{ maxHeight: "60vh", overflowY: "auto", overflowX: "auto" }}>
        <Table
          striped
          hover
          className="mb-0 align-middle"
          style={{ minWidth: "800px" }}
        >
          <thead className="table-light">
            <tr>
              {[
                "Item Details",
                "Department",
                "Consumed",
                "Sales Qty",
                "Difference",
                "Waste %",
                "Cost Impact",
                "Status",
              ].map((header, i) => (
                <th
                  key={i}
                  style={{
                    position: "sticky",
                    top: 0,
                    background: "#f8f9fa",
                    zIndex: 2,
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx}>
                <td>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: "500" }}>{row.item}</span>
                    <small style={{ color: "#6c757d" }}>
                      {row.dept} • {row.unitQuantity}
                      {row.unit} • ₹{row.unitPrice}
                    </small>
                  </div>
                </td>
                <td>
                  <Badge bg="white"  text="primary">
                    {/* Prefer `row.dept` (string) instead of `row.department` (object) */}
                    {row.dept || (row.department?.name ?? "-")}
                  </Badge>
                </td>
                <td>{row.consumed}</td>
                <td>{row.sales}</td>
                <td
                  style={{
                    color: row.diff.startsWith("+") ? "red" : "green",
                    fontWeight: "bold",
                  }}
                >
                  {row.diff}
                </td>
                <td>
                  <Badge
                    bg={
                      row.wasteType === "Critical"
                        ? "danger"
                        : row.wasteType === "Medium"
                        ? "warning"
                        : "success"
                    }
                    text={row.wasteType === "Medium" ? "dark" : "light"}
                  >
                    {row.waste}
                  </Badge>
                </td>
                <td>{row.cost}</td>
                <td>
                  {wasteBadge ? wasteBadge(row.wasteType) : row.wasteType}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </BaseSurface>
  );
}

export default ItemConsumptionEffieciencyTable;
